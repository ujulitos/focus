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
var laUrlBase = "creclms/";

firebase.initializeApp(config);

var baseOk;
var elCurso = '';
var usuarioId;
var elPerfilDisplay;
var elPerfil;
var elPerfilNombre;
var elUsuarioNivel;
var cuantosRecursos;
var cuantosRecursosVisibles;
var cuantosRecursosDisponibles;
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
var laSesionActual;
var minutosMaxSession = 30;
var that;
var those;


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
    // console.log(idNuevo);

    return idNuevo;
};


var email = 'demo@demo.com';
var password = 'demo@demo.com';

function login(cualUsuario, cualPassword) {
    // console.log(cualUsuario, ' y ', cualPassword);

    var elPassword = md5(cualPassword);
    // console.log('elPassword', elPassword);

    $('#botonEntrar').addClass('disabled');
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

                elPerfilDisplay = user.displayName;
                console.log("elPerfilDisplay", elPerfilDisplay);

                if (elPerfilDisplay === "SuperAdmin" || elPerfilDisplay === "Administrador" || elPerfilDisplay === "Usuario") {

                    var valBuscar1 = 'Id';
                    var valBuscar2 = cualUsuario;

                    firebase.database().ref(laUrlBase + 'Usuarios').orderByChild(valBuscar1).equalTo(valBuscar2).once('value').then(function(snapshot) {

                        if (snapshot.val() != null) {
                            // console.log('snapshot.val()', snapshot.val());

                            snapshot.forEach(function(childSnapshot) {
                                usuarioKey = childSnapshot.key;
                                // console.log('usuarioKey', usuarioKey);
                                usuarioContrasena = snapshot.child(childSnapshot.key).child('Contrasena').val();
                                // console.log('usuarioContrasena', usuarioContrasena);
                                usuarioId = snapshot.child(childSnapshot.key).child('Id').val();
                                // console.log('usuarioId', usuarioId);
                            });
                            if (elPassword === usuarioContrasena) {
                                registraLocalStorage(cualUsuario, cualPassword);
                                ingresa(usuarioId);
                            } else {
                                console.log('mensaje_error_login');
                                $('.mensaje_error_login').text(mensajeErrorLogin);
                                $('#botonEntrar').removeClass('disabled');
                            }
                        } else {
                            console.log('mensaje_error_login');
                            $('.mensaje_error_login').text(mensajeErrorLogin);
                            $('#botonEntrar').removeClass('disabled');
                        }
                    });
                }

            }
        },
        function(error) {
            $('.mensaje_error_login').text(mensajeErrorLogin);
            $('#botonEntrar').removeClass('disabled');
        });
}



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
    // $("#inputUsuario, #inputPassword").attr("disabled", "disabled");
    try {
        usr = localStorage.usr;
        psw = localStorage.psw;
        if (usr != null && psw != null) {
            var sesionExpirada = obtenersesionExpirada(localStorage.fch_ini);
            console.log('sesionExpirada', sesionExpirada);
            if (sesionExpirada == false) {
                login(usr, psw);
            } else {
                login($("#inputUsuario").val(), $("#inputPassword").val());
                $("#inputUsuario, #inputPassword").removeAttr("disabled");
                eliminaLocalStorage();
            }
        } else {
            $("#inputUsuario, #inputPassword").removeAttr("disabled");
        }
    } catch (e) {
        storage = {};
    }
}

function eliminaLocalStorage() {
    localStorage.clear();
}



function ingresa(usuarioId) {
    console.log('usuarioId', usuarioId);

    if (usuarioId != null) {

        if (revisaConexion) {
            firebase.database().ref(laUrlBase + 'Usuarios').orderByChild('Id').equalTo(usuarioId).once('value').then(function(snapshot) {
                if (snapshot.val() != null) {
                    snapshot.forEach(function(childSnapshot) {
                        var elNombreRes = snapshot.child(childSnapshot.key).child('Nombre').val();
                        var elApellidoPatRes = snapshot.child(childSnapshot.key).child('Apellido_Paterno').val();
                        var elApellidoMatRes = snapshot.child(childSnapshot.key).child('Apellido_Materno').val();
                        elUsuarioNivel = snapshot.child(childSnapshot.key).child('Nivel').val();
                        console.log('elUsuarioNivel', elUsuarioNivel)
                        elPerfil = snapshot.child(childSnapshot.key).child('Perfil').val();
                        console.log('elPerfil', elPerfil)
                        var usuarioIdRes = snapshot.child(childSnapshot.key).child('Id').val();
                        elPerfilNombre = elNombreRes + ' ' + elApellidoPatRes + ' ' + elApellidoMatRes;

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

        $('.main-panel').removeClass('main-panel_100');

        $('.panel-header, .sidebar, .navbar-toggler').show();
        $('.perfil').css({
            'display': 'flex'
        });
        $('.navbar').css({
            'opacity': '1'
        });
        $('.panel-header').css({
            'width': '100%'
        });
        $('.page-header-image, #divLogin').hide();

        habilitaBoton($('#botonEntrar'), false);
        $('#botonPerfil').show();
        $("#inputUsuario").val('');
        $("#inputPassword").val('');
        $('.mensaje_nombre_perfil').text('');
        $('.mensaje_error_login').text('');
        $('.contenido').show();
        $('.nombre_perfil').text(elPerfilNombre);


        navega('inicio');
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
                $('.navbar').css({
                    'opacity': '0'
                });
                $('.perfil').css({
                    'display': 'none'
                });
                $('.panel-header').css({
                    // 'width': '100%'
                });
                $('.page-header-image, #divLogin').show();

                habilitaBoton($('#botonEntrar'), true);
                $("#inputUsuario, #inputPassword").removeAttr("disabled");
                eliminaLocalStorage();
                $('#botonPerfil').hide();
                $('.nombre_perfil').text('');

            }, function(error) {

            });
            usuarioId = '';
            console.log('Sincronización realizada.');
        }
    };

    firebase.database().ref(laUrlBase + 'Usuarios/' + usuarioKey).update({
        "Activo": false
    }, onComplete);

}









function pintaInicio() {

    // function pintaChart(cualChart, valor, duracion, colorBarra) {
    //     $('#chart' + cualChart).easyPieChart({
    //         size: 150,
    //         animate: duracion,
    //         lineWidth: 20,
    //         barColor: colorBarra,
    //         trackColor: '#e7e7e7 ',
    //         lineCap: 'butt',
    //         onStep: function (from, to, currentValue) {
    //             $('#porciento' + cualChart).text(~~currentValue + '%');
    //         }
    //     });

    //     if ($('.inicio_int').length != 0) {
    //         $('#chart' + cualChart).data('easyPieChart').update(valor);
    //     }
    // };



    // pintaChart(1, 85, 2000, '#ff5722');
    // setTimeout(function () {
    //     pintaChart(1, 38, 3000);
    // }, 5000);

    // pintaChart(2, 41, 2000, '#8bc34a');
    // setTimeout(function () {
    //     pintaChart(2, 76, 2000);
    // }, 6000);

    // pintaChart(3, 27, 2000, '#ff9800');
    // setTimeout(function () {
    //     pintaChart(3, 98, 1500);
    // }, 5500);

    // pintaChart(4, 79, 2000, '#2196f3');
    // setTimeout(function () {
    //     pintaChart(4, 12, 3000);
    // }, 6500);


    $('#subtituloSeccion').html('');
    $('#subseccion').html('');
}






function cuentaRecursos() {
    console.log('cuentaRecursos');
    cuantosRecursosDisponibles = 0;

    if (revisaConexion) {
        firebase.database().ref(laUrlBase + 'Recursos').once('value').then(function(snapshot) {
            if (snapshot.val() != null) {
                var contadorRecursos = 0;
                var contadorRecursosVisbles = 0;
                cuantosRecursos = snapshot.numChildren();
                console.log('cuantosRecursos', cuantosRecursos);

                snapshot.forEach(function(childSnapshot) {
                    contadorRecursos++;

                    this['CursoId' + contadorRecursos] = snapshot.child(childSnapshot.key).child('Id').val();
                    // console.log('CursoId' + contadorRecursos + ': ', this['CursoId' + contadorRecursos]);
                    this['cursoNombre' + contadorRecursos] = snapshot.child(childSnapshot.key).child('Nombre').val();
                    // console.log('cursoNombre ' + contadorRecursos + ': ', this['cursoNombre' + contadorRecursos]);
                    this['cursoVisible' + contadorRecursos] = snapshot.child(childSnapshot.key).child('Visible').val();
                    // console.log('cursoVisible ' + contadorRecursos + ': ', this['cursoVisible' + contadorRecursos]);
                    this['cursoNivel' + contadorRecursos] = snapshot.child(childSnapshot.key).child('Nivel').val();
                    // console.log('cursoNivel', this['cursoNivel' + contadorRecursos]);
                    if (this['cursoVisible' + contadorRecursos] == true) {
                        if (this['cursoNivel' + contadorRecursos] <= elUsuarioNivel) {
                            contadorRecursosVisbles++;
                        }
                    }

                    this['cursoCategoria' + contadorRecursos] = snapshot.child(childSnapshot.key).child('Categoria').val();
                    // console.log('cursoCategoria ' + contadorRecursos + ': ', this['cursoCategoria' + contadorRecursos]);
                    this['cursoDesc' + contadorRecursos] = snapshot.child(childSnapshot.key).child('Descripcion').val();
                    // console.log('Descripcion del Curso: ', this['cursoDesc' + contadorRecursos]);
                    this['cursoDurac' + contadorRecursos] = snapshot.child(childSnapshot.key).child('Duracion').val();
                    // console.log('Duración del Curso: ', this['cursoDurac' + contadorRecursos]);
                    this['cursoObj' + contadorRecursos] = snapshot.child(childSnapshot.key).child('Objetivos').val();
                    // console.log('Objetivos del Curso: ', this['cursoObj' + contadorRecursos]);
                    // this['cursoTemario' + contadorRecursos] = snapshot.child(childSnapshot.key).child('Temario').val();
                    // console.log('Temario del Curso: ', this['cursoTemario' + contadorRecursos]);
                    this['cursoLiga' + contadorRecursos] = snapshot.child(childSnapshot.key).child('Liga').val();
                    // console.log('Liga del Curso: ', this['cursoLiga' + contadorRecursos]);
                    this['cursoPortada' + contadorRecursos] = snapshot.child(childSnapshot.key).child('Portada').val();
                    // console.log('Portada del Curso: ', this['cursoPortada' + contadorRecursos]);
                    that = this;

                    cuantosRecursos = contadorRecursos;
                    cuantosRecursosVisibles = contadorRecursosVisbles;

                });


                firebase.database().ref(laUrlBase + 'Usuarios').orderByChild('Id').equalTo(usuarioId).once('value').then(function(snapshot) {
                    if (snapshot.val() != null) {
                        var contadorRecursosDisponibles = 0;

                        snapshot.forEach(function(childSnapshot) {
                            childSnapshot.forEach(function(childSnapshot2) {
                                var laClase = childSnapshot2.child('Clase').val();
                                // console.log('laClase', laClase);

                                childSnapshot2.forEach(function(childSnapshot3) {
                                    console.log('childSnapshot3', childSnapshot3.key);

                                    if (childSnapshot3.key != "Clase") {
                                        contadorRecursosDisponibles++;
                                        this['elCursoId' + contadorRecursosDisponibles] = childSnapshot3.child('Id').val();
                                        console.log('elCursoId', this['elCursoId' + contadorRecursosDisponibles]);
                                        var laFecha_abrePrev = childSnapshot3.child('Fecha_abre').val();
                                        console.log('laFecha_abrePrev', laFecha_abrePrev);
                                        var laFecha_cierraPrev = childSnapshot3.child('Fecha_cierra').val();
                                        console.log('laFecha_cierraPrev', laFecha_cierraPrev);

                                        moment.locale('es');
                                        laFecha_abre = moment(laFecha_abrePrev, ["DD/MM/YYYY", "YYYY-MM-DD"]).format();
                                        // console.log('laFecha_abre', laFecha_abre);
                                        laFecha_cierra = moment(laFecha_cierraPrev, ["DD/MM/YYYY", "YYYY-MM-DD"]).add(1, 'd').format();
                                        console.log('laFecha_cierra', laFecha_cierra);
                                        var elHoy = moment().format();
                                        console.log('elHoy', elHoy);
                                        console.log('elHoy formateado', moment().format("DD/MM/YYYY"));

                                        this['elCursoVisible' + contadorRecursosDisponibles] = 0;
                                        if (elHoy >= laFecha_abre) {
                                            // console.log('hoy es mas que laFecha_abre');
                                            if (elHoy <= laFecha_cierra) {
                                                // console.log('hoy es mas que laFecha_cierra');
                                                this['elCursoVisible' + contadorRecursosDisponibles] = this['elCursoId' + contadorRecursosDisponibles];
                                                cuantosRecursosDisponibles++;
                                                cuantosRecursosDisponibles = contadorRecursosDisponibles;

                                                console.log('Estamos dentro con el elCursoId', this['elCursoVisible' + contadorRecursosDisponibles]);
                                            } else {
                                                // console.log('hoy es menos que laFecha_cierra');
                                            }
                                        } else {
                                            // console.log('hoy es menos que laFecha_abre');
                                        }
                                        // console.log('childSnapshot3.key', childSnapshot3.key);
                                        if (childSnapshot3.key === "val") {
                                            cuantosRecursosDisponibles = -1;
                                            // console.log('cuantosRecursosDisponibles', cuantosRecursosDisponibles);
                                        }


                                        those = this;
                                    }
                                });
                            });

                        });


                        return pintaCategorias().then(function() {
                            pintaCursos().then(function() {
                                pintaCursosDisponibles().then(function() {
                                    activaBotonesCategorias().then(function() {
                                        activaLanzarCursos();
                                    });
                                });
                            });
                        });


                    }
                });
            }
        });
    }
}



function leeEstatusCurso(estatusNo) {
    if (revisaConexion) {

        var elRefRevisado = laUrlBase + 'Lecciones/' + usuarioId + '/objeto_' + that['CursoId' + estatusNo];
        // console.log('elRefRevisado', elRefRevisado);
        // var contador = 0;

        firebase.database().ref(elRefRevisado).once('value').then(function(snapshot) {
            if (snapshot.val() != null) {

                var cursoRevisado = snapshot.child('Revisado').val();
                // console.log('Curso Revisado: ', cursoRevisado);

                if (cursoRevisado == true) {
                    $('#estatus_curso' + estatusNo + ' > i').addClass('nc-icon-outline arrows-1_minimal-down');
                }
            }
        });

        // SCORM //
        elRefSCORM = laUrlBase + 'Lecciones/' + usuarioId + '/objeto_' + that['CursoId' + estatusNo] + '/SCORM_12';
        // console.log('elRefSCORM', elRefSCORM);

        firebase.database().ref(elRefSCORM).once('value').then(function(snapshot) {
            // console.log('el snapshot.val() es', snapshot.val());

            if (snapshot.val() != null) {

                var f_lesson_status = snapshot.child('cmi_core_lesson_status').val();
                // console.log('lesson_status: ', f_lesson_status);

                var score = snapshot.child('cmi_core_score_raw').val();
                // console.log('score: ', score);

                var f_lesson_location = snapshot.child('cmi_core_lesson_location').val();
                // console.log('f_lesson_location: ', f_lesson_location);

                var f_suspend_data = snapshot.child('cmi_suspend_data').val();
                // console.log('f_suspend_data: ', f_suspend_data);

                if (f_lesson_status == 'not attempted') {
                    $('#estatus_curso_scorm' + estatusNo + ' > i').removeClass('nc-icon-glyph');
                    $('#estatus_curso_scorm' + estatusNo + ' > i').removeClass('nc-icon-outline');
                    $('#estatus_curso_scorm' + estatusNo + ' > i').addClass('nc-icon-outline weather_moon-full icon_gris');
                }
                if (f_lesson_status == 'incomplete') {
                    $('#estatus_curso_scorm' + estatusNo + ' > i').removeClass('nc-icon-glyph');
                    $('#estatus_curso_scorm' + estatusNo + ' > i').removeClass('nc-icon-outline');
                    $('#estatus_curso_scorm' + estatusNo + ' > i').addClass('nc-icon-glyph ui-2_time icon_amarillo');
                }
                if (f_lesson_status == 'completed') {
                    $('#estatus_curso_scorm' + estatusNo + ' > i').removeClass('nc-icon-glyph');
                    $('#estatus_curso_scorm' + estatusNo + ' > i').removeClass('nc-icon-outline');
                    // $('#estatus_curso_scorm' + estatusNo + ' > i').addClass('nc-icon-glyph weather_moon-full');
                    $('#estatus_curso_scorm' + estatusNo + ' > i').addClass('nc-icon-glyph ui-1_check-circle-08 icon_verde');
                }
                if (f_lesson_status == 'passed') {
                    $('#estatus_curso_scorm' + estatusNo + ' > i').removeClass('nc-icon-glyph');
                    $('#estatus_curso_scorm' + estatusNo + ' > i').removeClass('nc-icon-outline');
                    $('#estatus_curso_scorm' + estatusNo + ' > i').addClass('nc-icon-glyph ui-1_check-circle-08 icon_verde');
                }
                if (f_lesson_status == 'failed') {
                    $('#estatus_curso_scorm' + estatusNo + ' > i').removeClass('nc-icon-glyph');
                    $('#estatus_curso_scorm' + estatusNo + ' > i').removeClass('nc-icon-outline');
                    $('#estatus_curso_scorm' + estatusNo + ' > i').addClass('nc-icon-glyph ui-1_circle-remove icon_rojo');
                }

                $('#calif_curso_scorm' + estatusNo).html(score);
            }
        });

    }
}


function pintaCategorias() {

    var contenidoCategorias = '';
    $('#categorias').empty();

    var arrayCategoriasPrev = new Array();
    for (a = 1; a <= cuantosRecursosVisibles; a++) {
        arrayCategoriasPrev.push(that['cursoCategoria' + a]);
    }
    // console.log('arrayCategoriasPrev', arrayCategoriasPrev);

    function unique(arrayCategoriasPrev) {
        return $.grep(arrayCategoriasPrev, function(el, index) {
            return index == $.inArray(el, arrayCategoriasPrev);
        });
    }
    arrayCategorias = unique(arrayCategoriasPrev);
    // console.log('arrayCategorias', arrayCategorias);
    cuantasCategorias = arrayCategorias.length;
    console.log('cuantasCategorias', cuantasCategorias);

    // for (a = 1; a <= cuantasCategorias; a++) {
    //     contenidoCategorias += '<div class="categoria">';
    //     contenidoCategorias += arrayCategorias[(a - 1)];
    //     contenidoCategorias += '<div  id="botonCategoria' + a + '" class="btn btn-sm btn-toggle btn-categoria active" data-toggle="button">';
    //     contenidoCategorias += '<div class="handle"></div>';
    //     contenidoCategorias += '</div>';
    //     contenidoCategorias += '</div>';
    // }

    // $('#categorias').append(contenidoCategorias);

    return $.ajax();
}


function pintaCursos() {

    var contador = 0;
    var anchoColumnas = 6;
    // if (cuantosRecursosVisibles >= 3) {
    if (cuantosRecursos >= 3) {
        anchoColumnas = 6;
    }
    var contenidoSecCursos = '';
    $('.recursos_int').empty();


    for (a = 1; a <= cuantasCategorias; a++) {
        this['cuantosElemPorCategoria' + a] = 0;

        contenidoSecCursos += '<div id="grupoCategoria' + a + '" class="grupo_categoria">';
        contenidoSecCursos += '<p class="titulo_categoria">' + arrayCategorias[(a - 1)] + ' </p>';

        contenidoSecCursos += '<div class="row">';
        contenidoSecCursos += '<div class="col-md-10 ml-auto mr-auto">';
        contenidoSecCursos += '<div class="row">';

        for (b = 1; b <= cuantosRecursosVisibles; b++) {

            if (that['cursoCategoria' + b] == arrayCategorias[(a - 1)]) {
                this['cuantosElemPorCategoria' + a]++;

                // console.log('cursoNivel', b, ' ', that['cursoNivel' + b], ' y elUsuarioNivel', elUsuarioNivel);
                // if (that['cursoNivel' + b] <= elUsuarioNivel) {

                if (that['cursoNivel' + b] <= elUsuarioNivel) {

                    // contenidoSecCursos += '<div class="col-md-' + anchoColumnas + ' ml-auto mr-auto">';
                    contenidoSecCursos += '<div class="col-md-' + anchoColumnas + '">';
                    contenidoSecCursos += '<div id="tarjeta' + b + '" class="card card_con_sombra" style="display:none;">';
                    contenidoSecCursos += '<img class="card-img-top" src=/img/objeto_portada_min.jpg></img>';

                    contenidoSecCursos += '<div class="card-body">';
                    // contenidoSecCursos += '<h6 class="category text-danger">' + this['cursoCategoria' + b] + '</h6>';
                    
                    contenidoSecCursos += '<h5 id="curso_titulo' + b + '" class="curso_titulo card-title">' + this['cursoNombre' + b] + '</h5>';

                    contenidoSecCursos += '<div class="card-desc">';
                    contenidoSecCursos += '<p class="card-text" ><b>Descripción: </b><br>' + this['cursoDesc' + b] + '</p>';
                    contenidoSecCursos += '<p class="card-text" ><b>Duración: </b><br>' + this['cursoDurac' + b] + '</p>';
                    if (this['cursoObj' + b] != null) {
                        contenidoSecCursos += '<p class="card-text" ><b>Objetivos: </b><br>' + this['cursoObj' + b] + '</p>';
                    }
                    if (this['cursoTemario' + b] != null) {
                        contenidoSecCursos += '<p class="card-text" ><b>Temario: </b><br>' + this['cursoTemario' + b] + '</p>';
                    }
                    contenidoSecCursos += '</div>';

                    /* borde */
                    contenidoSecCursos += '<div class="mdl-card__actions mdl-card--border">';
                    // contenidoSecCursos += '<div id="estatus_curso' + b + '" class="icono_status" style="float:left; margin: 10px 20px;"><i class="now-ui-icons check-circle-07 icon_estatus"></i></div>';
                    contenidoSecCursos += '<div id="estatus_curso_scorm' + b + '" class="icono_status" style="float:left; margin: 10px 0px;"><i class="nc-icon-outline weather_moon-full icon_estatus_scorm"></i>';
                    contenidoSecCursos += '<div id="calif_curso_scorm' + b + '" class="estatus_texto"></div>';
                    contenidoSecCursos += '</div>';

                    contenidoSecCursos += '<div class="card-botones">';
                    contenidoSecCursos += '<div id="botonMasInfo' + b + '" class="btn btn-sm btn-round botonMasInfo">Más info <i class="nc-icon-outline arrows-1_minimal-down"></i></div>';
                    contenidoSecCursos += '<div id="botonEditar' + b + '" class="btn btn-sm btn-round botonEditar">Editar</div>';
                    contenidoSecCursos += '<div id="botonAsignar' + b + '" class="btn btn-sm btn-round botonAsignar">Asignar</div>';
                  
                    if (this['cursoVisible' + b]) {
                        contenidoSecCursos += '<div id="botonIniciarCurso' + b + '" class="btn btn-verde btn-round botonIniciarCurso">Ver</div>';
                    } else {
                        contenidoSecCursos += '<div id="botonIniciarCurso' + b + '" class="btn btn-verde btn-round botonIniciarCurso" disabled>Ver</div>';
                    }
                    contenidoSecCursos += '</div>';
                    /* borde */

                    contenidoSecCursos += '</div>';
                    contenidoSecCursos += '</div>';
                    contenidoSecCursos += '</div>';
                    contenidoSecCursos += '</div>';

                }
            }

        }

        contenidoSecCursos += '</div>';
        contenidoSecCursos += '</div>';
        contenidoSecCursos += '</div>';
        contenidoSecCursos += '</div>';

        console.log(arrayCategorias[(a - 1)], this['cuantosElemPorCategoria' + a]);

    }

    $('.recursos_int').append(contenidoSecCursos);
    // $('#subtituloSeccion').html('<a  >' + cuantosRecursosVisibles + '</a> recursos en total');


    //////////////// por asignación ////////////////      
    for (c = 1; c <= cuantosRecursosVisibles; c++) {
        contador++;
        // var Id_dx = parseInt(that['CursoId' + c].split('_')[1].split('dx')[0]);
        // console.log('Id_dx', Id_dx);
        // console.log('el Recurso Visible c', c, those['elCursoVisible' + c]);
        var Id_oc = parseInt(that['CursoId' + c].split('_')[1].split('oc')[0]);
        // console.log('Id_oc', c, Id_oc);

        for (d = 1; d <= cuantosRecursosDisponibles; d++) {
            // console.log('el Recurso Visible d', d, those['elCursoVisible' + d]);
            if (those['elCursoVisible' + d] == Id_oc) {

                // console.log('d', d, $('#tarjeta' + c));

                $('#tarjeta' + c).css({
                    'opacity': '0',
                    'display': 'flex'
                });
                $('#tarjeta' + c).animate({
                    opacity: 1
                });

                cambiaPortada(c);
            }
        }

        leeEstatusCurso(contador);
    }
    console.log('cuantosRecursosDisponibles', cuantosRecursosDisponibles);

    return $.ajax();

}

function pintaCursosDisponibles() {

    // si no hay nada, presenta todos
    console.log('cuantosRecursosDisponibles', cuantosRecursosDisponibles);
    if (cuantosRecursosDisponibles == -1) {
        for (dd = 1; dd <= cuantosRecursosVisibles; dd++) {
            // console.log('d', d, $('#tarjeta' + dd));
            $('#tarjeta' + dd).css({
                'opacity': '0',
                'display': 'flex'
            });
            $('#tarjeta' + dd).animate({
                opacity: 1
            });

            cambiaPortada(dd);
        }
    }

    return $.ajax();
}

function cambiaPortada(cualPortada) {
    // console.log('cambiaPortada', cualPortada);

    var noCache = generarId();
    var image = new Image();
    image.onload = function() {
        $('#tarjeta' + cualPortada + ' img').attr("src", image.src + '?' + noCache);
    }
    image.src = that['cursoPortada' + cualPortada];
}


function activaBotonesCategorias() {

    for (a = 1; a <= cuantasCategorias; a++) {
        $("#botonCategoria" + a).click(function(event) {
            event.preventDefault();
            var cualCategoria = $(this).attr('id').substr(14, 3);
            $('#grupoCategoria' + cualCategoria).slideToggle();
        });
    }

    return $.ajax();
}


function activaLanzarCursos() {

    for (a = 1; a <= cuantosRecursos; a++) {
        this['carta_abierta' + a] = false;
        var that = this;

        $("#botonMasInfo" + a).click(function(event) {
            event.preventDefault();
            var cualCard = $(this).attr('id').substr(12, 3);
            $('#tarjeta' + cualCard).find('.card-desc').slideToggle();
            if (that['carta_abierta' + cualCard] == false) {
                $(this).html('Menos info<i class="nc-icon-outline arrows-1_minimal-up"></i>');
                that['carta_abierta' + cualCard] = true;
            } else {
                $(this).html('Más info<i class="nc-icon-outline arrows-1_minimal-down"></i>');
                that['carta_abierta' + cualCard] = false;
            }
        });
    }

    for (a = 1; a <= cuantosRecursos; a++) {
        $("#botonIniciarCurso" + a).click(function(event) {
            event.preventDefault();
            elContenido = $(this).attr('id').substr(17, 3);
            // console.log('elContenido', elContenido);
            // window.open(that['cursoLiga' + elContenido]);
            lanzaContenido(elContenido);
        });
    }
}



function lanzaContenido(cualContenido) {
    console.log('cualContenido', elContenido);
    console.log('CursoId', that['CursoId' + elContenido]);

    var laLiga = that['cursoLiga' + elContenido];

    habilitaBoton($('#botonPerfil'), false);
    // $('#botonPerfil').css({
    //     'opacity': '0.2'
    // });
    if (elPerfil === "Usuario") {
        //TODO
        // $("#boton_usuarios, #boton_lecciones").hide();
    }

    $('.main-panel').addClass('main-panel_100');
    $('.panel-header, .sidebar, .navbar-toggler').hide();
    $('.panel-header').css({
        'width': '100%'
    });
    $('.navbar').css({
        'height': '60px'
    });
    $('#barra_player').show();
    $('.barra_player_texto').text(that['cursoNombre' + elContenido]);
    $("#content").empty();

    elContenidoLanzado = true;
    // uJL API //
    registraIniciado();

    setTimeout(function() {

        $("#content").html('<iframe name="curso" id="curso" src="' + laLiga + '" frameborder="0" scrolling="no" border="0" style="display: block; height: 100vh; width: 100vw; width:100%; height:100%;"></iframe>');

        ajustaEscalaContenido();
        detectaUnload();

    }, 700);

}



function cierraContenido() {

    registraRevisado();
    elContenidoLanzado = false;

    habilitaBoton($('#botonPerfil'), true);
    // $('#botonPerfil').css({
    //     'opacity': '1'
    // });
    $("#content").empty();
    $('#barra_player').hide();
    $('.main-panel').removeClass('main-panel_100');
    $('.panel-header, .sidebar, .navbar-toggler').show();
    $('.panel-header').css({
        'width': '100%'
    });
    $('.navbar').css({
        'height': '114px'
    });
    ajustaEscalaContenido();

    navega('recursos');
}



function detectaUnload() {
    if (elContenidoLanzado == true) {
        $("#content").bind('DOMNodeRemoved', function(event) {
            console.log('unload!');

            registraRevisado();
            elContenidoLanzado = false;
            habilitaBoton($('#botonPerfil'), true);
            // $('#botonPerfil').css({
            //     'opacity': '1'
            // });
            $('#barra_player').hide();
            $('.panel-header').show();
            $('.navbar').css({
                'height': '114px'
            });
            ajustaEscalaContenido();
            $("#content").unbind();
        });
    }
}


function ajustaEscalaContenido() {

    elAlto = $(window).height();
    elAncho = $(window).width();

    if (elContenidoLanzado == true) {
        $("#content").css({
            'height': (elAlto - 92) + 'px'
            // 'width': elAncho + 'px'
        });
        $("#contenido").css({
            'padding': '0px',
            'margin-top': '92px'
        });
    } else {
        $("#content").css({
            'height': '0px'
            // 'width': elAncho + 'px'
        });
        $("#contenido").css({
            'padding': '30px',
            'margin-top': '0px'
        });
    }

}




function activaSecInicio() {
    pintaInicio();
    // componentHandler.upgradeAllRegistered();  
}


function activaSecRecursos() {
    cuentaRecursos();
    // componentHandler.upgradeAllRegistered();
}


/////////////////////////////////////////////////////////////////////////////////////////////
//////////*************************  uJL API  **************************************/////////
/////////////////////////////////////////////////////////////////////////////////////////////

function registraIniciado() {

    // inicializaAPI();

    var onComplete = function(error) {
        if (error) {
            console.log('Ocurrió un error en la sincronización.');
        } else {
            console.log('Sincronización realizada.');
            // SCORM API //
            // inicializaAPI();
        }
    };

    nuevoData = {};

    if (revisaConexion) {


        // para duplicar los registros por DX y OC
        // console.log('111111111111111', that['CursoId' + elContenido].split('co_')[1]);
        // console.log('111111111111111', that['CursoId' + elContenido].split('sco_')[1].split('o')[1]);

        var elRefIniciadoDX;
        var elRefIniciado2;
        var elCursoPre;
        var elSufijoDX = 'dx';
        var elSufijoOC = 'oc';


        if (that['CursoId' + elContenido].split('d')[1] == 'x') {
            elCursoPre = that['CursoId' + elContenido].split('d')[0];
            console.log('elSufijo', elSufijoDX);

            /////////////////////////
            elRefIniciadoDX = laUrlBase + 'Lecciones/' + usuarioId + elCurso + '/objeto_' + elCursoPre + elSufijoDX;
            console.log('elRefIniciadoDX: ', elRefIniciadoDX);

            elRefIniciadoOC = laUrlBase + 'Lecciones/' + usuarioId + elCurso + '/objeto_' + elCursoPre + elSufijoOC;
            console.log('elRefIniciadoOC: ', elRefIniciadoOC);

            /////////////////////////
            firebase.database().ref(elRefIniciadoDX).once('value').then(function(snapshot) {
                console.log('snapshot.val()', snapshot.val());

                if (snapshot.val() == null) {
                    var nuevoData = {
                        'Activo': false,
                        'Calificacion': 0,
                        'Revisado': false,
                        'Duracion': "",
                        'Fecha_fin': "",
                        'Fecha_inicio': laFechaInicial,
                        'Marcador': 0
                    }
                    var updates = {};
                    updates[elRefIniciadoDX] = nuevoData;
                    firebase.database().ref().update(updates, onComplete);
                }
            });
            /////////////////////////

            /////////////////////////
            firebase.database().ref(elRefIniciadoOC).once('value').then(function(snapshot) {
                console.log('snapshot.val()', snapshot.val());

                if (snapshot.val() == null) {
                    var nuevoData = {
                        'Activo': false,
                        'Calificacion': 0,
                        'Revisado': false,
                        'Duracion': "",
                        'Fecha_fin': "",
                        'Fecha_inicio': laFechaInicial,
                        'Marcador': 0,
                        'SCORM_12': {
                            'cmi_core_lesson_status': "Sin registro",
                            'cmi_core_score_raw': "Sin registro"
                        }
                    }
                    var updates = {};
                    updates[elRefIniciadoOC] = nuevoData;
                    firebase.database().ref().update(updates, onComplete);
                }
            });
            /////////////////////////

        }
        if (that['CursoId' + elContenido].split('sco_')[1].split('o')[1] == 'c') {
            // if (that['CursoId' + elContenido].split('co_')[1].split('oc')[0] == '') {
            elCursoPre = 'sco_' + that['CursoId' + elContenido].split('co_')[1].split('oc')[0];
            console.log('elSufijo', elSufijoOC);

            /////////////////////////
            elRefIniciadoDX = laUrlBase + 'Lecciones/' + usuarioId + elCurso + '/objeto_' + elCursoPre + elSufijoDX;
            console.log('elRefIniciadoDX: ', elRefIniciadoDX);

            elRefIniciadoOC = laUrlBase + 'Lecciones/' + usuarioId + elCurso + '/objeto_' + elCursoPre + elSufijoOC;
            console.log('elRefIniciadoOC: ', elRefIniciadoOC);

            /////////////////////////
            firebase.database().ref(elRefIniciadoOC).once('value').then(function(snapshot) {
                console.log('snapshot.val()', snapshot.val());

                if (snapshot.val() == null) {
                    var nuevoData = {
                        'Activo': false,
                        'Calificacion': 0,
                        'Revisado': false,
                        'Duracion': "",
                        'Fecha_fin': "",
                        'Fecha_inicio': laFechaInicial,
                        'Marcador': 0
                    }
                    var updates = {};
                    updates[elRefIniciadoOC] = nuevoData;
                    firebase.database().ref().update(updates, onComplete);
                }
            });
            /////////////////////////

            /////////////////////////
            firebase.database().ref(elRefIniciadoDX).once('value').then(function(snapshot) {
                console.log('snapshot.val()', snapshot.val());

                if (snapshot.val() == null) {
                    var nuevoData = {
                        'Activo': false,
                        'Calificacion': 0,
                        'Revisado': false,
                        'Duracion': "",
                        'Fecha_fin': "",
                        'Fecha_inicio': laFechaInicial,
                        'Marcador': "",
                        'SCORM_12': {
                            'cmi_core_lesson_status': "Sin registro",
                            'cmi_core_score_raw': "Sin registro"
                        }
                    }
                    var updates = {};
                    updates[elRefIniciadoDX] = nuevoData;
                    firebase.database().ref().update(updates, onComplete);
                }
            });
            /////////////////////////

        }
        // }
        console.log('el Ref Completo', elCursoPre, elSufijoDX, elSufijoOC);


        setTimeout(function() {
            inicializaAPI();
        }, 500);

    }
}


function registraRevisado() {


    // console.log('registraRevisado', $("#elVideo")[0].currentTime);


    var onComplete = function(error) {
        if (error) {
            console.log('Ocurrió un error en la sincronización.');
        } else {
            console.log('Sincronización realizada.');
        }
    };

    if (revisaConexion) {

        var elRefRevisado = laUrlBase + 'Lecciones/' + usuarioId + '/' + elCurso + 'objeto_' + that['CursoId' + elContenido];
        console.log('elRefRevisado: ', elRefRevisado);

        firebase.database().ref(elRefRevisado).once('value').then(function(snapshot) {
            console.log('snapshot.val()', snapshot.val());

            if (snapshot.val() != null) {

                // var elRevisado = snapshot.child('Revisado').val();
                // console.log('elRevisado', elRevisado);
                var laFechaHoy = obtenerFecha();
                console.log('laFechaHoy', laFechaHoy);
                var laFecha_ini = snapshot.child('Fecha_inicio').val();
                console.log('laFecha_ini', laFecha_ini);
                var laDuracion = obtenerDuracion(laFecha_ini);
                console.log('laDuracion', laDuracion);

                firebase.database().ref(elRefRevisado).update({
                    'Revisado': true,
                    'Duracion': laDuracion,
                    'Fecha_fin': laFechaHoy
                }, onComplete);

            }
        });
    }
}



function registraCalificacion(cualCalificacion) {
    console.log('registraCalificacion: ', cualCalificacion);

    var onComplete = function(error) {
        if (error) {
            console.log('Ocurrió un error en la sincronización.');
        } else {
            console.log('Sincronización realizada.');
        }
    };

    if (revisaConexion) {

        var elRefCalificacion = laUrlBase + 'Lecciones/' + usuarioId + '/' + elCurso + '/objeto_' + that['CursoId' + elContenido];
        console.log('elRefCalificacion: ', elRefCalificacion);

        firebase.database().ref(elRefCalificacion).once('value').then(function(snapshot) {
            console.log('snapshot.val()', snapshot.val());

            if (snapshot.val() != null) {

                firebase.database().ref(elRefCalificacion).update({
                    'Calficacion': cualCalificacion
                }, onComplete);

            }
        });
    }
}





///////////////////////////////// fechas ///////////////////////////////////////

function obtenerFecha() {
    moment.locale('es');
    var laFecha = moment().format();
    console.log('laFecha', laFecha);

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
var laDuracionSesion = obtenerDuracion();
//
// console.log('laFecha', laFecha);
// console.log('laFechaInicial', laFechaInicial);
// console.log('laFechaFinal', laFechaFinal);
console.log('laDuracionSesion', laDuracionSesion);


function obtenerFechaFormateada() {
    var laFechaFormateada = moment().locale('es').format('DD-MM-YYYY');
    console.log('laFechaFormateada', laFechaFormateada);

    return laFechaFormateada;
}



function habilitaBoton(cualBoton, modo) {
    if (modo == false) {
        cualBoton.addClass('disabled');
    } else {
        cualBoton.removeClass("disabled");
    }
}


/////////////////////////////// navegación /////////////////////////////////////

function navega(cualSeccion) {
    console.log('navega', cualSeccion);



    if (cualSeccion == '' || cualSeccion == null || cualSeccion == undefined) {
        cualSeccion = 'inicio';
    }

    $("#content").empty();
    $("#content").load('inc/' + cualSeccion + '.html', function() {
        // console.log('cualSeccion', cualSeccion, 'cargada.');
        $("#boton_inicio, #boton_recursos, #boton_usuarios, #boton_lecciones, #boton_admin, #boton_resultados, #boton_ayuda").parent().removeClass('active').addClass('inactive');
        $("#boton_" + cualSeccion).parent().removeClass('inactive').addClass('active');
    });

    // $("#boton_inicio, #boton_recursos, #boton_usuarios, #boton_lecciones, #boton_admin, #boton_resultados, #boton_ayuda").show();

    if (elPerfil === "Administrador" || elPerfil === "Prueba") {
        $("#boton_admin").parent().removeClass('oculto');
    } else {
        $("#boton_admin").parent().addClass('oculto');
    }
    // TODO por perfil
    if (elPerfil === "Administrador") {
        $("#boton_resultados").parent().removeClass('oculto');
    } else {
        $("#boton_resultados").parent().addClass('oculto');
    }
}


function detectaUnloadContenido() {
    $(window).on("unload", function() {
        console.log('unload body');
        cierraSesion();
    });
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



$(window).resize(function() {

    // if (elContenidoLanzado == true) {
    ajustaEscalaContenido();
    // }



    $('.cargando_spinner').css({
        position: 'absolute',
        left: ($(window).width() - $('.className').outerWidth()) / 2,
        top: ($(window).height() - $('.className').outerHeight()) / 2
    });

});







$(document).ready(function() {

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
    }


    $('.cargando_spinner').css({
        position: 'absolute',
        left: ($(window).width() - $('.className').outerWidth()) / 2,
        top: ($(window).height() - $('.className').outerHeight()) / 2
    });

    laFechaFormateada = obtenerFechaFormateada();

    $('.main-panel').addClass('main-panel_100').show();
    $('.contenido').hide();
    $('#botonPerfil').hide();
    $("#inputUsuario").val('');
    $("#inputPassword").val('');


    $("#botonEntrar").click(function(event) {
        event.preventDefault();
        login($("#inputUsuario").val(), $("#inputPassword").val());
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
            // duration: 300,
            transition: 'scale'
        }).modal('show');

        $(document).off('click', '#botonCancelarCerrarContenido').on('click', '#botonCancelarCerrarContenido', function(e) {
            // dialog.close();
        });
        $(document).off('click', '#botonAceptarCerrarContenido').on('click', '#botonAceptarCerrarContenido', function(e) {
            cierraContenido();
            // dialog.close();
        });

    });


    $("#boton_inicio, #boton_recursos, #boton_usuarios, #boton_lecciones, #boton_admin, #boton_resultados, #boton_ayuda").click(function(event) {
        if ($(this).css('cursor') == 'pointer') {
            var cualSeccion = $(this).attr('id').substr(6, $(this).attr('id').length);
            event.preventDefault();

            navega(cualSeccion);
        }
    });



    detectaUnloadContenido();

    leeLocalStorage();

    // ran = generarId();
    // location.hash = "?" + ran;


});