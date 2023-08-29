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
    { title: "Pantalla", url: "Maypo_ControlAsistencia_01.html", navegacion: true, menu: true },
    { title: "Pantalla", url: "Maypo_ControlAsistencia_02.html", navegacion: true, menu: true },
    { title: "Pantalla", url: "Maypo_ControlAsistencia_03.html", navegacion: true, menu: true },
    { title: "Pantalla", url: "Maypo_ControlAsistencia_04.html", navegacion: true, menu: true },
    { title: "Pantalla", url: "Maypo_ControlAsistencia_05.html", navegacion: true, menu: true },
    { title: "Pantalla", url: "Maypo_ControlAsistencia_06.html", navegacion: true, menu: true }
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
    /*09*/ new buzz.sound("contenido/audios/08", { formats: ["mp3"], preload: true }),
    /*10*/ new buzz.sound("contenido/audios/09", { formats: ["mp3"], preload: true }),
    /*11*/ new buzz.sound("contenido/audios/10", { formats: ["mp3"], preload: true }),

    /*12*/ new buzz.sound("contenido/audios/audio0", { formats: ["mp3"], preload: true }),
    /*13*/ new buzz.sound("contenido/audios/11", { formats: ["mp3"], preload: true }),
    /*14*/ new buzz.sound("contenido/audios/12", { formats: ["mp3"], preload: true }),
    /*15*/ new buzz.sound("contenido/audios/13", { formats: ["mp3"], preload: true }),
    /*16*/ new buzz.sound("contenido/audios/14", { formats: ["mp3"], preload: true }),
    /*17*/ new buzz.sound("contenido/audios/15", { formats: ["mp3"], preload: true }),

    /*18*/ new buzz.sound("contenido/audios/audio0", { formats: ["mp3"], preload: true }),
    /*19*/ new buzz.sound("contenido/audios/16", { formats: ["mp3"], preload: true }),
    /*20*/ new buzz.sound("contenido/audios/17", { formats: ["mp3"], preload: true }),    
    /*21*/ new buzz.sound("contenido/audios/18", { formats: ["mp3"], preload: true }),
    /*22*/ new buzz.sound("contenido/audios/19", { formats: ["mp3"], preload: true }),

    /*23*/ new buzz.sound("contenido/audios/20", { formats: ["mp3"], preload: true })
]);
