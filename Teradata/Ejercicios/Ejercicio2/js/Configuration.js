/* Copyright uJL 2019. */

var conection = false;
var mostrarAlertas = false;
var contentPath = "contenido/";
var mobileCurse = false;
var navegationBlock = true;
var haySubtitulos = false;
var intento = 1;

/* Pantallas del curso */
var course = new Object();
course.pages = [
    { title: "eLearning", url: "Teradata_Ejercicio_02.html", navegacion: true, menu: true }
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