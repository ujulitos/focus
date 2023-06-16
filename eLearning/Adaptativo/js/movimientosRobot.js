// Función flotar del lado derecho------------------------------------------
let tl1;
export function flotar(robot, lado){

    const brazoI = robot.find('#brazoIzquierdo');
    const brazoD = robot.find('#brazoDerecho');
    const sombra = robot.find('#sombra');
    const cabeza = robot.find('#cabeza');
    const torso = robot.find('#torso');
    const ojos = robot.find('#ojos');
    const boca = robot.find('#boca');

    tl1 = gsap.timeline({
        repeat: -1,
        yoyo: true
    });

    if(lado == 'i'){
        tl1.to(brazoI, {
            duration: 1.5,
            y: '-15px',
            x: '-15px',
            rotate: '-20deg',
            ease: "power1.inOut"
        })
        tl1.to(brazoD, {
            duration: 1.5,
            y: '-15px',
            x: '-5px',
            rotate: '-20deg',
            ease: "power1.inOut"
        }, '<')
        tl1.to(cabeza, {
            duration: 1.5,
            y: '-20px',
            ease: "power1.inOut"
        }, '<')
        tl1.to(torso, {
            duration: 1.5,
            y: '-20px',
            ease: "power1.inOut"
        }, '<')
        tl1.to(ojos, {
            duration: 1.5,
            y: '-20px',
            ease: "power1.inOut"
        }, '<')
        tl1.to(boca, {
            duration: 1.5,
            y: '-22px',
            ease: "power1.inOut"
        }, '<')
        .to(sombra, {
            duration: 1.5,
            opacity: .5,
            scale: .7,
            x: 15,
            ease: "power1.inOut"
        }, '<')
    }
    else if(lado == 'd'){
        tl1.to(brazoI, {
            duration: 1.5,
            y: '-30px',
            x: '15px',
            rotate: '20deg',
            ease: "power1.inOut"
        })
        tl1.to(brazoD, {
            duration: 1.5,
            y: '-30px',
            x: '5px',
            rotate: '20deg',
            ease: "power1.inOut"
        }, '<')
        tl1.to(cabeza, {
            duration: 1.5,
            y: '-20px',
            ease: "power1.inOut"
        }, '<')
        tl1.to(torso, {
            duration: 1.5,
            y: '-20px',
            ease: "power1.inOut"
        }, '<')
        tl1.to(ojos, {
            duration: 1.5,
            y: '-20px',
            ease: "power1.inOut"
        }, '<')
        tl1.to(boca, {
            duration: 1.5,
            y: '-20px',
            ease: "power1.inOut"
        }, '<')
        .to(sombra, {
            duration: 1.5,
            opacity: .5,
            scale: .7,
            x: 15,
            ease: "power1.inOut"
        }, '<')
    }
}

export function detenerRobot(){
    tl1.kill();
}

// Función Hablar-----------------------------------------------------------

let tlHablar;

export function hablar(robot, lado){
    const boca = robot.find('#boca');

    tlHablar = gsap.timeline({
        repeat: -1,
        yoyo: true
    });

    if(lado == 'd'){
        tlHablar.to(boca, {
            duration: .4,
            x: '5px',
            scaleY: 3,
            scaleX: .9,
            ease: "power1.inOut"
        })
        tlHablar.to(boca, {
            duration: .4,
            x: '5px',
            scaleX: .8,
            ease: "power1.inOut"
        }, '>')
    }
    else if('i'){
        tlHablar.to(boca, {
            duration: .4,
            x: '5px',
            scaleY: 3,
            rotate: '-20deg',
            ease: "power1.inOut"
        })
        tlHablar.to(boca, {
            duration: .4,
            x: '5px',
            scaleX: .8,
            ease: "power1.inOut"
        }, '>')
    }
}

export function pausarHablar(){
    tlHablar.pause();
}

export function reanudarHablar(){
    tlHablar.play();
}

export function pararHablar(){
    tlHablar.kill();
}