function descargaReporteDetalle() {

    var laURLId = "" + laUrlAPI + "/Usuarios/" + usuarioId + ".json?auth=" + secret + "";
    console.log('laURLId', laURLId);

    var laURLIdPar = "" + laUrlAPI + "/Usuarios/" + usuarioSeleccionadoId + ".json?auth=" + secret + "";
    console.log('laURLIdPar', laURLIdPar);

    var data;
    var dataPar;

    var elId;
    var elRegistro;
    var cuantasTasks;
    var cuantasTasksDelPar;
    var elIdDelPar;
    var elNombreDelPar;
    var elRegistroDelPar;
    /***********Variables usadas para pintar el reporte**********/
    var nombre;
    var usuario;
    var perfil;
    var nombrePair;
    const arregloTareas = [];
    /***********************Arreglos para datos JSON************************/
    const arregloDias = [];
    const arregloCategorias = [];
    const arregloMensajes = [];
    const arregloTask = [];
    var totalDias;
    var totalCategorias;
    var totalTask;
    var totalMessage;
    var concatJSON = '';
    /************************************************************************/
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
        });
    }

    function consultaIdPar(data) {
        console.log('consultaIdPar');

        elStatus = '';
        cuantasCats = 0;
        cuantasCatsDelPar = 0;
        cuantasTasks = 0;
        cuantasTasksDelPar = 0;
        elNombre = '';
        elNombreDelPar = '';
        elRegistroDelPar = '';
        lasTasksDelPar = '';

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

                if (dataPar.Registro.tasks_coach != null) {
                    lasTasks = Object.values(dataPar.Registro.tasks_coach);
                    console.log('lasTasks', lasTasks);
                    if (lasTasks[1] == 0) {
                        cuantasTasks = 0;
                    } else {
                        cuantasTasks = Object.keys(Object.values(dataPar.Registro.tasks_coach)).length;
                    }
                } else {
                    cuantasTasks = 0;
                }
                console.log('cuantasTasks', cuantasTasks);

                if (dataPar.Registro.tasks_ibp != null) {
                    lasTasksDelPar = Object.values(dataPar.Registro.tasks_ibp);
                    console.log('lasTasksDelPar', lasTasksDelPar);
                    if (lasTasksDelPar[1] == 0) {
                        cuantasTasksDelPar = 0;
                    } else {
                        cuantasTasksDelPar = Object.keys(Object.values(dataPar.Registro.tasks_ibp)).length;
                    }
                } else {
                    cuantasTasksDelPar = 0;
                }
                console.log('cuantasTasksDelPar', cuantasTasksDelPar);

                for (a = 1; a <= cuantasSemanas; a++) {
                    that['cuantosDias_Semana' + a] = Object.keys(Object.values(that['dataSemana' + a])[0]).length;
                    console.log(' cuantosDias_Semana', a, that['cuantosDias_Semana' + a])
                    for (b = 1; b <= that['cuantosDias_Semana' + a]; b++) {
                        that['cuantasCats_Semana' + a + '_dia' + b] = Object.values(Object.values(Object.values(that['dataSemana' + a])[0])[(b - 1)].cats).length;
                        // console.log('cuantasCats_Semana', a + '_dia' + b, that['cuantasCats_Semana' + a + '_dia' + b])
                        for (c = 1; c <= that['cuantasCats_Semana' + a + '_dia' + b]; c++) {

                            that['cuantosMessages_Semana' + a + '_dia' + b + '_categoria' + c] = Object.values(Object.values(Object.values(Object.values(that['dataSemana' + a])[0])[(b - 1)].cats)[(c - 1)].messages).length;
                            // console.log('cuantosMessages_Semana', a + '_dia' + b + '_categoria' + c, that['cuantosMessages_Semana' + a + '_dia' + b + '_categoria' + c]);

                            for (d = 1; d <= that['cuantosMessages_Semana' + a + '_dia' + b + '_categoria' + c]; d++) {
                                that['cuantosTask_Semana' + a + '_dia' + b + '_categoria' + c + '_mensaje' + d] = Object.values(Object.values(Object.values(Object.values(Object.values(that['dataSemana' + a])[0])[(b - 1)].cats)[(c - 1)].messages)[(d - 1)].tasks).length;
                                // console.log('cuantosTask_Semana', a + '_dia' + b + '_categoria' + c + '_mensaje' + d, that['cuantosTask_Semana' + a + '_dia' + b + '_categoria' + c + '_mensaje' + d]);
                            }
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
                contenidoReporte += '<th class="row_head">Coach</th>';
                contenidoReporte += '<th class="row_head">IBP</th>';
                contenidoReporte += '<th class="row_head">Weeks</th>';
                contenidoReporte += '<th class="row_head">Days</th>';
                contenidoReporte += '<th class="row_head">Categories</th>';
                contenidoReporte += '<th class="row_head">Messages</th>';
                contenidoReporte += '<th class="row_head">Tasks</th>';
                contenidoReporte += '<th class="row_head">Check Coach</th>';
                contenidoReporte += '<th class="row_head">Check IBP</th>';
                contenidoReporte += '</tr>';
                contenidoReporte += '</thead>';
                contenidoReporte += '<tbody>';

                for (a = 1; a <= cuantasSemanas; a++) {
                    for (b = 1; b <= that['cuantosDias_Semana' + a]; b++) {
                        for (c = 1; c <= that['cuantasCats_Semana' + a + '_dia' + b]; c++) {
                            for (d = 1; d <= that['cuantosMessages_Semana' + a + '_dia' + b + '_categoria' + c]; d++) {
                                for (e = 1; e <= that['cuantosTask_Semana' + a + '_dia' + b + '_categoria' + c + '_mensaje' + d]; e++) {

                                    that['semana' + a + '_Checked'] = false;
                                    that['semana' + a + '_dia' + b + '_Checked'] = false;
                                    that['semana' + a + '_dia' + b + '_cat' + c + '_Checked'] = false;
                                    that['semana' + a + '_dia' + b + '_cat' + c + '_mensaje' + d + '_Checked'] = false;
                                    that['semana' + a + '_dia' + b + '_cat' + c + '_mensaje' + d + '_tarea' + e + '_Checked'] = false;

                                    that['semana' + a + '_CheckedDelPar'] = false;
                                    that['semana' + a + '_dia' + b + '_CheckedDelPar'] = false;
                                    that['semana' + a + '_dia' + b + '_cat' + c + '_CheckedDelPar'] = false;
                                    that['semana' + a + '_dia' + b + '_cat' + c + '_mensaje' + d + '_CheckedDelPar'] = false;
                                    that['semana' + a + '_dia' + b + '_cat' + c + '_mensaje' + d + '_tarea' + e + '_CheckedDelPar'] = false;


                                    contenidoReporte += '<tr>';
                                    if (a <= 1 && b <= 1 && c <= 1 && d <= 1 && e <= 1) {
                                        contenidoReporte += '<td class="row_nombre">' + data.Name.replace(/ /g, "&nbsp;") + '</td>';
                                        contenidoReporte += '<td>' + elNombreDelPar.replace(/ /g, "&nbsp;") + '</td>';
                                    } else {
                                        contenidoReporte += '<td class="row_nombre"> </td>';
                                        contenidoReporte += '<td> </td>';
                                    }
                                    if (b <= 1 && c <= 1 && d <= 1 && e <= 1) {
                                        that['idTablaSemana'] = a;
                                        // console.log('that[idTablaSemana]', that['idTablaSemana']);
                                        contenidoReporte += '<td>' + dataWeeks.weeks['wk' + a].replace(/ /g, "&nbsp;") + '</td>';
                                    } else {
                                        contenidoReporte += '<td> </td>';
                                    }
                                    if (c <= 1 && d <= 1 && e <= 1) {
                                        that['idTablaDia'] = b;
                                        // console.log('that[idTablaDia]', that['idTablaDia']);
                                        contenidoReporte += '<td>' + Object.values(Object.values(that['dataSemana' + a])[0])[(b - 1)].txt.replace(/ /g, "&nbsp;") + '</td>';
                                    } else {
                                        contenidoReporte += '<td> </td>';
                                    }
                                    if (d <= 1 && e <= 1) {
                                        that['idTablaCat'] = c;
                                        // console.log('that[idTablaCat]', that['idTablaCat']);
                                        contenidoReporte += '<td>' + Object.values(Object.values(Object.values(that['dataSemana' + a])[0])[(b - 1)].cats)[(c - 1)].cat_txt.replace(/ /g, "&nbsp;") + '</td>';
                                    } else {
                                        contenidoReporte += '<td></td>';
                                    }

                                    if (e <= 1) {
                                        that['idTablaMensaje'] = d;
                                        //    console.log('that[idTablaMensaje]', that['idTablaMensaje']);
                                        contenidoReporte += '<td>' + Object.values(Object.values(Object.values(Object.values(that['dataSemana' + a])[0])[(b - 1)].cats)[(c - 1)].messages)[(d - 1)].txt.replace(/ /g, "&nbsp;") + '</td>';
                                    } else {
                                        contenidoReporte += '<td></td>';
                                    }
                                    that['idTablaTarea'] = e;
                                    // console.log('that[idTablaTarea]', that['idTablaTarea']);
                                    contenidoReporte += '<td>' + Object.values(Object.values(Object.values(Object.values(Object.values(that['dataSemana' + a])[0])[(b - 1)].cats)[c - 1].messages)[d - 1].tasks)[(e - 1)].replace(/ /g, "&nbsp;") + '</td>';

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
                                                var elRegistroSemana = elRegistroSemanaPrev.split('_d')[0];
                                                // console.log('elRegistroSemana', elRegistroSemana);

                                                var elRegistroDiaPrev = lasTasks[(m - 1)].split('d')[1];
                                                // console.log('elRegistroDiaPrev', elRegistroDiaPrev);
                                                var elRegistroDia = elRegistroDiaPrev.split('_c')[0];
                                                // console.log('elRegistroDia', elRegistroDia);

                                                var elRegistroCatPrev = lasTasks[(m - 1)].split('c')[1];
                                                // console.log('elRegistroCatPrev', elRegistroCatPrev);
                                                var elRegistroCat = elRegistroCatPrev.split('_m')[0];
                                                // console.log('elRegistroCat', elRegistroCat);

                                                var elRegistroMensPrev = lasTasks[(m - 1)].split('m')[1];
                                                // console.log('elRegistroMensPrev', elRegistroMensPrev);
                                                var elRegistroMens = elRegistroMensPrev.split('_t')[0];
                                                // console.log('elRegistroMens', elRegistroMens);

                                                var elRegistroTaskPrev = lasTasks[(m - 1)].split('t')[1];
                                                // console.log('elRegistroTaskPrev', elRegistroTaskPrev);
                                                var elRegistroTask = elRegistroTaskPrev.split('_p')[0];
                                                // console.log('elRegistroTask', elRegistroTask);

                                                var elRegistroPerfil = lasTasks[(m - 1)].split('p')[1];
                                                // console.log('elRegistroPerfil', elRegistroPerfil);
                                            }

                                            if (elRegistroSemana == that['idTablaSemana']) {
                                                that['semana' + a + '_Checked'] = true;
                                                if (elRegistroDia == that['idTablaDia']) {
                                                    that['semana' + a + '_dia' + b + '_Checked'] = true;
                                                    if (elRegistroCat == that['idTablaCat']) {
                                                        that['semana' + a + '_dia' + b + '_cat' + c + '_Checked'] = true;
                                                        if (elRegistroMens == that['idTablaMensaje']) {
                                                            that['semana' + a + '_dia' + b + '_cat' + c + '_mensaje' + d + '_Checked'] = true;
                                                            if (elRegistroTask == that['idTablaTarea']) {
                                                                that['semana' + a + '_dia' + b + '_cat' + c + '_mensaje' + d + '_tarea' + e + '_Checked'] = true;
                                                            }
                                                        }
                                                    }
                                                }
                                            }

                                        } else {
                                            that['semana' + a + '_Checked'] = false;
                                            that['semana' + a + '_dia' + b + '_Checked'] = false;
                                            that['semana' + a + '_dia' + b + '_cat' + c + '_Checked'] = false;
                                            that['semana' + a + '_dia' + b + '_cat' + c + '_mensaje' + d + '_Checked'] = false;
                                            that['semana' + a + '_dia' + b + '_cat' + c + '_mensaje' + d + '_tarea' + e + '_Checked'] = false;
                                            d = 1;
                                        }
                                    }
                                    if (that['semana' + a + '_Checked']) {
                                        if (that['semana' + a + '_dia' + b + '_Checked']) {
                                            if (that['semana' + a + '_dia' + b + '_cat' + c + '_Checked']) {
                                                if (that['semana' + a + '_dia' + b + '_cat' + c + '_mensaje' + d + '_Checked']) {
                                                    if (that['semana' + a + '_dia' + b + '_cat' + c + '_mensaje' + d + '_tarea' + e + '_Checked']) {
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
                                    } else {
                                        contenidoReporte += '<td class="centrado_bold"> </td>';
                                    }


                                    for (m = 1; m <= cuantasTasksDelPar; m++) {

                                        if (cuantasTasksDelPar == 0) {
                                            lasTasksDelPar[(m - 1)] = ' ';
                                        }

                                        if (m <= cuantasTasksDelPar) {

                                            if (lasTasksDelPar[0] != '0') {
                                                var elRegistroSemanaDelParPrev = lasTasksDelPar[(m - 1)].split('laTask_s')[1];
                                                // console.log('elRegistroSemanaDelParPrev', elRegistroSemanaDelParPrev);
                                                var elRegistroSemanaDelPar = elRegistroSemanaDelParPrev.split('_d')[0];
                                                // console.log('elRegistroSemanaDelPar', elRegistroSemanaDelPar);

                                                var elRegistroDiaDelParPrev = lasTasksDelPar[(m - 1)].split('d')[1];
                                                // console.log('elRegistroDiaDelParPrev', elRegistroDiaDelParPrev);
                                                var elRegistroDiaDelPar = elRegistroDiaDelParPrev.split('_c')[0];
                                                // console.log('elRegistroDiaDelPar', elRegistroDiaDelPar);

                                                var elRegistroCatDelParPrev = lasTasksDelPar[(m - 1)].split('c')[1];
                                                // console.log('elRegistroCatPrevDelPar', elRegistroCatPrevDelPar);
                                                var elRegistroCatDelPar = elRegistroCatDelParPrev.split('_m')[0];
                                                // console.log('elRegistroCatDelPar', elRegistroCatDelPar);

                                                var elRegistroMensDelParPrev = lasTasksDelPar[(m - 1)].split('m')[1];
                                                // console.log('elRegistroMensPrev', elRegistroMensPrev);
                                                var elRegistroMensDelPar = elRegistroMensDelParPrev.split('_t')[0];
                                                // console.log('elRegistroMensDelPar', elRegistroMensDelPar);

                                                var elRegistroTaskDelParPrev = lasTasksDelPar[(m - 1)].split('t')[1];
                                                // console.log('elRegistroTaskDelParPrev', elRegistroTaskDelParPrev);
                                                var elRegistroTaskDelPar = elRegistroTaskDelParPrev.split('_p')[0];
                                                // console.log('elRegistroTaskDelPar', elRegistroTaskDelPar);

                                                var elRegistroPerfilDelPar = lasTasksDelPar[(m - 1)].split('p')[1];
                                                // console.log('elRegistroPerfilDelPar', elRegistroPerfilDelPar);
                                            }

                                            if (elRegistroSemanaDelPar == that['idTablaSemana']) {
                                                that['semana' + a + '_CheckedDelPar'] = true;
                                                if (elRegistroDiaDelPar == that['idTablaDia']) {
                                                    that['semana' + a + '_dia' + b + '_CheckedDelPar'] = true;
                                                    if (elRegistroCatDelPar == that['idTablaCat']) {
                                                        that['semana' + a + '_dia' + b + '_cat' + c + '_CheckedDelPar'] = true;
                                                        if (elRegistroMensDelPar == that['idTablaMensaje']) {
                                                            that['semana' + a + '_dia' + b + '_cat' + c + '_mensaje' + d + '_CheckedDelPar'] = true;
                                                            if (elRegistroTaskDelPar == that['idTablaTarea']) {
                                                                that['semana' + a + '_dia' + b + '_cat' + c + '_mensaje' + d + '_tarea' + e + '_CheckedDelPar'] = true;
                                                            }
                                                        }
                                                    }
                                                }
                                            }

                                        } else {
                                            that['semana' + a + '_CheckedDelPar'] = false;
                                            that['semana' + a + '_dia' + b + '_CheckedDelPar'] = false;
                                            that['semana' + a + '_dia' + b + '_cat' + c + '_CheckedDelPar'] = false;
                                            that['semana' + a + '_dia' + b + '_cat' + c + '_mensaje' + d + '_CheckedDelPar'] = false;
                                            that['semana' + a + '_dia' + b + '_cat' + c + '_mensaje' + d + '_tarea' + e + '_CheckedDelPar'] = false;
                                            d = 1;
                                        }
                                    }
                                    if (that['semana' + a + '_CheckedDelPar']) {
                                        if (that['semana' + a + '_dia' + b + '_CheckedDelPar']) {
                                            if (that['semana' + a + '_dia' + b + '_cat' + c + '_CheckedDelPar']) {
                                                if (that['semana' + a + '_dia' + b + '_cat' + c + '_mensaje' + d + '_CheckedDelPar']) {
                                                    if (that['semana' + a + '_dia' + b + '_cat' + c + '_mensaje' + d + '_tarea' + e + '_CheckedDelPar']) {
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
                                    } else {
                                        contenidoReporte += '<td class="centrado_bold"> </td>';
                                    }


                                    contenidoReporte += '</tr>';
                                }
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
