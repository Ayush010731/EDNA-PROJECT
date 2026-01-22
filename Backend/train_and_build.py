#!/usr/bin/env python3
"""
train_and_build.py
Builds k-mer embeddings and (if available) cluster centroids from your ASV files.

Usage:
  python train_and_build.py --data_dir data --out_dir models --k 6 --pca_dim 64 --chunk 2048 --max_seqs 200000
"""
import os, argparse, json, pickle
from collections import defaultdict
import numpy as np
import pandas as pd
from tqdm import tqdm
from Bio import SeqIO
from sklearn.decomposition import PCA, IncrementalPCA
from sklearn.preprocessing import normalize

def read_asvs_from_fasta(path, max_seqs=None):
    ids, seqs = [], []
    for i, rec in enumerate(SeqIO.parse(path, 'fasta')):
        ids.append(rec.id)
        seqs.append(str(rec.seq).upper().replace('\n','').replace('\r',''))
        if max_seqs and i+1 >= max_seqs:
            break
    return ids, seqs

def read_asvs_from_tsv(path, max_seqs=None):
    df = pd.read_csv(path, sep='\t', dtype=str, low_memory=False)
    # heuristic: seq column
    seq_col = None
    for c in df.columns:
        if c.lower() in ('sequence','seq','asv_sequence','dna','sequence_raw'):
            seq_col = c; break
    if seq_col is None:
        # fallback: choose column with highest average length
        lengths = {c: df[c].dropna().map(len).mean() if df[c].dropna().size>0 else 0 for c in df.columns}
        seq_col = max(lengths, key=lengths.get)
    seqs = df[seq_col].fillna('').astype(str).tolist()
    if max_seqs:
        seqs = seqs[:max_seqs]
    ids = [str(i) for i in range(len(seqs))]
    seqs = [s.upper().replace('\n','').replace('\r','') for s in seqs]
    return ids, seqs

def read_cluster_map(path):
    # returns mapping asv_id -> cluster_id (strings)
    df = pd.read_csv(path, sep='\t', dtype=str, low_memory=False)
    id_col, cl_col = None, None
    for c in df.columns:
        if c.lower() in ('asv_id','asv','id','seqid','sequenceid'):
            id_col = c; break
    for c in df.columns:
        if c.lower() in ('cluster','cluster_id','clusterid','label','group'):
            cl_col = c; break
    if id_col is None:
        id_col = df.columns[0]
    if cl_col is None:
        if df.shape[1] >= 2:
            cl_col = df.columns[1]
        else:
            return {}
    mapping = dict(zip(df[id_col].astype(str), df[cl_col].astype(str)))
    return mapping

def build_kmer_vocab(seqs, k):
    sset = set()
    for s in seqs:
        L = len(s)
        for i in range(L - k + 1):
            sset.add(s[i:i+k])
    return sorted(sset)

def vectorize_kmer_list(seqs, k2i, k):
    N = len(seqs); M = len(k2i)
    X = np.zeros((N, M), dtype=np.float32)
    for i, s in enumerate(seqs):
        L = len(s)
        if L < k:
            continue
        for j in range(L - k + 1):
            kmer = s[j:j+k]
            idx = k2i.get(kmer)
            if idx is not None:
                X[i, idx] += 1.0
        total = X[i].sum()
        if total > 0:
            X[i] /= total
    return X

def main():
    p = argparse.ArgumentParser()
    p.add_argument('--data_dir', default='data')
    p.add_argument('--out_dir', default='models')
    p.add_argument('--k', type=int, default=6)
    p.add_argument('--pca_dim', type=int, default=64)
    p.add_argument('--chunk', type=int, default=2048)
    p.add_argument('--max_seqs', type=int, default=0, help='If >0, process only first N sequences (useful for testing)')
    args = p.parse_args()

    data_dir = args.data_dir; out_dir = args.out_dir
    os.makedirs(out_dir, exist_ok=True)

    fasta_path = os.path.join(data_dir, 'asvs.fasta')
    tsv_path = os.path.join(data_dir, 'asv_table.tsv')

    if os.path.exists(fasta_path):
        print('Reading FASTA:', fasta_path)
        ids, seqs = read_asvs_from_fasta(fasta_path, max_seqs=args.max_seqs or None)
    elif os.path.exists(tsv_path):
        print('Reading TSV:', tsv_path)
        ids, seqs = read_asvs_from_tsv(tsv_path, max_seqs=args.max_seqs or None)
    else:
        raise SystemExit('No asvs.fasta or asv_table.tsv found in data/ — place your files there.')

    print('Loaded', len(seqs), 'sequences.')

    # Build kmer vocab
    print('Building k-mer vocab (k=%d)...' % args.k)
    kmer_list = build_kmer_vocab(seqs, args.k)
    print('K-mer vocab size:', len(kmer_list))
    with open(os.path.join(out_dir, 'kmer_vocab.txt'), 'w') as fh:
        for km in kmer_list:
            fh.write(km + '\\n')

    k2i = {kmer:i for i,kmer in enumerate(kmer_list)}

    # Vectorize
    print('Vectorizing sequences into k-mer freq matrix...')
    X = vectorize_kmer_list(seqs, k2i, args.k)
    print('Feature matrix shape:', X.shape)

    # PCA / IncrementalPCA decision
    N, M = X.shape
    pca_dim = min(args.pca_dim, max(1, M-1))
    if N > args.chunk or M > 6000:
        print('Using IncrementalPCA (chunked) n_components=%d' % pca_dim)
        ipca = IncrementalPCA(n_components=pca_dim)
        for start in range(0, N, args.chunk):
            end = min(N, start+args.chunk)
            ipca.partial_fit(X[start:end])
        E = ipca.transform(X)
        pca_obj = ipca
    else:
        print('Using PCA (in-memory) n_components=%d' % pca_dim)
        pca = PCA(n_components=pca_dim)
        E = pca.fit_transform(X)
        pca_obj = pca

    # Normalize rows
    E = normalize(E, axis=1)
    np.save(os.path.join(out_dir, 'embeddings.npy'), E.astype(np.float32))
    np.save(os.path.join(out_dir, 'asv_ids.npy'), np.array(ids, dtype=object))

    # Save PCA object
    with open(os.path.join(out_dir, 'pca.pkl'), 'wb') as fh:
        pickle.dump(pca_obj, fh)

    # Cluster centroids if mapping present
    cluster_map_path = os.path.join(data_dir, 'AI_Clustering_Results_Large.tsv')
    if os.path.exists(cluster_map_path):
        print('Loading cluster mapping from', cluster_map_path)
        mapping = read_cluster_map(cluster_map_path)  # asv_id -> cluster
        groups = defaultdict(list)
        # use asv ids order to find indices
        for idx, aid in enumerate(ids):
            cl = mapping.get(str(aid)) or mapping.get(aid)
            if cl is not None:
                groups[cl].append(idx)
        cluster_labels = sorted(groups.keys(), key=lambda x: int(x) if str(x).isdigit() else x)
        centroids = []
        for cl in cluster_labels:
            idxs = groups[cl]
            if not idxs:
                centroids.append(np.zeros(E.shape[1], dtype=np.float32))
            else:
                c = E[idxs].mean(axis=0)
                n = np.linalg.norm(c)
                if n>0: c = c / n
                centroids.append(c.astype(np.float32))
        centroids = np.vstack(centroids)
        np.save(os.path.join(out_dir, 'cluster_centroids.npy'), centroids)
        np.save(os.path.join(out_dir, 'cluster_labels.npy'), np.array(cluster_labels, dtype=object))
        print('Saved', centroids.shape[0], 'cluster centroids.')

    meta = {'n_asvs': len(seqs), 'k': args.k, 'kmer_vocab_size': len(kmer_list), 'pca_dim': E.shape[1]}
    with open(os.path.join(out_dir, 'meta.json'), 'w') as fh:
        json.dump(meta, fh, indent=2)

    print('Artifacts saved to', out_dir)
    print('Done.')

if __name__ == '__main__':
    main()
