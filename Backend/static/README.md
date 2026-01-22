# eDNA classifier app

1. Place your files into `data/`:
   - `asvs.fasta` (preferred) OR `asv_table.tsv`
   - Optional: `AI_Clustering_Results_Large.tsv`, `cluster_sizes_for_chart.csv`

2. Create venv and install:
   python -m venv venv
   source venv/bin/activate  # or venv\\Scripts\\activate on Windows
   pip install -r requirements.txt

3. Train/build:
   python train_and_build.py --data_dir data --out_dir models --k 6 --pca_dim 64 --chunk 2048

(For a quick test on a subset:)
   python train_and_build.py --data_dir data --out_dir models --k 5 --pca_dim 32 --max_seqs 200000

4. Run Flask:
   python app.py

Open http://127.0.0.1:5000 and upload a FASTA to test.
