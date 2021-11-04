function activaSeccionHome() {
    console.log('seccionHome');
    var cuantasCats;
    var cuantosTools = 17;

    ajustaTamano();

    if (elRol == 'IBP') {
        $('#buscadorIBP').hide();
        $('#divSelectPar').hide();
    }
    if (elRol == 'Coach') {
        habilitaBoton($('#botonReporteStatus'), false);
        habilitaBoton($('#botonReporteDetail'), false);
    }
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


        // $("#elSelectPar").keyup(function () {
        //     if ($(this).val().length > 2) {
        //         // console.log("buscando ok", $(this).val());

        //         for (a = 0; a < cuantosUsuarios; a++) {
        //             if (that['usuarioId' + a].toLowerCase().includes($(this).val().toLowerCase()) ||
        //                 that['usuarioName' + a].toLowerCase().includes($(this).val().toLowerCase())) {
        //                 console.log('Encontré la palabra', $(this).val(), 'con el recurso', that['usuarioName' + a], a);
        //                 seleccionaUsuario(that['usuarioName' + a], that['usuarioId' + a]);
        //                 // return;
        //             } else {
        //                 console.log('No encontré nada');
        //                 $('#divSemanas').hide();
        //                 $('#divCategorias').hide();
        //             }
        //         }
        //     } else {
        //         $('#divSemanas').hide();
        //         $('#divCategorias').hide();
        //     }
        // });

        // $("#buscadorClean").click(function (e) {
        //     e.preventDefault();
        //     $("#elSelectPar").val('');
        //     $("#elSelectPar").keyup();
        // });


        $("select").select2();

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
            laSemana = 1;
            laSemanaSel = 1;
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
            url: 'js/tasks.json',
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
            contenidoSemanas += '<p>' + Object.values(dataWeeks.weeks)[(a - 1)].name + '</p>';

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
            pintaCategorias(data);
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
            break;

        case 'Coach':
            leeUsuarios();
            break;

        case 'IBP':
            $('#divSemanas, #flechaAbajoSemanas').hide();
            $('#divSemanas, #flechaAbajoSemanas').fadeIn();
            leeStatus(usuarioId);
            break;

        default:
            break;
    }


    // pintaCategorias 
    function pintaCategorias(data) {
        console.log(data);

        cuantasCats = Object.keys(data.weeks['week' + laSemana].cats).length;
        console.log('cuantasCats', cuantasCats);


        for (a = 1; a <= cuantasSemanas; a++) {
            this['cuantasCategorias' + a] = Object.keys(Object.values(data.weeks['week' + a].cats)).length;
            console.log('cuantasCategorias' + a, this['cuantasCategorias' + a]);

            for (b = 1; b <= this['cuantasCategorias' + a]; b++) {
                this['cuantasSubcategorias' + b] = Object.keys(Object.values(data.weeks['week' + a].cats)[(b - 1)].subcats).length;
                console.log('cuantasSubcategorias' + b, this['cuantasSubcategorias' + b]);
            }
        }


        that = this;


        // var contenidoDias = '';
        // $('#losDias').empty();

        // for (a = 1; a <= cuantasCats; a++) {
        //     contenidoDias += '<div id="cardDia' + a + '" class="card card_dia boton_dia">';
        //     contenidoDias += '<p>' + Object.values(data['week' + laSemana])[(a - 1)].short_txt + '</p>';
        //     contenidoDias += '<img src="./img/' + Object.values(data['week' + laSemana])[(a - 1)].icon + '.png" />';
        //     contenidoDias += '</div>';
        // }
        // $('#losDias').append(contenidoDias);

        // $('#divDias, #flechaAbajoDias').hide();
        // $('#divDias, #flechaAbajoSemanas').fadeIn();
        // $('#divCategorias').hide();





        for (b = 1; b <= cuantasSemanas; b++) {
            $("#boton_semana" + b).css({
                'background-color': 'transparent'
            })
        }
        $("#boton_semana" + laSemana).css({
            'background-color': '#eeeeee'
        })


        function loadCategoria(cualSemana) {
            console.log('loadCategoria', cualSemana);

            $('#tituloCategorias').html(Object.values(dataWeeks.weeks)[(laSemana - 1)].name);

            var contenidoCategorias = '';
            $('#lasCategorias').empty();

            for (b = 1; b <= that['cuantasCategorias' + laSemana]; b++) {
                contenidoCategorias += '<div id="semana' + cualSemana + '_Categoria' + b + '" class="boton_categoria centrado">';
                contenidoCategorias += '<img class="img_centrado" src="./img/' + Object.values(data.weeks['week' + laSemana].cats)[(b - 1)].icon + '.png"</>';
                contenidoCategorias += '<p>' + Object.values(data.weeks['week' + laSemana].cats)[(b - 1)].name + '</p>';
                contenidoCategorias += '</div>';
            }
            // }
            contenidoCategorias += '<br>';

            $('#lasCategorias').append(contenidoCategorias);


            for (a = 1; a <= cuantasSemanas; a++) {
                for (b = 1; b <= that['cuantasCategorias' + a]; b++) {
                    $("#semana" + a + "_Categoria" + b).css({
                        'background-color': 'transparent'
                    })
                }
            }
            $("#semana" + laSemana + "_Categoria" + laCategoria).css({
                'background-color': '#eeeeee'
            })


            for (a = 1; a <= cuantasSemanas; a++) {
                for (b = 1; b <= that['cuantasCategorias' + a]; b++) {

                    if ($.inArray('week' + laSemana + '_cat' + b, _that.arrayStatusCats) != -1) {
                        $("#semana" + laSemana + "_Categoria" + b + " p").css({
                            'background-color': '#c9fda8',
                            'border-radius': '50px',
                            'width': '80%',
                            'margin-left': 'auto',
                            'margin-right': 'auto'
                        })
                    }


                    $("#semana" + a + "_Categoria" + b).mouseover(function (event) {
                        for (c = 1; c <= cuantasSemanas; c++) {
                            for (d = 1; d <= that['cuantasCategorias' + c]; d++) {
                                $("#semana" + c + "_Categoria" + d).css({
                                    'background-color': 'transparent'
                                })
                            }
                        }
                        $("#semana" + laSemanaSel + "_Categoria" + laCategoriaSel).css({
                            'background-color': '#eeeeee'
                        })
                        $(this).css({
                            'background-color': '#eeeeee'
                        })
                    });
                    $("#semana" + a + "_Categoria" + b).mouseout(function (event) {
                        $(this).css({
                            'background-color': 'transparent'
                        })
                        $("#semana" + laSemanaSel + "_Categoria" + laCategoriaSel).css({
                            'background-color': '#eeeeee'
                        })
                    });
                    $("#semana" + a + "_Categoria" + b).click(function (event) {
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

        // for (a = 1; a <= cuantasCats; a++) {
        //     $("#cardDia" + a).mouseover(function (event) {
        //         for (b = 1; b <= cuantasCats; b++) {
        //             $("#cardDia" + b).css({
        //                 'background-color': 'transparent'
        //             })
        //         }
        //         $("#cardDia" + elDiaSel).css({
        //             'background-color': '#eeeeee'
        //         })
        //         $(this).css({
        //             'background-color': '#eeeeee'
        //         })
        //     });
        //     $("#cardDia" + a).mouseout(function (event) {
        //         $(this).css({
        //             'background-color': 'transparent'
        //         })
        //         $("#cardDia" + elDiaSel).css({
        //             'background-color': '#eeeeee'
        //         })
        //     });
        //     $("#cardDia" + a).click(function (event) {
        //         event.preventDefault();
        //         var cualDia = parseInt($(this).attr('id').substr(7, 2));
        //         console.log('cualDia', cualDia);
        //         elDia = cualDia;
        //         elDiaSel = cualDia;
        //         laCategoria = 0;

        //         laCategoriaSel = 0;
        //         loadCategoria(laSemana);
        //         $('#divCategorias').hide();
        //         $('#divCategorias, #flechaAbajoDias').fadeIn();
        //         ajustaTamano();
        //     });
        // }

        if (laSemana != 0) {
            if (laCategoria != undefined || laCategoria != 0) {
                loadCategoria(laSemana);
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


    function descargaTool(cualTool) {
        console.log('descargaTool', cualTool);

        switch (cualTool) {
            case 1:
                window.open('docs/Distribution_Agreement.pptx');
                break;
            case 2:
                window.open('docs/Handheld_(HHC).pdf');
                break;
            case 3:
                window.open('docs/ION_Coaching.pptx');
                break;
            case 4:
                window.open('docs/ION_SetUp.pptx');
                break;
            case 5:
                window.open('docs/Merchandising_Best_Practices.mov');
                break;
            case 6:
                // window.open('docs/Distribution_Agreement.pptx');
                break;
            case 7:
                // window.open('docs/Distribution_Agreement.pptx');
                break;
            case 8:
                // window.open('docs/Distribution_Agreement.pptx');
                break;
            case 9:
                // window.open('docs/Distribution_Agreement.pptx');
                break;
            case 10:
                // window.open('docs/Distribution_Agreement.pptx');
                break;
            case 11:
                // window.open('docs/Distribution_Agreement.pptx');
                break;
            case 12:
                window.open('docs/Merchandising_SaraLee.mov');
                break;
            case 13:
                // window.open('docs/Distribution_Agreement.pptx');
                break;
            case 14:
                window.open('docs/Merchandising_Thomas.mov');
                break;
            case 15:
                window.open('docs/Safe_Carry_Over_(SCO).pptx');
                break;
            case 16:
                window.open('docs/Scan_Based_Trading_(SBT).pptx');
                break;
            case 17:
                window.open('docs/SETTLEMENT.pptx');
                break;

            default:
                break;
        }

    }




    $("#botonReporteStatus").click(function (event) {
        // descargaReporteStatus();
    });

    $("#botonReporteDetail").click(function (event) {
        // descargaReporteDetalle();
    });

    // tools
    for (a = 1; a <= cuantosTools; a++) {
        $("#botonTool" + a).click(function (event) {
            event.preventDefault();
            var cualBotonTool = parseInt($(this).attr('id').substr(9, 2));
            console.log('cualBotonTool', cualBotonTool);

            descargaTool(cualBotonTool);
        });
    }


    // siempre carga por default 
    laSemana = 1;
    laSemanaSel = 1;
    laCategoria = 0;
    laCategoriaSel = 0;

}