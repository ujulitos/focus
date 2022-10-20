gsap.config({
    nullTargetWarn: false
});

//Registrar Efectos------------------------------------------------------
gsap.registerEffect({
    name: "entradaDerecha",
    effect: (targets, config) => {
        return gsap.fromTo(targets, {
            opacity: 0,
            x: 300
        }, {
            duration: config.duration,
            delay: config.delay,
            opacity: 1,
            x: 0,
            ease: "back.out(1.4)"
        });
    }
});

gsap.registerEffect({
    name: "entradaIzquierda",
    effect: (targets, config) => {
        return gsap.fromTo(targets, {
            opacity: 0,
            x: -300
        }, {
            duration: config.duration,
            delay: config.delay,
            opacity: 1,
            x: 0,
            ease: "back.out(1.4)"
        });
    }
});

gsap.registerEffect({
    name: "entradaArriba",
    effect: (targets, config) => {
        return gsap.fromTo(targets, {
            opacity: 0,
            y: -300
        }, {
            duration: config.duration,
            delay: config.delay,
            opacity: 1,
            y: 0,
            ease: "back.out(1.4)"
        });
    }
});

gsap.registerEffect({
    name: "entradaAbajo",
    effect: (targets, config) => {
        return gsap.fromTo(targets, {
            opacity: 0,
            y: 300
        }, {
            duration: config.duration,
            delay: config.delay,
            opacity: 1,
            y: 0,
            ease: "back.out(1.4)"
        });
    }
});

gsap.registerEffect({
    name: "aparecer",
    effect: (targets, config) => {
        return gsap.fromTo(targets, {
            opacity: 0
        }, {
            duration: config.duration,
            delay: config.delay,
            opacity: 1,
            ease: "back.out(1.4)"
        });
    }
});

gsap.registerEffect({
    name: "parpadear",
    effect: (targets, config) => {
        return gsap.fromTo(targets, {
            opacity: .5
        }, {
            duration: config.duration,
            delay: config.delay,
            repeat: -1,
            opacity: 1,
            yoyo: true,
            cursor: 'pointer',
            ease: 'sine.inOut'
        });
    }
});

gsap.registerEffect({
    name: "salidaDerecha",
    effect: (targets, config) => {
        return gsap.fromTo(targets, {
            opacity: 1,
            x: 0
        }, {
            duration: config.duration,
            delay: config.delay,
            opacity: 0,
            x: 300,
            display: 'none',
            ease: "back.out(1.4)"
        });
    }
});

gsap.registerEffect({
    name: "salidaIzquierda",
    effect: (targets, config) => {
        return gsap.fromTo(targets, {
            opacity: 1,
            x: 0
        }, {
            duration: config.duration,
            delay: config.delay,
            opacity: 0,
            x: -300,
            display: 'none',
            ease: "back.out(1.4)"
        });
    }
});

gsap.registerEffect({
    name: "salidaArriba",
    effect: (targets, config) => {
        return gsap.fromTo(targets, {
            opacity: 1,
            y: 0
        }, {
            duration: config.duration,
            delay: config.delay,
            opacity: 0,
            y: -300,
            display: 'none',
            ease: "back.out(1.4)"
        });
    }
});

gsap.registerEffect({
    name: "salidaAbajo",
    effect: (targets, config) => {
        return gsap.fromTo(targets, {
            opacity: 1,
            y: 0
        }, {
            duration: config.duration,
            delay: config.delay,
            opacity: 0,
            y: 300,
            display: 'none',
            ease: "back.out(1.4)"
        });
    }
});

gsap.registerEffect({
    name: "desaparecer",
    effect: (targets, config) => {
        return gsap.fromTo(targets, {
            opacity: 1,
        }, {
            duration: config.duration,
            delay: config.delay,
            opacity: 0,
            display: 'none',
            ease: "back.out(1.4)"
        });
    }
});

// Animacion de engranes--------------------------------------------
gsap.registerEffect({
    name: "girarDerecha",
    effect: (targets, config) => {
        return gsap.fromTo(targets, {
            rotation: 0,
        }, {
            duration: config.duration,
            delay: config.delay,
            rotation: 360,
            repeat: -1,
            ease: 'none'
        });
    }
});

gsap.registerEffect({
    name: "girarIzquierda",
    effect: (targets, config) => {
        return gsap.fromTo(targets, {
            rotation: 0,
        }, {
            duration: config.duration,
            delay: config.delay,
            rotation: -360,
            repeat: -1,
            ease: 'none'
        });
    }
});

function animacionEntrada(elemento, direccion, tiempo, delay = 0) {

    // Hacer visible el elemento
    elemento.css('display', 'block');

    if (elemento) {
        // Seleccionar Animación
        switch (direccion) {
            case 'derecha-izquierda':
                gsap.effects.entradaDerecha(elemento, {
                    duration: tiempo,
                    delay: delay
                });
                break;
            case 'izquierda-derecha':
                gsap.effects.entradaIzquierda(elemento, {
                    duration: tiempo,
                    delay: delay
                });
                break;
            case 'arriba-abajo':
                gsap.effects.entradaArriba(elemento, {
                    duration: tiempo,
                    delay: delay
                });
                break;
            case 'abajo-arriba':
                gsap.effects.entradaAbajo(elemento, {
                    duration: tiempo,
                    delay: delay
                });
                break;
            default:
                gsap.effects.aparecer(elemento, {
                    duration: tiempo,
                    delay: delay
                });
                break;
        }
    }
}

function parpadear(elemento, tiempo = 1, delay = 0) {
    elemento.css('display', 'block');
    gsap.effects.parpadear(elemento, {
        delay: delay,
        duration: tiempo
    });
}

function dejarParpadear(elemento, cursorActivo = false) {
    gsap.killTweensOf(elemento);

    if (cursorActivo) {
        elemento.css({
            'cursor': 'pointer',
            'opacity': 1
        });
    } else {
        elemento.css({
            'cursor': 'default',
            'opacity': 1
        });
    }
}

function animacionSalida(elemento, direccion, tiempo, delay = 0, remover = false) {

    if (elemento) {
        // Seleccionar Animación
        switch (direccion) {
            case 'izquierda-derecha':
                gsap.effects.salidaDerecha(elemento, {
                    delay: delay,
                    duration: tiempo
                });
                break;
            case 'derecha-izquierda':
                gsap.effects.salidaIzquierda(elemento, {
                    delay: delay,
                    duration: tiempo
                });
                break;
            case 'abajo-arriba':
                gsap.effects.salidaArriba(elemento, {
                    delay: delay,
                    duration: tiempo
                });
                break;
            case 'arriba-abajo':
                gsap.effects.salidaAbajo(elemento, {
                    delay: delay,
                    duration: tiempo
                });
                break;
            default:
                gsap.effects.desaparecer(elemento, {
                    delay: delay,
                    duration: tiempo
                });
                break;
        }

        const retraso = (delay * 1000) + (tiempo * 1000);

        setTimeout(() => {
            if (remover) {
                elemento.remove();
            }
        }, retraso);
    }
}

function girarDerecha(elemento, tiempo, delay = 0) {
    gsap.effects.girarDerecha(elemento, {
        delay: delay,
        duration: tiempo
    });
}

function girarIzquierda(elemento, tiempo, delay = 0) {
    gsap.effects.girarIzquierda(elemento, {
        delay: delay,
        duration: tiempo
    });
}