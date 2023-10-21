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


    $("#rCategoria, #erCategoria").change(function() {
        if ($(this).val() != 'Selecciona una opción') {
            cambiaAttrInput($(this).val());
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


    $("#buscadorClean").click(function(e) {
        e.preventDefault();
        $("#buscadorRecursos").val('');
        $("#buscadorRecursos").keyup();
    });

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



function cuentaRecursos() {
    console.log('cuentaRecursos');

    cuantosRecursosVisibles = 0;

    if (revisaConexion) {
        firebase.database().ref(laUrlBase + 'Recursos/' + elCurso).once('value').then(function(snapshot) {
            if (snapshot.val() != null) {
                var contadorRecursos = 0;
                var contadorRecursosVisbles = 0;
                // cuantosRecursos = snapshot.numChildren();
                // console.log('cuantosRecursos', cuantosRecursos);

                snapshot.forEach(function(childSnapshot) {
                    if (childSnapshot.key != undefined && childSnapshot.key != null && childSnapshot.key != '' && childSnapshot.key != 'undefined' && childSnapshot.key != 'val') {
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
                        this['recursoDesc' + contadorRecursos] = snapshot.child(childSnapshot.key).child('Descripcion').val();
                        // console.log('Descripcion del recurso: ', this['recursoDesc' + contadorRecursos]);
                        this['recursoDuracion' + contadorRecursos] = snapshot.child(childSnapshot.key).child('Duracion').val();
                        // console.log('Duración del recurso: ', this['recursoDuracion' + contadorRecursos]);
                        this['recursoLiga' + contadorRecursos] = snapshot.child(childSnapshot.key).child('Liga').val();
                        // console.log('Liga del recurso: ', this['recursoLiga' + contadorRecursos]);
                        this['recursoPortada' + contadorRecursos] = snapshot.child(childSnapshot.key).child('Portada').val();
                        // console.log('Portada del recurso: ', this['recursoPortada' + contadorRecursos]);

                        that = this;
                        cuantosRecursos = contadorRecursos;
                        cuantosRecursosVisibles = contadorRecursosVisbles;
                        leeEstatusRecurso(contadorRecursos);

                    }
                });

                // losRecursos = snapshot.val();
                // console.log('%c losRecursos', 'color: orange; font-weight:900;', losRecursos);

            }


            return pintaRecursos().then(function() {
                activaBotonesRecursos().then(function() {
                    activaLanzarRecursos().then(function() {
                        cargador('oculta');
                    });
                });
            });


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


    contenidoSecCursos += '<label class="btn btn-primary btn-round botonAgregarRecurso item boton_gris2_alt" style="float: right; margin-top: -60px;" data-toggle="modal" data-target="#modalAddRecurso"><i class="nc-icon-glyph ui-1_bold-add"></i>&nbsp; Agregar Recurso';
    // contenidoSecCursos += '<button  type="file" accept=".zip,.pdf,.ppt,.pptx,video/*" style="display: none;" data-toggle="modal" data-target="#modalAddRecurso"></button>';
    // contenidoSecCursos += '<button    style="display: none;" onClick="abreMenuRecursos()"></button>';
    contenidoSecCursos += '</label>';


    // contenidoSecCursos += '<div class="pull-right">';
    // contenidoSecCursos += '<div id="menu_add_recurso" class="ui vertical menu menu_sesiones" style="display: none; position: absolute; z-index: 99; margin-left: -210px; margin-top: -5px;">';
    // contenidoSecCursos += '<a class="item boton_gris1_alt" data-toggle="modal" data-target="#modalAddRecurso">';
    // contenidoSecCursos += '<h4 class="ui header" style="margin-bottom: 20px;">Subir Objeto<i class="nc-icon-glyph arrows-2_file-upload-93 pull-right"></i></h4>';
    // contenidoSecCursos += '<p>Se sube un objeto a la librería de Objetos de Aprendizaje.</p>';
    // contenidoSecCursos += '</a>';
    // contenidoSecCursos += '<a class="item boton_gris2_alt" data-toggle="modal" data-target="#modalAddPregunta" onClick="abreModalPregunta(' + "'agregar'" + ')">';
    // contenidoSecCursos += '<h4 class="ui header" style="margin-bottom: 20px;">Crear Pregunta<i class="nc-icon-glyph design_pen-01 pull-right"></i></h4>';
    // contenidoSecCursos += '<p>Se crea una pregunta para ser utilizada en la librería de Objetos de Aprendizaje.</p>';
    // contenidoSecCursos += '</a>';
    // contenidoSecCursos += '</div>';
    // contenidoSecCursos += '</div>';


    contenidoSecCursos += '<div class="pt-4 pl-5 pr-5 py-3 bg-white rounded tabla_recursos">';

    contenidoSecCursos += '<table class="table recursos_lista">';
    contenidoSecCursos += '    <thead>';
    contenidoSecCursos += '        <tr>';
    contenidoSecCursos += '            <th class="col-5">';
    contenidoSecCursos += '                <h6 class="input_label">Recurso</h6>';
    contenidoSecCursos += '            </th>';
    contenidoSecCursos += '            <th class="col-3">';
    contenidoSecCursos += '                <h6 class="input_label">Descripción</h6>';
    contenidoSecCursos += '            </th>';
    contenidoSecCursos += '            <th class="col-2">';
    contenidoSecCursos += '                <h6 class="input_label">Duración</h6>';
    contenidoSecCursos += '            </th>';
    contenidoSecCursos += '            <th class="col-2">';
    contenidoSecCursos += '                <h6 class="input_label">Acciones</h6>';
    contenidoSecCursos += '            </th>';
    contenidoSecCursos += '        </tr>';
    contenidoSecCursos += '    </thead>';
    contenidoSecCursos += '    <tbody>';

    for (a = 1; a <= cuantosRecursos; a++) {

        contenidoSecCursos += '            <tr>';
        contenidoSecCursos += '                <td>';
        contenidoSecCursos += '        <div class="recurso_nombre">';
        contenidoSecCursos += '           <div id="recurso_imagen1" class="recurso_imagen">';
        contenidoSecCursos += '                <img src="https://muchofocus.com/creclms/recursos/sco_01/objeto_portada.jpg" alt="">';
        contenidoSecCursos += '            </div>';
        contenidoSecCursos += '            <div class="recurso_nombre_int">';
        contenidoSecCursos += '                <span id="recurso_titulo1" class="recurso_titulo">Principios básicos de nutrición</span>';
        contenidoSecCursos += '                <br>';
        contenidoSecCursos += '                <span id="recurso_subtitulo1" class="recurso_subtitulo">SCORM</span>';
        contenidoSecCursos += '            </div>';
        contenidoSecCursos += '         </div>';
        contenidoSecCursos += '     </td>';
        contenidoSecCursos += '    <td id="recurso_descripcion1">';
        contenidoSecCursos += '        <p class="texto_limitado">En este espacio descubrirás los conceptos generales de nutrición, la importancia de proporcionar a las mascotas un alimento de calidad y con el balance adecuado, así como la información clave que podemos encontrar en el empaque de los alimentos.</p>';
        contenidoSecCursos += '    </td>';
        contenidoSecCursos += '    <td id="recurso_duracion1">1 hora</td>';
        contenidoSecCursos += '    <td>';
        contenidoSecCursos += '        <div id="botonVerRecurso1" class="btn btn-round btn-icon btn-verde2 botonVerRecurso" data-toggle="modal" data-target="#modalVerRecurso">';
        contenidoSecCursos += '            <i class="nc-icon-outline education_glasses"></i>';
        contenidoSecCursos += '      </div>';
        contenidoSecCursos += '      <div id="botonEditarRecurso1" class="btn btn-round btn-icon btn-verde2 botonEditarRecurso">';
        contenidoSecCursos += '          <i class="nc-icon-outline ui-1_pencil"></i>';
        contenidoSecCursos += '     </div>';
        contenidoSecCursos += '        <div id="botonEliminarRecurso1" class="btn btn-round btn-icon btn-primary botonEliminarRecurso" onclick="eliminarRecurso(this)">';
        contenidoSecCursos += '             <i class="nc-icon-outline ui-1_trash-simple"></i>';
        contenidoSecCursos += '         </div>';
        contenidoSecCursos += '      </td>';
        contenidoSecCursos += '   </tr>';

    };

    contenidoSecCursos += '           </tbody>';
    contenidoSecCursos += '    </table>';

    contenidoSecCursos += ' </div>';


    $('.recursos_int').append(contenidoSecCursos);
    // $('#subtituloSeccion').html('<a  >' + cuantosRecursosVisibles + '</a> objetos en total');

    return $.ajax();

}



function eliminarRecurso(cualRecurso) {
    // event.preventDefault();
    console.log("eliminarRecurso", cualRecurso);
    for (b = 1; b <= cuantosRecursos; b++) {
        $('#modalBorrarRecurso').modal({
            transition: 'scale'
        }).modal('show');
        $(document).off('click', '#botonCancelarBorrarRecurso').on('click', '#botonCancelarBorrarRecurso', function(e) {});
        $(document).off('click', '#botonAceptarBorrarRecurso').on('click', '#botonAceptarBorrarRecurso', function(e) {
            // borrarRecurso(that['recursoId' + cualRecurso]);
        });
    };
};


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


function activaBotonesRecursos() {

    for (a = 1; a <= cuantosRecursos; a++) {

        $("#botonEditarRecurso" + a).click(function(event) {
            event.preventDefault();
            var elRecurso = $(this).attr('id').substr(18, 3);
            console.log('elRecurso', elRecurso);
            editaRecurso(elRecurso);
        });

        $("#botonCancelarRecurso").click(function(event) {
            event.preventDefault();
            regresaReursos();
        });

        $("#botonGuardarRecurso").click(function(event) {
            event.preventDefault();
            regresaReursos();
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

    $(".botonVerRecurso").click(function(event) {
        event.preventDefault();
        var _Pos = $(this).attr('id').indexOf('_');
        var cualRecurso = $(this).attr('id').substr(15, $(this).attr('id').length - (_Pos + 1));

        console.log('botonVerRecurso', cualRecurso);
        ////////////////
        lanzaObjetoVisualizar(cualRecurso);
        ////////////////
    });


    return $.ajax();
}


function editaRecurso(cualRecurso) {
    console.log('editaRecurso', cualRecurso);

    $('.recursos_int').css({
        'display': 'none'
    });
    $("#secEditarRecurso").css({
        'display': 'block'
    });

    $("#tabRecursos>li>a").removeClass("active");
    $("#tabRecursosContent>.active").removeClass("active");
    $("#botonInfoGral").addClass('show active');
    $("#infoGral").addClass('show active');


    // Editor //
    ClassicEditor.create(document.querySelector('#editor1'))
        .then(editor => {
            // console.log('editor', editor);
        })
        .catch(error => {
            console.error(error);
        });
    ClassicEditor.create(document.querySelector('#editor2'))
        .then(editor => {
            // console.log('editor', editor);
        })
        .catch(error => {
            console.error(error);
        });
    // Editor //

    // upload image //
    $('.input-images-1').imageUploader();
    // upload image //

}

function regresaReursos() {

    $('.recursos_int').css({
        'display': 'block'
    });
    $("#secEditarRecurso").css({
        'display': 'none'
    });

    // Editor //
    $('#editor1').remove();
    $('#editor2').remove();

    // upload image //
    $('.image-uploader').remove();

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

    $("#modalVerRecurso_body").empty();
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


        case 'SCORM':

            $("#modalVerRecurso_body").html('<iframe name="curso" id="curso" src="' + laLiga + '" frameborder="0" scrolling="yes" border="0" style="display: block; height: 100vh; width: 100vw; width:100%; height:100%;"></iframe>');

            break;


        case 'Audio':

            setTimeout(function() {
                elContenido += '<div name="curso" id="curso" style="width:100%; height:100%; background-color: #000000;">';
                elContenido += '<audio id="elAudio" style="display: flex; width:50%; height:50%; margin-left: auto; margin-right: auto;" autobuffer controls autoplay controlsList="nodownload">';
                elContenido += '<source src="' + laLiga + '" type="audio/mpeg" />';
                elContenido += '</audio>';
                elContenido += '</div>';

                $("#modalVerRecurso_body").html(elContenido);
            }, 500);

            break;



        case 'Imagen':

            $("#modalVerRecurso_body").html('<iframe name="curso" id="curso" src="' + laLiga + '" frameborder="0" scrolling="yes" border="0" style="display: block; height: 100vh; width: 100vw; width:100%; height:100%;"></iframe>');

            // elContenido += '<div name="curso" id="curso" style="width:100%; height:100%; overflow: scroll;">';
            // elContenido += '<img id="laImagen" src="' + laLiga + '">';
            // elContenido += '</div>';

            break;



        case 'PDF':

            elContenido += '<div name="curso" id="curso" style="width:100%; height:100%;">';
            elContenido += '<embed src="' + laLiga + '" width="100%" height="100%"></embed>';
            // elContenido += '<object src="' + laLiga + '" width="100%" height="100%"></object>';
            elContenido += '</div>';

            $("#modalVerRecurso_body").html(elContenido);

            break;



        case 'Video':

            // $("#modalVerRecurso_body").html('<iframe name="curso" id="curso" src="' + laLiga + '" frameborder="0" scrolling="yes" border="0" style="display: block; height: 100vh; width: 100vw; width:100%; height:100%;"></iframe>');

            elContenido += '<div name="curso" id="curso" style="background-color: #000000;">';
            elContenido += '<video id="elVideo" style="width:100%; height:100%;" autobuffer controls autoplay controlsList="nodownload">';
            elContenido += '<source src="' + laLiga + '" type="video/mp4" />';
            elContenido += '</video>';
            elContenido += '</div>';

            $("#modalVerRecurso_body").html(elContenido);

            setTimeout(function() {
                ajustaEscalaContenidoInst();
            }, 500);

            break;



        case 'Word':

            $("#modalVerRecurso_body").html('<iframe name="curso" id="curso" src="https://docs.google.com/gview?url=' + laLiga + '&embedded=true" frameborder="0" scrolling="yes" border="0" style="display: block; height: 100vh; width: 100vw; width:100%; height:100%;"></iframe>');

            // elContenido += '<div name="curso" id="curso" style="width:100%; height:100%;">';
            // elContenido += '<img  id="laImagen" src="' + laLiga + '">';
            // elContenido += '</div>';

            break;



        case 'PowerPoint':

            $("#modalVerRecurso_body").html('<iframe name="curso" id="curso" src="https://docs.google.com/gview?url=' + laLiga + '&embedded=true" frameborder="0" scrolling="yes" border="0" style="display: block; height: 100vh; width: 100vw; width:100%; height:100%;"></iframe>');

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



function cierraContenidoRecurso() {

    $('#modalVerRecurso').on('hide.bs.modal', function() {
        $("#modalVerRecurso_body").empty();
    });

}



function detectaUnloadVerRec() {

    $('#modalVerRecurso').on('hide.bs.modal', function() {
        $("#modalVerRecurso_body").empty();
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
    $("#modalVerRecursoContent").css({
        'height': (elAlto - 50) + 'px',
        'width': (elAncho - 50) + 'px'
    });
    $("#modalVerRecursoDialog").css({
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