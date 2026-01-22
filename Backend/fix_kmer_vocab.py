# fix_kmer_vocab.py
import os

p = 'models/kmer_vocab.txt'
bak = 'models/kmer_vocab.txt.bak'
if not os.path.exists(p):
    print('models/kmer_vocab.txt not found at', p); raise SystemExit(1)

# back up
if not os.path.exists(bak):
    with open(p, 'rb') as fh: data = fh.read()
    with open(bak, 'wb') as fh: fh.write(data)
    print('Backup written to', bak)

# read text safely
with open(p, 'r', encoding='utf-8', errors='replace') as fh:
    raw = fh.read()

# If file contains literal backslash + n (i.e. '\\n'), convert them to real newlines.
if '\\n' in raw:
    fixed = raw.replace('\\n', '\n')
else:
    # If it is a single very long line of characters without any separator,
    # attempt to split into fixed-length kmers (try k=5)
    if len(raw.strip()) % 5 == 0 and all(c in 'ACGT\\n' for c in raw):
        # remove whitespace, split into k=5
        s = raw.strip().replace('\n','').replace('\\n','')
        kmers = [s[i:i+5] for i in range(0, len(s), 5)]
        fixed = '\n'.join(kmers)
    else:
        print('No "\\n" escapes found and cannot safely infer kmers. Exiting.')
        raise SystemExit(1)

# normalize and write
lines = [ln.strip().upper() for ln in fixed.splitlines() if ln.strip()]
with open(p, 'w', encoding='utf-8') as fh:
    fh.write('\n'.join(lines) + '\n')
print('Fixed kmer_vocab written. Total kmers:', len(lines))
