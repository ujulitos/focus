// var laUrlBase = '';
var elCorreoExiste;

function activaSecRegistro() {
    console.log('activaSecRegistro');
    $('.panel-header div h3').html('Registro');
    $('#subtituloSeccion').html('');

    $('.navbar').css({
        'margin-bottom': '42px'
    });

    return cuentaRegistro().then(function() {
        pintaRegistro().then(function() {
            activaBotonesRegistro().then(function() {
                cargador('oculta');
            });
        });
    });
}

//////////////////////Registrar  Usuario [Inicio]\\\\\\\\\\\\\\\\\\\\\\
function cleanFieldsRegistro() {
    $("._registro").val('');
    $("#usuNvoPerfil").val('Participante');
    $("#usuNvoPais").val('México');
    $("#usuNvoFechaGenero").val('Femenino');
    $("#usuNvoNotificaciones").addClass('active');
    $("#errorRegistro").html("").addClass('ocultar');

    $("#wizardPicturePreview").attr('src', 'img/profile_foto.jpg');
}

function EmailSimpleValidator(email) {
    var arr = email.split("@");
    if (arr.length != 2)
        return false;
    var name = arr[0];
    var domain = arr[1];
    if (name.length === 0 || domain.length === 0)
        return false;

    return true;

}

CONTRASENNA_clean = "";
_CORREO = "";

function RegistroUsuario() {
    console.log("Registro de Usuarios");
    var listError = "";
    var userToRegister = {};
    userToRegister.Nombre = $("#usuNvoNombre").val();
    if (userToRegister.Nombre.length === 0) {
        listError += "<li><strong>Nombre</strong> está vacío.</li>";
    }
    userToRegister.Apellido_Paterno = $("#usuNvoAPaterno").val();
    if (userToRegister.Apellido_Paterno.length === 0) {
        listError += "<li><strong>Apellido Paterno</strong> está vacío.</li>";
    }
    userToRegister.Apellido_Materno = $("#usuNvoAMaterno").val();
    if (userToRegister.Apellido_Materno.length === 0) {
        listError += "<li><strong>Apellido Materno</strong> está vacío.</li>";
    }
    // userToRegister.Organizacion = $("#usuNvoOrganizacion").val();
    // if (userToRegister.Organizacion.length === 0) {
    //     listError += "<li><strong>Organización</strong> está vacío.</li>";
    // }
    // userToRegister.Area_funcional = $("#usuNvoArea").val();
    // if (userToRegister.Area_funcional.length === 0) {
    //     listError += "<li><strong>Área</strong> está vacío.</li>";
    // }
    // userToRegister.Puesto = $("#usuNvoPuesto").val();
    // if (userToRegister.Puesto.length === 0) {
    //     listError += "<li><strong>Puesto</strong> está vacío.</li>";
    // }
    // userToRegister.Fecha_nacimiento = $("#usuNvoFechaNacimiento").val();
    // if (userToRegister.Fecha_nacimiento.length === 0) {
    //     listError += "<li><strong>Fecha Nacimiento</strong> está vacío.</li>";
    // }
    // userToRegister.Fecha_ingreso = $("#usuNvoFechaIngreso").val();
    // if (userToRegister.Fecha_ingreso.length === 0) {
    //     listError += "<li><strong>Fecha Ingreso</strong> está vacío.</li>";
    // }
    // userToRegister.Nivel = $("#usuNvoNivel").val();
    // if (userToRegister.Nivel.length === 0) {
    //     listError += "<li><strong>Nivel</strong> está vacío.</li>";
    // }
    // userToRegister.Nombre_jefe = $("#usuNvoNombreJefe").val();
    // if (userToRegister.Nombre_jefe.length === 0) {
    //     listError += "<li><strong>Nombre del Jefe</strong> está vacío.</li>";
    // }
    // userToRegister.Correo_jefe = $("#usuNvoCorreoJefe").val();
    // if (userToRegister.Correo_jefe.length === 0) {
    //     listError += "<li><strong>Correo del Jefe</strong> está vacío.</li>";
    // }
    // if (!EmailSimpleValidator(userToRegister.Correo_jefe)) {
    //     listError += "<li>Formato del <strong>Correo del Jefe</strong> incorrecto.</li>";
    // }
    // userToRegister.RFC = $("#usuNvoRFC").val();
    // if (userToRegister.RFC.length === 0) {
    //     listError += "<li><strong>RFC</strong> está vacío.</li>";
    // }
    // userToRegister.CURP = $("#usuNvoCurp").val();
    // if (userToRegister.CURP.length === 0) {
    //     listError += "<li><strong>CURP</strong> está vacío.</li>";
    // }
    userToRegister.Numero_colaborador = $("#usuNvoNumeroColaborador").val();
    if (userToRegister.Numero_colaborador.length === 0) {
        listError += "<li><strong>Número de Colaborador</strong> está vacío.</li>";
    }

    userToRegister.Correo = $("#usuNvoCorreo").val();
    if (userToRegister.Correo.length === 0) {
        listError += "<li><strong>Correo</strong> está vacío.</li>";
    }

    console.log('elCorreoExiste', elCorreoExiste);

    if (elCorreoExiste == true) {
        listError += "<li><strong>El Correo ingresado ya existe,</strong> por favor utilice otro.</li>";
    }

    if (!EmailSimpleValidator(userToRegister.Correo)) {
        listError += "<li>Formato del <strong>Correo</strong> incorrecto.</li>";
    }
    userToRegister.Contrasena = $("#usuNvoContrasena1").val();
    if (userToRegister.Contrasena.length === 0) {
        listError += "<li><strong>Contraseña</strong> está vacío.</li>";
    }
    if (userToRegister.Contrasena.length < 6) {
        listError += "<li>Su contraseña <strong> debe tener al menos 6 caracteres</strong></li>";
    }
    var password_repeat = $("#usuNvoContrasena2").val();
    if (password_repeat.length === 0) {
        listError += "<li><strong>Confirmar contraseña</strong> está vacío.</li>";
    }
    if (userToRegister.Contrasena !== password_repeat) {
        listError += "<li>Sus <strong>contraseñas</strong> no coinciden.</li>";
    }
    var img = $("#wizard-picture").val();
    if (img.length === 0) {
        listError += "<li>No ha subido una <strong>Foto</strong> de perfil.</li>";
    }

    // userToRegister.Pais = $("#usuNvoPais").val();
    // userToRegister.Perfil = $("#usuNvoPerfil").val();
    userToRegister.Perfil = 'Participante';
    // userToRegister.Notificaciones = $("#usuNvoNotificaciones").hasClass('active');
    // userToRegister.Genero = $("#usuNvoFechaGenero").val();

    if (listError.length > 0) {
        var mensajeError = "<strong>Campos con problemas: </strong><ul>" + listError + "</ul>";
        $("#errorRegistro").html(mensajeError).removeClass('ocultar');
    } else {
        listError = "";
        //var usuarioId = generarId();     usuarioId 
        userToRegister.Id = usuarioId;
        userToRegister.FechaAlta = moment().format();
        userToRegister.Visible = true;
        userToRegister.Activo = true;
        // userToRegister.Fecha_nacimiento = moment(userToRegister.Fecha_nacimiento, "MM-DD-YYYY").format();
        // userToRegister.Fecha_ingreso = moment(userToRegister.Fecha_ingreso, "MM-DD-YYYY").format();
        _CORREO = userToRegister.Correo;
        elPerfil = userToRegister.Perfil;
        _elPerfil = elPerfil;
        CONTRASENNA_clean = userToRegister.Contrasena;
        userToRegister.Contrasena = md5(userToRegister.Contrasena);
        saveUser(userToRegister);
    }
}

function saveUser(userToRegister) {
    var onComplete = function(error) {
        if (error) {
            $.notify({
                message: 'Ocurrió un error en la sincronización.'
            }, {
                type: 'danger',
                allow_dismiss: true,
                delay: 1500,
                allow_dismiss: false
            });
            console.log('Ocurrió un error en la sincronización.');
            $(".mensaje_error_nvo_usuario").text('');
        } else {
            cleanFieldsRegistro();

            $.notify({
                message: 'El usuario se agregó correctamente'
            }, {
                type: 'success',
                allow_dismiss: true,
                delay: 1500,
                allow_dismiss: false
            });
            console.log('Sincronización realizada.');
            setTimeout(function() {
                login(userToRegister.Correo, CONTRASENNA_clean);
                navega('inicio');
            }, 300);
        }
    };
    console.log('[REGISTRO] Usuario a Registrar: ');
    console.log(userToRegister);


    if (revisaConexion) {
        var dataRef = firebase.database().ref(laUrlBase + 'Usuarios');
        var keyUsuario = dataRef.ref.child(userToRegister.Id);

        console.log('[ADMINISTRADOR: registro] Registrando: ' + userToRegister.Nombre);
        firebase.database().ref(keyUsuario).set(userToRegister, onComplete);
    }


}

//////////////////////Registrar  Usuario [Final]\\\\\\\\\\\\\\\\\\\\\\



function cuentaRegistro() {

    /////////// aqui el código /////////////

    $("#botonGuardaNuevoUsuario").click(function() {
        console.log("clik: botonGuardaNuevoUsuario");

        setTimeout(function() {
            RegistroUsuario();
        }, 300);

    });
    return $.ajax();

}




function pintaRegistro() {
    console.log('pintaRegistro');

    if (usuarioId) {
        $("#wizardPicturePreview").attr('src', 'usuarios/' + usuarioId + '/profile_foto.jpg');
    } else {
        $("#wizardPicturePreview").attr('src', 'img/profile_foto.jpg');
    }

    $("#wizard-picture").change(function() {
        console.log("Eligiendo Foto 📥");
        readURL(this);
    });

    function readURL(input) {
        if (input.files && input.files[0]) {
            /**/
            var idNuevo = generarId();
            usuarioId = "usuario_" + idNuevo;

            // actualiza foto en el servidor
            var formIm = $("#participante_foto")[0];
            var formData = new FormData(formIm);
            formData.append("archivo", input.files[0]);
            formData.append("elUsuarioId", usuarioId + "/");

            $.ajax({
                url: "php/foto_upload.php",
                type: "post",
                dataType: "html",
                data: formData,
                cache: false,
                contentType: false,
                processData: false
            }).done(function(res) {
                console.log("Respuesta: " + res);
                var reader = new FileReader();
                reader.onload = function(e) {
                    $('#wizardPicturePreview').attr('src', e.target.result).fadeIn('slow');
                }
                reader.readAsDataURL(input.files[0]);
            });
        }
    }

    // $('.Registro_int').append(contenidoSecCursos);
    $('#subtituloSeccion').html('Registro de cuenta nueva');

    return $.ajax();
}


function activaBotonesRegistro() {
    console.log('activaBotonesRegistro');
    eliminaLocalStorage();

    $("#usuNvoCorreo").change(function() {
        buscaCorreo($(this).val());
    });


    return $.ajax();
}



function buscaCorreo(cualCorreo) {
    console.log('buscando si ya existe el correo:', cualCorreo);

    if (revisaConexion) {
        firebase.database().ref(laUrlBase + 'Usuarios').orderByChild('Correo').equalTo(cualCorreo).once('value').then(function(snapshot) {

            if (snapshot.val() != null) {
                console.log('Ese correo ya existe, por favor ingrese otro.');
                elCorreoExiste = true;
            } else {
                console.log('Ese correo está disponible, adelante.');
                elCorreoExiste = false;
            }
            return elCorreoExiste;

        });
    }
}
