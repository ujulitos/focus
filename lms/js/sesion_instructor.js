var cuantosModulos = 0;
var cuantosRecursos = 0;
var cuantosUsuarios = 0;
var colorModulo = 0;
var elModulo;
var ordenRecursos;
var hayRecursos = false;
var that;

function activaSecSesionInstructor() {
    // console.log('activaSecSesionInstructor');
    $('.panel-header div h3').html('Sesiones');
    $('#subtituloSeccion').html('');

    return cuentaSesionInstructor();
}


function cuentaSesionInstructor() {
    // console.log('cuentaSesionInstructor', laSesionActual);

    sesionContadorBuscarRecursos = 0;

    if (revisaConexion) {
        firebase.database().ref(laUrlBase + 'Sesiones').orderByChild('Id').equalTo(laSesionActual).once('value').then(function(snapshot) {
            if (snapshot.val() != null) {
                console.log("snapshot.val()", snapshot.val());

                snapshot.forEach(function(childSnapshot) {
                    this.laSesion_Key = childSnapshot.key;
                    // console.log('laSesion_Key: ', laSesion_Key);
                    this.laSesion_Id = childSnapshot.val().Id;
                    // console.log('laSesion_Id: ', laSesion_Id);
                    this.laSesion_Activa = childSnapshot.val().Activa;
                    // console.log('laSesion_Activa: ', laSesion_Activa);

                    if (laSesion_Activa == true) {
                        this.laSesion_Nombre = childSnapshot.val().Nombre;
                        // console.log('laSesion_Nombre: ', laSesion_Nombre);
                        this.laSesion_FechaInicio = childSnapshot.val().Fecha_inicio;
                        // console.log('laSesion_FechaInicio: ', laSesion_FechaInicio);
                        this.laSesion_FechaFin = childSnapshot.val().Fecha_fin;
                        // console.log('laSesion_FechaFin: ', laSesion_FechaFin);
                        this.laSesion_Instructor = childSnapshot.val().Instructor;
                        // console.log('laSesion_Instructor: ', laSesion_Instructor);
                        this.laSesion_Pais = childSnapshot.val().Pais;
                        // console.log('laSesion_Pais: ', laSesion_Pais);
                        this.laSesion_Estado = childSnapshot.val().Estado;
                        // console.log('laSesion_Estado: ', laSesion_Estado);
                        this.laSesion_Localidad = childSnapshot.val().Localidad;
                        // console.log('laSesion_Localidad: ', laSesion_Localidad);
                        this.laSesion_Organizacion = childSnapshot.val().Organizacion;
                        // console.log('laSesion_Organizacion: ', laSesion_Organizacion);
                        this.laSesion_CentroTrabajo = childSnapshot.val().Centro_trabajo;
                        // console.log('laSesion_CentroTrabajo: ', laSesion_CentroTrabajo);
                        this.laSesion_Sala = childSnapshot.val().Sala;
                        // console.log('laSesion_Sala: ', laSesion_Sala);

                        // Leccion //
                        this.laSesion_LeccionId = childSnapshot.val().Leccion;
                        // console.log('📁 laSesion_LeccionId: ', laSesion_LeccionId);

                        that = this;
                        return sesionFuncionBuscaLeccionesInst(laSesion_LeccionId);

                    };

                });
            };
        });
    }
    // return $.ajax();
};




function sesionFuncionBuscaLeccionesInst(cualLeccion) {
    console.log("sesionFuncionBuscaLeccionesInst", cualLeccion);

    firebase.database().ref(laUrlBase + 'Lecciones').orderByChild('Id').equalTo(cualLeccion).once('value').then(function(snapshot) {
        if (snapshot.val() != null) {
            // console.log('snapshot.val()', snapshot.val());

            snapshot.forEach(function(childSnapshot) {

                this.laSesion_LeccionId = childSnapshot.val().Id;
                // console.log('laSesion_LeccionId', laSesion_LeccionId);
                this.laSesion_LeccionNombre = childSnapshot.val().Nombre;
                // console.log('laSesion_LeccionNombre', laSesion_LeccionNombre);
                this.laSesion_LeccionVisible = childSnapshot.val().Visible;
                // console.log('laSesion_LeccionVisible', laSesion_LeccionVisible);

                // Modulo ↓
                this.contadorModulos = 0;
                this.laSesion_Leccion_NumModulos = childSnapshot.child('Modulos').numChildren();
                // console.log('laSesion_Leccion_NumModulos', laSesion_Leccion_NumModulos);
                cuantosModulos = this.laSesion_Leccion_NumModulos;
                console.log('cuantosModulos', cuantosModulos);

                childSnapshot.child('Modulos').forEach(function(childSnapshotModulos) {
                    contadorModulos++;
                    //Nodo
                    this['laSesion_Leccion' + '_Modulo' + contadorModulos] = childSnapshotModulos.key;
                    // console.log('📮 laSesion_Leccion' + '_Modulo' + contadorModulos + ': ', this['laSesion_Leccion' + '_Modulo' + contadorModulos]);

                    // Nombre Orden 
                    this['laSesion_Leccion' + '_Modulo' + contadorModulos + '_Orden'] = childSnapshotModulos.val().Orden;
                    // console.log('_Orden', this['laSesion_Leccion' + '_Modulo' + contadorModulos + '_Orden']);
                    // Reordenar Módulos
                    ordenModulos = this['laSesion_Leccion' + '_Modulo' + contadorModulos + '_Orden'];
                    contadorModulos = ordenModulos;
                    // // console.log('contadorModulos', contadorModulos);
                    this['laSesion_Leccion' + '_Modulo' + contadorModulos + '_Orden'] = ordenModulos;
                    // // console.log('_Orden', this['leccion' + contadorLecciones + '_Modulo' + contadorModulos + '_Orden']);

                    // Nombre Modulo
                    this['laSesion_Leccion' + '_Modulo' + contadorModulos + '_Nombre'] = childSnapshotModulos.val().Nombre;
                    // console.log('laSesion_Leccion' + '_Modulo' + contadorModulos + '_Nombre: ', this['laSesion_Leccion' + '_Modulo' + contadorModulos + '_Nombre']);

                    var contadorRecursosLeccion = 0;
                    childSnapshotModulos.child('Recursos').forEach(function(childSnapshotRecursos) {
                        contadorRecursosLeccion++;

                        // // Recurso Orden
                        this['laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Orden'] = childSnapshotRecursos.val().Orden;
                        // console.log('laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Orden', this['laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Orden']);

                        // Reordenar Recursos
                        ordenRecursos = this['laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Orden'];
                        contadorRecursosLeccion = ordenRecursos;
                        // console.log('contadorRecursosLeccion', contadorRecursosLeccion);
                        this['laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Orden'] = ordenRecursos;
                        // console.log('laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Orden', this['laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Orden']);

                        // this['laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_cuantosRecursos'] = this['laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Orden'];
                        // // console.log('laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_cuantosRecursos', this['laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_cuantosRecursos']);

                        // cuantos Recursos //
                        this['laSesion_Leccion' + '_Modulo' + contadorModulos + '_cuantosRecursos'] = childSnapshotModulos.child('Recursos').numChildren();
                        // console.log('laSesion_Leccion' + '_Modulo' + contadorModulos + '_cuantosRecursos', this['laSesion_Leccion' + '_Modulo' + contadorModulos + '_cuantosRecursos']);



                        //Nodo
                        this['laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion] = childSnapshotRecursos.key;
                        // console.log('📁 laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion, this['laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion]);
                        // Id Recurso
                        this['laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Id'] = childSnapshotRecursos.val().recurso_Id;
                        // console.log('laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Id', this['laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Id']);
                        // Tipo Recurso
                        this['laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Tipo'] = childSnapshotRecursos.val().Tipo;
                        // console.log('laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Tipo', this['laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Tipo']);
                        // Promediable Recurso
                        this['laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Promediable'] = childSnapshotRecursos.val().Promediable;
                        // console.log('laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Promediable', this['laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Promediable']);

                        // Insignias ↓
                        this['laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Insignia'] = childSnapshotRecursos.val().insignia;
                        // console.log('laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Insignia', this['laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Insignia']);

                        if (this['laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Insignia'] != "no") {
                            // console.log("🥇 Insignia ↓");
                            //Nombre
                            this['laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_InsigniaNombre'] = childSnapshotRecursos.child('insignia').val().nombre;
                            // console.log('laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_InsigniaNombre: ', this['laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_InsigniaNombre']);
                            //Tipo
                            this['laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_InsigniaTipo'] = childSnapshotRecursos.child('insignia').val().tipo;
                            // console.log('laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_InsigniaTipo: ', this['laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_InsigniaTipo']);
                            //Valor
                            this['laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_InsigniaPuntos'] = childSnapshotRecursos.child('insignia').val().puntos;
                            // console.log('laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_InsigniaPuntos: ', this['laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_InsigniaPuntos']);
                            //Ruta
                            this['laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_InsigniaRuta'] = childSnapshotRecursos.child('insignia').val().imagen;
                            // console.log('laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_InsigniaRuta: ', this['laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_InsigniaRuta']);
                            //Otorgada
                            this['laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_InsigniaOtorgada'] = childSnapshotRecursos.child('insignia').val().otorgada;
                            // console.log('laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_InsigniaOtorgada: ', this['laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_InsigniaOtorgada']);
                            //Obligatoria
                            this['laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_InsigniaObligatoria'] = childSnapshotRecursos.child('insignia').val().obligatoria;
                            // console.log('laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_InsigniaObligatoria: ', this['laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_InsigniaObligatoria']);
                            //Tiempo
                            this['laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_InsigniaTiempo'] = childSnapshotRecursos.child('insignia').val().tiempo_minimo;
                            // console.log('laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_InsigniaTiempo: ', this['laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_InsigniaTiempo']);
                            that = this;
                        } else {
                            // console.log("🥇 NO Insignia");
                        };
                        // Insignias ↑

                        that = this;
                        hayRecursos = true;

                        return sesionFuncionBuscaRecursosInst(contadorModulos, contadorRecursosLeccion, this['laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Id']);
                    });
                    // Recursos //

                    if (contadorRecursosLeccion > 0) {
                        console.log("SI recursos", contadorRecursosLeccion);
                    } else {
                        console.log("NO recursos", contadorRecursosLeccion);
                        return pintaErrorSesion();
                    }

                });
                // Modulos ↑
            });
        };
    });
    // Lección //
};


function pintaErrorSesion() {
    console.log('pintaErrorSesion');

    event.preventDefault();
    firebase.database().ref().off();
    localStorage.removeItem('scc_int');
    navega("inicio");

    setTimeout(function() {
        $('.mensaje_error_sesion').html('La sesión no está configurada correctamente.<br>Por favor revisa con tu Instructor.');
    }, 500);
    return false;
};


function sesionFuncionBuscaRecursosInst(contadorModulos, contadorRecursosLeccion, idRecurso) {
    console.log("sesionFuncionBuscaRecursosInst", contadorModulos, contadorRecursosLeccion, idRecurso);

    firebase.database().ref(laUrlBase + 'Recursos').orderByChild('Id').equalTo(idRecurso).once('value').then(function(snapshot) {
        if (snapshot.val() != null) {
            snapshot.forEach(function(childSnapshot) {
                sesionContadorBuscarRecursos++;

                this['laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Nombre'] = childSnapshot.val().Nombre;
                // console.log('laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Nombre', this['laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Nombre']);

                this['laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_NombreCorto'] = childSnapshot.val().Nombre_corto;
                // console.log('laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_NombreCorto', this['laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_NombreCorto']);

                this['laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Categoria'] = childSnapshot.val().Categoria;
                // console.log('laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Categoria', this['laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Categoria']);

                this['laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Descripcion'] = childSnapshot.val().Descripcion;
                // console.log('laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Descripcion', this['laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Descripcion']);

                this['laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Visible'] = childSnapshot.val().Visible;
                // console.log('laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Visible', this['laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Visible']);

                this['laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Duracion'] = childSnapshot.val().Duracion;
                // console.log('laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Duracion', this['laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Duracion']);

                this['laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Liga'] = childSnapshot.val().Liga;
                // console.log('laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Liga', this['laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Liga']);

                this['laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Portada'] = childSnapshot.val().Portada;
                // console.log('laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Portada', this['laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Portada']);

                // Pregunta //
                if (this['laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Categoria'] == 'Pregunta') {
                    this['laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Pregunta'] = childSnapshot.val().Pregunta;
                    console.log('laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Pregunta', this['laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Pregunta']);
                    this['laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Respuesta1'] = childSnapshot.val().Respuesta1;
                    console.log('laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Respuesta1', this['laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Respuesta1']);
                    this['laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Respuesta2'] = childSnapshot.val().Respuesta2;
                    console.log('laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Respuesta2', this['laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Respuesta2']);
                    this['laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Respuesta3'] = childSnapshot.val().Respuesta3;
                    console.log('laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Respuesta3', this['laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Respuesta3']);
                    this['laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Correcta'] = childSnapshot.val().Correcta;
                    console.log('laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Correcta', this['laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Correcta']);
                    this['laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_RetroBien'] = childSnapshot.val().RetroBien;
                    console.log('laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_RetroBien', this['laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_RetroBien']);
                    this['laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_RetroMal'] = childSnapshot.val().RetroMal;
                    console.log('laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_RetroMal', this['laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_RetroMal']);
                }

                // Competencias //
                var contadorCompetencias = 0;
                this['laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_NumCompetencias'] = childSnapshot.child('Competencias').numChildren();
                // console.log('laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_NumCompetencias', this['laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_NumCompetencias']);

                that = this;

                childSnapshot.child('Competencias').forEach(function(childSnapshotCompetencias) {
                    contadorCompetencias++;

                    // this['laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Competencia' + contadorCompetencias] = childSnapshotCompetencias.val();
                    // // console.log('laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Competencia' + contadorCompetencias, this['laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Competencia' + contadorCompetencias]);

                    this['laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Competencia' + contadorCompetencias + '_Nombre'] = childSnapshotCompetencias.val().Nombre;
                    // console.log('laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Competencia' + contadorCompetencias + '_Nombre', this['laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Competencia' + contadorCompetencias + '_Nombre']);

                    this['laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Competencia' + contadorCompetencias + '_Nivel'] = childSnapshotCompetencias.val().Nivel;
                    // console.log('laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Competencia' + contadorCompetencias + '_Nivel', this['laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Competencia' + contadorCompetencias + '_Nivel']);

                    this['laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Competencia' + contadorCompetencias + '_Descripcion'] = childSnapshotCompetencias.val().Descripcion;
                    // console.log('laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Competencia' + contadorCompetencias + '_Descripcion', this['laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Competencia' + contadorCompetencias + '_Descripcion']);

                    that = this;
                });

            });

            cuantosRecursos = contadorRecursosLeccion;
            // console.log("✅ cuantosRecursos", cuantosRecursos);

            return sesionFuncionBuscaRegistroUsuariosInst();
        };
    });
};



function sesionFuncionBuscaRegistroUsuariosInst() {
    console.log("sesionFuncionBuscaUsuarios", laSesion_Id);

    var contadorRegistroUsuarios = 0;

    firebase.database().ref(laUrlBase + 'Sesiones').orderByChild('Id').equalTo(laSesion_Id).once('value').then(function(snapshot) {
        if (snapshot.val() != null) {
            console.log('snapshot.val()', snapshot.val());

            snapshot.forEach(function(childSnapshot) {

                childSnapshot.child('Registro').forEach(function(childRegistroUsuarios) {
                    if (childRegistroUsuarios.val() != null) {
                        // console.log('childRegistroUsuarios.val()', childRegistroUsuarios.val());
                        contadorRegistroUsuarios++;

                        this['usuario' + contadorRegistroUsuarios + '_NumRecursos'] = childRegistroUsuarios.child('Recursos').numChildren();
                        // console.log('usuario' + contadorRegistroUsuarios + '_NumRecursos: ', this['usuario' + contadorRegistroUsuarios + '_NumRecursos']);

                        this['sesion' + laSesion_Id + '_Usuario' + contadorRegistroUsuarios] = childRegistroUsuarios.key;
                        // console.log('usuario' + contadorRegistroUsuarios + '_Id', this['sesion' + laSesion_Id + '_Usuario' + contadorRegistroUsuarios]);

                        // this['usuario' + contadorRegistroUsuarios + '_PuntosTotales'] = 0;


                        var contadorRegistroUsuariosModulos = 0;

                        childRegistroUsuarios.child('Modulos').forEach(function(childRegistroModulos) {
                            if (childRegistroModulos.val() != null) {
                                // console.log('childRegistroModulos.val()', childRegistroModulos.val());
                                contadorRegistroUsuariosModulos++;

                                this['sesion' + laSesion_Id + '_Usuario' + contadorRegistroUsuarios + '_Modulo' + contadorRegistroUsuariosModulos] = childRegistroModulos.key;
                                // console.log('_Modulo', contadorRegistroUsuariosModulos, this['sesion' + laSesion_Id + '_Usuario' + contadorRegistroUsuarios + '_Modulo' + contadorRegistroUsuariosModulos]);


                                var contadorRegistroUsuariosRecursos = 0;

                                childRegistroModulos.child('Recursos').forEach(function(childRegistroRecursos) {
                                    if (childRegistroRecursos.val() != null) {
                                        // console.log('childRegistroRecursos.val()', childRegistroRecursos.val());
                                        contadorRegistroUsuariosRecursos++;


                                        this['sesion' + laSesion_Id + '_Usuario' + contadorRegistroUsuarios + '_Recurso' + contadorRegistroUsuariosRecursos + '_Id'] = childRegistroRecursos.key;
                                        // console.log('_Recurso', contadorRegistroUsuariosRecursos, this['sesion' + laSesion_Id + '_Usuario' + contadorRegistroUsuarios + '_Recurso' + contadorRegistroUsuariosRecursos + '_Id']);

                                        // this['sesion' + laSesion_Id + '_Usuario' + contadorRegistroUsuarios + '_Recurso' + contadorRegistroUsuariosRecursos + '_Puntos'] = childRegistroRecursos.val().Puntos;
                                        // // console.log('usuario' + contadorRegistroUsuarios + '_Recurso' + contadorRegistroUsuariosRecursos + '_Puntos', this['sesion' + laSesion_Id + '_Usuario' + contadorRegistroUsuarios + '_Recurso' + contadorRegistroUsuariosRecursos + '_Puntos']);

                                        // //  suma de puntos totales
                                        // this['sesion' + laSesion_Id + '_Usuario' + contadorRegistroUsuarios + '_Recurso' + contadorRegistroUsuariosRecursos + '_PuntosInt'] = parseInt(childRegistroRecursos.val().Puntos);

                                        // this['usuario' + contadorRegistroUsuarios + '_PuntosTotales'] += this['sesion' + laSesion_Id + '_Usuario' + contadorRegistroUsuarios + '_Recurso' + contadorRegistroUsuariosRecursos + '_PuntosInt'];
                                        // // console.log('usuario' + contadorRegistroUsuarios + '_PuntosTotales', this['usuario' + contadorRegistroUsuarios + '_PuntosTotales']);


                                        that = this;
                                        return buscaUsuarioNombreInst(contadorRegistroUsuarios, this['sesion' + laSesion_Id + '_Usuario' + contadorRegistroUsuarios]);

                                    }
                                });

                            }
                        });

                    }
                });


                cuantosUsuarios = contadorRegistroUsuarios;
                console.log('cuantosUsuarios', cuantosUsuarios);
                return pintaSesionInstructor();

            });
        }
    });

}




function buscaUsuarioNombreInst(numUsuario, cualUsuario) {
    console.log("buscaUsuarioNombre", numUsuario, ' y ', cualUsuario);

    firebase.database().ref(laUrlBase + 'Usuarios').orderByChild('Id').equalTo(cualUsuario).once('value').then(function(snapshot) {
        if (snapshot.val() != null) {
            // console.log('snapshot.val()', snapshot.val());

            snapshot.forEach(function(childRUsuariosNombre) {

                this['usuario' + numUsuario + '_Id'] = childRUsuariosNombre.key;
                // console.log('usuario' + numUsuario + '_Id', this['usuario' + numUsuario + '_Id']);

                this['usuario' + numUsuario + '_Nombre'] = childRUsuariosNombre.val().Nombre;
                // console.log('usuario' + numUsuario + '_Nombre', this['usuario' + numUsuario + '_Nombre']);
                this['usuario' + numUsuario + '_ApPaterno'] = childRUsuariosNombre.val().Apellido_Paterno;
                // console.log('usuario' + numUsuario + '_ApPaterno', this['usuario' + numUsuario + '_ApPaterno']);
                this['usuario' + numUsuario + '_ApMaterno'] = childRUsuariosNombre.val().Apellido_Materno;
                // console.log('usuario' + numUsuario + '_ApMaterno', this['usuario' + numUsuario + '_ApMaterno']);

                that = this;

                // console.log(a, childRUsuariosNombre.val().Nombre + ' ' + childRUsuariosNombre.val().Apellido_Paterno);
                $('#nombreUsuario' + numUsuario).text(this['usuario' + numUsuario + '_Nombre'] + ' ' + this['usuario' + numUsuario + '_ApPaterno']);

                return;

            });
        }
    });

}




function pintaSesionInstructor() {
    // console.log('🔵 pintaSesionInstructor');

    colorModulo = 0;
    var colorMod;
    var contenidoTableroSesion = '';
    $('.sesion_instructor_int').empty();


    contenidoTableroSesion += '<div class="row panel_sesion">';
    contenidoTableroSesion += '<div class="col-12">';
    contenidoTableroSesion += '<div class="sesion_header">';
    contenidoTableroSesion += '<div class="columna_titulo">';
    contenidoTableroSesion += '<div class="columna_usuarios">TABLERO DE AVANCE</div>';
    contenidoTableroSesion += '</div>';

    //  modulos //
    for (a = 1; a <= cuantosModulos; a++) {

        colorModulo++;
        if (colorModulo % 4 == 1) {
            colorModulo = 1;
        }

        switch (colorModulo) {
            case 1:
                colorMod = "linear-gradient(to bottom, rgba(45, 110, 221, 0.671) 0%, rgba(61, 196, 228, 0.8) 100%)";
                break;
            case 2:
                colorMod = "linear-gradient(to bottom, rgba(79, 152, 62, 0.702) 0%, rgba(187, 214, 59, 0.8) 100%)";
                break;
            case 3:
                colorMod = "linear-gradient(to bottom, rgba(79, 54, 155, 0.671) 0%, rgba(184, 102, 204, 0.651) 100%)";
                break;
            case 4:
                colorMod = "linear-gradient(to bottom, rgba(64, 172, 159, 0.82) 0%, rgba(100, 196, 182, 0.82) 100%)";
                break;
        }

        contenidoTableroSesion += '<div id="colModulo' + a + '" style="background: ' + colorMod + ';">';
        contenidoTableroSesion += '<div class="columna_modulo">Módulo ' + a + '<br><b>' + that['laSesion_Leccion' + '_Modulo' + a + '_Nombre'] + '</b><br><br>';
        contenidoTableroSesion += '</div>';

        contenidoTableroSesion += '<div class="columna_modulo_recurso">';

        // recursos por módulo //
        for (b = 1; b <= that['laSesion_Leccion' + '_Modulo' + a + '_cuantosRecursos']; b++) {
            contenidoTableroSesion += '<div style="height: 100px;">' + that['laSesion_Leccion' + '_Modulo' + a + '_Recurso' + b + '_Nombre'] + '</div>';

            contenidoTableroSesion += '<div style="margin-top: 40px; margin-left: -150px;">';
            contenidoTableroSesion += '<div id="botonLanzarRecurso' + a + '_' + b + '" class="btn btn-round boton_blanco botonLanzarRecurso" data-toggle="modal" data-target="#modalVerContenidoInst" style="margin-right: 20px;">Ver</div>';
            contenidoTableroSesion += '</div>';
        }
        //  recursos por módulo //
        contenidoTableroSesion += '</div>';
        contenidoTableroSesion += '</div>';
    }
    contenidoTableroSesion += '</div>';
    //  modulos //

    // usuarios //
    contenidoTableroSesion += '<div id="panel_usuarios">';
    contenidoTableroSesion += '</div>';
    // usuarios //

    contenidoTableroSesion += '</div>';
    contenidoTableroSesion += '</div>';
    contenidoTableroSesion += '</div>';



    $('.sesion_instructor_int').append(contenidoTableroSesion);

    return activaBotonesSesionInstructor();

};


function activaBotonesSesionInstructor() {
    // console.log('activaBotonesSesionInstructor');

    $('.main-panel').addClass('main-panel_100');
    $('.panel-header, .sidebar, .navbar-toggler').hide();
    $('.navbar').css({
        'background-position': '0px 0px'
    });
    $("#panel_instructor").show();

    var sesionClavePrev = laSesion_Id.substr(7);
    var sesionClave1 = sesionClavePrev.substr(0, 6);
    var sesionClave2 = sesionClavePrev.substr(6, 6);
    var sesionClave3 = sesionClavePrev.substr(12);
    $("#header_instructor_titulo").html('Sesión <span class="clave_sesion" style="color: #fff;">' + sesionClave1 + '&nbsp;&nbsp;&nbsp;' + sesionClave2 + '&nbsp;&nbsp;&nbsp;' + sesionClave3 + '</span>');

    // $("#header_instructor_titulo").html('Sesión ' + that['laSesion_Nombre']);
    $("#header_instructor_subtitulo").html('<b>' + that['laSesion_Leccion' + '_NumModulos'] + '</b> módulos en total. Por favor ingresa a cada uno.');


    $("#botonAtrasInstructor").click(function(event) {
        event.preventDefault();
        firebase.database().ref().off();
        localStorage.removeItem('scc_int');

        $('.main-panel').removeClass('main-panel_100');
        $('.panel-header, .sidebar, .navbar-toggler').show();
        $('.navbar').css({
            'background-position': '260px 0px'
        });
        $("#panel_instructor").hide();

        navega("inicio");
    });


    activaBotonesSesionInstructor2();

    // cargador('oculta');

    return $.ajax();

}



function activaBotonesSesionInstructor2() {
    console.log('🔵 activaBotonesSesionInstructor2');

    if (revisaConexion) {
        var elRefSesionInstructor = laUrlBase + 'Sesiones/' + laSesionActual + '/Registro';
        // console.log('elRefSesionInstructor', elRefSesionInstructor);

        firebase.database().ref(elRefSesionInstructor).on('value', function(snapshot) {
            if (snapshot.val() != null) {
                // console.log("snapshot.val()", snapshot.val());


                colorModulo = 0;
                var contenidoTableroSesionUsuarios = '';
                $('#panel_usuarios').empty();

                // usuarios //
                for (a = 1; a <= cuantosUsuarios; a++) {

                    contenidoTableroSesionUsuarios += '<div id="rowParticipante' + a + '" class="sesion_header">';
                    contenidoTableroSesionUsuarios += '<div class="m0_color">';

                    contenidoTableroSesionUsuarios += '<div class="col user"><img src="usuarios/' + that['sesion' + laSesion_Id + '_Usuario' + a] + '/profile_foto.jpg"></img></div>';
                    contenidoTableroSesionUsuarios += '<div class="progress-container col_container">';
                    contenidoTableroSesionUsuarios += '<span id="nombreUsuario' + a + '"class="progress-badge bold_nombre">' + that['usuario' + a + '_Nombre'] + ' ' + that['usuario' + a + '_ApPaterno'] + '</span>';
                    // contenidoTableroSesionUsuarios += '<div class="progress">';
                    // contenidoTableroSesionUsuarios += '<div class="progress-bar progresbar_color" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 25%;">';
                    // contenidoTableroSesionUsuarios += '<span class="progress-value" style="line-height: 1.3;">25%</span>';
                    // contenidoTableroSesionUsuarios += '</div>';
                    // contenidoTableroSesionUsuarios += '</div>';
                    contenidoTableroSesionUsuarios += '<div class="bold_puntos1">puntos <span id="totalPuntos' + a + '" class="bold_puntos puntuacion">0</span></div>';
                    contenidoTableroSesionUsuarios += '</div>';
                    contenidoTableroSesionUsuarios += '</div>';

                    colorModulo = 0;
                    var cont = 0;

                    for (b = 1; b <= cuantosModulos; b++) {

                        colorModulo++;
                        if (colorModulo % 4 == 1) {
                            colorModulo = 1;
                        }

                        var colorSolidoMod;
                        switch (colorModulo) {
                            case 1:
                                colorSolidoMod = "#eaf2fc";
                                break;
                            case 2:
                                colorSolidoMod = "#f1f6eb";
                                break;
                            case 3:
                                colorSolidoMod = "#f1ecf7";
                                break;
                            case 4:
                                colorSolidoMod = "#edf8f6";
                                break;
                        }

                        // recursos por módulo //
                        for (c = 1; c <= that['laSesion_Leccion' + '_Modulo' + b + '_cuantosRecursos']; c++) {
                            cont++;

                            contenidoTableroSesionUsuarios += '<div class="" style="background: ' + colorSolidoMod + '; display: flex; min-width: 160px; max-width: 160px;">';

                            if (that['laSesion_Leccion' + '_Modulo' + b + '_Recurso' + c + '_InsigniaRuta'] != undefined) {
                                contenidoTableroSesionUsuarios += '<div id="participante' + a + '_Modulo' + b + '_Recurso' + c + '_insignia" class="columna insignia participante' + a + '_insignia' + cont + ' grayscale" style="margin-left: 10px; margin-right: auto;"><img src="' + that['laSesion_Leccion' + '_Modulo' + b + '_Recurso' + c + '_InsigniaRuta'] + '" style="width: 40px;"></img></div>';
                            } else {
                                contenidoTableroSesionUsuarios += '<div id="participante' + a + '_Modulo' + b + '_Recurso' + c + '_insignia" class="columna insignia participante' + a + '_insignia' + cont + '" style="margin-left: 10px; margin-right: auto;"></div>';
                            }

                            contenidoTableroSesionUsuarios += '<div id="participante' + a + '_Modulo' + b + '_Recurso' + c + '_icono_estado" class="columna icono_estado participante' + a + '_icono_estado' + cont + '"><i class="nc-icon-outline media-1_button-record" style="color: #cacaca !important; font-size: 30px; margin-left: auto; margin-right: auto;"></i></div>';

                            contenidoTableroSesionUsuarios += '<div id="participante' + a + '_Modulo' + b + '_Recurso' + c + '_puntuacion" class="columna puntuacion participante' + a + '_puntuacion' + cont + '" style="margin-left: auto; margin-right: 10px;">0</div>';

                            contenidoTableroSesionUsuarios += '</div>';

                        }
                        //  recursos por módulo //

                    }
                    contenidoTableroSesionUsuarios += '</div>';

                }
                // usuarios //

                $('#panel_usuarios').append(contenidoTableroSesionUsuarios);


                elModulo = cuantosModulos;
                activaBotonesSesionInstructor3();


                return;

            };
        });
    };

    cargador('oculta');

    // for (b = 0; b <= 50; b++) {
    $(".botonLanzarRecurso").click(function(event) {
        event.preventDefault();
        var _Pos = $(this).attr('id').indexOf('_');
        var cualModulo = $(this).attr('id').substr(18, $(this).attr('id').length - (_Pos + 1));
        var cualRecurso = $(this).attr('id').substr((_Pos + 1), $(this).attr('id').length);

        // console.log('botonLanzarRecurso', cualModulo, ' y ', cualRecurso);
        ////////////////
        lanzaContenidoInstVisualizar(cualModulo, cualRecurso);
        ////////////////
    });
    // };


    return $.ajax();
}




function activaBotonesSesionInstructor3() {
    // console.log('activaBotonesSesionInstructor3');

    // that['usuario' + contadorRegistroUsuarios + '_Id'], cuantosModulos, that['sesion' + laSesion_Id + '_Usuario' + contadorRegistroUsuarios + '_Recurso' + contadorRegistroUsuariosRecursos + '_Id'], contadorRegistroUsuariosRecursos, contadorRegistroUsuarios

    if (revisaConexion) {
        var elRefSesionInst3 = laUrlBase + 'Sesiones/' + laSesionActual + '/Registro/';
        // console.log('elRefSesionInst3', elRefSesionInst3);

        firebase.database().ref(elRefSesionInst3).on('value', function(snapshot) {
            if (snapshot.val() != null) {
                // // console.log("activaBotonesSesionInstructor3.val() ", snapshot.val());

                this.contadorUsuarios = 0;
                var laSesion_Leccion_NumUsuarios = snapshot.numChildren();
                // console.log('laSesion_Leccion_NumUsuarios', laSesion_Leccion_NumUsuarios);

                snapshot.forEach(function(childSnapshot) {
                    if (childSnapshot.val() != null) {
                        // // console.log("childSnapshot.val()", childSnapshot.val());
                        contadorUsuarios++;
                        this.contadorModulos = 0;
                        var laSesion_Leccion_NumModulos2 = childSnapshot.child('Modulos').numChildren();
                        // console.log('laSesion_Leccion_NumModulos2', laSesion_Leccion_NumModulos2);
                        cuantosModulos = laSesion_Leccion_NumModulos2;

                        this['usuario' + contadorUsuarios + '_PuntosTotales'] = 0;

                        childSnapshot.child('Modulos').forEach(function(childSnapshotModulos) {
                            if (childSnapshotModulos.val() != null) {
                                // console.log("childSnapshotModulos.val()", childSnapshotModulos.val());

                                contadorModulos++;
                                this.contadorRecursosLeccion2 = 0;

                                // Módulos Id
                                this['laSesion_Leccion_Modulo' + contadorModulos + '_Id'] = childSnapshotModulos.key;
                                // console.log('laSesion_Leccion_Modulo' + contadorModulos + '_Id', this['laSesion_Leccion_Modulo' + contadorModulos + '_Id']);

                                // Recursos //
                                this['laSesion_Leccion' + '_Modulo' + contadorModulos + '_NumRecursos'] = childSnapshotModulos.child('Recursos').numChildren();
                                // console.log('laSesion_Leccion' + '_Modulo' + contadorModulos + '_NumRecursos', this['laSesion_Leccion' + '_Modulo' + contadorModulos + '_NumRecursos']);

                                // childSnapshotModulos.forEach(function(childSnapshotModulos2) {


                                childSnapshotModulos.child('Recursos').forEach(function(childSnapshotRecursos2) {
                                    if (childSnapshotRecursos2.val() != null) {
                                        // console.log("childSnapshotRecursos2.val()", childSnapshotRecursos2.val());

                                        childSnapshotRecursos2.forEach(function(childSnapshotRecursos3) {
                                            if (childSnapshotRecursos3.val() != null) {
                                                // console.log("childSnapshotRecursos3.val()", childSnapshotRecursos3.val());
                                                contadorRecursosLeccion2++;

                                                // Recurso Id
                                                this['usuario' + contadorUsuarios + 'laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion2 + '_Id'] = childSnapshotRecursos3.key;
                                                // console.log('usuario' + contadorUsuarios + 'laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion2 + '_Id', this['usuario' + contadorUsuarios + 'laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion2 + '_Id']);
                                                // Recurso Insignia
                                                this['usuario' + contadorUsuarios + 'laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion2 + '_InsigniaOtorgada'] = childSnapshotRecursos3.val().Insignia;
                                                // console.log('usuario' + contadorUsuarios + 'laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion2 + '_InsigniaOtorgada', this['usuario' + contadorUsuarios + 'laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion2 + '_InsigniaOtorgada']);
                                                // Recurso Estatus
                                                this['usuario' + contadorUsuarios + 'laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion2 + '_Estatus'] = childSnapshotRecursos3.val().Estatus;
                                                // console.log('usuario' + contadorUsuarios + 'laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion2 + '_Estatus', this['usuario' + contadorUsuarios + 'laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion2 + '_Estatus']);

                                                // Recurso Puntos
                                                this['usuario' + contadorUsuarios + '_laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion2 + '_Puntos'] = childSnapshotRecursos3.val().Puntos;
                                                // console.log('usuario' + contadorUsuarios + '_laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion2 + '_Puntos', this['usuario' + contadorUsuarios + '_laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion2 + '_Puntos']);
                                                //  suma de puntos totales
                                                this['usuario' + contadorUsuarios + '_laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion2 + '_PuntosInt'] = parseInt(childSnapshotRecursos3.val().Puntos);
                                                // console.log('parseInt usuario' + contadorUsuarios + '_laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion2 + '_PuntosInt', this['usuario' + contadorUsuarios + '_laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion2 + '_PuntosInt']);

                                                this['usuario' + contadorUsuarios + '_PuntosTotales'] += this['usuario' + contadorUsuarios + '_laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion2 + '_PuntosInt'];
                                                // console.log('usuario' + contadorUsuarios + '_PuntosTotales', this['usuario' + contadorUsuarios + '_PuntosTotales']);

                                                that = this;

                                                return llenaDatosInst();

                                            }
                                        });

                                    }
                                });

                                // });
                            }
                        });
                    }

                });

            };
        });


    };


}


function llenaDatosInst() {
    // console.log('llenaDatosInst');



    for (a = 1; a <= cuantosUsuarios; a++) {

        // console.log(a, that['usuario' + a + '_Nombre'] + ' ' + that['usuario' + a + '_ApPaterno']);
        // $('#nombreUsuario' + a).html(that['usuario' + a + '_Nombre'] + ' ' + that['usuario' + a + '_ApPaterno']);

        for (b = 1; b <= cuantosModulos; b++) {

            for (c = 1; c <= that['laSesion_Leccion' + '_Modulo' + b + '_cuantosRecursos']; c++) {

                if (that['usuario' + a + 'laSesion_Leccion' + '_Modulo' + b + '_Recurso' + c + '_InsigniaOtorgada'] == true) {
                    $('#participante' + a + '_Modulo' + b + '_Recurso' + c + '_insignia').removeClass('grayscale').css({
                        'opacity': '1'
                    });
                } else {
                    $('#participante' + a + '_Modulo' + b + '_Recurso' + c + '_insignia').addClass('grayscale').css({
                        'opacity': '.3'
                    });
                }
                if (that['usuario' + a + 'laSesion_Leccion' + '_Modulo' + b + '_Recurso' + c + '_Estatus'] == 'revisado') {
                    $('#participante' + a + '_Modulo' + b + '_Recurso' + c + '_icono_estado' + ' i').removeClass('media-1_button-record').addClass('ui-1_check-circle-07').css({
                        'color': '#fe866b'
                    });
                } else {
                    $('#participante' + a + '_Modulo' + b + '_Recurso' + c + '_icono_estado' + ' i').removeClass('ui-1_check-circle-07').addClass('media-1_button-record').css({
                        'color': '#cacaca'
                    });
                }
                $('#participante' + a + '_Modulo' + b + '_Recurso' + c + '_puntuacion').text(that['usuario' + a + '_laSesion_Leccion' + '_Modulo' + b + '_Recurso' + c + '_Puntos']);
            }
        }

        $('#totalPuntos' + a).text(that['usuario' + a + '_PuntosTotales']);
    }

}




function lanzaContenidoInstVisualizar(cualModulo, cualRecurso) {

    cualModulo = parseInt(cualModulo);
    cualRecurso = parseInt(cualRecurso);
    cuantosRecursosDelModulo = that['laSesion_Leccion' + '_Modulo' + cualModulo + '_cuantosRecursos'];
    console.log('lanzaContenidoInstVisualizar', cualModulo, ' y ', cualRecurso, ' y ', cuantosRecursosDelModulo);

    // console.log('CursoId', that['CursoId' + cualRecurso]);

    // for (b = 1; b <= cuantosModulos; b++) {
    // for (c = 1; c <= that['laSesion_Leccion' + '_Modulo' + b + '_cuantosRecursos']; c++) {
    var laLiga = that['laSesion_Leccion' + '_Modulo' + cualModulo + '_Recurso' + cualRecurso + '_Liga'];
    var elNombre = that['laSesion_Leccion' + '_Modulo' + cualModulo + '_Recurso' + cualRecurso + '_Nombre'];
    // }
    // }
    // console.log('laLiga', laLiga);
    // var laLiga = "http://ideas4learning.com/revision/BIMBO/lms/recursos/recurso_190218132331mXIS/index.html";
    // // console.log('laLiga', laLiga);

    var Categoria = that['laSesion_Leccion' + '_Modulo' + cualModulo + '_Recurso' + cualRecurso + '_Categoria'];
    console.log('Categoria', Categoria);

    // habilitaBoton($('#botonCerrar'), false);

    // $('.main-panel').addClass('main-panel_100');
    // $('.panel-header, .sidebar, .navbar-toggler').hide();
    // $("#panel_instructor").hide();

    // $('#barra_player').show();
    $("#modalVerContenidoInst_body").empty();

    var elContenido = '';
    elContenidoLanzado = true;
    // i4L API //
    // registraIniciado();


    switch (Categoria) {


        case 'Pregunta':

            elContenido += '<div class="modal-body ver_pregunta_body">';
            elContenido += '<div id="sNombrePregunta" class="pregunta_desc">' + that['laSesion_Leccion' + '_Modulo' + cualModulo + '_Recurso' + cualRecurso + '_Nombre'] + '</div>';
            elContenido += '<br> <br> <br>';
            elContenido += '<div id="sPregunta" class="pregunta_preg">' + that['laSesion_Leccion' + '_Modulo' + cualModulo + '_Recurso' + cualRecurso + '_Pregunta'] + '</div>';
            elContenido += '<br> <br>';

            for (a = 1; a <= cuantasRespuestas; a++) {
                elContenido += '<div id="sRespuesta' + a + '" class="pregunta_respsSesion">' + that['laSesion_Leccion' + '_Modulo' + cualModulo + '_Recurso' + cualRecurso + '_Respuesta' + a] + '</div>';
                elContenido += '      <div id="paloma' + a + '" class="paloma"> &#x2714; </div>';
                elContenido += '      <div id="tache' + a + '" class="tache"> &#x2716; </div>';
                elContenido += '<br>';
            }

            elContenido += '<br> <br>';
            elContenido += '<button id="botonResponderPregunta" type="submit" class="btn btn-info btn-round">Enviar</button>';

            elContenido += '<div id="sRetroalimentacion">';
            elContenido += '<div class="titulo_retro">Retroalimentación:</div>';
            elContenido += '<div id="sRetroBien" class="pregunta_retro_bien">' + that['laSesion_Leccion' + '_Modulo' + cualModulo + '_Recurso' + cualRecurso + '_RetroBien'] + '</div>';
            elContenido += '<div id="sRetroMal" class="pregunta_retro_mal">' + that['laSesion_Leccion' + '_Modulo' + cualModulo + '_Recurso' + cualRecurso + '_RetroMal'] + '</div>';
            elContenido += '</div>';
            elContenido += '</div>';

            $('#modalVerContenidoInst_body').append(elContenido);

            activaPreguntaInt(cualModulo, cualRecurso);

            break;



        case 'Empaquetado':

            $("#modalVerContenidoInst_body").html('<iframe name="curso" id="curso" src="' + laLiga + '" frameborder="0" scrolling="yes" border="0" style="display: block; height: 100vh; width: 100vw; width:100%; height:100%;"></iframe>');

            break;



        case 'Audio':

            setTimeout(function() {
                elContenido += '<div name="curso" id="curso" style="width:100%; height:100%; background-color: #000000;">';
                elContenido += '<audio id="elAudio" style="display: flex; width:50%; height:50%; margin-left: auto; margin-right: auto;" autobuffer controls autoplay controlsList="nodownload">';
                elContenido += '<source src="' + laLiga + '" type="audio/mpeg" />';
                elContenido += '</audio>';
                elContenido += '</div>';

                $("#modalVerContenidoInst_body").html(elContenido);
            }, 500);

            break;



        case 'Imagen':

            $("#modalVerContenidoInst_body").html('<iframe name="curso" id="curso" src="' + laLiga + '" frameborder="0" scrolling="yes" border="0" style="display: block; height: 100vh; width: 100vw; width:100%; height:100%;"></iframe>');

            break;



        case 'PDF':

            elContenido += '<div name="curso" id="curso" style="width:100%; height:100%;">';
            elContenido += '<embed src="' + laLiga + '" width="100%" height="100%"></embed>';
            // elContenido += '<object src="' + laLiga + '" width="100%" height="100%"></object>';
            elContenido += '</div>';

            $("#modalVerContenidoInst_body").html(elContenido);

            break;



        case 'Video':

            // $("#modalVerObjeto_body").html('<iframe name="curso" id="curso" src="' + laLiga + '" frameborder="0" scrolling="yes" border="0" style="display: block; height: 100vh; width: 100vw; width:100%; height:100%;"></iframe>');

            elContenido += '<div name="curso" id="curso" style="background-color: #000000;">';
            elContenido += '<video id="elVideo" style="width:100%; height:100%;" autobuffer controls autoplay controlsList="nodownload">';
            elContenido += '<source src="' + laLiga + '" type="video/mp4" />';
            elContenido += '</video>';
            elContenido += '</div>';

            setTimeout(function() {
                $("#modalVerContenidoInst_body").html(elContenido);
                ajustaEscalaContenidoInst();
            }, 500);

            break;



        case 'Word':

            $("#modalVerContenidoInst_body").html('<iframe name="curso" id="curso" src="https://docs.google.com/gview?url=' + laLiga + '&embedded=true" frameborder="0" scrolling="yes" border="0" style="display: block; height: 100vh; width: 100vw; width:100%; height:100%;"></iframe>');

            // elContenido += '<div name="curso" id="curso" style="width:100%; height:100%;">';
            // elContenido += '<img  id="laImagen" src="' + laLiga + '">';
            // elContenido += '</div>';

            break;



        case 'PowerPoint':

            $("#modalVerContenidoInst_body").html('<iframe name="curso" id="curso" src="https://docs.google.com/gview?url=' + laLiga + '&embedded=true" frameborder="0" scrolling="yes" border="0" style="display: block; height: 100vh; width: 100vw; width:100%; height:100%;"></iframe>');

            // elContenido += '<div name="curso" id="curso" style="width:100%; height:100%;">';
            // elContenido += '<img  id="laImagen" src="' + laLiga + '">';
            // elContenido += '</div>';

            break;



        default:
            break;


    }



    $("#objetoTitulo").text(elNombre);

    $('#botonRecursoAtras, #botonRecursoAdelante').show();
    if (cualRecurso <= 1) {
        $('#botonRecursoAtras').hide();
    }
    if (cualRecurso >= cuantosRecursosDelModulo) {
        $('#botonRecursoAdelante').hide();
    }


    ajustaEscalaContenidoInst();
    setTimeout(function() {
        detectaUnloadInst();
    }, 300);


    $(document).off('click', '#botonRecursoAtras').on('click', '#botonRecursoAtras', function(e) {
        cualRecurso--;
        lanzaContenidoInstVisualizar(cualModulo, cualRecurso);
    });

    $(document).off('click', '#botonRecursoAdelante').on('click', '#botonRecursoAdelante', function(e) {
        cualRecurso++
        lanzaContenidoInstVisualizar(cualModulo, cualRecurso);
    });

    // $(document).off('click', '#botonCerrarModalVerContenidoInst').on('click', '#botonCerrarModalVerContenidoInst', function(e) {
    //     $("#modalVerContenidoInst_body").empty();
    // });


}


function activaPreguntaInt(cualModulo, cualRecurso) {
    console.log('activaPregunta', cualModulo, ' y ', cualRecurso);

    var respuestaElegida;
    var respuestaCorrecta = parseInt(that['laSesion_Leccion' + '_Modulo' + cualModulo + '_Recurso' + cualRecurso + '_Correcta']);
    console.log('respuestaCorrecta', respuestaCorrecta);

    $('#sRetroalimentacion, #sRetroBien, #sRetroMal').hide();
    $('#botonResponderPregunta').attr('disabled', 'true').addClass('grayscale').show();

    for (a = 1; a <= cuantasRespuestas; a++) {

        $('#sRespuesta' + a).click(function() {
            respuestaElegida = parseInt($(this).attr('id').substr(10, 2));
            console.log('respuestaElegida', respuestaElegida, ' y respuestaCorrecta', respuestaCorrecta);

            $('#botonResponderPregunta').removeAttr('disabled').removeClass('grayscale');
        });
    }

    $(document).off('click', '#botonResponderPregunta').on('click', '#botonResponderPregunta', function(e) {
        $(this).hide();

        evaluaInt(respuestaElegida, respuestaCorrecta);
    });

    $('.pregunta_respsSesion').click(function() {
        $('.pregunta_respsSesion').removeClass('respuestaDeshabilitada').addClass('respuestaHabilitada');
        $('#sRespuesta' + respuestaElegida).removeClass('respuestaHabilitada').addClass('respuestaDeshabilitada');
    });
}

function evaluaInt(cualRespuesta, cualCorrecta) {
    console.log('evalua', cualRespuesta, ' y ', cualCorrecta);

    $('.pregunta_respsSesion').css({
        'pointer-events': 'none'
    });

    if (cualRespuesta == cualCorrecta) {
        $('#sRespuesta' + cualRespuesta).css({
            'background-color': '#98d6a2',
            'border-color': '#4f983e'
        });
        $('#paloma' + cualRespuesta).show();

        ////////////////////////
        aciertos++;
        puntosObtenidos = true;
        ////////////////////////
        $('#sRetroBien').show();

    } else {
        $('#sRespuesta' + cualRespuesta).css({
            'background-color': '#f59898',
            'border-color': '#f96332'
        });
        $('#tache' + cualRespuesta).show();

        $('#sRetroMal').show();

    }
    console.log('aciertos', aciertos);
    $('#sRetroalimentacion').show();

}



function cierraContenidoInst() {

    // registraRevisado();
    elContenidoLanzado = false;

    // habilitaBoton($('#botonCerrar'), true);
    // $("#content").empty();
    // $('#barra_player').hide();
    // $('.main-panel').addClass('main-panel_100');
    // $('.panel-header, .sidebar, .navbar-toggler').hide();
    // $("#panel_instructor").show();

    ajustaEscalaContenidoInst();

    // navega('sesion_instructor');

}



function detectaUnloadInst() {

    if (elContenidoLanzado == true) {

        $('#modalVerContenidoInst').on('hide.bs.modal', function() {
            $("#modalVerContenidoInst_body").empty();
        });

        $("#modalVerContenidoInst_body").bind('DOMNodeRemoved', function(event) {
            // console.log('unload!');

            // registraRevisado();
            elContenidoLanzado = false;
            // habilitaBoton($('#botonCerrar'), true);
            // $('#barra_player').hide();
            // $('.panel-header').show();
            // ajustaEscalaContenidoInst();
            // $("#content").unbind();            
        });
    }

}


function ajustaEscalaContenidoInst() {

    elAncho = $(window).width();
    elAlto = $(window).height();
    // console.log('elAncho', elAncho, 'y elAlto', elAlto);

    if (elContenidoLanzado == true) {
        $(".modal-content").css({
            'height': (elAlto - 50) + 'px',
            'width': (elAncho - 50) + 'px'
        });
        $(".modal-dialog").css({
            'margin-left': '30px'
        });
        $("#botonRecursoAtras").css({
            'margin-left': (elAncho - 270) + 'px'
        });
        $("#botonRecursoAdelante").css({
            'margin-left': (elAncho - 200) + 'px'
        });

        $("#elVideo").css({
            'height': (elAlto - 145) + 'px',
            'width': (elAncho - 80) + 'px'
        });
    }

}

$(window).resize(function() {

    if (elContenidoLanzado == true) {
        ajustaEscalaContenidoInst();
    }

});
