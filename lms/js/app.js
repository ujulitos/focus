/* Panel Admin uJL 2016 */

var config = {
    apiKey: "AIzaSyBcpJTlhT22rQPwXKq0PjA3CMxT7gutkEs",
    authDomain: "ujlbase.firebaseapp.com",
    databaseURL: "https://ujlbase.firebaseio.com",
    projectId: "ujlbase",
    storageBucket: "ujlbase.appspot.com",
    messagingSenderId: "572100351671",
    appId: "1:572100351671:web:e4ccb15f7783a565da9f32",
    measurementId: "G-XGVJBT18BD"
};
// var secret = 'fLsL824rAETWsoDveTUMn7xpyUwwBfzhJLKNuEg9';
let laUrlBase = 'LMS/';
var URL_BASE = 'http://muchofocus.com/lms/';
firebase.initializeApp(config);

//create firebase references
var Auth = firebase.auth();
var dbRef = firebase.database();
var Users = dbRef.ref('Usuarios');
var contactsRef = dbRef.ref('contacts');
var auth = null;


var baseOk;
var elCurso = '';
var usuarioId;
var _elPerfil;
var _elPerfilNombre;
var elNombre;
var elApellidoPat;
var elApellidoMat;
var usuarioIdRes;
var elPerfil;
var cuantosRecursos;
var cuantosRecursosVisibles = 0;
var cuantasSesionesActivas = 0;
var cuantosUsuariosPorSesion;
var elContenido;
var elContenidoLanzado = false;
var cuantosUsuarios;
var usuarioKey;
var contadorKey = 0;
var connected = false;
var nuevoUsuarioData = {};
var laFecha;
var laFechaInicial;
var laFechaFinal;
var laFechaFormateada;
var cualContenido;
var arrayCategorias = new Array();
var cuantasCategorias = 0;
var losRecursos;
var laSesionActual;
var minutosMaxSession = 30;
var candado = true;
var that;


var mensajeConexion = 'Revisando conexión...';
var mensajeError = 'Por favor ingresa datos válidos.';
var mensajeErrorLogin = 'Por favor ingresa datos válidos.';
var mensajeErrorColaborador = 'No hay un nombre asociado a ese número de empleado.';


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


var email_master = 'demo@demo.com';
var password_master = 'demo@demo.com';

///////////////
function login0() { ///TODO quitar despues :P 
    var cualUsuario = 'admin@lms.com';
    var cualPassword = 'admin';
    login(cualUsuario, cualPassword);
};

function login1() { ///TODO quitar despues :P
    var cualUsuario = 'instructor@lms.com';
    var cualPassword = 'instructor';
    login(cualUsuario, cualPassword);
};

function login2() { ///TODO quitar despues :P
    var cualUsuario = 'participante@lms.com';
    var cualPassword = 'participante';
    login(cualUsuario, cualPassword);
};



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
    var laFechaFormateada = moment().locale('es').format('DD-MM-YYYY');
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


function habilitaBoton(cualBoton, modo) {
    if (modo == false) {
        cualBoton.addClass('disabled');
    } else {
        cualBoton.removeClass("disabled");
    };
};



function login(cualUsuario, cualPassword) {
    cargador('muestra');

    var elPassword = md5(cualPassword);
    $('#botonEntrar').addClass('disabled');


    firebase.auth().signInWithEmailAndPassword(email_master, password_master).then(function(result) {
        console.log("result");
        var user = firebase.auth().currentUser;
        if (user != null) {
            // _elPerfil === "SuperAdmin" || "Administrador" || "Instructor" ||  "Participante" ||  "Usuario") 

            // user.updateProfile({
            //     displayName: "Administrador"
            // }).then(function() {
            //     // Update successful.
            // }, function(error) {
            //     // An error happened.
            // });
            console.log('user.displayName', user.displayName);

            var valBuscar1 = 'Correo';
            var valBuscar2 = cualUsuario;

            firebase.database().ref(laUrlBase + 'Usuarios').orderByChild(valBuscar1).equalTo(valBuscar2).once('value').then(function(snapshot) {
                console.log(valBuscar1, valBuscar2, '[snapshot.val()]', snapshot.val());
                if (snapshot.val() != null) {
                    // console.log('[snapshot.val()]', snapshot.val());

                    snapshot.forEach(function(childSnapshot) {
                        usuarioKey = childSnapshot.key;
                        console.log('usuarioKey', usuarioKey);
                        usuarioContrasena = snapshot.child(childSnapshot.key).child('Contrasena').val();
                        console.log('usuarioContrasena', usuarioContrasena);
                        usuarioId = snapshot.child(childSnapshot.key).child('Id').val();
                        elPerfil = snapshot.child(childSnapshot.key).child('Perfil').val();
                        _elPerfil = elPerfil;
                    });
                    if (elPassword === usuarioContrasena) {
                        registraLocalStorage(cualUsuario, cualPassword);
                        ingresa(usuarioId, elPerfil);
                    } else {
                        cargador('oculta');
                        $("#errorLogin").html("Lo sentimos, sus credenciales no son correctas").removeClass('ocultar');
                        $('#botonEntrar').removeClass('disabled');
                    }

                } else {
                    cargador('oculta');
                    $("#errorLogin").html("Sus credenciales de autenticación no son correctas").removeClass('ocultar');
                    $('#botonEntrar').removeClass('disabled');
                }
            }, function(errorObject) {
                cargador('oculta');
                console.log("The read failed: " + errorObject.code);
                console.log("Lo sentimos, su usuario y contraseña no coinciden.");
            });

        }
    }, function(error) {
        $("#errorLogin").html("Lo sentimos, sus credenciales no son correctas").removeClass('ocultar');
        $('#botonEntrar').removeClass('disabled');
    });

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
    try {
        usr = localStorage.usr;
        psw = localStorage.psw;
        if (usr != null && psw != null) {
            var sesionExpirada = obtenersesionExpirada(localStorage.fch_ini);
            console.log('sesionExpirada', sesionExpirada);
            if (sesionExpirada == false) {
                login(usr, psw);
            } else {
                eliminaLocalStorage();
            }
        }
    } catch (e) {
        storage = {};
    }
}

function eliminaLocalStorage() {
    localStorage.clear();
}
eliminaLocalStorage();


function ingresa(usuarioId, elPerfil) {
    console.log('usuarioId', usuarioId);
    console.log('elPerfil', elPerfil);

    if (usuarioId != null) {

        if (revisaConexion) {
            firebase.database().ref(laUrlBase + 'Usuarios').orderByChild('Id').equalTo(usuarioId).once('value').then(function(snapshot) {
                if (snapshot.val() != null) {
                    snapshot.forEach(function(childSnapshot) {
                        elNombre = snapshot.child(childSnapshot.key).child('Nombre').val();
                        elApellidoPat = snapshot.child(childSnapshot.key).child('Apellido_Paterno').val();
                        elApellidoMat = snapshot.child(childSnapshot.key).child('Apellido_Materno').val();
                        usuarioIdRes = snapshot.child(childSnapshot.key).child('Id').val();
                        _elPerfilNombre = elNombre + ' ' + elApellidoPat + ' ' + elApellidoMat;
                        elPerfil = snapshot.child(childSnapshot.key).child('Perfil').val();
                        firebase.database().ref(laUrlBase + 'Usuarios/' + usuarioId).update({
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
        // ingresaOK();
    }

    function ingresaOK() {

        $('.perfil').css({
            'display': 'flex'
        });
        $('.navbar').css({
            'opacity': '1'
        });
        $('.panel-header').css({
            'width': '100%'
        });
        $('.page-header-image, #divLogin, #logo_ext').hide();

        habilitaBoton($('#botonEntrar'), false);
        $('#botonCerrar').show();
        $("#inputUsuario").val('');
        $("#inputPassword").val('');
        $('.mensaje_nombre_perfil').text('');
        $('.mensaje_error_login').text('');
        $('.contenido').show();
        $('.nombre_perfil').text(_elPerfilNombre);

        $("#boton_inicio, #boton_recursos, #boton_usuarios, #boton_lecciones, #boton_sesiones, #boton_resultados, #boton_admin, #boton_ayuda").parent().removeClass('deshabilitado');
        $("#boton_admin, #boton_ayuda").parent().addClass('deshabilitado');
        $('#boton_recursos, #boton_lecciones, #boton_sesiones, #boton_usuarios, #boton_resultados, #boton_admin, #boton_ayuda').show();
        $('.main-panel').removeClass('main-panel_100');
        $('.panel-header, .sidebar, .navbar-toggler').show();
        // $('.panel-header-participante').hide();

        cargador('oculta');
        navega();

        // botones por perfil
        if (elPerfil === "Administrador") {
            $('#boton_resultados').hide();
        } else if (elPerfil === "Instructor") {
            $('#boton_resultados, #boton_recursos, #boton_lecciones, #boton_usuarios, #boton_admin').hide();
        } else if (elPerfil === "Participante") {
            $('#boton_recursos, #boton_lecciones, #boton_sesiones, #boton_usuarios, #boton_admin').hide();
        }


    }
}


function cierraSesion() {
    console.log('cerrando sesion');

    var onComplete = function(error) {
        if (error) {
            console.log('Ocurrió un error en la sincronización.');
        } else {
            firebase.auth().signOut().then(function() {

                $('.contenido').hide();
                $('.main-panel').addClass('main-panel_100');
                $('.panel-header, .sidebar, .navbar-toggler').hide();
                $('#panel_participante, #panel_instructor').hide();
                $('.navbar').css({
                    'opacity': '0'
                });
                $('.perfil').css({
                    'display': 'none'
                });
                $('.panel-header').css({
                    // 'width': '100%'
                });
                $('.page-header-image, #divLogin, #logo_ext').show();

                $('#botonCerrar').hide();
                $('.nombre_perfil').text('');
                $("#inputUsuario").val('');
                $("#inputPassword").val('');
                habilitaBoton($('#botonEntrar'), true);
                eliminaLocalStorage();

            }, function(error) {
                $.notify("BOOM! Ocurrió algún error inesperado", "error");
            });
            usuarioId = '';
            console.log('Sincronización realizada.');
        }
    };
    if (revisaConexion) {
        firebase.database().ref(laUrlBase + 'Usuarios/' + usuarioKey).update({
            "Activo": false
        }, onComplete);
    }

}



// function activaSecInicio() {
//     activaInicio();
// }
// function activaSecRecursos() {
//     activaRecursos();
// }
// function activaSecUsuarios() {
//    activaUsuarios();
// }
// function activaSecLecciones() {
//     activaLecciones();
// }
// function activaSecAdmin() {
//     activaAdmin();
// }
// function activaSecAyuda() {
//     activaAyuda();
// }





/////////////////////////////// navegación /////////////////////////////////////

function navega(cualSeccion, callBack) {
    console.log(cualSeccion);
    cargador('muestra');

    if (cualSeccion == '' || cualSeccion == null || cualSeccion == undefined) {
        if (localStorage.scc) {
            cualSeccion = localStorage.scc;
        } else {
            cualSeccion = 'inicio';
        }
    }

    $("#content").empty();
    $("#content").load('inc/' + cualSeccion + '.html', function() {
        // console.log('cualSeccion', cualSeccion, 'cargada.');
        $("#boton_inicio, #boton_recursos, #boton_usuarios, #boton_lecciones, #boton_sesiones, #boton_resultados, #boton_admin, #boton_ayuda").parent().removeClass('active').addClass('inactive');
        $("#boton_" + cualSeccion).parent().removeClass('inactive').addClass('active');

        //TODO
        if (elPerfil === "Participante") {}

        if (cualSeccion != 'sesion_participante' && cualSeccion != 'sesion_instructor') {
            localStorage.scc = cualSeccion;
        }

        if (callBack) {
            callBack();
        }
    });


    // $("#boton_inicio, #boton_recursos, #boton_usuarios, #boton_lecciones, #boton_sesiones, #boton_admin, #boton_ayuda").show();

}



function detectaUnloadContenido() {
    $(window).on("unload", function() {
        console.log('unload body');
        cierraSesion();
    });
};




function cargador(evento) {
    var duracion = 300;
    switch (evento) {
        case 'muestra':
            $("#cargando").show();
            $("#cargando").animate({
                'opacity': '1'
            }, duracion, function() {
                // cargador('oculta');
            });
            break;
        case 'oculta':
            $("#cargando").animate({
                'opacity': '0'
            }, duracion, function() {
                $('#cargando').css({
                    'display': 'none'
                });
            });
            break;
    }
}



$(window).resize(function() {
    if (elContenidoLanzado == true) {
        ajustaEscalaContenido();
    }
    $('.cargando_spinner').css({
        position: 'absolute',
        left: ($(window).width() - $('.className').outerWidth()) / 2,
        top: ($(window).height() - $('.className').outerHeight()) / 2
    });

});


function loginUser() {
    var user = $("#inputUsuario").val();
    var password = $("#inputPassword").val();

    var listError = "";

    if (user.length === 0) {
        listError += "<li><strong>Usuario</strong> está vacío.</li>";
    }

    if (password.length === 0) {
        listError += "<li><strong>Contraseña</strong> está vacío.</li>";
    }
    if (listError.length > 0) {
        var mensajeError = "<strong>Campos con problemas: </strong><ul>" + listError + "</ul>";
        $("#errorLogin").html(mensajeError).removeClass('ocultar');
    } else {
        var userLogin = {
            Correo: user,
            Contrasena: password
        };
        login(userLogin.Correo, userLogin.Contrasena);
        $("._login").val('');
        $("#errorLogin").html("").addClass('ocultar');
    }
}

function LoadSelectOptions() {
    $.getJSON("data/paises.json", function(result) {
        var options = "";
        $.each(result, function(i, paises) {
            if (paises.pais === "México") {
                options += "<option value='" + paises.pais + "' selected>" + paises.pais + "</option>";
            } else {
                options += "<option value='" + paises.pais + "'>" + paises.pais + "</option>";
            }

        });
        $("#usuNvoPais").html(options);
        $("#_usuNvoPais").html(options);
        $("#e_usuNvoPais").html(options);
    });

    $('.date-picker').each(function() {
        $(this).datepicker({
            templates: {
                leftArrow: '<i class="now-ui-icons arrows-1_minimal-left"></i>',
                rightArrow: '<i class="now-ui-icons arrows-1_minimal-right"></i>'
            }
        }).on('show', function() {
            $('.datepicker').addClass('open');

            datepicker_color = $(this).data('datepicker-color');
            if (datepicker_color.length != 0) {
                $('.datepicker').addClass('datepicker-' + datepicker_color + '');
            }
        }).on('hide', function() {
            $('.datepicker').removeClass('open');
        });
    });
}


function isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode;
    if (charCode != 46 && charCode > 31 &&
        (charCode < 48 || charCode > 57))
        return false;

    return true;
}


function isInputNumber(evt) {
    var ch = String.fromCharCode(evt.which);
    if (!(/[0-9]/.test(ch))) {
        evt.preventDefault();
    }
}

function ajustaValorInput(cualBoton) {
    // console.log('ajustaValorInput', cualBoton);

    var elValorCont = parseInt($('#' + cualBoton).parent().find($('input')).val());
    var elMin = $('#' + cualBoton).parent().find($('input')).attr('minimo');
    var elMax = $('#' + cualBoton).parent().find($('input')).attr('maximo');
    // console.log('elMin', elMin, 'elMax', elMax);

    if (isNaN(elValorCont)) {
        if (!isNaN(elMin)) {
            elValorCont = elMin;
        } else {
            elValorCont = 0;
        }
    }

    if ($('#' + cualBoton).hasClass('menos')) {
        if (elMin != undefined) {
            if (elValorCont > elMin) {
                elValorCont--;
            }
        } else {
            elValorCont--;
        }
    }

    if ($('#' + cualBoton).hasClass('mas')) {
        if (elMax != undefined) {
            if (elValorCont < elMax) {
                elValorCont++;
            }
        } else {
            elValorCont++;
        }
    }
    // console.log('elValorCont', elValorCont);
    if (!$('#' + cualBoton).parent().find($('input')).attr('disabled')) {
        $('#' + cualBoton).parent().find($('input')).val(elValorCont).trigger("change");
    }

}



$(document).ready(function() {
    /** Iniciando */


    // conectaBase();

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
    };




    laFechaFormateada = obtenerFechaFormateada();

    $('.main-panel').addClass('main-panel_100').show();
    $('.contenido').hide();
    $('#botonCerrar').hide();
    $("#inputUsuario").val('');
    $("#inputPassword").val('');


    /** Cargando select de países*/
    // setInterval(function() {
    LoadSelectOptions();
    // }, 2000);

    /** Login de usuarios*/
    // Oculto campo de error
    $("#errorLogin").addClass('ocultar');

    //Luego de haberse mostrado un error en el login, al cambiar texto o dar clic se ocultará el campo de error en el login
    $("#inputUsuario,#inputPassword").click(function() {
        $("#errorLogin").addClass('ocultar');
    });
    $("#inputUsuario,#inputPassword").change(function() {
        $("#errorLogin").addClass('ocultar');
    });
    $("#_registro").click(function() {
        $("#errorRegistro,#_errorRegistro").html("").addClass('ocultar');
    });
    $("#_registro").change(function() {
        $("#errorRegistro,#_errorRegistro,#e_errorRegistro").html("").addClass('ocultar');
    });
    //Procesando elevento DE LOGIN AL SISTEMA.
    $("#botonEntrar").click(function(event) {
        loginUser();
    });
    $('#inputUsuario, #inputPassword').keypress(function(event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            loginUser();
        }
        event.stopPropagation();
    });
    /*** End Login de usuarios */

    /** Registro de usuarios */
    $("._registro").click(function() {
        $("#errorRegistro").html("").addClass('ocultar');
    });
    $("._registro").change(function() {
        $("#errorRegistro").html("").addClass('ocultar');
    });
    /** End Registro de usuarios */
    $("#botonRegistrar").click(function(event) {
        event.preventDefault();

        $('.perfil').css({
            'display': 'flex'
        });
        $('.navbar').css({
            'opacity': '1'
        });
        $('.panel-header').css({
            'width': '100%'
        });
        $('.page-header-image, #divLogin, #logo_ext').hide();

        habilitaBoton($('#botonEntrar'), false);
        $('#botonCerrar').show();
        $("#inputUsuario").val('');
        $("#inputPassword").val('');
        $('.mensaje_nombre_perfil').text('');
        $('.mensaje_error_login').text('');
        $('.contenido').show();
        $('.nombre_perfil').text(_elPerfilNombre);

        $("#boton_inicio, #boton_recursos, #boton_usuarios, #boton_lecciones, #boton_sesiones, #boton_resultados, #boton_admin, #boton_ayuda").parent().addClass('deshabilitado');
        $('.main-panel').removeClass('main-panel_100');
        $('.panel-header, .sidebar, .navbar-toggler').show();
        $('.perfil, #botonCerrar').hide();

        cargador('oculta');
        navega('registro');

    });

    $('#botonCerrar').click(function(event) {
        event.preventDefault();

        $('#modalCerrarSesion').modal({
            closable: false,
            // duration: 300,
            transition: 'scale'
        }).modal('show');

        $(document).off('click', '#botonCancelarCerrarSesion').on('click', '#botonCancelarCerrarSesion', function(e) {
            // dialog.close();
        });
        $(document).off('click', '#botonAceptarCerrarSesion').on('click', '#botonAceptarCerrarSesion', function(e) {
            cierraSesion();
            // dialog.close();
        });

    });


    $('#botonCerrarContenido').click(function(event) {
        event.preventDefault();

        $('#modalCerrarContenido').modal({
            closable: false,
            duration: 200,
            transition: 'scale'
        }).modal('show');

        $("#content").css({
            'margin-top': '100%'
        });

        $(document).off('click', '#botonCancelarCerrarContenido').on('click', '#botonCancelarCerrarContenido', function(e) {
            $("#content").css({
                'margin-top': '0%'
            });
        });
        $(document).off('click', '#botonAceptarCerrarContenido').on('click', '#botonAceptarCerrarContenido', function(e) {
            $("#content").css({
                'margin-top': '0%'
            });
            if (elPerfil === "Instructor") {
                cierraContenidoInst();
            } else {
                cierraContenido();
            }
            // dialog.close();
        });

    });


    $("#boton_inicio, #boton_recursos, #boton_usuarios, #boton_lecciones, #boton_sesiones, #boton_resultados").click(function(event) {
        if ($(this).css('cursor') == 'pointer') {
            var cualSeccion = $(this).attr('id').substr(6, $(this).attr('id').length);
            event.preventDefault();

            navega(cualSeccion);
        };
    });


    $(document).on('mouseover mousedown press mouseup', '.botonInputMenos, .botonInputMas', function() {
        $(this).parent().find($('input')).focus();
    });
    $(document).on('mouseleave', '.botonInputMenos, .botonInputMas', function() {
        $(this).parent().find($('input')).blur();
    });
    $(document).on('click', '.botonInputMenos, .botonInputMas', function() {
        ajustaValorInput($(this).attr('id'));
    });



    detectaUnloadContenido();

    $('#panel_participante, #panel_instructor').hide();

    leeLocalStorage();

    ran = generarId();
    location.hash = "?" + ran;

});