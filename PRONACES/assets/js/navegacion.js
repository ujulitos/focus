$(document).ready(function() {

    navega();

});

function navega(seccion) {
    console.log('navega', seccion);

    // $('#hero .hero-waves').hide();
    $('#tonach').hide();
    $('#proyecto_gral').hide();

    $('#investigadoras').hide();
    $('#invest_veracruz_4').hide();

    $('#comunidades').hide();
    $('#narrativas_embarazo').hide();
    $('#narrativas_nacimiento').hide();
    $('#narrativas_crianza').hide();
    $('#parteras').hide();
    $('#repositorio').hide();
    $('#biblioteca').hide();
    $('#pedagogia').hide();

    switch (seccion) {

        case 'investigadoras':
            $('#investigadoras').show();
            break;
        case 'invest_veracruz_4':
            $('#invest_veracruz_4').show();
            break;
        case 'comunidades':
            $('#comunidades').show();
            break;
        case 'narrativas_embarazo':
            $('#narrativas_embarazo').show();
            break;
        case 'narrativas_nacimiento':
            $('#narrativas_nacimiento').show();
            break;
        case 'narrativas_crianza':
            $('#narrativas_crianza').show();
            break;
        case 'narrativas_crianza':
            $('#narrativas_crianza').show();
            break;
        case 'parteras':
            $('#parteras').show();
            break;
        case 'repositorio':
            $('#repositorio').show();
            break;
        case 'biblioteca':
            $('#biblioteca').show();
            break;
        case 'pedagogia':
            $('#pedagogia').show();
            break;

        default:
            $('#tonach').show();
            $('#proyecto_gral').show();
            break;

    }


    // scrollto($('#investigadoras'));
}