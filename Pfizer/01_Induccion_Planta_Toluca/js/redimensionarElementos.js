let escalaTemplate = 1;
const ancho = 1024;
const alto = 620;

function redimensionarElementos() {
    setTimeout(() => {

        const anchoPantalla = $(window).width();
        const alturaPantalla = $(window).height();

        const escalaX = anchoPantalla / ancho;
        const escalaY = alturaPantalla / alto;

        if (anchoPantalla < ancho) {
            if (escalaX <= escalaY) {
                escalaTemplate = escalaX;
            } else {
                escalaTemplate = escalaY;
            }
        }

        setTimeout(() => {
            const elementos = $('.elementos');

            if (elementos) {
                posicionarElemento(elementos, escalaTemplate);
            }
            calcularEscala();
        }, 10);
    }, 10);
}

function calcularEscala() {
    let escalaTemplate2 = 1;

    //  setTimeout(() => {
    const anchoPantalla = $(window).width();
    const alturaPantalla = $(window).height();

    const escalaX = anchoPantalla / ancho;
    //  console.log('escalaX', escalaX);
    const escalaY = alturaPantalla / alto;
    //  console.log('escalaY', escalaY);

    if (anchoPantalla < ancho) {
        if (escalaX <= escalaY) {
            escalaTemplate2 = escalaX;
        } else {
            escalaTemplate2 = escalaY;
        }
    }
    //  console.log('escalaTemplate2', escalaTemplate2);
    return escalaTemplate2;
    //  }, 10);
}

function posicionarElemento(elementos, escala) {

    $.each(elementos, function() {
        const nuevoTop = parseInt($(this).data('posy')) * escala;
        const nuevoLeft = parseInt($(this).data('posx')) * escala;
        const nuevoWidth = parseInt($(this).css('width').split('px')) * escala;
        const nuevoHeight = parseInt($(this).css('height').split('px')) * escala;

        const tamanoLetra = parseInt($(this).css('fontSize').split('px')) * escala;

        $(this).css({
            'top': `${nuevoTop}px`,
            'left': `${nuevoLeft}px`,
            'width': `${nuevoWidth}px`,
            'height': `${nuevoHeight}px`,
            'fontSize': `${tamanoLetra}px`
        });
    });
}