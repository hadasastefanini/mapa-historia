# San Miguel: un mapa de la historia

Página web interactiva (trabajo de Historia): seis lugares de San Miguel, Buenos Aires,
y su relación con la historia de Perón (1943–1953). Sitio estático: HTML + CSS + JS,
sin frameworks ni proceso de build. Se sube y funciona.

## Estructura

```
mapa-historia/
├── index.html          → página principal (estructura)
├── .nojekyll           → le dice a GitHub Pages que publique los archivos tal cual
├── README.md
├── css/
│   └── style.css       → todos los estilos (colores y tipografías en :root, al principio)
├── js/
│   ├── config.js       → opciones: LIVE_TILES, número de versión, API key de Google (opcional)
│   ├── debug.js        → panel de diagnóstico (se activa agregando ?debug a la URL)
│   ├── geo.js          → calles, vías, Campo de Mayo y plazas (GIS de la Municipalidad de San Miguel)
│   ├── data.js         → LOS DATOS: los 6 lugares (textos, coordenadas, fotos)
│   ├── app.js          → motor de mapa propio (pan/zoom, tiles con fallback) + interfaz
│   └── google.js       → adaptador opcional para Google Maps
└── assets/
    └── img/
        ├── plaza17.jpg
        ├── tren.jpg
        ├── campo.jpg
        ├── arricau.jpg
        ├── peron.jpg
        └── martin.jpg
```

Todas las rutas son relativas (`css/…`, `js/…`, `assets/…`), así que funciona tanto en
`https://usuario.github.io/nombre-del-repo/` como en la raíz de un dominio.

## Publicar en GitHub Pages

1. Creá un repositorio público y subí **todo el contenido** de esta carpeta a la raíz
   (index.html tiene que quedar en el primer nivel, no adentro de una subcarpeta).
2. Settings → Pages → Build and deployment → Source: *Deploy from a branch* →
   Branch: `main` / `(root)` → Save.
3. En 1–2 minutos la página queda en `https://usuario.github.io/nombre-del-repo/`.

No hace falta configurar nada más: no hay build, no hay dependencias, no hay variables.

## Recursos externos (se cargan en vivo desde internet)

- Tipografías: Google Fonts (Bricolage Grotesque, Instrument Sans, IBM Plex Mono).
  Si no cargan, la página usa Helvetica/Arial y sigue funcionando.
- Mapa de calles: CARTO → Esri → OpenStreetMap (con cambio automático si uno falla).
- Satélite y fondo de portada: Esri World Imagery.

## Cómo cambiar el contenido

- Textos, coordenadas o fotos de un lugar → `js/data.js` (campo `info` = párrafos;
  `image` = ruta a la foto; `imagePos` = qué parte de la foto se ve al recortarla).
- Colores y tipografías → `css/style.css`, bloque `:root`.
- Google Maps en vez de CARTO/Esri → pegar la API key en `js/config.js`.
- Diagnóstico → abrir la página con `?debug` al final de la URL.
