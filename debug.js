// ── modo diagnóstico: agregá ?debug a la URL ──
if (location.search.includes('debug')) (function(){
  const box = document.createElement('pre'); box.id = 'dbg';
  box.style.cssText = 'position:fixed;left:8px;right:8px;bottom:8px;z-index:9999;background:rgba(0,0,0,.85);color:#9f9;font:11px/1.4 monospace;padding:8px;border-radius:8px;max-height:42vh;overflow:auto;white-space:pre-wrap;pointer-events:none';
  const pend = [];
  const log = m => { if (document.body) { if (!box.parentNode) document.body.appendChild(box); box.textContent += m + '\n'; box.scrollTop = 1e6; } else pend.push(m); };
  window.__dbg = log;
  window.addEventListener('error', e => log('ERROR: ' + e.message + ' @' + e.lineno));
  window.addEventListener('unhandledrejection', e => log('PROMESA: ' + (e.reason && e.reason.message || e.reason)));
  document.addEventListener('DOMContentLoaded', () => {
    pend.forEach(log); pend.length = 0;
    log('UA: ' + navigator.userAgent); log('url: ' + location.href);
    log('viewport: ' + innerWidth + 'x' + innerHeight + ' dpr ' + devicePixelRatio + ' · svh: ' + (window.CSS && CSS.supports('height', '1svh')) + ' · touch: ' + ('ontouchstart' in window));
    const tick = () => { if (window.SMMap && SMMap.tileStats) { const s = SMMap.tileStats(); log('tiles [' + s.modo + ' · ' + s.proveedor + '] pedidos ' + s.pedidos + ' · ok ' + s.ok + ' · error ' + s.error + (s.ultimoError ? ' · último error: ' + s.ultimoError : '')); } };
    setTimeout(tick, 3000); setTimeout(tick, 8000);
    setTimeout(() => { const t = document.querySelectorAll('.hero-tiles img'); let ok = 0; t.forEach(i => { if (i.complete && i.naturalWidth) ok++; }); log('portada: ' + ok + '/' + t.length + ' imágenes cargadas'); }, 5000);
    document.addEventListener('click', () => setTimeout(() => { const pn = document.getElementById('panel'); if (!pn || !pn.classList.contains('is-open')) return; const r = pn.getBoundingClientRect(); const t = document.elementFromPoint(r.left + r.width/2, r.top + r.height/2); log('ficha: padre=' + pn.parentNode.tagName + ' · arriba del panel: ' + (t ? (t.id ? '#' + t.id : '.' + t.className) : 'nada') + (pn.contains(t) ? ' ✓' : ' ✗ TAPADO')); }, 1500));
  });
})();
