/* Copyright uJL 2019. */

var conection = true;
var mostrarAlertas = false;
var contentPath = "contenido/";
var mobileCurse = false;
var navegationBlock = true;
var haySubtitulos = false;
var intento = 1;

/* Pantallas del curso */
var course = new Object();
course.pages = [
    { title: "eLearning", url: "Telapace_01.html", navegacion: true, menu: true },
    { title: "eLearning", url: "Telapace_02.html", navegacion: true, menu: true },
    { title: "eLearning", url: "Telapace_03.html", navegacion: true, menu: true },
    { title: "eLearning", url: "Telapace_04.html", navegacion: true, menu: true },
    { title: "eLearning", url: "Telapace_05.html", navegacion: true, menu: true },
    { title: "eLearning", url: "Telapace_06.html", navegacion: true, menu: true },
    { title: "eLearning", url: "Telapace_07.html", navegacion: true, menu: true },
    { title: "eLearning", url: "Telapace_08.html", navegacion: true, menu: true },
    { title: "eLearning", url: "Telapace_09.html", navegacion: true, menu: true },
    { title: "eLearning", url: "Telapace_10.html", navegacion: true, menu: true },
    { title: "eLearning", url: "Telapace_11.html", navegacion: true, menu: true },
    { title: "eLearning", url: "Telapace_12.html", navegacion: true, menu: true },
    { title: "eLearning", url: "Telapace_13.html", navegacion: true, menu: true },
    { title: "eLearning", url: "Telapace_14.html", navegacion: true, menu: true },
    { title: "eLearning", url: "Telapace_15.html", navegacion: true, menu: true },
    { title: "eLearning", url: "Telapace_16.html", navegacion: true, menu: true },
    { title: "eLearning", url: "Telapace_17.html", navegacion: true, menu: true },
    { title: "eLearning", url: "Telapace_18.html", navegacion: true, menu: true },
    { title: "eLearning", url: "Telapace_19.html", navegacion: true, menu: true }
];


/* Audios del curso */
var grupoAudios = new buzz.group([
    /*0*/ new buzz.sound("contenido/audios/audio0", { formats: ["mp3"], preload: true }),
    /*1*/ new buzz.sound("contenido/audios/audio0", { formats: ["mp3"], preload: true }),
    /*2*/ new buzz.sound("contenido/audios/correcto", { formats: ["mp3"], preload: true }),
    /*3*/ new buzz.sound("contenido/audios/error", { formats: ["mp3"], preload: true })
]);
 
// var grupoAudiosMin = new buzz.group([
//     new buzz.sound("contenido/audios/audio0", { formats: ["mp3"], preload: true })
// ]);