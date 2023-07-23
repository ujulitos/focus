var sinnada;
var usuario_PuntosTotales;
var cuantasLecciones;
var cuantasInsignias;
var cuantosColegas;
var cuantosColegasMostrar = 10;
var htmlInsignias = "";
var colegasLista = [];
var Colegas = new Map();
var that;


function activaSecResultados() {
    console.log('activaSecResultados');
    $('.panel-header div h3').html('Mis Resultados');
    $('#subtituloSeccion').html('');


    return cuentaPuntosUsuario();

}


function cuentaPuntosUsuario() {
    console.log('cuentaPuntosUsuario', usuarioKey);

    this['usuario' + '_PuntosTotales'] = 0;
    totalInsignias = 0;
    cuantasSesiones = 0;
    cuantasLecciones = 0;
    cuantasInsignias = 0;

    if (revisaConexion) {
        // var refUser = firebase.database().ref(laUrlBase + "Usuarios/" + usuarioKey);
        firebase.database().ref(laUrlBase + 'Sesiones').once('value').then(function(snapshot) {
            if (snapshot.val() != null) {
                // console.log('snapshot.val()', snapshot.val());
                cuantasSesiones++;

                snapshot.forEach(function(snapshotRegistro) {
                    // console.log('snapshotRegistro.val()', snapshotRegistro.val());
                    if (snapshotRegistro.child('Registro').exists()) {
                        // console.log('Registro', snapshotRegistro.val().Registro);
                        snapshotRegistro.forEach(function(snapshotElUsuario) {
                            if (snapshotElUsuario.child(usuarioKey).exists()) {
                                // console.log('usuarioKey', snapshotElUsuario.child(usuarioKey).val());

                                this['sesion' + '_Leccion'] = snapshotRegistro.val().Leccion;
                                console.log('sesion' + '_Leccion', this['sesion' + '_Leccion']);
                                cuantasLecciones++;
                                // cuenta insignias

                                snapshotElUsuario.child(usuarioKey).forEach(function(snapshotModulos) {
                                    // console.log('snapshotModulos', snapshotModulos.val());
                                    snapshotModulos.forEach(function(snapshotModulos2) {
                                        // console.log('snapshotModulos2', snapshotModulos2.val());
                                        snapshotModulos2.forEach(function(snapshotRecursos) {
                                            // console.log('snapshotRecursos', snapshotRecursos.val());
                                            snapshotRecursos.forEach(function(snapshotRecursos2) {
                                                // console.log('snapshotRecursos2', snapshotRecursos2.val());
                                                snapshotRecursos2.forEach(function(snapshotRecursos3) {
                                                    // console.log('snapshotRecursos2', snapshotRecursos3.val());
                                                    cuantasInsignias++;

                                                    this['usuario' + '_Puntos'] = snapshotRecursos3.val().Puntos;
                                                    // console.log('usuario' + '_Puntos', this['usuario' + '_Puntos']);
                                                    this['usuario' + '_PuntosInt'] = parseInt(snapshotRecursos3.val().Puntos);
                                                    // console.log('parseInt usuario' + '_PuntosInt', this['usuario' + '_PuntosInt']);
                                                    this['usuario' + '_PuntosTotales'] += this['usuario' + '_PuntosInt'];
                                                    // console.log('usuario' + '_PuntosTotales', this['usuario' + '_PuntosTotales']);
                                                    this['leccion' + cuantasLecciones + '_Insignia' + cuantasInsignias + '_InsigniaOtorgada'] = snapshotRecursos3.val().Insignia;
                                                    console.log('leccion' + cuantasLecciones + '_Insignia' + cuantasInsignias + '_InsigniaOtorgada', this['leccion' + cuantasLecciones + '_Insignia' + cuantasInsignias + '_InsigniaOtorgada']);
                                                    totalInsignias++;
                                                    that = this;

                                                });
                                            });
                                        });
                                    });
                                });
                            }
                        });
                    }
                });
                if (cuantasLecciones != 0) {
                    return cuentaInsigniasUsuario(that['sesion' + '_Leccion']);
                }
            }
        });
    }
}



function cuentaInsigniasUsuario(cualLeccion) {
    console.log('cuentaInsigniasUsuario', cualLeccion);
    cuantasLecciones = 0;
    cuantasInsignias = 0;

    if (revisaConexion) {
        firebase.database().ref(laUrlBase + 'Lecciones').orderByChild('Id').equalTo(cualLeccion).once('value').then(function(snapshot) {
            if (snapshot.val() != null) {
                // console.log('snapshot', snapshot.val());
                cuantasLecciones++;

                snapshot.forEach(function(snapshotLeccion) {
                    // console.log('snapshotLeccion', snapshotLeccion.val());
                    if (snapshotLeccion.child('Modulos').exists()) {
                        // console.log('Modulos', snapshotLeccion.val().Modulos);
                        snapshotLeccion.child('Modulos').forEach(function(snapshotRecursos) {
                            // console.log('snapshotRecursos', snapshotRecursos.val());
                            if (snapshotRecursos.child('Recursos').exists()) {
                                // console.log('Recursos', snapshotRecursos.val().Recursos);
                                snapshotRecursos.child('Recursos').forEach(function(snapshotInsignias) {
                                    // console.log('snapshotInsignias', snapshotInsignias.val());
                                    if (snapshotInsignias.child('insignia').exists()) {
                                        if (snapshotInsignias.val().insignia != 'no') {
                                            console.log('Insignia', snapshotInsignias.val().insignia);
                                            cuantasInsignias++;

                                            this['leccion' + cuantasLecciones + '_Insignia' + cuantasInsignias + '_Imagen'] = snapshotInsignias.child('insignia').val().imagen;
                                            console.log('leccion' + cuantasLecciones + '_Insignia' + cuantasInsignias + '_Imagen', this['leccion' + cuantasLecciones + '_Insignia' + cuantasInsignias + '_Imagen']);
                                            // this['leccion' + cuantasLecciones + '_Insignia' + cuantasInsignias + '_Otorgada'] = snapshotInsignias.child('insignia').val().otorgada;
                                            // console.log('leccion' + cuantasLecciones + '_Insignia' + cuantasInsignias + '_Otorgada', this['leccion' + cuantasLecciones + '_Insignia' + cuantasInsignias + '_Otorgada']);
                                            this['leccion' + cuantasLecciones + '_Insignia' + cuantasInsignias + '_Nombre'] = snapshotInsignias.child('insignia').val().nombre;
                                            console.log('leccion' + cuantasLecciones + '_Insignia' + cuantasInsignias + '_Nombre', this['leccion' + cuantasLecciones + '_Insignia' + cuantasInsignias + '_Nombre']);

                                            that = this;

                                        }
                                    }
                                });
                            }
                        });
                    }
                });

                return cuentaMiNivel();

            }
        });
    }

    //    return $.ajax();

}


function cuentaMiNivel() {
    console.log('cuentaMiNivel');


    return cuentaColegas();

}





function cuentaColegas() {
    console.log('cuentaColegas');

    cuantosColegasPre = 0;
    cuantosColegasPreArray = [];
    cuantosColegas = 0;

    if (revisaConexion) {
        // var refUser = firebase.database().ref(laUrlBase + "Usuarios/" + usuarioKey);
        firebase.database().ref(laUrlBase + 'Sesiones').once('value').then(function(snapshot) {
            if (snapshot.val() != null) {
                // console.log('snapshot.val()', snapshot.val());

                snapshot.forEach(function(snapshotRegistro) {
                    // console.log('snapshotRegistro.val()', snapshotRegistro.val());
                    if (snapshotRegistro.child('Registro').exists()) {
                        // console.log('Registro', snapshotRegistro.val().Registro);
                        snapshotRegistro.child('Registro').forEach(function(snapshotColegas) {
                            // console.log('snapshotColegas', snapshotColegas.val());

                            cuantosColegasPre++;
                            this['colega' + cuantosColegasPre + '_Id'] = snapshotColegas.key;
                            if (snapshotColegas.key != 'usuario_181122181940PchN') {
                                // Si no es el admin
                                cuantosColegasPreArray.push(snapshotColegas.key);
                                // console.log('cuantosColegasPreArray', cuantosColegasPreArray);
                                cuantosColegasPreArray = $.unique(cuantosColegasPreArray);
                                console.log('cuantosColegasPreArray unique', cuantosColegasPreArray);

                                cuantosColegas = cuantosColegasPreArray.length;
                                this['colega' + cuantosColegas + '_Id'] = snapshotColegas.key;

                                console.log(cuantosColegas, 'colega' + cuantosColegas + '_Id', this['colega' + cuantosColegas + '_Id']);
                                that = this;
                                return;
                            }
                        });
                    }
                });

                for (a = 1; a <= cuantosColegasPreArray.length; a++) {
                    // busca los nombres de los colegas
                    if (that['colega' + a + '_Id'] != 'usuario_181122181940PchN') {
                        console.log('buscaNombreColega', cuantosColegas);

                        return buscaNombreColega(that['colega' + a + '_Id'], cuantosColegas);
                    }
                }

            }
        });
    }

}



function buscaNombreColega(cualColega, num) {
    console.log('buscaNombreColega', cualColega, 'y', num);

    if (revisaConexion) {
        firebase.database().ref(laUrlBase + 'Usuarios').orderByChild('Id').equalTo(cualColega).once('value').then(function(snapshot) {
            if (snapshot.val() != null) {
                snapshot.forEach(function(childSnapshot) {
                    this['colega' + num + '_Id'] = snapshot.child(childSnapshot.key).child('Id').val();
                    this['colega' + num + '_nombre'] = snapshot.child(childSnapshot.key).child('Nombre').val();
                    this['colega' + num + '_ApPaterno'] = snapshot.child(childSnapshot.key).child('Apellido_Paterno').val();
                    this['colega' + num + '_ApMaterno'] = snapshot.child(childSnapshot.key).child('Apellido_Materno').val();
                    this['colega' + num + '_NombreCompleto'] = this['colega' + num + '_nombre'] + ' ' + this['colega' + num + '_ApPaterno'] + ' ' + this['colega' + num + '_ApMaterno'];
                    console.log('colega' + num + '_NombreCompleto', this['colega' + num + '_NombreCompleto']);

                    that = this;

                    return cuentaPuntosColegas(cualColega, num);

                });
            }
        });
    }
}



function cuentaPuntosColegas(cualColega, numColega) {
    console.log('cuentaPuntosColegas', cualColega, ' y ', numColega);

    this['colega' + numColega + '_PuntosTotales'] = 0;

    if (revisaConexion) {
        firebase.database().ref(laUrlBase + 'Sesiones').once('value').then(function(snapshot) {
            if (snapshot.val() != null) {
                // console.log('snapshot.val()', snapshot.val());
                snapshot.forEach(function(snapshotRegistro) {
                    // console.log('snapshotRegistro.val()', snapshotRegistro.val());
                    if (snapshotRegistro.child('Registro').exists()) {
                        // console.log('Registro:', snapshotRegistro.val().Registro);
                        snapshotRegistro.forEach(function(snapshotColegas) {
                            // console.log('snapshotColegas', snapshotColegas.val());
                            if (snapshotColegas.child(cualColega).exists()) {
                                // console.log('cualColega', snapshotColegas.child(cualColega).key);
                                snapshotColegas.child(cualColega).forEach(function(snapshotModulos) {
                                    // console.log('snapshotModulos', snapshotModulos.val());
                                    snapshotModulos.forEach(function(snapshotModulos2) {
                                        // console.log('snapshotModulos2', snapshotModulos2.val());
                                        snapshotModulos2.forEach(function(snapshotRecursos) {
                                            // console.log('snapshotRecursos', snapshotRecursos.val());
                                            snapshotRecursos.forEach(function(snapshotRecursos2) {
                                                // console.log('snapshotRecursos2', snapshotRecursos2.val());
                                                snapshotRecursos2.forEach(function(snapshotRecursos3) {
                                                    //  console.log('snapshotRecursos2', snapshotRecursos2.val());

                                                    this['colega' + numColega + '_Puntos'] = snapshotRecursos3.val().Puntos;
                                                    // console.log('colega' + numColega + '_Puntos', this['colega' + numColega + '_Puntos']);
                                                    this['colega' + numColega + '_PuntosInt'] = parseInt(snapshotRecursos3.val().Puntos);
                                                    // console.log('parseInt colega' + numColega + '_PuntosInt', this['colega' + numColega + '_PuntosInt']);
                                                    this['colega' + numColega + '_PuntosTotales'] += this['colega' + numColega + '_PuntosInt'];
                                                    // console.log('colega' + numColega + '_PuntosTotales', this['colega' + numColega + '_PuntosTotales']);
                                                    that = this;

                                                });
                                            });
                                        });
                                    });
                                });

                                return pintaResultados().then(function() {
                                    cargador('oculta');
                                });

                            }
                        });
                    }
                });
            }
        });
    }
}




function pintaResultados() {
    console.log('pintaResultados');

    $("#pNombre").text(_elPerfilNombre);
    $("#pPuntos").text(usuario_PuntosTotales);
    $("#img_profile_foto").attr('src', 'usuarios/' + usuarioKey + '/profile_foto.jpg');

    var contenidoInsignias = '';
    $('#pInsignias').empty();

    contenidoInsignias += '<div class="row">';

    for (a = 1; a <= cuantasLecciones; a++) {
        for (b = 1; b <= cuantasInsignias; b++) {
            if (that['leccion' + a + '_Insignia' + b + '_Nombre'] != undefined) {

                contenidoInsignias += '<div class="col-2">';

                if (that['leccion' + a + '_Insignia' + b + '_InsigniaOtorgada'] == true) {
                    contenidoInsignias += '<div id="pInsignias' + b + '" class="pInsigniasGanadas" style="opacity: 1; margin-left: 10px;">';
                    contenidoInsignias += '<img src="' + that['leccion' + a + '_Insignia' + b + '_Imagen'] + '" class="rendondeada">';
                } else {
                    contenidoInsignias += '<div id="pInsignias' + b + '" class="pInsigniasGanadas grayscale" style="opacity: .3; margin-left: 10px;">';
                    contenidoInsignias += '<img src="' + that['leccion' + a + '_Insignia' + b + '_Imagen'] + '" class="rendondeada">';
                }
                contenidoInsignias += '</div>';
                contenidoInsignias += '<br><div id="pInsigniaNombre' + b + '" class="insignias_texto">' + that['leccion' + a + '_Insignia' + b + '_Nombre'] + '</div>';
                contenidoInsignias += '</div>';

            }
        }
    }
    contenidoInsignias += '</div>';

    $('#pInsignias').append(contenidoInsignias);




    var contenidoColegas = '';
    $('#tablaBody').empty();

    var arrayPuntosColegas = [];

    if (cuantosColegas < cuantosColegasMostrar) {
        cuantosColegasMostrar = cuantosColegas;
    }


    // ordena colegas de mayor a menor
    for (a = 1; a <= cuantosColegasMostrar; a++) {
        arrayPuntosColegas[(a - 1)] = [that['colega' + a + '_Id'], that['colega' + a + '_NombreCompleto'], that['colega' + a + '_PuntosTotales']];

        arrayPuntosColegas.sort(function(a, b) {
            return a[2] - b[2];
        }).reverse();
        console.log('arrayPuntosColegas', arrayPuntosColegas);
    }


    for (a = 1; a <= cuantosColegasMostrar; a++) {
        var noCache = generarId();

        contenidoColegas += '<tr>';
        contenidoColegas += '<td class="colega_numero">' + a + '</td>';
        contenidoColegas += '<td><div class="juntar"><img src="' + 'usuarios/' + arrayPuntosColegas[(a - 1)][0] + '/profile_foto.jpg?' + noCache + '" class="rendondeada"> <label>' + arrayPuntosColegas[(a - 1)][1] + '</label></div></td>';
        // contenidoColegas += '<td><div class="progress"><div class="' + 'progress-bar' + '" style="width: ' + '35%">' + 35 + '%</div></div></td>';
        contenidoColegas += '<td style="width: 35%">' + arrayPuntosColegas[(a - 1)][2] + '</td>';
        contenidoColegas += '</tr>';

    }


    $('#tablaBody').append(contenidoColegas);


    // pintaChart(1, 85, 2000, '#ff5722');


    return $.ajax();

}
