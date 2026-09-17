/* ══════════════════════════════════════════════════════════════
   DATOS EDITABLES
   ─ info: párrafos de la ficha (el primero se usa también como
     resumen en la tarjeta del recorrido).
   ─ image: ruta relativa a la foto (assets/img/...). HERO_IMAGE: ruta o URL de
     una imagen aérea para el fondo de la portada (vacío = mosaico satelital).
   ─ imagePos: qué parte de la foto se ve al recortarla (ej. "center 20%").
   ══════════════════════════════════════════════════════════════ */

const HERO_IMAGE = ""; // imagen aérea/satelital de San Miguel para el fondo de la portada

const TIPOS = {
  historico: { label: "Lugar histórico", color: "#C4342B" },
  calle:     { label: "Calle / avenida", color: "#10305A" },
  transporte:{ label: "Transporte",      color: "#3E8ACB" },
  espacio:   { label: "Espacio público", color: "#5E8C6F" }
};

const LUGARES = [
  {
    id: "plaza17", num: "01", name: "Plaza 17 de Octubre", type: "espacio",
    lat: -34.5530, lon: -58.7457,
    pin: "Centro de la plaza (polígono del GIS municipal).",
    info: [
      "El 17 de Octubre se relaciona con la movilización obrera del 17 de octubre de 1945, cuando una gran cantidad de trabajadores se movilizó para pedir la liberación de Juan Domingo Perón, que había sido detenido y trasladado a la isla Martín García. Este hecho fue muy importante porque marcó el crecimiento político de Perón y del movimiento obrero que lo apoyaba.",
      "La Plaza 17 de Octubre está en San Miguel, en la zona de Mansilla, en el área urbana del partido. La ubicación registrada es Mansilla 2741, San Miguel.",
      "Es un espacio público de escala barrial, utilizado como plaza y lugar de encuentro. No tiene la función de una avenida principal, sino de espacio verde.",
      "El nombre recuerda directamente el 17 de octubre de 1945, una fecha fundamental para el peronismo y para la historia política argentina."
    ],
    image: "assets/img/plaza17.jpg"
  },
  {
    id: "tren", num: "02", name: "Ferrocarril San Martín", type: "transporte",
    lat: -34.54456, lon: -58.71259,
    pin: "Andenes de la estación San Miguel (GIS municipal, capa Ferrocarril).",
    info: [
      "El Ferrocarril San Martín es una línea ferroviaria que atraviesa el partido de San Miguel. Actualmente tiene estaciones en Bella Vista, Muñiz y San Miguel, por lo que forma parte de la vida cotidiana y de la organización territorial de la zona.",
      "En el partido de San Miguel, el recorrido pasa por las localidades de Bella Vista, Muñiz y San Miguel, conectándolas con otras zonas del Gran Buenos Aires y con la Ciudad de Buenos Aires.",
      "Es un eje importante de transporte y comunicación. Las estaciones funcionan como puntos de concentración de actividades comerciales, circulación de personas y conexión entre distintas localidades.",
      "El ferrocarril originalmente se llamaba Buenos Aires al Pacífico. Después de la nacionalización de los ferrocarriles durante el gobierno de Perón, pasó a llamarse Ferrocarril Nacional General San Martín, denominación que comenzó a utilizarse desde 1949. El nombre hacía referencia al general José de San Martín."
    ],
    image: "assets/img/tren.jpg"
  },
  {
    id: "campo", num: "03", name: "Campo de Mayo", type: "historico",
    lat: -34.5495, lon: -58.6782,
    pin: "Puerta 4, acceso sobre Av. Pte. Illia (Ruta 8), del lado de San Miguel. El predio completo se dibuja en el mapa.",
    info: [
      "Campo de Mayo es una importante guarnición militar ubicada en el partido de San Miguel. Su relación con el capítulo está principalmente en la Revolución del 4 de junio de 1943: allí se reunieron jefes militares y miembros del GOU, y desde la guarnición partieron tropas hacia la Ciudad de Buenos Aires para derrocar al presidente Ramón Castillo.",
      "Se encuentra en el partido de San Miguel, delimitado aproximadamente por las rutas nacionales 8 y 9, la Ruta Provincial 202 y el Camino de Cintura.",
      "Es un espacio muy extenso dentro del partido y tiene un carácter principalmente militar, aunque también representa un espacio importante desde el punto de vista histórico, ambiental y patrimonial. Actualmente una parte está destinada al Espacio para la Memoria y a la Reserva Urbana de la Defensa."
    ],
    image: "assets/img/campo.jpg"
  },
  {
    id: "arricau", num: "04", name: "Intendente Arricau", type: "calle",
    lat: -34.552624, lon: -58.758305, imagePos: "center 42%",
    pin: "Esquina con Av. Int. Remigio López, en la zona comercial de Santa María (altura 4400). La calle completa se dibuja en el mapa.",
    info: [
      "El nombre corresponde a Fernando Arricau, quien fue intendente de la zona de San Miguel/General Sarmiento. La calle lleva el título de Intendente Arricau, por lo que el homenaje está relacionado con su función en la administración municipal.",
      "La calle Intendente Arricau atraviesa diferentes sectores de San Miguel y también tiene continuidad hacia el límite con José C. Paz. El callejero del Área Metropolitana la registra específicamente dentro de San Miguel.",
      "Tiene una función importante de conexión entre distintos barrios. Algunos tramos están clasificados dentro de la red de calles de circulación de mayor importancia del partido.",
      "La denominación Intendente Arricau se debe al reconocimiento de su función como intendente."
    ],
    image: "assets/img/arricau.jpg"
  },
  {
    id: "peron", num: "05", name: "Av. Pte. J. D. Perón", type: "calle",
    lat: -34.542248, lon: -58.712055, imagePos: "center 18%",
    pin: "Cruce con Av. Dr. Ricardo Balbín, frente a la Plaza Sarmiento y a una cuadra de la estación. La avenida completa se dibuja en el mapa.",
    info: [
      "Juan Domingo Perón fue un militar y político argentino. Fue presidente de la Argentina y tuvo un papel central en la política del país desde mediados de la década de 1940. Su gobierno impulsó políticas relacionadas con los trabajadores, los salarios, la industria y la intervención del Estado en la economía.",
      "La Avenida Presidente Perón atraviesa sectores importantes de San Miguel y Muñiz, conectando diferentes zonas del partido. Documentación municipal ubica tramos de la avenida entre Sargento Cabral y Pardo, en Muñiz, y también aparecen recorridos de transporte que utilizan la avenida.",
      "Es una avenida principal y una arteria de circulación importante, utilizada por el transporte público y por el tránsito entre distintos barrios. Por eso tiene una función mucho más importante que una calle residencial secundaria.",
      "El nombre homenajea a Juan Domingo Perón, debido a su importancia histórica y política. La denominación se relaciona directamente con la fuerte presencia que tuvo el peronismo en la historia política y social de San Miguel y del país."
    ],
    image: "assets/img/peron.jpg"
  },
  {
    id: "martin", num: "06", name: "Martín García", type: "calle",
    lat: -34.5797, lon: -58.7475,
    pin: "Frente a la Plaza Manuel Belgrano (Génova, M. García, Belgrano y H. Binda), el tramo más arbolado de la calle. La calle completa se dibuja en el mapa.",
    info: [
      "Martín García fue un militar y marino español cuyo nombre quedó asociado principalmente a la Isla Martín García, ubicada en el Río de la Plata. Para nuestro trabajo, lo importante es que Juan Domingo Perón fue trasladado y detenido allí en octubre de 1945, antes de la movilización del 17 de octubre.",
      "La calle Martín García se encuentra en distintos sectores del partido de San Miguel, incluyendo la zona de Trujui. La Municipalidad menciona, por ejemplo, obras sobre Martín García desde Pardo hasta la Ruta Provincial 23.",
      "Tiene una función de conexión entre barrios, especialmente en sectores periféricos del partido. No es una de las principales avenidas centrales, pero sí forma parte de la red vial que comunica diferentes zonas.",
      "La calle lleva el nombre de Martín García, asociado históricamente a la isla que tuvo un papel importante en la historia argentina. En el caso de nuestro tema, el nombre permite relacionarla con el episodio de 1945: Perón fue enviado allí antes del 17 de Octubre."
    ],
    image: "assets/img/martin.jpg"
  }
];
