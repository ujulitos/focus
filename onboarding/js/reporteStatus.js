function descargaReporteStatus() {

    var laURLId = "" + laUrlAPI + "/Usuarios/" + usuarioId + ".json?auth=" + secret + "";
    console.log('laURLId', laURLId);

    var laURLIdPar = "" + laUrlAPI + "/Usuarios/" + usuarioSeleccionadoId + ".json?auth=" + secret + "";
    console.log('laURLIdPar', laURLIdPar);

    var elId;
    var elRegistro;
    var elStatus;
    var cuantasCats;
    var cuantasCatsDelPar;
    var elIdDelPar;
    var elNombreDelPar;
    var elRegistroDelPar;
    var elStatusDelPar;
    for (a = 1; a <= cuantasSemanas; a++) {
        this['dataSemana' + a];
    }
    that = this;


    function cargaDatos() {
        console.log('cuantasSemanas', cuantasSemanas);
        var contador = 1;

        function cargaJsonSemana(cualSemana) {
            $.ajax({
                url: 'js/week' + cualSemana + '.json',
                type: 'get',
                dataType: 'json',
                cache: false,
                async: true,
            }).done(function(data) {
                that['dataSemana' + cualSemana] = data;
                console.log(that['dataSemana' + cualSemana]);
                if (contador < cuantasSemanas) {
                    contador++;
                    cargaJsonSemana(contador);
                } else {
                    return consultaId();
                }
            })
        }
        cargaJsonSemana(contador);

    }

    function consultaId() {
        console.log('consultaId');

        $.ajax({
            url: laURLId,
            success: function(data) {
                console.log(data);

                elId = data.Id;
                console.log('elId', elId);
                // elId_Par = data.Id_Par;
                // console.log('elId_Par', elId_Par);
                // elRegistro = Object.values(data.Registro);
                // console.log('elRegistro', elRegistro);

                laURLIdPar = "" + laUrlAPI + "/Usuarios/" + usuarioSeleccionadoId + ".json?auth=" + secret + "";

                return consultaIdPar(data);
            }
        })
    }

    function consultaIdPar(data) {
        console.log('consultaIdPar');

        elStatus = '';
        cuantasCats = 0;
        cuantasCatsDelPar = 0;
        elNombre = '';
        elNombreDelPar = '';
        elRegistroDelPar = '';
        elStatusDelPar = '';

        $.ajax({
            url: laURLIdPar,
            success: function(dataPar) {
                console.log(dataPar);

                elId2 = data.Id;
                // console.log('elId2', elId2);
                elNombre = data.Name;
                console.log('elNombre', elNombre);
                elNombreDelPar = dataPar.Name;
                console.log('elNombreDelPar', elNombreDelPar);
                elRegistroDelPar = Object.values(dataPar.Registro);
                console.log('elRegistroDelPar', elRegistroDelPar);

                elStatus = Object.values(dataPar.Registro.status_coach);
                console.log('elStatus', elStatus[0]);

                elStatusDelPar = Object.values(dataPar.Registro.status_ibp);
                console.log('elStatusDelPar', elStatusDelPar[0]);

                if (dataPar.Registro.status_coach.cats_completed != null) {
                    lasCats = Object.values(dataPar.Registro.status_coach.cats_completed);
                    console.log('lasCats', lasCats);
                    if (lasCats[0] == 0) {
                        cuantasCats = 0;
                    } else {
                        cuantasCats = Object.keys(Object.values(dataPar.Registro.status_coach.cats_completed)).length;
                    }
                } else {
                    cuantasCats = 0;
                }
                console.log('cuantasCats', cuantasCats);

                if (dataPar.Registro.status_ibp.cats_completed != null) {
                    lasCatsDelPar = Object.values(dataPar.Registro.status_ibp.cats_completed);
                    console.log('lasCatsDelPar', lasCatsDelPar);
                    if (lasCatsDelPar[0] == 0) {
                        cuantasCatsDelPar = 0;
                    } else {
                        cuantasCatsDelPar = Object.keys(Object.values(dataPar.Registro.status_ibp.cats_completed)).length;
                    }
                } else {
                    cuantasCats = 0;
                }
                console.log('cuantasCatsDelPar', cuantasCatsDelPar);

                for (a = 1; a <= cuantasSemanas; a++) {
                    that['cuantosDias_Semana' + a] = Object.keys(Object.values(that['dataSemana' + a])[0]).length;
                    // console.log(' cuantosDias_Semana', a, that['cuantosDias_Semana' + a])
                    for (b = 1; b <= that['cuantosDias_Semana' + a]; b++) {
                        that['cuantasCats_Semana' + a + '_dia' + b] = Object.values(Object.values(Object.values(that['dataSemana' + a])[0])[(b - 1)].cats).length;
                        // console.log(' cuantasCats_Semana', a + '_dia' + b, that['cuantasCats_Semana' + a + '_dia' + b])
                    }
                }
                // that = this;

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
                contenidoReporte += '<th class="row_head">' + 'Coach' + '</th>';
                contenidoReporte += '<th class="row_head">' + 'IBP' + '</th>';
                contenidoReporte += '<th class="row_head">' + 'Weeks' + '</th>';
                contenidoReporte += '<th class="row_head">' + 'Days' + '</th>';
                contenidoReporte += '<th class="row_head">' + 'Categories' + '</th>';
                contenidoReporte += '<th class="row_head">' + 'Coach' + '</th>';
                contenidoReporte += '<th class="row_head">' + 'IBP' + '</th>';
                contenidoReporte += '</tr>';
                contenidoReporte += '</thead>';
                contenidoReporte += '<tbody>';


                for (a = 1; a <= cuantasSemanas; a++) {
                    for (b = 1; b <= that['cuantosDias_Semana' + a]; b++) {
                        for (c = 1; c <= that['cuantasCats_Semana' + a + '_dia' + b]; c++) {

                            that['semana' + a + '_Completed'] = false;
                            that['semana' + a + '_dia' + b + '_Completed'] = false;
                            that['semana' + a + '_dia' + b + '_cat' + c + '_Completed'] = false;

                            that['semana' + a + '_CompletedDelPar'] = false;
                            that['semana' + a + '_dia' + b + '_CompletedDelPar'] = false;
                            that['semana' + a + '_dia' + b + '_cat' + c + '_CompletedDelPar'] = false;


                            contenidoReporte += '<tr>';
                            if (a <= 1 && b <= 1 && c <= 1) {
                                contenidoReporte += '<td class="row_nombre">' + elNombre.replace(/ /g, "&nbsp;") + '</td>';
                                contenidoReporte += '<td>' + elNombreDelPar.replace(/ /g, "&nbsp;") + '</td>';
                            } else {
                                contenidoReporte += '<td class="row_nombre"> </td>';
                                contenidoReporte += '<td> </td>';
                            }
                            if (b <= 1 && c <= 1) {
                                that['idTablaSemana'] = a;
                                // console.log('that[idTablaSemana]', that['idTablaSemana']);
                                contenidoReporte += '<td>' + dataWeeks.weeks['wk' + a].replace(/ /g, "&nbsp;") + '</td>';
                            } else {
                                contenidoReporte += '<td> </td>';
                            }
                            if (c <= 1) {
                                that['idTablaDia'] = b;
                                // console.log('that[idTablaDia]', that['idTablaDia']);
                                contenidoReporte += '<td>' + Object.values(Object.values(that['dataSemana' + a])[0])[(b - 1)].txt.replace(/ /g, "&nbsp;") + '</td>';
                            } else {
                                contenidoReporte += '<td> </td>';
                            }
                            that['idTablaCat'] = c;
                            // console.log('that[idTablaCat]', that['idTablaCat']);
                            contenidoReporte += '<td>' + Object.values(Object.values(Object.values(that['dataSemana' + a])[0])[(b - 1)].cats)[(c - 1)].cat_txt.replace(/ /g, "&nbsp;") + '</td>';

                            for (d = 1; d <= cuantasCats; d++) {

                                if (cuantasCats == 0) {
                                    lasCats[(d - 1)] = ' ';
                                }

                                if (d <= cuantasCats) {

                                    var elStatusSemanaPrev = lasCats[(d - 1)].split('week')[1];
                                    // console.log('elStatusSemanaPrev', elStatusSemanaPrev);
                                    var elStatusSemana = elStatusSemanaPrev.split('_day')[0];
                                    // console.log('elStatusSemana', elStatusSemana);
                                    var elStatusDiaPrev = elStatus[0][(d - 1)].split('day')[1];
                                    // console.log('elStatusDiaPrev', elStatusDiaPrev);
                                    var elStatusDia = elStatusDiaPrev.split('_cat')[0];
                                    // console.log('elStatusDia', elStatusDia);

                                    var elStatusCat = lasCats[(d - 1)].split('cat')[1];
                                    // console.log('elStatusCat', elStatusCat);

                                    if (elStatusSemana == that['idTablaSemana']) {
                                        that['semana' + a + '_Completed'] = true;
                                        if (elStatusDia == that['idTablaDia']) {
                                            that['semana' + a + '_dia' + b + '_Completed'] = true;
                                            if (elStatusCat == that['idTablaCat']) {
                                                that['semana' + a + '_dia' + b + '_cat' + c + '_Completed'] = true;
                                            }
                                        }
                                    }

                                } else {
                                    that['semana' + a + '_Completed'] = false;
                                    that['semana' + a + '_dia' + b + '_Completed'] = false;
                                    that['semana' + a + '_dia' + b + '_cat' + c + '_Completed'] = false;
                                    d = 1;
                                }
                            }

                            if (that['semana' + a + '_Completed']) {
                                if (that['semana' + a + '_dia' + b + '_Completed']) {
                                    if (that['semana' + a + '_dia' + b + '_cat' + c + '_Completed']) {
                                        contenidoReporte += '<td class="row_nombre">' + 'Completed' + '</td>';
                                    } else {
                                        contenidoReporte += '<td class="row_nombre"> </td>';
                                    }
                                } else {
                                    contenidoReporte += '<td class="row_nombre"> </td>';
                                }
                            } else {
                                contenidoReporte += '<td class="row_nombre"> </td>';
                            }



                            for (d = 1; d <= cuantasCatsDelPar; d++) {

                                if (cuantasCatsDelPar == 0) {
                                    lasCatsDelPar[(d - 1)] = ' ';
                                }

                                if (d <= cuantasCatsDelPar) {
                                    var elStatusSemanaDelParPrev = lasCatsDelPar[(d - 1)].split('week')[1];
                                    // console.log('elStatusSemanaDelParPrev', elStatusSemanaDelParPrev);
                                    var elStatusSemanaDelPar = elStatusSemanaDelParPrev.split('_day')[0];
                                    // console.log('elStatusSemanaDelPar', elStatusSemanaDelPar);
                                    var elStatusDiaDelParPrev = elStatusDelPar[0][(d - 1)].split('day')[1];
                                    // console.log('elStatusDiaDelParPrev', elStatusDiaDelParPrev);
                                    var elStatusDiaDelPar = elStatusDiaDelParPrev.split('_cat')[0];
                                    // console.log('elStatusDiaDelPar', elStatusDiaDelPar);

                                    var elStatusCatDelPar = lasCatsDelPar[(d - 1)].split('cat')[1];
                                    // console.log('elStatusCatDelPar', elStatusCatDelPar);

                                    if (elStatusSemanaDelPar == that['idTablaSemana']) {
                                        that['semana' + a + '_CompletedDelPar'] = true;
                                        if (elStatusSemanaDelPar == that['idTablaDia']) {
                                            that['semana' + a + '_dia' + b + '_CompletedDelPar'] = true;
                                            if (elStatusCatDelPar == that['idTablaCat']) {
                                                that['semana' + a + '_dia' + b + '_cat' + c + '_CompletedDelPar'] = true;
                                            }
                                        }
                                    }

                                } else {
                                    that['semana' + a + '_CompletedDelPar'] = false;
                                    that['semana' + a + '_dia' + b + '_CompletedDelPar'] = false;
                                    that['semana' + a + '_dia' + b + '_cat' + c + '_CompletedDelPar'] = false;
                                    d = 1;
                                }
                            }

                            if (that['semana' + a + '_CompletedDelPar']) {
                                if (that['semana' + a + '_dia' + b + '_CompletedDelPar']) {
                                    if (that['semana' + a + '_dia' + b + '_cat' + c + '_CompletedDelPar']) {
                                        contenidoReporte += '<td class="row_nombre">' + 'Completed' + '</td>';
                                    } else {
                                        contenidoReporte += '<td class="row_nombre"> </td>';
                                    }
                                } else {
                                    contenidoReporte += '<td class="row_nombre"> </td>';
                                }
                            } else {
                                contenidoReporte += '<td class="row_nombre"> </td>';
                            }


                            // contenidoReporte += '<td class="row_nombre">' + elStatusDelPar[0][(a - 1)] + '</td>';
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


                    // // para descargar en Excel
                    // if (formato == 'xls') {
                    //     // para descargar en Excel
                    //     var tmpElemento = document.createElement('a');
                    //     // obtenemos la información desde el div que lo contiene en el html
                    //     // Obtenemos la información de la tabla
                    //     var data_type = 'data:application/vnd.ms-excel';
                    //     var tabla_div = document.getElementById('tablaReporte');
                    //     var tabla_html = tabla_div.outerHTML.replace(/ /g, '%20');
                    //     tmpElemento.href = data_type + ', ' + tabla_html;
                    //     //Asignamos el nombre a nuestro EXCEL
                    //     tmpElemento.download = filename;
                    //     // Simulamos el click al elemento creado para descargarlo
                    //     tmpElemento.click();

                    // }

                    // // para descargar en html
                    // if (formato == 'html') {
                    //     var tmpElemento = document.createElement('a');
                    //     let a = $("<a />", {
                    //             href: 'data:application/html;charset=utf-8,' + encodeURIComponent($('#tablaReporte').html()),
                    //             download: filename
                    //         })
                    //         .appendTo("body")
                    //         .get(0)
                    //         .click();
                    // }

                }


            }
        })

    }


    cargaDatos();

}
