(function () {
  // small helper to dynamically load a script URL
  function loadScript(url) {
    return new Promise((resolve, reject) => {
      // already loaded?
      const existing = Array.from(document.scripts).find(s => s.src && s.src.indexOf(url) !== -1);
      if (existing) {
        if (existing.getAttribute('data-loaded') === 'true' || existing.readyState === 'complete' || existing.readyState === 'loaded') {
          resolve();
          return;
        }
        existing.addEventListener('load', () => resolve());
        existing.addEventListener('error', (e) => reject(new Error('Failed to load ' + url)));
        return;
      }
      const s = document.createElement('script');
      s.src = url;
      s.async = true;
      s.onload = () => { s.setAttribute('data-loaded', 'true'); resolve(); };
      s.onerror = (e) => reject(new Error('Failed to load ' + url));
      document.head.appendChild(s);
    });
  }

  // ensure libraries available, loads them if missing
  async function ensurePdfLibs() {
    // html2canvas
    if (typeof window.html2canvas === 'undefined' && typeof window.html2canvas === 'undefined') {
      await loadScript('https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js');
      await new Promise(r => setTimeout(r, 20));
    }
    // jspdf (UMD)
    if (typeof window.jspdf === 'undefined' && typeof window.jsPDF === 'undefined') {
      await loadScript('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js');
      await new Promise(r => setTimeout(r, 20));
    }
  }

  // Theme toggle (safe code if element missing)
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;
  function applyTheme(theme) {
    if (theme === 'light') {
      body.classList.add('light-theme');
      if (themeToggle) themeToggle.setAttribute('aria-pressed', 'true');
    } else {
      body.classList.remove('light-theme');
      if (themeToggle) themeToggle.setAttribute('aria-pressed', 'false');
    }
    try { localStorage.setItem('site-theme', theme); } catch (e) {}
  }
  const savedTheme = (function () { try { return localStorage.getItem('site-theme') || 'dark'; } catch (e) { return 'dark'; } })();
  applyTheme(savedTheme);
  if (themeToggle) themeToggle.addEventListener('click', () => applyTheme(body.classList.contains('light-theme') ? 'dark' : 'light'));

  // DOM refs
  const scientificBg = document.querySelector('.scientific-background');
  const customCursor = document.querySelector('.custom-cursor');
  const waveContainer = document.querySelector('.wave-container');
  const dnaHelix = document.querySelector('.dna-helix');

  // create fish
  function createFish() {
    if (!waveContainer) return;
    for (let i = 0; i < 8; i++) {
      const fish = document.createElement('div');
      fish.classList.add('fish');
      fish.innerHTML = '🐠';
      const bottom = Math.random() * 30 + 10;
      const delay = Math.random() * 20;
      const duration = Math.random() * 30 + 20;
      fish.style.bottom = `${bottom}px`;
      fish.style.animationDelay = `${delay}s`;
      fish.style.animationDuration = `${duration}s`;
      fish.style.fontSize = `${Math.random() * 10 + 20}px`;
      fish.style.filter = `hue-rotate(${Math.random() * 360}deg) brightness(${0.7 + Math.random() * 0.3})`;
      waveContainer.appendChild(fish);
    }
  }

  // dna helix
  if (dnaHelix) {
    for (let i = 0; i < 40; i++) {
      const baseLeft = document.createElement('div');
      baseLeft.classList.add('base');
      baseLeft.style.animationDelay = `${i * 0.3}s`;
      dnaHelix.appendChild(baseLeft);
      const baseRight = document.createElement('div');
      baseRight.classList.add('base');
      baseRight.style.animationDelay = `${i * 0.3 + 1.5}s`;
      dnaHelix.appendChild(baseRight);
    }
  }

  // particles
  if (scientificBg) {
    for (let i = 0; i < 80; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      const size = Math.random() * 8 + 2;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${Math.random() * 100}vw`;
      particle.style.top = `${Math.random() * 100}vh`;
      particle.style.animationDuration = `${Math.random() * 20 + 10}s`;
      particle.style.animationDelay = `${Math.random() * 5}s`;
      scientificBg.appendChild(particle);
    }
  }

  // rain
  const rainContainer = document.getElementById('rain-container');
  const DROP_COUNT = 60;
  const drops = [];
  function resetDropProps(drop, initial=false) {
    drop.style.left = `${Math.random() * 100}vw`;
    drop.style.animationDuration = `${(Math.random() * 1.2 + 0.8).toFixed(2)}s`;
    drop.style.animationDelay = `${(Math.random() * 2).toFixed(2)}s`;
    drop.style.opacity = `${Math.random() * 0.5 + 0.3}`;
    if (initial) drop.style.transform = `translateY(${(-10 - Math.random() * 50)}px)`;
    else drop.style.transform = '';
  }
  function initRain() {
    if (!rainContainer) return;
    rainContainer.innerHTML = '';
    drops.length = 0;
    for (let i = 0; i < DROP_COUNT; i++) {
      const drop = document.createElement('div');
      drop.classList.add('drop');
      resetDropProps(drop, true);
      rainContainer.appendChild(drop);
      drops.push(drop);
    }
  }
  function tryCreateRipple() { if (!rainContainer) return; if (Math.random() > 0.9) { const ripple = document.createElement('div'); ripple.classList.add('ripple'); ripple.style.left = `${Math.random() * 100}vw`; ripple.style.bottom = '0'; rainContainer.appendChild(ripple); setTimeout(()=>ripple.remove(),1500); } }
  function refreshRain() { drops.forEach(d => { if (Math.random() > 0.4) resetDropProps(d); }); tryCreateRipple(); }
  initRain(); setInterval(refreshRain, 4000);

  // cursor spark & parallax
  document.addEventListener('mousemove', (e) => {
    const grid = document.querySelector('.grid-overlay');
    if (grid) { const xAxis = (window.innerWidth/2 - e.pageX) / 50; const yAxis = (window.innerHeight/2 - e.pageY) / 50; grid.style.transform = `translate(${xAxis}px, ${yAxis}px)`; }
    if (customCursor) { customCursor.style.left = e.clientX + 'px'; customCursor.style.top = e.clientY + 'px'; }
    const spark = document.createElement('div'); spark.classList.add('spark'); spark.style.left = `${e.pageX - 4}px`; spark.style.top = `${e.pageY - 4}px`; document.body.appendChild(spark); setTimeout(()=>{ if (spark.parentNode) spark.parentNode.removeChild(spark); },500);
  });

  // hover effects
  const hoverElements = document.querySelectorAll('a, button, #fileInput');
  hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => { if (customCursor) customCursor.classList.add('hover'); });
    el.addEventListener('mouseleave', () => { if (customCursor) customCursor.classList.remove('hover'); });
  });

  // init fish
  createFish();

  // classifier UI logic
  const uploadBtn = document.getElementById('uploadBtn');
  const fileInput = document.getElementById('fileInput');
  const status = document.getElementById('status');             // fallback (centered under card)
  const resultArea = document.getElementById('resultArea');
  const summaryText = document.getElementById('summaryText');
  const entriesTbody = document.querySelector('#entriesTable tbody');
  const downloadPdfBtn = document.getElementById('downloadPdfBtn');
  const downloadStatus = document.getElementById('downloadStatus');

  if (downloadPdfBtn) downloadPdfBtn.style.display = 'none';
  let taxaBarChart = null;
  let taxaPieChart = null;

  // helper to set fallback status (kept)
  function setFallbackStatus(msg) {
    if (status) status.innerText = msg;
  }

  // reset upload button (when choosing a new file)
  if (fileInput) {
    fileInput.addEventListener('change', () => {
      if (!uploadBtn) return;
      uploadBtn.disabled = false;
      uploadBtn.classList.remove('loading', 'success');
      uploadBtn.textContent = 'Upload & Analyze';
      setFallbackStatus('');
    });
  }

  if (uploadBtn) {
    uploadBtn.onclick = async () => {
      if (!fileInput || !fileInput.files.length) { setFallbackStatus('Choose a FASTA file first.'); return; }
      const file = fileInput.files[0];

      // set button to uploading state
      uploadBtn.disabled = true;
      uploadBtn.classList.remove('success');
      uploadBtn.classList.add('loading');
      uploadBtn.textContent = 'Uploading...';
      setFallbackStatus('Uploading...');

      const fd = new FormData(); fd.append('file', file);
      try {
        const resp = await fetch('/predict', { method: 'POST', body: fd });
        if (!resp.ok) { const txt = await resp.text(); setFallbackStatus(`Server error ${resp.status}: ${resp.statusText}`); console.error('server error body:', txt); uploadBtn.classList.remove('loading'); uploadBtn.disabled = false; uploadBtn.textContent = 'Upload & Analyze'; return; }
        const data = await resp.json();
        if (data.error) { setFallbackStatus('Error: ' + data.error); uploadBtn.classList.remove('loading'); uploadBtn.disabled = false; uploadBtn.textContent = 'Upload & Analyze'; return; }

        // success
        uploadBtn.classList.remove('loading');
        uploadBtn.classList.add('success');
        uploadBtn.disabled = false;
        uploadBtn.textContent = 'Completed';
        setFallbackStatus('Analysis complete.');

        renderResult(data);
        if (downloadPdfBtn) downloadPdfBtn.style.display = 'inline-block';
        if (downloadStatus) downloadStatus.textContent = '';
      } catch (e) {
        console.error(e);
        setFallbackStatus('Upload failed: ' + (e.message || e));
        uploadBtn.classList.remove('loading');
        uploadBtn.disabled = false;
        uploadBtn.textContent = 'Upload & Analyze';
      }
    };
  }

  function renderResult(data) {
    if (!resultArea || !summaryText) return console.error('Missing resultArea or summaryText in DOM');
    resultArea.classList.remove('hidden');
    summaryText.innerText = data.summary || '';
    if (!entriesTbody) console.warn('No entries table body found');
    else {
      entriesTbody.innerHTML = '';
      (data.entries || []).slice(0,200).forEach(e => {
        const tr = document.createElement('tr');
        const id = escapeHtml(e.id ?? ''); const label = escapeHtml(e.label ?? '');
        const confidence = escapeHtml(typeof e.confidence !== 'undefined' ? String(e.confidence) : '');
        const isNovel = escapeHtml(typeof e.is_novel !== 'undefined' ? String(e.is_novel) : '');
        const length = escapeHtml(typeof e.length !== 'undefined' ? String(e.length) : '');
        tr.innerHTML = `<td>${id}</td><td>${label}</td><td>${confidence}</td><td>${isNovel}</td><td>${length}</td>`;
        entriesTbody.appendChild(tr);
      });
    }

    // charts
    const taxa = data.taxa_counts || {}; const labels = Object.keys(taxa); const counts = labels.map(l => taxa[l]);
    const barEl = document.getElementById('taxaChart');
    if (barEl) {
      const barCtx = barEl.getContext('2d');
      const barBg = labels.map((_,i)=> { const alpha = (0.65 - Math.min(0.35, i*0.02)).toFixed(2); return `rgba(54,162,235,${alpha})`; });
      if (taxaBarChart) { taxaBarChart.data.labels=labels; taxaBarChart.data.datasets[0].data=counts; taxaBarChart.data.datasets[0].backgroundColor=barBg; taxaBarChart.update(); }
      else { if (taxaBarChart) taxaBarChart.destroy(); taxaBarChart = new Chart(barCtx,{ type:'bar', data:{ labels, datasets:[{ label:'Sequence count', data:counts, backgroundColor:barBg }] }, options:{ responsive:true, plugins:{ legend:{ display:false } } } }); }
    }
    const pieEl = document.getElementById('taxaPieChart');
    if (pieEl) {
      const pieCtx = pieEl.getContext('2d');
      const defaultColors = ['rgba(255,99,132,0.7)','rgba(54,162,235,0.7)','rgba(255,206,86,0.7)','rgba(75,192,192,0.7)','rgba(153,102,255,0.7)','rgba(255,159,64,0.7)'];
      const pieColors = []; for (let i=0;i<labels.length;i++) pieColors.push(defaultColors[i % defaultColors.length]);
      if (taxaPieChart) { taxaPieChart.data.labels=labels; taxaPieChart.data.datasets[0].data=counts; taxaPieChart.data.datasets[0].backgroundColor=pieColors; taxaPieChart.update(); }
      else { if (taxaPieChart) taxaPieChart.destroy(); taxaPieChart = new Chart(pieCtx,{ type:'pie', data:{ labels, datasets:[{ data:counts, backgroundColor:pieColors }] }, options:{ responsive:true } }); }
    }
  }

  // ---------- PDF handler (clone + pdf-friendly overrides + fonts wait) ----------
  if (downloadPdfBtn) {
    downloadPdfBtn.addEventListener('click', async () => {
      if (!resultArea) return;
      try {
        if (downloadStatus) downloadStatus.textContent = 'Loading libraries...';
        await ensurePdfLibs();
        if (downloadStatus) downloadStatus.textContent = 'Waiting for fonts...';

        if (document.fonts && document.fonts.ready) {
          await document.fonts.ready;
        }

        if (downloadStatus) downloadStatus.textContent = 'Preparing PDF view...';

        // create offscreen wrapper and clone resultArea into it
        const wrapper = document.createElement('div');
        wrapper.className = 'pdf-friendly';
        const rect = resultArea.getBoundingClientRect();
        wrapper.style.width = rect.width + 'px';

        const clone = resultArea.cloneNode(true);

        // copy canvases (charts) to clone so they render correctly
        const canvases = resultArea.querySelectorAll('canvas');
        if (canvases.length) {
          const cloneCanvases = clone.querySelectorAll('canvas');
          canvases.forEach((c, idx) => {
            const cc = cloneCanvases[idx];
            if (cc && c.width && c.height) {
              cc.width = c.width;
              cc.height = c.height;
              try {
                const ctxSrc = c.getContext('2d');
                const ctxDst = cc.getContext('2d');
                if (ctxSrc && ctxDst) ctxDst.drawImage(c, 0, 0);
              } catch (e) {
                // ignore cross-origin issues
              }
            }
          });
        }

        wrapper.appendChild(clone);
        document.body.appendChild(wrapper);

        // small delay for styles/fonts to apply
        await new Promise(r => setTimeout(r, 80));

        if (downloadStatus) downloadStatus.textContent = 'Capturing...';

        // capture wrapper using html2canvas
        const canvas = await window.html2canvas(wrapper, {
          scale: 1, // use 2 for higher quality
          useCORS: true,
          allowTaint: true,
          scrollY: 0
        });

        wrapper.remove();

        const imgData = canvas.toDataURL('image/png');

        const jsPDFConstructor = (window.jspdf && window.jspdf.jsPDF) ? window.jspdf.jsPDF : (window.jsPDF ? window.jsPDF : null);
        if (!jsPDFConstructor) throw new Error('jsPDF not available');

        const pdf = new jsPDFConstructor('p', 'pt', 'a4');
        const pdfW = pdf.internal.pageSize.getWidth();
        const pdfH = pdf.internal.pageSize.getHeight();
        const margin = 20;
        const imgW = pdfW - margin * 2;
        const imgH = (canvas.height * imgW) / canvas.width;
        const maxH = pdfH - margin * 2;
        let finalW = imgW, finalH = imgH;
        if (imgH > maxH) { finalH = maxH; finalW = (canvas.width * finalH) / canvas.height; }
        pdf.addImage(imgData, 'PNG', margin, margin, finalW, finalH);

        const filename = `edna-result-${new Date().toISOString().slice(0,19).replace(/[:T]/g,'-')}.pdf`;
        pdf.save(filename);

        if (downloadStatus) { downloadStatus.textContent = 'Downloaded'; setTimeout(()=>{ if (downloadStatus) downloadStatus.textContent=''; },2500); }
      } catch (err) {
        console.error('PDF export failed', err);
        if (downloadStatus) downloadStatus.textContent = 'PDF failed: ' + (err.message || err);
      }
    });
  }

  function escapeHtml(s) { return String(s).replace(/[&<>'"]/g, function(c){ return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c]; }); }

})();
