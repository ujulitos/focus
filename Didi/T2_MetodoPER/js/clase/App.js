// Variable de la App--------------------------------------------------------
let audioActual;
let audiosActivos = true;
let delayAudio;
let muteado = false;
let noPagina;
let totalPaginas;
let paginasVistas = 0;
let calificacionFinal = 0;
let intentos = 1;
let noEmpleado;

// Iniciar App
function iniciarAplicacion() {
    totalPaginas = paginas.length;
    conectarLMS();
    calcularTiempo();
    verificarLocacion();
    salidaBienvenida();
    actualizarPorcentaje(noPagina);
    cargarPagina(noPagina);
}

//Metodos para avanzar y retroceder página------------------------------
function siguientePagina() {
    if (noPagina < totalPaginas - 1) {

        if (noPagina == paginasVistas) {
            paginasVistas++;
        }

        if (noPagina == totalPaginas - 1) {
            statusCurso('completed');
        }

        noPagina++;
        detenerAudios();
        actualizarTemario();
        desactivarBotonAdelante();
        asignarLocacion();
        actualizarPorcentaje(noPagina);
        cargarPagina(noPagina);
    } else {
        console.log('Estás en la ultima página');
    }
}

function retrocederPagina() {
    if (noPagina > 0) {

        noPagina--;
        detenerAudios();
        actualizarPorcentaje(noPagina);
        asignarLocacion();
        cargarPagina(noPagina);
    } else {
        console.log('Estas en la primer página');
    }
}

function irPagina(numPagina) {
    const pagina = numPagina - 1;

    if (pagina <= totalPaginas - 1 && pagina >= 0) {
        noPagina = pagina;
        paginasVistas = noPagina;

        activarBotonAtras();
        actualizarTemario();
        desactivarBotonAdelante();
        asignarLocacion();
        detenerAudios();
        actualizarPorcentaje(noPagina);
        cargarPagina(noPagina, paginasVistas);
    } else {
        console.log('Esa página no existe');
    }
}

function recargarPagina() {
    detenerAudios();
    cargarPagina(noPagina);
}

//Desactivar botones de navegación-------------------------------------
function desactivarBotonAdelante() {
    TweenMax.killTweensOf(btnAdelante);

    setTimeout(() => {
        btnAdelante.prop('disabled', true);
        btnAdelante.removeClass('activado');
        btnAdelante.addClass('desactivado');
        btnAdelante.css({
            'opacity': .5,
            'cursor': 'default'
        })
    }, 300);
}

function desactivarBotonAtras() {
    btnAtras.prop('disabled', true);
    btnAtras.removeClass('activado');
    btnAtras.addClass('desactivado');
}

function activarBotonAdelante() {
    btnAdelante.prop('disabled', false);
    btnAdelante.removeClass('desactivado');
    btnAdelante.addClass('activado');
    setTimeout(() => {
        parpadear(btnAdelante, .3);
    }, 300);
}

function activarBotonAtras() {
    btnAtras.prop('disabled', false);
    btnAtras.removeClass('desactivado');
    btnAtras.addClass('activado');
}

function terminaPantalla() {
    activarBotonAdelante();
}

// Actualizar barra de porcentaje---------------------------------------
function actualizarPorcentaje() {
    //Actualizar la relación del curso
    let paginaActual = noPagina + 1;
    relacion.html(`${paginaActual}/${totalPaginas}`);

    //Carlcular el porcentaje de la barra
    const porcentaje = (paginaActual * 100) / totalPaginas;
    barra.css({
        'width': `${porcentaje}%`
    });
}

// Metodos para reproduccion de Audios-----------------------------------
function reproducirAudio(audio, funcion, delay = 0) {

    delay = delay * 1000;

    audioActual = audio;

    if (muteado) {
        audioActual.muted = true;
    } else {
        audioActual.muted = false;
    }

    delayAudio = setTimeout(() => {

        if (audiosActivos) {
            audioActual.currentTime = 0;
            audioActual.play();

            audioActual.addEventListener("ended", () => {
                if (funcion) {
                    funcion();
                }
            });
        }

    }, delay);
}

function silenciarOPrender() {
    const imagenBocina = $('#audio img');

    if (muteado) {
        audioActual.muted = false;
        imagenBocina.attr('src', 'img/interfaz/audio.png');
        muteado = false
    } else {
        audioActual.muted = true;
        imagenBocina.attr('src', 'img/interfaz/audio_off.png');
        muteado = true;
    }
}

function detenerAudios() {
    if (audioActual) {
        audiosActivos = false;
        clearTimeout(delayAudio);
        audioActual.pause();
        audioActual = undefined;

        setTimeout(() => {
            audiosActivos = true;
        }, 1500);
    }
}

// Metodo de abrir y cerrar temario------------------------------------------
function abrirTemario() {
    temario.addClass('menu-abierto');
}

function cerrarTemario() {
    temario.removeClass('menu-abierto');
}

// Asignar calificacion-----------------------------------------------------
function guardarCalificacion(calificacion) {
    calificacionFinal = calificacion;
    asignarCalificacion(calificacionFinal);
    statusCurso('passed');
}

function compararCalificaciones(calificacion) {
    if (calificacion > calificacionFinal) {
        calificacionFinal = calificacion;
    }
    asignarCalificacion(calificacionFinal);
}

// Intentos del curso
function siguienteIntento() {
    intentos++;
}

// Regresar el No. de Intentos
function verIntento() {
    return intentos;
}

function reiniciarInntentos() {
    intentos = 1;
}

function agregarNoEmpleado(numero) {
    noEmpleado = numero;
}

function verNoEmpleado() {
    return noEmpleado;
}