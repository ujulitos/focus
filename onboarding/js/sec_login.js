function activaSeccionLogin() {
    console.log('seccionLogin');
    ajustaTamano();
    // habilitaBoton($('#botonEntrar'), false);
    $("#botonEntrar").click(function(event) {
        event.preventDefault();
        loginUser();
    });

    $('#inputUsuario, #inputPassword').keypress(function(event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            loginUser();
        }
        event.stopPropagation();
    });

    $("#botonRegistrar").click(function(event) {
        event.preventDefault();

        habilitaBoton($('#botonRegistrar'), false);
        cargaPerfiles();
        // leeUsuarios();

        $("#subsec_register").show("slide", {
            direction: "right",
            easing: 'easeInOutBack'
        }, 700, function() {
            habilitaBoton($('#botonRegistrar'), true);
        });
        $("#subsec_login").hide("slide", {
            direction: "left",
            easing: 'easeInOutBack'
        }, 700);

    });

    $("#botonCancelarReg").click(function(event) {
        event.preventDefault();
        habilitaBoton($('#botonCancelarReg'), false);
        limpiaRegInputs();

        $("#subsec_login").show("slide", {
            direction: "left",
            easing: 'easeInOutBack'
        }, 700, function() {
            habilitaBoton($('#botonCancelarReg'), true);
        });
        $("#subsec_register").hide("slide", {
            direction: "right",
            easing: 'easeInOutBack'
        }, 700);
    });


    function limpiaRegInputs() {
        $("#regUsername").val('');
        $("#regName").val('');
        $("#regCountry").val('');
        $("#regRegion").val('');
        $("#regBirth").val('');
        $("#regPerfil").val($("#regPerfil option:first").val());
        $("#regPassword").val('');
        $("#regPassword2").val('');
        $('.mensaje_error_register').text('');
    }

    // function EmailSimpleValidator(email) {
    //     var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    //     return regex.test(email);
    // }

    $("#botonGuardarReg").click(function(event) {
        event.preventDefault();
        habilitaBoton($('#botonGuardarReg'), false);

        var elregUsername = $("#regUsername").val();
        var elRegName = $("#regName").val();
        var elRegCountry = $("#regCountry").val();
        var elRegRegion = $("#regRegion").val();
        var elRegBirth = $("#regBirth").val();
        var elRegPerfil = $("#regPerfil :selected").text();
        var elRegPassword = $("#regPassword").val();
        var elRegPassword2 = $("#regPassword2").val();

        // console.log('elRegName', elRegName, 'elregUsername', elregUsername, 'elRegPosition', elRegPosition, 'elRegCountry', elRegCountry, 'elRegRegion', elRegRegion, 'elRegBirth', elRegBirth, 'elRegPerfil', elRegPerfil, 'elRegPassword', elRegPassword, 'elRegPassword2', elRegPassword2);

        // if (elRegName != '' && EmailSimpleValidator(elregUsername) && elRegPosition != '' && elRegCountry != '' && elRegRegion != '' && elRegBirth != '' && elRegPerfil != 'Select one' && elRegPassword != '' && elRegPassword2 != '' && (elRegPassword === elRegPassword2)) {
        if (elregUsername != '' &&
            elRegName != '' &&
            elRegCountry != '' &&
            elRegRegion != '' &&
            elRegBirth != '' &&
            elRegPerfil != 'Select one' &&
            elRegPassword != '' &&
            elRegPassword2 != '' &&
            (elRegPassword === elRegPassword2)) {

            $('.mensaje_error_register').text('');

            registraNuevoUsuario(elregUsername, elRegName, elRegCountry, elRegRegion, elRegBirth, elRegPerfil, elRegPassword);
        } else {
            $('.mensaje_error_register').text('');
            setTimeout(function() {
                $('.mensaje_error_register').text(mensajeErrorRegister);
                habilitaBoton($('#botonGuardarReg'), true);
            }, 200);
        }

    });


    function cargaPerfiles() {
        $.ajax({
            url: 'js/perfiles.json',
            type: 'get',
            dataType: 'json',
            cache: false,
            success: llenaPerfiles,
            async: true,
        });
    };




    function llenaPerfiles(data) {
        console.log(data);
        var cuantosPerfiles = Object.keys(data.perfiles).length;
        console.log('cuantosPerfiles', cuantosPerfiles);

        $('#regPerfil').empty();
        $("#regPerfil").append('<option value=" " selected disabled>Select one</option>');
        for (a = 1; a <= cuantosPerfiles; a++) {
            $('#regPerfil').append('<option value="' + Object.values(data.perfiles)[(a - 1)] + '">' + Object.values(data.perfiles)[(a - 1)] + '</option>');
        };

        return;
    }


    function registraNuevoUsuario(cualregUsername, cualRegName, cualRegCountry, cualRegRegion, cualRegBirth, cualRegPerfil, cualRegPassword) {
        console.log('registraNuevoUsuario', cualregUsername, cualRegName, cualRegCountry, cualRegRegion, cualRegBirth, cualRegPerfil, cualRegPassword);

        // var idNuevo = cualregUsername.split("@")[0];
        var idNuevo = cualregUsername;
        var cualRegPasswordOk = md5(cualRegPassword);

        var onComplete = function(error) {
            if (error) {
                console.log('Ocurrió un error en la sincronización.');
            } else {
                console.log('Sincronización realizada.');
                login(cualregUsername, cualRegPassword);
            };
        };

        switch (cualRegPerfil) {

            case 'Coach':
                var nuevoUsuarioData = {
                    Username: cualregUsername,
                    Name: cualRegName,
                    Country: cualRegCountry,
                    Region: cualRegRegion,
                    Birth: cualRegBirth,
                    Perfil: cualRegPerfil,
                    Password: cualRegPasswordOk,
                    Id: 'usuario_' + idNuevo,
                    Activo: false
                };
                break;

            case 'IBP':
                var nuevoUsuarioData = {
                    Username: cualregUsername,
                    Name: cualRegName,
                    Country: cualRegCountry,
                    Region: cualRegRegion,
                    Birth: cualRegBirth,
                    Perfil: cualRegPerfil,
                    Password: cualRegPasswordOk,
                    Id: 'usuario_' + idNuevo,
                    Activo: false,
                    Registro: {
                        status_coach: {
                            "val": true,
                            weeks_completed: {
                                0: 0
                            },
                            days_completed: {
                                0: 0
                            },
                            cats_completed: {
                                0: 0
                            }
                        },
                        status_ibp: {
                            "val": true,
                            weeks_completed: {
                                0: 0
                            },
                            days_completed: {
                                0: 0
                            },
                            cats_completed: {
                                0: 0
                            }
                        }
                    }
                };
                break;

            default:
                break;
        }


        console.log('Guardando . . . ');
        var dataRef = firebase.database().ref(laUrlBase + 'Usuarios');
        var keyUsuario = dataRef.ref.child("usuario_" + idNuevo);
        console.log(nuevoUsuarioData);
        firebase.database().ref(keyUsuario).set(nuevoUsuarioData, onComplete);

    }

    if (!isMobile) {
        var scrollLogin = Scrollbar.init($('.container')[0]);
    }

}
