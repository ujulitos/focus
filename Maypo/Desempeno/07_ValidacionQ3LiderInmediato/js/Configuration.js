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
    { title: "Pantalla", url: "Maypo_EmployeeCentral_01.html", navegacion: true, menu: true },
    { title: "Pantalla", url: "Maypo_EmployeeCentral_02.html", navegacion: true, menu: true },
    { title: "Pantalla", url: "Maypo_EmployeeCentral_03.html", navegacion: true, menu: true },
    { title: "Pantalla", url: "Maypo_EmployeeCentral_04.html", navegacion: true, menu: true },
];

/* Pantallas de recursos */
var recursos = new Object();
recursos.pages = [
    { title: "Índice", url: "indice.html", navegacion: true, menu: true },
    { title: "Ayuda", url: "ayuda.html", navegacion: true, menu: true }
];

/* Audios del curso */
var grupoAudios = new buzz.group([
    /*00*/ new buzz.sound("contenido/audios/audio0", { formats: ["mp3"], preload: true }),
    /*01*/ new buzz.sound("contenido/audios/01", { formats: ["mp3"], preload: true }),

    /*02*/ new buzz.sound("contenido/audios/audio0", { formats: ["mp3"], preload: true }),
    /*03*/ new buzz.sound("contenido/audios/02", { formats: ["mp3"], preload: true }),
    /*04*/ new buzz.sound("contenido/audios/03", { formats: ["mp3"], preload: true }),
    /*05*/ new buzz.sound("contenido/audios/04", { formats: ["mp3"], preload: true }),
    /*06*/ new buzz.sound("contenido/audios/05", { formats: ["mp3"], preload: true }),
    /*07*/ new buzz.sound("contenido/audios/06", { formats: ["mp3"], preload: true }),
    /*08*/ new buzz.sound("contenido/audios/07", { formats: ["mp3"], preload: true }),
    
    /*09*/ new buzz.sound("contenido/audios/08", { formats: ["mp3"], preload: true })
]);
