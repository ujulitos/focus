function activaSecInicio() {
    console.log('activaSecInicio');
    // cargador('muestra');

    $('.panel-header div h3').html('Grupo Bimbo');
    $('#subtituloSeccion').html('');
    $('#subseccion').html('');

    return pintaInicio().then(function() {
        cargador('oculta');
    });
};

function pintaInicio() {

    // Título de bienvenida por perfil
    if (elPerfil === "Administrador") {
        $('#inicio_instructor, #inicio_participante, #divLoginSesion').hide();
    } else if (elPerfil === "Instructor") {
        $('#inicio_admin, #inicio_participante, #boton_sesion_participante').hide();
    } else if (elPerfil === "Participante") {
        $('#inicio_admin, #inicio_instructor, #boton_sesion_instructor').hide();
    }
    $('.titulo_jumbotron').html('Bienvenido (a) ' + elNombre);
    $('.titulo_jumbotron').append('<p class="subtitulo_seccion">' + elPerfil + '</p>');


    // ingreso como participante //
    $("#boton_sesion_participante").click(function(event) {
        if ($(this).css('cursor') == 'pointer') {
            var cualSeccion = $(this).attr('id').substr(6, $(this).attr('id').length);
            event.preventDefault();

            var laSesionPt1 = $('#entrar_sesion1').val();
            var laSesionPt2 = $('#entrar_sesion2').val();
            var laSesionPt3 = $('#entrar_sesion3').val();
            laSesionActual = 'sesion_' + laSesionPt1 + laSesionPt2 + laSesionPt3;

            //QUITAR
            // laSesionActual = 'sesion_190219111915Z1Yx';
            buscaSesion(laSesionActual, cualSeccion);
        };
    });

    // ingreso como instructor //
    $("#boton_sesion_instructor").click(function(event) {
        if ($(this).css('cursor') == 'pointer') {
            var cualSeccion = $(this).attr('id').substr(6, $(this).attr('id').length);
            event.preventDefault();

            var laSesionPt1 = $('#entrar_sesion1').val();
            var laSesionPt2 = $('#entrar_sesion2').val();
            var laSesionPt3 = $('#entrar_sesion3').val();
            laSesionActual = 'sesion_' + laSesionPt1 + laSesionPt2 + laSesionPt3;

            //QUITAR
            // laSesionActual = 'sesion_190219111915Z1Yx';
            buscaSesion(laSesionActual, cualSeccion);
        };
    });

    if (localStorage.ssn != null & localStorage.scc_int != null) {
        laSesionActual = localStorage.ssn;
        buscaSesion(localStorage.ssn, localStorage.scc_int);
    }

    return $.ajax();

}




function buscaSesion(cualSesion, cualSeccion) {
    console.log('buscaSesion', cualSesion, ' y ', cualSeccion);
    localStorage.ssn = cualSesion;
    localStorage.scc_int = cualSeccion;

    if (revisaConexion) {
        firebase.database().ref(laUrlBase + 'Sesiones').orderByChild('Id').equalTo(cualSesion).once('value').then(function(snapshot) {
            if (snapshot.val() != null) {
                console.log("snapshot.val()", snapshot.val());

                snapshot.forEach(function(childSnapshot) {
                    this.laSesion_Key = childSnapshot.key;
                    console.log('laSesion_Key: ', laSesion_Key);
                    this.laSesion_Id = childSnapshot.val().Id;
                    console.log('laSesion_Id: ', laSesion_Id);
                    this.laSesion_Activa = childSnapshot.val().Activa;
                    console.log('laSesion_Activa: ', laSesion_Activa);

                    if (laSesion_Activa == true) {
                        $('.mensaje_error_sesion').text('');
                        return navega(cualSeccion);
                    } else {
                        console.log('La sesión no se encuentra activa, por favor revisa con tu Instructor.');
                        $('.mensaje_error_sesion').text('La sesión no se encuentra activa, por favor revisa con tu Instructor.');
                        return false;
                    }

                });
            } else {
                console.log('Clave de Sesión incorrecta, por favor revisa con tu Instructor.');
                $('.mensaje_error_sesion').text('Clave de Sesión incorrecta, por favor revisa con tu Instructor.');
                return false;
            }
        });
    };
};
