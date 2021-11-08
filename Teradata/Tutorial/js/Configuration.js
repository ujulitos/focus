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
    { title: "eLearning", url: "Teradata_Tutorial_01.html", navegacion: true, menu: true }
];


/* Audios del curso */
var grupoAudios = new buzz.group([
    /*0*/ new buzz.sound("contenido/audios/audio0", { formats: ["mp3"], preload: true }),
    /*1*/ new buzz.sound("contenido/audios/Teradata_Tutorial_01_01", { formats: ["mp3"], preload: true }),
    /*2*/ new buzz.sound("contenido/audios/Teradata_Tutorial_01_02", { formats: ["mp3"], preload: true }),
    /*3*/ new buzz.sound("contenido/audios/Teradata_Tutorial_01_03", { formats: ["mp3"], preload: true }),
    /*4*/ new buzz.sound("contenido/audios/Teradata_Tutorial_01_04", { formats: ["mp3"], preload: true }),
    /*5*/ new buzz.sound("contenido/audios/Teradata_Tutorial_01_05", { formats: ["mp3"], preload: true }),
    /*6*/ new buzz.sound("contenido/audios/Teradata_Tutorial_01_06", { formats: ["mp3"], preload: true }),
    /*7*/ new buzz.sound("contenido/audios/Teradata_Tutorial_01_07", { formats: ["mp3"], preload: true }),
    /*8*/ new buzz.sound("contenido/audios/Teradata_Tutorial_01_08", { formats: ["mp3"], preload: true }),
    /*9*/ new buzz.sound("contenido/audios/Teradata_Tutorial_01_09", { formats: ["mp3"], preload: true }),
    /*10*/ new buzz.sound("contenido/audios/Teradata_Tutorial_01_10", { formats: ["mp3"], preload: true }),
    /*11*/ new buzz.sound("contenido/audios/Teradata_Tutorial_01_11", { formats: ["mp3"], preload: true }),
    /*12*/ new buzz.sound("contenido/audios/Teradata_Tutorial_01_12", { formats: ["mp3"], preload: true }),
    /*13*/ new buzz.sound("contenido/audios/Teradata_Tutorial_01_13", { formats: ["mp3"], preload: true }),
    /*14*/ new buzz.sound("contenido/audios/Teradata_Tutorial_01_14", { formats: ["mp3"], preload: true }),
    /*15*/ new buzz.sound("contenido/audios/Teradata_Tutorial_01_15", { formats: ["mp3"], preload: true }),
    /*16*/ new buzz.sound("contenido/audios/Teradata_Tutorial_01_16", { formats: ["mp3"], preload: true }),
    /*17*/ new buzz.sound("contenido/audios/Teradata_Tutorial_01_17", { formats: ["mp3"], preload: true }),
    /*18*/ new buzz.sound("contenido/audios/Teradata_Tutorial_01_18", { formats: ["mp3"], preload: true }),
    /*19*/ new buzz.sound("contenido/audios/Teradata_Tutorial_01_19", { formats: ["mp3"], preload: true }),
    /*20*/ new buzz.sound("contenido/audios/Teradata_Tutorial_01_20", { formats: ["mp3"], preload: true }),
    /*21*/ new buzz.sound("contenido/audios/Teradata_Tutorial_01_21", { formats: ["mp3"], preload: true }),
    /*22*/ new buzz.sound("contenido/audios/Teradata_Tutorial_01_22", { formats: ["mp3"], preload: true }),
    /*23*/ new buzz.sound("contenido/audios/Teradata_Tutorial_01_23", { formats: ["mp3"], preload: true }),
    /*24*/ new buzz.sound("contenido/audios/Teradata_Tutorial_01_24", { formats: ["mp3"], preload: true }),
    /*25*/ new buzz.sound("contenido/audios/Teradata_Tutorial_01_25", { formats: ["mp3"], preload: true })
]);
 
// var grupoAudiosMin = new buzz.group([
//     new buzz.sound("contenido/audios/audio0", { formats: ["mp3"], preload: true })
// ]);