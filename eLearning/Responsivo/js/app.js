/* Copyright 2018. */

var scorm = pipwerks.SCORM;
var conection = true;
var cursoStatus;
var cursoCompleto = false;
var anchoTemario = 240;
var that;
var paginaActual = 1;
var paginasTotales;
var paginaCompleta = 0;
var terminaConScroll = false;
var mobileCurse;
var mostrarAlertas = false;


// =================================================== //

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

if (!candado) {
    paginaCompleta = curso.pantallas.length;
}


function iniciaCurso() {
    if (navigator.userAgent.match(/Android/i) ||
        navigator.userAgent.match(/webOS/i) ||
        navigator.userAgent.match(/iPhone/i) ||
        navigator.userAgent.match(/iPad/i) ||
        navigator.userAgent.match(/iPod/i) ||
        navigator.userAgent.match(/BlackBerry/i) ||
        navigator.userAgent.match(/Windows Phone/i) ||
        navigator.userAgent.match(/Opera Mini/i) ||
        navigator.userAgent.match(/IEMobile/i)
    ) {
        mobileCurse = true;
    }
    if (mobileCurse) {
        console.log('Es móvil');
    } else {
        console.log('No es móvil');
    }

    checkProgreso();
}

function checkProgreso() {
    resetTimer();
    cursoStatus = get("cmi.core.lesson_status");
    // cursoStatus = "incomplete";
    if (cursoStatus == 'null' || cursoStatus == null || cursoStatus == undefined || cursoStatus == '') {
        cursoStatus = 'desconectado';
    }
    console.log('cursoStatus...', cursoStatus);
    switch (cursoStatus) {
        case "not attempted":
            set("cmi.core.score.min", "0");
            var success = save();
            set("cmi.core.score.max", "100");
            var success = save();
            navega(1);
            break;
        case "completed":
            paginaActual = get("cmi.core.lesson_location");
            cursoCompleto = true;
            navega(parseInt(paginaActual));
            break;
        case "incomplete":
            paginaActual = get("cmi.core.lesson_location");
            if (paginaActual == 'null' || paginaActual == null || paginaActual == undefined || paginaActual == '') {
                paginaActual = 1;
            }
            console.log('paginaActual: ' + paginaActual);
            navega(parseInt(paginaActual));
            break;
        case "passed":
            paginaActual = get("cmi.core.lesson_location");
            cursoCompleto = true;
            navega(parseInt(paginaActual));
            break;
        case "failed":
            paginaActual = get("cmi.core.lesson_location");
            cursoCompleto = true;
            navega(parseInt(paginaActual));
            break;
        case "desconectado":
            navega(1);
            break;
    }
}


function pintaTemas() {
    $("title").text(tituloCurso);
    $("#titulo_texto").html(tituloCurso);
    $("#subtitulo_texto").html(subtituloCurso);


    paginasTotales = curso.pantallas.length;
    // console.log('cuantos temas', paginasTotales);

    var contador = 0;
    var losTemas = '';

    $('#temas').empty();

    for (a = 1; a <= paginasTotales; a++) {
        contador++;

        var siVisible = curso.pantallas[(contador - 1)].visible;
        // console.log('length', curso.pantallas[(contador - 1)].nombre.length);
        var elNombreTema = curso.pantallas[(contador - 1)].nombre;
        if (curso.pantallas[(contador - 1)].nombre.length >= 40) {
            elNombreTema = curso.pantallas[(contador - 1)].nombre.substr(0, 40) + '...';
        }

        if (siVisible) {
            losTemas += '<li>';
            losTemas += '<a id="tema' + contador + '" class="tema tema_inactivo">';
            losTemas += '<i class="mdi mdi-file-outline"></i>';
            losTemas += '<div id="tema' + contador + '_texto" class="tema_texto">' + elNombreTema + '</div>';
            losTemas += '<div class="conector conector_sup conector_no_visitado"></div>';
            losTemas += '<div class="conector conector_inf conector_no_visitado"></div>';
            losTemas += '<div id="tema' + contador + '_punto" class="tema_punto mdi mdi-circle-outline"></div>';
            losTemas += '<div id="tema_senal" class="tema_senal_no"></div>';
            losTemas += '</a>';
            losTemas += '</li>';
        }

    }

    $('#temas').append(losTemas);

    $('#tema1 .conector_sup').css({
        'opacity': '0'
    });
    $('#tema' + paginasTotales + ' .conector_inf').css({
        'opacity': '0'
    });


    contador = 0;

    for (a = 1; a <= paginasTotales; a++) {
        contador++;
        // console.log('length', curso.pantallas[(contador - 1)].nombre.length);
        if (curso.pantallas[(contador - 1)].nombre.length >= 26) {
            $('#tema' + contador + '_texto').css({
                'top': '-46px'
            });
        } else {
            $('#tema' + contador + '_texto').css({
                'top': '-37px'
            });
        }
    }

    if (candado) {
        if (paginaActual >= paginaCompleta) {
            paginaCompleta = (paginaActual - 1);
        }
    }

}


function navega(cualPantalla) {
    if (cualPantalla == '' || cualPantalla == null || cualPantalla == undefined) {
        cualPantalla = 1;
    };
    paginaActual = cualPantalla;

    if (candado) {
        if (cursoStatus == 'completed' || cursoStatus == 'passed' || cursoStatus == 'failed') {
            paginaCompleta = paginasTotales;
        } else {
            if (paginaActual > paginaCompleta) {
                paginaCompleta = (paginaActual - 1);
            }
        }
    }
    console.log('paginaActual', paginaActual, 'de', paginasTotales, 'es', curso.pantallas[(paginaActual - 1)].ruta);

    $("#contenido").empty();
    $("#contenido").load(rutaContenido + '/' + curso.pantallas[(paginaActual - 1)].ruta);

    actualizaProgreso();
    actualizaTemario();
    actualizaScroll();


    Scrollbar.getAll()[0].scrollTo(0, 1, 10);
    setTimeout(function() {
        Scrollbar.getAll()[0].scrollTo(0, 0, 10);

        var altoVentana = $(window).height();
        var altoTotal = Scrollbar.get($('#contenidoMain')[0]).contentEl.offsetHeight;
        console.log('altoVentana', altoVentana, ' y altoTotal', altoTotal);

        if (altoVentana >= altoTotal) {
            if (terminaConScroll) {
                terminaPantalla();
            }
        }

    }, 500);


}


function actualizaProgreso() {
    // console.log('paginaActual', paginaActual, 'paginaCompleta', paginaCompleta);

    set("cmi.core.lesson_location", "" + paginaActual + "");
    var success = save();
    if (!cursoCompleto) {
        if (paginaActual == curso.pantallas.length) {
            if (!evaluacion) {
                set("cmi.core.lesson_status", "completed");
                var success = save();
            }
            cursoCompleto = true;
        } else {
            set("cmi.core.lesson_status", "incomplete");
            var success = save();
        }
        setTime();
    }

    if (!success) {
        errorAPI();
    }


    var progresoTotal = $('#progreso_tot').width();
    var progresoActual = (parseInt(paginaActual) / paginasTotales);
    var progresoBarraActual = progresoTotal * progresoActual;
    var progresoPorcentajeActual = Math.round((paginaActual * 100) / paginasTotales);

    $("#progreso_act").css("width", progresoBarraActual);
    $("#progreso_texto").html((parseInt(paginaActual)) + ' / ' + paginasTotales);
    // $("#progreso_texto").html(progresoPorcentajeActual + '% COMPLETADO');
    $("#breadcrumb").html(curso.pantallas[(paginaActual - 1)].nombre);


    habilitaBoton($("#botonSiguiente_inf, #botonSiguiente, #botonSiguiente a i"), false);
    habilitaBoton($(".footer_int1, .footer_int2"), false);

    if (paginaActual <= 1) {
        habilitaBoton($("#botonAnterior, #botonAnterior a i"), false);
    } else {
        habilitaBoton($("#botonAnterior, #botonAnterior a i"), true);
    }
    if (paginaActual >= paginasTotales) {
        habilitaBoton($("#botonSiguiente_inf, #botonSiguiente, #botonSiguiente a i"), false);
        habilitaBoton($(".footer_int1, .footer_int2"), false);
    } else {
        if (paginaCompleta >= paginaActual) {
            habilitaBoton($("#botonSiguiente_inf, #botonSiguiente, #botonSiguiente a i"), true);
            habilitaBoton($(".footer_int1, .footer_int2"), true);
        }
    }

}


function actualizaTemario() {
    // console.log('actualizaTemario paginaActual', paginaActual, 'paginaCompleta', paginaCompleta);

    for (a = 1; a <= paginasTotales; a++) {
        $("#tema" + a + " > #tema_senal").removeClass('tema_senal').addClass('tema_senal_no');
    }

    for (a = 0; a <= paginaCompleta; a++) {
        $('#tema' + (a + 1)).removeClass('tema_inactivo').addClass("tema_activo");
        $("#tema" + paginaActual).removeClass('tema_inactivo').addClass('tema_activo');
        $('#tema' + (a + 1) + '_punto').removeClass('mdi-circle-outline mdi-progress-check').addClass("mdi-check-circle");
        $('#tema' + a + ' > .conector_inf').removeClass('conector_no_visitado').addClass("conector_visitado");
        $('#tema' + (a + 1) + ' > .conector_sup').removeClass('conector_no_visitado').addClass("conector_visitado");
    }
    $('#tema' + paginaActual + ' > #tema_senal').removeClass('tema_senal_no').addClass('tema_senal animated bounceIn');
    $('#tema' + (paginaCompleta + 1) + '_punto').removeClass('mdi-circle-outline').addClass("mdi-progress-check");

}



function actualizaScroll(scrollTamano, scrollPosicion) {
    if (scrollTamano == null || scrollTamano == undefined) {
        scrollTamano = 0;
    }
    if (scrollPosicion == null || scrollPosicion == undefined) {
        scrollPosicion = 0;
    }
    // var scrollAmount = $(document).scrollTop();
    var scrollAmount = scrollPosicion;
    // var documentHeight = ($(document).height() - 1);
    var documentHeight = (scrollTamano - 1);
    // console.log('documentHeight', documentHeight);
    var windowHeight = $(window).height();
    // console.log('windowHeight', windowHeight);
    var anchoNavBar = $('.navbar').width();

    var scrollPorciento = (scrollAmount / documentHeight * 100);
    var scrollAncho = (scrollAmount / documentHeight * anchoNavBar);
    var paginaPorciento = Math.round(scrollPorciento);
    // console.log('paginaPorciento', paginaPorciento);


    console.log('actualizaScroll', $(window).height(), Scrollbar.getAll()[0].contentEl.offsetHeight);


    if (scrollAmount > 0) {
        $(".scroll_pagina").css({
            // 'width': scrollPorciento +   '%'
            'width': scrollAncho + 15 + 'px'
        });
    } else {
        $(".scroll_pagina").css({
            'width': '0px'
        });
    }

    if (paginaPorciento >= 99) {
        if (terminaConScroll) {
            terminaPantalla();
        }
    }

}

function terminaPantalla() {
    //TODO
    habilitaBoton($("#botonSiguiente_inf, #botonSiguiente, #botonSiguiente a i"), true);
    habilitaBoton($(".footer_int1, .footer_int2"), true);

    if (candado) {
        if (paginaActual >= paginaCompleta) {
            paginaCompleta = paginaActual;

            terminaConScroll = false;
        }
    }
    console.log('paginaCompleta', paginaCompleta);

    actualizaProgreso();
    actualizaTemario();
}

function habilitaBoton(cualBoton, habilitado) {
    if (habilitado == false) {
        cualBoton.addClass('boton_inactivo disabled');
    } else {
        cualBoton.removeClass('boton_inactivo disabled');
    }
}

function habilitaBotonSimple(cualBoton, habilitado) {
    if (habilitado == false) {
        cualBoton.addClass('disabled');
    } else {
        cualBoton.removeClass('disabled');
    }
}

function activaSeccion(cualSeccion) {
    console.log('activaSec', cualSeccion);
}


function paginaAnterior() {
    paginaActual--;
    navega(paginaActual);
}

function paginaSiguiente() {
    paginaActual++;
    navega(paginaActual);
}

function mostrarAyuda() {
    $('#modalAyuda').modal();
}

function salir() {
    $('#modalSalir').modal();
}

function errorAPI() {
    if (mostrarAlertas) {
        alert("Se ha detectado un problema de comunicación con el LMS.\nSu progreso no podrá seguir siendo registrado.\nPor favor cierre el curso y vuelva a intentarlo.");
    }
    // console.log('Error de conexión');
}

function setTime() {
    var tiempo = getTimeCurrent();
    set("cmi.core.session_time", tiempo);
    var success = save();
    // console.log('Tiempo enviado: ' + tiempo);
}



// $(document).on("scroll", function() {
//     actualizaScroll();
// });



$(document).ready(function() {


    $('.side-nav, .side-nav .logo-wrapper a').css({
        'width': anchoTemario + 'px'
    });

    pintaTemas();

    for (a = 1; a <= paginasTotales; a++) {
        $("#tema" + a).click(function(event) {
            event.preventDefault();
            // if ($(this).css('cursor') == 'pointer') {
            var cualPantalla = parseInt($(this).attr('id').substr(4, $(this).attr('id').length));
            console.log("cualPantalla " + cualPantalla);
            navega(cualPantalla);
            // }
        });

    }

    $("#botonImprimir").click(function() {
        window.open("pdf/pdf" + (paginaActual + 1) + ".pdf", "_blank");
    });

    $("#botonSalir").click(function(event) {
        event.preventDefault();
        salir();
    });
    $("#botonSalirSi").click(function(event) {
        event.preventDefault();
        window.close();
    });

    $("#botonAyuda").click(function(event) {
        event.preventDefault();
        mostrarAyuda();
    });

    $("#botonAnterior").click(function(event) {
        event.preventDefault();
        paginaAnterior();
    });
    $("#botonSiguiente, #botonSiguiente_inf").click(function(event) {
        event.preventDefault();
        paginaSiguiente();
    });

    $('#temas>li>a').on('click', function() {
        console.log('navvvvvv');
        // $(".side-nav.fixed").css({
        // 	'-webkit-transform': 'translate(-100%)',
        // 	'-ms-transform': 'translate(-100%)',
        // 	'transform': 'translate(-100%)',
        // });
        // $("#sidenav-overlay").remove();
        $('.side-nav.fixed').toggleClass('active');

    });


    var scrollbarCont = Scrollbar.init($('#contenidoMain')[0]);

    Scrollbar.getAll()[0].addListener(function(status) {
        var scrollPosicion = scrollbarCont.offset.y;
        // console.log(scrollPosicion);
        var scrollTamano = scrollbarCont.size.content.height - scrollbarCont.size.container.height;
        // console.log('scrollbarCont.size.container.height', scrollbarCont.size.container.height);
        // console.log('scrollbarCont.size.content.height', scrollbarCont.size.content.height);
        // console.log('scrollTamano', scrollTamano);
        actualizaScroll(scrollTamano, scrollPosicion);
    });

    var scrollbarContNav = Scrollbar.init($('#manuIzq')[0]);


    $("#contenidoMain").css({
        'height': $(window).height() - 115 + 'px',
    });



    init();
    iniciaCurso();

});



$(window).resize(function() {

    $("#sidenav-overlay").remove();
    $(".side-nav.fixed").css({
        'height': $(window).height() + 500 + 'px',
    });
    $("#contenidoMain").css({
        'height': $(window).height() - 115 + 'px',
    });

});


$(window).on('beforeunload', function() {
    console.log('Terminando conexión');
    // end();

    // set("cmi.core.exit", "suspend");
});
