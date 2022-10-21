import {
    paginas
} from "./configuracion.js";

//Funciones para conectar al LMS
const scorm = pipwerks.SCORM;

export function conectarLMS() {
    scorm.version = '1.2';
    scorm.init();
}

export function asignarLocacion(noPagina) {
    scorm.set('cmi.core.lesson_location', noPagina);
}

export function statusCurso(estado) {
    // APIi4L //
    console.log('statusCurso', estado);
    window.opener.estatusReurso(estado);
    // APIi4L //
    scorm.set("cmi.core.lesson_status", estado);
}
// APIi4L //
statusCurso();
// APIi4L //

export function asignarCalificacion(calificacion) {
    scorm.set("cmi.core.score.raw", calificacion);
}

export function registrarTiempo(tiempo) {
    scorm.set("cmi.core.session_time", tiempo);
}

export function cerrarConexion() {
    scorm.set("cmi.core.exit", "suspend");
    scorm.quit();
}

export function verificarLocacion() {

    let noPagina;
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
    return noPagina;
}

export function asignarCategoria(categoria) {
    scorm.set("cmi.comments", categoria);
}