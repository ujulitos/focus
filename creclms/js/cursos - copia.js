function cuentaCursos() {
    console.log('cuentaCursos');
    cuantosCursosDisponibles = 0;

    if (revisaConexion) {
        firebase.database().ref(laUrlBase + 'Cursos').once('value').then(function(snapshot) {
            if (snapshot.val() != null) {
                var contadorCursos = 0;
                var contadorCursosVisbles = 0;
                cuantosCursos = snapshot.numChildren();
                console.log('cuantosCursos', cuantosCursos);

                snapshot.forEach(function(childSnapshot) {
                    contadorCursos++;

                    this['CursoId' + contadorCursos] = snapshot.child(childSnapshot.key).child('Id').val();
                    console.log('CursoId' + contadorCursos + ': ', this['CursoId' + contadorCursos]);
                    this['cursoNombre' + contadorCursos] = snapshot.child(childSnapshot.key).child('Nombre').val();
                    console.log('cursoNombre ' + contadorCursos + ': ', this['cursoNombre' + contadorCursos]);
                    this['cursoVisible' + contadorCursos] = snapshot.child(childSnapshot.key).child('Visible').val();
                    console.log('cursoVisible ' + contadorCursos + ': ', this['cursoVisible' + contadorCursos]);
                    this['cursoNivel' + contadorCursos] = snapshot.child(childSnapshot.key).child('Nivel').val();
                    console.log('cursoNivel', this['cursoNivel' + contadorCursos]);
                    if (this['cursoVisible' + contadorCursos] == true) {
                        if (this['cursoNivel' + contadorCursos] <= elUsuarioNivel) {
                            contadorCursosVisbles++;
                        }
                    }

                    this['cursoCategoria' + contadorCursos] = snapshot.child(childSnapshot.key).child('Categoria').val();
                    // console.log('cursoCategoria ' + contadorCursos + ': ', this['cursoCategoria' + contadorCursos]);
                    this['cursoDesc' + contadorCursos] = snapshot.child(childSnapshot.key).child('Descripcion').val();
                    // console.log('Descripcion del Curso: ', this['cursoDesc' + contadorCursos]);
                    this['cursoDurac' + contadorCursos] = snapshot.child(childSnapshot.key).child('Duracion').val();
                    // console.log('Duración del Curso: ', this['cursoDurac' + contadorCursos]);
                    this['cursoObj' + contadorCursos] = snapshot.child(childSnapshot.key).child('Objetivos').val();
                    // console.log('Objetivos del Curso: ', this['cursoObj' + contadorCursos]);
                    // this['cursoTemario' + contadorCursos] = snapshot.child(childSnapshot.key).child('Temario').val();
                    // console.log('Temario del Curso: ', this['cursoTemario' + contadorCursos]);
                    this['cursoLiga' + contadorCursos] = snapshot.child(childSnapshot.key).child('Liga').val();
                    // console.log('Liga del Curso: ', this['cursoLiga' + contadorCursos]);
                    this['cursoPortada' + contadorCursos] = snapshot.child(childSnapshot.key).child('Portada').val();
                    // console.log('Portada del Curso: ', this['cursoPortada' + contadorCursos]);
                    that = this;

                    cuantosCursos = contadorCursos;
                    cuantosCursosVisibles = contadorCursosVisbles;

                });


                firebase.database().ref(laUrlBase + 'Usuarios').orderByChild('Id').equalTo(usuarioId).once('value').then(function(snapshot) {
                    if (snapshot.val() != null) {
                        var contadorCursosDisponibles = 0;

                        snapshot.forEach(function(childSnapshot) {
                            childSnapshot.forEach(function(childSnapshot2) {
                                var laClase = childSnapshot2.child('Clase').val();
                                // console.log('laClase', laClase);

                                childSnapshot2.forEach(function(childSnapshot3) {
                                    console.log('childSnapshot3', childSnapshot3.key);

                                    if (childSnapshot3.key != "Clase") {
                                        contadorCursosDisponibles++;
                                        this['elCursoId' + contadorCursosDisponibles] = childSnapshot3.child('Id').val();
                                        console.log('elCursoId', this['elCursoId' + contadorCursosDisponibles]);
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

                                        this['elCursoVisible' + contadorCursosDisponibles] = 0;
                                        if (elHoy >= laFecha_abre) {
                                            // console.log('hoy es mas que laFecha_abre');
                                            if (elHoy <= laFecha_cierra) {
                                                // console.log('hoy es mas que laFecha_cierra');
                                                this['elCursoVisible' + contadorCursosDisponibles] = this['elCursoId' + contadorCursosDisponibles];
                                                cuantosCursosDisponibles++;
                                                cuantosCursosDisponibles = contadorCursosDisponibles;

                                                console.log('Estamos dentro con el elCursoId', this['elCursoVisible' + contadorCursosDisponibles]);
                                            } else {
                                                // console.log('hoy es menos que laFecha_cierra');
                                            }
                                        } else {
                                            // console.log('hoy es menos que laFecha_abre');
                                        }
                                        // console.log('childSnapshot3.key', childSnapshot3.key);
                                        if (childSnapshot3.key === "val") {
                                            cuantosCursosDisponibles = -1;
                                            // console.log('cuantosCursosDisponibles', cuantosCursosDisponibles);
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
    for (a = 1; a <= cuantosCursosVisibles; a++) {
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
    // if (cuantosCursosVisibles >= 3) {
    if (cuantosCursos >= 3) {
        anchoColumnas = 6;
    }
    var contenidoSecCursos = '';
    $('.Cursos_int').empty();


    for (a = 1; a <= cuantasCategorias; a++) {
        this['cuantosElemPorCategoria' + a] = 0;

        contenidoSecCursos += '<div id="grupoCategoria' + a + '" class="grupo_categoria">';
        contenidoSecCursos += '<p class="titulo_categoria">' + arrayCategorias[(a - 1)] + ' </p>';

        contenidoSecCursos += '<div class="row">';
        contenidoSecCursos += '<div class="col-md-10 ml-auto mr-auto">';
        contenidoSecCursos += '<div class="row">';

        for (b = 1; b <= cuantosCursosVisibles; b++) {

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

    $('.Cursos_int').append(contenidoSecCursos);
    // $('#subtituloSeccion').html('<a  >' + cuantosCursosVisibles + '</a> Cursos en total');


    //////////////// por asignación ////////////////      
    for (c = 1; c <= cuantosCursosVisibles; c++) {
        contador++;
        // var Id_dx = parseInt(that['CursoId' + c].split('_')[1].split('dx')[0]);
        // console.log('Id_dx', Id_dx);
        // console.log('el Recurso Visible c', c, those['elCursoVisible' + c]);
        var Id_oc = parseInt(that['CursoId' + c].split('_')[1].split('oc')[0]);
        // console.log('Id_oc', c, Id_oc);

        for (d = 1; d <= cuantosCursosDisponibles; d++) {
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
    console.log('cuantosCursosDisponibles', cuantosCursosDisponibles);

    return $.ajax();

}

function pintaCursosDisponibles() {

    // si no hay nada, presenta todos
    console.log('cuantosCursosDisponibles', cuantosCursosDisponibles);
    if (cuantosCursosDisponibles == -1) {
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
    }

    for (a = 1; a <= cuantosCursos; a++) {
        $("#botonIniciarCurso" + a).click(function(event) {
            event.preventDefault();
            elContenido = $(this).attr('id').substr(17, 3);
            // console.log('elContenido', elContenido);
            // window.open(that['cursoLiga' + elContenido]);
            lanzaContenido(elContenido);
        });
    }
}