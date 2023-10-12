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
var arrayLecciones = [];
var arrayLeccionesAsig = [];
var nuevoArray = [];
var dataSet = [];

function activaSecAdmin() {
    console.log('activaSecAdmin');
    $('#subtituloSeccion').html('');

    // QUITAR para leer calificaciones
    // return LlenaLecciones();
    return leeRecNombres();
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
                    if (childSnapshot.key != 'imp0001' && childSnapshot.key != 'imp0002' && childSnapshot.key != 'imp0003' && childSnapshot.key != 'imp0004' && childSnapshot.key != 'imp0005' && childSnapshot.key != 'impdavid' && childSnapshot.key != 'demo' && childSnapshot.key != 'val') {
                        contadorKeys++;
                        this['leccionesTomadasKeys' + contadorKeys] = childSnapshot.key;
                        // console.log('leccionesTomadasKeys', contadorKeys, this['leccionesTomadasKeys' + contadorKeys]);
                    }

                    // this['objetosTomados' + contador] = childSnapshot.key;
                    // console.log('objetosTomados', contador, this['objetosTomados' + contador]);

                    childSnapshot.forEach(function(childSnapshot2) {

                        // QUITAR perfiles Admin
                        if (childSnapshot.key != 'imp0001' && childSnapshot.key != 'imp0002' && childSnapshot.key != 'imp0003' && childSnapshot.key != 'imp0004' && childSnapshot.key != 'imp0005' && childSnapshot.key != 'impdavid' && childSnapshot.key != 'demo' && childSnapshot.key != 'val') {
                            contador++;

                            if (childSnapshot2.key.split('d')[1] == 'x') {
                                this['elIdObjeto' + contador] = childSnapshot2.key.split('objeto_sco_')[1].split('dx')[0];
                            }
                            if (childSnapshot2.key.split('oc')[1] == '') {
                                this['elIdObjeto' + contador] = childSnapshot2.key.split('objeto_sco_')[1].split('oc')[0];
                            }
                            // console.log('elIdObjeto', this['elIdObjeto' + contador]);

                            this['elNombreObjeto' + contador] = childSnapshot2.key;
                            // console.log('elNombreObjeto', this['elNombreObjeto' + contador]);

                            // console.log('leeLecciones', contador, childSnapshot.key, childSnapshot2.key, those['usuarioId' + contador], those['usuarioPerfilInt' + contador]);




                            if (childSnapshot2.key.split('d')[1] == 'x') {
                                contadorLecciones_dx++;

                                this['elRecursoCalificacion_dx' + contadorLecciones_dx] = childSnapshot2.child('SCORM_12').child('cmi_core_score_raw').val();

                                this['elRecursoEstatus_dx' + contadorLecciones_dx] = childSnapshot2.child('SCORM_12').child('cmi_core_lesson_status').val();

                                // console.log('elRecursoCalificacion_dx', contadorKeys, this['leccionesTomadasKeys' + contadorKeys], contadorLecciones_dx, this['elNombreObjeto' + contador], this['elRecursoCalificacion_dx' + contadorLecciones_dx], this['elRecursoEstatus_dx' + contadorLecciones_dx]);


                                arrayLecciones[(contadorLecciones_dx - 1)] = ({
                                    'usuarioId': this['leccionesTomadasKeys' + contadorKeys],
                                    'usuarioNombre': '',
                                    'objetoId': parseInt(this['elIdObjeto' + contador]),
                                    'objetoNombre': '',
                                    'califDX': this['elRecursoCalificacion_dx' + contadorLecciones_dx],
                                    'estatusDX': this['elRecursoEstatus_dx' + contadorLecciones_dx],
                                    'califOC': '',
                                    'estatusOC': '',
                                    'clase': ''
                                });

                            }
                            if (childSnapshot2.key.split('oc')[1] == '') {
                                contadorLecciones_oc++;

                                this['elRecursoCalificacion_oc' + contadorLecciones_oc] = childSnapshot2.child('SCORM_12').child('cmi_core_score_raw').val();

                                this['elRecursoEstatus_oc' + contadorLecciones_oc] = childSnapshot2.child('SCORM_12').child('cmi_core_lesson_status').val();

                                // console.log('elRecursoCalificacion_oc', contadorKeys, this['leccionesTomadasKeys' + contadorKeys], contadorLecciones_oc, this['elNombreObjeto' + contador], this['elRecursoCalificacion_oc' + contadorLecciones_oc], this['elRecursoEstatus_oc' + contadorLecciones_oc]);


                                arrayLecciones[(contadorLecciones_oc - 1)].califOC = this['elRecursoCalificacion_oc' + contadorLecciones_oc];
                                arrayLecciones[(contadorLecciones_oc - 1)].estatusOC = this['elRecursoEstatus_oc' + contadorLecciones_oc];

                            }

                        }
                    });
                }
            });

            // console.log('arrayLecciones', arrayLecciones);

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
                // var contadorClases = 0;
                var contadorRecAsig = 0;
                var contadorUsuarios = 0;
                var contadorPerfiles = 0;
                arrayLeccionesAsig = [];
                nuevoArray = [];

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

                                    // if (childSnapshot3.key == "Clase") {
                                    //     contadorClases++;
                                    //     this['laClase' + contadorClases] = childSnapshot2.child('Clase').val();
                                    //      console.log('laClase', contadorClases, this['laClase' + contadorClases]);
                                    // }

                                    // if (childSnapshot3.key != 'Clase') {
                                    contadorRecAsig++;

                                    this['elRecursoKey' + contadorRecAsig] = childSnapshot3.key;
                                    // console.log('elRecursoKey', contadorRecAsig, this['elRecursoKey' + contadorRecAsig]);

                                    this['laClase' + contadorRecAsig] = childSnapshot3.child('Clase').val();
                                    // console.log('laClase', contadorRecAsig, this['laClase' + contadorRecAsig]);

                                    this['elRecursoId' + contadorRecAsig] = childSnapshot3.child('Id').val();

                                    // console.log('la Asignación', contadorRecAsig, 'Usuario Id', this['usuarioId' + contadorUsuarios], 'Usuario Nombre', this['usuarioNombre' + contadorUsuarios], 'el Recurso Id', this['elRecursoId' + contadorRecAsig], 'la Clase', this['laClase' + contadorRecAsig]);


                                    arrayLeccionesAsig.push({
                                        'usuarioId': this['usuarioId' + contadorUsuarios],
                                        'usuarioNombre': this['usuarioNombre' + contadorUsuarios],
                                        'objetoId': this['elRecursoId' + contadorRecAsig],
                                        'objetoNombre': those['elRecursoNombre' + this['elRecursoId' + contadorRecAsig]],
                                        'califDX': 'Sin registro',
                                        'estatusDX': 'Sin registro',
                                        'califOC': 'Sin registro',
                                        'estatusOC': 'Sin registro',
                                        'clase': this['laClase' + contadorRecAsig]
                                    });

                                });

                            });

                        }
                    }
                });

                console.log('arrayLecciones', arrayLecciones);
                console.log('arrayLeccionesAsig', arrayLeccionesAsig);

                that = this;
                cuantosUsuarios = contadorUsuarios;
                cuantosRecAsig = contadorRecAsig;


                // busca, compara y crea un nuevo array completo
                function busca() {
                    console.log('buscando');

                    var conta1 = 0;
                    var conta2 = 0;
                    var elEstatusDXEsp;
                    var elEstatusOCEsp;

                    arrayLeccionesAsig.forEach(x => {
                        var repetido = false;

                        switch (arrayLecciones[conta1].estatusDX) {
                            case 'passed':
                                elEstatusDXEsp = 'Aprobado';
                                break;
                            case 'failed':
                                elEstatusDXEsp = 'No aprobado';
                                break;
                            case 'incomplete':
                                elEstatusDXEsp = 'Incompleto';
                                break;
                            case 'completed':
                                elEstatusDXEsp = 'Completo';
                                break;
                            default:
                                elEstatusDXEsp = 'No iniciado';
                                break;
                        }
                        switch (arrayLecciones[conta2].estatusOC) {
                            case 'passed':
                                elEstatusOCEsp = 'Aprobado';
                                break;
                            case 'failed':
                                elEstatusOCEsp = 'No aprobado';
                                break;
                            case 'incomplete':
                                elEstatusOCEsp = 'Incompleto';
                                break;
                            case 'completed':
                                elEstatusOCEsp = 'Completo';
                                break;
                            default:
                                elEstatusOCEsp = 'No iniciado';
                                break;
                        }

                        arrayLecciones.forEach(y => {
                            if (x.usuarioId === y.usuarioId && x.objetoId === y.objetoId) {
                                repetido = true;
                                return;
                            }
                        });

                        if (repetido) {
                            nuevoArray.push({
                                'usuarioId': x.usuarioId,
                                'usuarioNombre': x.usuarioNombre,
                                'objetoId': x.objetoId,
                                'objetoNombre': x.objetoNombre,
                                'califDX': arrayLecciones[conta1].califDX,
                                'estatusDX': elEstatusDXEsp,
                                'califOC': arrayLecciones[conta2].califOC,
                                'estatusOC': elEstatusOCEsp,
                                'clase': x.clase
                            });
                            if (conta1 >= (arrayLecciones.length - 1)) {
                                conta1 = 0;
                            } else {
                                conta1++;
                            }
                            if (conta2 >= (arrayLecciones.length - 1)) {
                                conta2 = 0;
                            } else {
                                conta2++;
                            }
                        } else {
                            nuevoArray.push(x);

                        }
                    });

                    console.log('nuevoArray', nuevoArray);
                }
                busca();


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


    for (a = 0; a < nuevoArray.length; a++) {
        dataSet[a] = [
            nuevoArray[a].usuarioId,
            nuevoArray[a].usuarioNombre,
            nuevoArray[a].objetoId,
            nuevoArray[a].objetoNombre,
            nuevoArray[a].califDX,
            nuevoArray[a].estatusDX,
            nuevoArray[a].califOC,
            nuevoArray[a].estatusOC,
            nuevoArray[a].clase
        ];
    }


    // console.log('dataSet ', dataSet);
    tablaReporte = $('#tablaReporte').DataTable({
        data: dataSet,
        // dom: 'Blfrtip',
        dom: "Br<'row'<'col-sm-6'l><'col-sm-6 text-right'f>>" +
            "<'row'<'col-sm-12'tr>>" +
            "<'row'<'col-sm-5'i><'col-sm-7'p>>",
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
            title: 'Diagnóstico Estatus'
        }, {
            title: 'Contenido Calificación'
        }, {
            title: 'Contenido Estatus'
        }, {
            title: 'Etapa'
        }],
        "initComplete": function(settings) {
            $('input[type=search]').val('-');
            $('.dt-buttons').addClass('text-center');
            $('.dt-button').addClass('btn btn-round btn-verde2 ml-3 mr-3').fadeIn();
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

        // var table2excel = new Table2Excel();
        // table2excel.export($('#tablaReporte'), 'Reporte');

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