import os, numpy as np, pickle, random
from Bio import SeqIO
from sklearn.metrics.pairwise import cosine_similarity

MODEL_DIR = 'models'
EMB_PATH = os.path.join(MODEL_DIR, 'embeddings.npy')
ASV_IDS_PATH = os.path.join(MODEL_DIR, 'asv_ids.npy')
KMER_PATH = os.path.join(MODEL_DIR, 'kmer_vocab.txt')
PCA_PATH = os.path.join(MODEL_DIR, 'pca.pkl')
CENTROIDS_PATH = os.path.join(MODEL_DIR, 'cluster_centroids.npy')
CLUSTER_LABELS_PATH = os.path.join(MODEL_DIR, 'cluster_labels.npy')

# thresholds (tweak if needed)
ASV_SIM_THRESHOLD = 0.85
CLUSTER_SIM_THRESHOLD = 0.65

_cached = {}

def load_artifacts():
    if _cached:
        return _cached
    emb = None; asv_ids = None; kmer_list = None; pca = None; centroids = None; cluster_labels = None
    if os.path.exists(EMB_PATH):
        emb = np.load(EMB_PATH, allow_pickle=True)
    if os.path.exists(ASV_IDS_PATH):
        asv_ids = np.load(ASV_IDS_PATH, allow_pickle=True)
    if os.path.exists(KMER_PATH):
        with open(KMER_PATH) as fh:
            kmer_list = [line.strip().upper() for line in fh if line.strip()]
    if os.path.exists(PCA_PATH):
        with open(PCA_PATH, 'rb') as fh:
            pca = pickle.load(fh)
    if os.path.exists(CENTROIDS_PATH):
        centroids = np.load(CENTROIDS_PATH, allow_pickle=True)
    if os.path.exists(CLUSTER_LABELS_PATH):
        cluster_labels = np.load(CLUSTER_LABELS_PATH, allow_pickle=True)
    # build kmer->index map for speed
    k2i = {k:i for i,k in enumerate(kmer_list)} if kmer_list else None
    _cached.update({'emb':emb,'asv_ids':asv_ids,'kmer_list':kmer_list,'k2i':k2i,'pca':pca,'centroids':centroids,'cluster_labels':cluster_labels})
    return _cached

def kmer_vector_fast(seq, k2i, k):
    vec = [0.0]*len(k2i)
    s = seq.upper().replace('\\n','').replace('\\r','')
    L = len(s)
    for i in range(L - k + 1):
        kmer = s[i:i+k]
        idx = k2i.get(kmer)
        if idx is not None:
            vec[idx] += 1.0
    tot = sum(vec)
    if tot>0:
        vec = [v/tot for v in vec]
    return np.array(vec, dtype=float)

def encode_sequence(seq):
    artifacts = load_artifacts()
    kmer_list = artifacts.get('kmer_list')
    k2i = artifacts.get('k2i')
    pca = artifacts.get('pca')
    if kmer_list is None or k2i is None:
        raise ValueError('k-mer vocab missing in models/. Run train_and_build.py first.')
    k = len(kmer_list[0])
    vec = kmer_vector_fast(seq, k2i, k).reshape(1,-1)
    if pca is not None:
        emb = pca.transform(vec)
        n = np.linalg.norm(emb)
        if n>0:
            emb = emb / n
        return emb.reshape(-1)
    return vec.reshape(-1)

def classify_sequence(seq, asv_threshold=ASV_SIM_THRESHOLD, cluster_threshold=CLUSTER_SIM_THRESHOLD):
    artifacts = load_artifacts()
    emb = artifacts.get('emb'); asv_ids = artifacts.get('asv_ids'); centroids = artifacts.get('centroids'); cluster_labels = artifacts.get('cluster_labels')
    if artifacts.get('kmer_list') is None:
        return {'error':'Model artifacts missing (kmer vocab). Please run training.'}
    q = encode_sequence(seq)
    result = {'label': None, 'matched_asv': None, 'matched_cluster': None, 'confidence': 0.0, 'is_novel': True}
    # ASV-level match
    if emb is not None and asv_ids is not None:
        sims = cosine_similarity(q.reshape(1,-1), emb)[0]
        best_idx = int(sims.argmax())
        best_score = float(sims[best_idx])
        if best_score >= asv_threshold:
            result.update({'label': str(asv_ids[best_idx]), 'matched_asv': str(asv_ids[best_idx]), 'confidence': round(best_score,3), 'is_novel': False})
            return result
    # cluster-level match
    if centroids is not None and cluster_labels is not None:
        sims = cosine_similarity(q.reshape(1,-1), centroids)[0]
        best_idx = int(sims.argmax())
        best_score = float(sims[best_idx])
        if best_score >= cluster_threshold:
            result.update({'label': str(cluster_labels[best_idx]), 'matched_cluster': str(cluster_labels[best_idx]), 'confidence': round(best_score,3), 'is_novel': False})
            return result
    # novel
    result['label'] = f'novel_{random.randint(1000,9999)}'
    result['confidence'] = 0.0
    result['is_novel'] = True
    return result

def analyze_fasta(path):
    entries = []
    counts = {}
    total = 0
    for rec in SeqIO.parse(path, 'fasta'):
        seq = str(rec.seq).upper()
        r = classify_sequence(seq)
        entries.append({'id': rec.id, 'length': len(seq), **r})
        counts[r.get('label','unknown')] = counts.get(r.get('label','unknown'), 0) + 1
        total += 1
    summary = f'Processed {total} sequences — {len(counts)} labels (including novel).'
    return {'summary': summary, 'taxa_counts': counts, 'entries': entries}
