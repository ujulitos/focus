/* Copyright uJL 2019. */

var conection = true;
var mostrarAlertas = false;
var contentPath = "contenido/";
var mobileCurse = false;
var navegationBlock = false;
var hayEvaluacion = false;
var minimoAprobatorio = 80;
var haySubtitulos = true;
var conIntentos = false;
var maxIntentos = 2;
var intento = 0;
var sourceHeigth = 750;
var sourceWidth = 1200;
var posTopPantalla = 0;
var posBottomPantalla = 0;
var altoPantalla = 750;
var pantallaCompleta = false;

/* Pantallas del curso */
var course = new Object();
course.pages = [
    { title: "Pantalla", url: "Maypo_Almacen_01.html", navegacion: true, menu: true },
    // { title: "Pantalla", url: "Maypo_Almacen_02.html", navegacion: true, menu: true },
    { title: "Pantalla", url: "Maypo_Almacen_03.html", navegacion: true, menu: true },
    { title: "Pantalla", url: "Maypo_Almacen_04.html", navegacion: true, menu: true }
];

/* Pantallas de recursos */
var recursos = new Object();
recursos.pages = [
    { title: "Índice", url: "indice.html", navegacion: true, menu: true },
    { title: "Ayuda", url: "ayuda.html", navegacion: true, menu: true }
];

/* Audios del curso */
var grupoAudios = new buzz.group([
    /*00*/ new buzz.sound("contenido/audios/audio0", { formats: ["mp3"], preload: true })
]);

/* Videos del curso */
var grupoVideos = [
    /*00*/ 'video0',
    /*01*/ 'video1',
    /*02*/ 'video2',
    /*03*/ 'video3',
    /*04*/ 'video4',
    /*05*/ 'video5',
    /*06*/ 'video6',
    /*07*/ 'video7'
];