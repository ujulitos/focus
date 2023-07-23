var cuantasLeccionesVisibles = 0;

function activaSecSesiones() {
    console.log('activaSecSesiones');

    $('.panel-header div h3').html('Sesiones');
    $('#subtituloSeccion').html('');
    $(".select2").select2();
    $("small.sps").addClass("ocultar");

    /** AddSession*/
    $("#centroTrabajo").click(function() {
        $("#ecentroTrabajo").addClass('ocultar');
    });
    $("#centroTrabajo").change(function() {
        $("#ecentroTrabajo").addClass('ocultar');
    });

    $("#fechaInicio").click(function() {
        $("#efechaInicio").addClass('ocultar');
    });
    $("#fechaInicio").change(function() {
        $("#efechaInicio").addClass('ocultar');
    });

    $("#fechaFin").click(function() {
        $("#efechaFin").addClass('ocultar');
    });
    $("#fechaFin").change(function() {
        $("#efechaFin").addClass('ocultar');
    });

    $("#instructor").click(function() {
        $("#einstructor").addClass('ocultar');
    });
    $("#instructor").change(function() {
        $("#einstructor").addClass('ocultar');
    });

    $("#localidad").click(function() {
        $("#elocalidad").addClass('ocultar');
    });
    $("#localidad").change(function() {
        $("#elocalidad").addClass('ocultar');
    });

    $("#nombreSesion").click(function() {
        $("#enombreSesion").addClass('ocultar');
    });
    $("#nombreSesion").change(function() {
        $("#enombreSesion").addClass('ocultar');
    });

    $("#organizacion").click(function() {
        $("#eorganizacion").addClass('ocultar');
    });
    $("#organizacion").change(function() {
        $("#eorganizacion").addClass('ocultar');
    });

    $("#sala").click(function() {
        $("#esala").addClass('ocultar');
    });
    $("#sala").change(function() {
        $("#esala").addClass('ocultar');
    });
    $("#btnAddSession").click(function() {
        addSession();
    });
    /** AddSession*/

    /** EditSession */
    $("#_centroTrabajo").click(function() {
        $("#_ecentroTrabajo").addClass('ocultar');
    });
    $("#_centroTrabajo").change(function() {
        $("#_ecentroTrabajo").addClass('ocultar');
    });

    $("#_fechaInicio").click(function() {
        $("#_efechaInicio").addClass('ocultar');
    });
    $("#_fechaInicio").change(function() {
        $("#_efechaInicio").addClass('ocultar');
    });

    $("#_fechaFin").click(function() {
        $("#_efechaFin").addClass('ocultar');
    });
    $("#_fechaFin").change(function() {
        $("#_efechaFin").addClass('ocultar');
    });

    $("#_instructor").click(function() {
        $("#_einstructor").addClass('ocultar');
    });
    $("#_instructor").change(function() {
        $("#_einstructor").addClass('ocultar');
    });

    $("#_localidad").click(function() {
        $("#_elocalidad").addClass('ocultar');
    });
    $("#_localidad").change(function() {
        $("#_elocalidad").addClass('ocultar');
    });

    $("#_nombreSesion").click(function() {
        $("#_enombreSesion").addClass('ocultar');
    });
    $("#_nombreSesion").change(function() {
        $("#_enombreSesion").addClass('ocultar');
    });

    $("#_organizacion").click(function() {
        $("#_eorganizacion").addClass('ocultar');
    });
    $("#_organizacion").change(function() {
        $("#_eorganizacion").addClass('ocultar');
    });

    $("#_sala").click(function() {
        $("#_esala").addClass('ocultar');
    });
    $("#_sala").change(function() {
        $("#_esala").addClass('ocultar');
    });
    $("#btnEditarSession").click(function() {
        editSession();
    });
    /** EditSession */


    // cargarEstados();
    cargarPaises();
    cargarOrganizaciones();
    loadInstructores();
    cargarAmbientesDeAprendizajeFromFirebase();

    // setTimeout(function () {
    // loadAmbientesAprendizaje();
    // }, 3000);


    $("#buscadorSesiones").keyup(function() {
        if ($(this).val().length > 2) {
            // console.log("buscando ok", $(this).val());

            for (b = 1; b <= cuantasLecciones; b++) {
                $('#leccion' + b).hide();
                if (that['leccion' + b + '_Nombre'].toLowerCase().includes($(this).val().toLowerCase())) {
                    console.log('Encontré la palabra', $(this).val(), 'con la leccion', that['leccion' + b + '_Nombre'], b);
                    $('#leccion' + b).fadeIn();
                    // return;
                } else {
                    console.log('No encontré nada');
                }
            }

        } else {
            for (b = 1; b <= cuantasLecciones; b++) {
                $('#leccion' + b).fadeIn();
            }
        }
        // pintaRecursos();
    });

    // $("#buscadorRecursos").change(function() {
    //     if ($(this).val().length > 0) {
    //         $(this).css({
    //             'background-color': 'rgba(255, 255, 255, 1)'
    //         })
    //     } else {
    //         $(this).css({
    //             'background-color': 'rgba(255, 255, 255, 0.8)'
    //         })
    //     }
    // });

    $("#buscadorClean").click(function(e) {
        e.preventDefault();
        $("#buscadorSesiones").val('');
        $("#buscadorSesiones").keyup();
    });



    return cuentaSesiones();
}

// function setActiveCard(DIV) {
//     $(".cardaa").removeClass("cardactive");
//     $(DIV).addClass("cardactive");
//     $("#elistadoaa").addClass('ocultar');
//     $("#_elistadoaa").addClass('ocultar');
// }

function addSession() {
    Sesion = {};
    var errores = false;
    Sesion.Centro_trabajo = $("#centroTrabajo").val();
    if (Sesion.Centro_trabajo.length === 0) {
        errores = true;
        $("#ecentroTrabajo").removeClass('ocultar');
    }
    Sesion.Fecha_inicio = $("#fechaInicio").val();
    if (Sesion.Fecha_inicio.length === 0) {
        errores = true;
        $("#efechaInicio").removeClass('ocultar');
    }
    Sesion.Fecha_fin = $("#fechaFin").val();
    if (Sesion.Fecha_fin.length === 0) {
        errores = true;
        $("#efechaFin").removeClass('ocultar');
    }
    Sesion.Leccion = $("#ambiente").val();
    if (Sesion.Leccion.length === 0) {
        errores = true;
        $("#elistadoaa").removeClass('ocultar');
    }
    Sesion.Instructor = $("#instructor").val();
    if (Sesion.Instructor.length === 0) {
        errores = true;
        $("#einstructor").removeClass('ocultar');
    }
    Sesion.Localidad = $("#localidad").val();
    if (Sesion.Localidad.length === 0) {
        errores = true;
        $("#elocalidad").removeClass('ocultar');
    }
    // Sesion.Nombre = $("#nombreSesion").val();
    // if (Sesion.Nombre.length === 0) {
    //     errores = true;
    //     $("#enombreSesion").removeClass('ocultar');
    // }
    Sesion.Organización = $("#organizacion").val();
    if (Sesion.Organización.length === 0) {
        errores = true;
        $("#eorganizacion").removeClass('ocultar');
    }
    Sesion.Sala = $("#sala").val();
    if (Sesion.Sala.length === 0) {
        errores = true;
        $("#esala").removeClass('ocultar');
    }

    if (!errores) {
        // Sesion.Leccion = $(".cardactive input[type=hidden]").val();

        Sesion.Fecha_inicio = moment(Sesion.Fecha_inicio, 'DD/MM/YYYY').format();
        // Sesion.Fecha_inicio = moment(Sesion.Fecha_inicio, "MM-DD-YYYY").format();
        Sesion.Fecha_fin = moment(Sesion.Fecha_fin, 'DD/MM/YYYY').format();
        // Sesion.Fecha_fin = moment(Sesion.Fecha_fin, "MM-DD-YYYY").format();
        // Sesion.Activa = $("#activa").hasClass("active");
        Sesion.Activa = true;
        Sesion.Estado = $("#estado").val();
        Sesion.Pais = $("#pais").val();
        var sessionId = generarId();
        Sesion.Id = "sesion_" + sessionId;

        fbAddSession(Sesion);
    } else {
        console.log("No se pudo añadir sesión");
    }
}

function fbAddSession(Sesion) {
    console.log("Sesion a Adicionar");
    console.log(Sesion);
    var onComplete = function(error) {
        if (error) {
            $.notify({
                message: 'Ocurrió un error en la sincronización.'
            }, {
                type: 'danger',
                allow_dismiss: true,
                delay: 1500,
                allow_dismiss: false
            });
            console.log('Ocurrió un error en la sincronización.');

        } else {
            cleanAddSession();
            cuentaSesiones();
            $.notify({
                message: 'La sesión se agregó exitosamente'
            }, {
                type: 'success',
                allow_dismiss: true,
                delay: 1500,
                allow_dismiss: false
            });
            console.log('Sincronización realizada.');
            $("#modalAgregaSesion .close").click();
        }
    };

    firebase.auth().signInWithEmailAndPassword(email_master, password_master).then(function(result) {
        var dataRef = firebase.database().ref(laUrlBase + 'Sesiones'); //Obtengo nodo.
        var keySesion = dataRef.ref.child(Sesion.Id); //Agrego recurso vacio con ID:recurso.Id . 
        firebase.database().ref(keySesion).set(Sesion, onComplete); //Reemplazo datos.     
    });

}

function cleanAddSession() {
    $("#activa").removeClass("active");
    $(".form-control").val('');
    $(".select2").select2("val", "");
    $("#organizacion").val('Selecciona una opción');
    $("#pais").val('Selecciona una opción');
    $("#estado").val('');
    // $(".cardaa").removeClass("cardactive");
}

function editSession() {

    var errores = false;
    Sesion = {};

    Sesion.Fecha_fin = $("#_fechaFin").val();
    if (Sesion.Fecha_fin.length === 0) {
        errores = true;
        $("#_efechaFin").removeClass('ocultar');
    }
    Sesion.Fecha_inicio = $("#_fechaInicio").val();
    if (Sesion.Fecha_inicio.length === 0) {
        errores = true;
        $("#_efechaInicio").removeClass('ocultar');
    }
    Sesion.Leccion = $("#_ambiente").val();
    if (Sesion.Leccion.length === 0) {
        errores = true;
        $("#_elistadoaa").removeClass('ocultar');
    }
    Sesion.Instructor = $("#_instructor").val();
    if (Sesion.Instructor.length === 0) {
        errores = true;
        $("#_einstructor").removeClass('ocultar');
    }
    Sesion.Localidad = $("#_localidad").val();
    if (Sesion.Localidad.length === 0) {
        errores = true;
        $("#_elocalidad").removeClass('ocultar');
    }
    // Sesion.Nombre = $("#_nombreSesion").val();
    // if (Sesion.Nombre.length === 0) {
    //     errores = true;
    //     $("#_enombreSesion").removeClass('ocultar');
    // }
    Sesion.Organización = $("#_organizacion").val();
    if (Sesion.Organización.length === 0) {
        errores = true;
        $("#_eorganizacion").removeClass('ocultar');
    }
    Sesion.Centro_trabajo = $("#_centroTrabajo").val();
    if (Sesion.Centro_trabajo.length === 0) {
        errores = true;
        $("#_ecentroTrabajo").removeClass('ocultar');
    }
    Sesion.Sala = $("#_sala").val();
    if (Sesion.Sala.length === 0) {
        errores = true;
        $("#_esala").removeClass('ocultar');
    }

    if (!errores) {
        // Sesion.Leccion = $(".cardactive input[type=hidden]").val();
        Sesion.Fecha_inicio = moment(Sesion.Fecha_inicio, 'DD/MM/YYYY').format();
        // Sesion.Fecha_inicio = moment(Sesion.Fecha_inicio, "MM-DD-YYYY").format();
        Sesion.Fecha_fin = moment(Sesion.Fecha_fin, 'DD/MM/YYYY').format();
        // Sesion.Fecha_fin = moment(Sesion.Fecha_fin, "MM-DD-YYYY").format();
        // Sesion.Activa = $("#_activa").hasClass("active");
        Sesion.Activa = true;
        Sesion.Estado = $("#_estado").val();
        Sesion.Pais = $("#_pais").val();
        Sesion.Id = $("#hiddenIdSesion").val();
        console.log("[[SESION]]");
        console.log(Sesion);

        fbEditSession(Sesion);
    } else {
        console.log("[[Hay errores]]");
        console.log(Sesion);
    }
}

function fbEditSession(Sesion) {
    console.log("Sesion a Actualizar");
    console.log(Sesion);
    var onComplete = function(error) {
        if (error) {
            $.notify({
                message: 'Ocurrió un error en la sincronización.'
            }, {
                type: 'danger',
                allow_dismiss: true,
                delay: 1500,
                allow_dismiss: false
            });
            console.log('Ocurrió un error en la sincronización.');

        } else {
            _cleanAddSession();
            cuentaSesiones();
            $.notify({
                message: 'La sesión se actualizó exitosamente'
            }, {
                type: 'success',
                allow_dismiss: true,
                delay: 1500,
                allow_dismiss: false
            });
            console.log('Sincronización realizada.');
            $("#modalEditarSesion .close").click();
        }
    }
    if (revisaConexion) {
        var dataRef = firebase.database().ref(laUrlBase + 'Sesiones'); //Obtengo nodo.
        console.log("[{Sesion.Id}]", Sesion.Id);
        var sessionKey = dataRef.ref.child(Sesion.Id); //Agrego recurso vacio con ID:recurso.Id . 
        sessionKey.update(Sesion, onComplete); //Reemplazo datos.  
    }

}

function _cleanAddSession() {
    $("#_activa").removeClass("active");
    $(".form-control").val('');
    $(".select2").select2("val", "");
    $("#_estado").val('');
    $("#_organizacion").val('Selecciona una opción');
    $("#_pais").val('Selecciona una opción');
    // $(".cardaa").removeClass("cardactive");
}

/**Rellenar select from JSON */
function cargarPaises() {
    $.getJSON("data/paises.json", function(result) {
        var options = "";
        $.each(result, function(i, paises) {
            if (paises.pais === "Selecciona una opción") {
                options += "<option value='" + paises.pais + "' selected disabled>" + paises.pais + "</option>";
            } else {
                options += "<option value='" + paises.pais + "'>" + paises.pais + "</option>";
            }

        });
        $("#pais").html(options);
        $("#_pais").html(options);
    });
}

/**Rellenar select from JSON */
function cargarOrganizaciones() {
    $.getJSON("data/organizaciones.json", function(result) {
        var options = "";
        $.each(result, function(i, organizaciones) {
            if (organizaciones.organización === "Selecciona una opción") {
                options += "<option value='" + organizaciones.organización + "' selected disabled>" + organizaciones.organización + "</option>";
            } else {
                options += "<option value='" + organizaciones.organización + "'>" + organizaciones.organización + "</option>";
            }

        });
        $("#organizacion").html(options);
        $("#_organizacion").html(options);
    });
}

function cargarEstados() {
    $.getJSON("data/estados.json", function(result) {
        var options = "";
        var i = 0;
        $.each(result, function(i, estado) {
            if (estado.estado === "Selecciona una opción") {
                options += "<option value='" + estado.estado + "' selected disabled>" + estado.estado + "</option>";
            } else {
                options += "<option value='" + estado.estado + "'>" + estado.estado + "</option>";
            }
        });
        $("#estado").html(options);
        $("#_estado").html(options);
    });
}
/** Rellenar select from JSON*/

/** CARGAR INSTRUCTORES DESDE FIREBASE*/
INSTRUCTORES = {};
SELECT_INSTRUCTORES = "";
cargarInstructoresFromFirebase();

function cargarInstructoresFromFirebase() {
    INSTRUCTORES = {};
    SELECT_INSTRUCTORES = "";
    var child = firebase.database().ref("Usuarios/");
    child.once('value').then(function(snapshot) {
        if (snapshot.numChildren() > 0) {
            snapshot.forEach(function(childSnapshot) {
                if (childSnapshot.val().Perfil === 'Instructor') {
                    var ID = childSnapshot.val().Id;
                    var Name = childSnapshot.val().Nombre;
                    SELECT_INSTRUCTORES += "<option value='" + ID + "'>" + Name + "</option>";
                    INSTRUCTORES[ID] = Name;
                }
            });
        }
    });
}

function loadInstructores() { //Se llama desde el constructor
    $("#selectInstructor").html(SELECT_INSTRUCTORES);
    $("#_selectInstructor").html(SELECT_INSTRUCTORES);
}
/** CARGAR INSTRUCTORES DESDE FIREBASE*/

/** CARGAR AMBIENTES DE APRENDIZAJE DESDE FIREBASE*/
AMBIENTES_APRENDIZAJE = {};
HTML_AMBIENTES_APRENDIZAJE = "";
SELECT_AMBIENTES_APRENDIZAJE = "";

function cargarAmbientesDeAprendizajeFromFirebase() {
    HTML_AMBIENTES_APRENDIZAJE = "";
    AMBIENTES_APRENDIZAJE = {};
    SELECT_AMBIENTES_APRENDIZAJE = "";
    var child = firebase.database().ref("Lecciones/");
    var pos = 0;
    child.once('value').then(function(snapshot) {
        if (snapshot.numChildren() > 0) {
            snapshot.forEach(function(childSnapshot) {
                if (childSnapshot.val().Visible) {
                    var ID = childSnapshot.val().Id;
                    var Name = childSnapshot.val().Nombre;
                    var arr = getEstadisticaFromLeccionID(ID);

                    AMBIENTES_APRENDIZAJE[pos] = {
                        'id': ID,
                        'Nombre': Name
                    };
                    SELECT_AMBIENTES_APRENDIZAJE += "<option value='" + ID + "'>" + Name + "</option>";

                }
                return loadAmbientesAprendizaje();
            });
        }
    });
}

cargarAmbientesDeAprendizajeFromFirebase();

function loadAmbientesAprendizaje() { //Se llama desde el constructor
    // console.log('[[AQUIAQUIAQUI]]', SELECT_AMBIENTES_APRENDIZAJE);

    $('#selectAmbiente').html(SELECT_AMBIENTES_APRENDIZAJE);
    $("#_selectAmbiente").html(SELECT_AMBIENTES_APRENDIZAJE);

    // $(".cardaa").removeClass("cardactive");
    // $(".cardaa").click(function () {
    //     setActiveCard(this);
    // });
}
/** CARGAR AMBIENTES DE APRENDIZAJE DESDE FIREBASE*/
function loadModalAddSession() {
    cleanAddSession();
}

function loadEditDataSession() {
    _cleanAddSession();
}

function updateMapModulos(lessonID, numModulos) {
    LeccionesStatics.forEach(function(valor, clave) {
        if (valor.leccionID === lessonID) {
            valor.numMod = numModulos;
            LeccionesStatics.set(clave, valor);
            return;
        }

    });
}

function updateMapAddRecursoId(lessonID, recursoId) {
    LeccionesStatics.forEach(function(valor, clave) {
        if (valor.leccionID === lessonID) {
            valor.arrayRecursos.push(recursoId);
            LeccionesStatics.set(clave, valor);
            return;
        }
    });
}

function updateMapHoras(lessonID, numHoras) {
    var horas = parseInt(numHoras);
    console.log("AQui", LeccionesStatics);
    LeccionesStatics.forEach(function(valor, clave) {
        if (valor.leccionID === lessonID) {
            console.log(leccionID + "=>" + numHoras);
            return;
        }
    });
}

function EstaElRecursoEnLecciones(recursoID, duracion) {
    LeccionesStatics.forEach(function(valor, clave) {
        var array = valor.arrayRecursos;
        array.forEach(function(item) {
            if (item === recursoID) {
                console.log("Esta");
                var horas = parseInt(duracion);
                valor.numHoras += horas;
                LeccionesStatics.set(clave, valor);
            }
        });
    });
    return -1;
}

function SumaHoras() {
    setTimeout(function() {
        firebase.database().ref('Recursos/').once('value').then(function(snapshot) {
            snapshot.forEach(function(child) {
                var recursoID = child.val().Id;
                var duracion = child.val().Duracion;
                EstaElRecursoEnLecciones(recursoID, duracion);
            });
        });
    }, 3000);
}

function ContarModulos() {

    return firebase.database().ref("Lecciones").once('value')
        .then(function(arrayLessons) {
            ar = [];
            arrayLessons.forEach(function(lesson) {
                var lessonID = lesson.val().Id;
                var modulos = firebase.database().ref("Lecciones/" + lessonID + "/Modulos/");
                modulos.on('value', function(childModule) {
                    var numModulos = childModule.numChildren();
                    console.log("leccion: " + lessonID + "  #modulos" + numModulos);

                    updateMapModulos(lessonID, numModulos);
                    childModule.forEach(function(modulo) {
                        var moduleID = modulo.val().Id;
                        console.log(moduleID);
                        var recursos = firebase.database().ref("Lecciones/" + lessonID + "/Modulos/" + moduleID + "/Recursos/");
                        recursos.on('value', function(childRecursos) {
                            var numRecursos = childRecursos.numChildren();
                            console.log("Total Recursos: " + numRecursos);
                            // updateMapAddRecursoId(lessonID,numRecursos);
                            childRecursos.forEach(function(recurso) {
                                var recursoID = recurso.val().recurso_Id;
                                updateMapAddRecursoId(lessonID, recursoID);
                            });
                        });
                    });
                });

            });
            return Promise.all(ar);
        }, function(error) {
            console.log(error);
        })
        .then(function(arr) {
            SumaHoras();
        });

}

var LeccionesStatics = new Map();

function getEstadisticaFromLeccionID(_leccionID) {
    var arr = [];
    arr[0] = '';
    arr[1] = 0;
    arr[2] = 0;
    arr[3] = 0;
    for (var i = 0; i < LeccionesStatics.size; i++) {
        if (LeccionesStatics.get(i).leccionID === "leccion_190217102430hxqq") {
            arr[0] = LeccionesStatics.get(i).leccionID;
            arr[1] = LeccionesStatics.get(i).numMod;
            arr[2] = LeccionesStatics.get(i).arrayRecursos.length;
            arr[3] = LeccionesStatics.get(i).numHoras;
            console.log("[[FOUNDED]]", arr);
            break;
        }
    }
    return arr;
}
// getLeccionesID();
function getLeccionesID() {
    return firebase.database().ref("Lecciones").once('value')
        .then(function(snapshot) {
            var i = 0;
            LeccionesStatics = new Map();
            snapshot.forEach(function(childSnapshot) {
                LeccionesStatics.set(i++, {
                    leccionID: childSnapshot.val().Id,
                    numMod: 0,
                    arrayRecursos: [],
                    numHoras: 0
                });
            });
            return Promise.all(LeccionesStatics);
        }, function(error) {
            console.error(error);
        })
        .then(function(mapLecciones) {
            ContarModulos();
        }, function(error) {
            console.log(error);
        });
}

/**Borrar luego */
function printMap() {
    LeccionesStatics.forEach(function(valor, clave) {
        console.log(clave + ' = {' + valor.leccionID + ', #modulos: ' + valor.numMod + ', #horas:' + valor.numHoras + ', Objetos:');
        console.log(valor.arrayRecursos);
        console.log("}");
    });
}




/***************************************************************************************************************************/
/**ENTREGADO*/
function obtenerDuracionSesion(cualFecha) {
    laFecha = obtenerFecha();
    if (moment(cualFecha).isBefore(laFecha)) {
        console.log('ya acabó');
        return true;
    } else {
        console.log('todavía no acaba');
        return false;
    };
};

var contadorSesiones;
var contadorSesionesActivas;
var sesionesContadorBuscarRecursos;
var sesionesContadorRecursosTotal;
var sesionesContadorBuscarUsuarios;
var sesionesContadorUsuariosTotal;

function cuentaSesiones() {
    console.log('cuentaSesiones');
    contadorSesiones = 0;
    contadorSesionesActivas = 0;
    sesionesContadorBuscarRecursos = 0;
    sesionesContadorRecursosTotal = 0;
    sesionesContadorBuscarUsuarios = 0;
    sesionesContadorUsuariosTotal = 0;

    if (revisaConexion) {
        firebase.database().ref(laUrlBase + 'Sesiones').once('value').then(function(snapshot) {
            if (snapshot.val() != null) {
                var contadorSesiones = 0;
                var contadorUsuarios = 0;

                cuantasSesiones = snapshot.numChildren();
                console.log('cuantasSesiones', cuantasSesiones);

                snapshot.forEach(function(childSnapshot) {
                    contadorSesiones++;

                    this['sesion' + contadorSesiones + '_Key'] = childSnapshot.key;
                    console.log('sesion' + contadorSesiones + '_Key: ', this['sesion' + contadorSesiones + '_Key']);
                    this['sesion' + contadorSesiones + '_Id'] = childSnapshot.val().Id;
                    console.log('sesion' + contadorSesiones + '_Id: ', this['sesion' + contadorSesiones + '_Id']);
                    that = this;

                    var laDuracionSesion = obtenerDuracionSesion(this['sesion' + contadorSesiones + '_FechaFin']);
                    console.log('laDuracionSesion', laDuracionSesion);
                    if (laDuracionSesion == true) {
                        firebase.database().ref(laUrlBase + 'Sesiones/' + this['sesion' + contadorSesiones + '_Key']).update({
                            'Activa': false
                        }, cuentaSesiones2);
                    } else {
                        cuentaSesiones3();
                    }

                    function cuentaSesiones2() {
                        this['sesion' + contadorSesiones + '_Activa'] = false;
                        console.log('sesion' + contadorSesiones + '_Activa: ', this['sesion' + contadorSesiones + '_Activa']);
                        that = this;
                        return cuentaSesiones4();
                    }

                    function cuentaSesiones3() {
                        this['sesion' + contadorSesiones + '_Activa'] = childSnapshot.val().Activa;
                        console.log('sesion' + contadorSesiones + '_Activa: ', this['sesion' + contadorSesiones + '_Activa']);
                        that = this;
                        return cuentaSesiones4();
                    }

                    function cuentaSesiones4() {
                        if (this['sesion' + contadorSesiones + '_Activa'] == true) {
                            contadorSesionesActivas++;

                            cuantasSesionesActivas = contadorSesionesActivas;
                            console.log('cuantasSesionesActivas', cuantasSesionesActivas);
                            this['sesion' + cuantasSesionesActivas + '_Id'] = childSnapshot.val().Id;
                            this['sesion' + cuantasSesionesActivas + '_Activa'] = childSnapshot.val().Activa;
                            // this['sesion' + cuantasSesionesActivas + '_Nombre'] = childSnapshot.val().Nombre;
                            this['sesion' + cuantasSesionesActivas + '_FechaInicio'] = childSnapshot.val().Fecha_inicio;
                            this['sesion' + cuantasSesionesActivas + '_FechaFin'] = childSnapshot.val().Fecha_fin;

                            this['sesion' + cuantasSesionesActivas + '_Pais'] = childSnapshot.val().Pais;
                            this['sesion' + cuantasSesionesActivas + '_Estado'] = childSnapshot.val().Estado;
                            this['sesion' + cuantasSesionesActivas + '_Localidad'] = childSnapshot.val().Localidad;
                            this['sesion' + cuantasSesionesActivas + '_Centro_trabajo'] = childSnapshot.val().Centro_trabajo;
                            this['sesion' + cuantasSesionesActivas + '_Sala'] = childSnapshot.val().Sala;
                            this['sesion' + cuantasSesionesActivas + '_Organización'] = childSnapshot.val().Organización;

                            this['sesion' + cuantasSesionesActivas + '_Instructor'] = childSnapshot.val().Instructor;




                            // Lecciones //
                            this['sesion' + cuantasSesionesActivas + '_LeccionId'] = childSnapshot.val().Leccion;
                            console.log('📁 sesion' + cuantasSesionesActivas + '_Leccion: ', this['sesion' + cuantasSesionesActivas + '_LeccionId']);

                            that = this;
                            sesionesFuncionBuscaLecciones(cuantasSesionesActivas, this['sesion' + cuantasSesionesActivas + '_LeccionId']);
                            cuentaLeccionesSesion();

                            // Usuarios //
                            this['sesion' + contadorSesionesActivas + '_cuantosUsuarios'] = snapshot.child(childSnapshot.key).child('Usuarios').numChildren();
                            console.log('sesion' + contadorSesionesActivas + '_cuantosUsuarios: ', this['sesion' + contadorSesionesActivas + '_cuantosUsuarios']);
                            that = this;

                            var contadorUsuarios = 0;
                            childSnapshot.child('Registro').forEach(function(childSnapshotUsuarios) {
                                contadorUsuarios++;
                                sesionesContadorUsuariosTotal++;

                                this['sesion' + contadorSesionesActivas + '_Usuario' + contadorUsuarios + '_Id'] = childSnapshotUsuarios.key;
                                console.log('sesion' + contadorSesionesActivas + '_Usuario' + contadorUsuarios + '_Id', this['sesion' + contadorSesionesActivas + '_Usuario' + contadorUsuarios + '_Id']);

                                that = this;

                                sesionesFuncionBuscaUsuarios(contadorSesionesActivas, contadorUsuarios, this['sesion' + contadorSesionesActivas + '_Usuario' + contadorUsuarios + '_Id']);
                                // Usuarios //

                            });
                        };
                    };
                });
            } else {
                // return pintaSesiones().then(function() {
                //     activaBotonesSesiones().then(function() {
                //         cargador('oculta');
                //     });
                // });
            }
        });
    };
};


function cuentaLeccionesSesion() {


    if (revisaConexion) {
        // Lecciones ↓
        firebase.database().ref(laUrlBase + 'Lecciones').once('value').then(function(snapshot) {
            if (snapshot.val() != null) {
                var contadorLeccionesVisbles = 0;
                var contadorLecciones = 0;

                cuantasLecciones = snapshot.numChildren();
                console.log('cuantasLecciones ', cuantasLecciones);

                snapshot.forEach(function(childSnapshot) {
                    contadorLecciones++;
                    console.log('↓ 📘');
                    this['leccion' + contadorLecciones + '_Id'] = childSnapshot.val().Id;
                    console.log('leccion' + contadorLecciones + '_Id: ', this['leccion' + contadorLecciones + '_Id']);
                    idLeccion = this['leccion' + contadorLecciones + '_Id'];
                    that = this;

                    this['leccion' + contadorLecciones + '_Nombre'] = childSnapshot.val().Nombre;
                    console.log('leccion' + contadorLecciones + '_Nombre: ', this['leccion' + contadorLecciones + '_Nombre']);
                    this['leccion' + contadorLecciones + '_Visible'] = childSnapshot.val().Visible;
                    console.log('leccion' + contadorLecciones + '_Visible: ', this['leccion' + contadorLecciones + '_Visible']);
                    that = this;

                    if (this['leccion' + contadorLecciones + '_Visible'] == true) {
                        contadorLeccionesVisbles++;
                    };

                    cuantasLeccionesVisibles = contadorLeccionesVisbles;
                    console.log('_↑_');

                });

            }

            // sesionesFuncionBuscaLecciones(cuantasSesionesActivas, that['sesion' + cuantasSesionesActivas + '_LeccionId']);
            return;

        });
        // Lecciones ↑ 

    }
}



function sesionesFuncionBuscaLecciones(cuantasSesionesActivas, cualLeccion) {
    console.log("sesionesFuncionBuscaLecciones");
    console.log("cualLeccion", cualLeccion);

    firebase.database().ref(laUrlBase + 'Lecciones').orderByChild('Id').equalTo(cualLeccion).once('value').then(function(snapshot) {
        if (snapshot.val() != null) {
            console.log('snapshot.val()', snapshot.val());

            snapshot.forEach(function(childSnapshot) {
                this['sesion' + cuantasSesionesActivas + '_LeccionId'] = childSnapshot.val().Id;
                console.log('sesion' + cuantasSesionesActivas + '_LeccionId', this['sesion' + cuantasSesionesActivas + '_LeccionId']);
                this['sesion' + cuantasSesionesActivas + '_numLecciones'] = childSnapshot.numChildren();
                console.log('sesion' + cuantasSesionesActivas + '_numLecciones', this['sesion' + cuantasSesionesActivas + '_numLecciones']);
                this['sesion' + cuantasSesionesActivas + '_LeccionNombre'] = childSnapshot.val().Nombre;
                console.log('sesion' + cuantasSesionesActivas + '_LeccionNombre', this['sesion' + cuantasSesionesActivas + '_LeccionNombre']);
                this['sesion' + cuantasSesionesActivas + '_LeccionVisible'] = childSnapshot.val().Visible;
                console.log('sesion' + cuantasSesionesActivas + '_LeccionVisible', this['sesion' + cuantasSesionesActivas + '_LeccionVisible']);

                // Modulo ↓
                var contadorModulos = 0;
                this['sesion' + cuantasSesionesActivas + '_Leccion' + '_NumModulos'] = childSnapshot.child('Modulos').numChildren();
                console.log('sesion' + cuantasSesionesActivas + '_Leccion' + '_NumModulos: ', this['sesion' + cuantasSesionesActivas + '_Leccion' + '_NumModulos']);

                childSnapshot.child('Modulos').forEach(function(childSnapshotModulos) {
                    contadorModulos++;

                    //Nodo
                    this['sesion' + cuantasSesionesActivas + '_Leccion' + '_Modulo' + contadorModulos] = childSnapshotModulos.key;
                    console.log('📮 sesion' + cuantasSesionesActivas + '_Leccion' + '_Modulo' + contadorModulos + ': ', this['sesion' + cuantasSesionesActivas + '_Leccion' + '_Modulo' + contadorModulos]);
                    // Nombre Modulo
                    this['sesion' + cuantasSesionesActivas + '_Leccion' + '_Modulo' + contadorModulos + '_Nombre'] = childSnapshotModulos.val().Nombre;
                    console.log('sesion' + cuantasSesionesActivas + '_Leccion' + '_Modulo' + contadorModulos + '_Nombre: ', this['sesion' + cuantasSesionesActivas + '_Leccion' + '_Modulo' + contadorModulos + '_Nombre']);

                    var contadorRecursosLeccion = 0;
                    childSnapshotModulos.child('Recursos').forEach(function(childSnapshotRecursos) {
                        if (childSnapshotRecursos.val() != null) {
                            contadorRecursosLeccion++;
                            sesionesContadorRecursosTotal++;

                            // Recursos //
                            this['sesion' + cuantasSesionesActivas + '_Leccion' + '_Modulo' + contadorModulos + '_cuantosRecursos'] = childSnapshotModulos.child('Recursos').numChildren();
                            console.log('sesion' + cuantasSesionesActivas + '_Leccion' + '_Modulo' + contadorModulos + '_cuantosRecursos', this['sesion' + cuantasSesionesActivas + '_Leccion' + '_Modulo' + contadorModulos + '_cuantosRecursos']);
                            //Nodo
                            this['sesion' + cuantasSesionesActivas + '_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion] = childSnapshotRecursos.key;
                            console.log('📁 sesion' + cuantasSesionesActivas + '_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion, this['sesion' + cuantasSesionesActivas + '_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion]);
                            // Id Recurso
                            this['sesion' + cuantasSesionesActivas + '_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Id'] = childSnapshotRecursos.val().recurso_Id;
                            console.log('sesion' + cuantasSesionesActivas + '_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Id', this['sesion' + cuantasSesionesActivas + '_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Id']);
                            // Tipo Recurso
                            this['sesion' + cuantasSesionesActivas + '_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Tipo'] = childSnapshotRecursos.val().Tipo;
                            console.log('sesion' + cuantasSesionesActivas + '_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Tipo', this['sesion' + cuantasSesionesActivas + '_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Tipo']);
                            // Calificable Recurso
                            this['sesion' + cuantasSesionesActivas + '_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Calificable'] = childSnapshotRecursos.val().Calificable;
                            console.log('sesion' + cuantasSesionesActivas + '_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Calificable', this['sesion' + cuantasSesionesActivas + '_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Calificable']);

                            // Insignias ↓
                            this['sesion' + cuantasSesionesActivas + '_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Insignia'] = childSnapshotRecursos.val().insignia;
                            // console.log('sesion' + cuantasSesionesActivas + '_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion+ '_Insignia', this['sesion' + cuantasSesionesActivas + '_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion+ '_Insignia']);

                            if (this['sesion' + cuantasSesionesActivas + '_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Insignia'] != "no") {
                                console.log("🥇 Insignia ↓");
                                //Nombre     
                                /*
                                this['sesion' + cuantasSesionesActivas + '_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_InsigniaNombre'] = childSnapshotRecursos.child('insignia').val().nombre;
                                console.log('sesion' + cuantasSesionesActivas + '_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_InsigniaNombre: ', this['sesion' + cuantasSesionesActivas + '_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_InsigniaNombre']);
                                //Tipo
                                this['sesion' + cuantasSesionesActivas + '_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_InsigniaTipo'] = childSnapshotRecursos.child('insignia').val().tipo;
                                console.log('sesion' + cuantasSesionesActivas + '_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_InsigniaTipo: ', this['sesion' + cuantasSesionesActivas + '_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_InsigniaTipo']);
                                //Valor
                                this['sesion' + cuantasSesionesActivas + '_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_InsigniaValor'] = childSnapshotRecursos.child('insignia').val().valor;
                                console.log('sesion' + cuantasSesionesActivas + '_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_InsigniaValor: ', this['sesion' + cuantasSesionesActivas + '_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_InsigniaValor']);
                                //Ruta
                                this['sesion' + cuantasSesionesActivas + '_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_InsigniaRuta'] = childSnapshotRecursos.child('insignia').val().ruta;
                                console.log('sesion' + cuantasSesionesActivas + '_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_InsigniaRuta: ', this['sesion' + cuantasSesionesActivas + '_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_InsigniaRuta']);
                                //Otorgada
                                this['sesion' + cuantasSesionesActivas + '_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_InsigniaOtorgada'] = childSnapshotRecursos.child('insignia').val().otorgada;
                                console.log('sesion' + cuantasSesionesActivas + '_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_InsigniaOtorgada: ', this['sesion' + cuantasSesionesActivas + '_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_InsigniaOtorgada']);
                                //Obligatoria
                                this['sesion' + cuantasSesionesActivas + '_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_InsigniaObligatoria'] = childSnapshotRecursos.child('insignia').val().obligatoria;
                                console.log('sesion' + cuantasSesionesActivas + '_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_InsigniaObligatoria: ', this['sesion' + cuantasSesionesActivas + '_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_InsigniaObligatoria']);
                                //Tiempo
                                this['sesion' + cuantasSesionesActivas + '_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_InsigniaTiempo'] = childSnapshotRecursos.child('insignia').val().tiempo;
                                console.log('sesion' + cuantasSesionesActivas + '_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_InsigniaTiempo: ', this['sesion' + cuantasSesionesActivas + '_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_InsigniaTiempo']);
                                */
                                that = this;
                            } else {
                                console.log("🥇 NO Insignia");
                            }
                            // Insignias ↑

                            contadorSesionesActivas = cuantasSesionesActivas;
                            that = this;

                            return sesionesFuncionBuscaRecursos(contadorSesionesActivas, contadorModulos, contadorRecursosLeccion, this['sesion' + contadorSesionesActivas + '_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Id']);
                        } else {
                            console.log("🥇 NO recursos");
                        }
                    });

                    // Recursos //
                });
                // Modulos ↑
            });
        }
    });
    // Lección //
};

function sesionesFuncionBuscaRecursos(contadorSesionesActivas, contadorModulos, contadorRecursosLeccion, idRecurso) {
    console.log("sesionesFuncionBuscaRecursos");
    console.log("🈚-idRecurso", idRecurso, contadorRecursosLeccion);

    firebase.database().ref(laUrlBase + 'Recursos').orderByChild('Id').equalTo(idRecurso).once('value').then(function(snapshot) {
        if (snapshot.val() != null) {
            snapshot.forEach(function(childSnapshot) {
                sesionesContadorBuscarRecursos++;

                this['sesion' + contadorSesionesActivas + '_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Nombre'] = childSnapshot.val().Nombre;
                console.log('sesion' + contadorSesionesActivas + '_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Nombre', this['sesion' + contadorSesionesActivas + '_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Nombre']);

                this['sesion' + contadorSesionesActivas + '_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Categoria'] = childSnapshot.val().Categoria;
                console.log('sesion' + contadorSesionesActivas + '_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Categoria', this['sesion' + contadorSesionesActivas + '_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Categoria']);

                this['sesion' + contadorSesionesActivas + '_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Descripcion'] = childSnapshot.val().Descripcion;
                console.log('sesion' + contadorSesionesActivas + '_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Descripcion', this['sesion' + contadorSesionesActivas + '_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Descripcion']);

                this['sesion' + contadorSesionesActivas + '_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Visible'] = childSnapshot.val().Visible;
                console.log('sesion' + contadorSesionesActivas + '_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Visible', this['sesion' + contadorSesionesActivas + '_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Visible']);

                this['sesion' + contadorSesionesActivas + '_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Duracion'] = childSnapshot.val().Duracion;
                console.log('sesion' + contadorSesionesActivas + '_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Duracion', this['sesion' + contadorSesionesActivas + '_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Duracion']);

                this['sesion' + contadorSesionesActivas + '_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Liga'] = childSnapshot.val().Liga;
                console.log('sesion' + contadorSesionesActivas + '_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Liga', this['sesion' + contadorSesionesActivas + '_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Liga']);

                this['sesion' + contadorSesionesActivas + '_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Portada'] = childSnapshot.val().Portada;
                console.log('sesion' + contadorSesionesActivas + '_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Portada', this['sesion' + contadorSesionesActivas + '_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Portada']);

                // Competencias //
                var contadorCompetencias = 0;
                this['sesion' + contadorSesionesActivas + '_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_NumCompetencias'] = childSnapshot.child('Competencias').numChildren();
                console.log('sesion' + contadorSesionesActivas + '_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_NumCompetencias', this['sesion' + contadorSesionesActivas + '_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_NumCompetencias']);

                childSnapshot.child('Competencias').forEach(function(childSnapshotCompetencias) {
                    contadorCompetencias++;

                    // this['sesion' + contadorSesionesActivas + '_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Competencia' + contadorCompetencias] = childSnapshotCompetencias.val();
                    // console.log('sesion' + contadorSesionesActivas + '_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Competencia' + contadorCompetencias, this['sesion' + contadorSesionesActivas + '_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Competencia' + contadorCompetencias]);

                    this['sesion' + contadorSesionesActivas + '_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Competencia' + contadorCompetencias + '_Nombre'] = childSnapshotCompetencias.val().Nombre;
                    console.log('sesion' + contadorSesionesActivas + '_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Competencia' + contadorCompetencias + '_Nombre', this['sesion' + contadorSesionesActivas + '_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Competencia' + contadorCompetencias + '_Nombre']);

                    this['sesion' + contadorSesionesActivas + '_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Competencia' + contadorCompetencias + '_Nivel'] = childSnapshotCompetencias.val().Nivel;
                    console.log('sesion' + contadorSesionesActivas + '_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Competencia' + contadorCompetencias + '_Nivel', this['sesion' + contadorSesionesActivas + '_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Competencia' + contadorCompetencias + '_Nivel']);

                    this['sesion' + contadorSesionesActivas + '_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Competencia' + contadorCompetencias + '_Descripcion'] = childSnapshotCompetencias.val().Descripcion;
                    console.log('sesion' + contadorSesionesActivas + '_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Competencia' + contadorCompetencias + '_Descripcion', this['sesion' + contadorSesionesActivas + '_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Competencia' + contadorCompetencias + '_Descripcion']);

                    that = this;
                    // Competencias //

                });

                that = this;
            });

            if (sesionesContadorBuscarRecursos == sesionesContadorRecursosTotal) {
                console.log("✅", sesionesContadorRecursosTotal);

                return pintaSesiones().then(function() {
                    activaBotonesSesiones().then(function() {
                        cargador('oculta');
                    });
                });

            }
        }
    });
    console.log("recursosssssssssssssssssssss", contadorRecursosLeccion);
}

function sesionesFuncionBuscaUsuarios(contadorSesionesActivas, contadorUsuarios, idUsuario) {
    console.log("sesionesFuncionBuscaUsuarios");
    console.log("🈚-idUsuario", idUsuario);

    firebase.database().ref(laUrlBase + 'Usuarios').orderByChild('Id').equalTo(idUsuario).once('value').then(function(snapshot) {
        if (snapshot.val() != null) {
            snapshot.forEach(function(childSnapshotUsuarios) {
                sesionesContadorBuscarUsuarios++;

                this['sesion' + contadorSesionesActivas + '_Usuario' + contadorUsuarios + '_Id'] = childSnapshotUsuarios.val().Id;
                console.log('sesion' + contadorSesionesActivas + '_Usuario' + contadorUsuarios + '_Id', this['sesion' + contadorSesionesActivas + '_Usuario' + contadorUsuarios + '_Id']);
                this['sesion' + contadorSesionesActivas + '_Usuario' + contadorUsuarios + '_Nombre'] = childSnapshotUsuarios.val().Nombre;
                console.log('sesion' + contadorSesionesActivas + '_Usuario' + contadorUsuarios + '_Nombre', this['sesion' + contadorSesionesActivas + '_Usuario' + contadorUsuarios + '_Nombre']);
                this['sesion' + contadorSesionesActivas + '_Usuario' + contadorUsuarios + '_ApPaterno'] = childSnapshotUsuarios.val().Apellido_Paterno;
                console.log('sesion' + contadorSesionesActivas + '_Usuario' + contadorUsuarios + '_ApPaterno', this['sesion' + contadorSesionesActivas + '_Usuario' + contadorUsuarios + '_ApPaterno']);
                this['sesion' + contadorSesionesActivas + '_Usuario' + contadorUsuarios + '_ApMaterno'] = childSnapshotUsuarios.val().Apellido_Materno;
                console.log('sesion' + contadorSesionesActivas + '_Usuario' + contadorUsuarios + '_ApMaterno', this['sesion' + contadorSesionesActivas + '_Usuario' + contadorUsuarios + '_ApMaterno']);

            });
        }

        if (sesionesContadorBuscarUsuarios == sesionesContadorUsuariosTotal) {
            console.log("✅", sesionesContadorUsuariosTotal);

            return pintaSesiones().then(function() {
                activaBotonesSesiones().then(function() {
                    cargador('oculta');
                });
            });

        } else {
            console.log("🔴", sesionesContadorBuscarUsuarios, sesionesContadorUsuariosTotal);
        }

    });

};


function loadSession(a) {
    var ID = this['sesion' + a + '_Id'];
    console.log("[loadSession]: " + ID);
    $("#hiddenIdSesion").val(ID);
    var status = that['sesion' + a + '_Activa'];
    if (status) {
        $("#_activa").addClass('active');
    } else {
        $("#_activa").removeClass('active');
    }

    var sesionClavePrev = that['sesion' + a + '_Id'].substr(7);
    var sesionClave1 = sesionClavePrev.substr(0, 6);
    var sesionClave2 = sesionClavePrev.substr(6, 6);
    var sesionClave3 = sesionClavePrev.substr(12);
    $("#clave_sesion_titulo").html(sesionClave1 + '&nbsp;&nbsp;&nbsp;' + sesionClave2 + '&nbsp;&nbsp;&nbsp;' + sesionClave3);
    // $("#_nombreSesion").val(that['sesion' + a + '_Nombre']);


    //var FI = moment(that['sesion' + a + '_FechaInicio'], "DD/MM/YYYY").calendar();
    // var dmy = that['sesion' + a + '_FechaInicio'].split("T")[0];
    // var arr = dmy.split('-');
    // var FI = arr[1] + "/" + arr[1] + "/" + arr[0];
    // $("#_fechaInicio").val(FI);
    var laFechaInicio = moment(that['sesion' + a + '_FechaInicio']).locale('es').format('DD/MM/YYYY');
    $("#_fechaInicio").val(laFechaInicio);

    //var FF = moment(that['sesion' + a + '_FechaFin'], "DD/MM/YYYY").calendar();
    // var dmy2 = that['sesion' + a + '_FechaFin'].split("T")[0];
    // var arr2 = dmy2.split('-');
    // var FF = arr2[1] + "/" + arr2[2] + "/" + arr2[0];
    // $("#_fechaFin").val(FF);
    var laFechaFin = moment(that['sesion' + a + '_FechaFin']).locale('es').format('DD/MM/YYYY');
    $("#_fechaFin").val(laFechaFin);

    $("#_pais").val(that['sesion' + a + '_Pais']);
    $("#_estado").val(that['sesion' + a + '_Estado']);
    $("#_localidad").val(that['sesion' + a + '_Localidad']);
    $("#_centroTrabajo").val(that['sesion' + a + '_Centro_trabajo']);
    $("#_sala").val(that['sesion' + a + '_Sala']);
    $("#_organizacion").val(that['sesion' + a + '_Organización']);
    $("#_ambiente").val(that['sesion' + a + '_LeccionId']).trigger('change');
    $("#_instructor").val(that['sesion' + a + '_Instructor']).trigger('change');

}

function deleteSession(a) {
    $('#modalBorrarSesion').modal({
        transition: 'scale'
    }).modal('show');

    $(document).off('click', '#botonCancelarBorrarSesion').on('click', '#botonCancelarBorrarSesion', function(e) {
        console.log("Click Cancelar:  botonCancelarBorrarAA");
    });
    $(document).off('click', '#botonAceptarBorrarSesion').on('click', '#botonAceptarBorrarSesion', function(e) {
        var Key = that['sesion' + a + '_Id'];
        var url = "Sesiones/" + Key;
        console.log("[ELIMINAR sesion]: " + url);
        fbEliminarSesion(url);
    });

}

function fbEliminarSesion(url) {
    var onComplete = function(error) {
        if (error) {
            $.notify({
                message: 'Ocurrió un error en la sincronización.'
            }, {
                // settings
                type: 'danger',
                allow_dismiss: true,
                delay: 1500,
                allow_dismiss: false,
            });
            console.log('Ocurrió un error en la sincronización.');
        } else {
            setTimeout(function() {
                cuentaSesiones();
                // pintaSesiones();
            }, 00);

            $.notify({
                message: 'La sesión se eliminó exitosamente.'
            }, {
                type: 'info',
                allow_dismiss: true,
                delay: 1500,
                allow_dismiss: false,
            });
        };
    };
    if (revisaConexion) {
        console.log("Estoy eliminando: " + url);
        firebase.database().ref().child(url).remove(onComplete);
    }
}

function pintaSesiones() {
    console.log('🔵 pintaSesiones');

    var contenidoSecSesiones = '';
    $('.sesiones_int').empty();

    // Agregar Sesión //
    // contenidoSecSesiones += '<button id="botonAgregaSesion" class="btn btn-round botonAgregar" data-toggle="modal" data-target="#modalAgregaSesion" style="float: right; margin-top: -60px;"><i class="nc-icon-glyph ui-1_bold-add"></i>&nbsp; Agregar Sesión</button>';
    // Agregar Sesión //

    //  for (a = 1; a <= cuantasCategorias; a++) {
    // contenidoSecSesiones += '<div id="grupoCategoria" class="grupo_categoria">';
    contenidoSecSesiones += '<p class="titulo_seccion">Ambientes de aprendizaje</p>';
    // contenidoSecSesiones += '</div>';


    for (a = 1; a <= cuantasLeccionesVisibles; a++) {

        contenidoSecSesiones += '<div id="leccion' + a + '" class="card leccion">';
        contenidoSecSesiones += '<div class="card-body" style="padding-top: 20px;">';

        contenidoSecSesiones += '<div class="row" style="background: #fdece0; margin-top: -20px; height: 60px;">';
        contenidoSecSesiones += '<div class="col-10">';
        contenidoSecSesiones += '<h5 class="card-title" style="margin-top: 15px !important;">' + that['leccion' + a + '_Nombre'] + '</h5><br><br>';
        contenidoSecSesiones += '</div>';


        contenidoSecSesiones += '<div class="col-2">';

        contenidoSecSesiones += '<div class="pull-right">';
        contenidoSecSesiones += '<div class="btn btn-round btn-neutral btn-menu_neutral" onClick="abreMenuSesiones(' + a + ')"><i class="nc-icon-glyph ui-2_menu-dots" style="font-size: 20px; font-weight: 600;"></i></div>';

        contenidoSecSesiones += '<div id="menu_sesiones' + a + '" class="ui vertical menu menu_sesiones" style="display: none; position: absolute; z-index: 99; margin-left: -140px; margin-top: -15px;">';
        contenidoSecSesiones += '<a id="botonAgregaSesion" class="item boton_verde_alt"  data-toggle="modal" data-target="#modalAgregaSesion">';
        contenidoSecSesiones += '<h4 class="ui header" style="margin-bottom: 20px;">Agregar Sesión<i class="nc-icon-glyph ui-1_bold-add pull-right"></i></h4>';
        contenidoSecSesiones += '<p>Se agrega una Sesión dentro de este Ambiente de Aprendizaje.</p>';
        contenidoSecSesiones += '</a>';
        // TODO descargar reportes
        // contenidoSecSesiones += '<a class="item boton_morado" onClick="descargarReporteAmbiente(' + a + ')">';
        // contenidoSecSesiones += '<h4 class="ui header" style="margin-bottom: 20px;">Descargar Reporte<i class="nc-icon-outline business_chart-bar-33 pull-right"></i></h4>';
        // contenidoSecSesiones += '<p>Se descarga el Reporte de este Ambiente de Aprendizaje.</p>';
        // contenidoSecSesiones += '</a>';
        contenidoSecSesiones += '</div>';
        contenidoSecSesiones += '</div>';

        contenidoSecSesiones += '</div>';
        contenidoSecSesiones += '</div>';


        for (b = 1; b <= cuantasSesionesActivas; b++) {

            if (that['sesion' + b + '_LeccionId'] === that['leccion' + a + '_Id']) {

                var sesionClavePrev = that['sesion' + b + '_Id'].substr(7);
                var sesionClave1 = sesionClavePrev.substr(0, 6);
                var sesionClave2 = sesionClavePrev.substr(6, 6);
                var sesionClave3 = sesionClavePrev.substr(12);

                contenidoSecSesiones += '<p class="grupo_categoria" style="padding: 20px 0px 0px 0px; border-top-color: #d1d5da;"></p>';

                contenidoSecSesiones += '<div class="row">';
                contenidoSecSesiones += '<div class="col-10">';

                contenidoSecSesiones += '<div class="card-text" style="margin-left: 20px;"><b>Sesión: </b><span class="clave_sesion">' + sesionClave1 + '&nbsp;&nbsp;&nbsp;' + sesionClave2 + '&nbsp;&nbsp;&nbsp;' + sesionClave3 + '</span></div>';

                contenidoSecSesiones += '</div>';



                contenidoSecSesiones += '<div class="col-2" style="margin-top: -20px; padding-bottom: 10px;">';

                contenidoSecSesiones += '<div class="pull-right">';
                contenidoSecSesiones += '<div class="btn btn-round btn-neutral btn-menu_neutral" onClick="abreMenuSesiones_(' + b + ')"><i class="nc-icon-glyph ui-2_menu-dots" style="font-size: 20px; font-weight: 600;"></i></div>';

                contenidoSecSesiones += '<div id="menu_sesiones_' + b + '" class="ui vertical menu menu_sesiones_" style="display: none; position: absolute; z-index: 99; margin-left: -140px; margin-top: -15px;">';
                contenidoSecSesiones += '<a class="item boton_naranja_alt" data-toggle="modal" data-target="#modalEditarSesion" onclick="loadSession(' + b + ')">';
                contenidoSecSesiones += '<h4 class="ui header" style="margin-bottom: 20px;">Editar Sesión<i class="nc-icon-outline ui-1_pencil pull-right"></i></h4>';
                contenidoSecSesiones += '<p>Se editan las propiedades de esta Sesión.</p>';
                contenidoSecSesiones += '</a>';
                contenidoSecSesiones += '<a class="item boton_rojo_alt" onclick="deleteSession(' + b + ')">';
                contenidoSecSesiones += '<h4 class="ui header" style="margin-bottom: 20px;">Eliminar Sesión<i class="nc-icon-outline ui-1_trash-simple pull-right"></i></h4>';
                contenidoSecSesiones += '<p>Se elimina esta Sesión.</p>';
                contenidoSecSesiones += '</a>';
                // TODO descargar reportes
                // contenidoSecSesiones += '<a class="item boton_morado" onClick="descargarReporteSesion(' + b + ')">';
                // contenidoSecSesiones += '<h4 class="ui header" style="margin-bottom: 20px;">Descargar Reporte<i class="nc-icon-outline business_chart-bar-33 pull-right"></i></h4>';
                // contenidoSecSesiones += '<p>Se descarga el Reporte de esta Sesión.</p>';
                // contenidoSecSesiones += '</a>';
                contenidoSecSesiones += '</div>';
                contenidoSecSesiones += '</div>';



                contenidoSecSesiones += '</div>';
                contenidoSecSesiones += '</div>';

            }

        }
        contenidoSecSesiones += '</div>';
        contenidoSecSesiones += '</div>';



        contenidoSecSesiones += '</div>';

    }



    $('.sesiones_int').append(contenidoSecSesiones);
    $('#subtituloSeccion').html('<a  >' + cuantasLecciones + '</a> sesiones en total');

    $('#fechaInicio, #fechaFin, #_fechaInicio, #_fechaFin').datepicker({
        language: "es",
        format: "dd/mm/yyyy"
    });


    return $.ajax();
}


// menús verticales //
function abreMenuSesiones(cualLeccion) {
    $('#menu_sesiones' + cualLeccion).fadeIn('fast');
}

function cierraMenuSesiones() {
    $(".menu_sesiones").fadeOut('fast');
}

function abreMenuSesiones_(cualSesion) {
    $('#menu_sesiones_' + cualSesion).fadeIn('fast');
}

function cierraMenuSesiones_() {
    $(".menu_sesiones_").fadeOut('fast');
}

$(document).on('mouseup', 'body *', function(e) {
    if (!$(".menu_sesiones").is(e.target) && !$('.btn-menu_neutral').is(e.target)) {
        cierraMenuSesiones();
    }
    if (!$(".menu_sesiones_").is(e.target) && !$('.btn-menu_blanco').is(e.target)) {
        cierraMenuSesiones_();
    }
});
// menús verticales //


function activaBotonesSesiones() {
    console.log('activaBotonesSesiones');

    $('.sesiones_int').css({
        'margin-top': '-50px'
    });
    if (elPerfil === "Participante") {
        $('.main-panel').addClass('main-panel_100');
        $('.panel-header, .sidebar, .navbar-toggler').hide();
        $("#panel-participante").show();
    }

    $('#modalAgregaSesion').on('hidden.bs.modal', function() {
        // console.log('limipando modalAgregaSesion');
        cleanAddSession();
    })



    return $.ajax();
}

/**ENTREGADO*/
