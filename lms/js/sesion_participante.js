var sesionContadorBuscarRecursos;
var sesionContadorRecursosTotal;
var elModulo;
var elRecurso;
var hayRecursos = false;
var contadorRecursos;
var ordenModulos;
var ordenRecursos;
var puntosAObtener;
var cuantasRespuestas = 3;
var aciertos = 0;
var puntosObtenidos = false;

function activaSecSesionParticipante() {
    console.log('activaSecSesionParticipante');
    $('.panel-header div h3').html('Sesiones');
    $('#subtituloSeccion').html('');

    return cuentaSesionParticipante();
}

function cuentaSesionParticipante() {
    console.log('cuentaSesionParticipante', laSesionActual);
    sesionContadorBuscarRecursos = 0;
    sesionContadorRecursosTotal = 0;

    if (revisaConexion) {
        firebase.database().ref(laUrlBase + 'Sesiones').orderByChild('Id').equalTo(laSesionActual).once('value').then(function(snapshot) {
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
                        // this.laSesion_Nombre = childSnapshot.val().Nombre;
                        // console.log('laSesion_Nombre: ', laSesion_Nombre);
                        // this.laSesion_FechaInicio = childSnapshot.val().Fecha_inicio;
                        // console.log('laSesion_FechaInicio: ', laSesion_FechaInicio);
                        // this.laSesion_FechaFin = childSnapshot.val().Fecha_fin;
                        // console.log('laSesion_FechaFin: ', laSesion_FechaFin);
                        // this.laSesion_Zona = childSnapshot.val().Zona;
                        // console.log('laSesion_Zona: ', laSesion_Zona);
                        // this.laSesion_Sede = childSnapshot.val().Sede;
                        // console.log('laSesion_Sede: ', laSesion_Sede);

                        // Leccion //
                        this.laSesion_LeccionId = childSnapshot.val().Leccion;
                        console.log('📁 laSesion_LeccionId: ', laSesion_LeccionId);

                        that = this;
                        return sesionFuncionBuscaLecciones(laSesion_LeccionId);

                    };

                });
            };
        });
    };
};



function sesionFuncionBuscaLecciones(cualLeccion) {
    console.log("sesionFuncionBuscaLecciones");
    console.log("cualLeccion", cualLeccion);

    firebase.database().ref(laUrlBase + 'Lecciones').orderByChild('Id').equalTo(cualLeccion).once('value').then(function(snapshot) {
        if (snapshot.val() != null) {
            console.log('snapshot.val()', snapshot.val());

            snapshot.forEach(function(childSnapshot) {

                this.laSesion_LeccionId = childSnapshot.val().Id;
                console.log('laSesion_LeccionId', laSesion_LeccionId);
                this.laSesion_LeccionNombre = childSnapshot.val().Nombre;
                console.log('laSesion_LeccionNombre', laSesion_LeccionNombre);
                this.laSesion_LeccionVisible = childSnapshot.val().Visible;
                console.log('laSesion_LeccionVisible', laSesion_LeccionVisible);

                // Modulo ↓
                this.contadorModulos = 0;
                this.laSesion_Leccion_NumModulos = childSnapshot.child('Modulos').numChildren();
                console.log('laSesion_Leccion_NumModulos', laSesion_Leccion_NumModulos);

                childSnapshot.child('Modulos').forEach(function(childSnapshotModulos) {
                    contadorModulos++;
                    //Nodo
                    this['laSesion_Leccion' + '_Modulo' + contadorModulos + '_Id'] = childSnapshotModulos.key;
                    console.log('📮 laSesion_Leccion' + '_Modulo' + contadorModulos + '_Id: ', this['laSesion_Leccion' + '_Modulo' + contadorModulos + '_Id']);

                    // Nombre Orden 
                    this['laSesion_Leccion' + '_Modulo' + contadorModulos + '_Orden'] = childSnapshotModulos.val().Orden;
                    console.log('_Orden', this['laSesion_Leccion' + '_Modulo' + contadorModulos + '_Orden']);
                    // Reordenar Módulos
                    ordenModulos = this['laSesion_Leccion' + '_Modulo' + contadorModulos + '_Orden'];
                    contadorModulos = ordenModulos;
                    // console.log('contadorModulos', contadorModulos);
                    this['laSesion_Leccion' + '_Modulo' + contadorModulos + '_Orden'] = ordenModulos;
                    // console.log('_Orden', this['leccion' + contadorLecciones + '_Modulo' + contadorModulos + '_Orden']);

                    // Nombre Modulo
                    this['laSesion_Leccion' + '_Modulo' + contadorModulos + '_Nombre'] = childSnapshotModulos.val().Nombre;
                    console.log('laSesion_Leccion' + '_Modulo' + contadorModulos + '_Nombre: ', this['laSesion_Leccion' + '_Modulo' + contadorModulos + '_Nombre']);

                    var contadorRecursosLeccion = 0;
                    childSnapshotModulos.child('Recursos').forEach(function(childSnapshotRecursos) {

                        contadorRecursosLeccion++;
                        sesionContadorRecursosTotal++;

                        // Recursos //
                        this['laSesion_Leccion' + '_Modulo' + contadorModulos + '_cuantosRecursos'] = childSnapshotModulos.child('Recursos').numChildren();
                        console.log('laSesion_Leccion' + '_Modulo' + contadorModulos + '_cuantosRecursos', this['laSesion_Leccion' + '_Modulo' + contadorModulos + '_cuantosRecursos']);

                        // // Recurso Orden
                        this['laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Orden'] = childSnapshotRecursos.val().Orden;
                        console.log('laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Orden', this['laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Orden']);

                        // Reordenar Recursos
                        ordenRecursos = this['laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Orden'];
                        contadorRecursosLeccion = ordenRecursos;
                        console.log('contadorRecursosLeccion', contadorRecursosLeccion);
                        this['laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Orden'] = ordenRecursos;
                        console.log('laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Orden', this['laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Orden']);

                        //Nodo
                        this['laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion] = childSnapshotRecursos.key;
                        console.log('📁 laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion, this['laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion]);
                        // Id Recurso
                        this['laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Id'] = childSnapshotRecursos.val().recurso_Id;
                        console.log('laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Id', this['laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Id']);
                        // Promediable
                        this['laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Promediable'] = childSnapshotRecursos.val().Promediable;
                        console.log('laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Promediable', this['laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Promediable']);
                        // Promediable Porciento
                        this['laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Promediable_porciento'] = childSnapshotRecursos.val().Promediable_porciento;
                        console.log('laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Promediable_porciento', this['laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Promediable_porciento']);
                        // Puntos a obtener
                        this['laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Puntos'] = childSnapshotRecursos.val().Puntos;
                        console.log('laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Puntos', this['laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Puntos']);
                        // Visible al Participante
                        this['laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Tipo_participante'] = childSnapshotRecursos.val().Tipo_participante;
                        console.log('laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Tipo_participante', this['laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Tipo_participante']);

                        // Insignias ↓
                        this['laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Insignia'] = childSnapshotRecursos.val().insignia;
                        console.log('laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Insignia', this['laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Insignia']);

                        if (this['laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Insignia'] != "no") {
                            console.log("🥇 Insignia ↓");
                            //Nombre
                            this['laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_InsigniaNombre'] = childSnapshotRecursos.child('insignia').val().nombre;
                            console.log('laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_InsigniaNombre: ', this['laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_InsigniaNombre']);
                            //Valor
                            this['laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_InsigniaPuntos'] = childSnapshotRecursos.child('insignia').val().puntos;
                            console.log('laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_InsigniaPuntos: ', this['laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_InsigniaPuntos']);
                            //Ruta
                            this['laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_InsigniaRuta'] = childSnapshotRecursos.child('insignia').val().imagen;
                            console.log('laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_InsigniaRuta: ', this['laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_InsigniaRuta']);
                            //Calificación mínima
                            this['laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_CalifMinima'] = childSnapshotRecursos.child('insignia').val().calif_minima;
                            console.log('laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_CalifMinima: ', this['laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_CalifMinima']);
                            //Tiempo mínimo
                            this['laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_InsigniaTiempo'] = childSnapshotRecursos.child('insignia').val().tiempo_minimo;
                            console.log('laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_InsigniaTiempo: ', this['laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_InsigniaTiempo']);
                            //Otorgada
                            this['laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_InsigniaOtorgada'] = childSnapshotRecursos.child('insignia').val().otorgada;
                            console.log('laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_InsigniaOtorgada: ', this['laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_InsigniaOtorgada']);

                            that = this;
                        } else {
                            console.log("🥇 NO Insignia");
                        };
                        // Insignias ↑

                        that = this;
                        hayRecursos = true;

                        return sesionFuncionBuscaRecursos(contadorModulos, contadorRecursosLeccion, this['laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Id']);

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



function sesionFuncionBuscaRecursos(contadorModulos, contadorRecursosLeccion, idRecurso) {
    console.log("sesionFuncionBuscaRecursos");
    console.log("🈚-idRecurso", idRecurso);

    firebase.database().ref(laUrlBase + 'Recursos').orderByChild('Id').equalTo(idRecurso).once('value').then(function(snapshot) {
        if (snapshot.val() != null) {
            snapshot.forEach(function(childSnapshot) {
                sesionContadorBuscarRecursos++;

                this['laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Nombre'] = childSnapshot.val().Nombre;
                console.log('laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Nombre', this['laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Nombre']);

                this['laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Categoria'] = childSnapshot.val().Categoria;
                console.log('laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Categoria', this['laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Categoria']);

                this['laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Descripcion'] = childSnapshot.val().Descripcion;
                console.log('laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Descripcion', this['laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Descripcion']);

                this['laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Visible'] = childSnapshot.val().Visible;
                console.log('laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Visible', this['laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Visible']);

                this['laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Duracion'] = childSnapshot.val().Duracion;
                console.log('laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Duracion', this['laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Duracion']);

                this['laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Liga'] = childSnapshot.val().Liga;
                console.log('laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Liga', this['laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Liga']);

                this['laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Portada'] = childSnapshot.val().Portada;
                console.log('laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Portada', this['laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Portada']);

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
                console.log('laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_NumCompetencias', this['laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_NumCompetencias']);

                childSnapshot.child('Competencias').forEach(function(childSnapshotCompetencias) {
                    contadorCompetencias++;

                    // this['laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Competencia' + contadorCompetencias] = childSnapshotCompetencias.val();
                    // console.log('laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Competencia' + contadorCompetencias, this['laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Competencia' + contadorCompetencias]);

                    this['laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Competencia' + contadorCompetencias + '_Nombre'] = childSnapshotCompetencias.val().Nombre;
                    console.log('laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Competencia' + contadorCompetencias + '_Nombre', this['laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Competencia' + contadorCompetencias + '_Nombre']);

                    this['laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Competencia' + contadorCompetencias + '_Nivel'] = childSnapshotCompetencias.val().Nivel;
                    console.log('laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Competencia' + contadorCompetencias + '_Nivel', this['laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Competencia' + contadorCompetencias + '_Nivel']);

                    this['laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Competencia' + contadorCompetencias + '_Descripcion'] = childSnapshotCompetencias.val().Descripcion;
                    console.log('laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Competencia' + contadorCompetencias + '_Descripcion', this['laSesion_Leccion' + '_Modulo' + contadorModulos + '_Recurso' + contadorRecursosLeccion + '_Competencia' + contadorCompetencias + '_Descripcion']);

                    that = this;
                    // Competencias //

                });

                that = this;
            });

            if (sesionContadorBuscarRecursos == sesionContadorRecursosTotal) {
                console.log("✅", sesionContadorRecursosTotal);

                return pintaSesionParticipante1().then(function() {
                    activaBotonesSesionParticipante().then(function() {
                        cargador('oculta');
                    });
                });

            } else {
                console.log("🔴", sesionContadorBuscarRecursos, sesionContadorRecursosTotal);
            }

        };
    });
};




function pintaSesionParticipante1() {
    console.log('🔵 pintaSesionParticipante1');

    var anchoColumnas = 6;
    if (that.laSesion_Leccion_NumModulos >= 3) {
        anchoColumnas = 4;
    }
    var colorModulo = 0;

    var contenidoSecSesion = '';
    $('.sesion_participante1_int').empty();



    contenidoSecSesion += '<div class="row">';
    contenidoSecSesion += '<div class="col-md-10 ml-auto mr-auto">';
    contenidoSecSesion += '<div class="row">';


    for (b = 1; b <= that['laSesion_Leccion' + '_NumModulos']; b++) {

        colorModulo++;
        if (colorModulo % 4 == 1) {
            colorModulo = 1;
        }

        var colorMod;
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

        contenidoSecSesion += '<div class="col-md-' + anchoColumnas + '">';
        contenidoSecSesion += '<div id="modulo' + b + '" class="card" style="background: ' + colorMod + ';">';

        contenidoSecSesion += '<div class="card-body">';
        contenidoSecSesion += '<div id="modulo_titulo" class="modulo_titulo">Módulo ' + b + '</div>';
        contenidoSecSesion += '<div class="card_datos">';
        contenidoSecSesion += '<h6 class="card_modulo_titulo">' + that['laSesion_Leccion' + '_Modulo' + b + '_Nombre'] + '</h6>';
        contenidoSecSesion += '<div class="card_modulo_subtitulo">' + that['laSesion_Leccion' + '_Modulo' + b + '_cuantosRecursos'] + ' Recursos</div>';
        contenidoSecSesion += '</div>';

        contenidoSecSesion += '<div class="card-botones">';
        contenidoSecSesion += '<div id="botonEntrarModulo' + b + '" class="btn btn-round btn-neutral botonEntrarModulo">Ingresar</div>';
        contenidoSecSesion += '</div>';

        contenidoSecSesion += '</div>';
        contenidoSecSesion += '</div>';
        contenidoSecSesion += '</div>';

    }

    contenidoSecSesion += '</div>';
    contenidoSecSesion += '</div>';
    contenidoSecSesion += '</div>';


    $('.sesion_participante1_int').append(contenidoSecSesion);
    // $('.titulo_seccion').html('Módulos');
    $('.sesion_participante1_int').show().animate({
        'margin-left': '0%'
    });

    activaBotonesSesionParticipante();

    return $.ajax();
};


function pintaSesionParticipante2(cualModulo) {
    console.log('🔵 pintaSesionParticipante2 con el módulo', cualModulo);

    // $('.sesion_participante1_int').animate({
    //     'margin-left': '-200%'
    // });

    var colorModulo = 0;
    for (a = 1; a <= cualModulo; a++) {
        colorModulo++;
        if (colorModulo % 4 == 1) {
            colorModulo = 1;
        }
    }

    var colorMod;
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

    elModulo = cualModulo;
    var cualRecurso;
    contadorRecursos = 0;

    var contenidoSecSesion = '';
    $('.sesion_participante2_int').empty();

    contenidoSecSesion += '<div class="row">';
    contenidoSecSesion += '<div class="col-md-10 ml-auto mr-auto">';
    contenidoSecSesion += '<div class="row panel_modulo" style=" background: ' + colorMod + ';">';
    // header //
    contenidoSecSesion += '<div class="col-md-12">';
    contenidoSecSesion += '<h3 class="boton_atras" id="botonAtrasModulo"><i class="nc-icon-outline arrows-1_circle-left-38"></i></h3>';
    contenidoSecSesion += '<div class="card-body card_modulo">';
    contenidoSecSesion += '<div class="modulo_titulo">Módulo ' + cualModulo + ': ' + that['laSesion_Leccion' + '_Modulo' + cualModulo + '_Nombre'] + '</div>';
    // contenidoSecSesion += '<h6 class="sesion_titulo">Sesión ' + that.laSesion_Nombre + '</h6>';
    // contenidoSecSesion += '<div class="zona_titulo">' + that.laSesion_Zona + '</div>';
    contenidoSecSesion += '</div>';
    // recursos general //
    contenidoSecSesion += '<div class="row fondo_recursos">';
    // recursos indiv //
    for (a = 1; a <= that['laSesion_Leccion' + '_Modulo' + cualModulo + '_cuantosRecursos']; a++) {
        contadorRecursos++;

        this['cualRecurso' + contadorRecursos] = that['laSesion_Leccion' + '_Modulo' + cualModulo + '_Recurso' + contadorRecursos + '_Id'];
        console.log('cualRecurso', this['cualRecurso' + contadorRecursos]);
        that = this;

        contenidoSecSesion += '<div class="row fondo_recurso fondo_recurso' + a + '">';
        contenidoSecSesion += '<div class="col-md-1 columna"></div>';
        contenidoSecSesion += '<div class="col-md-1 columna elearning_01"> </div>';
        contenidoSecSesion += '<div class="col-md-4 columna" style="text-align:left;">' + a + '. <b>' + that['laSesion_Leccion' + '_Modulo' + cualModulo + '_Recurso' + a + '_Nombre'] + '.</b></div>';
        if (that['laSesion_Leccion' + '_Modulo' + cualModulo + '_Recurso' + a + '_InsigniaRuta'] != undefined) {
            contenidoSecSesion += '<div id="insignia' + a + '" class="col-md-1 columna insignia grayscale"><img src="' + that['laSesion_Leccion' + '_Modulo' + cualModulo + '_Recurso' + a + '_InsigniaRuta'] + '" style="width: 45px;"></img></div>';
        } else {
            contenidoSecSesion += '<div id="insignia' + a + '" class="col-md-1 columna insignia"></div>';
        }
        contenidoSecSesion += '<div id="icono_estado' + a + '" class="col-md-1 columna icono_estado"><i class="nc-icon-outline media-1_button-record" style="color: #cacaca !important; font-size: 30px;"></i></div>';
        contenidoSecSesion += '<div id="puntuacion' + a + '" class="col-md-1 columna puntuacion">0</div>';
        contenidoSecSesion += '<div class="col-md-1 columna">';
        if (candado) {
            contenidoSecSesion += '<div id="botonLanzarRecurso' + cualModulo + '_' + a + '" class="btn btn-round btn-lg boton_verde botonLanzarRecurso grayscale" disabled="disabled">Ver</div>';
            // contenidoSecSesion += '<div id="botonLanzarRecurso' + cualModulo + '_' + a + '" class="btn btn-round btn-lg boton_verde botonLanzarRecurso">Ver</div>';
        } else {
            contenidoSecSesion += '<div id="botonLanzarRecurso' + cualModulo + '_' + a + '" class="btn btn-round btn-lg boton_verde botonLanzarRecurso">Ver</div>';
        }
        contenidoSecSesion += '</div>';
        contenidoSecSesion += '</div>';

    }


    // recursos indiv //
    contenidoSecSesion += '</div>';
    // recursos general //
    contenidoSecSesion += '</div>';

    contenidoSecSesion += '</div>';
    contenidoSecSesion += '</div>';
    contenidoSecSesion += '</div>';
    // header //


    $('.sesion_participante2_int').append(contenidoSecSesion);
    // $('.titulo_seccion').html('Recursos');

    $('.sesion_participante2_int').show().animate({
        'margin-left': '0%'
    });

    activaBotonesSesionParticipante();

    for (a = 1; a <= contadorRecursos; a++) {
        activaBotonesSesionParticipante2(this['cualRecurso' + a], a);
    }


    return $.ajax();

};




function activaBotonesSesionParticipante() {
    console.log('activaBotonesSesionParticipante');


    for (a = 1; a <= that['laSesion_Leccion' + '_NumModulos']; a++) {

        $("#botonEntrarModulo" + a).click(function(event) {
            event.preventDefault();
            var cualModulo = $(this).attr('id').substr(17, $(this).attr('id').length);
            // console.log('cualModulo', cualModulo);
            $('.sesion_participante1_int').animate({
                'margin-left': '-200%'
            }, function() {
                $('.sesion_participante1_int').hide();
                pintaSesionParticipante2(cualModulo);
            });

        });

    }


    // for (b = 1; b <= that['laSesion_Leccion' + '_NumModulos']; b++) {
    $(".botonLanzarRecurso").click(function(event) {
        event.preventDefault();
        var _Pos = $(this).attr('id').indexOf('_');
        var cualModulo = $(this).attr('id').substr(18, $(this).attr('id').length - (_Pos + 1));
        var cualRecurso = $(this).attr('id').substr((_Pos + 1), $(this).attr('id').length);

        console.log('botonLanzarRecurso', cualModulo, ' y ', cualRecurso);
        ////////////////
        lanzaContenidoVisualizar(cualModulo, cualRecurso);
        ////////////////
    });
    // };


    $("#botonAtrasParticipante").click(function(event) {
        event.preventDefault();
        firebase.database().ref().off();
        localStorage.removeItem('scc_int');

        $('.main-panel').removeClass('main-panel_100');
        $('.panel-header, .sidebar, .navbar-toggler').show();
        $('.navbar').css({
            'background-position': '260px 0px'
        });
        $("#panel_participante").hide();

        navega("inicio");
    });


    $("#botonAtrasModulo").click(function(event) {
        event.preventDefault();
        firebase.database().ref().off();

        $('.sesion_participante1_int').css({
            'margin-left': '-200%'
        });
        $('.sesion_participante2_int').animate({
            'margin-left': '200%'
        }, function() {
            $('.sesion_participante2_int').hide();
            pintaSesionParticipante1();
        });

    });


    // if (elPerfil === "Participante") {
    $('.main-panel').addClass('main-panel_100');
    $('.panel-header, .sidebar, .navbar-toggler').hide();
    $('.navbar').css({
        'background-position': '0px 0px'
    });
    $('.breadcrumb').show();
    $("#panel_participante").show();

    // }

    var sesionClavePrev = laSesion_Id.substr(7);
    var sesionClave1 = sesionClavePrev.substr(0, 6);
    var sesionClave2 = sesionClavePrev.substr(6, 6);
    var sesionClave3 = sesionClavePrev.substr(12);
    $("#header_participante_titulo").html('Sesión <span class="clave_sesion" style="color: #fff;">' + sesionClave1 + '&nbsp;&nbsp;&nbsp;' + sesionClave2 + '&nbsp;&nbsp;&nbsp;' + sesionClave3 + '</span>');

    // $("#header_participante_titulo").html('Sesión ' + that['laSesion_Nombre']);
    $("#header_participante_subtitulo").html('<b>' + that['laSesion_Leccion' + '_NumModulos'] + '</b> módulos en total. Por favor ingresa a cada uno.');


    return $.ajax();
}


function activaBotonesSesionParticipante2(cualRecurso, num) {
    console.log('activaBotonesSesionParticipante2', cualRecurso);

    // va desbloqueando conforme se avanza
    if (candado) {
        $('#botonLanzarRecurso' + elModulo + '_' + 1).removeClass('grayscale').removeAttr('disabled', 'disabled');
    }


    if (revisaConexion) {
        var elRefSesionParticipante = laUrlBase + 'Sesiones/' + laSesionActual + '/Registro/' + usuarioId + '/Modulos/modulo_' + elModulo + '/Recursos/recurso_' + num + '/' + cualRecurso;
        console.log('elRefSesionParticipante', elRefSesionParticipante);

        firebase.database().ref(elRefSesionParticipante).on('value', function(snapshot) {
            if (snapshot.val() != null) {
                console.log("snapshot.val()", snapshot.val());

                var insigniaOtorgada = snapshot.val().Insignia;
                console.log('insigniaOtorgada', insigniaOtorgada);
                var elEstatus = snapshot.val().Estatus;
                console.log('elEstatus', elEstatus);
                var laPuntuacion = snapshot.val().Puntos;
                console.log('laPuntuacion', laPuntuacion);
                that = this;

                if (insigniaOtorgada == true) {
                    $('#insignia' + num).removeClass('grayscale').css({
                        'opacity': '1'
                    });
                } else {
                    $('#insignia' + num).addClass('grayscale').css({
                        'opacity': '.3'
                    });
                }
                if (elEstatus == 'revisado') {
                    $('#icono_estado' + num + ' i').removeClass('media-1_button-record').addClass('ui-1_check-circle-07').css({
                        'color': '#fe866b'
                    });
                    if (candado) {
                        $('#botonLanzarRecurso' + elModulo + '_' + (num + 1)).removeClass('grayscale').removeAttr('disabled', 'disabled');
                    }
                } else {
                    $('#icono_estado' + num + ' i').removeClass('ui-1_check-circle-07').addClass('media-1_button-record').css({
                        'color': '#cacaca'
                    });
                }
                $('#puntuacion' + num).text(laPuntuacion);

                return;

            };
        });

    };

}




function lanzaContenidoVisualizar(cualModulo, cualRecurso) {
    console.log('lanzaContenidoVisualizar', cualModulo, ' y ', cualRecurso);
    // console.log('CursoId', that['CursoId' + cualRecurso]);
    elRecurso = cualRecurso;
    // for (b = 1; b <= cuantosModulos; b++) {
    // for (c = 1; c <= that['laSesion_Leccion' + '_Modulo' + b + '_cuantosRecursos']; c++) {
    var laLiga = that['laSesion_Leccion' + '_Modulo' + cualModulo + '_Recurso' + cualRecurso + '_Liga'];
    console.log('laLiga', laLiga);
    puntosAObtener = that['laSesion_Leccion' + '_Modulo' + cualModulo + '_Recurso' + cualRecurso + '_Puntos'];

    var Categoria = that['laSesion_Leccion' + '_Modulo' + cualModulo + '_Recurso' + cualRecurso + '_Categoria'];
    console.log('Categoria', Categoria);

    ////////////////////////
    puntosObtenidos = false;
    ////////////////////////

    habilitaBoton($('#botonCerrar'), false);

    $('.main-panel').addClass('main-panel_100');
    $('.panel-header, .sidebar, .navbar-toggler').hide();
    $('.navbar').css({
        'background-position': '0px 0px'
    });
    $('.breadcrumb').hide();
    $("#panel_participante").hide();

    $('#barra_player').show();
    $("#content").empty();

    var elContenido = '';
    elContenidoLanzado = true;

    // i4L API //
    registraIniciado();

    switch (Categoria) {



        case 'Pregunta':

            elContenido += '<div class="modal-body ver_pregunta_body">';
            elContenido += '<div id="sNombrePregunta" class="pregunta_desc">' + that['laSesion_Leccion' + '_Modulo' + cualModulo + '_Recurso' + cualRecurso + '_Nombre'] + '</div>';
            elContenido += '<br> <br> <br>';
            elContenido += '<div id="sPregunta" class="pregunta_preg">' + that['laSesion_Leccion' + '_Modulo' + cualModulo + '_Recurso' + cualRecurso + '_Pregunta'] + '</div>';
            elContenido += '<br> <br>'; +
            '</div>'
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


            $('#content').append(elContenido);

            activaPregunta(cualModulo, cualRecurso);

            setTimeout(function() {
                ajustaEscalaContenido();
                detectaUnload();
            }, 300);

            break;



        case 'Empaquetado':

            setTimeout(function() {

                $("#content").html('<iframe name="curso" id="curso" src="' + laLiga + '" frameborder="0" scrolling="yes" border="0" style="display: block; height: 100vh; width: 100vw; width:100%; height:100%;"></iframe>');

                ajustaEscalaContenido();
                detectaUnload();
                ///////////////////////
                puntosObtenidos = true;
                ///////////////////////

            }, 700);

            break;



        case 'Audio':

            setTimeout(function() {
                // $("#content").html('<iframe name="curso" id="curso" src="' + laLiga + '" frameborder="0" scrolling="yes" border="0" style="display: block; height: 100vh; width: 100vw; width:100%; height:100%;"></iframe>');

                elContenido += '<div name="curso" id="curso" style="width:100%; height:100%; background-color: #000000;">';
                elContenido += '<audio id="elAudio" style="display: flex; width:50%; height:50%; margin-left: auto; margin-right: auto;" autobuffer controls autoplay controlsList="nodownload">';
                elContenido += '<source src="' + laLiga + '" type="audio/mpeg" />';
                elContenido += '</audio>';
                elContenido += '</div>';

                $('#content').append(elContenido);

                ajustaEscalaContenido();
                detectaUnload();
                ///////////////////////
                puntosObtenidos = true;
                ///////////////////////
            }, 700);

            break;



        case 'Imagen':

            setTimeout(function() {
                // $("#content").html('<iframe name="curso" id="curso" src="' + laLiga + '" frameborder="0" scrolling="yes" border="0" style="display: block; height: 100vh; width: 100vw; width:100%; height:100%;"></iframe>');

                elContenido += '<div name="curso" id="curso" style="width:100%; height:100%;">';
                elContenido += '<img id="laImagen" src="' + laLiga + '">';
                elContenido += '</div>';

                $('#content').append(elContenido);

                ajustaEscalaContenido();
                detectaUnload();
                ///////////////////////
                puntosObtenidos = true;
                ///////////////////////
            }, 700);

            break;





        case 'PDF':

            setTimeout(function() {

                elContenido += '<div name="curso" id="curso" style="width:100%; height:100%;">';
                elContenido += '<embed src="' + laLiga + '" width="100%" height="100%"></embed>';
                // elContenido += '<object src="' + laLiga + '" width="100%" height="100%"></object>';
                elContenido += '</div>';

                $('#content').append(elContenido);

                ajustaEscalaContenido();
                detectaUnload();
                ///////////////////////
                puntosObtenidos = true;
                ///////////////////////

            }, 700);

            break;




        case 'Video':

            setTimeout(function() {
                // $("#content").html('<iframe name="curso" id="curso" src="' + laLiga + '" frameborder="0" scrolling="yes" border="0" style="display: block; height: 100vh; width: 100vw; width:100%; height:100%;"></iframe>');

                elContenido += '<div name="curso" id="curso" style="width:100%; height:100%; background-color: #000000;">';
                elContenido += '<video id="elVideo" style="width:100%; height:99%;" autobuffer controls autoplay controlsList="nodownload">';
                elContenido += '<source src="' + laLiga + '" type="video/mp4" />';
                elContenido += '</video>';
                elContenido += '</div>';

                $('#content').append(elContenido);

                ajustaEscalaContenido();
                detectaUnload();
                ///////////////////////
                puntosObtenidos = true;
                ///////////////////////
            }, 700);

            break;



        case 'Word':

            setTimeout(function() {
                $("#content").html('<iframe name="curso" id="curso" src="https://docs.google.com/gview?url=' + laLiga + '&embedded=true" frameborder="0" scrolling="yes" border="0" style="display: block; height: 100vh; width: 100vw; width:100%; height:100%;"></iframe>');

                // elContenido += '<div name="curso" id="curso" style="width:100%; height:100%;">';
                // elContenido += '<img  id="laImagen" src="' + laLiga + '">';
                // elContenido += '</div>';

                $('#content').append(elContenido);

                ajustaEscalaContenido();
                detectaUnload();
                ///////////////////////
                puntosObtenidos = true;
                ///////////////////////
            }, 700);

            break;



        case 'PowerPoint':

            setTimeout(function() {
                $("#content").html('<iframe name="curso" id="curso" src="https://docs.google.com/gview?url=' + laLiga + '&embedded=true" frameborder="0" scrolling="yes" border="0" style="display: block; height: 100vh; width: 100vw; width:100%; height:100%;"></iframe>');

                // elContenido += '<div name="curso" id="curso" style="width:100%; height:100%;">';
                // elContenido += '<img  id="laImagen" src="' + laLiga + '">';
                // elContenido += '</div>';

                $('#content').append(elContenido);

                ajustaEscalaContenido();
                detectaUnload();
                ///////////////////////
                puntosObtenidos = true;
                ///////////////////////
            }, 700);

            break;




        default:
            break;


    }





    // switch (Categoria) {

    //     case 'Video':

    //         setTimeout(function() {
    //             // $("#content").html('<iframe name="curso" id="curso" src="' + laLiga + '" frameborder="0" scrolling="yes" border="0" style="display: block; height: 100vh; width: 100vw; width:100%; height:100%;"></iframe>');

    //             elContenido += '<div name="curso" id="curso" style="width:100%; height:100%; background-color: #000000;">';
    //             elContenido += '<video id="elVideo" style="width:100%; height:99%;" autobuffer controls autoplay controlsList="nodownload">';
    //             elContenido += '<source src="' + laLiga + '" type="video/mp4" />';
    //             elContenido += '</video>';
    //             elContenido += '</div>';

    //             $('#content').append(elContenido);

    //             ajustaEscalaContenido();
    //             detectaUnload();
    //             ///////////////////////
    //             puntosObtenidos = true;
    //             ///////////////////////
    //         }, 700);

    //         break;


    //     case 'Empaquetado':

    //         setTimeout(function() {
    //             // $("#content").html('<iframe name="curso" id="curso" src="' + laLiga + '" frameborder="0" scrolling="yes" border="0" style="display: block; height: 100vh; width: 100vw; width:100%; height:100%;"></iframe>');

    //             elContenido += '<div src="' + laLiga + '">';
    //             elContenido += '</div>';


    //             $('#content').load(laLiga, function(data) {

    //             });



    //             ajustaEscalaContenido();
    //             detectaUnload();
    //             ///////////////////////
    //             puntosObtenidos = true;
    //             ///////////////////////
    //         }, 700);

    //         break;


    //     case 'Pregunta':

    //         elContenido += '<div class="modal-body ver_pregunta_body">';
    //         elContenido += '<div id="sNombrePregunta" class="pregunta_desc">' + that['laSesion_Leccion' + '_Modulo' + cualModulo + '_Recurso' + cualRecurso + '_Nombre'] + '</div>';
    //         elContenido += '<br> <br> <br>';

    //         elContenido += '<div id="sPregunta" class="pregunta_preg">' + that['laSesion_Leccion' + '_Modulo' + cualModulo + '_Recurso' + cualRecurso + '_Pregunta'] + '</div>';
    //         elContenido += '<br> <br>'; +
    //         '</div>'
    //         for (a = 1; a <= cuantasRespuestas; a++) {
    //             elContenido += '<div id="sRespuesta' + a + '" class="pregunta_respsSesion">' + that['laSesion_Leccion' + '_Modulo' + cualModulo + '_Recurso' + cualRecurso + '_Respuesta' + a] + '</div>';
    //             elContenido += '      <div id="paloma' + a + '" class="paloma"> &#x2714; </div>';
    //             elContenido += '      <div id="tache' + a + '" class="tache"> &#x2716; </div>';
    //             elContenido += '<br>';
    //         }

    //         elContenido += '<br> <br>';
    //         elContenido += '<button id="botonResponderPregunta" type="submit" class="btn btn-info btn-round">Enviar</button>';

    //         elContenido += '<div id="sRetroalimentacion">';
    //         elContenido += '<div class="titulo_retro">Retroalimentación:</div>';
    //         elContenido += '<div id="sRetroBien" class="pregunta_retro_bien">' + that['laSesion_Leccion' + '_Modulo' + cualModulo + '_Recurso' + cualRecurso + '_RetroBien'] + '</div>';
    //         elContenido += '<div id="sRetroMal" class="pregunta_retro_mal">' + that['laSesion_Leccion' + '_Modulo' + cualModulo + '_Recurso' + cualRecurso + '_RetroMal'] + '</div>';
    //         elContenido += '</div>';

    //         elContenido += '</div>';


    //         $('#content').append(elContenido);

    //         activaPregunta(cualModulo, cualRecurso);

    //         setTimeout(function() {
    //             ajustaEscalaContenido();
    //             detectaUnload();
    //         }, 300);

    //         break;


    //     default:
    //         break;

    // }


}


function activaPregunta(cualModulo, cualRecurso) {
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

        evalua(respuestaElegida, respuestaCorrecta);
    });

    $('.pregunta_respsSesion').click(function() {
        $('.pregunta_respsSesion').removeClass('respuestaDeshabilitada').addClass('respuestaHabilitada');
        $('#sRespuesta' + respuestaElegida).removeClass('respuestaHabilitada').addClass('respuestaDeshabilitada');
    });
}

function evalua(cualRespuesta, cualCorrecta) {
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



function cierraContenido() {

    registraRevisado();
    elContenidoLanzado = false;

    habilitaBoton($('#botonCerrar'), true);
    $("#content").empty();
    $('#barra_player').hide();
    $('.main-panel').addClass('main-panel_100');
    $('.panel-header, .sidebar, .navbar-toggler').hide();
    $('.navbar').css({
        'background-position': '0px 0px'
    });
    $("#panel_participante").show();

    ajustaEscalaContenido();

    navega('sesion_participante', function() {

        $('.sesion_participante1_int').animate({
            'margin-left': '-200%'
        }, function() {
            $('.sesion_participante1_int').hide();
            setTimeout(function() {
                pintaSesionParticipante2(elModulo);
            }, 500);
        });

    });

}



function detectaUnload() {
    if (elContenidoLanzado == true) {
        $("#content").bind('DOMNodeRemoved', function(event) {
            console.log('unload!');

            registraRevisado();
            elContenidoLanzado = false;
            habilitaBoton($('#botonCerrar'), true);
            $('#barra_player').hide();
            $('.panel-header').show();
            ajustaEscalaContenido();
            $("#content").unbind();
        });
    }
}


function ajustaEscalaContenido() {

    elAlto = $(window).height();
    elAncho = $(window).width();

    if (elContenidoLanzado == true) {
        $("#content").css({
            'height': (elAlto - 128) + 'px'
            // 'width': elAncho + 'px'
        });
        $("#contenido").css({
            'padding': '0px',
            'margin-top': '125px'
        });
    } else {
        $("#content").css({
            'height': '100%'
            // 'width': elAncho + 'px'
        });
        $("#contenido").css({
            'padding': '30px',
            'margin-top': '0px'
        });
    }

}
