/* ejs 2018 */
var styleVersions = new Array("-ms-", "-webkit-", "-moz-", "-o-", "");
var scalePage = 1;
var pageHeight = 648;
var pegeWidth = 959;
var cargandoHeight = 50;
var cargandoWidth = 50;
var volPage = 100;



if (parent.course != undefined) {
    volPage = parent.soundVolume;
}

function cacularEscala() {
    $('#btnAudio').attr('_origeny', "538");
    var contentHeight = $(document).height();
    var contentWidth = $(document).width();
    var _scaleX = contentWidth / pegeWidth;
    var _scaleY = contentHeight / pageHeight;
    if (_scaleX <= _scaleY) {
        scalePage = _scaleX;
    } else {
        scalePage = _scaleY;
    }
    if (scalePage >= 1) {
        scalePage = 1;
    }

}

function incrustaID(objeto, ID) {
    objeto.attr("_id", ID);
}

function ajustarEscenario() {
    $('#contenido').height(pageHeight * scalePage);
    $('#contenido').css("width", (pegeWidth * scalePage) + "px");
    for (var i = 0; i <= styleVersions.length - 1; i++) {
        $('#contenido').css(styleVersions[i] + "transform-origin", "0 0");
    }
    $('#cargando').css({
        "top": (((pageHeight * scalePage) / 2) - (cargandoHeight / 4)) + "px",
        "left": (((pegeWidth * scalePage) / 2) - (cargandoWidth / 3)) + "px"
    });

    setVolumen();
}

function inicializar(objeto, Test) {

    objeto.css("top", (parseInt(objeto.attr("_origeny")) * scalePage) + "px");
    objeto.css("left", (parseInt(objeto.attr("_origenx")) * scalePage) + "px");
    for (var i = 0; i <= styleVersions.length - 1; i++) {
        objeto.css(styleVersions[i] + "transform", "scale(" + scalePage + ", " + scalePage + ")");
        objeto.css(styleVersions[i] + "transform-origin", "0 0");
    }


    if (Test) {
        objeto.css("opacity", "1");
        objeto.css("display", "block");
    } else {
        objeto.css("opacity", "0");
        objeto.css("display", "none");
    }
}

function animacion_entrada(objeto, tipo, velocidad, retardo, funcion_sigue) {
    //tipos de animación: "default", "arriba_abajo", "abajo_arriba", "izq_der", "der_izq", "ampliar", "reducir" */

    TweenMax.killTweensOf(objeto);
    if (bounce) {
        bounce.remove();
    }

    if (velocidad == undefined) {
        velocidad = 1;
    }
    if (tipo == undefined) {
        tipo = "default";
    }
    if (retardo == undefined) {
        retardo = 0;
    }
    if (tipo == "aleatorio") {
        tipo = animaciones[random(animaciones.length - 1)];
    }
    if (funcion_sigue == undefined) {
        funcion_sigue = null;
    }

    var bounce = new Bounce();
    var animaciones = new Array("default", "arriba_abajo", "abajo_arriba", "izq_der", "der_izq", "gira_arriba_abajo", "rebota", "rebota_arriba_abajo", "rebota_izq_der", "rebota_der_izq", "rebota_abajo_arriba", "explosion_clic");
    objeto.css("display", "block");


    switch (tipo) {

        case "default":
            TweenMax.to(objeto, velocidad, {
                alpha: 1,
                ease: Quart.easeOut,
                delay: retardo,
                onComplete: funcion_sigue
            });
            break;

        case "arriba_abajo":
            TweenMax.fromTo(objeto, velocidad, {
                top: (parseInt(objeto.attr("_origeny")) * scalePage) - 80
            }, {
                top: (parseInt(objeto.attr("_origeny")) * scalePage),
                alpha: 1,
                ease: Back.easeOut,
                delay: retardo,
                onComplete: funcion_sigue
            });
            break;
        case "abajo_arriba":
            TweenMax.fromTo(objeto, velocidad, {
                top: (parseInt(objeto.attr("_origeny")) * scalePage) + 80
            }, {
                top: (parseInt(objeto.attr("_origeny")) * scalePage),
                alpha: 1,
                ease: Back.easeOut,
                delay: retardo,
                onComplete: funcion_sigue
            });
            break;
        case "izq_der":
            TweenMax.fromTo(objeto, velocidad, {
                left: (parseInt(objeto.attr("_origenx")) * scalePage) - 150
            }, {
                left: (parseInt(objeto.attr("_origenx")) * scalePage),
                alpha: 1,
                ease: Back.easeOut,
                delay: retardo,
                onComplete: funcion_sigue
            });
            break;
        case "der_izq":
            TweenMax.fromTo(objeto, velocidad, {
                left: (parseInt(objeto.attr("_origenx")) * scalePage) + 150
            }, {
                left: (parseInt(objeto.attr("_origenx")) * scalePage),
                alpha: 1,
                ease: Back.easeOut,
                delay: retardo,
                onComplete: funcion_sigue
            });
            break;

        case "gira_arriba_abajo": //solo para objetos pequeños como botones

            TweenMax.fromTo(objeto, velocidad, {
                top: (parseInt(objeto.attr("_origeny")) * scalePage) - 300
            }, {
                top: (parseInt(objeto.attr("_origeny")) * scalePage),
                rotation: 1440, //vueltas 4 --1= 380
                transformOrigin: "50% 50%",
                alpha: 1,
                ease: Back.easeOut,
                delay: retardo,
                onComplete: funcion_sigue
            });


            break;


        case "rebota": //ya tiene efecto de gelatina predeterminado
            console.log('objeto', objeto.attr("id"));

            var topDelObjeto = $('#' + objeto.attr('id')).position().top;
            var leftDelObjeto = $('#' + objeto.attr('id')).position().left;
            var altoDelObjeto = parseInt($('#' + objeto.attr('id')).height() * scalePage);
            var anchoDelObjeto = parseInt($('#' + objeto.attr('id')).width() * scalePage);
            console.log('objeto', objeto.attr('id'), topDelObjeto, leftDelObjeto, altoDelObjeto, anchoDelObjeto);

            for (var i = 0; i <= styleVersions.length - 1; i++) {
                objeto.css(styleVersions[i] + "transform", "scale(" + scalePage + ", " + scalePage + ")");
                objeto.css(styleVersions[i] + "transform-origin", "center center");
            }

            TweenMax.fromTo(objeto, velocidad, {}, {
                //
                // top: (topDelObjeto - (altoDelObjeto / 2)),
                // left: (leftDelObjeto - (anchoDelObjeto / 2)),
                //     transformOrigin: "50% 50%",
                //     alpha: 1,
                //     ease: Back.easeOut,
                delay: (retardo + 0.1)
            });



            setTimeout(function() {
                objeto.css({
                    "display": "block"
                }).animate({
                    "opacity": "1"
                }, 400);
            }, (retardo * 1000));


            // bounce
            bounce
                .scale({
                    from: {
                        x: 0,
                        y: 0.3
                    },
                    to: {
                        x: (1 * scalePage),
                        y: (1 * scalePage)
                    },

                    easing: "bounce",
                    duration: 2000,
                    delay: (retardo * 1000),
                    bounces: 20,
                    stiffness: 3
                })
                .applyTo(document.querySelectorAll(('#' + objeto.attr('id')))).then(function() {
                    bounce.remove();
                    console.log("Animación completa");
                });

            break;


        case "rebota_arriba_abajo":
            TweenMax.fromTo(objeto, velocidad, {
                top: (parseInt(objeto.attr("_origeny")) * scalePage) - 300
            }, {
                top: (parseInt(objeto.attr("_origeny")) * scalePage),
                alpha: 1,
                ease: Back.easeOut,
                delay: retardo,
                onComplete: funcion_sigue,
                transformOrigin: "50% 50%"

            });
            setTimeout(function() {
                objeto.css({
                    "display": "block"
                }).animate({
                    "opacity": "1"
                }, 400);
            }, (retardo * 1000));

            // var bounce = new Bounce();
            bounce
                .scale({
                    from: {
                        x: 1 * scalePage,
                        y: 1 * scalePage
                    },
                    to: {
                        x: 1.5 * scalePage,
                        y: 1.7 * scalePage
                    },
                    easing: "sway",
                    duration: 5000,
                    delay: (retardo * 1000),
                    bounces: 22,
                    stiffness: 2
                })
                .scale({
                    from: {
                        x: 1,
                        y: 1
                    },
                    to: {
                        x: 1.7,
                        y: 1.5
                    },

                    easing: "sway",
                    duration: 5000,
                    delay: (retardo * 1000),
                    bounces: 22,
                    stiffness: 2
                })
                .applyTo(document.querySelectorAll(('#' + objeto.attr('id')))).then(function() {
                    console.log("Animación completa");
                    bounce.remove();
                });
            break;

        case "rebota_izq_der":
            TweenMax.fromTo(objeto, velocidad, {
                left: (parseInt(objeto.attr("_origenx")) * scalePage) - 270
            }, {
                left: (parseInt(objeto.attr("_origenx")) * scalePage),
                alpha: 1,
                ease: Back.easeOut,
                delay: retardo,
                onComplete: funcion_sigue,
                transformOrigin: "50% 50%"
            });

            setTimeout(function() {
                objeto.css({
                    "display": "block"
                }).animate({
                    "opacity": "1"
                }, 400);
            }, (retardo * 1000));

            // var bounce = new Bounce();
            bounce
                .scale({
                    from: {
                        x: 1 * scalePage,
                        y: 1 * scalePage
                    },
                    to: {
                        x: 1.5 * scalePage,
                        y: 1.7 * scalePage
                    },

                    easing: "sway",
                    duration: 5000,
                    delay: (retardo * 1000),
                    bounces: 22,
                    stiffness: 2
                })
                .scale({
                    from: {
                        x: 1,
                        y: 1
                    },
                    to: {
                        x: 1.7,
                        y: 1.5
                    },

                    easing: "sway",
                    duration: 5000,
                    delay: (retardo * 1000),
                    bounces: 22,
                    stiffness: 2
                })
                .applyTo(document.querySelectorAll(('#' + objeto.attr('id')))).then(function() {
                    console.log("Animación completa");
                    bounce.remove();
                });

            break;

        case "rebota_der_izq":

            TweenMax.fromTo(objeto, velocidad, {
                left: (parseInt(objeto.attr("_origenx")) * scalePage) + 270
            }, {
                left: (parseInt(objeto.attr("_origenx")) * scalePage),
                alpha: 1,
                ease: Back.easeOut,
                delay: retardo,
                onComplete: funcion_sigue,
                transformOrigin: "50% 50%"
            });

            setTimeout(function() {
                objeto.css({
                    "display": "block"
                }).animate({
                    "opacity": "1"
                }, 400);
            }, (retardo * 1000));

            // var bounce = new Bounce();
            bounce
                .scale({
                    from: {
                        x: 1 * scalePage,
                        y: 1 * scalePage
                    },
                    to: {
                        x: 1.5 * scalePage,
                        y: 1.7 * scalePage
                    },

                    easing: "sway",
                    duration: 5000,
                    delay: (retardo * 1000),
                    bounces: 22,
                    stiffness: 2
                })
                .scale({
                    from: {
                        x: 1,
                        y: 1
                    },
                    to: {
                        x: 1.7,
                        y: 1.5
                    },

                    easing: "sway",
                    duration: 5000,
                    delay: (retardo * 1000),
                    bounces: 22,
                    stiffness: 2
                })
                .applyTo(document.querySelectorAll(('#' + objeto.attr('id')))).then(function() {
                    console.log("Animación completa");
                    bounce.remove();
                });
            break;

        case "rebota_abajo_arriba":

            bounce.remove();


            TweenMax.fromTo(objeto, velocidad, {
                top: (parseInt(objeto.attr("_origeny")) * scalePage) + 300
            }, {
                top: (parseInt(objeto.attr("_origeny")) * scalePage),
                alpha: 1,
                ease: Back.easeOut,
                delay: retardo,
                onComplete: funcion_sigue,
                transformOrigin: "50% 50%"

            });

            setTimeout(function() {

                objeto.css({
                    "display": "block"
                }).animate({
                    "opacity": "1"
                }, 400);
            }, (retardo * 1000));

            // var bounce = new Bounce();
            bounce
                .scale({
                    from: {
                        x: (1 * scalePage),
                        y: (1 * scalePage)
                    },
                    to: {
                        x: (1.5 * scalePage),
                        y: (1.7 * scalePage)
                    },
                    easing: "sway",
                    duration: 5000,
                    delay: (retardo * 1000),
                    bounces: 22,
                    stiffness: 2
                })
                .scale({
                    from: {
                        x: 1,
                        y: 1
                    },
                    to: {
                        x: 1.7,
                        y: 1.5
                    },

                    easing: "sway",
                    duration: 5000,
                    delay: (retardo * 1000),
                    bounces: 22,
                    stiffness: 2
                })
                .applyTo(document.querySelectorAll(('#' + objeto.attr('id')))).then(function() {
                    console.log("Animación completa");
                    bounce.remove();
                });


            break;




    } //fin de swich


} //fin animacion entrada



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function animacion_salida(objeto, tipo, retardo, funcion_sigue) {
    var animaciones = new Array("default", "arriba_abajo", "abajo_arriba", "izq_der", "der_izq");
    var velocidad = 0.3; // estaba en 0.8
    if (tipo == undefined) {
        tipo = "default";
    }
    if (retardo == undefined) {
        retardo = 0;
    }
    if (tipo == "aleatorio") {
        tipo = animaciones[random(animaciones.length - 1)];
    }

    if (funcion_sigue == undefined) {
        funcion_sigue = null;
    }


    switch (tipo) {
        case "default":
            TweenMax.to(objeto, velocidad, {
                alpha: 0,
                ease: Quart.easeOut,
                delay: retardo,
                onComplete: funcion_sigue
            });
            break;

        case "desaparece":
            TweenMax.to(objeto, velocidad, {
                alpha: 0,
                ease: Quart.easeOut,
                delay: retardo,
                onComplete: funcion_sigue,
                display: "none"
            });
            break;

        case "arriba_abajo":
            if (objeto.attr("_position") == "p3" || objeto.attr("_position") == "p4") {
                TweenMax.to(objeto, velocidad, {
                    bottom: parseInt(objeto.css("bottom")) - 80,
                    alpha: 0,
                    ease: Back.easeIn,
                    delay: retardo,
                    onComplete: funcion_sigue
                });
            } else {

                TweenMax.to(objeto, velocidad, {
                    top: parseInt(objeto.css("top")) + 80,
                    alpha: 0,
                    ease: Back.easeIn,
                    delay: retardo,
                    onComplete: funcion_sigue
                });
            }
            break;
        case "abajo_arriba":
            if (objeto.attr("_position") == "p3" || objeto.attr("_position") == "p4") {
                TweenMax.to(objeto, velocidad, {
                    bottom: parseInt(objeto.css("bottom")) + 80,
                    alpha: 0,
                    ease: Back.easeIn,
                    delay: retardo,
                    onComplete: funcion_sigue
                });
            } else {

                TweenMax.to(objeto, velocidad, {
                    top: parseInt(objeto.css("top")) - 80,
                    alpha: 0,
                    ease: Back.easeIn,
                    delay: retardo,
                    onComplete: funcion_sigue
                });
            }
            break;
        case "izq_der":
            if (objeto.attr("_position") == "p2" || objeto.attr("_position") == "p3") {
                TweenMax.to(objeto, velocidad, {
                    right: parseInt(objeto.css("right")) - 150,
                    alpha: 0,
                    ease: Back.easeIn,
                    delay: retardo,
                    onComplete: funcion_sigue
                });
            } else {

                TweenMax.to(objeto, velocidad, {
                    left: parseInt(objeto.css("left")) + 150,
                    alpha: 0,
                    ease: Back.easeIn,
                    delay: retardo,
                    onComplete: funcion_sigue
                });
            }
            break;
        case "der_izq":
            if (objeto.attr("_position") == "p2" || objeto.attr("_position") == "p3") {
                TweenMax.to(objeto, velocidad, {
                    right: parseInt(objeto.css("right")) + 150,
                    alpha: 0,
                    ease: Back.easeIn,
                    delay: retardo,
                    onComplete: funcion_sigue
                });
            } else {

                TweenMax.to(objeto, velocidad, {
                    left: parseInt(objeto.css("left")) - 150,
                    alpha: 0,
                    ease: Back.easeIn,
                    delay: retardo,
                    onComplete: funcion_sigue
                });
            }
            break;
    }

}

function changeVolumen(volumens) {
    volPage = volumens;
    setVolumen();
}

function setVolumen() {
    buzz.all().setVolume(volPage);
}