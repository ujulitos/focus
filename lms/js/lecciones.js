var contadorLeccionesVisbles;
var leccionesContadorBuscarRecurso;
var leccionesContadorRecursosTotal;
var elNumLeccion;
var cuantosModulos;
var ordenModulos;
var elNumModulo;
var ordenRecursos;
var cualLeccion;
var laLeccion;
var idLeccion;
var that;
var thas;

var listadoFactores;
var losFactores = new Array();
var losGrupos = new Array();
var lasCompetencias = new Array();
var maximoCompetencias = 5;
var factorSeleccionado;
var grupoSeleccionado;
var competenciaSeleccionada;
var maximoNiveles = 10;
var cuantosNivelesHay = 1;
var maximoPuntosNiveles = 0;
var emaximoPuntosNiveles = 0;
var puntosDispNiveles = 0;
var ePuntosDispNiveles = 0;



function activaSecLecciones() {
    console.log('activaSecLecciones');


    $('.panel-header div h3').html('Ambientes de Aprendizaje');
    $('#subtituloSeccion').html('');

    $(".select2").select2();

    //AddAA
    cleanAddAmbienteAprendizaje();
    $("#aanombre").click(function() {
        $(".txError, #errorComp").addClass("ocultar");
    });
    $("#aanombre").change(function() {
        $(".txError, #errorComp").addClass("ocultar");
    });
    $("#btnAddAmbienteAprendizaje").click(function() {
        addAmbienteAprendizaje();
    });
    //AddAA

    //EditAA
    _cleanAddAmbienteAprendizaje();
    $("#_aanombre").click(function() {
        $(".txError, #errorComp").addClass("ocultar");
    });
    $("#_aanombre").change(function() {
        $(".txError, #errorComp").addClass("ocultar");
    });
    $("#btnEditarAmbienteAprendizaje").click(function() {
        editarAmbienteAprendizaje();
    });
    //EditAA

    //AddModuloAA
    cleanAddModuloAA();
    $("#mnombre, #orden").click(function() {
        $(".txError").addClass("ocultar");
    });
    $("#mnombre, #orden").change(function() {
        $(".txError").addClass("ocultar");
    });

    $("#btnAddModuloAA").click(function() {
        addModuloAA();
    });
    //AddModuloAA
    cleanAddModuloAA();
    $("#_mnombre, #_orden").click(function() {
        $(".txError").addClass("ocultar");
    });
    $("#_mnombre, #_orden").change(function() {
        $(".txError").addClass("ocultar");
    });

    $("#btnEditarModuloAA").click(function() {
        UpdateModuloAA();
    });



    //AddRecursoenModuloAA
    cargarInsigniasFromDirectory();
    // cargarNivelesFromDirectory();
    cleanAddRecursoEnModuloAA();

    $("#divPromediable").fadeOut();
    $("#promediable").click(function() {
        if (!$("#promediable").hasClass('active')) {
            // cleanPromediable();
            $("#divPromediable").fadeIn();
        } else {
            $("#divPromediable").fadeOut();
            // cleanPromediable();
        }
    });

    // $("#_divPromediable").fadeToggle();
    $("#_promediable").click(function() {
        if (!$("#_promediable").hasClass('active')) {
            // cleanPromediable();
            $("#_divPromediable").fadeIn();
        } else {
            $("#_divPromediable").fadeOut();
            // cleanPromediable();
        }
    });

    $("#_insignia").click(function() {
        if (!$("#_insignia").hasClass('active')) {
            _cleanInsignia();
            $("#_divInsignia").removeClass('ocultar');
        } else {
            $("#_divInsignia").addClass('ocultar');
            _cleanInsignia();
        }
    });

    $("#insignia").click(function() {
        if (!$("#insignia").hasClass('active')) {
            cleanInsignia();
            $("#divInsignia").removeClass('ocultar');
        } else {
            $("#divInsignia").addClass('ocultar');
            cleanInsignia();
        }
    });
    $("#_insignia").click(function() {
        if (!$("#_insignia").hasClass('active')) {
            _cleanInsignia();
            $("#_divInsignia").removeClass('ocultar');
        } else {
            $("#_divInsignia").addClass('ocultar');
            _cleanInsignia();
        }
    });

    $("#otorgada").click(function() {
        $("#insg_calif_min, #insg_tmp_min, #insigniaCon").fadeToggle();

    });

    $("#_otorgada").click(function() {
        $("#_insg_calif_min, #_insg_tmp_min, #insigniaCon_edit").fadeToggle();
    });

    //
    $("#insigniaCon").click(function() {
        // cambio1();
        if ($(".btn-insg_con").hasClass('active')) {
            console.log("Con calificación mínima");
            $("#insigniaTiempoMinima , #_insigniaTiempoMinima").attr('disabled', 'disabled');
            $("#insigniaCalificacionMinima, #_insigniaCalificacionMinima").removeAttr('disabled', 'disabled');

        } else {

            console.log("Con tiempo mínimo t");
            $("#insigniaTiempoMinima, #_insigniaTiempoMinima").removeAttr('disabled', 'disabled');
            $("#insigniaCalificacionMinima,  #_insigniaCalificacionMinima").attr('disabled', 'disabled');

        }


    });

    $("#insigniaCon_edit").click(function() {
        if ($(".btn-insg_con").hasClass('active')) {
            console.log("Con calificación mínima");
            $("#_insigniaTiempoMinima").attr('disabled', 'disabled');
            $("#_insigniaCalificacionMinima").removeAttr('disabled', 'disabled');

        } else {

            console.log("Con tiempo mínimo t");
            $("#_insigniaTiempoMinima").removeAttr('disabled', 'disabled');
            $("#_insigniaCalificacionMinima").attr('disabled', 'disabled');

        }


    });





    $("#buscadorLecciones").keyup(function() {
        if ($(this).val().length > 2) {
            // console.log("buscando ok", $(this).val());

            for (b = 1; b <= contadorLeccionesVisbles; b++) {
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
            for (b = 1; b <= contadorLeccionesVisbles; b++) {
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
        $("#buscadorLecciones").val('');
        $("#buscadorLecciones").keyup();
    });




    loadRecursosenModuloAA();
    /*
    $("#insigniaImagen").change(function(){
        readURLInsignia(this);
    });
    */

    // $("#insigniaOtorgada").click(function () {
    //     $("#sinsigniaOtorgada").addClass("ocultar");
    // });
    // $("#insigniaOtorgada").change(function () {
    //     $("#sinsigniaOtorgada").addClass("ocultar");
    // });



    $("#insigniaTipo").click(function() {
        $("#sinsigniaTipo").addClass("ocultar");
    });
    $("#insigniaTipo").change(function() {
        $("#sinsigniaTipo").addClass("ocultar");
    });

    $("#insigniaTiempoMinima").click(function() {
        $("#sinsigniaTiempoMinima").addClass("ocultar");
    });
    $("#insigniaTiempoMinima").change(function() {
        $("#sinsigniaTiempoMinima").addClass("ocultar");
    });

    $("#insigniaCalificacionMinima").click(function() {
        $("#sinsigniaCalificacionMinima").addClass("ocultar");
    });
    $("#insigniaCalificacionMinima").change(function() {
        $("#sinsigniaCalificacionMinima").addClass("ocultar");
    });

    $("#insigniaPuntos").click(function() {
        $("#sinsigniaPuntos").addClass("ocultar");
    });
    $("#insigniaPuntos").change(function() {
        $("#sinsigniaPuntos").addClass("ocultar");
    });

    $("#insigniaNombre").click(function() {
        $("#sinsigniaNombre").addClass("ocultar");
    });
    $("#insigniaNombre").change(function() {
        $("#sinsigniaNombre").addClass("ocultar");
    });
    /*
    $("#insigniaImagen").click(function(){
        $("#sinsigniaImagen").addClass("ocultar");
    });
    $("#insigniaImagen").change(function(){
        $("#sinsigniaImagen").addClass("ocultar");
    });*/

    $("#porciento").click(function() {
        $("#sporciento").addClass("ocultar");
        3
    });
    $("#porciento").change(function() {
        $("#sporciento").addClass("ocultar");
    });

    $("#puntos").click(function() {
        $("#spuntos").addClass("ocultar");
    });
    $("#puntos").change(function() {
        $("#spuntos").addClass("ocultar");
    });



    //AddRecursoenModuloAA

    //EditRecursoenModuloAA


    // $("#_insigniaOtorgada").click(function () {
    //     $("#_sinsigniaOtorgada").addClass("ocultar");
    // });
    // $("#_insigniaOtorgada").change(function () {
    //     $("#_sinsigniaOtorgada").addClass("ocultar");
    // });



    $("#_insigniaTipo").click(function() {
        $("#_sinsigniaTipo").addClass("ocultar");
    });
    $("#_insigniaTipo").change(function() {
        $("#_sinsigniaTipo").addClass("ocultar");
    });

    $("#_insigniaTiempoMinima").click(function() {
        $("#_sinsigniaTiempoMinima").addClass("ocultar");
    });
    $("#insigniaTiempoMinima").change(function() {
        $("#sinsigniaTiempoMinima").addClass("ocultar");
    });

    $("#_insigniaCalificacionMinima").click(function() {
        $("#_sinsigniaCalificacionMinima").addClass("ocultar");
    });
    $("#_insigniaCalificacionMinima").change(function() {
        $("#_sinsigniaCalificacionMinima").addClass("ocultar");
    });

    $("#_insigniaPuntos").click(function() {
        $("#_sinsigniaPuntos").addClass("ocultar");
    });
    $("#_insigniaPuntos").change(function() {
        $("#_sinsigniaPuntos").addClass("ocultar");
    });

    $("#_insigniaNombre").click(function() {
        $("#_sinsigniaNombre").addClass("ocultar");
    });
    $("#_insigniaNombre").change(function() {
        $("#_sinsigniaNombre").addClass("ocultar");
    });
    /*
    $("#insigniaImagen").click(function(){
        $("#sinsigniaImagen").addClass("ocultar");
    });
    $("#insigniaImagen").change(function(){
        $("#sinsigniaImagen").addClass("ocultar");
    });*/

    $("#_porciento").click(function() {
        $("#_sporciento").addClass("ocultar");
    });
    $("#_porciento").change(function() {
        $("#_sporciento").addClass("ocultar");
    });

    $("#_puntos").click(function() {
        $("#_spuntos").addClass("ocultar");
    });
    $("#_puntos").change(function() {
        $("#_spuntos").addClass("ocultar");
    });
    // $("#btnEditRecurso").click(function() {
    //     var recursoAnterior = $("#_sRecursoID").val();
    //     UpdateRecursoEnModuloAA(recursoAnterior);
    // });
    //EditRecursoenModuloAA




    // Competencias Add
    $("#rCompetencias").click(function() {
        if (!$("#rCompetencias").hasClass('active')) {
            console.log("Si competencias");
            // $(".comp").val('');
            $(".competencia1, .bloqbotonadd, #addComp").removeClass("ocultar");
            limpiaCompetencia(0);
        } else {
            console.log("No competencias");
            $(".competencia1, .competencia2, .competencia3, .competencia4, .competencia5, .bloqbotonadd").addClass("ocultar");
            // limpiaCompetencia(0);
        }
    });
    $("#del1").click(function() {
        $(".competencia1 .comp").val("");
        $(".competencia1").addClass("ocultar");
        $("#addComp").removeClass("ocultar");
        EsLaUltimaAdd();
    });
    $("#del2").click(function() {
        $(".competencia2 .comp").val("");
        $(".competencia2").addClass("ocultar");
        $("#addComp").removeClass("ocultar");
        EsLaUltimaAdd();
    });
    $("#del3").click(function() {
        $(".competencia3 .comp").val("");
        $(".competencia3").addClass("ocultar");
        $("#addComp").removeClass("ocultar");
        EsLaUltimaAdd();
    });
    $("#del4").click(function() {
        $(".competencia4 .comp").val("");
        $(".competencia4").addClass("ocultar");
        $("#addComp").removeClass("ocultar");
        EsLaUltimaAdd();
    });
    $("#del5").click(function() {
        $(".competencia5 .comp").val("");
        $(".competencia5").addClass("ocultar");
        $("#addComp").removeClass("ocultar");
        EsLaUltimaAdd();
    });

    $("#addComp").click(function() {
        if ($(".competencia1").hasClass('ocultar')) {
            $(".competencia1").removeClass('ocultar');
        } else if ($(".competencia2").hasClass('ocultar')) {
            $(".competencia2").removeClass('ocultar');
        } else if ($(".competencia3").hasClass('ocultar')) {
            $(".competencia3").removeClass('ocultar');
        } else if ($(".competencia4").hasClass('ocultar')) {
            $(".competencia4").removeClass('ocultar');
        } else if ($(".competencia5").hasClass('ocultar')) {
            $(".competencia5").removeClass('ocultar');
            $("#addComp").addClass("ocultar");
        } else {
            $("#rError").html("Se pueden agregar 5 competencias como máximo").removeClass('ocultar');
        }
    });

    function EsLaUltimaAdd() {
        var ultima = $(".competencia1").hasClass('ocultar') && $(".competencia2").hasClass('ocultar') &&
            $(".competencia3").hasClass('ocultar') && $(".competencia4").hasClass('ocultar') &&
            $(".competencia5").hasClass('ocultar');
        if (ultima) {
            $("#rCompetencias").removeClass('active');
            $(".bloqbotonadd").addClass("ocultar");
        }
    }


    // Competencias Edit
    $("#erCompetencias").click(function() {
        if (!$("#erCompetencias").hasClass('active')) {
            console.log("Si competencias");
            // $(".e_comp").val('');
            $(".e_competencia1, .ebloqbotonadd, #eaddComp").removeClass("ocultar");
            limpiaCompetencia(0);
        } else {
            console.log("No competencias");
            $(".e_competencia1, .e_competencia2, .e_competencia3, .e_competencia4, .e_competencia5,.ebloqbotonadd").addClass("ocultar");
            // $(".e_comp").val('');
        }
    });
    $("#e_del1").click(function() {
        $(".e_competencia1 .e_comp").val('');
        $(".e_competencia1").addClass("ocultar");
        $("#eaddComp").removeClass("ocultar");
        EsLaUltimaEdit();
    });
    $("#e_del2").click(function() {
        $(".e_competencia2 .e_comp").val('');
        $(".e_competencia2").addClass("ocultar");
        $("#eaddComp").removeClass("ocultar");
        EsLaUltimaEdit();
    });
    $("#e_del3").click(function() {
        $(".e_competencia3 .e_comp").val('');
        $(".e_competencia3").addClass("ocultar");
        $("#eaddComp").removeClass("ocultar");
        EsLaUltimaEdit();
    });
    $("#e_del4").click(function() {
        $(".e_competencia4 .e_comp").val('');
        $(".e_competencia4").addClass("ocultar");
        $("#eaddComp").removeClass("ocultar");
        EsLaUltimaEdit();
    });
    $("#e_del5").click(function() {
        $(".e_competencia5 .e_comp").val('');
        $(".e_competencia5").addClass("ocultar");
        $("#eaddComp").removeClass("ocultar");
        EsLaUltimaEdit();
    });

    $("#eaddComp").click(function() {
        if ($(".e_competencia1").hasClass('ocultar')) {
            $(".e_competencia1").removeClass('ocultar');
        } else if ($(".e_competencia2").hasClass('ocultar')) {
            $(".e_competencia2").removeClass('ocultar');
        } else if ($(".e_competencia3").hasClass('ocultar')) {
            $(".e_competencia3").removeClass('ocultar');
        } else if ($(".e_competencia4").hasClass('ocultar')) {
            $(".e_competencia4").removeClass('ocultar');
        } else if ($(".e_competencia5").hasClass('ocultar')) {
            $(".e_competencia5").removeClass('ocultar');
            $("#eaddComp").addClass("ocultar");
        } else {
            $("#erError").html("Lo sentimos, de momento solo 5 competencias").removeClass('ocultar');
        }
    });

    function EsLaUltimaEdit() {
        var ultima = $(".e_competencia1").hasClass('ocultar') && $(".e_competencia2").hasClass('ocultar') &&
            $(".e_competencia3").hasClass('ocultar') && $(".e_competencia4").hasClass('ocultar') &&
            $(".e_competencia5").hasClass('ocultar');
        if (ultima) {
            $("#erCompetencias").removeClass('active');
            $(".ebloqbotonadd").addClass("ocultar");
        }
    }


    // Niveles Add

    $("#rNiveles").addClass('botonDeshabilitado');


    // $("#rNiveles").click(function() {
    //     if (!$("#rNiveles").hasClass('active')) {
    //         console.log("Si Niveles");
    //         $(".nivel").val('');
    //         $("#nivelesPuntosMax, #sliderNivelesDiv, .nivel1, .bloqbotonaddNivel, #addNivel").removeClass("ocultar");
    //         $("#delNivel1").show();

    //         cuantosNivelesHay = 1;
    //         creaNivelesPuntos('add', cuantosNivelesHay, maximoPuntosNiveles);
    //     } else {
    //         console.log("No niveles");
    //         $("#nivelesPuntosMax, #sliderNivelesDiv, .nivel1, .nivel2, .nivel3, .nivel4, .nivel5, .nivel6, .nivel7, .nivel8, .nivel9, .nivel10, .bloqbotonaddNivel").addClass("ocultar");
    //         $(".nivel").val('');
    //     }


    // $(".nivel_puntos").val('1');
    // for (a = 1; a <= maximoPuntosNiveles; a++) {
    //     ajustaSlider(a, 0);
    //     $('#sliderNivel' + a).val('0');
    // }
    // });
    // $("#delNivel1").click(function() {
    //     $(".nivel1 .nivel").val("");
    //     $(".nivel1").addClass("ocultar");
    //     $("#addNivel").removeClass("ocultar");
    //     // cuantosNivelesHay = 0;
    //     EsElUltimoNivelAdd();
    // });
    // $("#delNivel2").click(function() {
    //     $(".nivel2 .nivel").val("");
    //     $(".nivel2").addClass("ocultar");
    //     $("#addNivel").removeClass("ocultar");
    //     $("#delNivel2").hide();
    //     $("#delNivel1").show();
    //     cuantosNivelesHay = 1;
    //     creaNivelesPuntos('add', cuantosNivelesHay, maximoPuntosNiveles);
    //     EsElUltimoNivelAdd();
    // });
    // $("#delNivel3").click(function() {
    //     $(".nivel3 .nivel").val("");
    //     $(".nivel3").addClass("ocultar");
    //     $("#addNivel").removeClass("ocultar");
    //     $("#delNivel3").hide();
    //     $("#delNivel2").show();
    //     cuantosNivelesHay = 2;
    //     creaNivelesPuntos('add', cuantosNivelesHay, maximoPuntosNiveles);
    //     EsElUltimoNivelAdd();
    // });
    // $("#delNivel4").click(function() {
    //     $(".nivel4 .nivel").val("");
    //     $(".nivel4").addClass("ocultar");
    //     $("#addNivel").removeClass("ocultar");
    //     $("#delNivel4").hide();
    //     $("#delNivel3").show();
    //     cuantosNivelesHay = 3;
    //     creaNivelesPuntos('add', cuantosNivelesHay, maximoPuntosNiveles);
    //     EsElUltimoNivelAdd();
    // });
    // $("#delNivel5").click(function() {
    //     $(".nivel5 .nivel").val("");
    //     $(".nivel5").addClass("ocultar");
    //     $("#addNivel").removeClass("ocultar");
    //     $("#delNivel5").hide();
    //     $("#delNivel4").show();
    //     cuantosNivelesHay = 4;
    //     creaNivelesPuntos('add', cuantosNivelesHay, maximoPuntosNiveles);
    //     EsElUltimoNivelAdd();
    // });
    // $("#delNivel6").click(function() {
    //     $(".nivel6 .nivel").val("");
    //     $(".nivel6").addClass("ocultar");
    //     $("#addNivel").removeClass("ocultar");
    //     $("#delNivel6").hide();
    //     $("#delNivel5").show();
    //     cuantosNivelesHay = 5;
    //     creaNivelesPuntos('add', cuantosNivelesHay, maximoPuntosNiveles);
    //     EsElUltimoNivelAdd();
    // });
    // $("#delNivel7").click(function() {
    //     $(".nivel7 .nivel").val("");
    //     $(".nivel7").addClass("ocultar");
    //     $("#addNivel").removeClass("ocultar");
    //     $("#delNivel7").hide();
    //     $("#delNivel6").show();
    //     cuantosNivelesHay = 6;
    //     creaNivelesPuntos('add', cuantosNivelesHay, maximoPuntosNiveles);
    //     EsElUltimoNivelAdd();
    // });
    // $("#delNivel8").click(function() {
    //     $(".nivel8 .nivel").val("");
    //     $(".nivel8").addClass("ocultar");
    //     $("#addNivel").removeClass("ocultar");
    //     $("#delNivel8").hide();
    //     $("#delNivel7").show();
    //     cuantosNivelesHay = 79;
    //     creaNivelesPuntos('add', cuantosNivelesHay, maximoPuntosNiveles);
    //     EsElUltimoNivelAdd();
    // });
    // $("#delNivel9").click(function() {
    //     $(".nivel9 .nivel").val("");
    //     $(".nivel9").addClass("ocultar");
    //     $("#addNivel").removeClass("ocultar");
    //     $("#delNivel9").hide();
    //     $("#delNivel8").show();
    //     cuantosNivelesHay = 9;
    //     creaNivelesPuntos('add', cuantosNivelesHay, maximoPuntosNiveles);
    //     EsElUltimoNivelAdd();
    // });
    // $("#delNivel10").click(function() {
    //     $(".nivel10 .nivel").val("");
    //     $(".nivel10").addClass("ocultar");
    //     $("#addNivel").removeClass("ocultar");
    //     $("#delNivel10").hide();
    //     $("#delNivel9").show();
    //     cuantosNivelesHay = 9;
    //     creaNivelesPuntos('add', cuantosNivelesHay, maximoPuntosNiveles);
    //     EsElUltimoNivelAdd();
    // });
    // $("#addNivel").click(function() {
    //     if ($(".nivel1").hasClass('ocultar')) {
    //         $(".nivel1").removeClass('ocultar');
    //         $("#delNivel1").show();
    //         cuantosNivelesHay = 1;
    //     } else if ($(".nivel2").hasClass('ocultar')) {
    //         if (parseInt($('#puntosdelNivel1').val()) >= maximoPuntosNiveles) {
    //             $('#puntosNivelError1').html('Máximo de puntos agotado, revisa el máximo de puntos disponibles para agregar otro nivel.').removeClass('ocultar');
    //         } else {
    //             $('#puntosNivelError1').html('').addClass('ocultar');
    //             $(".nivel2").removeClass('ocultar');
    //             $("#delNivel1").hide();
    //             $("#delNivel2").show();
    //             cuantosNivelesHay = 2;
    //         }
    //     } else if ($(".nivel3").hasClass('ocultar')) {
    //         if (parseInt($('#puntosdelNivel2').val()) >= maximoPuntosNiveles) {
    //             $('#puntosNivelError2').html('Máximo de puntos agotado, revisa el máximo de puntos disponibles para agregar otro nivel.').removeClass('ocultar');
    //         } else {
    //             $('#puntosNivelError2').html('').addClass('ocultar');
    //             $(".nivel3").removeClass('ocultar');
    //             $("#delNivel2").hide();
    //             $("#delNivel3").show();
    //             cuantosNivelesHay = 3;
    //         }
    //     } else if ($(".nivel4").hasClass('ocultar')) {
    //         if (parseInt($('#puntosdelNivel3').val()) >= maximoPuntosNiveles) {
    //             $('#puntosNivelError3').html('Máximo de puntos agotado, revisa el máximo de puntos disponibles para agregar otro nivel.').removeClass('ocultar');
    //         } else {
    //             $('#puntosNivelError3').html('').addClass('ocultar');
    //             $(".nivel4").removeClass('ocultar');
    //             $("#delNivel3").hide();
    //             $("#delNivel4").show();
    //             cuantosNivelesHay = 4;
    //         }
    //     } else if ($(".nivel5").hasClass('ocultar')) {
    //         if (parseInt($('#puntosdelNivel4').val()) >= maximoPuntosNiveles) {
    //             $('#puntosNivelError4').html('Máximo de puntos agotado, revisa el máximo de puntos disponibles para agregar otro nivel.').removeClass('ocultar');
    //         } else {
    //             $('#puntosNivelError4').html('').addClass('ocultar');
    //             $(".nivel5").removeClass('ocultar');
    //             $("#delNivel4").hide();
    //             $("#delNivel5").show();
    //             cuantosNivelesHay = 5;
    //         }
    //     } else if ($(".nivel6").hasClass('ocultar')) {
    //         if (parseInt($('#puntosdelNivel5').val()) >= maximoPuntosNiveles) {
    //             $('#puntosNivelError5').html('Máximo de puntos agotado, revisa el máximo de puntos disponibles para agregar otro nivel.').removeClass('ocultar');
    //         } else {
    //             $('#puntosNivelError5').html('').addClass('ocultar');
    //             $(".nivel6").removeClass('ocultar');
    //             $("#delNivel5").hide();
    //             $("#delNivel6").show();
    //             cuantosNivelesHay = 6;
    //         }
    //     } else if ($(".nivel7").hasClass('ocultar')) {
    //         if (parseInt($('#puntosdelNivel6').val()) >= maximoPuntosNiveles) {
    //             $('#puntosNivelError6').html('Máximo de puntos agotado, revisa el máximo de puntos disponibles para agregar otro nivel.').removeClass('ocultar');
    //         } else {
    //             $('#puntosNivelError6').html('').addClass('ocultar');
    //             $(".nivel7").removeClass('ocultar');
    //             $("#delNivel6").hide();
    //             $("#delNivel7").show();
    //             cuantosNivelesHay = 7;
    //         }
    //     } else if ($(".nivel8").hasClass('ocultar')) {
    //         if (parseInt($('#puntosdelNivel7').val()) >= maximoPuntosNiveles) {
    //             $('#puntosNivelError7').html('Máximo de puntos agotado, revisa el máximo de puntos disponibles para agregar otro nivel.').removeClass('ocultar');
    //         } else {
    //             $('#puntosNivelError7').html('').addClass('ocultar');
    //             $(".nivel8").removeClass('ocultar');
    //             $("#delNivel7").hide();
    //             $("#delNivel8").show();
    //             cuantosNivelesHay = 8;
    //         }
    //     } else if ($(".nivel9").hasClass('ocultar')) {
    //         if (parseInt($('#puntosdelNivel8').val()) >= maximoPuntosNiveles) {
    //             $('#puntosNivelError8').html('Máximo de puntos agotado, revisa el máximo de puntos disponibles para agregar otro nivel.').removeClass('ocultar');
    //         } else {
    //             $('#puntosNivelError8').html('').addClass('ocultar');
    //             $(".nivel9").removeClass('ocultar');
    //             $("#delNivel8").hide();
    //             $("#delNivel9").show();
    //             cuantosNivelesHay = 9;
    //         }
    //     } else if ($(".nivel10").hasClass('ocultar')) {
    //         if (parseInt($('#puntosdelNivel9').val()) >= maximoPuntosNiveles) {
    //             $('#puntosNivelError9').html('Máximo de puntos agotado, revisa el máximo de puntos disponibles para agregar otro nivel.').removeClass('ocultar');
    //         } else {
    //             $('#puntosNivelError9').html('').addClass('ocultar');
    //             $(".nivel10").removeClass('ocultar');
    //             $("#addNivel").addClass("ocultar");
    //             $("#delNivel9").hide();
    //             $("#delNivel10").show();
    //             cuantosNivelesHay = 10;
    //         }
    //     } else {
    //         $("#rError").html("Solo 10 niveles").removeClass('ocultar');
    //     }
    //     creaNivelesPuntos('add', cuantosNivelesHay, maximoPuntosNiveles);

    // });

    function EsElUltimoNivelAdd() {
        var ultima = $(".nivel1").hasClass('ocultar') && $(".nivel2").hasClass('ocultar') && $(".nivel3").hasClass('ocultar') && $(".nivel4").hasClass('ocultar') && $(".nivel5").hasClass('ocultar') && $(".nivel6").hasClass('ocultar') && $(".nivel7").hasClass('ocultar') && $(".nivel8").hasClass('ocultar') && $(".nivel9").hasClass('ocultar') && $(".nivel10").hasClass('ocultar');
        if (ultima) {
            $("#rNiveles").removeClass('active');
            $(".bloqbotonaddNivel, #nivelesPuntosMax, #sliderNivelesDiv").addClass("ocultar");
        }
    }




    // Niveles Edit
    $("#erNiveles").click(function() {
        if (!$("#erNiveles").hasClass('active')) {
            console.log("Si Niveles");
            $(".nivel").val('');
            $("#enivelesPuntosMax, #enivelesPuntosDisp, #_sliderNivelesDiv, .enivel1, .bloqbotonaddNivel, #eaddNivel").removeClass("ocultar");
            $("#edelNivel1").show();

            cuantosNivelesHay = 1;

            emaximoPuntosNiveles = that['leccion' + cualLeccion + 'puntosNivelesTotal'];
            $('#ercPuntosNivel').text(emaximoPuntosNiveles);
            // if (!$('#_sliderNiveles')[0].noUiSlider) {
            creaNivelesPuntos('ed', cuantosNivelesHay, emaximoPuntosNiveles);
            // }
        } else {
            console.log("No niveles");
            $("#enivelesPuntosMax, #enivelesPuntosDisp, #_sliderNivelesDiv, .enivel1, .enivel2, .enivel3, .enivel4, .enivel5, .enivel6, .enivel7, .enivel8, .enivel9, .enivel10, .bloqbotonaddNivel").addClass("ocultar");
            $(".nivel").val('');
        }
        // $(".nivel_puntos").val('1');
        // for (a = 1; a <= maximoPuntosNiveles; a++) {
        //     eajustaSlider(a, 0);
        //     $('#esliderNivel' + a).val('0');
        // }
    });


    $("#edelNivel1").click(function() {
        $(".enivel1 .nivel").val("");
        $(".enivel1").addClass("ocultar");
        $("#eaddNivel").removeClass("ocultar");
        // cuantosNivelesHay = 0;
        EsElUltimoNivelEdit();
    });
    $("#edelNivel2").click(function() {
        $(".enivel2 .nivel").val("");
        $(".enivel2").addClass("ocultar");
        $("#eaddNivel").removeClass("ocultar");
        $("#edelNivel2").hide();
        $("#edelNivel1").show();
        cuantosNivelesHay = 1;
        // emaximoPuntosNiveles = parseInt($('#ercPuntosNivel').text());
        $('#ercPuntosNivel').text(emaximoPuntosNiveles);
        // if (!$('#_sliderNiveles')[0].noUiSlider) {
        creaNivelesPuntos('ed', cuantosNivelesHay, emaximoPuntosNiveles);
        // }
        EsElUltimoNivelEdit();
    });
    $("#edelNivel3").click(function() {
        $(".enivel3 .nivel").val("");
        $(".enivel3").addClass("ocultar");
        $("#eaddNivel").removeClass("ocultar");
        $("#edelNivel3").hide();
        $("#edelNivel2").show();
        cuantosNivelesHay = 2;
        // emaximoPuntosNiveles = parseInt($('#ercPuntosNivel').text());
        $('#ercPuntosNivel').text(emaximoPuntosNiveles);
        // if (!$('#_sliderNiveles')[0].noUiSlider) {
        creaNivelesPuntos('ed', cuantosNivelesHay, emaximoPuntosNiveles);
        // }
        EsElUltimoNivelEdit();
    });
    $("#edelNivel4").click(function() {
        $(".enivel4 .nivel").val("");
        $(".enivel4").addClass("ocultar");
        $("#eaddNivel").removeClass("ocultar");
        $("#edelNivel4").hide();
        $("#edelNivel3").show();
        cuantosNivelesHay = 3;
        // emaximoPuntosNiveles = parseInt($('#ercPuntosNivel').text());
        $('#ercPuntosNivel').text(emaximoPuntosNiveles);
        // if (!$('#_sliderNiveles')[0].noUiSlider) {
        creaNivelesPuntos('ed', cuantosNivelesHay, emaximoPuntosNiveles);
        // }
        EsElUltimoNivelEdit();
    });
    $("#edelNivel5").click(function() {
        $(".enivel5 .nivel").val("");
        $(".enivel5").addClass("ocultar");
        $("#eaddNivel").removeClass("ocultar");
        $("#edelNivel5").hide();
        $("#edelNivel4").show();
        cuantosNivelesHay = 4;
        // emaximoPuntosNiveles = parseInt($('#ercPuntosNivel').text());
        $('#ercPuntosNivel').text(emaximoPuntosNiveles);
        // if (!$('#_sliderNiveles')[0].noUiSlider) {
        creaNivelesPuntos('ed', cuantosNivelesHay, emaximoPuntosNiveles);
        // }
        EsElUltimoNivelEdit();
    });
    $("#edelNivel6").click(function() {
        $(".enivel6 .nivel").val("");
        $(".enivel6").addClass("ocultar");
        $("#eaddNivel").removeClass("ocultar");
        $("#edelNivel6").hide();
        $("#edelNivel5").show();
        cuantosNivelesHay = 5;
        // emaximoPuntosNiveles = parseInt($('#ercPuntosNivel').text());
        $('#ercPuntosNivel').text(emaximoPuntosNiveles);
        // if (!$('#_sliderNiveles')[0].noUiSlider) {
        creaNivelesPuntos('ed', cuantosNivelesHay, emaximoPuntosNiveles);
        // }
        EsElUltimoNivelEdit();
    });
    $("#edelNivel7").click(function() {
        $(".enivel7 .nivel").val("");
        $(".enivel7").addClass("ocultar");
        $("#eaddNivel").removeClass("ocultar");
        $("#edelNivel7").hide();
        $("#edelNivel6").show();
        cuantosNivelesHay = 6;
        // emaximoPuntosNiveles = parseInt($('#ercPuntosNivel').text());
        $('#ercPuntosNivel').text(emaximoPuntosNiveles);
        // if (!$('#_sliderNiveles')[0].noUiSlider) {
        creaNivelesPuntos('ed', cuantosNivelesHay, emaximoPuntosNiveles);
        // }
        EsElUltimoNivelEdit();
    });
    $("#edelNivel8").click(function() {
        $(".enivel8 .nivel").val("");
        $(".enivel8").addClass("ocultar");
        $("#eaddNivel").removeClass("ocultar");
        $("#edelNivel8").hide();
        $("#edelNivel7").show();
        cuantosNivelesHay = 7;
        // emaximoPuntosNiveles = parseInt($('#ercPuntosNivel').text());
        $('#ercPuntosNivel').text(emaximoPuntosNiveles);
        // if (!$('#_sliderNiveles')[0].noUiSlider) {
        creaNivelesPuntos('ed', cuantosNivelesHay, emaximoPuntosNiveles);
        // }
        EsElUltimoNivelEdit();
    });
    $("#edelNivel9").click(function() {
        $(".enivel9 .nivel").val("");
        $(".enivel9").addClass("ocultar");
        $("#eaddNivel").removeClass("ocultar");
        $("#edelNivel9").hide();
        $("#edelNivel8").show();
        cuantosNivelesHay = 8;
        // emaximoPuntosNiveles = parseInt($('#ercPuntosNivel').text());
        $('#ercPuntosNivel').text(emaximoPuntosNiveles);
        // if (!$('#_sliderNiveles')[0].noUiSlider) {
        creaNivelesPuntos('ed', cuantosNivelesHay, emaximoPuntosNiveles);
        // }
        EsElUltimoNivelEdit();
    });
    $("#edelNivel10").click(function() {
        $(".enivel10 .nivel").val("");
        $(".enivel10").addClass("ocultar");
        $("#eaddNivel").removeClass("ocultar");
        $("#edelNivel10").hide();
        $("#edelNivel9").show();
        cuantosNivelesHay = 9;
        // emaximoPuntosNiveles = parseInt($('#ercPuntosNivel').text());
        $('#ercPuntosNivel').text(emaximoPuntosNiveles);
        // if (!$('#_sliderNiveles')[0].noUiSlider) {
        creaNivelesPuntos('ed', cuantosNivelesHay, emaximoPuntosNiveles);
        // }
        EsElUltimoNivelEdit();
    });
    $("#eaddNivel").click(function() {
        if ($(".enivel1").hasClass('ocultar')) {
            $(".enivel1").removeClass('ocultar');
            $("#edelNivel1").show();
            cuantosNivelesHay = 1;
        } else if ($(".enivel2").hasClass('ocultar')) {
            if (parseInt($('#epuntosdelNivel1').val()) >= emaximoPuntosNiveles) {
                $('#epuntosNivelError1').html('Máximo de puntos agotado, revisa el máximo de puntos disponibles para agregar otro nivel.').removeClass('ocultar');
            } else {
                $('#epuntosNivelError1').html('').addClass('ocultar');
                $(".enivel2").removeClass('ocultar');
                $("#edelNivel1").hide();
                $("#edelNivel2").show();
                cuantosNivelesHay = 2;
            }
        } else if ($(".enivel3").hasClass('ocultar')) {
            if (parseInt($('#epuntosdelNivel2').val()) >= emaximoPuntosNiveles) {
                $('#epuntosNivelError2').html('Máximo de puntos agotado, revisa el máximo de puntos disponibles para agregar otro nivel.').removeClass('ocultar');
            } else {
                $('#epuntosNivelError2').html('').addClass('ocultar');
                $(".enivel3").removeClass('ocultar');
                $("#edelNivel2").hide();
                $("#edelNivel3").show();
                cuantosNivelesHay = 3;
            }
        } else if ($(".enivel4").hasClass('ocultar')) {
            if (parseInt($('#epuntosdelNivel3').val()) >= emaximoPuntosNiveles) {
                $('#epuntosNivelError3').html('Máximo de puntos agotado, revisa el máximo de puntos disponibles para agregar otro nivel.').removeClass('ocultar');
            } else {
                $('#epuntosNivelError3').html('').addClass('ocultar');
                $(".enivel4").removeClass('ocultar');
                $("#edelNivel3").hide();
                $("#edelNivel4").show();
                cuantosNivelesHay = 4;
            }
        } else if ($(".enivel5").hasClass('ocultar')) {
            if (parseInt($('#epuntosdelNivel4').val()) >= emaximoPuntosNiveles) {
                $('#epuntosNivelError4').html('Máximo de puntos agotado, revisa el máximo de puntos disponibles para agregar otro nivel.').removeClass('ocultar');
            } else {
                $('#epuntosNivelError4').html('').addClass('ocultar');
                $(".enivel5").removeClass('ocultar');
                $("#edelNivel4").hide();
                $("#edelNivel5").show();
                cuantosNivelesHay = 5;
            }
        } else if ($(".enivel6").hasClass('ocultar')) {
            if (parseInt($('#epuntosdelNivel5').val()) >= emaximoPuntosNiveles) {
                $('#epuntosNivelError5').html('Máximo de puntos agotado, revisa el máximo de puntos disponibles para agregar otro nivel.').removeClass('ocultar');
            } else {
                $('#epuntosNivelError5').html('').addClass('ocultar');
                $(".enivel6").removeClass('ocultar');
                $("#edelNivel5").hide();
                $("#edelNivel6").show();
                cuantosNivelesHay = 6;
            }
        } else if ($(".enivel7").hasClass('ocultar')) {
            if (parseInt($('#epuntosdelNivel6').val()) >= emaximoPuntosNiveles) {
                $('#epuntosNivelError6').html('Máximo de puntos agotado, revisa el máximo de puntos disponibles para agregar otro nivel.').removeClass('ocultar');
            } else {
                $('#epuntosNivelError6').html('').addClass('ocultar');
                $(".enivel7").removeClass('ocultar');
                $("#edelNivel6").hide();
                $("#edelNivel7").show();
                cuantosNivelesHay = 7;
            }
        } else if ($(".enivel8").hasClass('ocultar')) {
            if (parseInt($('#epuntosdelNivel7').val()) >= emaximoPuntosNiveles) {
                $('#epuntosNivelError7').html('Máximo de puntos agotado, revisa el máximo de puntos disponibles para agregar otro nivel.').removeClass('ocultar');
            } else {
                $('#epuntosNivelError7').html('').addClass('ocultar');
                $(".enivel8").removeClass('ocultar');
                $("#edelNivel7").hide();
                $("#edelNivel8").show();
                cuantosNivelesHay = 8;
            }
        } else if ($(".enivel9").hasClass('ocultar')) {
            if (parseInt($('#epuntosdelNivel8').val()) >= emaximoPuntosNiveles) {
                $('#epuntosNivelError8').html('Máximo de puntos agotado, revisa el máximo de puntos disponibles para agregar otro nivel.').removeClass('ocultar');
            } else {
                $('#epuntosNivelError8').html('').addClass('ocultar');
                $(".enivel9").removeClass('ocultar');
                $("#edelNivel8").hide();
                $("#edelNivel9").show();
                cuantosNivelesHay = 9;
            }
        } else if ($(".enivel10").hasClass('ocultar')) {
            if (parseInt($('#epuntosdelNivel9').val()) >= emaximoPuntosNiveles) {
                $('#epuntosNivelError9').html('Máximo de puntos agotado, revisa el máximo de puntos disponibles para agregar otro nivel.').removeClass('ocultar');
            } else {
                $('#epuntosNivelError9').html('').addClass('ocultar');
                $(".enivel10").removeClass('ocultar');
                $("#eaddNivel").addClass("ocultar");
                $("#edelNivel9").hide();
                $("#edelNivel10").show();
                cuantosNivelesHay = 10;
            }
        } else {
            $("#rError").html("Sólo se permiten 10 niveles").removeClass('ocultar');
        }
        // emaximoPuntosNiveles = parseInt($('#ercPuntosNivel').text());
        $('#ercPuntosNivel').text(emaximoPuntosNiveles);
        // if (!$('#_sliderNiveles')[0].noUiSlider) {
        creaNivelesPuntos('ed', cuantosNivelesHay, emaximoPuntosNiveles);
        // }
    });

    function EsElUltimoNivelEdit() {
        var ultima = $(".enivel1").hasClass('ocultar') && $(".enivel2").hasClass('ocultar') && $(".enivel3").hasClass('ocultar') && $(".enivel4").hasClass('ocultar') && $(".enivel5").hasClass('ocultar') && $(".enivel6").hasClass('ocultar') && $(".enivel7").hasClass('ocultar') && $(".enivel8").hasClass('ocultar') && $(".enivel9").hasClass('ocultar') && $(".enivel10").hasClass('ocultar');
        if (ultima) {
            $("#erNiveles").removeClass('active');
            $(".bloqbotonaddNivel, #enivelesPuntosMax, #enivelesPuntosDisp, #_sliderNivelesDiv").addClass("ocultar");
        }
    }


    // Sliders
    // for (a = 1; a <= maximoPuntosNiveles; a++) {
    // function ajustaSliderPos() {
    //     $('.slider_barra').css({
    //         'margin-top': ($('.slider_valor').position().top - 10) + 'px !important',
    //         'margin-left': $('.slider_valor').position().left + 'px !important',
    //         'background-color': '#f89f3f !important',
    //     });
    //     $('.slider_valor').css({
    //         'margin-left': $('.slider').width() + 50 + 'px'
    //     })
    // }

    function ajustaSlider(elSlider, elValue) {
        // $('#valorSliderNiveles').html(elValue);

        var maximoNivel = $("#rcPuntosNivel").val();
        console.log('maximoNivel', maximoNivel);
        $("#sliderNiveles").attr('max', maximoNivel);
    }

    function eajustaSlider(elSlider, elValue) {
        // $('#evalorSliderNiveles').html(elValue);

        var maximoNivel = $("#ercPuntosNivel").val();
        console.log('maximoNivel', maximoNivel);
        $("#_sliderNiveles").attr('max', maximoNivel);
    }

    $('.campo_puntos').on('input change', function() {
        cualNivelPuntos = parseInt($(this).attr('id').substr(15, 2));
        cuantosNivelPuntos = parseInt($(this).val());
        // console.log('cualNivelPuntos', cualNivelPuntos, 'y cuantosNivelPuntos', cuantosNivelPuntos);
        that['puntosNivel' + cualNivelPuntos] = cuantosNivelPuntos;
    });

    $(document).on('click', '.botonInputMenos, .botonInputMas', function() {
        cualNivelPuntos = parseInt($(this).parent().find($('input')).attr('id').substr(15, 2));
        cuantosNivelPuntos = parseInt($(this).parent().find($('input')).val());
        // console.log('cualNivelPuntos', cualNivelPuntos, 'y cuantosNivelPuntos', cuantosNivelPuntos);
        that['puntosNivel' + cualNivelPuntos] = cuantosNivelPuntos;
    });


    $('.slider').on('input', function() {
        var cualSlider = parseInt($(this).attr('id').substr(11, 2));
        var cualSlider2 = parseInt($(this).attr('id').substr(12, 2));
        // console.log(cualSlider, cualSlider2);
        if (!isNaN(cualSlider)) {
            ajustaSlider(cualSlider, $('#sliderNiveles').val());
        }
        if (!isNaN(cualSlider2)) {
            eajustaSlider(cualSlider2, $('#_sliderNiveles').val());
        }
    });

    // $('#rcPuntosNivel').on('change keyup', function() {
    //     maximoPuntosNiveles = parseInt($("#rcPuntosNivel").val());
    //     console.log('maximoPuntosNiveles', maximoPuntosNiveles);
    //     creaNivelesPuntos('add', cuantosNivelesHay, maximoPuntosNiveles);
    // });

    // $('#ercPuntosNivel').on('change keyup', function() {
    //     // emaximoPuntosNiveles = parseInt($("#ercPuntosNivel").val());
    //     console.log('emaximoPuntosNiveles', emaximoPuntosNiveles);
    //     creaNivelesPuntos('ed', cuantosNivelesHay, emaximoPuntosNiveles);
    // });



    $('.epuntosdelNivel').on('change keyup', function() {
        // emaximoPuntosNiveles = parseInt($("#ercPuntosNivel").val());
        // console.log('emaximoPuntosNiveles', emaximoPuntosNiveles);
        creaNivelesPuntos('ed', cuantosNivelesHay, emaximoPuntosNiveles);
    });

    // $('#epuntosdelNivel3').on("propertychange change click keyup input paste", function(event) {
    //     console.log('ssssssssssssssssssssssssssssssss', emaximoPuntosNiveles);
    // });


    return cuentaLecciones();
}



function creaNivelesPuntos(evento, cuantosValores, maximoPuntos) {
    console.log('creaNivelesPuntos', evento, cuantosValores, maximoPuntos);

    if (maximoPuntos == undefined || maximoPuntos == '' || maximoPuntos == null || isNaN(maximoPuntos)) {
        maximoPuntos = 0
    }
    var contador = 0;

    if (evento == 'add') {

        for (a = 1; a <= cuantosValores; a++) {
            contador += 1;

            $('#puntosdelNivel' + a).attr('maximo', maximoPuntos);
            $('#puntosdelNivel' + (a - 1)).attr('disabled', 'true');
            $('#botonInputMasN' + (a - 1) + ', #botonInputMenosN' + (a - 1)).addClass('deshabilitado');
            $('#puntosdelNivel' + a).removeAttr('disabled');
            $('#botonInputMasN' + a + ', #botonInputMenosN' + a).removeClass('deshabilitado');

            if (parseInt($('#puntosdelNivel' + a).val()) <= parseInt($('#puntosdelNivel' + (a - 1)).val())) {
                $('#puntosdelNivel' + a).val((parseInt($('#puntosdelNivel' + (a - 1)).val())) + 1);
            }
            $('#puntosdelNivel' + a).attr('minimo', ((parseInt($('#puntosdelNivel' + (a - 1)).val())) + 1));

            this['puntosNivel' + a] = $('#puntosdelNivel' + a).val();

        }

    } else if (evento == 'ed') {

        for (a = 1; a <= cuantosValores; a++) {
            contador += 1;

            this['puntosNivel' + a] = that['leccion' + laLeccion + '_Nivel' + a + '_Puntos'];
            var elPunto = that['leccion' + laLeccion + '_Nivel' + a + '_Puntos'];
            if (elPunto == undefined) {
                elPunto = maximoPuntos;
            }

            $('#epuntosdelNivel' + a).attr('maximo', maximoPuntos);
            $('#epuntosdelNivel' + (a - 1)).attr('disabled', 'true');
            $('#ebotonInputMasN' + (a - 1) + ', #ebotonInputMenosN' + (a - 1)).addClass('deshabilitado');
            $('#epuntosdelNivel' + a).removeAttr('disabled');
            $('#ebotonInputMasN' + a + ', #ebotonInputMenosN' + a).removeClass('deshabilitado');

            if (parseInt($('#epuntosdelNivel' + a).val()) <= parseInt($('#epuntosdelNivel' + (a - 1)).val())) {
                $('#epuntosdelNivel' + a).val((parseInt($('#epuntosdelNivel' + (a - 1)).val())) + 1);
            }

            if (parseInt($('#epuntosdelNivel' + a).val()) > maximoPuntos) {
                parseInt($('#epuntosdelNivel' + a).val(maximoPuntos));
            }

            $('#epuntosdelNivel1').attr('minimo', '0');
            $('#epuntosdelNivel' + (a + 1)).attr('minimo', ((parseInt($('#epuntosdelNivel' + a).val())) + 1));

            this['puntosNivel' + a] = $('#epuntosdelNivel' + a).val();


            // puntosDispNiveles = (maximoPuntos - parseInt($('#epuntosdelNivel' + a).val()));
            // console.log('puntosDispNiveles', puntosDispNiveles);
        }
    }


    puntosDispNiveles = (maximoPuntos - parseInt($('#epuntosdelNivel' + cuantosNivelesHay).val()));
    $('#ercPuntosNivelDisp').text(puntosDispNiveles);

    thas = this;

    // return ajustaSliderPos();
}



function cuentaLecciones() {
    contadorLeccionesVisbles = 0;
    leccionesContadorBuscarRecurso = 0;
    leccionesContadorRecursosTotal = 0;

    var elFactorNum;
    var elGrupoNum;
    var laCompetenciaNum;

    if (revisaConexion) {
        // Lecciones ↓
        firebase.database().ref(laUrlBase + 'Lecciones').once('value').then(function(snapshot) {
            if (snapshot.val() != null) {
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
                    this['leccion' + contadorLecciones + '_Visible'] = childSnapshot.val().Visible;
                    that = this;

                    if (this['leccion' + contadorLecciones + '_Visible'] == true) {
                        contadorLeccionesVisbles++;
                    };

                    // Competencias
                    var contadorCompetencias = 0;

                    this['leccion' + contadorLecciones + '_NumCompetencias'] = childSnapshot.child('Competencias').numChildren();
                    console.log('leccion' + contadorLecciones + '_NumCompetencias: ', this['leccion' + contadorLecciones + '_NumCompetencias']);

                    childSnapshot.child('Competencias').forEach(function(childSnapshotCompetencias2) {

                        if (childSnapshotCompetencias2.val() != null) {
                            console.log('childSnapshotCompetencias2', childSnapshotCompetencias2.val());

                            contadorCompetencias++;

                            for (a = 1; a <= contadorCompetencias; a++) {
                                this['leccion' + contadorLecciones + '_Competencia' + a + '_Existe'] = false;
                            }
                            var obj = childSnapshotCompetencias2.val();

                            if (childSnapshotCompetencias2.numChildren() > 0) {
                                this['leccion' + contadorLecciones + '_Competencia' + contadorCompetencias + '_Existe'] = true;
                                console.log('competencia' + contadorCompetencias + '_Existe', this['leccion' + contadorLecciones + '_Competencia' + contadorCompetencias + '_Existe']);

                                this['leccion' + contadorLecciones + '_Competencia' + contadorCompetencias + '_Factor'] = obj.Factor;
                                elFactorNum = parseInt(obj.Factor);
                                console.log('competencia' + contadorCompetencias + '_Factor', this['leccion' + contadorLecciones + '_Competencia' + contadorCompetencias + '_Factor']);

                                this['leccion' + contadorLecciones + '_Competencia' + contadorCompetencias + '_Grupo'] = obj.Grupo;
                                elGrupoNum = parseInt(obj.Grupo);
                                console.log('competencia' + contadorCompetencias + '_Grupo', this['leccion' + contadorLecciones + '_Competencia' + contadorCompetencias + '_Grupo']);

                                this['leccion' + contadorLecciones + '_Competencia' + contadorCompetencias + '_Competencia'] = obj.Competencia;
                                laCompetenciaNum = parseInt(obj.Competencia);
                                console.log('competencia' + contadorCompetencias + '_Competencia', this['leccion' + contadorLecciones + '_Competencia' + contadorCompetencias + '_Competencia']);

                                var arrayCompetenciasLlenadas = llenarCompetencias(elFactorNum, elGrupoNum, laCompetenciaNum);
                                // console.log('arrayCompetenciasLlenadas', arrayCompetenciasLlenadas);
                                this['leccion' + contadorLecciones + '_Competencia' + contadorCompetencias + '_FactorNombre'] = arrayCompetenciasLlenadas[0];
                                this['leccion' + contadorLecciones + '_Competencia' + contadorCompetencias + '_GrupoNombre'] = arrayCompetenciasLlenadas[1];
                                this['leccion' + contadorLecciones + '_Competencia' + contadorCompetencias + '_CompetenciaNombre'] = arrayCompetenciasLlenadas[2];

                            }
                        }
                    });
                    // Competencias


                    // Niveles
                    var contadorNiveles = 0;

                    this['leccion' + contadorLecciones + '_NumNiveles'] = childSnapshot.child('Niveles').numChildren();
                    console.log('leccion' + contadorLecciones + '_NumNiveles: ', this['leccion' + contadorLecciones + '_NumNiveles']);

                    // this['leccion' + contadorLecciones + '_PuntosTotal'] = childSnapshot.child('Niveles').child('PuntosTotal').val();
                    // console.log('leccion' + contadorLecciones + '_PuntosTotal: ', this['leccion' + contadorLecciones + '_PuntosTotal']);

                    childSnapshot.child('Niveles').forEach(function(childSnapshotNiveles) {

                        if (childSnapshotNiveles.val() != null) {
                            console.log('childSnapshotNiveles', childSnapshotNiveles.val());

                            contadorNiveles++;

                            for (a = 1; a <= contadorNiveles; a++) {
                                this['leccion' + contadorLecciones + '_Nivel' + a + '_Existe'] = false;
                            }
                            var obj = childSnapshotNiveles.val();

                            if (childSnapshotNiveles.numChildren() > 0) {
                                this['leccion' + contadorLecciones + '_Nivel' + contadorNiveles + '_Existe'] = true;
                                console.log('leccion' + contadorLecciones + '_Existe', this['leccion' + contadorLecciones + '_Nivel' + contadorNiveles + '_Existe']);

                                this['leccion' + contadorLecciones + '_Nivel' + contadorNiveles + '_Nombre'] = childSnapshotNiveles.val().nombre;
                                console.log('leccion' + contadorLecciones + '_Nivel' + contadorNiveles + '_Nombre', this['leccion' + contadorLecciones + '_Nivel' + contadorNiveles + '_Nombre']);

                                this['leccion' + contadorLecciones + '_Nivel' + contadorNiveles + '_Puntos'] = childSnapshotNiveles.val().puntos;
                                console.log('leccion' + contadorLecciones + '_Nivel' + contadorNiveles + '_Puntos', this['leccion' + contadorLecciones + '_Nivel' + contadorNiveles + '_Puntos']);

                            }
                        }
                    });
                    // Niveles



                    // módulo ↓
                    var contadorModulos = 0;
                    this['leccion' + contadorLecciones + 'puntosNivelesTotal'] = 0;

                    this['leccion' + contadorLecciones + '_NumModulos'] = childSnapshot.child('Modulos').numChildren();
                    console.log('leccion' + contadorLecciones + '_NumModulos: ', this['leccion' + contadorLecciones + '_NumModulos']);

                    var LeccionID = childSnapshot.val().Id;
                    /*var playersRef = firebase.database().ref(laUrlBase + 'Lecciones/'+LeccionID+'/Modulos/');
                    playersRef.orderByChild("Orden").on("child_added", function(data) {
                        console.log(data.val().Orden);
                    });

                    playersRef.orderByChild("Orden").on("child_added", function(childSnapshotModulos) {
                        console.log(childSnapshotModulos.val());
                    */
                    childSnapshot.child('Modulos').forEach(function(childSnapshotModulos) {
                        contadorModulos++;
                        //Nodo
                        this['leccion' + contadorLecciones + '_Modulo'] = childSnapshotModulos.key;
                        // Id
                        this['leccion' + contadorLecciones + '_Modulo' + contadorModulos + '_Id'] = childSnapshotModulos.key;
                        console.log('leccion' + contadorLecciones + '_Modulo' + contadorModulos + '_Id', this['leccion' + contadorLecciones + '_Modulo' + contadorModulos + '_Id']);
                        // Nombre Orden
                        this['leccion' + contadorLecciones + '_Modulo' + contadorModulos + '_Orden'] = childSnapshotModulos.val().Orden;
                        console.log('_Orden', this['leccion' + contadorLecciones + '_Modulo' + contadorModulos + '_Orden']);
                        // Reordenar Módulos
                        ordenModulos = this['leccion' + contadorLecciones + '_Modulo' + contadorModulos + '_Orden'];
                        contadorModulos = ordenModulos;
                        console.log('contadorModulos', contadorModulos);
                        this['leccion' + contadorLecciones + '_Modulo' + contadorModulos + '_Orden'] = ordenModulos;
                        // console.log('_Orden', this['leccion' + contadorLecciones + '_Modulo' + contadorModulos + '_Orden']);
                        // Nombre Modulo
                        this['leccion' + contadorLecciones + '_Modulo' + contadorModulos + '_Nombre'] = childSnapshotModulos.val().Nombre;
                        //ID Modulo
                        this['leccion' + contadorLecciones + '_Modulo' + contadorModulos + '_Id'] = childSnapshotModulos.val().Id;
                        // Recursos ↓
                        var contadorRecursos = 0;
                        this['leccion' + contadorLecciones + '_Modulo' + contadorModulos + '_NumRecursos'] = childSnapshotModulos.child('Recursos').numChildren();
                        // console.log('leccion' + contadorLecciones + '_Modulo' + contadorModulos + '_NumRecursos', this['leccion' + contadorLecciones + '_Modulo' + contadorModulos + '_NumRecursos']);
                        this['leccion' + contadorLecciones + '_cuantosModulos'] = this['leccion' + contadorLecciones + '_Modulo' + contadorModulos + '_Orden'];
                        console.log('leccion' + contadorLecciones + '_cuantosModulos', this['leccion' + contadorLecciones + '_cuantosModulos']);

                        that = this;

                        // Recursos ↓
                        childSnapshotModulos.child('Recursos').forEach(function(childSnapshotRecursos) {
                            contadorRecursos++;
                            leccionesContadorRecursosTotal++;

                            // Recurso Orden
                            this['leccion' + contadorLecciones + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursos + '_Orden'] = childSnapshotRecursos.val().Orden;
                            // console.log('leccion' + contadorLecciones + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursos + '_Orden', this['leccion' + contadorLecciones + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursos + '_Orden']);

                            // Reordenar Recursos
                            ordenRecursos = this['leccion' + contadorLecciones + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursos + '_Orden'];
                            contadorRecursos = ordenRecursos;
                            // console.log('contadorRecursos', contadorRecursos);
                            this['leccion' + contadorLecciones + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursos + '_Orden'] = ordenRecursos;
                            console.log('leccion' + contadorLecciones + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursos + '_Orden', this['leccion' + contadorLecciones + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursos + '_Orden']);

                            this['leccion' + contadorLecciones + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursos + '_cuantosRecursos'] = this['leccion' + contadorLecciones + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursos + '_Orden'];
                            console.log('leccion' + contadorLecciones + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursos + '_cuantosRecursos', this['leccion' + contadorLecciones + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursos + '_cuantosRecursos']);


                            //Nodo
                            this['leccion' + contadorLecciones + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursos] = childSnapshotRecursos.key;
                            // Id Recurso
                            this['leccion' + contadorLecciones + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursos + '_Id'] = childSnapshotRecursos.val().recurso_Id;

                            // Tipo_participante
                            this['leccion' + contadorLecciones + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursos + 'Tipo_participante'] = childSnapshotRecursos.val().Tipo_participante;
                            // _Promediable
                            this['leccion' + contadorLecciones + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursos + '_Promediable'] = childSnapshotRecursos.val().Promediable;
                            // _Promediable_porciento
                            this['leccion' + contadorLecciones + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursos + '_Promediable_porciento'] = childSnapshotRecursos.val().Promediable_porciento;
                            // Insignias ↓
                            this['leccion' + contadorLecciones + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursos + '_Insignia'] = childSnapshotRecursos.val().insignia;
                            // _Puntos
                            this['leccion' + contadorLecciones + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursos + '_Puntos'] = childSnapshotRecursos.val().Puntos;

                            // PuntosTotales
                            this['leccion' + contadorLecciones + 'puntosNivelesTotal'] += parseInt(childSnapshotRecursos.val().Puntos);
                            console.log('leccion' + contadorLecciones + 'puntosNivelesTotal: ', this['leccion' + contadorLecciones + 'puntosNivelesTotal']);

                            that = this;

                            if (this['leccion' + contadorLecciones + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursos + '_Insignia'] != "no" && this['leccion' + contadorLecciones + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursos + '_Insignia'] != null) {
                                console.log("🥇 Insignia ↓");
                                //_InsigniaNombre
                                this['leccion' + contadorLecciones + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursos + '_InsigniaNombre'] = childSnapshotRecursos.child('insignia').val().nombre;
                                //_InsigniaTipo
                                // this['leccion' + contadorLecciones + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursos + '_InsigniaTipo'] = childSnapshotRecursos.child('insignia').val().tipo;
                                //_InsigniaCalif_minima
                                this['leccion' + contadorLecciones + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursos + '_InsigniaCalif_minima'] = childSnapshotRecursos.child('insignia').val().calif_minima;
                                //_InsigniaImagen
                                this['leccion' + contadorLecciones + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursos + '_InsigniaImagen'] = childSnapshotRecursos.child('insignia').val().imagen;
                                //_InsigniaOtorgada
                                this['leccion' + contadorLecciones + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursos + '_InsigniaOtorgada'] = childSnapshotRecursos.child('insignia').val().otorgada;
                                //_InsigniaTiempoMinimo
                                this['leccion' + contadorLecciones + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursos + '_InsigniaTiempoMinimo'] = childSnapshotRecursos.child('insignia').val().tiempo_minimo;
                                //_InsigniaPuntos
                                this['leccion' + contadorLecciones + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursos + '_InsigniaPuntos'] = childSnapshotRecursos.child('insignia').val().puntos;
                                that = this;
                            } else {
                                console.log("🥇 NO Insignia");
                            }
                            // Insignias ↑

                        });
                        // Recursos ↑
                    });
                    // Modulos ↑
                    contadorLeccionesVisbles = contadorLeccionesVisbles;
                    console.log('_↑_');


                });

                return pintaLecciones().then(function() {
                    activaBotonesLecciones().then(function() {
                        cargador('oculta');
                    });
                });

            } else {
                return pintaLecciones().then(function() {
                    activaBotonesLecciones().then(function() {
                        cargador('oculta');
                    });
                });

            }

        });
        // Lecciones ↑

    }
}



// carga competencias
function cargarCompetencias() {

    var cualNoCompetencia;

    $.getJSON("data/competencias.json", function(data) {
        console.log("competencias.json", data);
        listadoFactores = data;

        var cuantosFactores = Object.keys(listadoFactores.factores).length;
        // var cuantosFactores = Object.keys(listadoFactores.factores).map(function(e) {
        //     return listadoFactores.factores[e].length;
        // })
        console.log('cuantosFactores', cuantosFactores);
        // console.log('listadoFactores keys', Object.keys(listadoFactores.factores));
        // console.log('listadoFactores values', Object.values(listadoFactores.factores));

        var options_factores = "";
        var options_grupos = "";
        var options_competencias = "";

        // losFactores = Object.values(listadoFactores.factores);
        losFactores = Object.keys(listadoFactores.factores).map(function(e) {
            return listadoFactores.factores[e];
        })



        options_factores += "<option value='0' selected disabled>Selecciona una opción</option>";
        options_grupos += "<option value='0' selected disabled>Selecciona un Factor</option>";
        options_competencias += "<option value='0' selected disabled>Selecciona un Grupo</option>";

        for (a = 0; a < cuantosFactores; a++) {
            options_factores += "<option value='" + (a + 1) + "'>" + losFactores[a] + "</option>";
        }


        // Factores
        for (a = 1; a <= maximoCompetencias; a++) {
            $("#listaFactores" + a).change(function() {
                cualNoCompetencia = parseInt($(this).attr('id').substr(13, 1));
                console.log('cualNoCompetencia', a);
                factorSeleccionado = parseInt($(this).val());
                console.log('factorSeleccionado', factorSeleccionado);

                seleccionaFactor(factorSeleccionado);
            });

            $("#e_listaFactores" + a).change(function() {
                cualNoCompetencia = parseInt($(this).attr('id').substr(15, 1));
                console.log('cualNoCompetencia', a);
                factorSeleccionado = parseInt($(this).val());
                console.log('factorSeleccionado', factorSeleccionado);

                seleccionaFactor(factorSeleccionado);
            });
        }

        function seleccionaFactor(cualFactor) {
            console.log('seleccionaFactor con factor', cualFactor);

            var listadoGrupos = data.grupos['f' + cualFactor];
            // console.log('listadoGrupos', listadoGrupos);
            var cuantosGrupos = Object.keys(listadoGrupos).length;
            // var cuantosGrupos = Object.keys(listadoGrupos).map(function(e) {
            //     return listadoGrupos[e].length;
            // })
            console.log('cuantosGrupos', cuantosGrupos);
            // console.log('listadoGrupos keys', Object.keys(listadoGrupos));
            // console.log('listadoGrupos values', Object.values(listadoGrupos));
            // losGrupos = Object.values(listadoGrupos);
            losGrupos = Object.keys(listadoGrupos).map(function(e) {
                return listadoGrupos[e];
            })
            // console.log('losGrupos', losGrupos);


            options_grupos = "";
            options_grupos += "<option value='0' selected disabled>Selecciona una opción</option>";
            for (a = 0; a < cuantosGrupos; a++) {
                options_grupos += "<option value='" + (a + 1) + "'>" + losGrupos[a] + "</option>";
            }

            $("#listaGrupos" + cualNoCompetencia).html(options_grupos);
            $("#e_listaGrupos" + cualNoCompetencia).html(options_grupos);
            options_competencias = "";
            options_competencias += "<option value='0' selected disabled>Primero selecciona un Grupo</option>";
            $("#listaCompetencias" + cualNoCompetencia).html(options_competencias);
            $("#e_listaCompetencias" + cualNoCompetencia).html(options_competencias);

        }


        // Grupos
        for (a = 1; a <= maximoCompetencias; a++) {
            $("#listaGrupos" + a).change(function() {
                cualNoGrupo = parseInt($(this).attr('id').substr(11, 1));
                console.log('cualNoGrupo', cualNoGrupo);
                grupoSeleccionado = parseInt($(this).val());
                console.log('grupoSeleccionado', grupoSeleccionado);

                seleccionaGrupo(factorSeleccionado, grupoSeleccionado);
            });

            $("#e_listaGrupos" + a).change(function() {
                cualNoGrupo = parseInt($(this).attr('id').substr(13, 1));
                console.log('cualNoGrupo', cualNoGrupo);
                grupoSeleccionado = parseInt($(this).val());
                console.log('grupoSeleccionado', grupoSeleccionado);

                seleccionaGrupo(factorSeleccionado, grupoSeleccionado);
            });
        }


        function seleccionaGrupo(factorSeleccionado, cualGrupo) {
            console.log('seleccionaGrupo con factor', factorSeleccionado, ' y grupo', cualGrupo);

            var listadoCompetencias = data.competencias['f' + factorSeleccionado]['g' + cualGrupo];
            console.log('listadoCompetencias', listadoCompetencias);
            var cuantasCompetencias = Object.keys(listadoCompetencias).length;
            // var cuantasCompetencias = Object.keys(listadoCompetencias).map(function(e) {
            //     return listadoCompetencias[e].length;
            // })
            console.log('cuantasCompetencias', cuantasCompetencias);
            // console.log('listadoCompetencias keys', Object.keys(listadoCompetencias));
            // console.log('listadoCompetencias values', Object.values(listadoCompetencias));
            // lasCompetencias = Object.values(listadoCompetencias);
            lasCompetencias = Object.keys(listadoCompetencias).map(function(e) {
                return listadoCompetencias[e]
            })
            // console.log('lasCompetencias', lasCompetencias);


            options_competencias = "";
            options_competencias += "<option value='0' selected disabled>Selecciona una opción</option>";
            for (a = 0; a < cuantasCompetencias; a++) {
                options_competencias += "<option value='" + (a + 1) + "'>" + lasCompetencias[a] + "</option>";
            }

            $("#listaCompetencias" + cualNoGrupo).html(options_competencias);
            $("#e_listaCompetencias" + cualNoGrupo).html(options_competencias);
        }


        // Competencias
        for (a = 1; a <= maximoCompetencias; a++) {
            $("#listaCompetencias" + a).change(function() {
                competenciaSeleccionada = parseInt($(this).val());
                console.log('competenciaSeleccionada', competenciaSeleccionada);

                seleccionaCompetencia(factorSeleccionado, grupoSeleccionado, competenciaSeleccionada);
            });

            $("#e_listaCompetencias" + a).change(function() {
                competenciaSeleccionada = parseInt($(this).val());
                console.log('competenciaSeleccionada', competenciaSeleccionada);

                seleccionaCompetencia(factorSeleccionado, grupoSeleccionado, competenciaSeleccionada);
            });
        }


        function seleccionaCompetencia(factorSeleccionado, grupoSeleccionado, cualCompetencia) {
            console.log('seleccionaCompetencia con factor', factorSeleccionado, ' y grupo', grupoSeleccionado, ' y competencia', competenciaSeleccionada);

        }


        for (a = 1; a <= maximoCompetencias; a++) {
            $("#listaFactores" + a).html(options_factores);
            $("#e_listaFactores" + a).html(options_factores);
        }

    });

}

cargarCompetencias();



// llena competencias
function llenarCompetencias(cualFactorNum, cualGrupoNum, cualCompetenciaNum) {
    console.log('llenarCompetencias', cualFactorNum, cualGrupoNum, cualCompetenciaNum);

    var elFactor = losFactores[(cualFactorNum - 1)]
    // console.log('elFactor', elFactor);

    var arrayListadoGrupos = listadoFactores.grupos['f' + cualFactorNum];
    // console.log('arrayListadoGrupos', arrayListadoGrupos);
    // var arrayLosGrupos = Object.values(arrayListadoGrupos);
    var arrayLosGrupos = Object.keys(arrayListadoGrupos).map(function(e) {
        return arrayListadoGrupos[e];
    })
    // console.log('arrayLosGrupos', arrayLosGrupos);

    var arrayListadoCompetencias = listadoFactores.competencias['f' + cualFactorNum]['g' + cualGrupoNum];
    // console.log('arrayListadoCompetencias', arrayListadoCompetencias);
    // var arrayLasCompetencias = Object.values(arrayListadoCompetencias);
    var arrayLasCompetencias = Object.keys(arrayListadoCompetencias).map(function(e) {
        return arrayListadoCompetencias[e];
    })
    // console.log('arrayLasCompetencias', arrayLasCompetencias);

    var arrayFGC = [elFactor, arrayLosGrupos[(cualGrupoNum - 1)], arrayLasCompetencias[(cualCompetenciaNum - 1)]];
    // console.log('arrayFGC', arrayFGC);

    return arrayFGC;
    // return $.ajax();
}



function limpiaCompetencia(cualCompetencia) {
    console.log('limpiaCompetencia', cualCompetencia);
    var maximoCompetencias = 5;

    $(".comp").val('0');
    options_factores = "";
    options_factores += "<option value='0' selected disabled>Selecciona una opción</option>";
    for (a = 1; a <= maximoCompetencias; a++) {
        $("#listaFactores" + a).html(options_factores);
        $("#e_listaFactores" + a).html(options_factores);
    }
    // seleccionaFactor(0);
    options_grupos = "";
    options_grupos += "<option value='0' selected disabled>Selecciona un Factor</option>";
    for (a = 1; a <= maximoCompetencias; a++) {
        $("#listaGrupos" + a).html(options_grupos);
        $("#e_listaGrupos" + a).html(options_grupos);
    }
    options_competencias = "";
    options_competencias += "<option value='0' selected disabled>Selecciona un Grupo</option>";
    for (a = 1; a <= maximoCompetencias; a++) {
        $("#listaCompetencias" + a).html(options_competencias);
        $("#e_listaCompetencias" + a).html(options_competencias);
    }
    cargarCompetencias();
}



function pintaLecciones() {
    console.log('pintaLecciones ');
    console.log('Nombre '); //nombre


    var contenidoSecLecciones = '';
    $('.lecciones_int').empty();

    // Agregar Lección //
    contenidoSecLecciones += '<button id="botonAgregaLeccion" class="btn btn-round botonAgregar" data-toggle="modal" data-target="#modalAgregaLeccion" onclick="cleanAddAmbienteAprendizaje()" style="float: right; margin-top: -60px;"><i class="nc-icon-glyph ui-1_bold-add"></i>&nbsp; Agregar Ambiente de Aprendizaje</button>';
    // Agregar Lección //

    for (a = 1; a <= contadorLeccionesVisbles; a++) {
        var rowRecursos = "rowRecurso" + a;
        contenidoSecLecciones += '<div id="leccion' + a + '" class="card leccion">';
        contenidoSecLecciones += '<div class="card-body">';
        contenidoSecLecciones += '<div class="row">';
        contenidoSecLecciones += '<div class="col-10">';
        contenidoSecLecciones += '<h5 class="card-title">' + that['leccion' + a + '_Nombre'] + '</h5>';

        // competencias
        for (b = 1; b <= that['leccion' + a + '_NumCompetencias']; b++) {
            // if (that['competencia' + cont + '_Existe']) {
            contenidoSecLecciones += '<div class="card-text"><b>Competencia ' + b + ':</b></div>';
            contenidoSecLecciones += '<div class="card-text"><b>Factor: </b>' + that['leccion' + a + '_Competencia' + b + '_FactorNombre'] + '</div>';
            contenidoSecLecciones += '<div class="card-text"><b>Grupo: </b>' + that['leccion' + a + '_Competencia' + b + '_GrupoNombre'] + '</div>';
            contenidoSecLecciones += '<div class="card-text"><b>Competencia: </b>' + that['leccion' + a + '_Competencia' + b + '_CompetenciaNombre'] + '</div><br>';
            // }
        }

        // niveles
        for (b = 1; b <= that['leccion' + a + '_NumNiveles']; b++) {
            // if (that['competencia' + cont + '_Existe']) {
            contenidoSecLecciones += '<div class="card-text"><b>Nivel ' + b + ': </b>' + that['leccion' + a + '_Nivel' + b + '_Nombre'] + '</div>';
            // }
        }

        //Titulo de la tarjeta (Ambiente de Aprendizaje 1)
        contenidoSecLecciones += '</div>';

        contenidoSecLecciones += '<div class="col-2">';

        contenidoSecLecciones += '<div class="pull-right">';
        contenidoSecLecciones += '<div class="btn btn-round btn-neutral btn-menu_neutral" onClick="abreMenuAmbientes(' + a + ')"><i class="nc-icon-glyph ui-2_menu-dots" style="font-size: 20px; font-weight: 600;"></i></div>';

        contenidoSecLecciones += '<div id="menu_ambientes' + a + '" class="ui vertical menu menu_ambientes" style="display: none; position: absolute; z-index: 99; margin-left: -140px; margin-top: -15px;">';
        contenidoSecLecciones += '<a class="item boton_naranja_alt" data-toggle="modal" data-target="#modalEditarLeccion" onClick="loadAmbienteAA(' + a + ')">';
        contenidoSecLecciones += '<h4 class="ui header" style="margin-bottom: 20px;">Editar Ambiente<i class="nc-icon-outline ui-1_pencil pull-right"></i></h4>';
        contenidoSecLecciones += '<p>Se editan las propiedades del Ambiente de Aprendizaje seleccionado.</p>';
        contenidoSecLecciones += '</a>';
        contenidoSecLecciones += '<a class="item boton_rojo_alt" onClick="eliminarAA(' + a + ')">';
        contenidoSecLecciones += '<h4 class="ui header" style="margin-bottom: 20px;">Eliminar Ambiente<i class="nc-icon-outline ui-1_trash-simple pull-right"></i></h4>';
        contenidoSecLecciones += '<p>Se elimina el Ambiente de Aprendizaje seleccionado.</p>';
        contenidoSecLecciones += '</a>';
        contenidoSecLecciones += '<a class="item boton_verde_alt" data-toggle="modal" data-target="#modalAgregaModulo" onClick="agregaModulo(' + a + ')">';
        contenidoSecLecciones += '<h4 class="ui header" style="margin-bottom: 20px;">Agregar Módulo<i class="nc-icon-glyph ui-1_bold-add pull-right"></i></h4>';
        contenidoSecLecciones += '<p>Se agrega un módulo dentro de este Ambiente de Aprendizaje.</p>';
        contenidoSecLecciones += '</a>';
        contenidoSecLecciones += '</div>';
        contenidoSecLecciones += '</div>';
        contenidoSecLecciones += '</div>';

        // Módulos ↓



        var colorModulo = 0;
        for (b = 1; b <= that['leccion' + a + '_NumModulos']; b++) {

            colorModulo++;
            if (colorModulo % 4 == 1) {
                colorModulo = 1;
            }

            var colorMod;
            switch (colorModulo) {
                case 1:
                    colorMod = "linear-gradient(to bottom, rgba(45, 110, 221, 0.671) 0%, rgba(61, 196, 228, 0.8) 100%)";
                    break;
                case 2:
                    colorMod = "linear-gradient(to bottom, rgba(79, 152, 62, 0.702) 0%, rgba(187, 214, 59, 0.8) 100%)";
                    break;
                case 3:
                    colorMod = "linear-gradient(to bottom, rgba(79, 54, 155, 0.671) 0%, rgba(184, 102, 204, 0.651) 100%)";
                    break;
                case 4:
                    colorMod = "linear-gradient(to bottom, rgba(64, 172, 159, 0.82) 0%, rgba(100, 196, 182, 0.82) 100%)";
                    break;
            }

            var colorSolidoMod;
            switch (colorModulo) {
                case 1:
                    colorSolidoMod = "#eaf2fc";
                    break;
                case 2:
                    colorSolidoMod = "#f1f6eb";
                    break;
                case 3:
                    colorSolidoMod = "#f1ecf7";
                    break;
                case 4:
                    colorSolidoMod = "#edf8f6";
                    break;
            }

            // background: var(--color_opacity_modulo' + colorModulo + ');
            contenidoSecLecciones += '<div class="row modulo" style="background: ' + colorSolidoMod + ';">';
            contenidoSecLecciones += '<div style="background: ' + colorMod + ';  margin: -10px -10px 10px -10px; width: 110%;">';
            contenidoSecLecciones += '<span class="card-subtitle text-muted" style="color: #fff !important; padding: 15px; line-height: 3;">Módulo ' + that['leccion' + a + '_Modulo' + b + '_Orden'] + ': <b>' + that['leccion' + a + '_Modulo' + b + '_Nombre'] + ' </b></span>';


            contenidoSecLecciones += '<div class="pull-right">';
            contenidoSecLecciones += '<div class="btn btn-round btn-menu_blanco" style="margin-right: 10px;" onClick="abreMenuModulos(' + a + ',' + b + ')"><i class="nc-icon-glyph ui-2_menu-dots" style="font-size: 20px; font-weight: 600;"></i></div>';

            contenidoSecLecciones += '<div id="menu_modulos' + a + that['leccion' + a + '_Modulo' + b + '_Orden'] + '" class="ui vertical menu menu_modulos" style="display: none; position: absolute; z-index: 99; margin-left: -140px; margin-top: -15px;">';
            contenidoSecLecciones += '<a class="item boton_naranja_alt" data-toggle="modal" data-target="#modalEditarModuloAA" onclick="loadModuloEnAA(' + a + ',' + that['leccion' + a + '_Modulo' + b + '_Orden'] + ')">';
            contenidoSecLecciones += '<h4 class="ui header" style="margin-bottom: 20px;">Editar Módulo<i class="nc-icon-outline ui-1_pencil pull-right"></i></h4>';
            contenidoSecLecciones += '<p>Se editan las propiedades del Módulo seleccionado.</p>';
            contenidoSecLecciones += '</a>';
            contenidoSecLecciones += '<a class="item boton_rojo_alt" onClick="eliminarModuloAA(' + a + ',' + that['leccion' + a + '_Modulo' + b + '_Orden'] + ')">';
            contenidoSecLecciones += '<h4 class="ui header" style="margin-bottom: 20px;">Eliminar Módulo<i class="nc-icon-outline ui-1_trash-simple pull-right"></i></h4>';
            contenidoSecLecciones += '<p>Se elimina el Módulo seleccionado.</p>';
            contenidoSecLecciones += '</a>';
            contenidoSecLecciones += '<a class="item boton_verde_alt" data-toggle="modal" data-target="#modalAgregaRecurso" onClick="agregaRecurso(' + a + ',' + b + ')">';
            contenidoSecLecciones += '<h4 class="ui header" style="margin-bottom: 20px;">Agregar Objeto<i class="nc-icon-glyph ui-1_bold-add pull-right"></i></h4>';
            contenidoSecLecciones += '<p>Se agrega un objeto de aprendizaje dentro de este Módulo.</p>';
            contenidoSecLecciones += '</a>';
            contenidoSecLecciones += '</div>';
            contenidoSecLecciones += '</div>';
            contenidoSecLecciones += '</div>';

            // var anchoColumnas = 6;
            // if (that['leccion' + a + '_Modulo' + b + '_NumRecursos'] >= 3) {
            anchoColumnas = 4;
            // }

            contenidoSecLecciones += '<div id="tarjetasModulo' + a + '_' + b + '" class="row col-12 tarjetasModulo">';

            for (c = 1; c <= that['leccion' + a + '_Modulo' + b + '_NumRecursos']; c++) {
                // contenidoSecLecciones += '<div class="col">';
                // Recurso ↓
                contenidoSecLecciones += '<div id="tarjeta_L' + a + '_M' + b + '_R' + c + '" class="col-md-' + anchoColumnas + '">';
                contenidoSecLecciones += '<div class="card">';
                contenidoSecLecciones += '<span class="drag_handle"></span>';
                contenidoSecLecciones += '<img class="card-img portada_recurso" src="' + RECURSOS[that['leccion' + a + '_Modulo' + b + '_Recurso' + c + '_Id'] + '_portada'] + '"></img>';

                contenidoSecLecciones += '<div class="card-body">';
                contenidoSecLecciones += '<h6 class="category text-danger">' + RECURSOS[that['leccion' + a + '_Modulo' + b + '_Recurso' + c + '_Id'] + '_categoria'] + '</h6>';
                contenidoSecLecciones += '<h5 id="curso_titulo' + b + '" class="curso_titulo card-title">' + RECURSOS[that['leccion' + a + '_Modulo' + b + '_Recurso' + c + '_Id']] + '</h5>';

                contenidoSecLecciones += '<div class="card-desc">';
                contenidoSecLecciones += '<div class="card-text" ><b>Puntos: </b>' + that['leccion' + a + '_Modulo' + b + '_Recurso' + c + '_Puntos'] + '</div>';

                if (that['leccion' + a + '_Modulo' + b + '_Recurso' + c + '_Promediable_porciento'] == "" || that['leccion' + a + '_Modulo' + b + '_Recurso' + c + '_Promediable_porciento'] == undefined || that['leccion' + a + '_Modulo' + b + '_Recurso' + c + '_Promediable_porciento'] == null) {
                    contenidoSecLecciones += '<div class="card-text" ><b>No Promediable</b></div>';
                } else {
                    contenidoSecLecciones += '<div class="card-text" ><b>Promediable con: </b>' + that['leccion' + a + '_Modulo' + b + '_Recurso' + c + '_Promediable_porciento'] + '%</div>';
                }

                // contenidoSecLecciones += '<div class="card-text" ><b>Visible: </b>' + that['leccion' + a + '_Modulo' + b + '_Recurso' + c + 'Tipo_participante'] + '</div>';
                contenidoSecLecciones += '<br>';
                if (that['leccion' + a + '_Modulo' + b + '_Recurso' + c + '_Insignia'] != "no" && this['leccion' + a + '_Modulo' + b + '_Recurso' + c + '_Insignia'] != null) {
                    contenidoSecLecciones += '<div class="card-text" ><b>Insignia: </b>' + that['leccion' + a + '_Modulo' + b + '_Recurso' + c + '_InsigniaNombre'] + '</div>';
                    contenidoSecLecciones += '<br> <img style="width: 30%; margin-left: 35%; margin-right: 25%;" src="' + that['leccion' + a + '_Modulo' + b + '_Recurso' + c + '_InsigniaImagen'] + '"></img>';
                } else {
                    contenidoSecLecciones += '<div class="card-text" ><b>No hay Insignia</b></div>';
                }
                contenidoSecLecciones += '</div>';

                contenidoSecLecciones += '<div class="mdl-card__actions mdl-card--border">';
                contenidoSecLecciones += '<div class="card-botones">';
                contenidoSecLecciones += '<div id="botonMasInfo_L' + a + '_M' + b + '_R' + c + '" class="btn btn-sm btn-round botonMasInfo">Más info <i class="nc-icon-outline arrows-1_minimal-down" style="margin-left: 5px;"></i></div>';
                contenidoSecLecciones += '<div id="botonEditar' + c + '" class="btn btn-sm btn-round botonEditar" data-toggle="modal" data-target="#modalEditarRecursoModuloAA" onclick="loadRecursoModuloAA(' + a + ',' + b + ',' + c + ')"><i class="nc-icon-glyph ui-1_pencil"></i>&nbsp; Editar</div>';
                contenidoSecLecciones += '<div id="btnEliminar' + c + '" class="btn btn-sm btn-round botonEliminar" onclick="eliminarRecursoModuloAA(' + a + ',' + b + ',' + c + ')"><i class="nc-icon-glyph ui-1_trash-simple"></i>&nbsp; Eliminar</div>';
                // contenidoSecLecciones += '<div id="botonAsignar' + b + '" class="btn btn-sm btn-round botonAsignar">Asignar</div>';
                // contenidoSecLecciones += '<div id="botonIniciarCurso' + b + '" class="btn btn-success btn-round botonIniciarCurso">Lanzar</div>'; //Boton LANZAR
                contenidoSecLecciones += '</div>';

                contenidoSecLecciones += '</div>';
                contenidoSecLecciones += '</div>';
                contenidoSecLecciones += '</div>';
                contenidoSecLecciones += '</div>';

            };
            // Recursos ↑

            contenidoSecLecciones += '</div>';
            contenidoSecLecciones += '</div>';

        };
        // Módulos ↑


        for (d = 1; d <= that['leccion' + a + '_NumUsuarios']; d++) {
            contenidoSecLecciones += '<div class="card col-md-3">';
            contenidoSecLecciones += '<div class="card-body">';
            contenidoSecLecciones += '<p class="card-text">' + that['leccion' + a + '_Usuario' + d + '_Id'] + '</p>';
            contenidoSecLecciones += '</div>';
            contenidoSecLecciones += '</div>';
        };
        contenidoSecLecciones += '</div>';
        contenidoSecLecciones += '</div>';
        contenidoSecLecciones += '</div>';
        contenidoSecLecciones += '</div>';
        contenidoSecLecciones += '</div>';
    };


    contenidoSecLecciones += '</div>';
    contenidoSecLecciones += '</div>';

    $('.lecciones_int').append(contenidoSecLecciones);
    $('#subtituloSeccion').html('<a>' + contadorLeccionesVisbles + '</a> Ambientes en total');
    return $.ajax();
}

// menús verticales //
function abreMenuAmbientes(cualLeccion) {
    $('#menu_ambientes' + cualLeccion).fadeIn('fast');
}

function cierraMenuAmbientes() {
    $(".menu_ambientes").fadeOut('fast');
}

function abreMenuModulos(cualLeccion, cualModulo) {
    $('#menu_modulos' + cualLeccion + cualModulo).fadeIn('fast');
}

function cierraMenuModulos() {
    $(".menu_modulos").fadeOut('fast');
}

$(document).mouseup(function(e) {
    if (!$(".menu_ambientes").is(e.target) && !$('.btn-menu_neutral').is(e.target)) {
        cierraMenuAmbientes();
    }
    if (!$(".menu_modulos").is(e.target) && !$('.btn-menu_blanco').is(e.target)) {
        cierraMenuModulos();
    }
});
// menús verticales //



function agregaModulo(leccion) {
    cierraMenuAmbientes();

    $('#tituloAgregaModulo').empty();
    $('#tituloAgregaModulo').append('Agrega módulo en ' + that['leccion' + leccion + '_Nombre']);
    $("#moduloIDaa").val(that['leccion' + leccion + '_Id']);

    laLeccion = leccion;
    cleanAddModuloAA(); //Limpiando campos del modal antes de empezar};
}

function agregaRecurso(leccion, modulo) {
    cleanAddRecursoEnModuloAA();
    elNumLeccion = leccion;
    elNumModulo = modulo;
    $('#tituloAgregaRecurso').empty();
    $('#tituloAgregaRecurso').append('Agregar recurso en módulo ' + that['leccion' + leccion + '_Modulo' + modulo + '_Nombre']);
    $("#idLeccionAA").val(that['leccion' + leccion + '_Id']);
    $("#idModuloRecursoAA").val(that['leccion' + leccion + '_Modulo' + modulo + '_Id']);
}

function detallesRecurso(quien) {
    console.log("seccionDetalles" + quien);
    document.getElementById("seccionDetalles" + quien).innerHTML = " " + that['leccion' + 1 + '_Recurso'] +
        that['leccion' + 1 + '_Recurso' + 1 + '_Id'] +
        that['leccion' + 1 + '_Recurso' + 1 + '_Tipo'] +
        that['leccion' + 1 + '_Recurso' + 1 + '_Modulo'] + " ";
    document.getElementById("seccionDetalles" + quien).style.display = "block";
}

function ocultaInsignia(cualInsignia) {
    $('#grupoInsignia' + cualInsignia).slideToggle();
    console.log("👽", cualInsignia);
}

function activaBotonesLecciones() {
    console.log('activaBotonesLecciones');


    $(".botonMasInfo").click(function(event) {
        event.preventDefault();

        var botonTexto = $(this).parent().parent().parent().find('.card-desc').is(':visible') ? 'Más info <i class="nc-icon-outline arrows-1_minimal-down" style="margin-left: 5px;"></i>' : 'Menos info <i class="nc-icon-outline arrows-1_minimal-up" style="margin-left: 5px;"></i>';
        $(this).html(botonTexto);

        $(this).parent().parent().parent().find('.card-desc').slideToggle();
    });


    for (a = 1; a <= contadorLeccionesVisbles; a++) {
        for (b = 1; b <= that['leccion' + a + '_NumModulos']; b++) {

            $('#tarjetasModulo' + a + '_' + b).sortable({
                handle: ".drag_handle",
                start: function(event, ui) {
                    var start_pos = ui.item.index();
                    console.log('start', start_pos);
                },
                update: function(event, ui) {
                    var update_pos = ui.item.index();
                    console.log('update', update_pos);

                    for (aa = 1; aa <= contadorLeccionesVisbles; aa++) {
                        for (bb = 1; bb <= that['leccion' + aa + '_NumModulos']; bb++) {

                            var itemOrder = $('#tarjetasModulo' + aa + '_' + bb).sortable("toArray");

                            for (var i = 0; i < itemOrder.length; i++) {
                                console.log('Nueva posición:', i, ' y su id:', itemOrder[i]);

                                var _PosLeccion = (itemOrder[i].indexOf('L') + 1);
                                // console.log('_PosLeccion', _PosLeccion);
                                var _PosModulo = (itemOrder[i].indexOf('M') + 1);
                                // console.log('_PosModulo', _PosModulo);
                                var _PosRecurso = (itemOrder[i].indexOf('R') + 1);
                                // console.log('_PosRecurso', _PosRecurso);

                                var _laLeccion = itemOrder[i].substr(_PosLeccion, (_PosModulo - (_PosLeccion + 2)));
                                // console.log('_laLeccion', _laLeccion);
                                var _elModulo = itemOrder[i].substr(_PosModulo, (_PosRecurso - (_PosModulo + 2)));
                                // console.log('_elModulo', _elModulo);

                                var posicionOriginal = parseInt(itemOrder[i].substr(_PosRecurso, itemOrder[i].length));
                                console.log('posicionOriginal:', posicionOriginal, ' y Nueva Posición:', (i + 1));
                                var _elRecurso = that['leccion' + _laLeccion + '_Modulo' + _elModulo + '_Recurso' + posicionOriginal + '_Id'];
                                console.log('_elRecurso', _elRecurso);

                                actualizaOrdenRecursos(_laLeccion, _elModulo, _elRecurso, (i + 1));

                            }
                        }
                    }
                }
            });
        }
    }

    $(document).off('click', '#btnAddRecurso').on('click', '#btnAddRecurso', function(e) {
        AddRecursoEnModuloAA();
    });


    return $.ajax();
}


function actualizaOrdenRecursos(cualLeccion, cualModulo, cualRecurso, pos) {
    console.log('actualizaOrdenRecursos', cualLeccion, cualModulo, cualRecurso, pos);

    var onComplete = function(error) {
        if (error) {
            console.log('Ocurrió un error en la sincronización.');
        } else {
            console.log('Sincronización realizada.');
        }
    }

    if (revisaConexion) {
        dataRecurso = laUrlBase + 'Lecciones/' + that['leccion' + cualLeccion + '_Id'] + '/Modulos/' + that['leccion' + cualLeccion + '_Modulo' + cualModulo + '_Id'] + '/Recursos/' + cualRecurso;
        // console.log("dataRecurso", dataRecurso);
        firebase.database().ref(dataRecurso).update({
            'Orden': pos
        }, onComplete);
    }

}

//***Añadir Ambiente de Aprendizaje ******************//

function cleanAddAmbienteAprendizaje() {

    $(".txError, #errorComp, #errorNivel").addClass("ocultar");
    $("#aanombre").val("");
    // $("#aaVisible").removeClass("active");

    $("#rCompetencias, #rNiveles, #sliderNivelesDiv").removeClass('active');
    $(".competencia1, .competencia2, .competencia3, .competencia4, .competencia5, #addComp").addClass("ocultar");
    $("#nivelesPuntosMax, #sliderNivelesDiv, .nivel1, .nivel2, .nivel3, .nivel4, .nivel5, .nivel6, .nivel7, .nivel8, .nivel9, .nivel10, #addNivel").addClass("ocultar");
    $(".comp, .nivel").val('');
    $(".campo_puntos").val('0');
}

function addAmbienteAprendizaje() {
    $(".txError, #errorComp").addClass("ocultar");
    var errors = false;
    var errorComps = false;
    var errorNiveles = false;
    AmbienteAprendizaje = {};
    // AmbienteAprendizaje.Visible = $("#aaVisible").hasClass("active");
    AmbienteAprendizaje.Visible = true;
    AmbienteAprendizaje.Nombre = $("#aanombre").val();
    if (AmbienteAprendizaje.Nombre.length === 0) {
        errors = true;
        $(".txError").removeClass("ocultar");
    }

    var competencias = {};

    if ($("#rCompetencias").hasClass('active')) {

        if (!$(".competencia1").hasClass('ocultar')) {
            var factor1 = $("#listaFactores1").val();
            var grupo1 = $("#listaGrupos1").val();
            var competencia1 = $("#listaCompetencias1").val();
            if (factor1 != null && grupo1 != null && competencia1 != null) {
                competencias.competencia1 = {
                    'Factor': factor1,
                    'Grupo': grupo1,
                    'Competencia': competencia1
                };
            } else {
                errorComps = true;
                $("#errorComp").removeClass("ocultar");
            }
        }
        if (!$(".competencia2").hasClass('ocultar')) {
            var factor2 = $("#listaFactores2").val();
            var grupo2 = $("#listaGrupos2").val();
            var competencia2 = $("#listaCompetencias2").val();
            if (factor2 != null && grupo2 != null && competencia2 != null) {
                competencias.competencia2 = {
                    'Factor': factor2,
                    'Grupo': grupo2,
                    'Competencia': competencia2
                };
            } else {
                errorComps = true;
                $("#errorComp").removeClass("ocultar");
            }
        }
        if (!$(".competencia3").hasClass('ocultar')) {
            var factor3 = $("#listaFactores3").val();
            var grupo3 = $("#listaGrupos3").val();
            var competencia3 = $("#listaCompetencias3").val();
            if (factor3 != null && grupo3 != null && competencia3 != null) {
                competencias.competencia3 = {
                    'Factor': factor3,
                    'Grupo': grupo3,
                    'Competencia': competencia3
                };
            } else {
                errorComps = true;
                $("#errorComp").removeClass("ocultar");
            }
        }
        if (!$(".competencia4").hasClass('ocultar')) {
            var factor4 = $("#listaFactores4").val();
            var grupo4 = $("#listaGrupos4").val();
            var competencia4 = $("#listaCompetencias4").val();
            if (factor4 != null && grupo4 != null && competencia4 != null) {
                competencias.competencia4 = {
                    'Factor': factor4,
                    'Grupo': grupo4,
                    'Competencia': competencia4
                };
            } else {
                errorComps = true;
                $("#errorComp").removeClass("ocultar");
            }
        }
        if (!$(".competencia5").hasClass('ocultar')) {
            var factor5 = $("#listaFactores5").val();
            var grupo5 = $("#listaGrupos5").val();
            var competencia5 = $("#listaCompetencias5").val();
            if (factor5 != null && grupo5 != null && competencia5 != null) {
                competencias.competencia5 = {
                    'Factor': factor5,
                    'Grupo': grupo5,
                    'Competencia': competencia5
                };
            } else {
                errorComps = true;
                $("#errorComp").removeClass("ocultar");
            }
        }
    }

    // niveles
    var niveles = {};

    // niveles.imagen = $("img.activeNivel").attr('src');
    // console.log('niveles.imagen', niveles.imagen);
    // if (niveles.imagen === undefined || niveles.imagen.length === 0) {
    //     errors = true;
    //     $(".snivelImagen").removeClass("ocultar");
    // }


    if ($("#rNiveles").hasClass('active')) {

        if (!$(".nivel1").hasClass('ocultar')) {
            var niv1 = $("#rcNombreNivel1").val();
            var puntos1 = thas['puntosNivel' + 1];
            if (niv1.length > 0) {
                niveles.nivel1 = {
                    'nombre': niv1,
                    'puntos': puntos1
                };
            } else {
                errorNiveles = true;
                $("#errorNivel").removeClass("ocultar");
            }
        }
        if (!$(".nivel2").hasClass('ocultar')) {
            var niv2 = $("#rcNombreNivel2").val();
            var puntos2 = thas['puntosNivel' + 2];
            if (niv2.length > 0) {
                niveles.nivel2 = {
                    'nombre': niv2,
                    'puntos': puntos2
                };
            } else {
                errorNiveles = true;
                $("#errorNivel").removeClass("ocultar");
            }
        }
        if (!$(".nivel3").hasClass('ocultar')) {
            var niv3 = $("#rcNombreNivel3").val();
            var puntos3 = thas['puntosNivel' + 3];
            if (niv3.length > 0) {
                niveles.nivel3 = {
                    'nombre': niv3,
                    'puntos': puntos3
                };
            } else {
                errorNiveles = true;
                $("#errorNivel").removeClass("ocultar");
            }
        }
        if (!$(".nivel4").hasClass('ocultar')) {
            var niv4 = $("#rcNombreNivel4").val();
            var puntos4 = thas['puntosNivel' + 4];
            if (niv4.length > 0) {
                niveles.nivel4 = {
                    'nombre': niv4,
                    'puntos': puntos4
                };
            } else {
                errorNiveles = true;
                $("#errorNivel").removeClass("ocultar");
            }
        }
        if (!$(".nivel5").hasClass('ocultar')) {
            var niv5 = $("#rcNombreNivel5").val();
            var puntos5 = thas['puntosNivel' + 5];
            if (niv5.length > 0) {
                niveles.nivel5 = {
                    'nombre': niv5,
                    'puntos': puntos5
                };
            } else {
                errorNiveles = true;
                $("#errorNivel").removeClass("ocultar");
            }
        }
        if (!$(".nivel6").hasClass('ocultar')) {
            var niv6 = $("#rcNombreNivel6").val();
            var puntos6 = thas['puntosNivel' + 6];
            if (niv6.length > 0) {
                niveles.nivel6 = {
                    'nombre': niv6,
                    'puntos': puntos6
                };
            } else {
                errorNiveles = true;
                $("#errorNivel").removeClass("ocultar");
            }
        }
        if (!$(".nivel7").hasClass('ocultar')) {
            var niv7 = $("#rcNombreNivel7").val();
            var puntos7 = thas['puntosNivel' + 7];
            if (niv7.length > 0) {
                niveles.nivel7 = {
                    'nombre': niv7,
                    'puntos': puntos7
                };
            } else {
                errorNiveles = true;
                $("#errorNivel").removeClass("ocultar");
            }
        }
        if (!$(".nivel8").hasClass('ocultar')) {
            var niv8 = $("#rcNombreNivel8").val();
            var puntos8 = thas['puntosNivel' + 8];
            if (niv8.length > 0) {
                niveles.nivel8 = {
                    'nombre': niv8,
                    'puntos': puntos8
                };
            } else {
                errorNiveles = true;
                $("#errorNivel").removeClass("ocultar");
            }
        }
        if (!$(".nivel9").hasClass('ocultar')) {
            var niv9 = $("#rcNombreNivel9").val();
            var puntos9 = thas['puntosNivel' + 9];
            if (niv9.length > 0) {
                niveles.nivel9 = {
                    'nombre': niv9,
                    'puntos': puntos9
                };
            } else {
                errorNiveles = true;
                $("#errorNivel").removeClass("ocultar");
            }
        }
        if (!$(".nivel10").hasClass('ocultar')) {
            var niv10 = $("#rcNombreNivel10").val();
            var puntos10 = thas['puntosNivel' + 10];
            if (niv10.length > 0) {
                niveles.nivel10 = {
                    'nombre': niv10,
                    'puntos': puntos10
                };
            } else {
                errorNiveles = true;
                $("#errorNivel").removeClass("ocultar");
            }
        }

    }


    if (!errors && !errorComps && !errorNiveles) {
        var ambienteId = generarId();
        AmbienteAprendizaje.Id = "leccion_" + ambienteId;
        AmbienteAprendizaje.Modulos = 'no';

        // console.log("competenciasssssssssssss", competencias, competencias.length);
        if ($("#rCompetencias").hasClass('active')) {
            AmbienteAprendizaje.Competencias = competencias;
        } else {
            AmbienteAprendizaje.Competencias = "no";
        }
        if ($("#rNiveles").hasClass('active')) {
            AmbienteAprendizaje.Niveles = niveles;
            // AmbienteAprendizaje.Niveles.PuntosTotal = maximoPuntosNiveles;
        } else {
            AmbienteAprendizaje.Niveles = "no";
        }
        AddAmbienteAprendizaje(AmbienteAprendizaje);
    }
}

function AddAmbienteAprendizaje(AmbienteAprendizaje) {
    console.log("[ADD AmbienteAprendizaje]", AmbienteAprendizaje);
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
            // $("#modalAgregaLeccion .close").click();
            cleanAddAmbienteAprendizaje();
            cuentaLecciones();
            pintaLecciones();
            $.notify({
                message: '<strong>Ambiente de aprendizaje</strong> añadido exitosamente'
            }, {
                type: 'success',
                allow_dismiss: true,
                delay: 1500,
                allow_dismiss: false
            });
            console.log('Sincronización realizada.');
            $("#modalAgregaLeccion .close").click();
        }
    };

    firebase.auth().signInWithEmailAndPassword(email_master, password_master).then(function(result) {
        var dataRef = firebase.database().ref(laUrlBase + 'Lecciones'); //Obtengo nodo.
        var keyAA = dataRef.ref.child(AmbienteAprendizaje.Id); //Agrego recurso vacio con ID:recurso.Id .
        firebase.database().ref(keyAA).set(AmbienteAprendizaje, onComplete); //Reemplazo datos.
    });

}
//***Añadir Ambiente de Aprendizaje ******************//
//***Eliminar Ambiente de Aprendizaje ******************//
function eliminarAA(leccion) {
    console.log("[ELIMINAR: eliminarModuloAA]", a);
    cierraMenuAmbientes();

    $('#modalBorrarAA').modal({
        transition: 'scale'
    }).modal('show');

    $(document).off('click', '#botonCancelarBorrarAA').on('click', '#botonCancelarBorrarAA', function(e) {
        console.log("Click Cancelar:  botonCancelarBorrarAA");
    });
    $(document).off('click', '#botonAceptarBorrarAA').on('click', '#botonAceptarBorrarAA', function(e) {
        console.log("Click Aceptar:  botonAceptarBorrarAA");
        var leccionKey = that['leccion' + leccion + '_Id'];
        var key = "Lecciones/" + leccionKey;
        fbEliminarAA(key);
    });
}

function fbEliminarAA(key) {
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
                cuentaLecciones();
                pintaLecciones();
            }, 100);

            $.notify({
                message: 'El Ambiente de aprendizaje se borró exitosamente'
            }, {
                type: 'info',
                allow_dismiss: true,
                delay: 1500,
                allow_dismiss: false,
            });
        };
    };
    if (revisaConexion) {
        firebase.database().ref().child(key).remove(onComplete);
    }
}
//***Eliminar Ambiente de Aprendizaje ******************//


//***Actualizar Ambiente de Aprendizaje ******************//
function _cleanAddAmbienteAprendizaje() {


    $(".txError, #errorComp, #errorNivel").addClass("ocultar");
    $("#_aanombre").val("");
    // $("#_aaVisible").removeClass("active");

    $("#erCompetencias, #erNiveles").removeClass('active');
    $(".e_competencia1, .e_competencia2, .e_competencia3, .e_competencia4, .e_competencia5, #eaddComp").addClass("ocultar");
    $("#enivelesPuntosMax, #enivelesPuntosDisp, #_sliderNivelesDiv, .enivel1, .enivel2, .enivel3, .enivel4, .enivel5, .enivel6, .enivel7, .enivel8, .enivel9, .enivel10, .bloqbotonaddNivel").addClass("ocultar");
    $(".e_comp, .nivel").val('');
    $(".campo_puntos").val('0');
}



function e_seleccionaFGC(cualIndex, cualFactor, cualGrupo, cualCompetencia) {

    // Factor

    // Grupo
    var arrayListadoGrupos = listadoFactores.grupos['f' + cualFactor];
    console.log('arrayListadoGrupos', arrayListadoGrupos);
    var cuantosGrupos = Object.keys(arrayListadoGrupos).length;
    // var cuantosGrupos = Object.keys(arrayListadoGrupos).map(function(e) {
    //     return arrayListadoGrupos[e].length;
    // })
    console.log('cuantosGrupos', cuantosGrupos);
    // console.log('listadoGrupos keys', Object.keys(arrayListadoGrupos));
    // console.log('listadoGrupos values', Object.values(arrayListadoGrupos));
    // var arraylosGrupos = Object.values(arrayListadoGrupos);
    var arraylosGrupos = Object.keys(arrayListadoGrupos).map(function(e) {
        return arrayListadoGrupos[e]
    })
    // console.log('losGrupos', losGrupos);

    var options_grupos = "";
    options_grupos += "<option value='0' disabled>Selecciona una opción</option>";
    for (a = 0; a < cuantosGrupos; a++) {
        options_grupos += "<option value='" + (a + 1) + "'>" + arraylosGrupos[a] + "</option>";
    }
    $("#e_listaGrupos" + cualIndex).html(options_grupos);

    // Competencia
    var arraylistadoCompetencias = listadoFactores.competencias['f' + cualFactor]['g' + cualGrupo];
    console.log('arraylistadoCompetencias', arraylistadoCompetencias);
    var cuantasCompetencias = Object.keys(arraylistadoCompetencias).length;
    // var cuantasCompetencias = Object.keys(arraylistadoCompetencias).map(function(e) {
    //     return arraylistadoCompetencias[e].length;
    // })
    console.log('cuantasCompetencias', cuantasCompetencias);
    // console.log('arraylistadoCompetencias keys', Object.keys(arraylistadoCompetencias));
    // console.log('arraylistadoCompetencias values', Object.values(arraylistadoCompetencias));
    // arraylasCompetencias = Object.values(arraylistadoCompetencias);
    var arraylasCompetencias = Object.keys(arraylistadoCompetencias).map(function(e) {
        return arraylistadoCompetencias[e]
    })
    console.log('arraylasCompetencias', arraylasCompetencias);

    var options_competencias = "";
    options_competencias += "<option value='0' disabled>Selecciona una opción</option>";
    for (a = 0; a < cuantasCompetencias; a++) {
        options_competencias += "<option value='" + (a + 1) + "'>" + arraylasCompetencias[a] + "</option>";
    }
    $("#e_listaCompetencias" + cualIndex).html(options_competencias);

    factorSeleccionado = cualFactor;
    GrupoSeleccionado = cualGrupo;
    competenciaSeleccionada = cualCompetencia;

    $("#e_listaFactores" + cualIndex).val(cualFactor);
    $("#e_listaGrupos" + cualIndex).val(cualGrupo);
    $("#e_listaCompetencias" + cualIndex).val(cualCompetencia);

    return;
}




function loadAmbienteAA(leccion) {
    console.log('loadAmbienteAA', leccion);

    cierraMenuAmbientes();
    _cleanAddAmbienteAprendizaje();
    limpiaCompetencia(0);

    cualLeccion = leccion;
    laLeccion = leccion;
    var leccionKey = that['leccion' + leccion + '_Id'];
    console.log('leccionKey', leccionKey);
    var NombreAA = that['leccion' + leccion + '_Nombre'];
    console.log('NombreAA', NombreAA);
    $("#_aanombre").val(NombreAA);
    var Visible = that['leccion' + leccion + '_Visible'];
    if (Visible) {
        // $("#_aaVisible").addClass('active');
    } else {
        // $("#_aaVisible").removeClass('active');
    }

    // cargar competencias
    firebase.database().ref(laUrlBase + 'Lecciones/' + leccionKey + "/Competencias").once('value').then(function(snapshot) {
        if (snapshot.val() != null) {

            console.log(snapshot.val());
            if (snapshot.numChildren() > 0) {
                console.log(snapshot.val());
                $("#erCompetencias").addClass('active');
                $(".ebloqbotonadd, #eaddComp").removeClass('ocultar');

                var competencia1 = firebase.database().ref("Lecciones/" + leccionKey + "/Competencias/competencia1");
                competencia1.once('value').then(function(snapshot) {
                    if (snapshot != null) {
                        console.log("competencia1_hijos: " + snapshot.numChildren());
                        console.log("competencia1_val: " + snapshot.val());
                        var obj = snapshot.val();
                        if (snapshot.numChildren() > 0) {
                            $(".e_competencia1").removeClass('ocultar');
                            console.log('Factor: ' + obj.Factor);
                            console.log('Grupo: ' + obj.Grupo);
                            console.log('Competencia: ' + obj.Competencia);

                            e_seleccionaFGC(1, parseInt(obj.Factor), parseInt(obj.Grupo), parseInt(obj.Competencia));

                        }
                    }
                });

                var competencia2 = firebase.database().ref("Lecciones/" + leccionKey + "/Competencias/competencia2");
                competencia2.once('value').then(function(snapshot) {
                    if (snapshot != null) {
                        console.log("competencia2_hijos: " + snapshot.numChildren());
                        console.log("competencia2_val: " + snapshot.val());
                        var obj = snapshot.val();
                        if (snapshot.numChildren() > 0) {
                            $(".e_competencia2").removeClass('ocultar');
                            console.log('Nombre: ' + obj.Nombre);
                            console.log('Factor: ' + obj.Factor);
                            console.log('Grupo: ' + obj.Grupo);
                            $("#ercNombre2").val(obj.Nombre);
                            $("#ercFactor2").val(obj.Factor);
                            $("#ercGrupo2").val(obj.Grupo);

                            e_seleccionaFGC(2, parseInt(obj.Factor), parseInt(obj.Grupo), parseInt(obj.Competencia));
                        }
                    }
                });

                var competencia3 = firebase.database().ref("Lecciones/" + leccionKey + "/Competencias/competencia3");
                competencia3.once('value').then(function(snapshot) {
                    if (snapshot != null) {
                        console.log("competencia3_hijos: " + snapshot.numChildren());
                        console.log("competencia3_val: " + snapshot.val());
                        var obj = snapshot.val();
                        if (snapshot.numChildren() > 0) {
                            $(".e_competencia3").removeClass('ocultar');
                            console.log('Nombre: ' + obj.Nombre);
                            console.log('Factor: ' + obj.Factor);
                            console.log('Grupo: ' + obj.Grupo);
                            $("#ercNombre3").val(obj.Nombre);
                            $("#ercFactor3").val(obj.Factor);
                            $("#ercGrupo3").val(obj.Grupo);

                            e_seleccionaFGC(3, parseInt(obj.Factor), parseInt(obj.Grupo), parseInt(obj.Competencia));
                        }
                    }
                });

                var competencia4 = firebase.database().ref("Lecciones/" + leccionKey + "/Competencias/competencia4");
                competencia4.once('value').then(function(snapshot) {
                    if (snapshot != null) {
                        console.log("competencia4_hijos: " + snapshot.numChildren());
                        console.log("competencia4_val: " + snapshot.val());
                        var obj = snapshot.val();
                        if (snapshot.numChildren() > 0) {
                            $(".e_competencia4").removeClass('ocultar');
                            console.log('Nombre: ' + obj.Nombre);
                            console.log('Factor: ' + obj.Factor);
                            console.log('Grupo: ' + obj.Grupo);
                            $("#ercNombre4").val(obj.Nombre);
                            $("#ercFactor4").val(obj.Factor);
                            $("#ercGrupo4").val(obj.Grupo);

                            e_seleccionaFGC(4, parseInt(obj.Factor), parseInt(obj.Grupo), parseInt(obj.Competencia));
                        }
                    }
                });

                var competencia5 = firebase.database().ref("Lecciones/" + leccionKey + "/Competencias/competencia5");
                competencia5.once('value').then(function(snapshot) {
                    if (snapshot != null) {
                        console.log("competencia5_hijos: " + snapshot.numChildren());
                        console.log("competencia5_val: " + snapshot.val());
                        var obj = snapshot.val();
                        if (snapshot.numChildren() > 0) {
                            $(".e_competencia5").removeClass('ocultar');
                            console.log('Nombre: ' + obj.Nombre);
                            console.log('Factor: ' + obj.Factor);
                            console.log('Grupo: ' + obj.Grupo);
                            $("#ercNombre5").val(obj.Nombre);
                            $("#ercFactor5").val(obj.Factor);
                            $("#ercGrupo5").val(obj.Grupo);

                            e_seleccionaFGC(5, parseInt(obj.Factor), parseInt(obj.Grupo), parseInt(obj.Competencia));
                        }
                    }
                });

            }
        }
    });


    // cargar niveles
    firebase.database().ref(laUrlBase + 'Lecciones/' + leccionKey + "/Niveles").once('value').then(function(snapshot) {
        if (snapshot.val() != null) {

            // console.log(snapshot.val());
            if (snapshot.numChildren() > 0) {
                console.log(snapshot.val());
                $("#erNiveles").addClass('active');
                $(".ebloqbotonadd, .bloqbotonaddNivel").removeClass('ocultar');
                $("#enivelesPuntosMax, #enivelesPuntosDisp").removeClass('ocultar');
                $("#_sliderNivelesDiv").removeClass("ocultar");

                var nivel1 = firebase.database().ref("Lecciones/" + leccionKey + "/Niveles/nivel1");
                nivel1.once('value').then(function(snapshot) {
                    if (snapshot != null) {
                        // console.log("nivel1_hijos: " + snapshot.numChildren());
                        // console.log("nivel1_val: " + snapshot.val());
                        var obj = snapshot.val();
                        if (snapshot.numChildren() > 0) {
                            $(".enivel1").removeClass('ocultar');
                            $("#edelNivel1").show();
                            console.log('Nombre: ' + obj.nombre);
                            console.log('Puntos: ' + obj.puntos);
                            $("#ercNombreNivel1").val(obj.nombre);
                            $("#epuntosdelNivel1").val(obj.puntos);
                            recuentaNiveles();
                        }
                    }
                });

                var nivel2 = firebase.database().ref("Lecciones/" + leccionKey + "/Niveles/nivel2");
                nivel2.once('value').then(function(snapshot) {
                    if (snapshot != null) {
                        // console.log("nivel2_hijos: " + snapshot.numChildren());
                        // console.log("nivel2_val: " + snapshot.val());
                        var obj = snapshot.val();
                        if (snapshot.numChildren() > 0) {
                            $(".enivel2").removeClass('ocultar');
                            $("#edelNivel1").hide();
                            $("#edelNivel2").show();
                            console.log('Nombre: ' + obj.nombre);
                            console.log('Puntos: ' + obj.puntos);
                            $("#ercNombreNivel2").val(obj.nombre);
                            $("#epuntosdelNivel2").val(obj.puntos);
                            $('#epuntosdelNivel2').attr('minimo', ((parseInt($('#epuntosdelNivel1').val())) + 1));
                            recuentaNiveles();
                        }
                    }
                });

                var nivel3 = firebase.database().ref("Lecciones/" + leccionKey + "/Niveles/nivel3");
                nivel3.once('value').then(function(snapshot) {
                    if (snapshot != null) {
                        // console.log("nivel3_hijos: " + snapshot.numChildren());
                        // console.log("nivel3_val: " + snapshot.val());
                        var obj = snapshot.val();
                        if (snapshot.numChildren() > 0) {
                            $(".enivel3").removeClass('ocultar');
                            $("#edelNivel2").hide();
                            $("#edelNivel3").show();
                            console.log('Nombre: ' + obj.nombre);
                            console.log('Puntos: ' + obj.puntos);
                            $("#ercNombreNivel3").val(obj.nombre);
                            $("#epuntosdelNivel3").val(obj.puntos);
                            $('#epuntosdelNivel3').attr('minimo', ((parseInt($('#epuntosdelNivel2').val())) + 1));
                            recuentaNiveles();
                        }
                    }
                });

                var nivel4 = firebase.database().ref("Lecciones/" + leccionKey + "/Niveles/nivel4");
                nivel4.once('value').then(function(snapshot) {
                    if (snapshot != null) {
                        // console.log("nivel4_hijos: " + snapshot.numChildren());
                        // console.log("nivel4_val: " + snapshot.val());
                        var obj = snapshot.val();
                        if (snapshot.numChildren() > 0) {
                            $(".enivel4").removeClass('ocultar');
                            $("#edelNivel3").hide();
                            $("#edelNivel4").show();
                            console.log('Nombre: ' + obj.nombre);
                            console.log('Puntos: ' + obj.puntos);
                            $("#ercNombreNivel4").val(obj.nombre);
                            $("#epuntosdelNivel4").val(obj.puntos);
                            $('#epuntosdelNivel4').attr('minimo', ((parseInt($('#epuntosdelNivel3').val())) + 1));
                            recuentaNiveles();
                        }
                    }
                });

                var nivel5 = firebase.database().ref("Lecciones/" + leccionKey + "/Niveles/nivel5");
                nivel5.once('value').then(function(snapshot) {
                    if (snapshot != null) {
                        // console.log("nivel5_hijos: " + snapshot.numChildren());
                        // console.log("nivel5_val: " + snapshot.val());
                        var obj = snapshot.val();
                        if (snapshot.numChildren() > 0) {
                            $(".enivel5").removeClass('ocultar');
                            $("#edelNivel4").hide();
                            $("#edelNivel5").show();
                            console.log('Nombre: ' + obj.nombre);
                            console.log('Puntos: ' + obj.puntos);
                            $("#ercNombreNivel5").val(obj.nombre);
                            $("#epuntosdelNivel5").val(obj.puntos);
                            $('#epuntosdelNivel5').attr('minimo', ((parseInt($('#epuntosdelNivel4').val())) + 1));
                            recuentaNiveles();
                        }
                    }
                });

                var nivel6 = firebase.database().ref("Lecciones/" + leccionKey + "/Niveles/nivel6");
                nivel6.once('value').then(function(snapshot) {
                    if (snapshot != null) {
                        // console.log("nivel6_hijos: " + snapshot.numChildren());
                        // console.log("nivel6_val: " + snapshot.val());
                        var obj = snapshot.val();
                        if (snapshot.numChildren() > 0) {
                            $(".enivel6").removeClass('ocultar');
                            $("#edelNivel5").hide();
                            $("#edelNivel6").show();
                            console.log('Nombre: ' + obj.nombre);
                            console.log('Puntos: ' + obj.puntos);
                            $("#ercNombreNivel6").val(obj.nombre);
                            $("#epuntosdelNivel6").val(obj.puntos);
                            $('#epuntosdelNivel6').attr('minimo', ((parseInt($('#epuntosdelNivel5').val())) + 1));
                            recuentaNiveles();
                        }
                    }
                });

                var nivel7 = firebase.database().ref("Lecciones/" + leccionKey + "/Niveles/nivel7");
                nivel7.once('value').then(function(snapshot) {
                    if (snapshot != null) {
                        // console.log("nivel7_hijos: " + snapshot.numChildren());
                        // console.log("nivel7_val: " + snapshot.val());
                        var obj = snapshot.val();
                        if (snapshot.numChildren() > 0) {
                            $(".enivel7").removeClass('ocultar');
                            $("#edelNivel6").hide();
                            $("#edelNivel7").show();
                            console.log('Nombre: ' + obj.nombre);
                            console.log('Puntos: ' + obj.puntos);
                            $("#ercNombreNivel7").val(obj.nombre);
                            $("#epuntosdelNivel7").val(obj.puntos);
                            $('#epuntosdelNivel7').attr('minimo', ((parseInt($('#epuntosdelNivel6').val())) + 1));
                            recuentaNiveles();
                        }
                    }
                });

                var nivel8 = firebase.database().ref("Lecciones/" + leccionKey + "/Niveles/nivel8");
                nivel8.once('value').then(function(snapshot) {
                    if (snapshot != null) {
                        // console.log("nivel8_hijos: " + snapshot.numChildren());
                        // console.log("nivel8_val: " + snapshot.val());
                        var obj = snapshot.val();
                        if (snapshot.numChildren() > 0) {
                            $(".enivel8").removeClass('ocultar');
                            $("#edelNivel7").hide();
                            $("#edelNivel8").show();
                            console.log('Nombre: ' + obj.nombre);
                            console.log('Puntos: ' + obj.puntos);
                            $("#ercNombreNivel8").val(obj.nombre);
                            $("#epuntosdelNivel8").val(obj.puntos);
                            $('#epuntosdelNivel8').attr('minimo', ((parseInt($('#epuntosdelNivel7').val())) + 1));
                            recuentaNiveles();
                        }
                    }
                });

                var nivel9 = firebase.database().ref("Lecciones/" + leccionKey + "/Niveles/nivel9");
                nivel9.once('value').then(function(snapshot) {
                    if (snapshot != null) {
                        // console.log("nivel9_hijos: " + snapshot.numChildren());
                        // console.log("nivel9_val: " + snapshot.val());
                        var obj = snapshot.val();
                        if (snapshot.numChildren() > 0) {
                            $(".enivel9").removeClass('ocultar');
                            $("#edelNivel8").hide();
                            $("#edelNivel9").show();
                            console.log('Nombre: ' + obj.nombre);
                            console.log('Puntos: ' + obj.puntos);
                            $("#ercNombreNivel9").val(obj.nombre);
                            $("#epuntosdelNivel9").val(obj.puntos);
                            $('#epuntosdelNivel9').attr('minimo', ((parseInt($('#epuntosdelNivel8').val())) + 1));
                            recuentaNiveles();
                        }
                    }
                });

                var nivel10 = firebase.database().ref("Lecciones/" + leccionKey + "/Niveles/nivel10");
                nivel10.once('value').then(function(snapshot) {
                    if (snapshot != null) {
                        // console.log("nivel10_hijos: " + snapshot.numChildren());
                        // console.log("nivel10_val: " + snapshot.val());
                        var obj = snapshot.val();
                        if (snapshot.numChildren() > 0) {
                            $(".enivel10").removeClass('ocultar');
                            $("#edelNivel9").hide();
                            $("#edelNivel10").show();
                            console.log('Nombre: ' + obj.nombre);
                            console.log('Puntos: ' + obj.puntos);
                            $("#ercNombreNivel10").val(obj.nombre);
                            $("#epuntosdelNivel10").val(obj.puntos);
                            $('#epuntosdelNivel10').attr('minimo', ((parseInt($('#epuntosdelNivel9').val())) + 1));
                            recuentaNiveles();
                        }
                    }
                });
            }
        }
    });

    function recuentaNiveles() {

        cuantosNivelesHay = that['leccion' + leccion + '_NumNiveles'];
        console.log('cuantosNivelesHay: ', cuantosNivelesHay);
        emaximoPuntosNiveles = that['leccion' + leccion + 'puntosNivelesTotal'];
        console.log('emaximoPuntosNiveles: ', emaximoPuntosNiveles);

        $('#ercPuntosNivel').text(emaximoPuntosNiveles);
        // if (!$('#_sliderNiveles')[0].noUiSlider) {
        creaNivelesPuntos('ed', cuantosNivelesHay, emaximoPuntosNiveles);
        // }

        // se bloquean los niveles si no hay puntos disponibles
        emaximoPuntosNiveles = that['leccion' + cualLeccion + 'puntosNivelesTotal'];
        console.log('emaximoPuntosNiveles: ', emaximoPuntosNiveles);

        if (emaximoPuntosNiveles <= 0) {
            $("#erNiveles").addClass('botonDeshabilitado');
        } else {
            $("#erNiveles").removeClass('botonDeshabilitado');
        }
    }

    $("#_idLeccionAAMA").val(leccionKey);

}



function editarAmbienteAprendizaje() {

    $(".txError, #errorComp").addClass("ocultar");
    var errors = false;
    AmbienteAprendizaje = {};
    // AmbienteAprendizaje.Visible = $("#_aaVisible").hasClass("active");
    AmbienteAprendizaje.Visible = true;
    AmbienteAprendizaje.Nombre = $("#_aanombre").val();


    // competencias
    var competencias = {};

    if ($("#erCompetencias").hasClass('active')) {

        if (!$(".e_competencia1").hasClass('ocultar')) {
            var factor1 = $("#e_listaFactores1").val();
            var grupo1 = $("#e_listaGrupos1").val();
            var competencia1 = $("#e_listaCompetencias1").val();
            if (factor1 != null && grupo1 != null && competencia1 != null) {
                competencias.competencia1 = {
                    'Factor': factor1,
                    'Grupo': grupo1,
                    'Competencia': competencia1
                };
            } else {
                errorComps = true;
                $("#errorComp").removeClass("ocultar");
            }
        }
        if (!$(".e_competencia2").hasClass('ocultar')) {
            var factor2 = $("#e_listaFactores2").val();
            var grupo2 = $("#e_listaGrupos2").val();
            var competencia2 = $("#e_listaCompetencias2").val();
            if (factor2 != null && grupo2 != null && competencia2 != null) {
                competencias.competencia2 = {
                    'Factor': factor2,
                    'Grupo': grupo2,
                    'Competencia': competencia2
                };
            } else {
                errorComps = true;
                $("#errorComp").removeClass("ocultar");
            }
        }
        if (!$(".e_competencia3").hasClass('ocultar')) {
            var factor3 = $("#e_listaFactores3").val();
            var grupo3 = $("#e_listaGrupos3").val();
            var competencia3 = $("#e_listaCompetencias3").val();
            if (factor3 != null && grupo3 != null && competencia3 != null) {
                competencias.competencia3 = {
                    'Factor': factor3,
                    'Grupo': grupo3,
                    'Competencia': competencia3
                };
            } else {
                errorComps = true;
                $("#errorComp").removeClass("ocultar");
            }
        }
        if (!$(".e_competencia4").hasClass('ocultar')) {
            var factor4 = $("#e_listaFactores4").val();
            var grupo4 = $("#e_listaGrupos4").val();
            var competencia4 = $("#e_listaCompetencias4").val();
            if (factor4 != null && grupo4 != null && competencia4 != null) {
                competencias.competencia4 = {
                    'Factor': factor4,
                    'Grupo': grupo4,
                    'Competencia': competencia4
                };
            } else {
                errorComps = true;
                $("#errorComp").removeClass("ocultar");
            }
        }
        if (!$(".e_competencia5").hasClass('ocultar')) {
            var factor5 = $("#e_listaFactores5").val();
            var grupo5 = $("#e_listaGrupos5").val();
            var competencia5 = $("#e_listaCompetencias5").val();
            if (factor5 != null && grupo5 != null && competencia5 != null) {
                competencias.competencia5 = {
                    'Factor': factor5,
                    'Grupo': grupo5,
                    'Competencia': competencia5
                };
            } else {
                errorComps = true;
                $("#errorComp").removeClass("ocultar");
            }
        }
    }

    if ($("#erCompetencias").hasClass('active')) {
        AmbienteAprendizaje.Competencias = competencias;
    } else {
        AmbienteAprendizaje.Competencias = "no";
    }


    // niveles
    var niveles = {};

    if ($("#erNiveles").hasClass('active')) {

        $("#enivelesPuntosMax, #enivelesPuntosDisp").removeClass('ocultar');
        $("#_sliderNivelesDiv").removeClass("ocultar");

        // emaximoPuntosNiveles = parseInt($("#ercPuntosNivel").text());
        // if (!$('#_sliderNiveles')[0].noUiSlider) {
        //     creaNivelesPuntos('ed', cuantosNivelesHay, emaximoPuntosNiveles);
        // }

        if (!$(".enivel1").hasClass('ocultar')) {
            var niv1 = $("#ercNombreNivel1").val();
            var puntos1 = thas['puntosNivel' + 1];
            console.log(puntos1)
            if (niv1.length > 0) {
                niveles.nivel1 = {
                    'nombre': niv1,
                    'puntos': puntos1
                };
            } else {
                errorNiveles = true;
                $("#errorNivel").removeClass("ocultar");
            }
        }
        if (!$(".enivel2").hasClass('ocultar')) {
            var niv2 = $("#ercNombreNivel2").val();
            var puntos2 = thas['puntosNivel' + 2];
            if (niv2.length > 0) {
                niveles.nivel2 = {
                    'nombre': niv2,
                    'puntos': puntos2
                };
            } else {
                errorNiveles = true;
                $("#errorNivel").removeClass("ocultar");
            }
        }
        if (!$(".enivel3").hasClass('ocultar')) {
            var niv3 = $("#ercNombreNivel3").val();
            var puntos3 = thas['puntosNivel' + 3];
            if (niv3.length > 0) {
                niveles.nivel3 = {
                    'nombre': niv3,
                    'puntos': puntos3
                };
            } else {
                errorNiveles = true;
                $("#errorNivel").removeClass("ocultar");
            }
        }
        if (!$(".enivel4").hasClass('ocultar')) {
            var niv4 = $("#ercNombreNivel4").val();
            var puntos4 = thas['puntosNivel' + 4];
            if (niv4.length > 0) {
                niveles.nivel4 = {
                    'nombre': niv4,
                    'puntos': puntos4
                };
            } else {
                errorNiveles = true;
                $("#errorNivel").removeClass("ocultar");
            }
        }
        if (!$(".enivel5").hasClass('ocultar')) {
            var niv5 = $("#ercNombreNivel5").val();
            var puntos5 = thas['puntosNivel' + 5];
            if (niv5.length > 0) {
                niveles.nivel5 = {
                    'nombre': niv5,
                    'puntos': puntos5
                };
            } else {
                errorNiveles = true;
                $("#errorNivel").removeClass("ocultar");
            }
        }
        if (!$(".enivel6").hasClass('ocultar')) {
            var niv6 = $("#ercNombreNivel6").val();
            var puntos6 = thas['puntosNivel' + 6];
            if (niv6.length > 0) {
                niveles.nivel6 = {
                    'nombre': niv6,
                    'puntos': puntos6
                };
            } else {
                errorNiveles = true;
                $("#errorNivel").removeClass("ocultar");
            }
        }
        if (!$(".enivel7").hasClass('ocultar')) {
            var niv7 = $("#ercNombreNivel7").val();
            var puntos7 = thas['puntosNivel' + 7];
            if (niv7.length > 0) {
                niveles.nivel7 = {
                    'nombre': niv7,
                    'puntos': puntos7
                };
            } else {
                errorNiveles = true;
                $("#errorNivel").removeClass("ocultar");
            }
        }
        if (!$(".enivel8").hasClass('ocultar')) {
            var niv8 = $("#ercNombreNivel8").val();
            var puntos8 = thas['puntosNivel' + 8];
            if (niv8.length > 0) {
                niveles.nivel8 = {
                    'nombre': niv8,
                    'puntos': puntos8
                };
            } else {
                errorNiveles = true;
                $("#errorNivel").removeClass("ocultar");
            }
        }
        if (!$(".enivel9").hasClass('ocultar')) {
            var niv9 = $("#ercNombreNivel9").val();
            var puntos9 = thas['puntosNivel' + 9];
            if (niv9.length > 0) {
                niveles.nivel9 = {
                    'nombre': niv9,
                    'puntos': puntos9
                };
            } else {
                errorNiveles = true;
                $("#errorNivel").removeClass("ocultar");
            }
        }
        if (!$(".enivel10").hasClass('ocultar')) {
            var niv10 = $("#ercNombreNivel10").val();
            var puntos10 = thas['puntosNivel' + 10];
            if (niv10.length > 0) {
                niveles.nivel10 = {
                    'nombre': niv10,
                    'puntos': puntos10
                };
            } else {
                errorNiveles = true;
                $("#errorNivel").removeClass("ocultar");
            }
        }
    }


    if ($("#erNiveles").hasClass('active')) {

        // emaximoPuntosNiveles = parseInt($("#ercPuntosNivel").text());

        AmbienteAprendizaje.Niveles = niveles;
        // AmbienteAprendizaje.Niveles.PuntosTotal = emaximoPuntosNiveles;
    } else {
        AmbienteAprendizaje.Niveles = "no";
    }



    if (AmbienteAprendizaje.Nombre.length === 0) {
        errors = true;
        $(".txError").removeClass("ocultar");
    }

    if (!errors) {
        var ambienteId = $("#_idLeccionAAMA").val();
        AmbienteAprendizaje.Id = ambienteId;
        EditarOkAmbienteAprendizaje(AmbienteAprendizaje);
    }

}

function EditarOkAmbienteAprendizaje(AmbienteAprendizaje) {
    console.log("[ADD AmbienteAprendizaje]", AmbienteAprendizaje);
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
            // $("#modalEditarLeccion .close").click();
            cleanAddAmbienteAprendizaje();
            cuentaLecciones();
            pintaLecciones();
            $.notify({
                message: '<strong>Ambiente de aprendizaje</strong> actualizado exitosamente'
            }, {
                type: 'success',
                allow_dismiss: true,
                delay: 1500,
                allow_dismiss: false
            });
            console.log('Sincronización realizada.');
            $("#modalEditarLeccion .close").click();
        }
    };

    firebase.auth().signInWithEmailAndPassword(email_master, password_master).then(function(result) {
        var dataRef = firebase.database().ref(laUrlBase + 'Lecciones'); //Obtengo nodo.
        var keyAA = dataRef.ref.child(AmbienteAprendizaje.Id); //Agrego recurso vacio con ID:recurso.Id .
        firebase.database().ref(keyAA).update(AmbienteAprendizaje, onComplete); //Reemplazo datos.
    });

}

//***Añadir módulo a Ambiente de Aprendizaje ******************//
function cleanAddModuloAA() {
    $(".txError").addClass("ocultar");
    $("#mnombre").val("");
    $("#orden").val("");
}

function addModuloAA() {
    $(".txError").addClass("ocultar");
    var errors = false;
    Modulo = {};

    Modulo.Nombre = $("#mnombre").val();
    if (Modulo.Nombre.length === 0) {
        errors = true;
        $(".txError").removeClass("ocultar");
    }

    // Modulo.Orden = $("#orden").val();
    Modulo.Orden = (parseInt(that['leccion' + laLeccion + '_cuantosModulos']) + 1);
    console.log('Modulo.Orden', Modulo.Orden);

    if (Modulo.Orden.length === 0) {
        errors = true;
        $("#sorden").removeClass("ocultar");
    }

    if (isNaN(Modulo.Orden)) {
        // errors = true;
        Modulo.Orden = 1;
        $("#sorden").removeClass("ocultar");
    }

    if (!errors) {
        var moduloId = generarId();
        Modulo.Id = "modulo_" + moduloId;
        Modulo.Recursos = 'no';
        var AmbienteAprendiza = $("#moduloIDaa").val();
        registraModuloAA(Modulo, AmbienteAprendiza);
    }
}

function registraModuloAA(Modulo, AmbienteAprendiza) {
    console.log("[ADD Módulo a Ambiente Aprendizaje]", Modulo, ' en el ambiente ', AmbienteAprendiza);


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
            // $("#modalAgregaModulo .close").click();
            cleanAddModuloAA();
            cuentaLecciones();
            pintaLecciones();
            $.notify({
                message: '<strong>Módulo</strong> añadido exitosamente a Ambiente de aprendizaje'
            }, {
                type: 'success',
                allow_dismiss: true,
                delay: 1500,
                allow_dismiss: false
            });
            console.log('Sincronización realizada.');
            $("#modalAgregaModulo .close").click();
        }
    };
    firebase.auth().signInWithEmailAndPassword(email_master, password_master).then(function(result) {
        var dataRef = firebase.database().ref(laUrlBase + 'Lecciones/' + AmbienteAprendiza + '/Modulos/'); //Obtengo nodo.
        var keyModAA = dataRef.ref.child(Modulo.Id); //Agrego recurso vacio con ID:recurso.Id .
        firebase.database().ref(keyModAA).set(Modulo, onComplete); //Reemplazo datos.
    });
    //popupMessage("SUCCESS"," ");
}
//***Añadir módulo a Ambiente de Aprendizaje ******************//

//Eliminar módulo a Ambiente de Aprendizaje******************//
function eliminarModuloAA(leccion, modulo) {
    console.log("[ELIMINAR: eliminarModuloAA]", a);
    $('#modalBorrarModuloAA').modal({
        transition: 'scale'
    }).modal('show');

    $(document).off('click', '#botonCancelarBorrarModuloAA').on('click', '#botonCancelarBorrarModuloAA', function(e) {
        console.log("Click Cancelar:  botonCancelarBorrarModuloAA");
    });
    $(document).off('click', '#botonAceptarBorrarModuloAA').on('click', '#botonAceptarBorrarModuloAA', function(e) {
        console.log("Click Aceptar:  botonAceptarBorrarModuloAA");
        var leccionKey = that['leccion' + leccion + '_Id'];
        var moduloKey = that['leccion' + leccion + '_Modulo' + modulo + '_Id'];
        var key = "Lecciones/" + leccionKey + "/Modulos/" + moduloKey;
        fbEliminarModuloAA(key);
    });
}


function fbEliminarModuloAA(key) {
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
                cuentaLecciones();
                pintaLecciones();
            }, 100);

            $.notify({
                message: 'El módulo se borró exitosamente'
            }, {
                type: 'info',
                allow_dismiss: true,
                delay: 1500,
                allow_dismiss: false,
            });
        };
    };

    if (revisaConexion) {
        firebase.database().ref().child('' + key).remove(onComplete);
    }
}
//Eliminar módulo a Ambiente de Aprendizaje******************//
//Editar módulo a Ambiente de Aprendizaje******************//
function _cleanAddModuloAA() {
    $(".txError").addClass("ocultar");
    $("#_mnombre").val("");
    $("#_orden").val("");

}

function loadModuloEnAA(leccion, modulo) {
    console.log('loadModuloEnAA', leccion, modulo);
    _cleanAddModuloAA();

    $("#_orden").attr('min', '1');
    $("#_orden").attr('max', that['leccion' + leccion + '_NumModulos']);


    var leccionKey = that['leccion' + leccion + '_Id'];
    var moduloKey = that['leccion' + leccion + '_Modulo' + modulo + '_Id'];
    $("#_idLeccionModuloAA").val(leccionKey);
    $("#_idLeccionLeccionModuloAA").val(moduloKey);

    $("#_mnombre").val(that['leccion' + leccion + '_Modulo' + modulo + '_Nombre']);
    $("#_orden").val(that['leccion' + leccion + '_Modulo' + modulo + '_Orden']);

    $('#tituloEditModuloAA').empty();
    $('#tituloEditModuloAA').append('Editar módulo ' + that['leccion' + leccion + '_Modulo' + modulo + '_Nombre']);
}

function UpdateModuloAA() {
    $(".txError").addClass("ocultar");
    var errors = false;
    Modulo = {};
    Modulo.Nombre = $("#_mnombre").val();
    if (Modulo.Nombre.length === 0) {
        errors = true;
        $(".txError").removeClass("ocultar");
    }

    // Modulo.Orden = $("#_orden").val();
    // Modulo.Orden = (parseInt(that['leccion' + cualLeccion + '_cuantosModulos']) + 1);

    // if (Modulo.Orden.length === 0) {
    //     errors = true;
    //     $("#sorden").removeClass("ocultar");
    // }

    // if (isNaN(Modulo.Orden)) {
    //     errors = true;
    //     $("#sorden").removeClass("ocultar");
    // }

    if (!errors) {

        Modulo.Id = $("#_idLeccionLeccionModuloAA").val();
        var AmbienteAprendiza = $("#_idLeccionModuloAA").val();
        editModuloAA(Modulo, AmbienteAprendiza);
    }
}

function editModuloAA(Modulo, AmbienteAprendiza) {
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
            // $("#modalEditarModuloAA .close").click();
            cleanAddModuloAA();
            cuentaLecciones();
            pintaLecciones();
            $.notify({
                message: '<strong>Módulo</strong> editado exitosamente a Ambiente de aprendizaje'
            }, {
                type: 'success',
                allow_dismiss: true,
                delay: 1500,
                allow_dismiss: false
            });
            console.log('Sincronización realizada.');
            $("#modalEditarModuloAA .close").click();
        }
    };
    firebase.auth().signInWithEmailAndPassword(email_master, password_master).then(function(result) {
        var dataRef = firebase.database().ref(laUrlBase + 'Lecciones/' + AmbienteAprendiza + '/Modulos/'); //Obtengo nodo.
        var keyModAA = dataRef.ref.child(Modulo.Id); //Agrego recurso vacio con ID:recurso.Id .
        firebase.database().ref(keyModAA).update(Modulo, onComplete); //Reemplazo datos.
    });
}
//Editar módulo a Ambiente de Aprendizaje******************//

//AddRecursoenModuloAA
function cargarRecursosFromFirebase() {
    var child = firebase.database().ref("Recursos/");
    i = 0;
    child.on("value", function(snapshot) {
        if (snapshot.numChildren() > 0) {
            snapshot.forEach(function(childSnapshot) {
                var recursoKey = childSnapshot.key;
                var nietos = firebase.database().ref("Recursos/" + recursoKey);
                nietos.on("value", function(nn) {
                    if (nn.numChildren() > 0) {
                        var ID = nn.val().Id;
                        var ID_portada = nn.val().Id;
                        var ID_categoria = nn.val().Id;
                        var Name = nn.val().Nombre;
                        var Portada = nn.val().Portada;
                        var Categoria = nn.val().Categoria;
                        LISTADO += "<option value='" + ID + "'>" + Name + "</option>";
                        RECURSOS[ID] = Name;
                        RECURSOS[ID + '_portada'] = Portada;
                        RECURSOS[ID + '_categoria'] = Categoria;
                    }
                });
            });
        }
    });
}
RECURSOS = {};
LISTADO = "";
cargarRecursosFromFirebase();

function loadRecursosenModuloAA() {
    $("#selectRecursos").html(LISTADO);
    $("#_selectRecursos").html(LISTADO);
}

function cargarInsigniasFromDirectory() {
    $.get("php/insignias.php")
        .done(function(data) {
            $("#insigniasIconos").html(data);
            $("#_insigniasIconos").html(data);
        })
        .fail(function(error) {
            $("#insigniasIconos").html("<p>No existen insignias disponibles</p>");
            $("#_insigniasIconos").html("<p>No existen insignias disponibles</p>");
        });
}

function cleanInsignia() {
    $("#divInsignia .form-control").val('');
    $("#otorgada").removeClass('active');
    // $("#insigniaImagenPortada").attr('src',"img/recurso.jpg");
}

function _cleanInsignia() {
    $("#_divInsignia .form-control").val('');
    $("#_otorgada").removeClass('active');
    $("#_insg_calif_min, #_insg_tmp_min, #insigniaCon_edit").fadeOut();
    // $("#_insigniaImagenPortada").attr('src',"img/recurso.jpg");
}

// function cargarNivelesFromDirectory() {
//     $.get("php/niveles.php")
//         .done(function(data) {
//             $("#nivelesIcono1, #nivelesIcono2, #nivelesIcono3, #nivelesIcono4, #nivelesIcono5, #nivelesIcono6, #nivelesIcono7, #nivelesIcono8, #nivelesIcono9, #nivelesIcono10").html(data);
//             $("#_nivelesIcono1, #_nivelesIcono2, #_nivelesIcono3, #_nivelesIcono4, #_nivelesIcono5, #_nivelesIcono6, #_nivelesIcono7, #_nivelesIcono8, #_nivelesIcono9, #_nivelesIcono10").html(data);
//         })
//         .fail(function(error) {
//             $("#nivelesIcono1, #nivelesIcono2, #nivelesIcono3, #nivelesIcono4, #nivelesIcono5, #nivelesIcono6, #nivelesIcono7, #nivelesIcono8, #nivelesIcono9, #nivelesIcono10").html("<p>No existen niveles disponibles</p>");
//             $("#_nivelesIcono1, #_nivelesIcono2, #_nivelesIcono3, #_nivelesIcono4, #_nivelesIcono5, #_nivelesIcono6, #_nivelesIcono7, #_nivelesIcono8, #_nivelesIcono9, #_nivelesIcono10").html("<p>No existen niveles disponibles</p>");
//         });
// }

function cleanNivel() {
    $("#divNivel .form-control").val('');
}

function _cleanNivel() {
    $("#_divNivel .form-control").val('');
}


function cleanPromediable() {
    $("#divInsignia .form-control").val('');
    $("#otorgada").removeClass('active');
    // $("#insigniaImagenPortada").attr('src',"img/recurso.jpg");
}

function _cleanPromediable() {
    $("#_divInsignia .form-control").val('');
    $("#_otorgada").removeClass('active');
    $("#_insg_calif_min, #_insg_tmp_min, #insigniaCon_edit").fadeOut();
    // $("#_insigniaImagenPortada").attr('src',"img/recurso.jpg");
}

function cleanAddRecursoEnModuloAA() {
    $("#insignia").removeClass('active');
    $("#tipoParticipante").removeClass('active');
    $("#divInsignia").addClass('ocultar');
    $("#promediable").removeClass('active');
    cleanInsignia();
    $("#modalAgregaRecurso .text-muted").addClass('ocultar');
    $("#modalAgregaRecurso .form-control").val('');
    $(".elegido").addClass('elegido');
    $("#sRecursoID").select2("val", "");
    $("#ssRecursoID").addClass('ocultar');

    //Borrando campos ocultos
    $("#idLeccionAA").val('');
    $("#idModuloRecursoAA").val('');
    $("#idRecursoModuloRecursoAA").val('');
}

function _cleanUpdateRecursoEnModuloAA() {
    $("#_insignia").removeClass('active');
    $("#_divInsignia").addClass('ocultar');
    $("#_promediable").removeClass('active');
    $("#_divPromediable").addClass('ocultar');
    cleanInsignia();
    $("#modalEditarRecursoModuloAA .text-muted").addClass('ocultar');
    $("#modalEditarRecursoModuloAA .form-control").val('');
    $(".elegido").addClass('elegido');
    $("#_sRecursoID").select2("val", "");
    $("#_ssRecursoID").addClass('ocultar');

    //Borrando campos ocultos
    $("#_idLeccionAA").val('');
    $("#_idModuloRecursoAA").val('');
}

function setActiveInsignia(IMG) {
    $(".insall").removeClass("activeInsignia");
    $(IMG).addClass("activeInsignia");
    $("#sinsigniaImagen").addClass("ocultar");
}

function setActiveNivel(IMG) {
    $(".nivall").removeClass("activeNivel");
    $(IMG).addClass("activeNivel");
    $("#snivelImagen1").addClass("ocultar");
}

function AddRecursoEnModuloAA() {
    // if ($(".btn-insg_con").hasClass('active')) {
    //    $("#sinsigniaTiempoMinima").removeClass('ocultar');
    //    $("#sinsigniaCalificacionMinima").removeClass('ocultar');
    // } else {
    //   $("#sinsigniaTiempoMinima").addClass('ocultar');
    //   $("#sinsigniaCalificacionMinima").addClass('ocultar');
    //
    // }
    $(".txError").addClass("ocultar");
    var errors = false;
    Recurso = {};

    Recurso.recurso_Id = $("#sRecursoID").val();
    if (Recurso.recurso_Id.length === 0) {
        errors = true;
        $("#ssRecursoID").removeClass("ocultar");
    }

    Recurso.Puntos = $("#puntos").val();
    if (Recurso.Puntos.length === 0 || isNaN(Recurso.Puntos)) {
        errors = true;
        $("#spuntos").removeClass("ocultar");
    }

    Recurso.Promediable = $("#promediable").hasClass('active');
    if ($("#promediable").hasClass('active')) {
        Recurso.Promediable_porciento = $("#porciento").val();
        if (Recurso.Promediable_porciento.length === 0 || isNaN(Recurso.Promediable_porciento)) {
            errors = true;
            $("#sporciento").removeClass("ocultar");
        }
    } else {
        Recurso.Promediable_porciento = "";
    }

    Recurso.Tipo_participante = $("#tipoParticipante").hasClass('active');
    var insignia = $("#insignia").hasClass('active');

    Recurso.Orden = (parseInt(that['leccion' + elNumLeccion + '_Modulo' + elNumModulo + '_NumRecursos']) + 1);
    // console.log(' Recurso.Orden', that['leccion' + elNumLeccion + '_Modulo' + elNumModulo + '_NumRecursos'], elNumLeccion, elNumModulo);

    if (Recurso.Orden.length === 0) {
        errors = true;
        // $("#sorden").removeClass("ocultar");
    }

    if (isNaN(Recurso.Orden)) {
        errors = true;
        // $("#sorden").removeClass("ocultar");
    }

    Insignia = {};

    if (insignia) {
        Insignia.imagen = $("img.activeInsignia").attr('src');
        console.log('Insignia.imagen', Insignia.imagen);
        if (Insignia.imagen === undefined || Insignia.imagen.length === 0) {
            errors = true;
            $("#sinsigniaImagen").removeClass("ocultar");
        }
        Insignia.nombre = $("#insigniaNombre").val();
        console.log('Insignia.nombre', Insignia.nombre);
        if (Insignia.nombre.length === 0) {
            errors = true;
            $("#sinsigniaNombre").removeClass("ocultar");
        }

        Insignia.puntos = $("#insigniaPuntos").val();
        console.log('Insignia.puntos', Insignia.puntos);
        if (Insignia.puntos.length === 0 || isNaN(Insignia.puntos)) {
            errors = true;
            $("#sinsigniaPuntos").removeClass("ocultar");
        }
        //////////////////////////////////////
        if ($("#otorgada").hasClass('active') == false) {
            Insignia.otorgada = "cierre";
        } else {
            Insignia.otorgada = "inicio";
            if ($("#insignia_condicion").hasClass('active')) {
                Insignia.tiempo_minimo = $("#insigniaTiempoMinima").val();
                if (Insignia.tiempo_minimo.length === 0) {
                    errors = true;
                    $("#sinsigniaTiempoMinima").removeClass('ocultar');
                    $("#sinsigniaCalificacionMinima").addClass('ocultar');
                }
            } else {
                Insignia.calif_minima = $("#insigniaCalificacionMinima").val();
                if (Insignia.calif_minima.length === 0 || isNaN(Insignia.calif_minima)) {
                    errors = true;
                    $("#sinsigniaTiempoMinima").addClass('ocultar');
                    $("#sinsigniaCalificacionMinima").removeClass('ocultar');
                }
            }
        }

    } else {
        Insignia = 'no';
    }
    Recurso.insignia = Insignia;

    if (!errors) {
        AddingRecursoEnModuloAA(Recurso);
    }
}

function AddingRecursoEnModuloAA(Recurso) {
    var LeccionID = $("#idLeccionAA").val();
    var ModuloID = $("#idModuloRecursoAA").val();

    console.log("[ADD Recurso a Módulo en Ambiente Aprendizaje]:", Recurso);
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
            // $("#modalAgregaRecurso .close").click();
            cleanAddRecursoEnModuloAA();
            cuentaLecciones();
            pintaLecciones();
            $.notify({
                message: '<strong>Recurso</strong> añadido exitosamente a Módulo en Ambiente de aprendizaje'
            }, {
                type: 'success',
                allow_dismiss: true,
                delay: 1500,
                allow_dismiss: false
            });
            console.log('Sincronización realizada.');
            $("#modalAgregaRecurso .close").click();
        }
    };
    firebase.auth().signInWithEmailAndPassword(email_master, password_master).then(function(result) {
        var dataRef = firebase.database().ref(laUrlBase + 'Lecciones/' + LeccionID + '/Modulos/' + ModuloID + '/Recursos/'); //Obtengo nodo.
        var keyRecToModAA = dataRef.ref.child(Recurso.recurso_Id); //Agrego recurso vacio con ID:recurso.recurso_Id.
        firebase.database().ref(keyRecToModAA).set(Recurso, onComplete); //Reemplazo datos.
    });
}
//AddRecursoenModuloAA


function loadRecursoModuloAA(leccion, modulo, recurso) {
    console.log('loadRecursoModuloAA', leccion, ' y ', modulo, ' y ', recurso);
    _cleanUpdateRecursoEnModuloAA();

    var leccionKey = that['leccion' + leccion + '_Id'];
    var moduloKey = that['leccion' + leccion + '_Modulo' + modulo + '_Id'];
    var recursoKey = that['leccion' + leccion + '_Modulo' + modulo + '_Recurso' + recurso + '_Id'];
    $("#_idLeccionAA").val(leccionKey);
    $("#_idModuloRecursoAA").val(moduloKey);
    $("#_idRecursoModuloRecursoAA").val(recursoKey);

    $('#tituloEditarRecurso').empty();
    $('#tituloEditarRecurso').append('Editar Objeto ' + RECURSOS[recursoKey] + ' en módulo ' + that['leccion' + leccion + '_Modulo' + modulo + '_Nombre']);

    var Recursos = {};
    Recursos.recurso_Id = this['leccion' + leccion + '_Modulo' + modulo + '_Recurso' + recurso + '_Id'];
    Recursos.Orden = this['leccion' + leccion + '_Modulo' + modulo + '_Recurso' + recurso + '_Orden'];
    Recursos.Tipo_participante = this['leccion' + leccion + '_Modulo' + modulo + '_Recurso' + recurso + 'Tipo_participante'];
    Recursos.Promediable = this['leccion' + leccion + '_Modulo' + modulo + '_Recurso' + recurso + '_Promediable'];
    Recursos.Promediable_porciento = this['leccion' + leccion + '_Modulo' + modulo + '_Recurso' + recurso + '_Promediable_porciento'];
    Recursos.Puntos = this['leccion' + leccion + '_Modulo' + modulo + '_Recurso' + recurso + '_Puntos'];
    Recursos.insignia = this['leccion' + leccion + '_Modulo' + modulo + '_Recurso' + recurso + '_Insignia'];

    $("#_sRecursoID").val(Recursos.recurso_Id).trigger('change');
    $("#_puntos").val(Recursos.Puntos);

    if (Recursos.Promediable) {
        $("#_promediable").addClass('active');
        $("#_divPromediable").removeClass('ocultar').show();
    } else {
        $("#_promediable").removeClass('active');
        $("#_divPromediable").addClass('ocultar').hide();
    }
    $("#_porciento").val(Recursos.Promediable_porciento);
    if (Recursos.Tipo_participante) {
        $("#_tipoParticipante").addClass('active');
    } else {
        $("#_tipoParticipante").removeClass('active');
    }

    if (Recursos.insignia != "no" && Recursos.insignia != null) {
        $("#_insignia").addClass('active');
        $("#_divInsignia").removeClass('ocultar');
        Insignia = {};
        Insignia.nombre = this['leccion' + leccion + '_Modulo' + modulo + '_Recurso' + recurso + '_InsigniaNombre'];
        $("#_insigniaNombre").val(Insignia.nombre);

        // Insignia.tipo = this['leccion' + leccion + '_Modulo' + modulo + '_Recurso' + recurso + '_InsigniaTipo'];
        // $("#_insigniaTipo").val(Insignia.tipo);

        Insignia.calif_minima = this['leccion' + leccion + '_Modulo' + modulo + '_Recurso' + recurso + '_InsigniaCalif_minima'];
        $("#_insigniaCalificacionMinima").val(Insignia.calif_minima);

        Insignia.imagen = this['leccion' + leccion + '_Modulo' + modulo + '_Recurso' + recurso + '_InsigniaImagen'];

        $(".insall").removeClass("activeInsignia");
        $(".insall").each(function(index, val) {
            if ($(this).attr('src') === Insignia.imagen) {
                console.log("encontre");
                $(this).addClass("activeInsignia");
                return;
            }
        });

        Insignia.otorgada = this['leccion' + leccion + '_Modulo' + modulo + '_Recurso' + recurso + '_InsigniaOtorgada'];
        if (Insignia.otorgada == "cierre") {
            $("#_otorgada").addClass('active');
            $("#_insg_calif_min, #_insg_tmp_min, #insigniaCon_edit").fadeIn();
        } else {
            $("#_otorgada").removeClass('active');
            $("#_insg_calif_min, #_insg_tmp_min, #insigniaCon_edit").fadeOut();
        }

        Insignia.tiempo_minimo = this['leccion' + leccion + '_Modulo' + modulo + '_Recurso' + recurso + '_InsigniaTiempoMinimo'];
        $("#_insigniaTiempoMinima").val(Insignia.tiempo_minimo);

        Insignia.puntos = this['leccion' + leccion + '_Modulo' + modulo + '_Recurso' + recurso + '_InsigniaPuntos'];
        $("#_insigniaPuntos").val(Insignia.puntos);
    } else {
        $("#_insignia").removeClass('active');
        $("#_divInsignia").addClass('ocultar');
    }

    $(document).off('click', '#btnEditRecurso').on('click', '#btnEditRecurso', function(e) {
        UpdateRecursoEnModuloAA(recursoKey, Recursos.Orden);
    });

}

function UpdateRecursoEnModuloAA(recAnterior, ordenAnterior) {
    $(".txError").addClass("ocultar");
    var errors = false;
    Recurso = {};

    recursoAnterior_Id = recAnterior;
    console.log('recursoAnterior_Id ', recursoAnterior_Id);
    Recurso.recurso_Id = $("#_sRecursoID").val();
    console.log(' Recurso.recurso_Id', Recurso.recurso_Id);
    if (Recurso.recurso_Id.length === 0) {
        errors = true;
        $("#_ssRecursoID").removeClass("ocultar");
    }

    Recurso.Puntos = $("#_puntos").val();
    if (Recurso.Puntos.length === 0 || isNaN(Recurso.Puntos)) {
        errors = true;
        $("#_spuntos").removeClass("ocultar");
    }

    if ($("#_promediable").hasClass('active')) {
        $("#_divPromediable").removeClass('ocultar');
    } else {
        $("#_divPromediable").addClass('ocultar');
    }
    Recurso.Promediable = $("#_promediable").hasClass('active');
    if ($("#_promediable").hasClass('active')) {
        Recurso.Promediable_porciento = $("#_porciento").val();
        if (Recurso.Promediable_porciento.length === 0 || isNaN(Recurso.Promediable_porciento)) {
            errors = true;
            $("#_sporciento").removeClass("ocultar");
        }
    } else {
        Recurso.Promediable_porciento = "";
    }

    Recurso.Orden = ordenAnterior;

    Recurso.Tipo_participante = $("#_tipoParticipante").hasClass('active');
    var insigniaT = $("#_insignia").hasClass('active');

    if (insigniaT) {
        Insignia = {};
        Insignia.imagen = $("img.activeInsignia").attr('src');
        if (Insignia.imagen === undefined || Insignia.imagen.length === 0) {
            errors = true;
            $("#_sinsigniaImagen").removeClass("ocultar");
        }
        Insignia.nombre = $("#_insigniaNombre").val();
        if (Insignia.nombre.length === 0) {
            errors = true;
            $("#_sinsigniaNombre").removeClass("ocultar");
        }

        Insignia.puntos = $("#_insigniaPuntos").val();
        if (Insignia.puntos.length === 0 || isNaN(Insignia.puntos)) {
            errors = true;
            $("#_sinsigniaPuntos").removeClass("ocultar");
        }


        if ($("#_otorgada").hasClass('active') == false) {
            Insignia.otorgada = "inicio";
        } else {
            Insignia.otorgada = "cierre";
            if ($("#insignia_condicion_edit").hasClass('active')) {
                Insignia.tiempo_minimo = $("#_insigniaTiempoMinima").val();
                if (Insignia.tiempo_minimo.length === 0) {
                    errors = true;
                    $("#_sinsigniaTiempoMinima").removeClass('ocultar');
                    $("#_sinsigniaCalificacionMinima").addClass('ocultar');
                }
            } else {
                Insignia.calif_minima = $("#_insigniaCalificacionMinima").val();
                if (Insignia.calif_minima.length === 0 || isNaN(Insignia.calif_minima)) {
                    errors = true;
                    $("#_sinsigniaTiempoMinima").addClass('ocultar');
                    $("#_sinsigniaCalificacionMinima").removeClass('ocultar');
                }
            }
        }



        // Insignia.tipo = $("#_insigniaTipo").val();
        // if (Insignia.tipo.length === 0) {
        //     errors = true;
        //     $("#_sinsigniaTipo").removeClass("ocultar");
        // }
        // Insignia.otorgada = $("#otorgada").val();
        // if (Insignia.otorgada.length === 0) {
        //     errors = true;
        //     $("#_sinsigniaOtorgada").removeClass("ocultar");
        // }
        Recurso.insignia = Insignia;
    } else {
        Recurso.insignia = 'no';
    }
    if (!errors) {
        fbUpdateRecursoEnModuloAA(recursoAnterior_Id, Recurso, Recurso.recurso_Id);
    }
}

function fbUpdateRecursoEnModuloAA(recursoAnterior, Recurso, RecursoNuevoID) {
    console.log("[[[Editando]]]", recursoAnterior, ' por éste ', Recurso);
    var LeccionID = $("#_idLeccionAA").val();
    var ModuloID = $("#_idModuloRecursoAA").val();
    var RecursoID = RecursoNuevoID;
    var url = laUrlBase + "Lecciones/" + LeccionID + "/Modulos/" + ModuloID + "/Recursos/";

    console.log("[UPDATE Recurso a Módulo en Ambiente Aprendizaje]:", Recurso, ' y ', RecursoID);
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
            // if (recursoAnterior != Recurso) {
            //     firebase.database().ref().child(url + recursoAnterior).remove();
            // }
            // $("#modalEditarRecursoModuloAA .close").click();
            _cleanUpdateRecursoEnModuloAA();
            cuentaLecciones();
            pintaLecciones();
            $.notify({
                message: '<strong>Recurso</strong> actualizado exitosamente a Módulo en Ambiente de aprendizaje'
            }, {
                type: 'success',
                allow_dismiss: true,
                delay: 1500,
                allow_dismiss: false
            });
            console.log('Sincronización realizada.');
            $("#modalEditarRecursoModuloAA .close").click();
        }
    };

    // var updates = {};
    // updates[elRefRevisado] = nuevoData;
    // firebase.database().ref().update(updates, onComplete);


    if (revisaConexion) {
        var dataRef = firebase.database().ref(url); //Obtengo nodo.
        var keyRecToModAA = dataRef.ref.child(RecursoID); //Agrego recurso vacio con ID:recurso.recurso_Id.
        firebase.database().ref().child(url + recursoAnterior).remove();
        firebase.database().ref(keyRecToModAA).set(Recurso, onComplete); //Reemplazo datos.
    }

}
//UpdateRecursoEnModuloAA

//EliminarRecursoModuloAA
function eliminarRecursoModuloAA(leccion, modulo, recurso) {
    console.log("[ELIMINAR: eliminarRecursoModuloAA]", a);
    $('#modalBorrarRecursoModuloAA').modal({
        transition: 'scale'
    }).modal('show');

    $(document).off('click', '#botonCancelarBorrarRecursoModuloAA').on('click', '#botonCancelarBorrarRecursoModuloAA', function(e) {
        console.log("Click Cancelar:  botonCancelarBorrarRecursoModuloAA");
    });
    $(document).off('click', '#botonAceptarBorrarRecursoModuloAA').on('click', '#botonAceptarBorrarRecursoModuloAA', function(e) {
        console.log("Click Aceptar:  botonAceptarBorrarRecursoModuloAA");

        var leccionKey = that['leccion' + leccion + '_Id'];
        var moduloKey = that['leccion' + leccion + '_Modulo' + modulo + '_Id'];
        var recursoKey = that['leccion' + leccion + '_Modulo' + modulo + '_Recurso' + recurso + '_Id'];
        var key = "Lecciones/" + leccionKey + "/Modulos/" + moduloKey + "/Recursos/" + recursoKey;

        fbEliminarRecursoModuloAA(key);
    });
}

function fbEliminarRecursoModuloAA(key) {
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
                cuentaLecciones();
                pintaLecciones();
            }, 100);

            $.notify({
                message: 'El recurso se borró exitosamente'
            }, {
                type: 'info',
                allow_dismiss: true,
                delay: 1500,
                allow_dismiss: false,
            });
        };
    };
    if (revisaConexion) {
        firebase.database().ref().child(key).remove(onComplete);
        console.log("[[[Eliminar]]]", key);
    }
}
//EliminarRecursoModuloAA


//No hace nada de momento
function updateRecursoModuloAA(leccion, modulo, recurso) {
    console.log("[ELIMINAR: eliminarRecursoModuloAA]", a);
    $('#modalBorrarRecursoModuloAA').modal({
        transition: 'scale'
    }).modal('show');

    $(document).off('click', '#botonCancelarBorrarRecursoModuloAA').on('click', '#botonCancelarBorrarRecursoModuloAA', function(e) {
        console.log("Click Cancelar:  botonCancelarBorrarRecursoModuloAA");
    });
    $(document).off('click', '#botonAceptarBorrarRecursoModuloAA').on('click', '#botonAceptarBorrarRecursoModuloAA', function(e) {
        console.log("Click Aceptar:  botonAceptarBorrarRecursoModuloAA");

        var leccionKey = that['leccion' + leccion + '_Id'];
        var moduloKey = that['leccion' + leccion + '_Modulo' + modulo + '_Id'];
        var recursoKey = that['leccion' + leccion + '_Modulo' + modulo + '_Recurso' + recurso + '_Id'];
        var key = "Lecciones/" + leccionKey + "/Modulos/" + moduloKey + "/Recursos/" + recursoKey;

        fbEliminarRecursoModuloAA(key);
    });

}
