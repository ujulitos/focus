function activaSeccionHome() {
    console.log('seccionHome');
    var cuantosDias;

    ajustaTamano();

    // if (elRol == 'IBP') {
    $('#divSelectPar').hide();
    $('#divReportes').hide();
    // }
    // $('#divSemanas, #flechaAbajoSemanas, #flechaAbajoDias').show();

    function leeUsuarios() {

        if (revisaConexion) {
            firebase.database().ref(laUrlBase + 'Usuarios').once('value').then(function (snapshot) {
                if (snapshot.val() != null) {
                    var contadorUsuarios = 0;
                    cuantosUsuarios = 0;
                    console.log('-----------------------');

                    snapshot.forEach(function (childSnapshot) {
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

        $('#elSelectPar').empty();
        $('#elSelectPar').append('<option value=" " selected disabled>Select IBP</option>');
        for (a = 0; a < cuantosUsuarios; a++) {
            dataSet[a] = [that['usuarioId' + a], that['usuarioName' + a]];
            $('#elSelectPar').append('<option value="' + [that['usuarioId' + a]] + '">' + [that['usuarioName' + a]] + '</option>');
        }
        console.log('dataSet', dataSet);

        $('#elSelectPar').on('change', function () {
            var elPar = $("#elSelectPar :selected").text();
            var elParID = $("#elSelectPar :selected").val();
            seleccionaUsuario(elPar, elParID);
        });

        if (usuarioSeleccionadoId != undefined || usuarioSeleccionadoId != null) {
            $('#elSelectPar').val(usuarioSeleccionadoId).change();
        }
        console.log('usuarioSeleccionadoId', usuarioSeleccionadoId);

    }


    function seleccionaUsuario(cualUsuario, cualUsuarioId) {
        console.log('seleccionaUsuario', cualUsuario, cualUsuarioId);

        if (cualUsuarioId != usuarioSeleccionadoId) {
            laSemana = 0;
            laSemanaSel = 0;
            $('#divDias').hide();
            $('#flechaAbajoDias').hide();
            $('#divCategorias').hide();
        }
        usuarioSeleccionado = cualUsuario;
        usuarioSeleccionadoId = cualUsuarioId;

        $('#divReportes').hide();
        // $('#divReportes').fadeIn();
        $('#divSemanas, #flechaAbajoSemanas, #flechaAbajoDias').hide();
        $('#divSemanas').fadeIn();

        return leeStatus(usuarioSeleccionadoId);
    }

    function leeStatus(cualUsuarioId) {
        console.log('leeStatus', cualUsuarioId, elRol);

        if (revisaConexion) {
            firebase.database().ref(laUrlBase + 'Usuarios/' + cualUsuarioId + '/Registro').once('value').then(function (snapshot) {
                if (snapshot.val() != null) {

                    arrayStatus = snapshot.val();
                    console.log('arrayStatus', arrayStatus);

                    _that['arrayStatusWeeks' + el_sub] = arrayStatus['status' + el_sub].weeks_completed;
                    console.log('arrayStatusWeeks', el_sub, _that['arrayStatusWeeks' + el_sub]);

                    _that['arrayStatusDays' + el_sub] = arrayStatus['status' + el_sub].days_completed;
                    console.log('arrayStatusDays', el_sub, _that['arrayStatusDays' + el_sub]);

                    _that['arrayStatusCats' + el_sub] = arrayStatus['status' + el_sub].cats_completed;
                    if (_that['arrayStatusCats' + el_sub] == undefined) {
                        _that['arrayStatusCats' + el_sub] = [0];
                    }
                    console.log('arrayStatusCats', el_sub, _that['arrayStatusCats' + el_sub]);

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
            url: 'js/semanas.json',
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
            contenidoSemanas += '<div id="boton_semana' + a + '" class="card card_semana boton_semana">';
            contenidoSemanas += '<p>' + Object.values(dataWeeks.weeks)[(a - 1)] + '</p>';
            contenidoSemanas += '</div>';
        }

        $('#lasSemanas').append(contenidoSemanas);

        $('.carousel_semanas').owlCarousel('destroy');
        $(".carousel_semanas").owlCarousel({
            items: 2,
            margin: 0,
            loop: false,
            nav: true,
            dots: true
        });

        if (laSemana != undefined && laSemana != 0) {
            cargaDias();
        }

        for (a = 1; a <= cuantasSemanas; a++) {
            $("#boton_semana" + a).mouseover(function (event) {
                for (b = 1; b <= cuantasSemanas; b++) {
                    $("#boton_semana" + b).css({
                        'background-color': 'transparent'
                    })
                }
                $("#boton_semana" + laSemanaSel).css({
                    'background-color': '#eeeeee'
                })
                $(this).css({
                    'background-color': '#eeeeee'
                })
            });
            $("#boton_semana" + a).mouseout(function (event) {
                $(this).css({
                    'background-color': 'transparent'
                })
                $("#boton_semana" + laSemanaSel).css({
                    'background-color': '#eeeeee'
                })
            });
            $("#boton_semana" + a).click(function (event) {
                event.preventDefault();
                var cualSemana = parseInt($(this).attr('id').substr(12, 2));
                console.log('cualSemana', cualSemana);
                laSemanaSel = cualSemana;
                laSemana = cualSemana;
                elDia = 0;
                elDiaSel = 0;
                laCategoria = 0;
                laCategoriaSel = 0;

                cargaDias();
            });
        }

        ajustaTamano();
        return $.ajax();
    }


    switch (elRol) {

        case 'Coach':
            el_sub = '_coach';
            el_sub_par = '_ibp';
            leeUsuarios();
            break;

        case 'IBP':
            $('#divSemanas, #flechaAbajoSemanas').hide();
            $('#divSemanas, #flechaAbajoSemanas').fadeIn();
            el_sub = '_ibp';
            el_sub_par = '_coach';
            leeStatus(usuarioId);
            break;

        default:
            break;
    }



    // $(document).off('click', '#boton_semana1').on('click', '#boton_semana1', function(e) {
    //     event.preventDefault();
    //     var cualSemana = parseInt($(this).attr('id').substr(12, 2));
    //     console.log('cualSemana', cualSemana);
    //     laSemana = cualSemana;

    //     loadSeccion('dias');
    // });

    // Dias
    function cargaDias() {
        $.ajax({
            url: 'js/week' + laSemana + '.json',
            type: 'get',
            dataType: 'json',
            cache: false,
            success: pintaDias,
            async: true,
        });
    };

    function pintaDias(data) {
        console.log(data);

        cuantosDias = Object.keys(data['week' + laSemana]).length;
        console.log('cuantosDias', cuantosDias);

        for (a = 1; a <= cuantosDias; a++) {
            this['cuantasCategorias' + a] = Object.keys(Object.values(data['week' + laSemana])[(a - 1)].cats).length;
            console.log('cuantasCategorias' + a, this['cuantasCategorias' + a]);
        }
        that = this;


        var contenidoDias = '';
        $('#losDias').empty();

        for (a = 1; a <= cuantosDias; a++) {
            contenidoDias += '<div id="cardDia' + a + '" class="card card_dia boton_dia">';
            contenidoDias += '<p>' + Object.values(data['week' + laSemana])[(a - 1)].short_txt + '</p>';
            contenidoDias += '<img src="./img/' + Object.values(data['week' + laSemana])[(a - 1)].icon + '.png" />';
            contenidoDias += '</div>';
        }
        $('#losDias').append(contenidoDias);

        $('#divDias, #flechaAbajoDias').hide();
        $('#divDias, #flechaAbajoSemanas').fadeIn();
        $('#divCategorias').hide();


        $('.carousel_dias').owlCarousel('destroy');
        $(".carousel_dias").owlCarousel({
            items: 2,
            margin: 0,
            loop: false,
            nav: true,
            dots: true
        });
        $('.carousel_dias').css({
            'opacity': '1'
        })


        for (b = 1; b <= cuantasSemanas; b++) {
            $("#boton_semana" + b).css({
                'background-color': 'transparent'
            })
        }
        $("#boton_semana" + laSemana).css({
            'background-color': '#eeeeee'
        })


        function loadCategoria(cualCategoria) {
            console.log('loadCategoria', cualCategoria);

            var contenidoCategorias = '';
            $('#lasCategorias').empty();

            elDiaTotal = Object.values(data['week' + laSemana])[(elDia - 1)].short_txt.split(':')[0];
            // console.log('elDiaTotal', elDiaTotal);

            for (b = 1; b <= that['cuantasCategorias' + cualCategoria]; b++) {
                contenidoCategorias += '<div id="dia' + cualCategoria + '_Categoria' + b + '" class="boton_categoria centrado">';
                contenidoCategorias += '<p>' + Object.values(Object.values(data['week' + laSemana])[(cualCategoria - 1)].cats)[(b - 1)].cat_txt + '</p>';
                contenidoCategorias += '<img class="img_centrado" src="./img/' + Object.values(Object.values(data['week' + laSemana])[(cualCategoria - 1)].cats)[(b - 1)].cat_icon + '.png"</>';
                contenidoCategorias += '</div>';
            }
            // }
            contenidoCategorias += '<br>';

            $('#lasCategorias').append(contenidoCategorias);


            for (b = 1; b <= cuantosDias; b++) {
                $("#cardDia" + b).css({
                    'background-color': 'transparent'
                })
            }
            $("#cardDia" + elDia).css({
                'background-color': '#eeeeee'
            })


            for (a = 1; a <= cuantosDias; a++) {
                for (b = 1; b <= that['cuantasCategorias' + a]; b++) {
                    $("#dia" + a + "_Categoria" + b).css({
                        'background-color': 'transparent'
                    })
                }
            }
            $("#dia" + elDia + "_Categoria" + laCategoria).css({
                'background-color': '#eeeeee'
            })


            for (a = 1; a <= cuantosDias; a++) {
                for (b = 1; b <= that['cuantasCategorias' + a]; b++) {

                    if ($.inArray('week' + laSemana + '_day' + elDia + '_cat' + b, _that['arrayStatusCats' + el_sub]) != -1) {
                        $("#dia" + elDia + "_Categoria" + b + " p").css({
                            'background-color': '#c9fda8',
                            'border-radius': '50px',
                            'width': '80%',
                            'margin-left': 'auto',
                            'margin-right': 'auto'
                        })
                    }


                    $("#dia" + a + "_Categoria" + b).mouseover(function (event) {
                        for (c = 1; c <= cuantosDias; c++) {
                            for (d = 1; d <= that['cuantasCategorias' + c]; d++) {
                                $("#dia" + c + "_Categoria" + d).css({
                                    'background-color': 'transparent'
                                })
                            }
                        }
                        $("#dia" + elDiaSel + "_Categoria" + laCategoriaSel).css({
                            'background-color': '#eeeeee'
                        })
                        $(this).css({
                            'background-color': '#eeeeee'
                        })
                    });
                    $("#dia" + a + "_Categoria" + b).mouseout(function (event) {
                        $(this).css({
                            'background-color': 'transparent'
                        })
                        $("#dia" + elDiaSel + "_Categoria" + laCategoriaSel).css({
                            'background-color': '#eeeeee'
                        })
                    });
                    $("#dia" + a + "_Categoria" + b).click(function (event) {
                        event.preventDefault();
                        var cualDia = parseInt($(this).attr('id').substr(3, 1));
                        var cualCategoria = parseInt($(this).attr('id').substr(14, 2));
                        console.log('cualDia', cualDia, 'cualCategoria', cualCategoria);
                        elDia = cualDia;
                        elDiaSel = cualDia;
                        laCategoria = cualCategoria;
                        laCategoriaSel = cualCategoria;

                        loadSeccion('tasks');
                    });
                }
            }

        }

        for (a = 1; a <= cuantosDias; a++) {
            $("#cardDia" + a).mouseover(function (event) {
                for (b = 1; b <= cuantosDias; b++) {
                    $("#cardDia" + b).css({
                        'background-color': 'transparent'
                    })
                }
                $("#cardDia" + elDiaSel).css({
                    'background-color': '#eeeeee'
                })
                $(this).css({
                    'background-color': '#eeeeee'
                })
            });
            $("#cardDia" + a).mouseout(function (event) {
                $(this).css({
                    'background-color': 'transparent'
                })
                $("#cardDia" + elDiaSel).css({
                    'background-color': '#eeeeee'
                })
            });
            $("#cardDia" + a).click(function (event) {
                event.preventDefault();
                var cualDia = parseInt($(this).attr('id').substr(7, 2));
                console.log('cualDia', cualDia);
                elDia = cualDia;
                elDiaSel = cualDia;
                laCategoria = 0;

                laCategoriaSel = 0;
                loadCategoria(elDia);
                $('#divCategorias').hide();
                $('#divCategorias, #flechaAbajoDias').fadeIn();
                ajustaTamano();
            });
        }

        if (elDia != 0) {
            if (laCategoria != undefined || laCategoria != 0) {
                loadCategoria(elDia);
                $('#divCategorias').hide();
                $('#divCategorias, #flechaAbajoDias').fadeIn();
                ajustaTamano();
            }
        }

        if (!isMobile) {
            var scrollHome = Scrollbar.init($('.seccion_home')[0]);
        }
        ajustaTamano();
        return $.ajax();
    }


    $("#botonReporteStatus").click(function (event) {
        // $(document).off('click', '#botonReporteStatus').on('click', '#botonReporteStatus', function(e) {
        //   event.preventDefault();
        // window.location.href = 'docs/Onboarding_Status_Report.xlsx';
        descargaReporteStatus();
    });

    $("#botonReporteDetail").click(function (event) {
        //  $(document).off('click', '#botonReporteDetail').on('click', '#botonReporteDetail', function(e) {
        //   event.preventDefault();
        // window.location.href = 'docs/Onboarding_Detailed_Report.xlsx';
        descargaReporteDetalle();
    });


    // siempre carga por default 
    laSemana = 1;
    laSemanaSel = 1;
    elDia = 1;
    elDiaSel = 1;
    laCategoria = 1;
    laCategoriaSel = 1;

}