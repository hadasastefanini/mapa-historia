/* ══════════════════════════════════════════════════════════════
   ADAPTADOR GOOGLE MAPS
   Se activa solo si GOOGLE_MAPS_KEY tiene valor. Expone la misma
   interfaz SMMap que el motor propio, así el resto no cambia.
   ══════════════════════════════════════════════════════════════ */
(function(){
  if (!window.GOOGLE_MAPS_KEY) return;
  const mapEl = document.getElementById('map');
  ['mapSvg', 'ov', 'tiles', 'mapHint'].forEach(id => { const n = document.getElementById(id); if (n) n.hidden = true; });
  const gdiv = document.createElement('div'); gdiv.id = 'gmap'; gdiv.style.cssText = 'position:absolute;inset:0'; mapEl.appendChild(gdiv);
  mapEl.style.touchAction = 'auto'; mapEl.style.cursor = '';
  const isMobile = () => matchMedia('(max-width: 720px)').matches;

  window.__gmapsReady = function(){
    const g = google.maps;
    const map = new g.Map(gdiv, {
      center: { lat: -34.553, lng: -58.69 }, zoom: 13,
      mapTypeId: 'roadmap', disableDefaultUI: true, gestureHandling: 'greedy', clickableIcons: false,
      restriction: { latLngBounds: { north: -34.47, south: -34.63, west: -58.83, east: -58.56 }, strictBounds: false },
      minZoom: 12, maxZoom: 19,
      styles: [{ featureType: 'poi', stylers: [{ visibility: 'off' }] }, { featureType: 'transit.station', stylers: [{ visibility: 'simplified' }] }]
    });
    // geometrías propias encima del mapa de Google (Campo de Mayo, las tres calles, plazas)
    const KEEP = { campo: { fillColor: '#5E8C6F', fillOpacity: .15, strokeColor: '#5E8C6F', strokeWeight: 1.5 },
                   street: { strokeColor: '#3E8ACB', strokeWeight: 4, strokeOpacity: .85 },
                   plaza: { fillColor: '#5E8C6F', fillOpacity: .35, strokeColor: '#5E8C6F', strokeWeight: 1 } };
    map.data.addGeoJson({ type: 'FeatureCollection', features: GEO.features.filter(f => KEEP[f.properties.kind]) });
    map.data.setStyle(f => Object.assign({ clickable: false }, KEEP[f.getProperty('kind')]));

    // capa de marcadores HTML (misma apariencia que en el motor propio)
    const items = [];
    const Layer = function(){}; Layer.prototype = new g.OverlayView();
    Layer.prototype.onAdd = function(){ const pane = this.getPanes().overlayMouseTarget; items.forEach(o => pane.appendChild(o.el)); };
    Layer.prototype.draw = function(){
      const pr = this.getProjection(); if (!pr) return;
      items.forEach(o => { const p = pr.fromLatLngToDivPixel(new g.LatLng(o.lat, o.lng)); o.el.style.transform = `translate(${p.x}px, ${p.y}px) translate(-50%,-50%)`; o.el.style.left = 0; o.el.style.top = 0; });
    };
    const layer = new Layer(); layer.setMap(map);
    const px = (lat, lng) => { const pr = layer.getProjection(); return pr ? pr.fromLatLngToDivPixel(new g.LatLng(lat, lng)) : null; };

    function flyTo(lat, lng, z, opt){
      opt = opt || {};
      const tz = z == null ? map.getZoom() : Math.round(z);
      if (lat == null) { map.setZoom(tz); opt.done && opt.done(); return; }
      // corrimiento en px para dejar lugar al panel (desktop) o al bottom sheet (mobile)
      const dx = opt.dx || 0, dy = opt.dy || 0;
      if (Math.abs(tz - map.getZoom()) > 0.4) map.setZoom(tz);
      map.panTo({ lat, lng });
      if (dx || dy) g.event.addListenerOnce(map, 'idle', () => map.panBy(dx, dy));
      opt.done && setTimeout(opt.done, 500);
    }
    function fitPoints(pts, pad, opt){
      const b = new g.LatLngBounds(); pts.forEach(p => b.extend({ lat: p.lat, lng: p.lon }));
      map.fitBounds(b, { top: pad, bottom: pad, left: pad, right: pad + (opt && opt.right || 0) });
      g.event.addListenerOnce(map, 'idle', () => { if (map.getZoom() > 15) map.setZoom(15); });
    }
    function setMode(m){
      map.setMapTypeId(m === 'sat' ? 'hybrid' : 'roadmap');
      mapEl.classList.toggle('is-sat', m === 'sat');
      document.getElementById('btnMapa').setAttribute('aria-pressed', m === 'map');
      document.getElementById('btnSat').setAttribute('aria-pressed', m === 'sat');
      document.getElementById('mapAttr').textContent = 'Datos: GIS Municipalidad de San Miguel';
    }
    document.getElementById('zin').addEventListener('click', () => map.setZoom(map.getZoom() + 1));
    document.getElementById('zout').addEventListener('click', () => map.setZoom(map.getZoom() - 1));
    map.addListener('click', () => { if (window.SMUI && !isMobile()) { /* click en el mapa no cierra la ficha */ } });

    window.SMMap = {
      project: (lat, lon) => [lon, lat],
      flyTo, fitPoints, setMode,
      addMarker(m){ const L = m.place; items.push({ el: m.el, lat: L.lat, lng: L.lon }); if (layer.getPanes()) { layer.getPanes().overlayMouseTarget.appendChild(m.el); layer.draw(); } },
      get zoom(){ return map.getZoom(); }, get width(){ return mapEl.getBoundingClientRect().width; }, render(){ layer.draw(); }, google: map
    };
    // marco inicial: todo el partido
    fitPoints([{ lat: -34.503, lon: -58.777 }, { lat: -34.606, lon: -58.606 }], 24);
    window.__initUI && window.__initUI();
  };
  const s = document.createElement('script');
  s.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(window.GOOGLE_MAPS_KEY)}&callback=__gmapsReady&language=es&region=AR&v=weekly`;
  s.async = true; s.onerror = () => { document.getElementById('mapAttr').textContent = 'No se pudo cargar Google Maps: revisá la API key.'; };
  document.head.appendChild(s);
})();
