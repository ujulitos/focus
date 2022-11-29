import {
    cargarPagina,
    iniciarContenido,
    actualizarPorcentaje,
    calcularTiempo,
    desactivarBotonAtras,
    desactivarBotonSiguiente,
    activarBotonAtras,
    activarBotonSiguiente,
    actualizarTemario,
    redimensionar
}
from '../funciones.js';

import {
    menuLateral
} from '../selectores.js';

import {
    paginas
} from '../configuracion.js';

import {
    conectarLMS,
    asignarLocacion,
    verificarLocacion,
    statusCurso,
    asignarCalificacion,
    asignarComentario
}
from '../conexion.js';

import {
    eliminarAnimaciones
} from '../animaciones.js';

export class App {

    // Parametros de Inicio------------------------------------------------------

    constructor() {
        this.audio;
        this.delayAudio;
        this.audiosActivos = true;
        this.muteado = false;
        this.noPagina = verificarLocacion();
        this.paginasActivas = 0;
        this.totalPaginas = paginas.length;
        this.intento = 1;
        this.calificacion = 0;
        this.op1 = 0;
        this.op2 = 0;
        this.op3 = 0;
        this.comentario = '';
    }

    //Iniciar el curso-----------------------------------------------------------

    iniciar() {
        conectarLMS();
        calcularTiempo();
        statusCurso('completed');
        activarBotonSiguiente();
        actualizarTemario(this.noPagina);
        actualizarPorcentaje(this.noPagina, this.totalPaginas);
        iniciarContenido(this.noPagina);
    }

    //Esta función solo es para modo desarrollador y temario-------------------------
    irPagina(noPagina) {

        eliminarAnimaciones();

        const pagina = noPagina - 1;

        if (pagina <= this.totalPaginas && pagina >= 0) {
            this.noPagina = pagina;

            this.activarNavegacion();
            // desactivarBotonSiguiente();
            // activarBotonSiguiente();
            this.detenerAudios();
            actualizarTemario(this.noPagina);
            actualizarPorcentaje(this.noPagina, this.totalPaginas);
            cargarPagina(this.noPagina, this.paginasActivas);
        } else {
            console.log('Esa página no existe');
        }
    }

    //Metodos de botones----------------------------------------------------------

    nextPag() {
        if (this.noPagina < this.totalPaginas - 1) {

            eliminarAnimaciones();

            if (this.noPagina == this.paginasActivas) {
                this.paginasActivas++
            }

            this.noPagina++;
            actualizarTemario(this.noPagina);
            // this.actualizarEstado();
            // desactivarBotonSiguiente();
            // activarBotonSiguiente();
            this.detenerAudios();
            asignarLocacion(this.noPagina);
            actualizarPorcentaje(this.noPagina, this.totalPaginas);
            cargarPagina(this.noPagina, this.paginasActivas);
        } else {
            console.log('Estas en la ultima página');
        }
    }

    prevPag() {

        eliminarAnimaciones();

        if (this.noPagina > 0) {
            this.noPagina--;

            asignarLocacion(this.noPagina);
            this.detenerAudios();
            actualizarPorcentaje(this.noPagina, this.totalPaginas);
            cargarPagina(this.noPagina, this.paginasActivas);

        } else {
            console.log('Estas en la primer página');
        }
    }

    recargarPag() {
        this.detenerAudios();
        cargarPagina(this.noPagina, this.paginasActivas);
    }

    desplegarMenu() {
        menuLateral.addClass('menu-abierto');
    }

    cerrarMenu() {
        menuLateral.removeClass('menu-abierto');
    }

    terminaPantalla() {
        activarBotonSiguiente();
    }

    bloquearNavegacion() {
        desactivarBotonAtras();
    }

    activarNavegacion() {
        activarBotonAtras();
    }

    desactivarSiguiente() {
        desactivarBotonSiguiente();
    }

    //Metodos para reproducir y silenciar audios---------------------------------

    reproducirAudio(audio, funcion, delay = 0) {
        this.audio = audio;

        if (this.muteado) {
            this.audio.muted = true;
        } else {
            this.audio.muted = false;
        }

        this.delayAudio = setTimeout(() => {

            if (this.audiosActivos) {
                this.audio.currentTime = 0;
                this.audio.play();

                this.audio.addEventListener("ended", () => {
                    if (funcion) {
                        funcion();
                    }
                });
            }

        }, delay);
    }

    silenciarOPrender() {
        const imagenBocina = $('#audio img');

        if (this.muteado) {
            this.audio.muted = false;
            imagenBocina.attr('src', 'img/interfaz/audio.png');
            this.muteado = false
        } else {
            this.audio.muted = true;
            imagenBocina.attr('src', 'img/interfaz/audio_off.png');
            this.muteado = true;
        }
    }

    detenerAudios() {
        this.audiosActivos = false;
        clearTimeout(this.delayAudio);
        this.audio.pause();
        this.audio = undefined;

        setTimeout(() => {
            this.audiosActivos = true;
        }, 1500);
    }

    //Guardar Calificacion-------------------------------------------------------
    guardarCalificacion() {
        this.calificacion = this.op1 + this.op2 + this.op3;;
        asignarCalificacion(this.calificacion);
        console.log(this.calificacion);
        statusCurso('passed');
    }

    // guardarCalificacion(calificacion){
    //     this.calificacion = calificacion;
    //     asignarCalificacion(this.calificacion);
    //     statusCurso('passed');
    // }

    // compararCalificaciones(calificacion){
    //     if(calificacion > this.calificacion){
    //         this.calificacion = calificacion;
    //     }
    //     asignarCalificacion(this.calificacion);
    // }

    //Actualizar estatus de curso------------------------------------------------
    actualizarEstado() {
        if (this.noPagina != this.totalPaginas - 1) {
            statusCurso('incomplete');
        } else {
            statusCurso('completed');
        }
    }

    //Metodo para aumentar intentos de evaluación--------------------------------
    siguienteIntento() {
        this.intento++;
    }

    //Metodo para reiniciar intentos
    reiniciarIntentos() {
        this.intento = 1;
    }

    //DiDi------------------------------------------------------------------------
    basico() {
        this.op1 += 1;
        console.log('basico: ', this.op1);
    }

    intermedio() {
        this.op2 += 1;
        console.log('intermedio: ', this.op2);
    }

    avanzado() {
        this.op3 += 1;
        console.log('avanzado: ', this.op3);
    }



    asignarNivel() {
        if (this.op1 > this.op2 && this.op1 > this.op3) {

            this.comentario = 'basico';
            asignarComentario(this.comentario);
            console.log('comentario: ', this.comentario);

        } else if (this.op2 > this.op1 && this.op2 > this.op3) {

            this.comentario = 'intermedio';
            asignarComentario(this.comentario);
            console.log('comentario: ', this.comentario);

        } else if (this.op3 > this.op1 && this.op3 > this.op1) {

            this.comentario = 'avanzado';
            asignarComentario(this.comentario);
            console.log('comentario: ', this.comentario);

        }
    }
}