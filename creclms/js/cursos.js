var arrayCategorias = new Array();
var cuantasCategorias = 0;
var cuantosCursos;
var cuantosCursosVisibles;
var cuantosCursosDisponibles;
var cuantosUsuarios;
var arrayUsuarios = [];
var dataSet = [];

function cuentaCursos() {
    console.log('cuentaCursos');
    cuantosCursosDisponibles = 0;

    if (revisaConexion) {
        firebase.database().ref(laUrlBase + 'Cursos').once('value').then(function(snapshot) {
            if (snapshot.val() != null) {
                var contadorCursos = 0;
                var contadorCursosVisbles = 0;
                var contadorTemasPorCurso = 0;
                var cuantosTemasPorCurso = 0;
                var contadorUsuAsigPorCurso = 0;
                var cuantosUsuAsigPorCurso = 0;
                var contadorRecursosPorTema = 0;
                var cuantosRecursosPorTema = 0;

                cuantosCursos = snapshot.numChildren();
                console.log('cuantosCursos', cuantosCursos);

                snapshot.forEach(function(childSnapshot) {
                    contadorCursos++;

                    this['CursoId' + contadorCursos] = snapshot.child(childSnapshot.key).child('Id').val();
                    console.log('CursoId' + contadorCursos + ': ', this['CursoId' + contadorCursos]);
                    this['cursoNombre' + contadorCursos] = snapshot.child(childSnapshot.key).child('Nombre').val();
                    console.log('cursoNombre ' + contadorCursos + ': ', this['cursoNombre' + contadorCursos]);
                    this['cursoDescripcion' + contadorCursos] = snapshot.child(childSnapshot.key).child('Descripcion').val();
                    console.log('cursoDescripcion ' + contadorCursos + ': ', this['cursoDescripcion' + contadorCursos]);
                    this['cursoObjetivos' + contadorCursos] = snapshot.child(childSnapshot.key).child('Objetivos').val();
                    console.log('cursoObjetivos ' + contadorCursos + ': ', this['cursoObjetivos' + contadorCursos]);
                    this['cursoTemario' + contadorCursos] = snapshot.child(childSnapshot.key).child('Temario').val();
                    console.log('cursoTemario ' + contadorCursos + ': ', this['cursoTemario' + contadorCursos]);
                    this['cursoVisible' + contadorCursos] = snapshot.child(childSnapshot.key).child('Visible').val();
                    console.log('cursoVisible ' + contadorCursos + ': ', this['cursoVisible' + contadorCursos]);
                    this['cursoPortada' + contadorCursos] = snapshot.child(childSnapshot.key).child('Portada').val();
                    console.log('Portada del Curso: ', this['cursoPortada' + contadorCursos]);

                    if (this['cursoVisible' + contadorCursos] == true) {
                        // if (this['cursoNivel' + contadorCursos] <= elUsuarioNivel) {
                        contadorCursosVisbles++;
                        // }
                    }

                    childSnapshot.forEach(function(childSnapshot2) {
                        console.log('childSnapshot2', childSnapshot2.key);

                        if (childSnapshot2.key == "Asignacion") {
                            this['cuantosAsignados' + contadorCursos] = childSnapshot2.numChildren();
                            console.log('cuantosAsignados del Curso', contadorCursos, this['cuantosAsignados' + contadorCursos]);

                            childSnapshot2.forEach(function(childSnapshot3) {
                                contadorUsuAsigPorCurso++;

                                this['cursoUsuAsigId' + contadorUsuAsigPorCurso] = childSnapshot2.child(childSnapshot3.key).child('Id').val();
                                console.log('Curso', contadorCursos, 'UsuAsig', contadorUsuAsigPorCurso, 'Id', this['cursoUsuAsigId' + contadorUsuAsigPorCurso]);
                                this['cursoUsuClase' + contadorUsuAsigPorCurso] = childSnapshot2.child(childSnapshot3.key).child('Clase').val();
                                console.log('Curso', contadorCursos, 'UsuAsig', contadorUsuAsigPorCurso, 'Clase', this['cursoUsuClase' + contadorUsuAsigPorCurso]);
                                this['cursoUsuFecha_abre' + contadorUsuAsigPorCurso] = childSnapshot2.child(childSnapshot3.key).child('Fecha_abre').val();
                                console.log('Curso', contadorCursos, 'UsuAsig', contadorUsuAsigPorCurso, 'Fecha_abre', this['cursoUsuFecha_abre' + contadorUsuAsigPorCurso]);
                                this['cursoUsuFecha_cierra' + contadorUsuAsigPorCurso] = childSnapshot2.child(childSnapshot3.key).child('Fecha_cierra').val();
                                console.log('Curso', contadorCursos, 'UsuAsig', contadorUsuAsigPorCurso, 'Fecha_cierra', this['cursoUsuFecha_cierra' + contadorUsuAsigPorCurso]);

                                cuantosUsuAsigPorCurso = contadorUsuAsigPorCurso;
                            });
                        }

                        if (childSnapshot2.key == "Temas") {
                            this['cuantosTemas' + contadorCursos] = childSnapshot2.numChildren();
                            console.log('cuantosTemas del Curso', contadorCursos, this['cuantosTemas' + contadorCursos]);

                            childSnapshot2.forEach(function(childSnapshot3) {
                                contadorTemasPorCurso++;

                                this['cursoTemaId' + contadorTemasPorCurso] = childSnapshot2.child(childSnapshot3.key).child('Id').val();
                                console.log('Curso', contadorCursos, 'Tema', contadorTemasPorCurso, 'Id', this['cursoTemaId' + contadorTemasPorCurso]);
                                this['cursoTemaNombre' + contadorTemasPorCurso] = childSnapshot2.child(childSnapshot3.key).child('Nombre').val();
                                console.log('Curso', contadorCursos, 'Tema', contadorTemasPorCurso, 'Nombre', this['cursoTemaNombre' + contadorTemasPorCurso]);
                                this['cursoTemaDescripcion' + contadorTemasPorCurso] = childSnapshot2.child(childSnapshot3.key).child('Descripcion').val();
                                console.log('Curso', contadorCursos, 'Tema', contadorTemasPorCurso, 'Descripcion', this['cursoTemaDescripcion' + contadorTemasPorCurso]);
                                this['cursoTemaObjetivo' + contadorTemasPorCurso] = childSnapshot2.child(childSnapshot3.key).child('Objetivo').val();
                                console.log('Curso', contadorCursos, 'Tema', contadorTemasPorCurso, 'Objetivo', this['cursoTemaObjetivo' + contadorTemasPorCurso]);
                                this['cursoTemaOrden' + contadorTemasPorCurso] = childSnapshot2.child(childSnapshot3.key).child('Orden').val();
                                console.log('Curso', contadorCursos, 'Tema', contadorTemasPorCurso, 'Orden', this['cursoTemaOrden' + contadorTemasPorCurso]);
                                this['cursoTemaVisible' + contadorTemasPorCurso] = childSnapshot2.child(childSnapshot3.key).child('Visible').val();
                                console.log('Curso', contadorCursos, 'Tema', contadorTemasPorCurso, 'Visible', this['cursoTemaVisible' + contadorTemasPorCurso]);

                                cuantosTemasPorCurso = contadorTemasPorCurso;

                                childSnapshot3.forEach(function(childSnapshot4) {
                                    console.log('childSnapshot4', childSnapshot4.key);

                                    if (childSnapshot4.key == "Recursos") {
                                        this['cuantosRecursosTemaCurso' + contadorTemasPorCurso] = childSnapshot4.numChildren();
                                        console.log('cuantosRecursos del Curso', contadorCursos, 'Tema', this['cursoTemaOrden' + cuantosTemasPorCurso], this['cuantosRecursosTemaCurso' + contadorTemasPorCurso]);

                                        childSnapshot4.forEach(function(childSnapshot5) {
                                            contadorRecursosPorTema++;

                                            this['cursoTemaRecursoId' + this['cursoTemaOrden' + cuantosTemasPorCurso]] = childSnapshot4.child(childSnapshot5.key).child('Id').val();
                                            console.log('Curso', contadorCursos, 'Tema', this['cursoTemaOrden' + cuantosTemasPorCurso], 'Id', this['cursoTemaRecursoId' + this['cursoTemaOrden' + cuantosTemasPorCurso]]);

                                            this['cursoTemaRecursoOrden' + this['cursoTemaOrden' + cuantosTemasPorCurso]] = childSnapshot4.child(childSnapshot5.key).child('Orden').val();
                                            console.log('Curso', contadorCursos, 'Tema', this['cursoTemaOrden' + cuantosTemasPorCurso], 'Orden', this['cursoTemaRecursoOrden' + this['cursoTemaOrden' + cuantosTemasPorCurso]]);

                                            this['cursoTemaRecursoPromediable' + this['cursoTemaOrden' + cuantosTemasPorCurso]] = childSnapshot4.child(childSnapshot5.key).child('Promediable').val();
                                            console.log('Curso', contadorCursos, 'Tema', this['cursoTemaOrden' + cuantosTemasPorCurso], 'Promediable', this['cursoTemaRecursoPromediable' + this['cursoTemaOrden' + cuantosTemasPorCurso]]);

                                            this['cursoTemaRecursoPuntosObtener' + this['cursoTemaOrden' + cuantosTemasPorCurso]] = childSnapshot4.child(childSnapshot5.key).child('PuntosObtener').val();
                                            console.log('Curso', contadorCursos, 'Tema', this['cursoTemaOrden' + cuantosTemasPorCurso], 'PuntosObtener', this['cursoTemaRecursoPuntosObtener' + this['cursoTemaOrden' + cuantosTemasPorCurso]]);

                                            cuantosRecursosPorTema = contadorRecursosPorTema;
                                        });

                                    }
                                });

                            });
                        }


                        cuantosCursos = contadorCursos;
                        cuantosCursosVisibles = contadorCursosVisbles;
                        that = this;

                    });

                });


                return pintaCursos().then(function() {
                    pintaCursosDisponibles().then(function() {
                        activaBotonesCursos();
                    });
                });

            }
        });
    }
}


// function pintaCategorias() {

//     var contenidoCategorias = '';
//     $('#categorias').empty();

//     var arrayCategoriasPrev = new Array();
//     for (a = 1; a <= cuantosCursosVisibles; a++) {
//         arrayCategoriasPrev.push(that['cursoCategoria' + a]);
//     }
//     console.log('arrayCategoriasPrev', arrayCategoriasPrev);

//     function unique(arrayCategoriasPrev) {
//         return $.grep(arrayCategoriasPrev, function(el, index) {
//             return index == $.inArray(el, arrayCategoriasPrev);
//         });
//     }
//     arrayCategorias = unique(arrayCategoriasPrev);
//     console.log('arrayCategorias', arrayCategorias);
//     cuantasCategorias = arrayCategorias.length;
//     console.log('cuantasCategorias', cuantasCategorias);

//     // for (a = 1; a <= cuantasCategorias; a++) {
//     //     contenidoCategorias += '<div class="categoria">';
//     //     contenidoCategorias += arrayCategorias[(a - 1)];
//     //     contenidoCategorias += '<div  id="botonCategoria' + a + '" class="btn btn-sm btn-toggle btn-categoria active" data-toggle="button">';
//     //     contenidoCategorias += '<div class="handle"></div>';
//     //     contenidoCategorias += '</div>';
//     //     contenidoCategorias += '</div>';
//     // }

//     // $('#categorias').append(contenidoCategorias);

//     return $.ajax();
// }


function pintaCursos() {

    var contador = 0;
    var anchoColumnas = 6;
    // if (cuantosCursosVisibles >= 3) {
    if (cuantosCursos >= 3) {
        anchoColumnas = 6;
    }
    var contenidoSecCursos = '';
    $('.cursos_int').empty();


    for (a = 1; a <= cuantosCursosVisibles; a++) {
        this['cuantosElemPorCategoria' + a] = 0;

        contenidoSecCursos += '<div id="grupoCategoria' + a + '" class="grupo_categoria">';
        // contenidoSecCursos += '<p class="titulo_categoria">' + arrayCategorias[(a - 1)] + ' </p>';
        contenidoSecCursos += '<p class="titulo_categoria">' + 'Cursos' + ' </p>';

        contenidoSecCursos += '<div class="row">';
        contenidoSecCursos += '<div class="col-md-10 ml-auto mr-auto">';
        contenidoSecCursos += '<div class="row">';

        for (b = 1; b <= cuantosCursosVisibles; b++) {

            // if (that['cursoCategoria' + b] == arrayCategorias[(a - 1)]) {
            this['cuantosElemPorCategoria' + a]++;

            // if (that['cursoNivel' + b] <= elUsuarioNivel) {

            // if (that['cursoNivel' + b] <= elUsuarioNivel) {

            // contenidoSecCursos += '<div class="col-md-' + anchoColumnas + ' ml-auto mr-auto">';
            contenidoSecCursos += '<div class="col-md-' + anchoColumnas + '">';
            contenidoSecCursos += '<div id="tarjeta' + b + '" class="card card_con_sombra" style="display:none;">';
            contenidoSecCursos += '<img class="card-img-top" src=/img/objeto_portada_min.jpg></img>';

            contenidoSecCursos += '<div class="card-body">';
            // contenidoSecCursos += '<h6 class="category text-danger">' + this['cursoCategoria' + b] + '</h6>';

            contenidoSecCursos += '<h5 id="curso_titulo' + b + '" class="curso_titulo card-title">' + this['cursoNombre' + b] + '</h5>';

            contenidoSecCursos += '<div class="card-desc">';
            contenidoSecCursos += '<p class="card-text" ><b>Descripción: </b><br>' + this['cursoDescripcion' + b] + '</p>';
            if (this['cursoObjetivos' + b] != null) {
                contenidoSecCursos += '<p class="card-text" ><b>Objetivos: </b><br>' + this['cursoObjetivos' + b] + '</p>';
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
            contenidoSecCursos += '<div id="botonEditarCurso' + b + '" class="btn btn-sm btn-round botonEditarCurso">Editar</div>';
            contenidoSecCursos += '<div id="botonAsignarCurso' + b + '" class="btn btn-sm btn-round botonAsignarCurso">Asignar</div>';

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

            // }
            // }

        }

        contenidoSecCursos += '</div>';
        contenidoSecCursos += '</div>';
        contenidoSecCursos += '</div>';
        contenidoSecCursos += '</div>';

        console.log(this['cuantosElemPorCategoria' + a]);

    }

    $('.cursos_int').append(contenidoSecCursos);
    // $('#subtituloSeccion').html('<a  >' + cuantosCursosVisibles + '</a> Cursos en total');


    //////////////// por asignación ////////////////      
    for (c = 1; c <= cuantosCursosVisibles; c++) {
        contador++;
        // var Id_dx = parseInt(that['CursoId' + c].split('_')[1].split('dx')[0]);
        // console.log('Id_dx', Id_dx);
        // console.log('el Recurso Visible c', c, those['elCursoVisible' + c]);
        // var Id_oc = parseInt(that['CursoId' + c].split('_')[1].split('oc')[0]);
        // console.log('Id_oc', c, Id_oc);

        // for (d = 1; d <= cuantosCursosVisibles; d++) {
        // console.log('el Recurso Visible d', d, those['elCursoVisible' + d]);
        // if (those['elCursoVisible' + d] == Id_oc) {

        // console.log('d', d, $('#tarjeta' + c));

        $('#tarjeta' + c).css({
            'opacity': '0',
            'display': 'flex'
        });
        $('#tarjeta' + c).animate({
            opacity: 1
        });

        cambiaPortada(c);
        // }
        // }

        leeEstatusCurso(contador);
    }
    console.log('cuantosCursosVisibles', cuantosCursosVisibles);

    return $.ajax();

}

function pintaCursosDisponibles() {

    // si no hay nada, presenta todos
    console.log('cuantosCursosVisibles', cuantosCursosVisibles);
    if (cuantosCursosVisibles == -1) {
        for (dd = 1; dd <= cuantosCursosVisibles; dd++) {
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


function activaBotonesCursos() {

    for (a = 1; a <= cuantosCursos; a++) {
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

        $("#botonIniciarCurso" + a).click(function(event) {
            event.preventDefault();
            var elContenido = $(this).attr('id').substr(17, 3);
            // console.log('elContenido', elContenido);
            // window.open(that['cursoLiga' + elContenido]);
            lanzaContenido(elContenido);
        });

        $("#botonEditarCurso" + a).click(function(event) {
            event.preventDefault();
            var elCurso = $(this).attr('id').substr(16, 3);
            console.log('elCurso', elCurso);
            editaCurso(elCurso);
        });

        $("#botonCancelarCurso").click(function(event) {
            event.preventDefault();
            regresaCurso();
        });

        $("#botonGuardarCurso").click(function(event) {
            event.preventDefault();
            regresaCurso();
        });

        $("#botonInscripciones").click(function(event) {
            event.preventDefault();
            cuentaUsuarios();
        });



        habilitaBoton($("#botonAsignarCurso" + a), false);
    }

}


function editaCurso(cualCurso) {
    console.log('editaCurso', cualCurso);

    $('.cursos_int').css({
        'display': 'none'
    });
    $("#secEditarCurso").css({
        'display': 'block'
    });

    $("#tabCursos>li>a").removeClass("active");
    $("#tabCursosContent>.active").removeClass("active");
    $("#botonInfoGral").addClass('show active');
    $("#infoGral").addClass('show active');


    // Editor //
    ClassicEditor.create(document.querySelector('#editor1'))
        .then(editor => {
            // console.log('editor', editor);
        })
        .catch(error => {
            console.error(error);
        });
    ClassicEditor.create(document.querySelector('#editor2'))
        .then(editor => {
            // console.log('editor', editor);
        })
        .catch(error => {
            console.error(error);
        });
    // Editor //

    // upload image //
    $('.input-images-1').imageUploader();
    // upload image //

}

function regresaCurso() {

    $('.cursos_int').css({
        'display': 'block'
    });
    $("#secEditarCurso").css({
        'display': 'none'
    });

    // Editor //
    $('#editor1').remove();
    $('#editor2').remove();

    // upload image //
    $('.image-uploader').remove();

}



function cuentaUsuarios() {
    console.log('cuentaUsuarios');

    var contadorUsuarios = 0;

    if (revisaConexion) {
        firebase.database().ref(laUrlBase + 'Usuarios').once('value').then(function(snapshot) {
            // console.log('snapshot.val()', snapshot.val());
            arrayUsuarios = [];

            if (snapshot.val() != null) {
                snapshot.forEach(function(childSnapshot) {
                    // console.log('childSnapshot', childSnapshot.key);

                    if (childSnapshot.key != undefined && childSnapshot.key != null && childSnapshot.key != '' && childSnapshot.key != 'undefined' && childSnapshot.key != 'val') {
                        // console.log('childSnapshot.key', childSnapshot.key);

                        contadorUsuarios++;

                        this['usuarioId' + contadorUsuarios] = snapshot.child(childSnapshot.key).child('Id').val();
                        console.log(contadorUsuarios, 'usuarioId', this['usuarioId' + contadorUsuarios]);
                        this['usuarioNombre' + contadorUsuarios] = snapshot.child(childSnapshot.key).child('Nombre').val();
                        console.log(contadorUsuarios, 'usuarioNombre', this['usuarioNombre' + contadorUsuarios]);
                        this['usuarioApellidoPaterno' + contadorUsuarios] = snapshot.child(childSnapshot.key).child('Apellido_Paterno').val();
                        console.log(contadorUsuarios, 'ApellidoPaterno', this['usuarioApellidoPaterno' + contadorUsuarios]);
                        this['usuarioApellidoMaterno' + contadorUsuarios] = snapshot.child(childSnapshot.key).child('Apellido_Materno').val();
                        console.log(contadorUsuarios, 'usuarioApellidoMaterno', this['usuarioApellidoMaterno' + contadorUsuarios]);
                        this['usuarioCorreo' + contadorUsuarios] = snapshot.child(childSnapshot.key).child('Correo').val();
                        console.log(contadorUsuarios, 'usuarioCorreo', this['usuarioCorreo' + contadorUsuarios]);
                        this['usuarioNivel' + contadorUsuarios] = snapshot.child(childSnapshot.key).child('Nivel').val();
                        console.log(contadorUsuarios, 'usuarioNivel', this['usuarioNivel' + contadorUsuarios]);
                        this['usuarioPerfil' + contadorUsuarios] = snapshot.child(childSnapshot.key).child('Perfil').val();
                        console.log(contadorUsuarios, 'usuarioPerfil', this['usuarioPerfil' + contadorUsuarios]);
                        this['usuarioPuesto' + contadorUsuarios] = snapshot.child(childSnapshot.key).child('Puesto').val();
                        console.log(contadorUsuarios, 'usuarioPuesto', this['usuarioPuesto' + contadorUsuarios]);
                        this['usuarioVisible' + contadorUsuarios] = snapshot.child(childSnapshot.key).child('Visible').val();
                        console.log(contadorUsuarios, 'usuarioVisible', this['usuarioVisible' + contadorUsuarios]);

                        arrayUsuarios.push({
                            'usuarioId': this['usuarioId' + contadorUsuarios],
                            'usuarioNombre': this['usuarioNombre' + contadorUsuarios],
                            'usuarioApellidoPaterno': this['usuarioApellidoPaterno' + contadorUsuarios],
                            'usuarioApellidoMaterno': this['usuarioApellidoMaterno' + contadorUsuarios],
                            'usuarioCorreo': this['usuarioCorreo' + contadorUsuarios],
                            'usuarioPerfil': this['usuarioPerfil' + contadorUsuarios],
                            'usuarioPuesto': this['usuarioPuesto' + contadorUsuarios],
                            'usuarioVisible': this['usuarioVisible' + contadorUsuarios]
                        });
                    }

                });

                console.log('arrayUsuarios', arrayUsuarios);
                those = this;

                return pintaUsuarios();

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


function pintaUsuarios() {
    console.log('pintaUsuarios');

    for (a = 0; a < arrayUsuarios.length; a++) {
        dataSet[a] = [
            arrayUsuarios[a].usuarioNombre + arrayUsuarios[a].usuarioApellidoPaterno + arrayUsuarios[a].usuarioApellidoMaterno,
            arrayUsuarios[a].usuarioCorreo,
            '<div id="botonEliminarUsuario' + a + '" class="btn btn-round btn-icon btn-primary float-right botonEliminarUsuario" onClick="clickBorrarUsuario(' + a + ')">' + '<i class="nc-icon-outline ui-1_trash-simple"></i></div>' + ' ' +
            '<div id="botonEditarUsuario' + a + '" class="btn btn-round btn-icon btn-verde2 float-right botonEditarUsuario" data-toggle="modal" data-target="#modalEditarUsuario" onClick="clickEditarUsuario(' + a + ')">' +
            '<i class="nc-icon-outline ui-1_pencil"></i></div>'
        ];
    }
    console.log('dataSet ', dataSet);

    tablaUsuarios = $('#tablaUsuarios').DataTable({
        data: dataSet,
        "destroy": true,
        "language": {
            "url": "js/dataTable_spanish.json"
        },
        columns: [{
            title: 'Nombre'
        }, {
            title: 'Correo'
        }, {
            title: ' '
        }],
        "initComplete": function(settings) {
            $('input[type=search]').val('-');
            setTimeout(function() {
                $('input[type=search]').val('');
            }, 300);
        }
    });


    return $.ajax();
};