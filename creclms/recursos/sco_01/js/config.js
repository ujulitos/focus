/* Copyright 2018. */

var tituloCurso = '¿Qué es el eLearning?';
var subtituloCurso = 'Una manera divertida de aprender';
var rutaContenido = 'contenido';
var candado = true;
var evaluacion = true;
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
curso.pantallas = [
    { nombre: 'Bienvenida', ruta: 'pag01.html', visible: true, nivel: true },
    { nombre: 'Objetivos', ruta: 'pag02.html', visible: true, nivel: true },
    { nombre: 'Tema 1: ¿Qué es el eLearning?', ruta: 'pag03.html', visible: true, nivel: true },
    { nombre: 'Aprender jugando', ruta: 'pag04.html', visible: true, nivel: true },
    { nombre: 'La gamificación', ruta: 'pag05.html', visible: true, nivel: true },
    { nombre: 'Cierre', ruta: 'pag06.html', visible: true, nivel: true },
    { nombre: 'Evaluación final', ruta: 'pag07.html', visible: true, nivel: true }
];


/* Audios del curso */
var Audios = new Array();
Audios[0] = new buzz.sound(rutaContenido + '/audios/' + 'audio0', { formats: ['mp3'], preload: true });
Audios[1] = new buzz.sound(rutaContenido + '/audios/' + 'pag1_1', { formats: ['mp3'], preload: true });
Audios[2] = new buzz.sound(rutaContenido + '/audios/' + 'pag1_2', { formats: ['mp3'], preload: true });
Audios[3] = new buzz.sound(rutaContenido + '/audios/' + 'pag1_3', { formats: ['mp3'], preload: true });
