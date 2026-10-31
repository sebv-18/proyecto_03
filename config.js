/* =========================================================
   DATOS DEL LOCAL: edita aquí para cada cliente nuevo
   ========================================================= */
const CONFIG={
  name:["Colico","Restobar"],              // nombre en 1 o 2 líneas
  waName:"Colico Restobar",                // nombre que aparece en el mensaje de WhatsApp y en la pestaña
  place:"Cunco, Araucanía",
  tagline:"Sabores de la zona, preparados al momento.",   // lema de la portada: cámbialo por el que prefieras
  phone:"",                                // ⚠️ WhatsApp con código de país, sin +. Ej: "56912345678"
  address:"Colico 802, Cunco, Araucanía",
  addressShort:"Colico 802, Cunco",
  maps:"https://www.google.com/maps/search/?api=1&query=Colico+802+Cunco+Araucania",
  instagram:"",                            // ej: "https://instagram.com/tu_usuario" (vacío = no se muestra)
  logo:"",                                 // vacío = usa el logo dorado incrustado en logo.js
  monogram:"CR",
  heroPhoto:"",                            // foto de la portada (ej: "img/portada.jpg"). Vacío = portada tipográfica con el logo
  hours:[                                  // horarios del pie de página. Ejemplo: ["Lun a Jue","13:00 – 23:00"]
    // ["Lun a Jue","13:00 – 23:00"],
    // ["Vie y Sáb","13:00 – 02:00"],
  ]
};

/* Categorías (id debe coincidir con el campo "c" de cada producto)
   i: foto opcional de la categoría (ej: "img/chorrillanas.jpg"), se muestra grande junto al título */
const CATS=[
 {id:"chorrillanas",i:"./1.jfif",t:"Chorrillanas",s:"Preparadas al momento, con papas 100% naturales. Ideales para compartir. Puedes pedirlas en carne de vacuno, pollo o vegana."},
 {id:"burgers",i:"./2.jfif",t:"Smash Burgers",s:"Carne seleccionada y producida en la zona. Incluyen porción de papas fritas naturales. Disponibles en vacuno, pollo o vegana."},
 {id:"tablas",i:"./3.jfif",t:"Tablas",s:"Pensadas para compartir y disfrutar en buena compañía."},
 {id:"papas",i:"./4.jpg",t:"Papas fritas",s:"Para 1 a 2 personas o para 3 a 4 personas."},
 {id:"cocteleria",i:"./5.jfif",t:"Coctelería",s:"Cada cóctel se prepara al momento, con licores de calidad, frutas naturales y hielo al punto."},
 {id:"barra",t:"Barra",s:"Cervezas bien heladas, bebidas y jugos naturales."}
];

/* Productos
   c: categoría · n: nombre · d: descripción
   p: precio (null = "Consultar", se confirma por WhatsApp)
   v: opciones con distinto precio, en formato [["2 personas",10000],["4 personas",18000]]
      (si usas v, no pongas p)
   h: subtítulo que agrupa productos dentro de una categoría (ej: "Pisco")
   tag: etiqueta pequeña junto al nombre (ej: "Vegana")
   i: foto opcional (ruta propia como "img/foto.jpg", URL, o ID de Unsplash). Sin foto se muestra la tarjeta compacta.
   big:1 = tarjeta destacada con foto grande (requiere foto) */
const MENU=[
 /* ---------- Chorrillanas ---------- */
 {c:"chorrillanas",n:"Codihue",d:"Papas fritas, cebolla caramelizada, carne de vacuno salteada y huevos fritos.",v:[["2 personas",10000],["4 personas",18000]]},
 {c:"chorrillanas",n:"El Terrón",d:"Papas fritas, carne de vacuno salteada, longaniza artesanal, cebolla caramelizada, queso mantecoso y huevos fritos.",v:[["2 personas",12000],["4 personas",20000]]},
 {c:"chorrillanas",n:"Las Hadas",tag:"Vegetariana",d:"Papas fritas, cebolla caramelizada, champiñones salteados, queso y huevo frito.",v:[["2 personas",10000],["4 personas",18000]]},

 /* ---------- Smash Burgers ---------- */
 {c:"burgers",n:"Cheese Burger",p:6500,d:"Smash burger de 150 g de vacuno, doble queso cheddar fundido y tocino."},
 {c:"burgers",n:"Americana",p:7000,d:"Smash burger de 150 g de vacuno, queso cheddar, lechuga, tomate y cebolla morada fresca."},
 {c:"burgers",n:"Italiana",p:7000,d:"Smash burger de 150 g de vacuno, con palta, tomate y mayonesa."},
 {c:"burgers",n:"Colico",p:8000,d:"Smash burger de 200 g, dividida en dos smash de 100 g, doble queso cheddar, tocino, lechuga y palta."},
 {c:"burgers",n:"Pitrunco",tag:"Vegetariana",p:8000,d:"2 hamburguesas veganas, doble queso cheddar, tocino, lechuga y palta."},
 {c:"burgers",n:"Dicahue",tag:"Vegana",p:8000,d:"2 hamburguesas veganas, lechuga, palta y cebolla caramelizada."},

 /* ---------- Tablas (sin precio informado: se muestra "Consultar") ---------- */
 {c:"tablas",n:"Tabla Centinela",p:null,d:"Para 2 a 4 personas. Mix de quesos, jamón, aceitunas, salame, crackelet, frutas de estación, salsa de ajo, salsa de frambuesa y manjar."},
 {c:"tablas",n:"Tabla Tres Horquetas",p:null,d:"Carne de pollo, vacuno y cerdo, pan blando, palitos crujientes, salsa de ajo y cebolla."},
 {c:"tablas",n:"Tabla Bellavista",p:null,d:"Galletas dulces, empanaditas fritas, chicken fingers, salsa de ajo y cebolla, frutas de estación, salsa de frambuesa y manjar."},

 /* ---------- Papas fritas ---------- */
 {c:"papas",n:"Playa La Isla",d:"Papas fritas.",v:[["1-2 personas",3000],["3-4 personas",5000]]},
 {c:"papas",n:"Playa Hogar",d:"Papas fritas y salchichas.",v:[["1-2 personas",3500],["3-4 personas",6000]]},
 {c:"papas",n:"Playa Ponciano Castro",d:"Papas fritas, tocino y queso derretido.",v:[["1-2 personas",4000],["3-4 personas",8000]]},
 {c:"papas",n:"Playa Ballenato",d:"Papas fritas, chicken fingers y empanaditas de queso.",v:[["1-2 personas",6000],["3-4 personas",12000]]},

 /* ---------- Coctelería ---------- */
 {c:"cocteleria",h:"Pisco",n:"Pisco Sour Clásico",p:3500},
 {c:"cocteleria",h:"Pisco",n:"Pisco Sour Catedral",p:5000},
 {c:"cocteleria",h:"Pisco",n:"Pisco Sour Frambuesa",p:3500},
 {c:"cocteleria",h:"Pisco",n:"Piscola Mistral Alto",p:3500},
 {c:"cocteleria",h:"Pisco",n:"Piscola Nobel",p:5000},
 {c:"cocteleria",h:"Ron",n:"Mojito Clásico",p:4500},
 {c:"cocteleria",h:"Ron",n:"Mojito sin alcohol",p:4000},
 {c:"cocteleria",h:"Ron",n:"Mojito Sabores",p:5000},
 {c:"cocteleria",h:"Ron",n:"Cuba Libre",p:3000},
 {c:"cocteleria",h:"Gin",n:"Gin Tonic",p:5500},
 {c:"cocteleria",h:"Gin",n:"Gin Tonic Berries",p:6000},
 {c:"cocteleria",h:"Gin",n:"Tropical Gin",p:6500},

 /* ---------- Barra ---------- */
 {c:"barra",n:"Bebida CCU Express",p:1000},
 {c:"barra",n:"Agua mineral 500 ml",p:1500},
 {c:"barra",n:"Cerveza en lata",p:1500},
 {c:"barra",n:"Bebida lata",p:2000},
 {c:"barra",n:"Cerveza",d:"Elige tu marca.",v:[["Cors",2500],["Royal",2500]]},
 {c:"barra",n:"Cerveza",d:"Elige tu marca.",v:[["Kuntsman",3000],["Corona",3000],["Miller",3000],["Austral",3000],["Cero",3000]]},
 {c:"barra",n:"Jugo natural",d:"Elige tu sabor.",v:[["Frambuesa",3000],["Frutilla",3000],["Arándano",3000],["Melón tuna",3000],["Calameño",3000]]},
 {c:"barra",n:"Bebida 2 lt",d:"Elige tu sabor.",v:[["Coca-Cola",3500],["Fanta",3500],["Sprite",3500]]},
 {c:"barra",n:"Base michelada",p:1000}
];