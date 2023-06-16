/* Copyright 2018. */

var tituloCurso = 'Módulo 1. <br>Fundamentos Bancarios.<br>Sistema Financiero';
var subtituloCurso = 'Nivel intermedio';
var rutaContenido = 'contenido';
var candado = true;
var evaluacion = false;
var minimoAprobatorio = 80;
var intento = 1;
var estatus = 'passed/failed';
// posibles estatus:
// passed/failed
// completed/incomplete
// passed/incomplete
// browsed/incomplete


/* Pantallas del curso */
var curso = new Object();
curso.pantallas = [{
    nombre: 'Bienvenida',
    ruta: 'pag01.html',
    visible: true,
    nivel: true
}, {
    nombre: 'Objetivos',
    ruta: 'pag02.html',
    visible: true,
    nivel: true
}, {
    nombre: 'Introducción',
    ruta: 'pag03.html',
    visible: true,
    nivel: true
}, {
    nombre: 'De acuerdo con el artículo 7...',
    ruta: 'pag04.html',
    visible: true,
    nivel: true
}, {
    nombre: 'El Sector Bancario',
    ruta: 'pag05.html',
    visible: true,
    nivel: true
}, {
    nombre: 'Sector de Ahorro y Crédito Popular',
    ruta: 'pag06.html',
    visible: true,
    nivel: true
}, {
    nombre: 'El sistema bursátil',
    ruta: 'pag07.html',
    visible: true,
    nivel: true
}, {
    nombre: 'Autoridades Regulatorias',
    ruta: 'pag08.html',
    visible: true,
    nivel: true
}, {
    nombre: 'Otros participantes',
    ruta: 'pag09.html',
    visible: true,
    nivel: true
}, {
    nombre: 'Actividad 1',
    ruta: 'pag10.html',
    visible: true,
    nivel: true
}, {
    nombre: 'Sistema Financiero Internacional',
    ruta: 'pag11.html',
    visible: true,
    nivel: true
}, {
    nombre: 'Composición del Sistema Financiero Internacional',
    ruta: 'pag12.html',
    visible: true,
    nivel: true
}, {
    nombre: 'Función de los Organismos Internacionales',
    ruta: 'pag13.html',
    visible: true,
    nivel: true
}, {
    nombre: 'Acuerdos de Basilea',
    ruta: 'pag14.html',
    visible: true,
    nivel: true
}, {
    nombre: 'Mercados globales',
    ruta: 'pag15.html',
    visible: true,
    nivel: true
}, {
    nombre: 'Actividad 2',
    ruta: 'pag16.html',
    visible: true,
    nivel: true
}, {
    nombre: 'Cierre',
    ruta: 'pag17.html',
    visible: true,
    nivel: true
}];


/* Audios del curso */
var grupoAudios = new buzz.group([
    /*0*/
    new buzz.sound(rutaContenido + "/audios/audio0", {
        formats: ["mp3"],
        preload: true
    })
]);
