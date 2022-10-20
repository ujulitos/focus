let elementos;

// Al cargarse la página
$(window).on("load", function() {
    posicionarElementos();
});

function posicionarElementos() {
    elementos = $('.elementos');

    $.each(elementos, function() {
        const posicionX = $(this).data('posx');
        const posicionY = $(this).data('posy');

        $(this).css({
            'top': `${posicionY}px`,
            'left': `${posicionX}px`
        });
    });
}

// Al redimensionar la página
let intervaloR2;
$(window).resize(function() {
    clearTimeout(intervaloR2);
    intervaloR2 = setTimeout(escalarElementos, 300);
});

function escalarElementos() {
    redimensionarElementos();
}