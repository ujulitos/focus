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
var sourceHeigth = 648;
var sourceWidth = 1152;
var posTopPantalla = 0;
var posBottomPantalla = 0;
var altoPantalla = 648;
var pantallaCompleta = false;

/* Pantallas del curso */
var course = new Object();
course.pages = [
    { title: "Pantalla", url: "SAP_Nomina_Admin_01.html", navegacion: true, menu: true },
    { title: "Pantalla", url: "SAP_Nomina_Admin_02.html", navegacion: true, menu: true },
    { title: "Pantalla", url: "SAP_Nomina_Admin_03.html", navegacion: true, menu: true },
    { title: "Pantalla", url: "SAP_Nomina_Admin_04.html", navegacion: true, menu: true },
    { title: "Pantalla", url: "SAP_Nomina_Admin_05.html", navegacion: true, menu: true },
    { title: "Pantalla", url: "SAP_Nomina_Admin_06.html", navegacion: true, menu: true },
    { title: "Pantalla", url: "SAP_Nomina_Admin_07.html", navegacion: true, menu: true },
    { title: "Pantalla", url: "SAP_Nomina_Admin_08.html", navegacion: true, menu: true },
    { title: "Pantalla", url: "SAP_Nomina_Admin_09.html", navegacion: true, menu: true },
    { title: "Pantalla", url: "SAP_Nomina_Admin_10.html", navegacion: true, menu: true },
    { title: "Pantalla", url: "SAP_Nomina_Admin_11.html", navegacion: true, menu: true },
    { title: "Pantalla", url: "SAP_Nomina_Admin_12.html", navegacion: true, menu: true },
    { title: "Pantalla", url: "SAP_Nomina_Admin_13.html", navegacion: true, menu: true },
    { title: "Pantalla", url: "SAP_Nomina_Admin_14.html", navegacion: true, menu: true },
    { title: "Pantalla", url: "SAP_Nomina_Admin_15.html", navegacion: true, menu: true },
    { title: "Pantalla", url: "SAP_Nomina_Admin_16.html", navegacion: true, menu: true },
    { title: "Pantalla", url: "SAP_Nomina_Admin_17.html", navegacion: true, menu: true }
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
    /*1*/ new buzz.sound("contenido/audios/SAP_Nomina_Admin_01_01", { formats: ["mp3"], preload: true }),
    /*2*/ new buzz.sound("contenido/audios/SAP_Nomina_Admin_02_01", { formats: ["mp3"], preload: true }),
    /*3*/ new buzz.sound("contenido/audios/SAP_Nomina_Admin_03_01", { formats: ["mp3"], preload: true }),
    /*4*/ new buzz.sound("contenido/audios/SAP_Nomina_Admin_04_01", { formats: ["mp3"], preload: true }),
    /*5*/ new buzz.sound("contenido/audios/SAP_Nomina_Admin_05_01", { formats: ["mp3"], preload: true }),
    /*6*/ new buzz.sound("contenido/audios/SAP_Nomina_Admin_06_01", { formats: ["mp3"], preload: true }),
    /*7*/ new buzz.sound("contenido/audios/SAP_Nomina_Admin_07_01", { formats: ["mp3"], preload: true }),
    /*8*/ new buzz.sound("contenido/audios/SAP_Nomina_Admin_08_01", { formats: ["mp3"], preload: true }),
    /*9*/ new buzz.sound("contenido/audios/SAP_Nomina_Admin_09_01", { formats: ["mp3"], preload: true }),
    /*10*/ new buzz.sound("contenido/audios/SAP_Nomina_Admin_10_01", { formats: ["mp3"], preload: true }),
    /*11*/ new buzz.sound("contenido/audios/SAP_Nomina_Admin_11_01", { formats: ["mp3"], preload: true }),
    /*12*/ new buzz.sound("contenido/audios/SAP_Nomina_Admin_12_01", { formats: ["mp3"], preload: true }),
    /*13*/ new buzz.sound("contenido/audios/SAP_Nomina_Admin_12_02", { formats: ["mp3"], preload: true }),
    /*14*/ new buzz.sound("contenido/audios/SAP_Nomina_Admin_13_01", { formats: ["mp3"], preload: true }),
    /*15*/ new buzz.sound("contenido/audios/SAP_Nomina_Admin_14_01", { formats: ["mp3"], preload: true }),
    /*16*/ new buzz.sound("contenido/audios/SAP_Nomina_Admin_16_01", { formats: ["mp3"], preload: true }),
    /*17*/ new buzz.sound("contenido/audios/SAP_Nomina_Admin_16_02", { formats: ["mp3"], preload: true }),
    /*18*/ new buzz.sound("contenido/audios/SAP_Nomina_Admin_16_03", { formats: ["mp3"], preload: true }),
    /*19*/ new buzz.sound("contenido/audios/SAP_Nomina_Admin_16_04", { formats: ["mp3"], preload: true }),
    /*20*/ new buzz.sound("contenido/audios/SAP_Nomina_Admin_16_05", { formats: ["mp3"], preload: true }),
    /*21*/ new buzz.sound("contenido/audios/SAP_Nomina_Admin_16_06", { formats: ["mp3"], preload: true }),
    /*22*/ new buzz.sound("contenido/audios/SAP_Nomina_Admin_16_07", { formats: ["mp3"], preload: true }),
    /*23*/ new buzz.sound("contenido/audios/SAP_Nomina_Admin_16_08", { formats: ["mp3"], preload: true }),
    /*24*/ new buzz.sound("contenido/audios/SAP_Nomina_Admin_16_09", { formats: ["mp3"], preload: true }),
    /*25*/ new buzz.sound("contenido/audios/SAP_Nomina_Admin_16_10", { formats: ["mp3"], preload: true }),
    /*26*/ new buzz.sound("contenido/audios/SAP_Nomina_Admin_16_11", { formats: ["mp3"], preload: true }),
    /*27*/ new buzz.sound("contenido/audios/SAP_Nomina_Admin_16_12", { formats: ["mp3"], preload: true }),
    /*28*/ new buzz.sound("contenido/audios/SAP_Nomina_Admin_16_13", { formats: ["mp3"], preload: true }),
    /*29*/ new buzz.sound("contenido/audios/SAP_Nomina_Admin_16_14", { formats: ["mp3"], preload: true }),
    /*30*/ new buzz.sound("contenido/audios/SAP_Nomina_Admin_16_15", { formats: ["mp3"], preload: true }),
    /*31*/ new buzz.sound("contenido/audios/SAP_Nomina_Admin_16_16", { formats: ["mp3"], preload: true }),
    /*32*/ new buzz.sound("contenido/audios/SAP_Nomina_Admin_16_17", { formats: ["mp3"], preload: true }),
    /*33*/ new buzz.sound("contenido/audios/SAP_Nomina_Admin_16_18", { formats: ["mp3"], preload: true }),
    /*34*/ new buzz.sound("contenido/audios/SAP_Nomina_Admin_17_01", { formats: ["mp3"], preload: true })
]);
