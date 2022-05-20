// Paper Bootstrap Wizard Functions

var config = {
    apiKey: "AIzaSyC9xTqn7UZrzA9zRsij2D7rNRHW99duL4U",
    authDomain: "bimbopre.firebaseapp.com",
    databaseURL: "https://bimbopre.firebaseio.com",
    projectId: "bimbopre",
    storageBucket: "bimbopre.appspot.com",
    messagingSenderId: "948906890611",
    appId: "1:948906890611:web:c54f79723e912204eda106"
};
var secret = 'LP0YmIUMPHaIifbDG2OYGE75NXpp7pSMLjQy6qMo';
var laUrlBase = "Orientation/";
var laUrlAPI = "https://bimbopre.firebaseio.com/Orientation";

firebase.initializeApp(config);

var laURL = "muchofocus.com/orientation/";
var baseOk;
var usuarioId;
var elPerfil;
var elPerfilNombre;
var elPerfilApellido;
var elRol;
var cuantosUsuarios;
var usuarioKey;
var contadorKey = 0;
var usuarioSeleccionado;
var usuarioSeleccionadoId;
var connected = false;
var laFecha;
var laFechaFormateada;
var laSesionActual;
var minutosMaxSession = 30;
var that;

var seccionActual;
var laSemana;
var elDia;
var elDiaTotal;
var laCategoria;
var laSemanaSel = 0;
var elDiaSel = 0;
var laCategoriaSel = 0;
var dataWeeks;
var cuantasSemanas;
var back;
/*******Variables definidas por Jordan para funcionalidad de botón Next & Save********/
var totalGlobalCategorias = 0;
var totalGlobalDias = 0;
var totalGolabalSemanas = 0;
/********************************************************************************************/
this.arrayStatusWeeks = [];
this.arrayStatusCats = [];
const arregloJson = [];
_that = this;

var mensajeConexion = 'Checking connection...';
var mensajeError = 'Please provide valid data.';
var mensajeErrorLogin = 'Please provide valid data.';
var mensajeErrorRegister = 'Please fill all inputs with valid data.';


var revisaConexion = function() {
    var connectedRef = firebase.database().ref(".info/connected");
    connectedRef.on("value", function(snap) {
        connected = false;
        $('#divBloqConexion').show();
        if (snap.val() === true) {
            connected = true;
            console.log("connected", connected);
            $('#divBloqConexion').hide();
            return connected;
        }
    });
}


// var Nav = new hcOffcanvasNav('#side_menu', {
//     // width: 300,
//     disableAt: false,
//     customToggle: '#navbar_boton_menu',
//     levelSpacing: 40,
//     // navTitle: 'ORIENTATION PLAYBOOK',
//     levelTitles: false,
//     levelTitleAsBack: false,
//     pushContent: false,
//     // labelClose: 'orale',
//     labelBack: '',
//     levelOpen: 'overlap',
//     insertBack: true
// });



var email = 'pre@i4l.mx';
var password = 'i4l#pre';

function login(cualUsuario, cualPassword) {
    console.log(cualUsuario, ' y ', cualPassword);

    var elPassword = md5(cualPassword);
    console.log('elPassword', elPassword);

    habilitaBoton($('#botonEntrar'), false);
    baseOk = firebase.auth().signInWithEmailAndPassword(email, password).then(function(result) {
            //  console.log('baseOk', baseOk);

            var user = firebase.auth().currentUser;
            var name, email, uid, perfil;

            // user.updateProfile({
            //     displayName: "Usuario"
            // }).then(function () {
            //     // Update successful.
            // }, function (error) {
            //     // An error happened.
            // });
            // console.log('user.displayName', user.displayName);

            if (user != null) {

                var elPerfil_DB = user.displayName;
                console.log("elPerfil_DB", elPerfil_DB);
                elPerfil = user.displayName;
                console.log("elPerfil_DB", elPerfil_DB);

                if (elPerfil_DB === "SuperAdmin" || elPerfil_DB === "Administrador" || elPerfil_DB === "Usuario") {

                    var valBuscar1 = 'Username';
                    var valBuscar2 = cualUsuario;

                    firebase.database().ref(laUrlBase + 'Usuarios').orderByChild(valBuscar1).equalTo(valBuscar2).once('value').then(function(snapshot) {

                        if (snapshot.val() != null) {
                            console.log('snapshot.val()', snapshot.val());

                            snapshot.forEach(function(childSnapshot) {
                                usuarioKey = childSnapshot.key;
                                // console.log('usuarioKey', usuarioKey);
                                usuarioContrasena = snapshot.child(childSnapshot.key).child('Password').val();
                                console.log('usuarioContrasena', usuarioContrasena);
                                usuarioId = snapshot.child(childSnapshot.key).child('Id').val();
                                // console.log('usuarioId', usuarioId);
                            });
                            if (elPassword === usuarioContrasena) {
                                registraLocalStorage(cualUsuario, cualPassword);
                                ingresa(usuarioId);
                            } else {
                                console.log('mensaje_error_login');
                                $('.mensaje_error_login').text(mensajeErrorLogin);
                                habilitaBoton($('#botonEntrar'), true);
                            }
                        } else {
                            console.log('mensaje_error_login');
                            $('.mensaje_error_login').text(mensajeErrorLogin);
                            habilitaBoton($('#botonEntrar'), true);
                        }
                    });
                }

            }
        },
        function(error) {
            $('.mensaje_error_login').text(mensajeErrorLogin);
            habilitaBoton($('#botonEntrar'), true);
        });
}



///////////////////////////////// fechas ///////////////////////////////////////

function obtenerFecha() {
    moment.locale('es');
    var laFecha = moment().format();
    console.log('laFecha', laFecha);

    //    var tiempo = moment().format('DDMMYYHHmmss');
    // console.log('tiempo', tiempo);

    return laFecha;
}
//obtenerFecha();

function obtenerFechaInicial() {
    moment.locale('es');
    laFechaInicial = moment().format();
    console.log('laFechaInicial', laFechaInicial);

    return laFechaInicial;
}
//obtenerFechaInicial();

function obtenerDuracion() {
    moment.locale('es');
    laFechaFinal = moment().format();
    laDuracion = moment(laFechaInicial).fromNow(true);
    console.log('laDuracion', laDuracion);

    return laDuracion;
}
//obtenerDuracion();


laFecha = obtenerFecha();
laFechaInicial = obtenerFechaInicial();
laFechaFinal = moment().format('LL');
//
// console.log('laFecha', laFecha);
// console.log('laFechaInicial', laFechaInicial);
// console.log('laFechaFinal', laFechaFinal);


function obtenerFechaFormateada() {
    var laFechaFormateada = moment().locale('es').format('DD/MM/YYYY');
    console.log('laFechaFormateada', laFechaFormateada);

    return laFechaFormateada;
};

function obtenerFechaFormateadaEsp(cualFecha) {
    var laFechaFormateadaEsp = moment(cualFecha).format('DD-MM-YYYY');
    console.log('laFechaFormateadaEsp', cualFecha);

    return laFechaFormateadaEsp;
};


function generarId() {
    var caracteres = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var longitud = 4;
    code = '';
    for (x = 0; x < longitud; x++) {
        rand = Math.floor(Math.random() * caracteres.length);
        code += caracteres.substr(rand, 1);
    }
    var tiempo = moment().format('YYMMDDHHmmss');
    var idNuevo = (tiempo) + code;
    console.log(idNuevo);

    return idNuevo;
};

function obtenersesionExpirada(cualFecha) {
    laFechaHoyPrev = obtenerFecha();
    laFechaHoy = moment(laFechaHoyPrev);
    cualFecha = moment(cualFecha);
    // console.log('cualFecha', cualFecha);
    // console.log('laFechaHoy', laFechaHoy);
    var laSessionMinutos = laFechaHoy.diff(cualFecha, 'minutes');
    console.log('laSessionMinutos', laSessionMinutos);

    if (laSessionMinutos < minutosMaxSession) {
        console.log('todavía no expira la session');
        return false;
    } else {
        console.log('ya expiró la session');
        return true;
    };
};

function registraLocalStorage(user, password) {
    if ('localStorage' in window && window['localStorage'] !== null) {
        localStorage.usr = user;
        localStorage.psw = password;
        localStorage.fch_ini = obtenerFecha();
        // console.log('usr', localStorage.usr, ' y psw', localStorage.psw);
    } else {
        console.log('localStorage no está soportado en este navegador.');
    }
}

function leeLocalStorage() {
    $("#inputUsuario, #inputPassword").attr("disabled", "disabled");
    try {
        usr = localStorage.usr;
        psw = localStorage.psw;
        if (usr != null && psw != null) {
            var sesionExpirada = obtenersesionExpirada(localStorage.fch_ini);
            console.log('sesionExpirada', sesionExpirada);
            if (sesionExpirada == false) {
                login(usr, psw);
            } else {
                $("#inputUsuario, #inputPassword").prop("disabled", false);
                eliminaLocalStorage();
                loadSeccion('login');
            }
        } else {
            loadSeccion('login');
            $("#inputUsuario, #inputPassword").prop("disabled", false);
        }
    } catch (e) {
        storage = {};
    }
}

function eliminaLocalStorage() {
    localStorage.clear();
}


function habilitaBoton(cualBoton, modo) {
    if (modo == false) {
        cualBoton.addClass('deshabilitado');
    } else {
        cualBoton.removeClass('deshabilitado');
    };
};

function habilitaDiv(cualBoton, modo) {
    if (modo == false) {
        cualBoton.addClass('disabled');
    } else {
        cualBoton.removeClass('disabled');
    };
};


function ingresa(usuarioId) {
    console.log('usuarioId', usuarioId);

    if (usuarioId != null) {

        if (revisaConexion) {
            firebase.database().ref(laUrlBase + 'Usuarios').orderByChild('Id').equalTo(usuarioId).once('value').then(function(snapshot) {
                if (snapshot.val() != null) {

                    snapshot.forEach(function(childSnapshot) {
                        var elNombreRes = snapshot.child(childSnapshot.key).child('Name').val();
                        elPerfilNombre = elNombreRes;
                        var elApellidoRes = snapshot.child(childSnapshot.key).child('Last_Name').val();
                        elPerfilApellido = elApellidoRes;
                        var elId = snapshot.child(childSnapshot.key).child('Id').val();
                        console.log('elId', elId);
                        elRol = snapshot.child(childSnapshot.key).child('Perfil').val();
                        console.log('elRol', elRol);
                        var elCountry = snapshot.child(childSnapshot.key).child('Country').val();
                        console.log('elCountry', elCountry);
                        var laRegion = snapshot.child(childSnapshot.key).child('Region').val();
                        console.log('laRegion', laRegion);

                        firebase.database().ref(laUrlBase + 'Usuarios/' + usuarioKey).update({
                            "Activo": true
                        });

                        ingresaOK();
                    });
                } else {
                    console.log('no se encuentra usuario');
                }
            });
        }
    } else {
        ingresaOK();
    }

    function ingresaOK() {

        habilitaBoton($('#botonEntrar'), false);
        $("#inputUsuario").val('');
        $("#inputPassword").val('');
        $('.mensaje_nombre_perfil').text('');
        $('.mensaje_error_login').text('');
        $('.nombre_perfil').text(elPerfilNombre);

        // if (!isMobile) {
        //     Scrollbar.destroyAll();
        // }
        loadSeccion('home');

    }
}


function loginUser() {
    var user = $("#inputUsuario").val();
    var password = $("#inputPassword").val();
    $('.mensaje_error_login').text('');
    var listError = "";

    if (user.length === 0) {
        listError += '1';
        $('.mensaje_error_login').text(mensajeErrorLogin);
    }
    if (password.length === 0) {
        listError += '1';
        $('.mensaje_error_login').text(mensajeErrorLogin);
    }
    if (listError.length > 0) {
        $('.mensaje_error_login').text(mensajeErrorLogin);
    } else {
        var userLogin = {
            Correo: user,
            Contrasena: password
        };
        login(userLogin.Correo, userLogin.Contrasena);
        $("._login").val('');
        // $('.mensaje_error_login').addClass('ocultar');
    }
}

function cierraSesion() {
    console.log('cerrando sesion');

    var onComplete = function(error) {
        if (error) {
            console.log('Ocurrió un error en la sincronización.');
        } else {
            firebase.auth().signOut().then(function() {

                habilitaBoton($('#botonEntrar'), true);
                $("#inputUsuario, #inputPassword").prop("disabled", false);
                eliminaLocalStorage();
                $('#botonAtras').hide();
                $('#botonSalir').hide();
                $('.nombre_perfil').text('');

                seccionActual = undefined;
                laSemana = undefined;
                elDia = undefined;
                laCategoria = undefined;
                laSemanaSel = undefined;
                elDiaSel = undefined;
                laCategoriaSel = undefined;
                usuarioSeleccionadoId = undefined;
                usuarioSeleccionado = undefined;

                loadSeccion('login');
            }, function(error) {

            });
            usuarioId = '';
            console.log('Sincronización realizada.');

            cierraMenu();
        }
    };

    firebase.database().ref(laUrlBase + 'Usuarios/' + usuarioKey).update({
        "Activo": false
    }, onComplete);

}

function cierraMenu() {
    // Nav.close();
}


function cargador(evento) {
    var duracion = 100;
    switch (evento) {
        case 'muestra':
            $('#cargando').css({
                'display': 'block',
                'z-index': '999'
            });
            $("#cargando_int").animate({
                'opacity': '0.3'
            }, duracion, function() {

            });
            break;
        case 'oculta':
            $("#cargando_int").animate({
                'opacity': '0'
            }, duracion, function() {
                $('#cargando').css({
                    'display': 'none'
                });
            });
            break;
    }
}




function loadSeccion(cualseccion, elBack) {
    seccionActual = cualseccion;
    back = 'sinBack';
    if (elBack != undefined && elBack != null && elBack != '') {
        back = elBack;
    }
    console.log('seccionActual', seccionActual, back);

    $("#container").empty();
    $("#container").load('inc/' + cualseccion + '.html', function(response, status, xhr) {
        console.log('status', status);
    });

    // $('#botonHome').hide();
    if (seccionActual != 'splash' && seccionActual != 'login' && seccionActual != 'home') {
        // $('#botonHome').show();
    }

    $('#botonAtras').hide();
    $('#botonSalir').hide();
    // if (seccionActual != 'splash' && seccionActual != 'login' && seccionActual != 'tasks') {
    if (seccionActual != 'splash' && seccionActual != 'login') {
        $('#botonSalir').show();
        $('.navbar').css({
            'display': 'block'
        });
        $('.container').css({
            'margin-top': '50px'
        });
    } else {
        $('.navbar').css({
            'display': 'none'
        });
        $('.container').css({
            'margin-top': '0px'
        });
    }
    if (seccionActual == 'tasks' || seccionActual == 'tools' || seccionActual == 'calendar') {
        $('.navbar_tasks').css({
            'display': 'flex'
        });
        $('#botonAtras').show();
    } else {
        $('.navbar_tasks').css({
            'display': 'none'
        });
    }


    if (seccionActual == 'login') {
        $('#container').css({
            'overflow-x': 'hidden'
        });

        seccionActual = undefined;
        laSemana = undefined;
        elDia = undefined;
        laCategoria = undefined;
        laSemanaSel = undefined;
        elDiaSel = undefined;
        laCategoriaSel = undefined;

    } else {
        $('#container').css({
            'overflow-x': 'visible'
        });
    }


    $('#divSelectPar').hide();
    if (seccionActual === 'home') {
        if (elRol !== 'IBP') {
            $('#divSelectPar').show();
        }
    }

    $('#divToolsWrapper').hide();
    $('#divTools').hide();
    if (seccionActual === 'home' || seccionActual === 'calendar' || seccionActual === 'tools') {
        $('#divTools').show();
        $('#divToolsWrapper').show();
    }

    // habilitaDiv($('#botonReporte'), false);
    habilitaDiv($('#botonGuardar'), true);
    if (elRol === 'Admin' || elRol === 'Coach') {
        //     habilitaDiv($('#botonReporte'), true);
        habilitaDiv($('#botonGuardar'), false);
    }


    $(document).off('click', '#botonHome').on('click', '#botonHome', function(e) {
        // if (seccionActual == 'tasks') {
        //     loadSeccion('home');
        // }
        // if (seccionActual == 'calendar') {
        //     loadSeccion('home');
        // }
        // if (seccionActual == 'tools') {
        loadSeccion('home');
        // }
    });

    $(document).off('click', '#botonReporte').on('click', '#botonReporte', function(e) {
        descargaReporte();
    });

    $(document).off('click', '#botonCalendario').on('click', '#botonCalendario', function(e) {
        event.preventDefault();
        // descargaReporteDetalle();
        loadSeccion('calendar');
    });

    $(document).off('click', '#botonTools').on('click', '#botonTools', function(e) {
        loadSeccion('tools');
    });

    $(document).off('click', '#botonAtras').on('click', '#botonAtras', function(e) {
        if (seccionActual != 'home') {
            loadSeccion('home', 'conBack');
        } else {
            loadSeccion('home', 'sinBack');
        }
    });

    $(document).off('click', '#botonSalir').on('click', '#botonSalir', function(e) {
        cierraSesion();
    });

    $('#botonLogOut').click(function() {
        cierraSesion();
    });

}


function ajustaTamano() {
    // console.log(' ajustaTamano');
    $(".seccion").css({
        'height': '0px'
    });

    return reAjustaTamano();
}

function reAjustaTamano() {
    var elVPHeight = $(document).height();
    var elSeccHeight = $(".seccion").height();
    // console.log(elVPHeight, elSeccHeight);

    if (seccionActual == 'splash' || seccionActual == 'login' || seccionActual == undefined) {
        // if ((elSeccHeight + 60) < elVPHeight) {
        $(".seccion").css({
            'height': (elVPHeight - 60)
        });
        // }
    } else {
        if ((elSeccHeight + 110) < elVPHeight) {
            $(".seccion").css({
                'height': (elVPHeight - 110)
            });
        }
    }
}

function activaRadio() {
    $('[data-toggle="wizard-radio"]').click(function() {
        wizard = $(this).closest('.wizard-card');
        wizard.find('[data-toggle="wizard-radio"]').removeClass('active');
        $(this).addClass('active');
        $(wizard).find('[type="radio"]').removeAttr('checked');
        $(this).find('[type="radio"]').attr('checked', 'true');
    });
}

function activaCheckbox() {
    $('[data-toggle="wizard-checkbox"]').click(function() {
        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
            $(this).find('[type="checkbox"]').removeAttr('checked');
        } else {
            $(this).addClass('active');
            $(this).find('[type="checkbox"]').attr('checked', 'true');
        }
    });
}

function detectMobile() {
    console.log('userAgent', navigator.userAgent);
    if (navigator.userAgent.match(/Android/i) ||
        navigator.userAgent.match(/webOS/i) ||
        navigator.userAgent.match(/iPhone/i) ||
        navigator.userAgent.match(/iPad/i) ||
        navigator.userAgent.match(/iPod/i) ||
        navigator.userAgent.match(/BlackBerry/i) ||
        navigator.userAgent.match(/Windows Phone/i)) {

        return true;
    }
}
var isMobile = detectMobile();



$(document).ready(function() {

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/js/sw.js', {
                scope: '/js/'
            })
            .then(function(registration) {
                console.log('Service Worker Registered');
            });

        navigator.serviceWorker.ready.then(function(registration) {
            console.log('Service Worker Ready');
        });
    }

    var db = new PouchDB('baseOffline');

    // db.changes({
    //     since: 'now',
    //     live: true
    // }).on('change', sincronizaUsuario);

    // db.allDocs({
    //     include_docs: true,
    //     descending: true
    // }, function(err, doc) {
    //     redrawTodosUI(doc.rows);
    // });

    // db.put(todo);
    // db.remove(todo);
    var elDoc = {};

    addToHomescreen();


    /*  Activate the tooltips      */
    // $('[rel="tooltip"]').tooltip();

    habilitaBoton($('#botonEntrar'), false);
    loadSeccion('splash');
    // leeLocalStorage();
    ran = generarId();
    location.hash = "?" + ran;


});