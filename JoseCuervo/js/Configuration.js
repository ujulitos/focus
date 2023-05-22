/* Copyright uJL 2019. */

var conection = true;
var mostrarAlertas = false;
var contentPath = "contenido/";
var mobileCurse = false;
var navegationBlock = false;
var hayEvaluacion = false;
var minimoAprobatorio = 80;
var haySubtitulos = false;
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
    { title: "Pantalla", url: "JCuervo_CVE_EstOrg_01.html", navegacion: true, menu: true },
    { title: "Pantalla", url: "JCuervo_CVE_EstOrg_02.html", navegacion: true, menu: true },
    { title: "Pantalla", url: "JCuervo_CVE_EstOrg_03.html", navegacion: true, menu: true },
];

/* Pantallas de recursos */
var recursos = new Object();
recursos.pages = [
    { title: "Índice", url: "indice.html", navegacion: true, menu: true },
    { title: "Ayuda", url: "ayuda.html", navegacion: true, menu: true }
];

/* Audios del curso */
var grupoAudios = new buzz.group([
    /*0*/ new buzz.sound("contenido/audios/audio0", { formats: ["mp3"], preload: true }),
    /*0*/ new buzz.sound("contenido/audios/audio0", { formats: ["mp3"], preload: true }),
    /*0*/ new buzz.sound("contenido/audios/audio0", { formats: ["mp3"], preload: true }),
]);
