# save as inspect_models.py and run python inspect_models.py
import os, pickle
import numpy as np

md = 'models'
print('models dir exists?', os.path.exists(md))
kpath = os.path.join(md, 'kmer_vocab.txt')
embp = os.path.join(md, 'embeddings.npy')
pca_path = os.path.join(md, 'pca.pkl')
asv_ids = os.path.join(md, 'asv_ids.npy')
centroids = os.path.join(md, 'cluster_centroids.npy')

print('kmer_vocab.txt exists?', os.path.exists(kpath))
if os.path.exists(kpath):
    with open(kpath) as f:
        lines = [ln.strip() for ln in f if ln.strip()]
    print('kmer lines (first 10):', lines[:10])
    print('kmer count:', len(lines))
else:
    print('kmer_vocab.txt missing')

print('embeddings.npy exists?', os.path.exists(embp))
if os.path.exists(embp):
    E = np.load(embp, allow_pickle=True)
    print('embeddings shape:', E.shape, 'dtype:', E.dtype)
else:
    print('embeddings.npy missing')

print('asv_ids.npy exists?', os.path.exists(asv_ids))
if os.path.exists(asv_ids):
    ids = np.load(asv_ids, allow_pickle=True)
    print('asv_ids length:', len(ids), 'example ids:', ids[:5])
else:
    print('asv_ids.npy missing')

print('pca.pkl exists?', os.path.exists(pca_path))
if os.path.exists(pca_path):
    try:
        with open(pca_path,'rb') as fh:
            pca = pickle.load(fh)
        # scikit-learn PCA/IPCA differences
        comp = getattr(pca, 'components_', None)
        n_features = None
        if hasattr(pca, 'n_components_'):
            n_comp = pca.n_components_
        else:
            n_comp = getattr(pca, 'n_components', '<unknown>')
        if hasattr(pca, 'mean_'):
            n_features = pca.mean_.shape[0]
        elif comp is not None:
            n_features = comp.shape[1]
        print('PCA object loaded. PCA n_components:', n_comp, 'PCA input/features expected:', n_features)
    except Exception as e:
        print('Failed to load pca.pkl:', e)
else:
    print('pca.pkl missing')

print('cluster_centroids.npy exists?', os.path.exists(centroids))
if os.path.exists(centroids):
    C = np.load(centroids, allow_pickle=True)
    print('centroids shape:', C.shape)
