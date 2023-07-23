function activaSecRecursos() {
    console.log('activaSecRecursos');
    $('.panel-header div h3').html('Objetos de Aprendizaje');
    $('#subtituloSeccion').html('');


    //Adicionar Recurso
    $("#rError").html("").addClass("ocultar");
    $("._recurso").click(function() {
        $("#rError").html("").addClass("ocultar");
    });
    $("._recurso").change(function() {
        $("#rError").html("").addClass("ocultar");
    });
    $("#inputZip").change(function() {
        var NOMBRE = $("#rNombre").val();
        if (NOMBRE.length === 0) {
            $("#rError").html("Por favor, antes de subir un archivo ingrese un nombre").removeClass("ocultar");
            $("#inputZip").val('');
        } else {
            // subirRecursoAdd(this);
            // var elRecursoNombre = $("#inputZip").val().replace(/C:\\fakepath\\/i, '');
            // $('#recursoNombreSi').show();
            // $('#recursoNombreTexto').html(elRecursoNombre);
        }
    });
    $("#inputPortadaRecurso").change(function() {
        if ($("#rNombre").val().length === 0) {
            $("#rError").html("Por favor, antes ingrese un nombre de recurso").removeClass("ocultar");
            $("#imgPortadaRecursoPreview").attr("src", "img/recurso.jpg");
            // } else if ($("#inputZip").val().length === 0) {
            // $("#rError").html("Por favor, antes suba sus respectivos archivos del recurso").removeClass("ocultar");
            // $("#imgPortadaRecursoPreview").attr("src", "img/recurso.jpg");
        } else {
            // subirPortadaRecursoAdd(this);
            var reader = new FileReader();
            reader.onload = function(e) {
                $('#imgPortadaRecursoPreview').attr('src', e.target.result).fadeIn('slow');
            };
            reader.readAsDataURL(this.files[0]);
        }
    });

    $("#rNombre").change(function() {
        var nombre = $("#rNombre").val();
        var nombre_corto = getCleanedString(nombre); //Removiendo espacios
        $("#rNombreCorto").val(nombre_corto);
    });

    $("#erNombre").change(function() {
        var nombre = $("#erNombre").val();
        var nombre_corto = getCleanedString(nombre); //Removiendo espacios
        $("#erNombreCorto").val(nombre_corto);
    });

    $("#botonGuardaNuevoRecurso").click(function() {
        subirPortadaRecursoAdd($("#inputPortadaRecurso")[0]);
        subirRecursoAdd($("#inputZip")[0]);
    });

    $("#botonGuardaNuevaPregunta").click(function() {
        agregarPregunta();
    });

    //Editar Recurso

    $("#erError").html("").addClass("ocultar");
    $(".e_recurso").click(function() {
        $("#erError").html("").addClass("ocultar");
    });
    $(".e_recurso").change(function() {
        $("#erError").html("").addClass("ocultar");
    });
    $("#einputZip").change(function() {
        var NOMBRE = $("#erNombre").val();
        if (NOMBRE.length === 0) {
            $("#erError").html("Por favor, antes de subir un archivo ingrese un nombre").removeClass("ocultar");
            $("#einputZip").val('');

        } else {
            // subirRecursoEdit(this);
            // var elRecursoNombre = $("#einputZip").val().replace(/C:\\fakepath\\/i, '');
            // $('#erecursoNombreSi').show();
            // $('#erecursoNombreTexto').html(elRecursoNombre);
        }
    });
    $("#einputPortadaRecurso").change(function() {
        if ($("#erNombre").val().length === 0) {
            $("#erError").html("Por favor, antes ingrese un nombre de recurso").removeClass("ocultar");
            $("#eimgPortadaRecursoPreview").attr("src", "img/recurso.jpg");
        } else {
            var reader = new FileReader();
            reader.onload = function(e) {
                $('#eimgPortadaRecursoPreview').attr('src', e.target.result).fadeIn('slow');
            };
            reader.readAsDataURL(this.files[0]);
        }
    });
    $("#ebotonGuardaNuevoRecurso").click(function() {
        subirPortadaRecursoEdit($("#einputPortadaRecurso")[0]);
        subirRecursoEdit($("#einputZip")[0]);
    });




    $('#modalAddRecurso').on('hidden.bs.modal', function() {
        // console.log('limipando modalAddRecurso');
        cleanUploadRecurso();
        _cleanUploadRecurso();
    })

    $('#emodalAddRecurso').on('hidden.bs.modal', function() {
        // console.log('limipando modalAddRecurso');
        cleanUploadRecurso();
        _cleanUploadRecurso();
    })


    $('#modalAddPregunta').on('hidden.bs.modal', function() {
        // console.log('limipando modalAddPregunta');
        cleanUploadPregunta();
    })

    $('#emodalAddPregunta').on('hidden.bs.modal', function() {
        // console.log('limipando emodalAddPregunta');
        cleanUploadPregunta();
    })

    $("#rDuracion, #erDuracion").attr('min', '1');



    $.getJSON("data/categorias.json", function(result) {
        var options = "";
        $.each(result, function(i, cat) {
            if (cat.categoria === "Selecciona una opción") {
                options += "<option value='" + cat.categoria + "' selected disabled>" + cat.categoria + "</option>";
            } else {
                options += "<option value='" + cat.categoria + "'>" + cat.categoria + "</option>";
            }

        });
        $("#rCategoria").html(options);
        $("#erCategoria").html(options);
    });

    $.getJSON("data/organizaciones.json", function(result) {
        var options = "";
        $.each(result, function(i, organizaciones) {
            if (organizaciones.organización === "Selecciona una opción") {
                options += "<option value='" + organizaciones.organización + "' selected disabled>" + organizaciones.organización + "</option>";
            } else {
                options += "<option value='" + organizaciones.organización + "'>" + organizaciones.organización + "</option>";
            }

        });
        $("#rOrganizacion").html(options);
        $("#erOrganizacion").html(options);
    });



    $("#rCategoria, #erCategoria").change(function() {
        if ($(this).val() != 'Selecciona una opción') {
            cambiaAttrInput($(this).val());
        }
    });


    $("#tipoPregunta, #etipoPregunta").change(function() {
        if ($(this).val() != 'Selecciona una opción') {
            console.log('tipoPregunta', $(this).val());
        }
    });

    $(".form-check-input").change(function() {
        laOpcionCorrecta = parseInt($(this).val());
        console.log('laOpcionCorrecta', laOpcionCorrecta);
    });



    $("#buscadorRecursos").keyup(function() {
        if ($(this).val().length > 2) {
            // console.log("buscando ok", $(this).val());

            for (b = 1; b <= cuantosRecursosVisibles; b++) {
                $('#tarjeta' + b).hide();
                if (that['recursoNombre' + b].toLowerCase().includes($(this).val().toLowerCase()) ||
                    that['recursoDesc' + b].toLowerCase().includes($(this).val().toLowerCase())) {
                    console.log('Encontré la palabra', $(this).val(), 'con el recurso', that['recursoNombre' + b], b);
                    $('#tarjeta' + b).fadeIn();
                    // return;
                } else {
                    console.log('No encontré nada');
                }
            }

        } else {
            for (b = 1; b <= cuantosRecursosVisibles; b++) {
                $('#tarjeta' + b).fadeIn();
            }
        }
        // pintaRecursos();
    });

    // $("#buscadorRecursos").change(function() {
    //     if ($(this).val().length > 0) {
    //         $(this).css({
    //             'background-color': 'rgba(255, 255, 255, 1)'
    //         })
    //     } else {
    //         $(this).css({
    //             'background-color': 'rgba(255, 255, 255, 0.8)'
    //         })
    //     }
    // });

    $("#buscadorClean").click(function(e) {
        e.preventDefault();
        $("#buscadorRecursos").val('');
        $("#buscadorRecursos").keyup();
    });

    cargarTipoPreguntas();
    cuentaRecursos();

}



// URL_BASE = "http://ideas4learning.com/revision/BIMBO/lms/";
IdRecurso = '';
Portada = "";
Liga = "";
FileName = "";
elRecursoId = "";
var elFileName = '';
var laLigaRecurso;
var laOpcionCorrecta = '';

function subirRecursoAdd(input) {
    console.log("[SUBIENDO RECURSO ADD]");

    cargador('muestra');

    if (IdRecurso.length === 0) {
        var recursoId = generarId();
        IdRecurso = "recurso_" + recursoId;
    }
    console.log("IdRecurso", IdRecurso);

    var formIm = $("#formZip")[0];
    var formData = new FormData(formIm);
    formData.append("zip_file", input.files[0]);
    formData.append("rename", IdRecurso);
    // formData.append("CODE_RESOURCE", "UPLOAD_RESOURCE");
    // formData.append("CODE_PHOTO", "UPLOAD_PHOTO");
    console.log("formData", input.files[0]);

    $.ajax({
        url: "php/recurso_upload.php",
        type: "post",
        dataType: "html",
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        success: function(data) {

            var dataFinal = data.substr(12);
            Liga = URL_BASE + "recursos/" + IdRecurso + "/" + dataFinal;
            laLigaRecurso = Liga;
            console.log("laLigaRecurso", laLigaRecurso);
            SaveRecurso(laLigaRecurso);

            console.log("Recurso agregado exitosamente", dataFinal);
            return;
        },
        error: function() {
            console.log('Error occured');
            cargador('oculta');
        }
    });
}

function updatePortadaPreviewEdit(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
            $("#eimgPortadaRecursoPreview").attr("src", e.target.result);
        };
        reader.readAsDataURL(input.files[0]);
    }
}

function subirRecursoEdit(input) {

    if (input.files && input.files[0]) {
        console.log("[SUBIENDO RECURSO EDIT]");

        cargador('muestra');

        var formIm = $("#eformZip")[0];
        var formData = new FormData(formIm);
        formData.append("zip_file", input.files[0]);
        formData.append("rename", IdRecurso);
        // formData.append("CODE_RESOURCE", "UPLOAD_RESOURCE");
        // formData.append("CODE_PHOTO", "UPLOAD_PHOTO");
        $.ajax({
            url: "php/recurso_upload.php",
            type: "post",
            dataType: "html",
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            success: function(data) {

                var dataFinal = data.substr(12);
                Liga = URL_BASE + "recursos/" + IdRecurso + "/" + dataFinal;
                laLigaRecurso = Liga;
                console.log("laLigaRecurso", laLigaRecurso);
                UpdateRecurso(laLigaRecurso);

                console.log("Recurso editado exitosamente", dataFinal);
                return;
            },
            error: function() {
                console.log('Error occured');
                cargador('oculta');
            }
        });
    } else {
        UpdateRecurso(Liga);
        console.log("Recurso editado exitosamente", Liga);
        return;
    }
}


function subirPortadaRecursoAdd(input) {
    console.log("[SUBIENDO PORTADA ADD]");

    if (IdRecurso.length === 0) {
        var recursoId = generarId();
        IdRecurso = "recurso_" + recursoId;
    }

    if (input.files && input.files[0]) {

        // actualiza portada del recurso en el servidor
        var formIm = $("#formPortadaRecurso")[0];
        var formData = new FormData(formIm);
        formData.append("archivo", input.files[0]);
        // formData.append("CODE_RESOURCE", "UPLOAD_RESOURCE");
        // formData.append("CODE_PHOTO", "UPLOAD_PHOTO");
        formData.append("IdRecurso", IdRecurso);
        // formData.append("FileName", FileName);

        $.ajax({
            url: "php/recurso_upload.php",
            type: "post",
            dataType: "html",
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            success: function(data) {
                Portada = URL_BASE + "recursos/" + IdRecurso + "/objeto_portada.jpg";
                console.log("La Portada se ha subido correctamente");
                // cuentaRecursos();
                return data;
            },
            error: function() {
                console.log('Error occured');
            }
        });
    }
}

function subirPortadaRecursoEdit(input) {
    if (input.files && input.files[0]) {
        console.log("[SUBIENDO PORTADA EDIT]");

        var url = $("#ocultaPortada").val();
        console.log("URL PORTADA: ");
        console.log(url);
        var arr = url.split("/");
        // IdRecurso = arr[1];
        IdRecurso = elRecursoId;
        // FileName = arr[2];
        console.log('input.files[0]', input.files[0]);
        var formIm = $("#eformPortadaRecurso")[0];
        var formData = new FormData(formIm);
        formData.append("archivo", input.files[0]);
        // formData.append("CODE_RESOURCE", "UPLOAD_RESOURCE");
        // formData.append("CODE_PHOTO", "UPLOAD_PHOTO");
        formData.append("IdRecurso", IdRecurso);
        // formData.append("FileName", FileName);
        $.ajax({
            url: "php/recurso_upload.php",
            type: "post",
            dataType: "html",
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            success: function(data) {
                Portada = URL_BASE + "recursos/" + IdRecurso + "/objeto_portada.jpg";
                console.log("La Portada se ha actualizado correctamente");
                // _cleanUploadRecurso();
                // cuentaRecursos();
                return data;
            },
            error: function() {
                console.log('Error occured');
                cargador('oculta');
            }
        });
    } else {
        return;
    }
}

function cleanUploadRecurso() {
    console.log("Cleaning ADD Recurso modal");
    IdRecurso = '';
    Portada = "";
    Liga = "";
    FileName = "";

    $("#rNombre").html('');
    $("#rCategoria").val('Selecciona una opción');
    $("#rOrganizacion").val('Selecciona una opción');
    // $('#recursoNombreSi').hide();
    $("#rError").html("").addClass("ocultar");
    $("#erError").html("").addClass("ocultar");
    $("#imgPortadaRecursoPreview").attr('src', "img/recurso.jpg");
    $("._recurso").val('');
    cambiaAttrInput('todos');
}

function _cleanUploadRecurso() {
    console.log("Cleaning EDIT Recurso modal");
    // URL_BASE = "http://ideas4learning.com/revision/BIMBO/lms/";
    IdRecurso = '';
    Portada = "";
    Liga = "";
    FileName = "";

    CHANGE_PORTADA_PREVIEW_EDIT = false;

    $("#rError").html("").addClass("ocultar");
    $("#erError").html("").addClass("ocultar");
    $("#erCategoria").val('Selecciona una opción');
    $("#erOrganizacion").val('Selecciona una opción');
    // $('#erecursoNombreSi').hide();
    $("#erError").html("").addClass("ocultar");
    $("#eimgRecursoPreview").attr('src', "img/recurso.jpg");
    $(".e_recurso").val('');
    cambiaAttrInput('todos');
}


function cleanUploadPregunta() {
    console.log("Cleaning Pregunta modal");
    // IdRecurso = '';

    $("#idRecursoEdit").val('');
    $("#erError").html("").addClass("ocultar");
    // $("#erNombreCorto").val(R.Nombre_corto);
    $("#tipoPregunta").val('');
    $("#rNombrePregunta").val('');
    $("#rDescripcionPregunta").val('');

    $("#rPregunta").val('');
    $("#rRespuesta1").val('');
    $("#rRespuesta2").val('');
    $("#rRespuesta3").val('');
    $("#rRespuesta3").val('');
    $("#correcta" + 1).prop('checked', true);

    $("#rRetroBien").val('');
    $("#rRetroMal").val('');
}



function getCleanedString(cadena) {
    var specialChars = "!@#$^&%*()+=-[]\/{}|:<>?,."; // Definimos los caracteres que queremos eliminar
    for (var i = 0; i < specialChars.length; i++) {
        cadena = cadena.replace(new RegExp("\\" + specialChars[i], 'gi'), ''); // Los eliminamos todos
    }
    cadena = cadena.replace(/ /g, ""); // Quitamos espacios y los sustituimos por _ porque nos gusta mas asi
    cadena = cadena.replace(/á/gi, "a"); // Quitamos acentos y "ñ".
    cadena = cadena.replace(/é/gi, "e");
    cadena = cadena.replace(/í/gi, "i");
    cadena = cadena.replace(/ó/gi, "o");
    cadena = cadena.replace(/ú/gi, "u");
    cadena = cadena.replace(/ü/gi, "u");
    cadena = cadena.replace(/ñ/gi, "n");

    cadena = cadena.substring(0, 50); //Reducimos a 50 caractes
    return cadena;
}

function SaveRecurso(laLigaRecurso) {
    if (IdRecurso.length === 0) {
        var recursoId = generarId();
        IdRecurso = "recurso_" + recursoId;
    }
    console.log("[SaveRecurso]", IdRecurso);

    $("#rError").html("").addClass("ocultar");
    var listError = "";
    var recurso = {};
    recurso.Nombre = $("#rNombre").val();
    if (recurso.Nombre.length === 0) {
        listError += "<li><strong>Nombre del recurso</strong> está vacío.</li>";
    }

    recurso.Nombre_corto = $("#rNombreCorto").val();
    if (recurso.Nombre_corto.length === 0) {
        listError += "<li><strong>Nombre corto del recurso</strong> está vacío.</li>";
    }
    if (recurso.Nombre_corto.length > 50) {
        listError += "<li><strong>Nombre corto</strong> del recurso no debe exceder los 50 caracteres.</li>";
    }

    recurso.Categoria = $("#rCategoria").val();
    if (recurso.Categoria == null || recurso.Categoria.length === 0) {
        listError += "<li><strong>Categoría</strong> está vacío.</li>";
    }
    recurso.Duracion = $("#rDuracion").val();
    if (recurso.Duracion == null || recurso.Duracion.length === 0) {
        listError += "<li><strong>Duracion</strong> está vacío.</li>";
    }
    recurso.Descripcion = $("#rDescripcion").val();
    if (recurso.Descripcion == null || recurso.Descripcion.length === 0) {
        // listError += "<li><strong>Descripción</strong> está vacío.</li>";
        $("#rDescripcion").val(" ")
    }
    recurso.Organizacion = $("#rOrganizacion").val();
    if (recurso.Organizacion == null || recurso.Organizacion.length === 0) {
        listError += "<li><strong>Organizacion</strong> está vacío.</li>";
    }
    var zip = $("#inputZip").val();
    if (zip.length === 0) {
        listError += "<li><strong>Recurso a subir</strong> está vacío.</li>";
    }
    var zip = $("#inputPortadaRecurso").val();
    if (zip.length === 0) {
        listError += "<li>No se seleccionó una <strong>Portada</strong>.</li>";
    }

    if (listError.length > 0) {
        var mensajeError = "<strong>Campos con problemas: </strong><ul>" + listError + "</ul>";
        $("#rError").html(mensajeError).removeClass('ocultar');

        cargador('oculta');
    } else {
        recurso.Id = IdRecurso;
        recurso.Visible = $("#rVisible").hasClass('active');
        Portada = URL_BASE + "recursos/" + IdRecurso + "/objeto_portada.jpg";
        recurso.Portada = Portada;
        elFileName = $("#inputZip").val().replace(/C:\\fakepath\\/i, '');
        // if (elFileName.substr(-4) === '.zip') {
        //     elFileName = 'index.html';
        // }
        // Liga = URL_BASE + "recursos/" + IdRecurso + "/" + elFileName;
        Liga = laLigaRecurso;
        recurso.Liga = Liga;
        fbSaveRecurso(recurso);
    }

}

function UpdateRecurso(laLigaRecurso) {
    console.log("[SaveRecurso]", laLigaRecurso);
    $("#erError").html("").addClass("ocultar");
    var listError = "";
    var recurso = {};
    recurso.Nombre = $("#erNombre").val();
    if (recurso.Nombre.length === 0) {
        listError += "<li><strong>Nombre del recurso</strong> está vacío.</li>";
    }
    recurso.Nombre_corto = $("#erNombreCorto").val();
    if (recurso.Nombre_corto.length === 0) {
        listError += "<li><strong>Nombre Corto </strong> del recurso está vacío.</li>";
    }
    recurso.Nombre_corto = $("#erNombreCorto").val();
    if (recurso.Nombre_corto.length > 50) {
        listError += "<li><strong>Nombre Corto </strong> del recurso está vacío debe ser menor a  50 caracteres.</li>";
    }


    recurso.Categoria = $("#erCategoria").val();
    if (recurso.Categoria.length === 0) {
        listError += "<li><strong>Categoría</strong> está vacío.</li>";
    }
    recurso.Duracion = $("#erDuracion").val();
    if (recurso.Duracion.length === 0) {
        listError += "<li><strong>Duracion</strong> está vacío.</li>";
    }
    recurso.Descripcion = $("#erDescripcion").val();
    if (recurso.Descripcion.length === 0) {
        // listError += "<li><strong>Descripción</strong> está vacío.</li>";
        $("#erDescripcion").val(" ")
    }
    recurso.Organizacion = $("#erOrganizacion").val();
    if (recurso.Organizacion.length === 0) {
        listError += "<li><strong>Organizacion</strong> está vacío.</li>";
    }
    if (listError.length > 0) {
        var mensajeError = "<strong>Campos con problemas: </strong><ul>" + listError + "</ul>";
        $("#erError").html(mensajeError).removeClass('ocultar');
    } else {
        recurso.Visible = $("#erVisible").hasClass('active');
        Portada = URL_BASE + "recursos/" + IdRecurso + "/objeto_portada.jpg";
        if (Portada.length !== 0) {
            recurso.Portada = Portada;
        }

        elFileName = $("#einputZip").val().replace(/C:\\fakepath\\/i, '');
        // if (elFileName.substr(-4) === '.zip') {
        //     elFileName = 'index.html';
        // }
        // Liga = URL_BASE + "recursos/" + IdRecurso + "/" + elFileName;
        Liga = laLigaRecurso;
        recurso.Liga = Liga;

        recurso.Id = $("#idRecursoEdit").val();
        fbUpdateRecurso(recurso);
    }

}


// var laUrlBase = '';

function fbSaveRecurso(recurso) {
    console.log('fbSaveRecurso', recurso);
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

        } else {
            // cleanUploadRecurso();
            // cuentaRecursos();
            $.notify({
                message: 'El recurso se agregó correctamente'
            }, {
                type: 'success',
                allow_dismiss: true,
                delay: 1500,
                allow_dismiss: false
            });
            console.log('Sincronización realizada.');
            cleanUploadRecurso();
            $("#modalAddRecurso .close").click();
            cuentaRecursos();
        }
    };

    if (revisaConexion) {
        var dataRef = firebase.database().ref(laUrlBase + 'Recursos'); //Obtengo nodo.
        var keyRecurso = dataRef.ref.child(recurso.Id); //Agrego recurso vacio con ID:recurso.Id .
        firebase.database().ref(keyRecurso).set(recurso, onComplete); //Reemplazo datos.
    }
}

function fbUpdateRecurso(recurso) {
    console.log('fbUpdateRecurso', recurso);
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

        } else {
            // _cleanUploadRecurso();
            // cuentaRecursos();
            $.notify({
                message: 'El recurso se actualizó correctamente'
            }, {
                type: 'success',
                allow_dismiss: true,
                delay: 1500,
                allow_dismiss: false
            });
            console.log('Sincronización realizada.');
            _cleanUploadRecurso();
            $("#emodalAddRecurso .close").click();
            cuentaRecursos();
        }
    };

    if (revisaConexion) {
        var dataRef = firebase.database().ref(laUrlBase + 'Recursos'); //Obtengo nodo.
        var keyRecurso = dataRef.ref.child(recurso.Id); //Agrego recurso vacio con ID:recurso.Id .
        firebase.database().ref(keyRecurso).set(recurso, onComplete); //Reemplazo datos.
    }

}


function fbSavePregunta(recurso) {
    console.log('fbSavePregunta', recurso);
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

        } else {
            // cleanUploadRecurso();
            // cuentaRecursos();
            $.notify({
                message: 'La pregunta se agregó correctamente'
            }, {
                type: 'success',
                allow_dismiss: true,
                delay: 1500,
                allow_dismiss: false
            });
            console.log('Sincronización realizada.');
            cleanUploadPregunta();
            $("#modalAddPregunta .close").click();
            cuentaRecursos();
        }
    };

    if (revisaConexion) {
        var dataRef = firebase.database().ref(laUrlBase + 'Recursos'); //Obtengo nodo.
        var keyRecurso = dataRef.ref.child(recurso.Id); //Agrego recurso vacio con ID:recurso.Id .
        firebase.database().ref(keyRecurso).set(recurso, onComplete); //Reemplazo datos.
    }
}


// Preguntas //

function abreModalPregunta(modo) {
    // console.log('abreModalPregunta', modo);

    if (modo == 'agregar') {
        $('#modalAddPreguntaTitulo').html('Crear Pregunta');
    }
    if (modo == 'editar') {
        $('#modalAddPreguntaTitulo').html('Editar Pregunta');
    }

}

function agregarPregunta() {
    console.log("[SavePregunta]", IdRecurso);

    cargador('muestra');

    if (IdRecurso.length === 0) {
        var recursoId = generarId();
        IdRecurso = "recurso_" + recursoId;
    }

    $("#rPregError").html("").addClass("ocultar");
    var listError = "";
    var recurso = {};

    recurso.Nombre = $("#rNombrePregunta").val();
    if (recurso.Nombre.length === 0) {
        listError += "<li><strong>Nombre de la pregunta</strong> está vacío.</li>";
    }
    recurso.Descripcion = $("#rDescripcionPregunta").val();
    if (recurso.Descripcion.length === 0) {
        // listError += "<li><strong>Descripción</strong> está vacío.</li>";
        $("#rDescripcionPregunta").val(" ")
    }
    recurso.Tipo = $("#tipoPregunta").val();
    if (recurso.Tipo === '0' || recurso.Tipo === null) {
        listError += "<li><strong>No se ha seleccionado un</strong> tipo de pregunta.</li>";
    }
    recurso.Pregunta = $("#rPregunta").val();
    if (recurso.Pregunta.length === 0) {
        listError += "<li><strong>El campo Pregunta</strong> está vacío.</li>";
    }
    recurso.Respuesta1 = $("#rRespuesta1").val();
    if (recurso.Respuesta1 == null || recurso.Respuesta1.length === 0) {
        listError += "<li><strong>El campo de Respuesta 1</strong> está vacío.</li>";
    }
    recurso.Respuesta2 = $("#rRespuesta2").val();
    if (recurso.Respuesta2 == null || recurso.Respuesta2.length === 0) {
        listError += "<li><strong>El campo de Respuesta 2</strong> está vacío.</li>";
    }
    recurso.Respuesta3 = $("#rRespuesta3").val();
    if (recurso.Respuesta3 == null || recurso.Respuesta3.length === 0) {
        listError += "<li><strong>El campo de Respuesta 3</strong> está vacío.</li>";
    }
    recurso.Correcta = laOpcionCorrecta;
    if (recurso.Correcta == null || recurso.Correcta.length === 0) {
        listError += "<li><strong>El campo de Correcta</strong> está vacío.</li>";
    }
    recurso.RetroBien = $("#rRetroBien").val();
    if (recurso.RetroBien == null || recurso.RetroBien.length === 0) {
        listError += "<li><strong>El campo de Retroalimentación</strong> está vacío.</li>";
    }
    recurso.RetroMal = $("#rRetroMal").val();
    if (recurso.RetroMal == null || recurso.RetroMal.length === 0) {
        listError += "<li><strong>El campo de Retroalimentación</strong> está vacío.</li>";
    }

    if (listError.length > 0) {
        var mensajeError = "<strong>Campos con problemas: </strong><ul>" + listError + "</ul>";
        $("#rPregError").html(mensajeError).removeClass('ocultar');

        cargador('oculta');
    } else {
        recurso.Id = IdRecurso;
        recurso.Categoria = 'Pregunta';
        recurso.Visible = true;
        Portada = URL_BASE + "img/pregunta_portada.png";
        recurso.Portada = Portada;

        fbSavePregunta(recurso);
    }

}


function cargarTipoPreguntas() {
    $.getJSON("data/preguntas.json", function(result) {
        var options = "";
        $.each(result, function(i, preguntas) {
            if (preguntas.tipo === "Selecciona una opción") {
                options += "<option value='" + i + "' selected disabled>" + preguntas.tipo + "</option>";
            } else {
                options += "<option value='" + i + "'>" + preguntas.tipo + "</option>";
            }

        });
        $("#tipoPregunta").html(options);
        $("#_tipoPregunta").html(options);
    }).done(function() {
        // TODO agregar más tipos
        // $("#tipoPregunta").val('1').attr('disabled', true);
    });


}

// Preguntas //


function cuentaRecursos() {
    console.log('cuentaRecursos');

    cuantosRecursosVisibles = 0;

    if (revisaConexion) {
        firebase.database().ref(laUrlBase + 'Recursos/' + elCurso).once('value').then(function(snapshot) {
            if (snapshot.val() != null) {
                var contadorRecursos = 0;
                var contadorRecursosVisbles = 0;
                cuantosRecursos = snapshot.numChildren();
                console.log('cuantosRecursos', cuantosRecursos);

                snapshot.forEach(function(childSnapshot) {
                    contadorRecursos++;
                    // console.log('%c losRecursos', 'color: orange; font-weight:900;', childSnapshot.val());

                    this['recursoId' + contadorRecursos] = snapshot.child(childSnapshot.key).child('Id').val();
                    console.log('recursoId' + contadorRecursos + ': ', this['recursoId' + contadorRecursos]);
                    this['recursoNombre' + contadorRecursos] = snapshot.child(childSnapshot.key).child('Nombre').val();
                    // console.log('recurso ' + contadorRecursos + ': ', this['recursoNombre' + contadorRecursos]);
                    this['recursoVisible' + contadorRecursos] = snapshot.child(childSnapshot.key).child('Visible').val();
                    // console.log('recurso ' + contadorRecursos + ': ', this['recursoVisible' + contadorRecursos]);
                    //if (this['recursoVisible' + contadorRecursos] == true) {
                    contadorRecursosVisbles++;
                    //};
                    this['recursoCategoria' + contadorRecursos] = snapshot.child(childSnapshot.key).child('Categoria').val();
                    // console.log('recurso ' + contadorRecursos + ': ', this['recursoCategoria' + contadorRecursos]);
                    this['recursoOrganizacion' + contadorRecursos] = snapshot.child(childSnapshot.key).child('Organizacion').val();
                    // console.log('recurso ' + contadorRecursos + ': ', this['recursoOrganizacion' + contadorRecursos]);
                    this['recursoDesc' + contadorRecursos] = snapshot.child(childSnapshot.key).child('Descripcion').val();
                    // console.log('Descripcion del recurso: ', this['recursoDesc' + contadorRecursos]);
                    this['recursoDuracion' + contadorRecursos] = snapshot.child(childSnapshot.key).child('Duracion').val();
                    // console.log('Duración del recurso: ', this['recursoDuracion' + contadorRecursos]);
                    // this['cursoObj' + contadorRecursos] = snapshot.child(childSnapshot.key).child('Objetivos').val();
                    // console.log('Objetivos del recurso: ', this['cursoObj' + contadorRecursos]);
                    // this['cursoTemario' + contadorRecursos] = snapshot.child(childSnapshot.key).child('Temario').val();
                    // console.log('Temario del recurso: ', this['cursoTemario' + contadorRecursos]);
                    this['recursoLiga' + contadorRecursos] = snapshot.child(childSnapshot.key).child('Liga').val();
                    // console.log('Liga del recurso: ', this['recursoLiga' + contadorRecursos]);
                    this['recursoPortada' + contadorRecursos] = snapshot.child(childSnapshot.key).child('Portada').val();
                    // console.log('Portada del recurso: ', this['recursoPortada' + contadorRecursos]);

                    // Pregunta
                    if (this['recursoCategoria' + contadorRecursos] == 'Pregunta') {
                        this['recursoPregunta' + contadorRecursos] = snapshot.child(childSnapshot.key).child('Pregunta').val();
                        console.log('Pregunta: ', this['recursoPregunta' + contadorRecursos]);
                        this['recursoRespuesta1' + contadorRecursos] = snapshot.child(childSnapshot.key).child('Respuesta1').val();
                        console.log('Respuesta 1: ', this['recursoRespuesta1' + contadorRecursos]);
                        this['recursoRespuesta2' + contadorRecursos] = snapshot.child(childSnapshot.key).child('Respuesta2').val();
                        console.log('Respuesta 2: ', this['recursoRespuesta2' + contadorRecursos]);
                        this['recursoRespuesta3' + contadorRecursos] = snapshot.child(childSnapshot.key).child('Respuesta3').val();
                        console.log('Respuesta 3: ', this['recursoRespuesta3' + contadorRecursos]);
                        this['recursoCorrecta' + contadorRecursos] = snapshot.child(childSnapshot.key).child('Correcta').val();
                        console.log('Correcta: ', this['recursoCorrecta' + contadorRecursos]);
                        this['recursoRetroBien' + contadorRecursos] = snapshot.child(childSnapshot.key).child('RetroBien').val();
                        console.log('RetroBien: ', this['recursoRetroBien' + contadorRecursos]);
                        this['recursoRetroMal' + contadorRecursos] = snapshot.child(childSnapshot.key).child('RetroMal').val();
                        console.log('RetroMal: ', this['recursoRetroMal' + contadorRecursos]);
                    }

                    that = this;
                    cuantosRecursos = contadorRecursos;
                    cuantosRecursosVisibles = contadorRecursosVisbles;
                    leeEstatusRecurso(contadorRecursos);

                });

                // losRecursos = snapshot.val();
                // console.log('%c losRecursos', 'color: orange; font-weight:900;', losRecursos);

                return pintaCategorias().then(function() {
                    pintaRecursos().then(function() {
                        activaBotonesCategprias().then(function() {
                            activaLanzarRecursos().then(function() {
                                cargador('oculta');
                            });
                        });
                    });
                });

            } else {
                return pintaCategorias().then(function() {
                    pintaRecursos().then(function() {
                        activaBotonesCategprias().then(function() {
                            activaLanzarRecursos().then(function() {
                                cargador('oculta');
                            });
                        });
                    });
                });
            }
        });
    };
};



function leeEstatusRecurso(estatusNo) {
    if (revisaConexion) {

        var elRefRevisado = laUrlBase + 'Lecciones/leccion_zzz/usuarios/' + usuarioId + '/recurso_' + that['CursoId' + estatusNo];
        // console.log('elRefRevisado', elRefRevisado);
        // var contador = 0;

        firebase.database().ref(elRefRevisado).once('value').then(function(snapshot) {
            if (snapshot.val() != null) {

                var cursoRevisado = snapshot.child('Revisado').val();
                console.log('Curso Revisado: ', cursoRevisado);

                if (cursoRevisado == true) {
                    $('#estatus_curso' + estatusNo + ' > i').addClass('nc-icon-outline arrows-1_minimal-down');
                }
            }
        });

    }
}


function pintaCategorias() {

    var contenidoCategorias = '';
    $('#categorias').empty();

    var arrayCategoriasPrev = new Array();
    for (a = 1; a <= cuantosRecursosVisibles; a++) {
        arrayCategoriasPrev.push(that['recursoCategoria' + a]);
    }
    // console.log('arrayCategoriasPrev', arrayCategoriasPrev);

    function unique(arrayCategoriasPrev) {
        return $.grep(arrayCategoriasPrev, function(el, index) {
            return index == $.inArray(el, arrayCategoriasPrev);
        });
    }
    arrayCategorias = unique(arrayCategoriasPrev);
    // console.log('arrayCategorias', arrayCategorias);
    cuantasCategorias = arrayCategorias.length;
    console.log('cuantasCategorias', cuantasCategorias);

    for (a = 1; a <= cuantasCategorias; a++) {
        contenidoCategorias += '<div class="categoria">';
        contenidoCategorias += arrayCategorias[(a - 1)];
        contenidoCategorias += '<div  id="botonCategoria' + a + '" class="btn btn-sm btn-toggle btn-categoria active" data-toggle="button">';
        contenidoCategorias += '<div class="handle"></div>';
        contenidoCategorias += '</div>';
        contenidoCategorias += '</div>';
    }

    $('#categorias').append(contenidoCategorias);

    return $.ajax();
}


function pintaRecursos() {

    var anchoColumnas = 6;
    if (cuantosRecursosVisibles >= 3) {
        anchoColumnas = 4;
    }
    var contenidoSecCursos = '';
    $('.recursos_int').empty();

    // Agregar Recurso // <input type="file" accept="image/x-png,image/jpeg">
    /*contenidoSecCursos += '<label class="btn btn-primary btn-round" style="float: right; margin-top: -50px;">Agregar Recurso';
    contenidoSecCursos += '<input id="inputUploadResource" type="file" accept=".zip" style="display: none;">';
    contenidoSecCursos += '</label>';*/
    // Agregar Recurso //


    contenidoSecCursos += '<label class="btn btn-primary btn-round botonAgregar" style="float: right; margin-top: -50px;" onClick="abreMenuRecursos()"><i class="nc-icon-glyph ui-1_bold-add"></i>&nbsp; Agregar Objeto';
    // contenidoSecCursos += '<button  type="file" accept=".zip,.pdf,.ppt,.pptx,video/*" style="display: none;" data-toggle="modal" data-target="#modalAddRecurso"></button>';
    // contenidoSecCursos += '<button    style="display: none;" onClick="abreMenuRecursos()"></button>';
    contenidoSecCursos += '</label>';


    contenidoSecCursos += '<div class="pull-right">';
    contenidoSecCursos += '<div id="menu_add_recurso" class="ui vertical menu menu_sesiones" style="display: none; position: absolute; z-index: 99; margin-left: -210px; margin-top: -5px;">';
    contenidoSecCursos += '<a class="item boton_gris1_alt" data-toggle="modal" data-target="#modalAddRecurso">';
    contenidoSecCursos += '<h4 class="ui header" style="margin-bottom: 20px;">Subir Objeto<i class="nc-icon-glyph arrows-2_file-upload-93 pull-right"></i></h4>';
    contenidoSecCursos += '<p>Se sube un objeto a la librería de Objetos de Aprendizaje.</p>';
    contenidoSecCursos += '</a>';
    contenidoSecCursos += '<a class="item boton_gris2_alt" data-toggle="modal" data-target="#modalAddPregunta" onClick="abreModalPregunta(' + "'agregar'" + ')">';
    contenidoSecCursos += '<h4 class="ui header" style="margin-bottom: 20px;">Crear Pregunta<i class="nc-icon-glyph design_pen-01 pull-right"></i></h4>';
    contenidoSecCursos += '<p>Se crea una pregunta para ser utilizada en la librería de Objetos de Aprendizaje.</p>';
    contenidoSecCursos += '</a>';
    contenidoSecCursos += '</div>';
    contenidoSecCursos += '</div>';


    for (a = 1; a <= cuantasCategorias; a++) {
        this['cuantosElemPorCategoria' + a] = 0;

        contenidoSecCursos += '<div id="grupoCategoria' + a + '" class="grupo_categoria">';
        contenidoSecCursos += '<p class="titulo_categoria">' + arrayCategorias[(a - 1)] + ' </p>';

        contenidoSecCursos += '<div class="row">';
        contenidoSecCursos += '<div class="col-md-10 ml-auto mr-auto">';
        contenidoSecCursos += '<div class="row">';


        for (b = 1; b <= cuantosRecursosVisibles; b++) {

            if (that['recursoCategoria' + b] == arrayCategorias[(a - 1)]) {
                this['cuantosElemPorCategoria' + a]++;

                var noCache = generarId();

                contenidoSecCursos += '<div class="col-md-' + anchoColumnas + '">';
                contenidoSecCursos += '<div id="tarjeta' + b + '" class="card">';
                contenidoSecCursos += '<img class="card-img portada_recurso" src="' + this['recursoPortada' + b] + '?' + noCache + '"></img>';

                contenidoSecCursos += '<div class="card-body">';
                contenidoSecCursos += '<h6 class="category text-danger">' + this['recursoCategoria' + b] + '</h6>';
                contenidoSecCursos += '<h5 id="curso_titulo' + b + '" class="curso_titulo card-title">' + this['recursoNombre' + b] + '</h5>';

                contenidoSecCursos += '<div class="card-desc">';
                if (this['recursoDuracion' + b]) {
                    contenidoSecCursos += '<p class="card-text" ><b>Duración: </b><br>' + this['recursoDuracion' + b] + ' minutos</p>';
                }
                contenidoSecCursos += '<p class="card-text" ><b>Descripción: </b><br>' + this['recursoDesc' + b] + '</p>';
                // contenidoSecCursos += '<p class="card-text" ><b>Categoria: </b><br>' + this['recursoCategoria' + b] + '</p>';
                if (this['recursoOrganizacion' + b]) {
                    contenidoSecCursos += '<p class="card-text" ><b>Organizacion: </b><br>' + this['recursoOrganizacion' + b] + '</p>';
                }
                contenidoSecCursos += '</div>';

                contenidoSecCursos += '<div class="mdl-card__actions mdl-card--border">';
                contenidoSecCursos += '<div class="card-botones">';

                if (this['recursoCategoria' + b] == 'Pregunta') {
                    contenidoSecCursos += '<div id="botonVerPregunta' + b + '" class="btn btn-sm btn-round botonVerPregunta" data-toggle="modal" data-target="#modalVerPregunta"><i class="nc-icon-glyph education_glasses"></i>&nbsp; Ver</div>';
                } else {
                    contenidoSecCursos += '<div id="botonVerObjeto' + b + '" class="btn btn-sm btn-round botonVerObjeto" data-toggle="modal" data-target="#modalVerObjeto"><i class="nc-icon-glyph education_glasses"></i>&nbsp; Ver</div>'; //Boton LANZAR
                }

                if (this['recursoCategoria' + b] == 'Pregunta') {
                    contenidoSecCursos += '<div id="botonEditarP' + b + '" class="btn btn-sm btn-round botonEditar" onclick="loadEditarPregunta(this)" data-toggle="modal" data-target="#modalAddPregunta"><i class="nc-icon-glyph ui-1_pencil"></i>&nbsp; Editar</div>';
                } else {
                    contenidoSecCursos += '<div id="botonEditarR' + b + '" class="btn btn-sm btn-round botonEditar" onclick="loadEditarRecurso(this)" data-toggle="modal" data-target="#emodalAddRecurso"><i class="nc-icon-glyph ui-1_pencil"></i>&nbsp; Editar</div>';
                }

                contenidoSecCursos += '<div id="btnEliminar' + b + '" class="btn btn-sm btn-round botonEliminar" onclick="eliminarRecurso(this)" ><i class="nc-icon-glyph ui-1_trash-simple"></i>&nbsp; Eliminar</div>';
                // contenidoSecCursos += '<div id="botonAsignar' + b + '" class="btn btn-sm btn-round botonAsignar">Asignar</div>';
                contenidoSecCursos += '<div id="botonMasInfo' + b + '" class="btn btn-sm btn-round botonMasInfo">Más info <i class="nc-icon-outline arrows-1_minimal-down" style="margin-left: 5px;"></i></div>';
                contenidoSecCursos += '</div>';

                contenidoSecCursos += '</div>';
                contenidoSecCursos += '</div>';
                contenidoSecCursos += '</div>';
                contenidoSecCursos += '</div>';
            };

        };

        contenidoSecCursos += '</div>';
        contenidoSecCursos += '</div>';
        contenidoSecCursos += '</div>';
        contenidoSecCursos += '</div>';

        console.log(arrayCategorias[(a - 1)], this['cuantosElemPorCategoria' + a]);
    };


    $('.recursos_int').append(contenidoSecCursos);
    $('#subtituloSeccion').html('<a  >' + cuantosRecursosVisibles + '</a> objetos en total');

    return $.ajax();

}

function fbEliminarRecurso(key) {

    var onComplete = function(error) {
        if (error) {
            $.notify({
                // options
                message: 'Ocurrió un error en la sincronización.'
            }, {
                // settings
                type: 'danger',
                allow_dismiss: true,
                delay: 1500,
                allow_dismiss: false,
            });
            console.log('Ocurrió un error en la sincronización.');
        } else {
            cuentaRecursos();
            var parametros = {
                CODE: 'delete',
                archivo: key
            };
            console.log("[ELIMINAR ARCHIVO]");
            console.log(parametros);
            $.post("php/rmdir.php", parametros);

            $.notify({
                // options
                message: 'El recurso se borró correctamente'
            }, {
                // settings
                type: 'info',
                allow_dismiss: true,
                delay: 1500,
                allow_dismiss: false,
            });
            setTimeout(cuentaRecursos(), 100);
            console.log('Sincronización realizada.');
        };
    };
    if (revisaConexion) {
        firebase.database().ref().child('Recursos/' + key).remove(onComplete);
        pintaCategorias();
    }
}


function eliminarRecurso(A) {
    console.log("Click Eliminar aquí: ");
    var idCompuesto = A.id;
    var ID = idCompuesto.replace("btnEliminar", "");
    var key = that['recursoId' + ID];
    console.log(key);
    $('#modalBorrarRecurso').modal({
        transition: 'scale'
    }).modal('show');
    $(document).off('click', '#botonCancelarBorrarRecurso').on('click', '#botonCancelarBorrarRecurso', function(e) {
        console.log("Cancelar Borrar Recurso");
    });
    $(document).off('click', '#botonAceptarBorrarRecurso').on('click', '#botonAceptarBorrarRecurso', function(e) {
        console.log("Aceptar Borrar Recurso");
        fbEliminarRecurso(key);
    });


}

function loadEditarRecurso(A) {
    console.log('loadEditarRecurso', A.id.replace("botonEditarR", ""));

    _cleanUploadRecurso();
    var noCache = generarId();
    console.log("Click Editar aquí: ");
    var idCompuesto = A.id;
    var ID = idCompuesto.replace("botonEditarR", "");
    var key = that['recursoId' + ID];
    elRecursoId = that['recursoId' + ID];
    console.log("ID Recurso a Editar: ");
    console.log(key);

    if (revisaConexion) {
        firebase.database().ref(laUrlBase + 'Recursos/' + key).once('value').then(function(snapshot) {
            if (snapshot.val() != null) {
                var R = snapshot.val();
                console.log('Recurso a Editar');
                console.log(R);

                IdRecurso = R.Id;
                $("#idRecursoEdit").val(R.Id);
                $("#erError").html("").addClass("ocultar");
                $("#erNombre").val(R.Nombre);
                $("#erNombreCorto").val(R.Nombre_corto);
                $("#erCategoria").val(R.Categoria);
                $("#erDuracion").val(R.Duracion);
                $("#erOrganizacion").val(R.Organizacion);
                $("#erDescripcion").val(R.Descripcion);
                Portada = R.Portada;
                Liga = R.Liga;
                $("#ocultaPortada").val(R.Portada);


                $("#eimgPortadaRecursoPreview").attr("src", R.Portada + '?' + noCache);
                if (R.Visible) {
                    $("#erVisible").addClass('active');
                } else {
                    $("#erVisible").removeClass('active');
                }

                $("#einputZip").val(null);
                $("#einputPortadaRecurso").val(null);

                cambiaAttrInput(R.Categoria);

                // $('#erecursoNombreSi').show();
                // $('#erecursoNombreTexto').html((R.Liga.substr(R.Liga.lastIndexOf('/') + 1)));

                // $(document).off('click', '#erecursoNombreTexto').on('click', '#erecursoNombreTexto', function(e) {
                //     window.open(R.Liga);
                // });

            }
        });
    }
}


function loadEditarPregunta(A) {
    console.log('loadEditarPregunta', A.id.replace("botonEditarP", ""));

    cleanUploadPregunta();
    var noCache = generarId();
    console.log("Click Editar aquí: ");
    var idCompuesto = A.id;
    var ID = idCompuesto.replace("botonEditarP", "");
    var key = that['recursoId' + ID];
    elRecursoId = that['recursoId' + ID];
    console.log("ID Recurso a Editar: ");
    console.log(key);

    if (revisaConexion) {
        firebase.database().ref(laUrlBase + 'Recursos/' + key).once('value').then(function(snapshot) {
            if (snapshot.val() != null) {
                var R = snapshot.val();
                console.log('Pregunta a Editar');
                console.log(R);

                IdRecurso = R.Id;
                $("#idRecursoEdit").val(R.Id);
                $("#erError").html("").addClass("ocultar");
                // $("#erNombreCorto").val(R.Nombre_corto);
                $("#tipoPregunta").val(R.Tipo);
                $("#rNombrePregunta").val(R.Nombre);
                $("#rDescripcionPregunta").val(R.Descripcion);

                $("#rPregunta").val(R.Pregunta);
                $("#rRespuesta1").val(R.Respuesta1);
                $("#rRespuesta2").val(R.Respuesta2);
                $("#rRespuesta3").val(R.Respuesta3);
                $("#correcta" + R.Correcta).prop('checked', true);
                laOpcionCorrecta = R.Correcta;

                $("#rRetroBien").val(R.RetroBien);
                $("#rRetroMal").val(R.RetroMal);

            }
        });
    }

    // laCategoria = that['recursoCategoria' + ID];
    // if (laCategoria != 'Pregunta') {
    // } else {
    abreModalPregunta('editar');
    // }
}


function cambiaAttrInput(cualVal) {
    console.log('cambiaAttrInput', cualVal);

    switch (cualVal) {
        case 'Audio':
            $("#inputZip, #einputZip").removeAttr('accept');
            $("#inputZip, #einputZip").attr('accept', 'audio/*');
            break;
        case 'Empaquetado':
            $("#inputZip, #einputZip").removeAttr('accept');
            $("#inputZip, #einputZip").attr('accept', '.zip');
            break;
        case 'HTML':
            $("#inputZip, #einputZip").removeAttr('accept');
            $("#inputZip, #einputZip").attr('accept', '.html,.zip');
            break;
        case 'Imagen':
            $("#inputZip, #einputZip").removeAttr('accept');
            $("#inputZip, #einputZip").attr('accept', '.jpg,.jpeg,.png');
            break;
        case 'PDF':
            $("#inputZip, #einputZip").removeAttr('accept');
            $("#inputZip, #einputZip").attr('accept', '.pdf');
            break;
        case 'PowerPoint':
            $("#inputZip, #einputZip").removeAttr('accept');
            $("#inputZip, #einputZip").attr('accept', '.ppt,.pptx');
            break;
        case 'Video':
            $("#inputZip, #einputZip").removeAttr('accept');
            $("#inputZip, #einputZip").attr('accept', 'video/*');
            break;
        case 'Word':
            $("#inputZip, #einputZip").removeAttr('accept');
            $("#inputZip, #einputZip").attr('accept', '.doc,.docx');
            break;
        case 'todos':
            $("#inputZip, #einputZip").removeAttr('accept');
            $("#inputZip, #einputZip").attr('accept', '.zip,.html,.pdf,.doc,.docx,.ppt,.pptx,audio/*,.jpg,.jpeg,.png,video/*');
            break;
        default:
            $("#inputZip, #einputZip").removeAttr('accept');
            $("#inputZip, #einputZip").attr('accept', '.zip,.html,.pdf,.doc,.docx,.ppt,.pptx,audio/*,.jpg,.jpeg,.png,video/*');
            break;
    }
}


function activaBotonesCategprias() {

    for (a = 1; a <= cuantasCategorias; a++) {
        $("#botonCategoria" + a).click(function(event) {
            event.preventDefault();
            var cualCategoria = $(this).attr('id').substr(14, 3);
            $('#grupoCategoria' + cualCategoria).slideToggle();
        });
    }

    return $.ajax();
}


function activaLanzarRecursos() {

    for (a = 1; a <= cuantosRecursosVisibles; a++) {
        this['carta_abierta' + a] = false;
        var that = this;

        $("#botonMasInfo" + a).click(function(event) {
            event.preventDefault();
            var cualCard = $(this).attr('id').substr(12, 3);
            $('#tarjeta' + cualCard).find('.card-desc').slideToggle();
            if (that['carta_abierta' + cualCard] == false) {
                $(this).html('Menos info <i class="nc-icon-outline arrows-1_minimal-up" style="margin-left: 5px;"></i>');
                that['carta_abierta' + cualCard] = true;
            } else {
                $(this).html('Más info <i class="nc-icon-outline arrows-1_minimal-down" style="margin-left: 5px;"></i>');
                that['carta_abierta' + cualCard] = false;
            }
        });
    }

    // for (a = 1; a <= cuantosRecursosVisibles; a++) {
    //     $(document).off('click', '#botonIniciarCurso' + a).on('click', '#botonIniciarCurso' + a, function(event) {
    //         event.preventDefault();
    //         elContenido = $(this).attr('id').substr(17, 3);
    //         // console.log('elContenido', elContenido);
    //         window.open(that['recursoLiga' + elContenido]);
    //         // lanzaContenidoVisualizar(elContenido);
    //     });
    // }

    $(".botonVerObjeto").click(function(event) {
        event.preventDefault();
        var _Pos = $(this).attr('id').indexOf('_');
        var cualRecurso = $(this).attr('id').substr(14, $(this).attr('id').length - (_Pos + 1));

        console.log('botonVerObjeto', cualRecurso);
        ////////////////
        lanzaObjetoVisualizar(cualRecurso);
        ////////////////
    });

    $(".botonVerPregunta").click(function(event) {
        event.preventDefault();
        var _Pos = $(this).attr('id').indexOf('_');
        var cualRecurso = $(this).attr('id').substr(16, $(this).attr('id').length - (_Pos + 1));

        console.log('botonVerPregunta', cualRecurso);
        ////////////////
        lanzaObjetoVisualizar(cualRecurso);
        ////////////////
    });


    return $.ajax();
}


// menús verticales //
function abreMenuRecursos() {
    $('#menu_add_recurso').fadeIn('fast');
}

function cierraMenuRecursos() {
    $(".menu_recursos").fadeOut('fast');
}

$(document).on('mouseup', 'body *', function(e) {
    if (!$(".menu_recursos").is(e.target) && !$('.btn-menu_neutral').is(e.target)) {
        cierraMenuRecursos();
    }
    if (!$(".menu_recursos").is(e.target) && !$('.btn-menu_blanco').is(e.target)) {
        cierraMenuRecursos();
    }
});
// menús verticales //


function lanzaObjetoVisualizar(cualContenido) {
    console.log('cualContenido', cualContenido);

    $("#modalVerObjeto_body").empty();
    var elContenido = '';
    // elContenidoLanzado = true;

    var laLiga = that['recursoLiga' + cualContenido];
    console.log('laLiga', laLiga);
    console.log('Categoria', that['recursoCategoria' + cualContenido]);

    switch (that['recursoCategoria' + cualContenido]) {

        case 'Pregunta':

            $("#preguntaTitulo").text(that['recursoNombre' + cualContenido]);
            $("#vDescripcionPregunta").text(that['recursoDesc' + cualContenido]);
            $("#vPregunta").text(that['recursoPregunta' + cualContenido]);
            $("#vRespuesta1").text(that['recursoRespuesta1' + cualContenido]);
            $("#vRespuesta2").text(that['recursoRespuesta2' + cualContenido]);
            $("#vRespuesta3").text(that['recursoRespuesta3' + cualContenido]);
            $("#vRetroBien").text(that['recursoRetroBien' + cualContenido]);
            $("#vRetroMal").text(that['recursoRetroMal' + cualContenido]);

            $("#vRespuesta1, #vRespuesta2, #vRespuesta3").removeClass('pregunta_resp_correcta');
            $("#vRespuesta" + that['recursoCorrecta' + cualContenido]).addClass('pregunta_resp_correcta');

            break;


        case 'Empaquetado':

            $("#modalVerObjeto_body").html('<iframe name="curso" id="curso" src="' + laLiga + '" frameborder="0" scrolling="yes" border="0" style="display: block; height: 100vh; width: 100vw; width:100%; height:100%;"></iframe>');

            break;


        case 'Audio':

            setTimeout(function() {
                elContenido += '<div name="curso" id="curso" style="width:100%; height:100%; background-color: #000000;">';
                elContenido += '<audio id="elAudio" style="display: flex; width:50%; height:50%; margin-left: auto; margin-right: auto;" autobuffer controls autoplay controlsList="nodownload">';
                elContenido += '<source src="' + laLiga + '" type="audio/mpeg" />';
                elContenido += '</audio>';
                elContenido += '</div>';

                $("#modalVerObjeto_body").html(elContenido);
            }, 500);

            break;



        case 'Imagen':

            $("#modalVerObjeto_body").html('<iframe name="curso" id="curso" src="' + laLiga + '" frameborder="0" scrolling="yes" border="0" style="display: block; height: 100vh; width: 100vw; width:100%; height:100%;"></iframe>');

            // elContenido += '<div name="curso" id="curso" style="width:100%; height:100%; overflow: scroll;">';
            // elContenido += '<img id="laImagen" src="' + laLiga + '">';
            // elContenido += '</div>';

            break;



        case 'PDF':

            elContenido += '<div name="curso" id="curso" style="width:100%; height:100%;">';
            elContenido += '<embed src="' + laLiga + '" width="100%" height="100%"></embed>';
            // elContenido += '<object src="' + laLiga + '" width="100%" height="100%"></object>';
            elContenido += '</div>';

            $("#modalVerObjeto_body").html(elContenido);

            break;



        case 'Video':

            // $("#modalVerObjeto_body").html('<iframe name="curso" id="curso" src="' + laLiga + '" frameborder="0" scrolling="yes" border="0" style="display: block; height: 100vh; width: 100vw; width:100%; height:100%;"></iframe>');

            elContenido += '<div name="curso" id="curso" style="background-color: #000000;">';
            elContenido += '<video id="elVideo" style="width:100%; height:100%;" autobuffer controls autoplay controlsList="nodownload">';
            elContenido += '<source src="' + laLiga + '" type="video/mp4" />';
            elContenido += '</video>';
            elContenido += '</div>';

            $("#modalVerObjeto_body").html(elContenido);

            setTimeout(function() {
                ajustaEscalaContenidoInst();
            }, 500);

            break;



        case 'Word':

            $("#modalVerObjeto_body").html('<iframe name="curso" id="curso" src="https://docs.google.com/gview?url=' + laLiga + '&embedded=true" frameborder="0" scrolling="yes" border="0" style="display: block; height: 100vh; width: 100vw; width:100%; height:100%;"></iframe>');

            // elContenido += '<div name="curso" id="curso" style="width:100%; height:100%;">';
            // elContenido += '<img  id="laImagen" src="' + laLiga + '">';
            // elContenido += '</div>';

            break;



        case 'PowerPoint':

            $("#modalVerObjeto_body").html('<iframe name="curso" id="curso" src="https://docs.google.com/gview?url=' + laLiga + '&embedded=true" frameborder="0" scrolling="yes" border="0" style="display: block; height: 100vh; width: 100vw; width:100%; height:100%;"></iframe>');

            // elContenido += '<div name="curso" id="curso" style="width:100%; height:100%;">';
            // elContenido += '<img  id="laImagen" src="' + laLiga + '">';
            // elContenido += '</div>';

            break;



        default:
            break;


    }

    $("#objetoTitulo").text(that['recursoNombre' + cualContenido]);


    ///////////////////////
    ajustaEscalaContenidoVer();
    setTimeout(function() {
        detectaUnloadVerRec();
    }, 300);

}



function cierraContenido() {

    registraRevisado();
    elContenidoLanzado = false;

    habilitaBoton($('#botonCerrar'), true);
    $("#content").empty();
    $('#barra_player').hide();
    $('.main-panel').removeClass('main-panel_100');
    $('.panel-header, .sidebar, .navbar-toggler').show();
    $('.panel-header').css({
        'width': '100%'
    });
    ajustaEscalaContenido();

    navega('recursos');
}



function detectaUnloadVerRec() {

    $('#modalVerObjeto').on('hide.bs.modal', function() {
        $("#modalVerObjeto_body").empty();
    });

    // if (elContenidoLanzado == true) {
    //     $("#content").bind('DOMNodeRemoved', function(event) {
    //         console.log('unload!');

    //         registraRevisado();
    //         elContenidoLanzado = false;
    //         habilitaBoton($('#botonCerrar'), true);
    //         $('#barra_player').hide();
    //         $('.panel-header').show();
    //         ajustaEscalaContenido();
    //         $("#content").unbind();
    //     });
    // }
}


function ajustaEscalaContenidoVer() {

    elAncho = $(window).width();
    elAlto = $(window).height();
    // console.log('elAncho', elAncho, 'y elAlto', elAlto);

    // if (elContenidoLanzado == true) {
    $("#modalVerObjetoContent").css({
        'height': (elAlto - 50) + 'px',
        'width': (elAncho - 50) + 'px'
    });
    $("#modalVerObjetoDialog").css({
        'margin-left': '30px'
    });
    // }

    $("#elVideo").css({
        'height': (elAlto - 165) + 'px',
        'width': (elAncho - 80) + 'px'
    });

}

function ajustaEscalaContenido() {

    elAlto = $(window).height();
    elAncho = $(window).width();

    if (elContenidoLanzado == true) {
        $("#content").css({
            'height': (elAlto - 18) + 'px'
            // 'width': elAncho + 'px'
        });
        $("#contenido").css({
            'padding': '0px',
            'margin-top': '125px'
        });
    } else {
        $("#content").css({
            'height': '0px'
            // 'width': elAncho + 'px'
        });
        $("#contenido").css({
            'padding': '30px',
            'margin-top': '0px'
        });
    }

}


$(window).resize(function() {

    ajustaEscalaContenidoVer();

});
