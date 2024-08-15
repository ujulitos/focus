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
    { title: "Pantalla", url: "Maypo_EmployeeCentral_05.html", navegacion: true, menu: true },
    { title: "Pantalla", url: "Maypo_EmployeeCentral_06.html", navegacion: true, menu: true },
    { title: "Pantalla", url: "Maypo_EmployeeCentral_07.html", navegacion: true, menu: true },
    { title: "Pantalla", url: "Maypo_EmployeeCentral_08.html", navegacion: true, menu: true },
    { title: "Pantalla", url: "Maypo_EmployeeCentral_09.html", navegacion: true, menu: true },
    { title: "Pantalla", url: "Maypo_EmployeeCentral_10.html", navegacion: true, menu: true }
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
    /*12*/ new buzz.sound("contenido/audios/11", { formats: ["mp3"], preload: true }),
    /*13*/ new buzz.sound("contenido/audios/12", { formats: ["mp3"], preload: true }),
    /*14*/ new buzz.sound("contenido/audios/13", { formats: ["mp3"], preload: true }),
    /*15*/ new buzz.sound("contenido/audios/14", { formats: ["mp3"], preload: true }),
    /*16*/ new buzz.sound("contenido/audios/15", { formats: ["mp3"], preload: true }),
    /*17*/ new buzz.sound("contenido/audios/16", { formats: ["mp3"], preload: true }),
    /*18*/ new buzz.sound("contenido/audios/17", { formats: ["mp3"], preload: true }),
    /*19*/ new buzz.sound("contenido/audios/18", { formats: ["mp3"], preload: true }),
    /*20*/ new buzz.sound("contenido/audios/19", { formats: ["mp3"], preload: true }),

    /*21*/ new buzz.sound("contenido/audios/20", { formats: ["mp3"], preload: true }),
    /*22*/ new buzz.sound("contenido/audios/21", { formats: ["mp3"], preload: true }),
    /*23*/ new buzz.sound("contenido/audios/22", { formats: ["mp3"], preload: true }),
    /*24*/ new buzz.sound("contenido/audios/23", { formats: ["mp3"], preload: true }),
    /*25*/ new buzz.sound("contenido/audios/24", { formats: ["mp3"], preload: true }),
    /*26*/ new buzz.sound("contenido/audios/25", { formats: ["mp3"], preload: true }),
    /*27*/ new buzz.sound("contenido/audios/26", { formats: ["mp3"], preload: true }),
    /*28*/ new buzz.sound("contenido/audios/27", { formats: ["mp3"], preload: true }),
    /*29*/ new buzz.sound("contenido/audios/28", { formats: ["mp3"], preload: true }),
    /*30*/ new buzz.sound("contenido/audios/29", { formats: ["mp3"], preload: true }),
    /*31*/ new buzz.sound("contenido/audios/30", { formats: ["mp3"], preload: true }),
    /*32*/ new buzz.sound("contenido/audios/31", { formats: ["mp3"], preload: true }),

    /*33*/ new buzz.sound("contenido/audios/audio0", { formats: ["mp3"], preload: true }),
    /*34*/ new buzz.sound("contenido/audios/32", { formats: ["mp3"], preload: true }),
    /*35*/ new buzz.sound("contenido/audios/33", { formats: ["mp3"], preload: true }),
    /*36*/ new buzz.sound("contenido/audios/34", { formats: ["mp3"], preload: true }),
    /*37*/ new buzz.sound("contenido/audios/35", { formats: ["mp3"], preload: true }),
    /*38*/ new buzz.sound("contenido/audios/36", { formats: ["mp3"], preload: true }),    
    /*39*/ new buzz.sound("contenido/audios/37", { formats: ["mp3"], preload: true }),
    /*40*/ new buzz.sound("contenido/audios/38", { formats: ["mp3"], preload: true }),
    /*41*/ new buzz.sound("contenido/audios/39", { formats: ["mp3"], preload: true }),

    /*42*/ new buzz.sound("contenido/audios/audio0", { formats: ["mp3"], preload: true }),
    /*43*/ new buzz.sound("contenido/audios/40", { formats: ["mp3"], preload: true }),
    /*44*/ new buzz.sound("contenido/audios/41", { formats: ["mp3"], preload: true }),
    /*45*/ new buzz.sound("contenido/audios/42", { formats: ["mp3"], preload: true }),
    /*46*/ new buzz.sound("contenido/audios/43", { formats: ["mp3"], preload: true }),

    /*47*/ new buzz.sound("contenido/audios/audio0", { formats: ["mp3"], preload: true }),
    /*48*/ new buzz.sound("contenido/audios/44", { formats: ["mp3"], preload: true }),
    /*49*/ new buzz.sound("contenido/audios/45", { formats: ["mp3"], preload: true }),
    /*50*/ new buzz.sound("contenido/audios/46", { formats: ["mp3"], preload: true }),
    /*51*/ new buzz.sound("contenido/audios/47", { formats: ["mp3"], preload: true }),
    /*52*/ new buzz.sound("contenido/audios/48", { formats: ["mp3"], preload: true }),
    /*53*/ new buzz.sound("contenido/audios/49", { formats: ["mp3"], preload: true }),
    /*54*/ new buzz.sound("contenido/audios/50", { formats: ["mp3"], preload: true }),

    /*55*/ new buzz.sound("contenido/audios/51", { formats: ["mp3"], preload: true }),
    /*56*/ new buzz.sound("contenido/audios/52", { formats: ["mp3"], preload: true }),
    /*57*/ new buzz.sound("contenido/audios/53", { formats: ["mp3"], preload: true }),
    /*58*/ new buzz.sound("contenido/audios/54", { formats: ["mp3"], preload: true }),
    /*59*/ new buzz.sound("contenido/audios/55", { formats: ["mp3"], preload: true }),
    /*60*/ new buzz.sound("contenido/audios/56", { formats: ["mp3"], preload: true }),
    /*61*/ new buzz.sound("contenido/audios/57", { formats: ["mp3"], preload: true }),
    /*62*/ new buzz.sound("contenido/audios/58", { formats: ["mp3"], preload: true }),

    /*63*/ new buzz.sound("contenido/audios/59", { formats: ["mp3"], preload: true })
]);
