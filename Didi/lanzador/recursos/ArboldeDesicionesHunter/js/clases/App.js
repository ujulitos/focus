import {cargarPagina, 
        iniciarContenido, 
        actualizarPorcentaje,
        calcularTiempo, 
        desactivarBotonAtras, 
        desactivarBotonSiguiente, 
        activarBotonAtras,
        activarBotonSiguiente,
        actualizarTemario} 
from '../funciones.js';

import {menuLateral} from '../selectores.js';

import {paginas} from '../configuracion.js';

import { conectarLMS, 
        asignarLocacion, 
        verificarLocacion, 
        statusCurso,
        asignarCalificacion,
        asignarCategoria } 
from '../conexion.js';

import { eliminarAnimaciones } from '../animaciones.js';

export class App{

    // Parametros de Inicio------------------------------------------------------

    constructor(){
        this.audio;
        this.delayAudio;
        this.audiosActivos = true;
        this.muteado = false;
        this.noPagina;
        this.paginasActivas = 0;
        this.totalPaginas = paginas.length;
        this.intento = 1;
        this.calificacion = 0;
        //Variable de didi solamente
        this.puntaje = 0;
    }

    //Iniciar el curso-----------------------------------------------------------

    iniciar(){
        conectarLMS();
        this.noPagina = verificarLocacion();
        calcularTiempo();
        desactivarBotonSiguiente();
        actualizarTemario(this.noPagina);
        actualizarPorcentaje(this.noPagina, this.totalPaginas);
        iniciarContenido(this.noPagina);        
    }

    //Esta función solo es para modo desarrollador y temario-------------------------
    irPagina(noPagina){

        eliminarAnimaciones();

        const pagina = noPagina - 1;

        if(pagina <= this.totalPaginas && pagina >= 0){
            this.noPagina = pagina;

            this.activarNavegacion();
            desactivarBotonSiguiente();
            this.detenerAudios();
            actualizarTemario(this.noPagina);
            actualizarPorcentaje(this.noPagina, this.totalPaginas);
            cargarPagina(this.noPagina, this.paginasActivas);
        }
        else{
            console.log('Esa página no existe');
        }
    }

    //Metodos de botones----------------------------------------------------------

    nextPag(){
        if(this.noPagina < this.totalPaginas - 1){
            
            eliminarAnimaciones();

            if(this.noPagina == this.paginasActivas){
                this.paginasActivas++
            }

            this.noPagina++;
            actualizarTemario(this.noPagina);
            this.actualizarEstado();
            desactivarBotonSiguiente();
            this.detenerAudios();
            asignarLocacion(this.noPagina);
            actualizarPorcentaje(this.noPagina, this.totalPaginas);
            cargarPagina(this.noPagina, this.paginasActivas);
        }
        else{
            console.log('Estas en la ultima página');
        }
    }

    prevPag(){

        eliminarAnimaciones();

        if(this.noPagina > 0){
            this.noPagina--;

            asignarLocacion(this.noPagina);
            this.detenerAudios();
            actualizarPorcentaje(this.noPagina, this.totalPaginas);
            cargarPagina(this.noPagina, this.paginasActivas);

        }
        else{
            console.log('Estas en la primer página');
        }
    }

    recargarPag(){
        this.detenerAudios();
        cargarPagina(this.noPagina, this.paginasActivas);
    }

    desplegarMenu(){
        menuLateral.addClass('menu-abierto');
    }

    cerrarMenu(){
        menuLateral.removeClass('menu-abierto');
    }

    terminaPantalla(){
        activarBotonSiguiente();
    }

    bloquearNavegacion(){
        desactivarBotonAtras();
    }

    activarNavegacion(){
        activarBotonAtras();
    }

    //Metodos para reproducir y silenciar audios---------------------------------

    reproducirAudio(audio, funcion, delay = 0){
        this.audio = audio;
        
        if(this.muteado){
            this.audio.muted = true;
        }
        else{
            this.audio.muted = false;
        }

        this.delayAudio = setTimeout(()=>{
            
            if(this.audiosActivos){
                this.audio.currentTime = 0;
                this.audio.play();
            
                this.audio.addEventListener("ended", () => {
                    if(funcion){
                        funcion();
                    }
                });
            }
            
        }, delay);
    }

    silenciarOPrender(){
        const imagenBocina = $('#audio img');

        if(this.muteado){
            this.audio.muted = false;
            imagenBocina.attr('src', 'img/interfaz/audio.png');
            this.muteado = false
        }
        else{
            this.audio.muted = true;
            imagenBocina.attr('src', 'img/interfaz/audio_off.png');
            this.muteado = true;
        }
    }

    detenerAudios(){
        this.audiosActivos = false;
        clearTimeout(this.delayAudio);
        this.audio.pause();
        this.audio = undefined;

        setTimeout(()=>{
            this.audiosActivos = true;
        }, 1500);
    }

    //Guardar Calificacion-------------------------------------------------------
    guardarCalificacion(calificacion){
        this.calificacion = calificacion;
        asignarCalificacion(this.calificacion);
        statusCurso('passed');
    }

    compararCalificaciones(calificacion){
        if(calificacion > this.calificacion){
            this.calificacion = calificacion;
        }
        asignarCalificacion(this.calificacion);
    }

    //Actualizar estatus de curso------------------------------------------------
    actualizarEstado(){
        if(this.noPagina != this.totalPaginas -1){
            statusCurso('incomplete');
        }
        else{
            statusCurso('completed');
        }
    }

    //Metodo para aumentar intentos de evaluación--------------------------------
    siguienteIntento(){
        this.intento++;
    }
    
    //Metodo para reiniciar intentos
    reiniciarIntentos(){
        this.intento = 1;
    }

    //Metodo para sumar puntaje---------------------------------------------------
    addPuntaje(puntos){
        this.puntaje += puntos;
        console.log(this.puntaje);
    }

    // Asignar Categoria (basico, intermedio, avanzado)--------------------------
    categoria(categoria){
        asignarCategoria(categoria);
    }
}