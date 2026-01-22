import { useState } from 'react';

export const ProcessFlowchart = () => {
  const [activeStep, setActiveStep] = useState(null);

  const toggleStep = (step) => {
    if (activeStep === step) {
      setActiveStep(null);
    } else {
      setActiveStep(step);
    }
  };

  return (
    <div id="about" className="mt-24 flex justify-center px-4">
      <div className="w-full max-w-4xl">
        {/* Title */}
        <div className="mb-12 rounded-xl bg-gradient-to-r from-blue-900/30 to-cyan-800/30 p-8 border border-cyan-500/20 shadow-2xl shadow-blue-900/20">
          <h2 className="text-3xl font-bold text-white font-heading">
            How It Works — Oceanic eDNA Analysis Pipeline
          </h2>
          <p className="mt-3 text-cyan-100/80 font-light">
            A step-by-step breakdown of our advanced genetic analysis process
          </p>
        </div>

        {/* Process steps with interactive cards */}
        <div className="space-y-8">
          {/* Step 1 */}
          <div className={`process-step ${activeStep === 1 ? 'active' : ''}`}>
            <div className="step-header" onClick={() => toggleStep(1)}>
              <div className="step-number">1</div>
              <div className="step-title-container">
                <h3 className="step-title">Upload FASTA File</h3>
                <p className="step-subtitle">Initial data submission</p>
              </div>
              <div className="step-toggle">{activeStep === 1 ? '−' : '+'}</div>
            </div>
            <div className="step-content">
              <p className="step-description">User uploads DNA dataset in FASTA format (file input or paste).</p>
            </div>
          </div>

          <div className="process-arrow">↓</div>

          {/* Step 2 */}
          <div className={`process-step ${activeStep === 2 ? 'active' : ''}`}>
            <div className="step-header" onClick={() => toggleStep(2)}>
              <div className="step-number">2</div>
              <div className="step-title-container">
                <h3 className="step-title">Preprocessing</h3>
                <p className="step-subtitle">Data cleaning & preparation</p>
              </div>
              <div className="step-toggle">{activeStep === 2 ? '−' : '+'}</div>
            </div>
            <div className="step-content">
              <p className="step-description">Clean & standardize raw sequences.</p>
              <p className="step-description">Convert sequences → k-mers (e.g., 6-mers).</p>
            </div>
          </div>

          <div className="process-arrow">↓</div>

          {/* Step 3 */}
          <div className={`process-step ${activeStep === 3 ? 'active' : ''}`}>
            <div className="step-header" onClick={() => toggleStep(3)}>
              <div className="step-number">3</div>
              <div className="step-title-container">
                <h3 className="step-title">Vectorization</h3>
                <p className="step-subtitle">Feature extraction</p>
              </div>
              <div className="step-toggle">{activeStep === 3 ? '−' : '+'}</div>
            </div>
            <div className="step-content">
              <p className="step-description">Count frequency of each k-mer per sequence.</p>
              <p className="step-description">Produce numeric feature vector for every sequence.</p>
            </div>
          </div>

          <div className="process-arrow">↓</div>

          {/* Step 4 */}
          <div className={`process-step ${activeStep === 4 ? 'active' : ''}`}>
            <div className="step-header" onClick={() => toggleStep(4)}>
              <div className="step-number">4</div>
              <div className="step-title-container">
                <h3 className="step-title">Dimensionality Reduction</h3>
                <p className="step-subtitle">PCA application</p>
              </div>
              <div className="step-toggle">{activeStep === 4 ? '−' : '+'}</div>
            </div>
            <div className="step-content">
              <p className="step-description">Apply PCA to k-mer vectors → compact embeddings.</p>
              <p className="step-description">Easier visualization & faster downstream tasks.</p>
            </div>
          </div>

          <div className="process-arrow">↓</div>

          {/* Step 5 */}
          <div className={`process-step ${activeStep === 5 ? 'active' : ''}`}>
            <div className="step-header" onClick={() => toggleStep(5)}>
              <div className="step-number">5</div>
              <div className="step-title-container">
                <h3 className="step-title">Clustering</h3>
                <p className="step-subtitle">Pattern identification</p>
              </div>
              <div className="step-toggle">{activeStep === 5 ? '−' : '+'}</div>
            </div>
            <div className="step-content">
              <p className="step-description">Group sequences by similarity (e.g., k-means / HDBSCAN).</p>
              <p className="step-description">Assign each sequence to nearest cluster.</p>
            </div>
          </div>

          <div className="process-arrow">↓</div>

          {/* Step 6 */}
          <div className={`process-step ${activeStep === 6 ? 'active' : ''}`}>
            <div className="step-header" onClick={() => toggleStep(6)}>
              <div className="step-number">6</div>
              <div className="step-title-container">
                <h3 className="step-title">Novelty Check</h3>
                <p className="step-subtitle">Anomaly detection</p>
              </div>
              <div className="step-toggle">{activeStep === 6 ? '−' : '+'}</div>
            </div>
            <div className="step-content">
              <p className="step-description">Compute distance of sequence → cluster center.</p>
              <p className="step-description">If distance &gt; threshold → flag as potentially novel.</p>
            </div>
          </div>

          <div className="process-arrow">↓</div>

          {/* Step 7 */}
          <div className={`process-step ${activeStep === 7 ? 'active' : ''}`}>
            <div className="step-header" onClick={() => toggleStep(7)}>
              <div className="step-number">7</div>
              <div className="step-title-container">
                <h3 className="step-title">Results & Visualization</h3>
                <p className="step-subtitle">Output delivery</p>
              </div>
              <div className="step-toggle">{activeStep === 7 ? '−' : '+'}</div>
            </div>
            <div className="step-content">
              <p className="step-output-title">Outputs:</p>
              <div className="step-output-grid">
                <ul className="step-output-list">
                  <li>Cluster assignments</li>
                  <li>Novelty detection outcomes</li>
                </ul>
                <ul className="step-output-list">
                  <li>Charts (species distribution, cluster plots)</li>
                  <li>Tabular summaries & downloadable reports</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Footer note */}
        <div className="mt-10 p-5 rounded-lg bg-slate-800/40 border border-cyan-500/10">
          <p className="text-sm text-cyan-200/70 italic">
            💡 Tip: Replace thresholds, clustering algorithm, or k value to tune sensitivity/novelty detection.
          </p>
        </div>

        {/* CSS Styles */}
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@300;400;500&display=swap');
          
          .font-heading {
            font-family: 'Inter', sans-serif;
          }
          
          .process-step {
            background: linear-gradient(135deg, rgba(59, 130, 246, 0.8) 0%, rgba(6, 182, 212, 0.8) 100%);
            border-radius: 16px;
            padding: 2px;
            box-shadow: 0 12px 30px rgba(0, 40, 80, 0.25);
            overflow: hidden;
            transition: all 0.3s ease;
            backdrop-filter: blur(10px);
          }
          
          .process-step > div {
            background: rgba(23, 42, 69, 0.95);
            border-radius: 14px;
          }
          
          .step-header {
            display: flex;
            align-items: center;
            padding: 20px 24px;
            cursor: pointer;
            transition: all 0.3s ease;
          }
          
          .step-header:hover {
            background: rgba(255, 255, 255, 0.05);
          }
          
          .step-number {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 36px;
            height: 36px;
            background: linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%);
            color: white;
            border-radius: 50%;
            font-weight: 700;
            margin-right: 16px;
            flex-shrink: 0;
            font-family: 'Inter', sans-serif;
            font-size: 16px;
            box-shadow: 0 4px 10px rgba(0, 131, 255, 0.3);
          }
          
          .step-title-container {
            flex: 1;
          }
          
          .step-title {
            font-weight: 600;
            font-size: 1.25rem;
            color: white;
            margin: 0;
            font-family: 'Inter', sans-serif;
            letter-spacing: 0.3px;
          }
          
          .step-subtitle {
            font-size: 0.9rem;
            color: #7dd3fc;
            margin: 4px 0 0 0;
            font-weight: 400;
            font-family: 'Inter', sans-serif;
          }
          
          .step-toggle {
            color: white;
            font-size: 1.5rem;
            font-weight: 300;
            transition: transform 0.3s ease;
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.1);
          }
          
          .step-content {
            padding: 0 24px;
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.4s ease, padding 0.4s ease;
          }
          
          .process-step.active .step-content {
            max-height: 300px;
            padding: 0 24px 24px;
          }
          
          .process-step.active .step-toggle {
            transform: rotate(45deg);
            background: rgba(255, 255, 255, 0.15);
          }
          
          .step-description {
            color: #d0f0ff;
            margin-bottom: 12px;
            font-size: 1rem;
            line-height: 1.6;
            font-family: 'Inter', sans-serif;
            font-weight: 400;
          }
          
          .step-description:last-child {
            margin-bottom: 0;
          }
          
          .step-output-title {
            color: #7dd3fc;
            font-weight: 500;
            margin-bottom: 12px;
            font-size: 1.05rem;
            font-family: 'Inter', sans-serif;
          }
          
          .step-output-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
          }
          
          .step-output-list {
            color: #d0f0ff;
            padding-left: 20px;
            font-family: 'Inter', sans-serif;
          }
          
          .step-output-list li {
            margin-bottom: 8px;
            line-height: 1.5;
          }
          
          .step-output-list li:last-child {
            margin-bottom: 0;
          }
          
          .process-arrow {
            text-align: center;
            color: rgba(125, 211, 252, 0.7);
            font-size: 1.8rem;
            margin: -4px 0;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 200;
          }
          
          @media (max-width: 768px) {
            .step-title {
              font-size: 1.1rem;
            }
            
            .step-subtitle {
              font-size: 0.85rem;
            }
            
            .step-output-grid {
              grid-template-columns: 1fr;
              gap: 12px;
            }
            
            .process-arrow {
              margin: -6px 0;
            }
          }
        `}</style>
      </div>
    </div>
  );
};