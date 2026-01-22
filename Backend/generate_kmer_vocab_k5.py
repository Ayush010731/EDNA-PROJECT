# generate_kmer_vocab_k5.py
import itertools, os
k = 5
out = 'models/kmer_vocab.txt'
os.makedirs('models', exist_ok=True)
bases = 'ACGT'
kmers = [''.join(p) for p in itertools.product(bases, repeat=k)]
with open(out, 'w', encoding='utf-8') as fh:
    fh.write('\n'.join(kmers) + '\n')
print('Wrote', len(kmers), 'kmers to', out)
