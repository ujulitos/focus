function descargaReporteDetalle() {

    loadSeccion('home');

    if (elRol == 'IBP') {
        var laURLId = "" + laUrlAPI + "/Usuarios/" + usuarioId + ".json?auth=" + secret + "";
        console.log('laURLId', laURLId);
    }
    if (elRol == 'Coach') {
        var laURLId = "" + laUrlAPI + "/Usuarios/" + usuarioSeleccionadoId + ".json?auth=" + secret + "";
        console.log('laURLId', laURLId);
    }

    // var laURLIdPar = "" + laUrlAPI + "/Usuarios/" + usuarioSeleccionadoId + ".json?auth=" + secret + "";
    // console.log('laURLIdPar', laURLIdPar);

    var data;
    var elId;
    var elRegistro;
    var cuantasTasks;
    var elNombre;
    /***********Variables usadas para pintar el reporte**********/
    var nombre;
    var usuario;
    var perfil;
    const arregloTareas = [];
    /***********************Arreglos para datos JSON************************/
    const arregloCategorias = [];
    const arregloMensajes = [];
    const arregloTask = [];
    var totalDias;
    var totalCategorias;
    var totalTask;
    var totalMessage;
    var concatJSON = '';
    var dataTasks;
    /************************************************************************/

    function cargaDatos() {
        $.ajax({
            url: 'js/tasks.json',
            type: 'get',
            dataType: 'json',
            cache: false,
            async: true,
        }).done(function (dataTasks) {
            return consultaId(dataTasks);
        })
    }

    function consultaId(dataTasks) {
        console.log('consultaId');

        elStatus = '';
        cuantasCats = 0;
        cuantasTasks = 0;
        elNombre = '';
        elRegistro = '';
        lasTasks = '';

        $.ajax({
            url: laURLId,
            success: function (dataReg) {
                console.log(dataReg);

                elId = dataReg.Id;
                console.log('elId', elId);
                elNombre = dataReg.Name;
                console.log('elNombre', elNombre);

                // si no hay registro
                if (dataReg.Registro == undefined) {
                    Swal.fire({
                        title: 'This user has no registration yet',
                        text: "try another user.",
                        icon: 'info'
                    });
                    $('.swal2-container').css({
                        'z-index': '9999'
                    })
                } else {


                    elRegistro = Object.values(dataReg.Registro);
                    console.log('elRegistro', elRegistro);


                    if (dataReg.Registro.tasks != null) {
                        lasTasks = Object.values(dataReg.Registro.tasks);
                        console.log('lasTasks', lasTasks);
                        if (lasTasks[1] == 0) {
                            cuantasTasks = 0;
                        } else {
                            cuantasTasks = Object.keys(Object.values(dataReg.Registro.tasks)).length;
                        }
                    } else {
                        cuantasTasks = 0;
                    }
                    console.log('cuantasTasks', cuantasTasks);


                    for (a = 1; a <= cuantasSemanas; a++) {
                        that['cuantasCats_Semana' + a] = Object.keys(Object.values(dataTasks.weeks['week0' + a].cats)).length;
                        // console.log(' cuantasCats_Semana', a, that['cuantasCats_Semana' + a])

                        for (b = 1; b <= that['cuantasCats_Semana' + a]; b++) {
                            that['cuantasCats_Semana' + a + '_subCat' + b] = Object.keys(Object.values(dataTasks.weeks['week0' + a].cats)[(b - 1)].subcats).length;
                            // console.log('cuantasCats_Semana', a + '_subCat' + b, that['cuantasCats_Semana' + a + '_subCat' + b])

                            for (c = 1; c <= that['cuantasCats_Semana' + a + '_subCat' + b]; c++) {
                                that['cuantasCats_Semana' + a + '_subCat' + b + '_task' + c] = Object.keys(Object.values(Object.values(dataTasks.weeks['week0' + a].cats)[(b - 1)].subcats)[(c - 1)].tasks).length;
                                // console.log('cuantasCats_Semana', a + '_subCat' + b + '_task' + c, that['cuantasCats_Semana' + a + '_subCat' + b + '_task' + c]);

                            }
                            // console.log('------------------------');
                        }
                    }

                    var contenidoReporte = '';
                    $('#tablaReporte').empty();

                    var style = "";
                    style += "<style>";
                    style += ".tabla_reporte { background-color: rgb(255, 255, 255); color: rgb(0, 0, 0); }";
                    style += ".row_head { background-color: rgb(203, 192, 271); text-align: left; font-weight:bold; }";
                    style += ".row_nombre { background-color: rgb(215, 227, 188); text-align: left; }";
                    style += ".centrado_bold { background-color: rgb(215, 227, 188); text-align:center; font-weight:bold; }";
                    style += "</style>";

                    contenidoReporte += '<html><head>' + style + '<meta charset="UTF-8"></head>';
                    contenidoReporte += '<body>';

                    contenidoReporte += '<table id="laTabla" class="tabla_reporte">';
                    contenidoReporte += '<thead>';
                    contenidoReporte += '<tr>';
                    contenidoReporte += '<th class="row_head">IBP</th>';
                    contenidoReporte += '<th class="row_head">Weeks</th>';
                    contenidoReporte += '<th class="row_head">Categories</th>';
                    contenidoReporte += '<th class="row_head">Subcategories</th>';
                    contenidoReporte += '<th class="row_head">Tasks</th>';
                    contenidoReporte += '<th class="row_head">Check</th>';
                    contenidoReporte += '</tr>';
                    contenidoReporte += '</thead>';
                    contenidoReporte += '<tbody>';

                    for (a = 1; a <= cuantasSemanas; a++) {
                        for (b = 1; b <= that['cuantasCats_Semana' + a]; b++) {
                            for (c = 1; c <= that['cuantasCats_Semana' + a + '_subCat' + b]; c++) {
                                for (d = 1; d <= that['cuantasCats_Semana' + a + '_subCat' + b + '_task' + c]; d++) {

                                    that['semana' + a + '_Checked'] = false;
                                    that['semana' + a + '_cat' + b + '_Checked'] = false;
                                    that['semana' + a + '_cat' + b + '_subcat' + c + '_Checked'] = false;
                                    that['semana' + a + '_cat' + b + '_subcat' + c + '_task' + d + '_Checked'] = false;

                                    contenidoReporte += '<tr>';
                                    if (a <= 1 && b <= 1 && c <= 1 && d <= 1) {
                                        contenidoReporte += '<td class="row_nombre">' + dataReg.Name.replace(/ /g, "&nbsp;") + '</td>';
                                    } else {
                                        contenidoReporte += '<td class="row_nombre"></td>';
                                    }
                                    if (b <= 1 && c <= 1 && d <= 1) {
                                        that['idTablaSemana'] = a;
                                        // console.log('that[idTablaSemana]', that['idTablaSemana']);
                                        contenidoReporte += '<td>' + dataTasks.weeks['week0' + a].name.replace(/ /g, "&nbsp;") + '</td>';
                                    } else {
                                        contenidoReporte += '<td></td>';
                                    }
                                    if (c <= 1 && d <= 1) {
                                        that['idTablaCat'] = b;
                                        // console.log('that[idTablaCat]', that['idTablaCat']);
                                        contenidoReporte += '<td>' + Object.values(dataTasks.weeks['week0' + a].cats)[(b - 1)].name.replace(/ /g, "&nbsp;") + '</td>';
                                    } else {
                                        contenidoReporte += '<td></td>';
                                    }

                                    if (d <= 1) {
                                        that['idTablaSubCat'] = c;
                                        // console.log('that[idTablaSubCat]', that['idTablaSubCat']);
                                        contenidoReporte += '<td>' + Object.values(Object.values(Object.values(dataTasks.weeks['week0' + a].cats))[(b - 1)].subcats)[(c - 1)].name.replace(/ /g, "&nbsp;") + '</td>';
                                    } else {
                                        contenidoReporte += '<td></td>';
                                    }
                                    that['idTablaTarea'] = d;
                                    // console.log('that[idTablaTarea]', that['idTablaTarea']);
                                    contenidoReporte += '<td>' + Object.values(Object.values(Object.values(Object.values(dataTasks.weeks['week0' + a].cats))[(b - 1)].subcats)[(c - 1)].tasks)[(d - 1)].replace(/ /g, "&nbsp;") + '</td>';


                                    for (m = 1; m <= cuantasTasks; m++) {

                                        if (cuantasTasks == 0) {
                                            lasTasks[(m - 1)] = ' ';
                                        }

                                        if (m <= cuantasTasks) {

                                            var elRegistro_ = lasTasks[(m - 1)];
                                            // console.log('elRegistro_', elRegistro_);

                                            if (lasTasks[0] != '0') {
                                                var elRegistroSemanaPrev = lasTasks[(m - 1)].split('laTask_s')[1];
                                                // console.log('elRegistroSemanaPrev', elRegistroSemanaPrev);
                                                var elRegistroSemana = elRegistroSemanaPrev.split('_c')[0];
                                                // console.log('elRegistroSemana', elRegistroSemana);

                                                var elRegistroCatPrev = lasTasks[(m - 1)].split('_c')[1];
                                                // console.log('elRegistroCatPrev', elRegistroCatPrev);
                                                var elRegistroCat = elRegistroCatPrev.split('_sc')[0];
                                                // console.log('elRegistroCat', elRegistroCat);

                                                var elRegistroSubcatPrev = lasTasks[(m - 1)].split('_sc')[1];
                                                // console.log('elRegistroSubcatPrev', elRegistroSubcatPrev);
                                                var elRegistroSubcat = elRegistroSubcatPrev.split('_t')[0];
                                                // console.log('elRegistroSubcat', elRegistroSubcat);

                                                var elRegistroTask = lasTasks[(m - 1)].split('t')[1];
                                                // console.log('elRegistroTask', elRegistroTask);
                                            }

                                            if (elRegistroSemana == that['idTablaSemana']) {
                                                that['semana' + a + '_Checked'] = true;
                                                if (elRegistroCat == that['idTablaCat']) {
                                                    that['semana' + a + '_cat' + b + '_Checked'] = true;
                                                    if (elRegistroSubcat == that['idTablaSubCat']) {
                                                        that['semana' + a + '_cat' + b + '_subcat' + c + '_Checked'] = true;
                                                        if (elRegistroTask == that['idTablaTarea']) {
                                                            that['semana' + a + '_cat' + b + '_subcat' + c + '_task' + d + '_Checked'] = true;
                                                        }
                                                    }
                                                }
                                            }

                                        } else {
                                            that['semana' + a + '_Checked'] = false;
                                            that['semana' + a + '_cat' + b + '_Checked'] = false;
                                            that['semana' + a + '_cat' + b + '_subcat' + c + '_Checked'] = false;
                                            that['semana' + a + '_cat' + b + '_subcat' + c + '_task' + d + '_Checked'] = false;
                                            // c = 1;
                                        }
                                    }


                                    if (that['semana' + a + '_Checked']) {
                                        if (that['semana' + a + '_cat' + b + '_Checked']) {
                                            if (that['semana' + a + '_cat' + b + '_subcat' + c + '_Checked']) {
                                                if (that['semana' + a + '_cat' + b + '_subcat' + c + '_task' + d + '_Checked']) {
                                                    contenidoReporte += '<td class="centrado_bold">' + 'X' + '</td>';
                                                } else {
                                                    contenidoReporte += '<td class="centrado_bold"> </td>';
                                                }
                                            } else {
                                                contenidoReporte += '<td class="centrado_bold"> </td>';
                                            }
                                        } else {
                                            contenidoReporte += '<td class="centrado_bold"> </td>';
                                        }
                                    } else {
                                        contenidoReporte += '<td class="centrado_bold"> </td>';
                                    }

                                    contenidoReporte += '</tr>';
                                }
                            }
                        }
                    }
                    contenidoReporte += '</tbody>';
                    contenidoReporte += '</table>';

                    contenidoReporte += '</body></html>';

                    $('#tablaReporte').append(contenidoReporte);


                    /***********************************************************************************/
                    /****************************exportación a Excel************************************/
                    // formato html, xls
                    // var formato = 'xls';
                    // nombre del archivo a descargar
                    // var filename = "Onboarding_Detailed_Report." + formato;


                    descargaFormato();
                    $('#tablaReporte').empty();


                    function descargaFormato() {

                        var table2excel = new Table2Excel();
                        table2excel.export($('#laTabla'), 'Onboarding_Detail_Report');

                    }
                }
            }
        })

    }


    cargaDatos();

}