/////////////////////////////////////////////////////////////////////////////////////////////
//////////*************************  i4L API  **************************************/////////
/////////////////////////////////////////////////////////////////////////////////////////////

function registraIniciado() {
    console.log('registraIniciado');

    // inicializaAPI();

    var onComplete = function(error) {
        if (error) {
            console.log('Ocurrió un error en la sincronización.');
        } else {
            console.log('Sincronización realizada.');
            // SCORM API //
            // inicializaAPI();
        }
    };

    nuevoData = {};

    if (revisaConexion) {

        var elRefIniciado = laUrlBase + 'Sesiones/' + laSesionActual + '/Registro/' + usuarioId + '/Modulos/modulo_' + elModulo + '/Recursos/recurso_' + elRecurso + '/' + that['laSesion_Leccion' + '_Modulo' + elModulo + '_Recurso' + elRecurso + '_Id'];
        console.log('elRefIniciado: ', elRefIniciado);

        firebase.database().ref(elRefIniciado).once('value').then(function(snapshot) {
            console.log('snapshot.val()', snapshot.val());

            if (snapshot.val() == null) {

                var nuevoData = {
                    'Activo': false,
                    'Puntos': 0,
                    'Estatus': 'no_iniciado',
                    'Insignia': true,
                    'Duracion': '',
                    'Fecha_fin': '',
                    'Fecha_inicio': laFechaInicial,
                    'Marcador': 0
                }
                var updates = {};
                updates[elRefIniciado] = nuevoData;
                firebase.database().ref().update(updates, onComplete);

            }
        });

        setTimeout(function() {
            inicializaAPI();
        }, 500);

    }
}


function registraRevisado() {

    if (puntosObtenidos) {
        puntosARegistrar = puntosAObtener;
    } else {
        puntosARegistrar = '0';
    }

    var onComplete = function(error) {
        if (error) {
            console.log('Ocurrió un error en la sincronización.');
        } else {
            console.log('Sincronización realizada.');
        }
    };

    if (revisaConexion) {

        var elRefRevisado = laUrlBase + 'Sesiones/' + laSesionActual + '/Registro/' + usuarioId + '/Modulos/modulo_' + elModulo + '/Recursos/recurso_' + elRecurso + '/' + that['laSesion_Leccion' + '_Modulo' + elModulo + '_Recurso' + elRecurso + '_Id'];
        console.log('elRefRevisado: ', elRefRevisado);

        firebase.database().ref(elRefRevisado).once('value').then(function(snapshot) {
            console.log('snapshot.val()', snapshot.val());

            if (snapshot.val() != null) {

                // var elRevisado = snapshot.child('Revisado').val();
                // console.log('elRevisado', elRevisado);
                var laFechaHoy = obtenerFecha();
                console.log('laFechaHoy', laFechaHoy);
                var laFecha_ini = snapshot.child('Fecha_inicio').val();
                console.log('laFecha_ini', laFecha_ini);
                var laDuracion = obtenerDuracion(laFecha_ini);
                console.log('laDuracion', laDuracion);

                firebase.database().ref(elRefRevisado).update({
                    'Estatus': 'revisado',
                    'Puntos': puntosARegistrar,
                    'Duracion': laDuracion,
                    'Fecha_fin': laFechaHoy
                }, onComplete);

            }
        });
    }
}
