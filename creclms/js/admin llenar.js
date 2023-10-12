var tablaReporte;
var cuantasLecciones;
var cuantosUsuariosPre;
var cuantasAsignacionesPre;
var cuantosUsuarios;
var cuantosRecursos;
var cuantosRecAsig;
var elCorreoUsuExiste;
var that;
var thatt;
var those;
var there;
var dataSet = [];

function activaSecAdmin() {
    console.log('activaSecAdmin');
    $('#subtituloSeccion').html('');

    // QUITAR para leer calificaciones
    // return LlenaLecciones();
    return leeRecNombres();
}


function LlenaLecciones() {
    console.log('LlenaLecciones');

    var onComplete = function(error) {
        if (error) {
            console.log('Ocurrió un error en la sincronización.');
        } else {
            return leeRecNombres();
            console.log('Sincronización realizada.');
        }
    };

    if (revisaConexion) {

        // cuenta Usuarios
        firebase.database().ref(laUrlBase + 'Usuarios').once('value').then(function(snapshot) {
            if (snapshot.val() != null) {
                var contadorUsuariosPre = 0;
                contadorAsignacionesPre = 0;

                snapshot.forEach(function(childSnapshot) {
                    // console.log('childSnapshot.key ', childSnapshot.key);
                    if (childSnapshot.key != undefined && childSnapshot.key != null && childSnapshot.key != 'undefined') {
                        contadorUsuariosPre++;

                        this['usuariosIdPre' + contadorUsuariosPre] = childSnapshot.child('Id').val();
                        console.log('usuariosIdPre', this['usuariosIdPre' + contadorUsuariosPre]);

                        childSnapshot.forEach(function(childSnapshot2) {
                            childSnapshot2.forEach(function(childSnapshot3) {
                                if (childSnapshot3.key != 'Clase') {

                                    contadorAsignacionesPre++;
                                    this['cuantasAsignacionesPre' + contadorAsignacionesPre] = contadorAsignacionesPre;
                                    // console.log('cuantasAsignacionesPre', this['cuantasAsignacionesPre' + contadorAsignacionesPre]);

                                    this['asignacionPre' + contadorAsignacionesPre] = childSnapshot3.key;
                                    console.log('asignacionPre', this['cuantasAsignacionesPre' + contadorAsignacionesPre], this['asignacionPre' + contadorAsignacionesPre]);

                                }
                            });
                        });


                    }
                });

                thatt = this;
                cuantosUsuariosPre = contadorUsuariosPre;
                cuantasAsignacionesPre = contadorAsignacionesPre;
                console.log('cuantosUsuariosPre', cuantosUsuariosPre, 'cuantasAsignacionesPre', cuantasAsignacionesPre);

                buscaUsuarios();

            }
        });


        // llena Usuarios con val: true       
        var cont = 0;

        function buscaUsuarios() {
            if (revisaConexion) {
                firebase.database().ref(laUrlBase + 'Lecciones').once('value').then(function(snapshot) {
                    // console.log('snapshot.val()', snapshot.val());

                    // firebase.database().ref(laUrlBase + 'Lecciones').orderByKey().equalTo(valorBuscar).once('value').then(function(snapshot) {
                    if (snapshot.val() != null) {
                        // console.log('snapshot.val()', snapshot.val());

                        snapshot.forEach(function(childSnapshot) {
                            // console.log('childSnapshot', childSnapshot.key, childSnapshot.val());


                            // for (a = 1; a <= cuantosUsuariosPre; a++) {

                            //     // console.log('childSnapshott', a, thatt['usuariosIdPre' + a]);

                            //     if (thatt['usuariosIdPre' + a] == childSnapshot.key) {
                            //         cont++;
                            //         // console.log('encontrado', a, thatt['usuariosIdPre' + a], childSnapshot.key);

                            //         this['usuariosIdEncontrado' + cont] = thatt['usuariosIdPre' + a];
                            //         console.log('usuariosIdEncontrado', this['usuariosIdEncontrado' + cont]);

                            //         // } else {

                            //         // console.log('no encontrado', a, cont, thatt['usuariosIdPre' + a]);
                            //     }
                            // }

                        });




                    }
                });
            }
        }



        var elCont = 0;
        var objectLeccionesVal = {};

        if (revisaConexion) {
            var elRefLeccionesVal = laUrlBase;
            firebase.database().ref(elRefLeccionesVal).once('value').then(function(snapshot) {
                // console.log('snapshot.val()', snapshot.val());

                for (a = 1; a <= cuantasAsignacionesPre; a++) {
                    // for (b = 1; b <= thatt['cuantasAsignacionesPre' + a]; b++) {
                    console.log('asignacionPreee', a, thatt['asignacionPre' + a]);

                    elCont++;

                    objectLeccionesVal[thatt['usuariosIdPre' + a]] = {
                        [thatt['asignacionPre' + (a - 0)]]: {
                            val: true
                        },
                        [thatt['asignacionPre' + (a + 1)]]: {
                            val: true
                        }
                    };
                    // }
                }

                firebase.database().ref(elRefLeccionesVal).update({
                    Lecciones2: objectLeccionesVal
                }, onComplete);

                // var nuevoData = {
                //     arrayLeccionesVal: {
                //         a: thatt['usuariosIdPre' + a],
                //         'Puntos': 0,
                //         'Estatus': 'no_iniciado',
                //         'Insignia': true
                //     }
                // }



                // var updates = {};
                // updates[elRefLeccionesVal] = nuevoData;

                // firebase.database().ref().update(updates /*, onComplete*/ );

            });
        }


    }
}


function leeRecNombres() {
    // console.log('leeRecNombres');
    var contadorRecursos = 0;

    firebase.database().ref(laUrlBase + 'Recursos').once('value').then(function(snapshot) {
        if (snapshot.val() != null) {
            snapshot.forEach(function(childSnapshot) {
                if (snapshot.val() != null) {

                    if (childSnapshot.key.split('d')[1] == 'x') {
                        contadorRecursos++;
                        // console.log('childSnapshot.key', childSnapshot.key);

                        this['elRecursoNombre' + contadorRecursos] = childSnapshot.child('Nombre').val();
                        // console.log('elRecursoNombre', contadorRecursos, this['elRecursoNombre' + contadorRecursos]);

                    }
                }
            });
            those = this;
            return leeLecciones();
        }
    });
}


function leeLecciones() {
    console.log('leeLecciones');
    var contadorKeys = 0;
    var contador = 0;
    var contadorLecciones_dx = 0;
    var contadorLecciones_oc = 0;

    firebase.database().ref(laUrlBase + 'Lecciones').once('value').then(function(snapshot) {
        if (snapshot.val() != null) {
            snapshot.forEach(function(childSnapshot) {
                if (snapshot.val() != null) {

                    // QUITAR perfiles Admin
                    if (childSnapshot.key != 'imp0001' && childSnapshot.key != 'imp0002' && childSnapshot.key != 'imp0003' && childSnapshot.key != 'imp0004' && childSnapshot.key != 'imp0005' && childSnapshot.key != 'val') {
                        contadorKeys++;
                        this['leccionesKeys' + contadorKeys] = childSnapshot.key;
                        console.log('leccionesKeys', contadorKeys, this['leccionesKeys' + contadorKeys]);
                    }

                    childSnapshot.forEach(function(childSnapshot2) {

                        // QUITAR perfiles Admin
                        if (childSnapshot.key != 'imp0001' && childSnapshot.key != 'imp0002' && childSnapshot.key != 'imp0003' && childSnapshot.key != 'imp0004' && childSnapshot.key != 'imp0005') {
                            contador++;

                            // console.log('leeLecciones', contador, childSnapshot.key, childSnapshot2.key, those['usuarioId' + contador], those['usuarioPerfilInt' + contador]);

                            this['leccionesTomadasKey' + contador] = childSnapshot2.key;
                            console.log('leccionesTomadasKey', contador, this['leccionesTomadasKey' + contador]);


                            if (childSnapshot2.key.split('d')[1] == 'x') {
                                contadorLecciones_dx++;
                                this['elRecursoCalificacion_dx' + contadorLecciones_dx] = childSnapshot2.child('SCORM_12').child('cmi_core_score_raw').val();
                                console.log('elRecursoCalificacion_dx', contadorKeys, this['leccionesKeys' + contadorKeys], contadorLecciones_dx, this['elRecursoCalificacion_dx' + contadorLecciones_dx]);
                            }
                            if (childSnapshot2.key.split('oc')[1] == '') {
                                contadorLecciones_oc++;
                                this['elRecursoCalificacion_oc' + contadorLecciones_oc] = childSnapshot2.child('SCORM_12').child('cmi_core_score_raw').val();
                                console.log('elRecursoCalificacion_oc', contadorKeys, this['leccionesKeys' + contadorKeys], contadorLecciones_oc, this['elRecursoCalificacion_oc' + contadorLecciones_oc]);
                            }

                            // if (this['elRecursoCalificacion_dx' + contadorLecciones_oc] == undefined || this['elRecursoCalificacion_dx' + contadorLecciones_oc] == null || this['elRecursoCalificacion_dx' + contadorLecciones_oc] == '') {
                            //     this['elRecursoCalificacion_dx' + contadorLecciones_oc] = 'Sin Registro'
                            // }
                            // if (this['elRecursoCalificacion_oc' + contadorLecciones_oc] == undefined || this['elRecursoCalificacion_oc' + contadorLecciones_oc] == null || this['elRecursoCalificacion_oc' + contadorLecciones_oc] == '') {
                            //     this['elRecursoCalificacion_oc' + contadorLecciones_oc] = 'Sin Registro'
                            // }

                            // dataSet[(contadorLecciones_dx - 1)] = [
                            //     this['leccionesKeys' + contadorKeys],
                            //     '',
                            //     '',
                            //     '',
                            //     this['elRecursoCalificacion_dx' + contadorLecciones_dx],
                            //     this['elRecursoCalificacion_oc' + contadorLecciones_oc],
                            //     ''
                            // ];


                        }
                    });
                }
            });
            there = this;
            cuantasLecciones = contadorKeys;

            return cuentaLecciones();
        }
    });
}


function cuentaLecciones() {
    console.log('cuentaLecciones');

    if (revisaConexion) {
        firebase.database().ref(laUrlBase + 'Usuarios').once('value').then(function(snapshot) {
            if (snapshot.val() != null) {
                var contadorClases = 0;
                var contadorRecAsig = 0;
                // var contadorRecAsigInt1 = 0;
                // var contadorRecAsigInt2 = 0;
                var contadorUsuarios = 0;
                var contadorPerfiles = 0;

                snapshot.forEach(function(childSnapshot) {
                    // console.log('childSnapshot.key ', childSnapshot.key);
                    if (childSnapshot.key != undefined && childSnapshot.key != null && childSnapshot.key != '' && childSnapshot.key != 'undefined') {
                        contadorPerfiles++;
                        this['usuarioPerfil' + contadorPerfiles] = snapshot.child(childSnapshot.key).child('Perfil').val();
                        // console.log('usuarioPerfil', contadorPerfiles, this['usuarioPerfil' + contadorPerfiles]);

                        if (this['usuarioPerfil' + contadorPerfiles] != 'Administrador' && this['usuarioPerfil' + contadorPerfiles] != 'Prueba') {
                            contadorUsuarios++;
                            this['usuarioId' + contadorUsuarios] = snapshot.child(childSnapshot.key).child('Id').val();
                            // console.log(contadorUsuarios, this['usuarioId' + contadorUsuarios]);

                            this['usuarioNombre' + contadorUsuarios] = snapshot.child(childSnapshot.key).child('Nombre').val();
                            this['usuarioApellido_Paterno' + contadorUsuarios] = snapshot.child(childSnapshot.key).child('Apellido_Paterno').val();
                            this['usuarioApellido_Materno' + contadorUsuarios] = snapshot.child(childSnapshot.key).child('Apellido_Materno').val();
                            // this['usuarioContrasena' + contadorUsuarios] = snapshot.child(childSnapshot.key).child('Contrasena').val();
                            // this['usuarioCorreo' + contadorUsuarios] = snapshot.child(childSnapshot.key).child('Correo').val();
                            this['usuarioPerfilInt' + contadorUsuarios] = snapshot.child(childSnapshot.key).child('Perfil').val();
                            // console.log('usuarioPerfilInt', this['usuarioPerfilInt' + contadorUsuarios]);
                            // this['usuarioPuesto' + contadorUsuarios] = snapshot.child(childSnapshot.key).child('Puesto').val();
                            // this['usuarioVisible' + contadorUsuarios] = snapshot.child(childSnapshot.key).child('Visible').val();
                            // this['Activo' + contadorUsuarios] = snapshot.child(childSnapshot.key).child('Activo').val();

                            childSnapshot.forEach(function(childSnapshot2) {
                                childSnapshot2.forEach(function(childSnapshot3) {
                                    // console.log('elRecursoId', contadorRecAsig, childSnapshot3.key.split('_')[0]);
                                    if (childSnapshot3.key == "Clase") {
                                        contadorClases++;
                                        this['laClase' + contadorClases] = childSnapshot2.child('Clase').val();
                                        // console.log('laClase', contadorClases, this['laClase' + contadorClases]);
                                    }

                                    if (childSnapshot3.key != 'Clase') {
                                        contadorRecAsig++;

                                        this['elRecursoKey' + contadorRecAsig] = childSnapshot3.key;
                                        // console.log('elRecursoKey', contadorRecAsig, this['elRecursoKey' + contadorRecAsig]);

                                        this['elRecursoId' + contadorRecAsig] = childSnapshot3.child('Id').val();
                                        console.log('la Asignación', contadorRecAsig, 'Usuario Id', this['usuarioId' + contadorUsuarios], 'Usuario Nombre', this['usuarioNombre' + contadorUsuarios], 'el Recurso Id', this['elRecursoId' + contadorRecAsig], 'la Clase', this['laClase' + contadorClases]);


                                        // console.log('aaaaaaaaaaaaaaa', there['leccionesKeys' + contadorRecAsig], this['usuarioId' + contadorUsuarios], there['elRecursoCalificacion_dx' + contadorRecAsig]);

                                        // console.log('cccccccccc', this['usuarioId' + contadorUsuarios], there['leccionesKeys' + contadorRecAsig]);

                                        // for (a = 1; a <= contadorRecAsig; a++) {
                                        // for (b = 1; b <= contadorUsuarios; b++) {

                                        // if (there['elRecursoCalificacion_dx' + contadorRecAsig] != null && there['elRecursoCalificacion_dx' + contadorRecAsig] != undefined && there['elRecursoCalificacion_dx' + contadorRecAsig] != '') {
                                        //     this['laCalifDX' + contadorRecAsig] = there['elRecursoCalificacion_dx' + contadorRecAsig];
                                        //     console.log('laCalifDX', contadorRecAsig, this['laCalifDX' + contadorRecAsig]);

                                        // } else {
                                        //     // if (this['laCalifDX' + contadorRecAsig] == null || this['laCalifDX' + contadorRecAsig] == undefined || this['laCalifDX' + contadorRecAsig] == '') {
                                        //     this['laCalifDX' + contadorRecAsig] = 'Sin Registro';
                                        // }
                                        // }

                                        // }
                                        // }

                                        dataSet[(contadorRecAsig - 1)] = [
                                            this['usuarioId' + contadorUsuarios],
                                            this['usuarioNombre' + contadorUsuarios],
                                            this['elRecursoId' + contadorRecAsig],
                                            those['elRecursoNombre' + this['elRecursoId' + contadorRecAsig]],
                                            // this['laCalifDX' + contadorRecAsig],
                                            '',
                                            '',
                                            this['laClase' + contadorClases]
                                        ];


                                    }
                                });
                            });

                        }
                    }
                });

                that = this;
                cuantosUsuarios = contadorUsuarios;
                cuantosRecAsig = contadorRecAsig;




                // for (a = 1; a <= cuantosRecAsig; a++) {
                //     // console.log('a', a, this['usuarioId' + a]);

                //     for (b = 1; b <= cuantasLecciones; b++) {
                //         // console.log('b', this['usuarioId' + a], there['leccionesKeys' + b]);

                //         if (that['usuarioId' + a] == there['leccionesKeys' + b]) {

                //             // if (there['leccionesTomadasKey' + b].split('d')[1] == 'x') {
                //             contadorRecAsigInt1++;

                //             this['laCalifDX' + a] = there['elRecursoCalificacion_dx' + contadorRecAsigInt1];
                //             console.log('laCalifDX', contadorRecAsigInt1, this['laCalifDX' + a], there['leccionesTomadasKey' + b], that['usuarioId' + a]);

                //             // }

                //             // console.log('contadorRecAsigInt1', contadorRecAsigInt1, there['leccionesTomadasKey' + a], this['laCalifDX' + contadorRecAsigInt1], this['usuarioId' + a]);

                //         }

                // if (there['leccionesTomadasKey' + b].split('oc')[1] == '') {

                //     contadorRecAsigInt2++;

                //     this['laCalifOC' + contadorRecAsigInt2] = there['elRecursoCalificacion_oc' + contadorRecAsigInt2];

                //     console.log('laCalifOC', contadorRecAsigInt2, there['leccionesTomadasKey' + a], there['leccionesKeys' + a], this['usuarioId' + a], this['laCalifOC' + contadorRecAsigInt2]);

                // }





                // console.log('dddddddddd', there['leccionesKeys' + a], this['usuarioId' + contadorUsuarios], this['laCalifDX' + contadorRecAsig]);


                // dataSet[(b - 1)] = [
                //     this['usuarioId' + b],
                //     this['usuarioNombre' + b],
                //     this['elRecursoId' + b],
                //     those['elRecursoNombre' + this['elRecursoId' + b]],
                //     this['laCalifDX' + b],
                //     // there['elRecursoCalificacion_oc' + contadorRecAsig],
                //     '',
                //     this['laClase' + contadorClases]
                // ];


                // }
                //     }
                // }



                // if (this['laCalifDX' + contadorRecAsig] == null || this['laCalifDX' + contadorRecAsig] == undefined) {
                //     this['laCalifDX' + contadorRecAsig] = 'Sin Registro';
                // }

                // if (there['elRecursoCalificacion_oc' + contadorRecAsig] == null || there['elRecursoCalificacion_oc' + contadorRecAsig] == undefined) {
                //     there['elRecursoCalificacion_oc' + contadorRecAsig] = 'Sin Registro';
                // }


                // for (a = 1; a <= cuantosRecAsig; a++) {


                // dataSet[(a - 1)][4] = [
                //     this['laCalifDX' + a]
                //     // 'dfdfdf'
                // ];

                // dataSet[(a - 1)][4] = [
                //     this['laCalifDX' + a]
                // ];

                //     dataSet[(contadorRecAsig - 1)] = [
                //         this['usuarioId' + contadorUsuarios],
                //         this['usuarioNombre' + contadorUsuarios],
                //         this['elRecursoId' + contadorRecAsig],
                //         those['elRecursoNombre' + this['elRecursoId' + contadorRecAsig]],
                //         this['laCalifDX' + contadorRecAsig],
                //         // there['elRecursoCalificacion_oc' + contadorRecAsig],
                //         '',
                //         this['laClase' + contadorClases]
                //     ];

                // }




                return pintaAdmin().then(function() {
                    activaBotonesAdmin().then(function() {
                        cargador('oculta');
                    });
                });
            }
        });
    }
}



function pintaAdmin() {
    console.log('pintaAdmin');

    for (a = 1; a <= cuantosRecAsig; a++) {
        // switch (elPerfil) {
        // case "SuperAdmin":

        // if (that['usuarioId' + a] == null || that['usuarioId' + a] == undefined) {
        //     that['usuarioId' + a] = 'Sin Registro';
        // }
        // if (that['elRecursoId' + a] == null || that['elRecursoId' + a] == undefined) {
        //     that['elRecursoId' + a] = 'Sin Registro';
        // }
        // if (those['elRecursoNombre' + a] == null || those['elRecursoNombre' + a] == undefined) {
        //     those['elRecursoNombre' + a] = 'Sin Registro';
        // }
        // if (that['elRecursoCalificacion' + a] == null || that['elRecursoCalificacion' + a] == undefined) {
        //     that['elRecursoCalificacion' + a] = 'Sin Registro';
        // }
        // if (that['laClase' + a] == null || that['laClase' + a] == undefined) {
        //     that['laClase' + a] = 'Sin Registro';
        // }

        // dataSet[(a - 1)][3] = [
        //     those['elRecursoNombre' + a]
        // ];

        // dataSet[(a - 1)] = [
        //     '',
        //     '',
        //     '',
        //     '',
        //     there['elRecursoCalificacion' + a],
        //     there['elRecursoCalificacion' + a],
        //     ''
        // ];
        // break;
    };
    // console.log('dataSet ', dataSet);
    tablaReporte = $('#tablaReporte').DataTable({
        data: dataSet,
        dom: 'Bfrtip',
        buttons: [{
                extend: 'excelHtml5',
                title: "Reporte",
                text: 'Descargar Excel'
            },
            {
                extend: 'pdfHtml5',
                title: "Reporte",
                text: "Descargar PDF"
            }
        ],
        "language": {
            "url": "js/dataTable_spanish.json"
        },
        columns: [{
            title: 'Id de Empleado'
        }, {
            title: 'Nombre de Empleado'
        }, {
            title: 'Número de Curso'
        }, {
            title: 'Nombre de Curso'
        }, {
            title: 'Diagnóstico Calificación'
        }, {
            title: 'Contenido Calificación'
        }, {
            title: 'Clase'
        }],
        "initComplete": function(settings) {
            $('input[type=search]').val('-');
            // tablaReporte.buttons().container().appendTo($('.col-1:eq(0)', tablaReporte.table().container()));
            setTimeout(function() {
                $('input[type=search]').val('');
            }, 300);
        }
    });



    return $.ajax();
};



function activaBotonesAdmin() {
    console.log('activaBotonesAdmin');

    $("#botonDescargarReporte").click(function() {
        console.log("botonDescargarReporte");


        var table2excel = new Table2Excel();
        table2excel.export($('#tablaReporte'), 'Reporte');



        // setTimeout(function() {

        //     if (revisaConexion) {
        //         firebase.database().ref(laUrlBase + 'Usuarios').once('value').then(function(snapshot) {
        //             if (snapshot.val() != null) {

        //                 console.log('botonDescargarReporte en firebase');
        //                 // firebase.database().ref().child('Usuarios/' + cualUsuario).remove(onComplete); //usuario_
        //                 return;
        //             };
        //         });
        //     }

        // }, 300);
    });


    return $.ajax();
};