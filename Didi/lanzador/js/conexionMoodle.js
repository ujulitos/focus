//Funciones para conectar al LMS
const scorm = pipwerks.SCORM;

function conectarLMS() {
    scorm.version = '1.2';
    scorm.init();
}

function asignarLocacion() {
    scorm.set('cmi.core.lesson_location', noPagina);
}

function statusCurso(estado) {
    scorm.set("cmi.core.lesson_status", estado);
}

function asignarCalificacion(calificacion) {
    scorm.set("cmi.core.score.raw", calificacion);
}

function registrarTiempo() {
    scorm.set("cmi.core.session_time", tiempo);
}

function cerrarConexion() {
    scorm.set("cmi.core.exit", "suspend");
    scorm.quit();
}

function verificarLocacion() {

    const status = scorm.get('cmi.core.lesson_status');

    switch (status) {
        case 'incomplete':
            const location = scorm.get('cmi.core.lesson_location');
            if (!location) {
                noPagina = 0;
            } else {
                noPagina = parseInt(location);
            }
            break;
        case 'completed':
            noPagina = paginas.length - 1;
            break;
        case 'passed':
            noPagina = paginas.length - 1;
            break;
        default:
            noPagina = 0;
            break;
    }
}

function asignarCategoria(categoria) {
    scorm.set("cmi.comments", categoria);
}