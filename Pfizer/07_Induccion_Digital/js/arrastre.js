export function mover(elemento, origenx, origeny) {

    gsap.to(elemento, {
        x: origenx,
        y: origeny,
        duration: .5,
        delay: 0,
        ease: "back.out(1)",
        onComplete: function() {
            // elemento.css({
            //     'top': 0 + 'px',
            //     'left': 0 + 'px'
            //     //   'transform': 'translate('+parseInt($(this).attr("data-posX"))+'px, '+parseInt($(this).attr("data-posY"))+'px)'
            // })
        }
    });

}