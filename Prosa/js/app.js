import { App } from "./clases/App.js";
import { modoDesarrollador, tiempo, redimensionar, moverTeclas, botonesTemario} from "./funciones.js";
import {btnAdelante, btnAtras, btnMenu, btnCerrar, btnAudio, btnRecargar, btnCerrarGlosario, contGlosario, btnGlosario} from './selectores.js';
import { registrarTiempo, cerrarConexion } from './conexion.js';

//Instanciar App e iniciarla------------------------------------------------------
export const aplicacion = new App;
aplicacion.iniciar();

// Funciones de los botones de navegación-----------------------------------------
btnAdelante.click(function(){
    aplicacion.nextPag();
});

btnAtras.click(function(){
    aplicacion.prevPag();
});

btnMenu.click(function(){
    aplicacion.desplegarMenu();
});

btnCerrar.click(function(){
    aplicacion.cerrarMenu();
});

btnAudio.click(function(){
    aplicacion.silenciarOPrender();
});

btnRecargar.click(function(){
    aplicacion.recargarPag();
});

//Función Glosario Prosa----------------------------------------------------------
btnGlosario.click(function(){
    contGlosario.css('display', 'flex');
});

btnCerrarGlosario.click(function(){
    contGlosario.css('display', 'none');
});

botonesTemario();

//Al cerrar el curso
window.onunload = function(){
    registrarTiempo(tiempo);
    cerrarConexion();
}

// Modo desarrollador-------------------------------------------------------------
// modoDesarrollador();
moverTeclas();

//Redimensionar tamaño------------------------------------------------------------
redimensionar();
let intervalo; 
$(window).resize(function(){
    clearTimeout(intervalo);
    intervalo = setTimeout(escalar, 100);
});

function escalar(){
    aplicacion.recargarPag();
}
