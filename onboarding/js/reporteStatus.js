function descargaReporteStatus() {

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

    var elId;
    var elRegistro;
    var elStatus;
    var cuantasCats;

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
        elNombre = '';

        $.ajax({
            url: laURLId,
            success: function (dataReg) {
                console.log(dataReg);

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
                    elStatus = Object.values(dataReg.Registro.status);
                    console.log('elStatus', elStatus);

                    if (dataReg.Registro.status.cats_completed != null) {
                        lasCats = Object.values(dataReg.Registro.status.cats_completed);
                        console.log('lasCats', lasCats);
                        if (lasCats[0] == 0) {
                            cuantasCats = 0;
                        } else {
                            cuantasCats = Object.keys(Object.values(dataReg.Registro.status.cats_completed)).length;
                        }
                    } else {
                        cuantasCats = 0;
                    }
                    console.log('cuantasCats', cuantasCats);


                    for (a = 1; a <= cuantasSemanas; a++) {
                        that['cuantasCats_Semana' + a] = Object.keys(Object.values(dataTasks.weeks['week' + a].cats)).length;
                        // console.log(' cuantasCats_Semana', a, that['cuantasCats_Semana' + a])

                        for (b = 1; b <= that['cuantasCats_Semana' + a]; b++) {
                            that['cuantasCats_Semana' + a + '_subCat' + b] = Object.keys(Object.values(dataTasks.weeks['week' + a].cats)[(b - 1)].subcats).length;
                            // console.log('cuantasCats_Semana', a + '_subCat' + b, that['cuantasCats_Semana' + a + '_subCat' + b])

                            for (c = 1; c <= that['cuantasCats_Semana' + a + '_subCat' + b]; c++) {
                                that['cuantasCats_Semana' + a + '_subCat' + b + '_task' + c] = Object.keys(Object.values(Object.values(dataTasks.weeks['week' + a].cats)[(b - 1)].subcats)[(c - 1)].tasks).length;
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
                    style += ".row_nombre { background-color: rgb(215, 227, 188); text-align: left; font-weight:bold; }";
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
                    contenidoReporte += '<th class="row_head">Completed</th>';
                    contenidoReporte += '</tr>';
                    contenidoReporte += '</thead>';
                    contenidoReporte += '<tbody>';


                    for (a = 1; a <= cuantasSemanas; a++) {
                        for (b = 1; b <= that['cuantasCats_Semana' + a]; b++) {
                            for (c = 1; c <= that['cuantasCats_Semana' + a + '_subCat' + b]; c++) {

                                that['semana' + a + '_Completed'] = false;
                                that['semana' + a + '_cat' + b + '_Completed'] = false;
                                // that['semana' + a + '_cat' + b + '_subcat' + c + '_Completed'] = false;


                                contenidoReporte += '<tr>';
                                if (a <= 1 && b <= 1 && c <= 1) {
                                    contenidoReporte += '<td class="row_nombre">' + elNombre.replace(/ /g, "&nbsp;") + '</td>';
                                } else {
                                    contenidoReporte += '<td class="row_nombre"> </td>';
                                }
                                if (b <= 1 && c <= 1) {
                                    that['idTablaSemana'] = a;
                                    // console.log('that[idTablaSemana]', that['idTablaSemana']);
                                    contenidoReporte += '<td>' + dataTasks.weeks['week' + a].name.replace(/ /g, "&nbsp;") + '</td>';
                                } else {
                                    contenidoReporte += '<td> </td>';
                                }
                                if (c <= 1) {
                                    that['idTablaCat'] = b;
                                    // console.log('that[idTablaDia]', that['idTablaDia']);
                                    contenidoReporte += '<td>' + Object.values(dataTasks.weeks['week' + a].cats)[(b - 1)].name.replace(/ /g, "&nbsp;") + '</td>';
                                } else {
                                    contenidoReporte += '<td> </td>';
                                }
                                that['idTablaSubCat'] = c;
                                // console.log('that[idTablaDia]', that['idTablaDia']);
                                contenidoReporte += '<td>' + Object.values(Object.values(Object.values(dataTasks.weeks['week' + a].cats))[(b - 1)].subcats)[(c - 1)].name.replace(/ /g, "&nbsp;") + '</td>';

                                for (m = 1; m <= cuantasCats; m++) {

                                    if (cuantasCats == 0) {
                                        lasCats[(m - 1)] = ' ';
                                    }

                                    if (m <= cuantasCats) {

                                        var elStatusSemanaPrev = lasCats[(m - 1)].split('week')[1];
                                        // console.log('elStatusSemanaPrev', elStatusSemanaPrev);
                                        var elStatusSemana = elStatusSemanaPrev.split('_cat')[0];
                                        // console.log('elStatusSemana', elStatusSemana);
                                        var elStatusCat = lasCats[(m - 1)].split('_cat')[1];
                                        // console.log('elStatusCat', elStatusCat);

                                        if (elStatusSemana == that['idTablaSemana']) {
                                            that['semana' + a + '_Completed'] = true;
                                            if (elStatusCat == that['idTablaCat']) {
                                                that['semana' + a + '_cat' + b + '_Completed'] = true;
                                            }
                                        }

                                    } else {
                                        that['semana' + a + '_Completed'] = false;
                                        that['semana' + a + '_cat' + b + '_Completed'] = false;
                                        // that['semana' + a + '_cat' + b + '_subcat' + c + '_Completed'] = false;
                                        // m = 1;
                                    }
                                }

                                if (that['semana' + a + '_Completed']) {
                                    if (that['semana' + a + '_cat' + b + '_Completed']) {
                                        // if (that['semana' + a + '_cat' + b + '_subcat' + c + '_Completed']) {
                                        contenidoReporte += '<td class="row_nombre">' + 'Completed' + '</td>';
                                        // } else {
                                        // contenidoReporte += '<td class="row_nombre"> </td>';
                                        // }
                                    } else {
                                        contenidoReporte += '<td class="row_nombre"> </td>';
                                    }
                                } else {
                                    contenidoReporte += '<td class="row_nombre"> </td>';
                                }

                                contenidoReporte += '</tr>';
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
                    // var filename = "Onboarding_Status_Report." + formato;


                    descargaFormato();
                    $('#tablaReporte').empty();


                    function descargaFormato() {

                        var table2excel = new Table2Excel({
                            preserveColors: true
                        });
                        table2excel.export($('#laTabla'), 'Onboarding_Status_Report');

                    }
                }
            }
        })

    }


    cargaDatos();

}