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
    { title: "Pantalla", url: "JCuervo_CVE_EstOrg_01.html", navegacion: true, menu: true },
    { title: "Pantalla", url: "JCuervo_CVE_EstOrg_02.html", navegacion: true, menu: true },
    { title: "Pantalla", url: "JCuervo_CVE_EstOrg_03.html", navegacion: true, menu: true },
    { title: "Pantalla", url: "JCuervo_CVE_EstOrg_04.html", navegacion: true, menu: true },
    { title: "Pantalla", url: "JCuervo_CVE_EstOrg_05.html", navegacion: true, menu: true },
    { title: "Pantalla", url: "JCuervo_CVE_EstOrg_06.html", navegacion: true, menu: true },
    { title: "Pantalla", url: "JCuervo_CVE_EstOrg_07.html", navegacion: true, menu: true },
    { title: "Pantalla", url: "JCuervo_CVE_EstOrg_08.html", navegacion: true, menu: true },
    { title: "Pantalla", url: "JCuervo_CVE_EstOrg_09.html", navegacion: true, menu: true },
    { title: "Pantalla", url: "JCuervo_CVE_EstOrg_10.html", navegacion: true, menu: true }
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
    /*1*/ new buzz.sound("contenido/audios/audio0", { formats: ["mp3"], preload: true }),
    /*2*/ new buzz.sound("contenido/audios/audio0", { formats: ["mp3"], preload: true }),
    /*3*/ new buzz.sound("contenido/audios/audio0", { formats: ["mp3"], preload: true }),
    /*4*/ new buzz.sound("contenido/audios/audio0", { formats: ["mp3"], preload: true }),
    /*5*/ new buzz.sound("contenido/audios/audio0", { formats: ["mp3"], preload: true }),
    /*6*/ new buzz.sound("contenido/audios/audio0", { formats: ["mp3"], preload: true }),
    /*7*/ new buzz.sound("contenido/audios/audio0", { formats: ["mp3"], preload: true }),
    /*8*/ new buzz.sound("contenido/audios/audio0", { formats: ["mp3"], preload: true }),
    /*9*/ new buzz.sound("contenido/audios/audio0", { formats: ["mp3"], preload: true }),
    /*10*/ new buzz.sound("contenido/audios/audio0", { formats: ["mp3"], preload: true }),
    /*11*/ new buzz.sound("contenido/audios/audio0", { formats: ["mp3"], preload: true }),
    /*12*/ new buzz.sound("contenido/audios/audio0", { formats: ["mp3"], preload: true }),
    /*13*/ new buzz.sound("contenido/audios/audio0", { formats: ["mp3"], preload: true }),
    /*14*/ new buzz.sound("contenido/audios/audio0", { formats: ["mp3"], preload: true }),
    /*15*/ new buzz.sound("contenido/audios/audio0", { formats: ["mp3"], preload: true }),
    /*16*/ new buzz.sound("contenido/audios/audio0", { formats: ["mp3"], preload: true }),
    /*17*/ new buzz.sound("contenido/audios/audio0", { formats: ["mp3"], preload: true }),
    /*18*/ new buzz.sound("contenido/audios/audio0", { formats: ["mp3"], preload: true }),
    /*19*/ new buzz.sound("contenido/audios/audio0", { formats: ["mp3"], preload: true }),
    /*20*/ new buzz.sound("contenido/audios/audio0", { formats: ["mp3"], preload: true }),
    /*21*/ new buzz.sound("contenido/audios/audio0", { formats: ["mp3"], preload: true }),
    /*22*/ new buzz.sound("contenido/audios/audio0", { formats: ["mp3"], preload: true }),
    /*23*/ new buzz.sound("contenido/audios/audio0", { formats: ["mp3"], preload: true }),
    /*24*/ new buzz.sound("contenido/audios/audio0", { formats: ["mp3"], preload: true }),
    /*25*/ new buzz.sound("contenido/audios/audio0", { formats: ["mp3"], preload: true }),
    /*26*/ new buzz.sound("contenido/audios/audio0", { formats: ["mp3"], preload: true }),
    /*27*/ new buzz.sound("contenido/audios/audio0", { formats: ["mp3"], preload: true })
]);
