$(document).ready(function() {

    navega('tonach', true);

});


function navega(seccion, home) {

    if (!home) {
        home = false;
    }
    console.log('navega', seccion);

    $('#main').empty();


    $('#main').load(seccion + '.html', function(response, status, xhr) {
        console.log('status', status);
        if (status == "success") {

            // $('html, body').scrollTop(0);
            $('#main').show();

            if (!home) {
                $('html, body').animate({
                    scrollTop: $('#' + seccion).offset().top
                }, 0);
            }

            activaSeccion(seccion);
        }
    });

}

function activaSeccion(seccion) {
    console.log('activaSeccion', seccion);

}