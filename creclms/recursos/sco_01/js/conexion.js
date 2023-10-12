var scorm = pipwerks.SCORM;

function iniciaConexion() {
    scorm.version = "1.2";
    var callSucceeded = scorm.init();
    var elstatusCurso = scorm.get("cmi.core.lesson_status");
    iniciaCurso();
}

function send() {
    set('cmi.suspend_data', value);
}

function set(param, value) {
    var callSucceeded = scorm.set(param, value);
}

function get(param) {
    return scorm.get(param);
}

function complete() {
    var callSucceeded = scorm.set("cmi.core.lesson_status", "completed");
}

function save() {
    var callSucceeded = scorm.save();
}

function end() {
    var callSucceeded = scorm.quit();
}

function checkSuspendData() {
    return scorm.get('cmi.suspend_data');
}

// window.onload = function () {
//     iniciaConexion();
// }

// window.onunload = function () {
//     end();
// }
