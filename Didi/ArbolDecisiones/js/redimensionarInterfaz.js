// Valores de los elementos de interfaz---------------------------------
const pBarraProgreso = {
    top: parseInt(barraPorcentaje.css('top')),
    left: parseInt(barraPorcentaje.css('left')),
    width: barraPorcentaje.width(),
    heigth: barraPorcentaje.height()
}

const pBotonTemario = {
    top: parseInt(btnTemario.css('top')),
    left: parseInt(btnTemario.css('left')),
    width: btnTemario.width(),
    heigth: btnTemario.height()
}

const pBotonRecargar = {
    top: parseInt(btnRecargar.css('top')),
    left: parseInt(btnRecargar.css('left')),
    width: btnRecargar.width(),
    heigth: btnRecargar.height()
}

const pBotonAudio = {
    top: parseInt(btnAudio.css('top')),
    left: parseInt(btnAudio.css('left')),
    width: btnAudio.width(),
    heigth: btnAudio.height()
}

const pBotonAtras = {
    top: parseInt(btnAtras.css('top')),
    left: parseInt(btnAtras.css('left')),
    width: btnAtras.width(),
    heigth: btnAtras.height()
}

const pBotonAdelante = {
    top: parseInt(btnAdelante.css('top')),
    left: parseInt(btnAdelante.css('left')),
    width: btnAdelante.width(),
    heigth: btnAdelante.height()
}

const pTemario = {
    top: 0,
    left: 0,
    width: temario.width(),
    height: temario.height()
}

const pCuadros = {
    fontSize: 18
}

const pTitulos = {
    fontSize: 32
}

const pNombreTemas = {
    fontSize: 14
}

// Redimensionar interfaz---------------------------------------------------
function redimensionarInterfaz() {
    let escalaTemplate = 1;
    const ancho = 1024;
    const alto = 620;

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

        contenedorInterfaz.width(ancho * escalaTemplate);
        contenedorInterfaz.height(alto * escalaTemplate);


        posicionObjeto(pBarraProgreso, barraPorcentaje, escalaTemplate);
        posicionBoton(pBotonTemario, btnTemario, escalaTemplate);
        posicionBoton(pBotonRecargar, btnRecargar, escalaTemplate);
        posicionBoton(pBotonAudio, btnAudio, escalaTemplate);
        posicionBoton(pBotonAtras, btnAtras, escalaTemplate);
        posicionBoton(pBotonAdelante, btnAdelante, escalaTemplate);
        posicionarMenu(pTemario, temario, escalaTemplate);
        posicionarTemas(pTitulos, titulo, escalaTemplate);
        posicionarTemas(pCuadros, cuadros, escalaTemplate);
        posicionarTemas(pNombreTemas, nombreTemas, escalaTemplate);
    }, 10);
}

function posicionObjeto(objeto, elemento, escala) {

    const nuevoTop = objeto.top * escala;
    const nuevoLeft = objeto.left * escala;
    const nuevoWidth = objeto.width * escala;
    const nuevoHeight = objeto.height * escala;

    elemento.css({
        'width': `${nuevoWidth}px`,
        'height': `${nuevoHeight}px`,
        'top': `${nuevoTop}px`,
        'left': `${nuevoLeft}px`
    });

}

function posicionBoton(objeto, elemento, escala) {

    const nuevoTop = objeto.top * escala;
    const nuevoLeft = objeto.left * escala;
    const nuevoWidth = objeto.width * escala;
    const nuevoHeight = nuevoWidth;

    elemento.css({
        'width': `${nuevoWidth}px`,
        'height': `${nuevoHeight}px`,
        'top': `${nuevoTop}px`,
        'left': `${nuevoLeft}px`
    });

}

function posicionarMenu(objeto, elemento, escala) {
    const nuevoWidth = objeto.width * escala;
    const nuevoHeight = objeto.height * escala;

    elemento.css({
        'width': `${nuevoWidth}px`,
        'heigth': `${nuevoHeight}px`
    })
}

function posicionarTemas(objeto, elemento, escala) {

    const nuevoFontSize = objeto.fontSize * escala;
    elemento.css('fontSize', `${nuevoFontSize}px`);
}

// Redimensionar elementos----------------------------------------------------
function redimensionarElementos() {
    console.log('Redimensionando Elementos');
}