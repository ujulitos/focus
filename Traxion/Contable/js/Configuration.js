/* Copyright uJL 2019. */

var conection = true;
var mostrarAlertas = false;
var contentPath = "contenido/";
var mobileCurse = false;
var navegationBlock = true;
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
    { title: "Pantalla", url: "Txn_Mngr_ECP__01.html", navegacion: true, menu: true },
    { title: "Pantalla", url: "Txn_Mngr_ECP__02.html", navegacion: true, menu: true },
    { title: "Pantalla", url: "Txn_Mngr_ECP__03.html", navegacion: true, menu: true },
    { title: "Pantalla", url: "Txn_Mngr_ECP_01Finiquito_01.html", navegacion: true, menu: true },
    { title: "Pantalla", url: "Txn_Mngr_ECP_02Creditos_01.html", navegacion: true, menu: true },
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
    /*1*/ new buzz.sound("contenido/audios/ins", { formats: ["mp3"], preload: true }),
    /*2*/ new buzz.sound("contenido/audios/Txn_Mngr_ECP_02_01", { formats: ["mp3"], preload: true }),
    /*3*/ new buzz.sound("contenido/audios/Finiquito_01", { formats: ["mp3"], preload: true }),
    /*4*/ new buzz.sound("contenido/audios/Finiquito_02", { formats: ["mp3"], preload: true }),
    /*5*/ new buzz.sound("contenido/audios/Finiquito_02b", { formats: ["mp3"], preload: true }),
    /*6*/ new buzz.sound("contenido/audios/Finiquito_03", { formats: ["mp3"], preload: true }),
    /*7*/ new buzz.sound("contenido/audios/Finiquito_04", { formats: ["mp3"], preload: true }),
    /*8*/ new buzz.sound("contenido/audios/Finiquito_05", { formats: ["mp3"], preload: true }),
    /*9*/ new buzz.sound("contenido/audios/Finiquito_06", { formats: ["mp3"], preload: true }),
    /*10*/ new buzz.sound("contenido/audios/Finiquito_07", { formats: ["mp3"], preload: true }),
    /*11*/ new buzz.sound("contenido/audios/Finiquito_08", { formats: ["mp3"], preload: true }),
    /*12*/ new buzz.sound("contenido/audios/Finiquito_09", { formats: ["mp3"], preload: true }),
    /*13*/ new buzz.sound("contenido/audios/Infonavit_01", { formats: ["mp3"], preload: true }),
    /*14*/ new buzz.sound("contenido/audios/Infonavit_02", { formats: ["mp3"], preload: true }),
    /*15*/ new buzz.sound("contenido/audios/Infonavit_03_04", { formats: ["mp3"], preload: true }),
    /*16*/ new buzz.sound("contenido/audios/Infonavit_05_06", { formats: ["mp3"], preload: true }),
    /*17*/ new buzz.sound("contenido/audios/Infonavit_07_08", { formats: ["mp3"], preload: true }),
    /*18*/ new buzz.sound("contenido/audios/Infonavit_09", { formats: ["mp3"], preload: true }),
    /*19*/ new buzz.sound("contenido/audios/Infonavit_10", { formats: ["mp3"], preload: true }),
    /*20*/ new buzz.sound("contenido/audios/Infonavit_11", { formats: ["mp3"], preload: true }),
    /*21*/ new buzz.sound("contenido/audios/Infonavit_12", { formats: ["mp3"], preload: true }),
]);
