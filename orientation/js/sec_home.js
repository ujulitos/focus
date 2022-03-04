function activaSeccionHome() {
    console.log('seccionHome');
    var cuantasCats;

    var laURLTasks = "" + laUrlAPI + "/Tasks/.json?auth=" + secret + "";
    // var laURLTasks = "js/tasks.json";
    console.log('laURLTasks', laURLTasks);

    $('.subname1_txt').text('');
    $('.subname2_txt').text('');


    // $('#divTools').owlCarousel('destroy');
    $("#divTools").owlCarousel({
        items: 2,
        margin: 0,
        loop: false,
        nav: true,
        dots: true
    });
    $('#divTools').show();
    $('#divToolsWrapper').show();


    ajustaTamano();


    function leeUsuarios() {

        if (revisaConexion) {
            firebase.database().ref(laUrlBase + 'Usuarios').once('value').then(function(snapshot) {
                if (snapshot.val() != null) {
                    var contadorUsuarios = 0;
                    cuantosUsuarios = 0;
                    console.log('-----------------------');

                    snapshot.forEach(function(childSnapshot) {
                        if (snapshot.child(childSnapshot.key).child('Id').val() != undefined && snapshot.child(childSnapshot.key).child('Id').val() != null) {
                            contadorUsuarios++;
                            this['usuarioPerfil' + contadorUsuarios] = snapshot.child(childSnapshot.key).child('Perfil').val();
                            // console.log('usuarioPerfil', contadorUsuarios, this['usuarioPerfil' + contadorUsuarios]);
                            if (this['usuarioPerfil' + contadorUsuarios] === 'IBP') {
                                this['usuarioId' + cuantosUsuarios] = snapshot.child(childSnapshot.key).child('Id').val();
                                console.log('usuarioId', cuantosUsuarios, this['usuarioId' + cuantosUsuarios]);
                                this['usuarioUsername' + cuantosUsuarios] = snapshot.child(childSnapshot.key).child('Username').val();
                                // console.log('usuarioUsername', cuantosUsuarios, this['usuarioUsername' + cuantosUsuarios]);
                                this['usuarioName' + cuantosUsuarios] = snapshot.child(childSnapshot.key).child('Name').val();
                                console.log('usuarioName', cuantosUsuarios, this['usuarioName' + cuantosUsuarios]);
                                this['usuarioPerfil' + cuantosUsuarios] = snapshot.child(childSnapshot.key).child('Perfil').val();
                                // console.log('usuarioPerfil', cuantosUsuarios, this['usuarioPerfil' + cuantosUsuarios]);

                                cuantosUsuarios++;
                                console.log('-----------------------');
                            }
                        }
                        that = this;


                    });

                    console.log('cuantosUsuarios', cuantosUsuarios);
                    return llenaUsuarios();
                }
            });
        }

    }

    function llenaUsuarios() {
        var dataSet = [];

        $("select").select2();

        $('#elSelectPar').empty();
        $('#elSelectPar').append('<option value="Select IBP" selected disabled>Select IBP</option>');
        for (a = 0; a < cuantosUsuarios; a++) {
            dataSet[a] = [that['usuarioId' + a], that['usuarioName' + a]];
        }
        dataSet.sort(new Intl.Collator('es').compare);
        console.log('dataSet', dataSet);

        for (a = 0; a < cuantosUsuarios; a++) {
            $('#elSelectPar').append('<option value="' + dataSet[a][0] + '">' + dataSet[a][1] + '</option>');
        }
        $('.select2-search:after').append('<span class="material-icons-outlined">search</span>');

        $('#elSelectPar').on('change', function() {
            $('#elSelectPar option[value="Select IBP"]').remove();
            var elPar = $("#elSelectPar :selected").text();
            var elParID = $("#elSelectPar :selected").val();
            seleccionaUsuario(elPar, elParID);
            console.log('usuarioSeleccionadoId', usuarioSeleccionadoId);

            if (usuarioSeleccionadoId == undefined) {
                habilitaBoton($('#botonReporteStatus'), false);
                habilitaBoton($('#botonReporteDetail'), false);
            } else {
                habilitaBoton($('#botonReporteStatus'), true);
                habilitaBoton($('#botonReporteDetail'), true);
            }
        });

        if (usuarioSeleccionadoId != undefined || usuarioSeleccionadoId != null) {
            $('#elSelectPar').val(usuarioSeleccionadoId).change();
        }
        console.log('usuarioSeleccionadoId', usuarioSeleccionadoId);

    }


    function seleccionaUsuario(cualUsuario, cualUsuarioId) {
        console.log('seleccionaUsuario', cualUsuario, cualUsuarioId);

        if (cualUsuarioId != usuarioSeleccionadoId) {
            laSemana = 1;
            laSemanaSel = 1;
            $('#divDias').hide();
            $('#divCategorias').hide();
        }
        usuarioSeleccionado = cualUsuario;
        usuarioSeleccionadoId = cualUsuarioId;

        $('#divReportes').hide();

        if (elRol === 'Admin') {
            habilitaDiv($('#botonReporte'), true);
        }

        return leeStatus(usuarioSeleccionadoId);
    }

    function leeStatus(cualUsuarioId) {
        console.log('leeStatus', cualUsuarioId, elRol);

        if (revisaConexion) {
            firebase.database().ref(laUrlBase + 'Usuarios/' + cualUsuarioId + '/Registro').once('value').then(function(snapshot) {
                if (snapshot.val() != null) {

                    arrayStatus = snapshot.val();
                    console.log('arrayStatus', arrayStatus);

                    _that.arrayStatusWeeks = arrayStatus.status.weeks_completed;
                    console.log('arrayStatusWeeks', _that.arrayStatusWeeks);

                    _that.arrayStatusCats = arrayStatus.status.cats_completed;
                    if (_that.arrayStatusCats == undefined) {
                        _that.arrayStatusCats = [0];
                    }
                    console.log('arrayStatusCats', _that.arrayStatusCats);

                    return cargaSemanas();
                } else {
                    return cargaSemanas();
                }
            });
        }

        return $.ajax();
    }


    // Semanas
    function cargaSemanas() {
        $.ajax({
            url: laURLTasks,
            // url: 'js/tasks.json',
            type: 'get',
            dataType: 'json',
            cache: false,
            success: pintaSemanas,
            async: true,
        });
    };

    function pintaSemanas(data) {
        console.log(data);
        dataWeeks = data;
        cuantasSemanas = Object.keys(dataWeeks.weeks).length;
        console.log('cuantasSemanas', cuantasSemanas);

        var contenidoSemanas = '';
        $('#lasSemanas').empty();

        // for (a = 1; a <= cuantasSemanas; a++) {
        //     contenidoSemanas += '<div class="row">';
        //     contenidoSemanas += '<div class="divider_linea"></div>';
        //     contenidoSemanas += '<div id="boton_semana' + a + '" class="boton_semana">' + Object.values(data.weeks)[(a - 1)] + '</div>';
        //     contenidoSemanas += '</div>';
        // }
        for (a = 1; a <= cuantasSemanas; a++) {
            contenidoSemanas += '<div id="boton_semana' + a + '" class="card card_semana boton_semana centrado">';
            contenidoSemanas += '<p>' + Object.values(dataWeeks.weeks)[(a - 1)].name + '</p>';
            // contenidoSemanas += '<img class="img_centrado" src="./img/' + Object.values(dataWeeks.weeks)[(a - 1)].icon + '.png"</>';
            contenidoSemanas += '</div>';
        }
        contenidoSemanas += '<br>';

        $('#lasSemanas').append(contenidoSemanas);

        $('.subname1_txt').text('Weeks');

        $('#divSemanas').hide();
        $('#divSemanas').fadeIn();




        if (back == 'conBack') {
            if (laSemana != undefined && laSemana != 0) {
                pintaCategorias(data);
            }
        }

        for (a = 1; a <= cuantasSemanas; a++) {
            // $("#boton_semana" + a).mouseover(function(event) {
            //     for (b = 1; b <= cuantasSemanas; b++) {
            //         $("#boton_semana" + b).css({
            //             'background-color': '#d0dcee'
            //         })
            //     }
            //     $("#boton_semana" + laSemanaSel).css({
            //         'background-color': '#d0dcee'
            //     })
            //     $(this).css({
            //         'background-color': '#e6edf9'
            //     })
            // });
            // $("#boton_semana" + a).mouseout(function(event) {
            //     $(this).css({
            //         'background-color': '#d0dcee'
            //     })
            //     $("#boton_semana" + laSemanaSel).css({
            //         'background-color': '#e6edf9'
            //     })
            // });
            $("#boton_semana" + a).click(function(event) {
                event.preventDefault();
                var cualSemana = parseInt($(this).attr('id').substr(12, 2));
                console.log('cualSemana', cualSemana);
                laSemanaSel = cualSemana;
                laSemana = cualSemana;
                laCategoria = 0;
                laCategoriaSel = 0;

                pintaCategorias(data);
            });
        }

        ajustaTamano();
        return $.ajax();
    }


    switch (elRol) {

        case 'Admin':
            $('#divSemanas').css({
                'margin-top': '140px'
            })

            leeUsuarios();
            break;

        case 'Coach':
            $('#divSemanas').css({
                'margin-top': '140px'
            });

            leeUsuarios();
            break;

        case 'IBP':
            $('#divSemanas').css({
                'margin-top': '130px'
            });

            leeStatus(usuarioId);
            break;

        default:
            break;
    }


    // pintaCategorias 
    function pintaCategorias(data) {
        console.log(data);

        $('#divSemanas').hide();
        $('#botonAtras').show();

        cuantasCats = Object.keys(data.weeks['week0' + laSemana].cats).length;
        console.log('cuantasCats', cuantasCats);


        for (a = 1; a <= cuantasSemanas; a++) {
            this['cuantasCategorias' + a] = Object.keys(Object.values(data.weeks['week0' + a].cats)).length;
            console.log('cuantasCategorias' + a, this['cuantasCategorias' + a]);

            for (b = 1; b <= this['cuantasCategorias' + a]; b++) {
                this['cuantasSubcategorias' + b] = Object.keys(Object.values(data.weeks['week0' + a].cats)[(b - 1)].subcats).length;
                console.log('cuantasSubcategorias' + b, this['cuantasSubcategorias' + b]);
            }
        }

        that = this;


        function loadCategoria(cualSemana) {
            console.log('loadCategoria', cualSemana);

            // $('#tituloCategorias').html(Object.values(dataWeeks.weeks)[(laSemana - 1)].name);

            var contenidoCategorias = '';
            $('#lasCategorias').empty();

            for (b = 1; b <= that['cuantasCategorias' + laSemana]; b++) {
                contenidoCategorias += '<div id="semana' + cualSemana + '_Categoria' + b + '" class="boton_categoria centrado">';
                contenidoCategorias += '<p>' + Object.values(data.weeks['week0' + laSemana].cats)[(b - 1)].name + '</p>';
                contenidoCategorias += '<img class="img_right" src="./img/' + Object.values(data.weeks['week0' + laSemana].cats)[(b - 1)].icon + '.png"</>';
                contenidoCategorias += '</div>';
            }
            // }
            // contenidoCategorias += '<br>';

            $('#lasCategorias').append(contenidoCategorias);

            $('.subname1_txt').text('Activities');


            for (a = 1; a <= cuantasSemanas; a++) {
                for (b = 1; b <= that['cuantasCategorias' + a]; b++) {

                    if ($.inArray('week' + laSemana + '_cat' + b, _that.arrayStatusCats) != -1) {
                        $("#semana" + laSemana + "_Categoria" + b).addClass('boton_completado');
                    }

                    $("#semana" + a + "_Categoria" + b).click(function(event) {
                        event.preventDefault();
                        var cualSemana = parseInt($(this).attr('id').substr(6, 1));
                        var cualCategoria = parseInt($(this).attr('id').substr(17, 2));
                        console.log('cualSemana', cualSemana, 'cualCategoria', cualCategoria);
                        laSemana = cualSemana;
                        laSemanaSel = cualSemana;
                        laCategoria = cualCategoria;
                        laCategoriaSel = cualCategoria;

                        loadSeccion('tasks');
                    });
                }
            }
        }


        if (laSemana != 0) {
            if (laCategoria != undefined || laCategoria != 0) {
                loadCategoria(laSemana);
                $('#divCategorias').hide();
                $('#divCategorias').fadeIn();
                ajustaTamano();
            }
        }

        // if (!isMobile) {
        //     var scrollHome = Scrollbar.init($('.seccion_home')[0]);
        // }
        ajustaTamano();
        return $.ajax();
    }



    // siempre carga por default 
    // laSemana = 1;
    // laSemanaSel = 1;
    laCategoria = 0;
    laCategoriaSel = 0;

}

$(document).ready(function() {

    // $(document).off('click', '#botonReporteStatus').on('click', '#botonReporteStatus', function (e) {
    // $("#botonReporteStatus").click(function (event) {
    //     event.preventDefault();
    //     descargaReporteStatus();
    // });

    // $(document).off('click', '#botonReporteDetail').on('click', '#botonReporteDetail', function (e) {

});