 function activaSeccionTasks() {
     console.log('seccionTasks');
     ajustaTamano();

     var totalDiasPorSemana = 0;
     var totalCategoriasPorDia = 0;
     this.numTasksChecked_ibp = 0;
     this.numTasksChecked_coach = 0;
     var totalTasksPorCategoria = 0;
     this.arrayTasks_ibp = [];
     this.arrayTasks_coach = [];
     this.arrayTasksLeido_ibp = [];
     this.arrayTasksLeido_coach = [];
     __that = this;

     function cargaTasks() {
         $.ajax({
             url: 'js/week' + laSemana + '.json',
             type: 'get',
             dataType: 'json',
             cache: false,
             success: pintaTasks,
             async: true,
         });
     };

     function pintaTasks(data) {
         console.log(data);
         var cuantasTasks = Object.keys(data['week' + laSemana]).length;
         // console.log('cuantasTasks', cuantasTasks);

         for (a = 1; a <= cuantasTasks; a++) {
             this['cuantasCategorias' + a] = Object.keys(Object.values(data['week' + laSemana])[(a - 1)].cats).length;
             // console.log('cuantasCategorias' + a, this['cuantasCategorias' + a]);

             for (b = 1; b <= this['cuantasCategorias' + a]; b++) {
                 this['cat' + a + '_cuantosMessages' + b] = Object.keys(Object.values(Object.values(data['week' + laSemana])[(elDia - 1)].cats)[(laCategoria - 1)].messages).length;
                 // console.log('cat' + a + '_cuantosMessages' + b, this['cat' + a + '_cuantosMessages' + b]);

                 for (c = 1; c <= this['cat' + a + '_cuantosMessages' + b]; c++) {
                     this['cat' + a + '_msg' + b + '_cuantasTasks' + c] = Object.keys(Object.values(Object.values(Object.values(data['week' + laSemana])[(elDia - 1)].cats)[(laCategoria - 1)].messages)[(c - 1)].tasks).length;
                     // console.log('cat' + a + '_msg' + b + '_cuantasTasks' + c, this['cat' + a + '_msg' + b + '_cuantasTasks' + c]);
                 }
             }
         }
         that = this;

         totalDiasPorSemana = Object.keys(data['week' + laSemana]).length;
         console.log('totalDiasPorSemana', totalDiasPorSemana);
         totalCategoriasPorDia = Object.keys(Object.values(data['week' + laSemana])[(elDia - 1)].cats).length
         console.log('TotalCategoriasporDia', totalCategoriasPorDia);
         for (d = 1; d <= this['cat' + laCategoria + '_cuantosMessages' + c]; d++) {
             totalTasksPorCategoria += Object.keys(Object.values(Object.values(Object.values(data['week' + laSemana])[(elDia - 1)].cats)[(laCategoria - 1)].messages)[(d - 1)].tasks).length;

         }
         console.log('totalTasksPorCategoria', totalTasksPorCategoria);

         totalGlobalCategorias = totalCategoriasPorDia;
         totalGlobalDias = totalDiasPorSemana;
         /*************************TERMINA CAMBIOS****************************************************/

         var contenidoTasks = '';
         $('#lasTasks').empty();

         contenidoTasks += '<h3 class="title centrado">' + Object.values(data['week' + laSemana])[(elDia - 1)].txt + '</h3>';
         contenidoTasks += '<br>';
         contenidoTasks += '<div class="titulo_categoria">';
         // contenidoTasks += '<i class="titulo_categoria_img material-icons-outlined">' + Object.values(Object.values(data['week' + laSemana])[(elDia - 1)].cats)[(laCategoria - 1)].cat_icon + '</i>';
         // contenidoTasks += '<img  style="display:block;padding-top:20px;padding-bottom:30px; width:55px; margin-left:auto; margin-right:auto;" src="./img/' + Object.values(Object.values(data['week' + laSemana])[(elDia - 1)].cats)[(laCategoria - 1)].cat_icon + '.png" />';
         contenidoTasks += '<div class="titulo_categoria_txt">' + Object.values(Object.values(data['week' + laSemana])[(elDia - 1)].cats)[(laCategoria - 1)].cat_txt + '</div>';
         contenidoTasks += '</div>';
         contenidoTasks += '<div class="divider_linea"></div>';
         contenidoTasks += '<br>';

         // for (a = 1; a <= that['cuantasCategorias' + elDia]; a++) {
         // contenidoTasks += '<br>';

         for (b = 1; b <= that['cat' + elDia + '_cuantosMessages' + laCategoria]; b++) {
             contenidoTasks += '<br>';
             contenidoTasks += '<table style="width:100%">';
             contenidoTasks += '<div>' + Object.values(Object.values(Object.values(data['week' + laSemana])[(elDia - 1)].cats)[(laCategoria - 1)].messages)[(b - 1)].txt + '</div>';

             contenidoTasks += '<tr>';
             contenidoTasks += '<th style="width: 100%;"></th>';
             contenidoTasks += '<th>New IBP</th>';
             contenidoTasks += '<th>Coach</th>';
             contenidoTasks += '</tr>';

             for (c = 1; c <= that['cat' + elDia + '_msg' + laCategoria + '_cuantasTasks' + b]; c++) {
                 contenidoTasks += '<tr class="tabla_row" style="height: 200px;">';
                 contenidoTasks += '<td class=" ">' + Object.values(Object.values(Object.values(Object.values(data['week' + laSemana])[(elDia - 1)].cats)[(laCategoria - 1)].messages)[(b - 1)].tasks)[(c - 1)] + '</td>';
                 contenidoTasks += '<td>';
                 contenidoTasks += '<input type="checkbox" id="' + 'laTask_s' + laSemana + '_d' + elDia + '_c' + laCategoria + '_m' + b + '_t' + c + '_p1' + '" class="check check1">';
                 contenidoTasks += '<label class="label_class" for="' + 'laTask_s' + laSemana + '_d' + elDia + '_c' + laCategoria + '_m' + b + '_t' + c + '_p1' + '"></label>';
                 contenidoTasks += '</td>';
                 contenidoTasks += '<td>';
                 contenidoTasks += '<input type="checkbox" id="' + 'laTask_s' + laSemana + '_d' + elDia + '_c' + laCategoria + '_m' + b + '_t' + c + '_p2' + '" class="check check2">';
                 contenidoTasks += '<label class="label_class" for="' + 'laTask_s' + laSemana + '_d' + elDia + '_c' + laCategoria + '_m' + b + '_t' + c + '_p2' + '"></label>';
                 contenidoTasks += '</td>';
                 contenidoTasks += '</tr>';
             }

             contenidoTasks += '</table>';
         }
         // }
         if (laCategoria == that['cuantasCategorias' + elDia]) {
             // contenidoTasks += '<br><div class="divider_linea"></div>';
             contenidoTasks += '<br><div>' + Object.values(data['week' + laSemana])[(elDia - 1)].final_message + '</div>';
             contenidoTasks += '<br><div class="divider_linea"></div>';
         }
         contenidoTasks += '<br>';
         contenidoTasks += '<div id="botonGuardarNext" class="button button-primary boton_guardar">Save & Next</div>';
         contenidoTasks += '<div id="botonGuardar" class="button button-primary boton_guardar">Save</div>';
         contenidoTasks += '<br><br><br><br><br><br>';

         $('#lasTasks').append(contenidoTasks);

         for (b = 1; b <= that['cat' + elDia + '_cuantosMessages' + laCategoria]; b++) {
             for (c = 1; c <= that['cat' + elDia + '_msg' + laCategoria + '_cuantasTasks' + b]; c++) {
                 for (d = 1; d <= 2; d++) {
                     $('#laTask_s' + laSemana + '_d' + elDia + '_c' + laCategoria + '_m' + b + '_t' + c + '_p' + d).click(function(event) {
                         event.preventDefault();

                         checkea($(this).attr('id'));

                         // Swal.fire({
                         //     title: 'Are you sure?',
                         //     text: "You won't be able to revert this!",
                         //     icon: 'question',
                         //     showCancelButton: true,
                         //     confirmButtonColor: '#6ab129',
                         //     cancelButtonColor: '#da4730',
                         //     confirmButtonText: 'Yes, check it!'
                         // }).then((result) => {
                         //     if (result.isConfirmed) {
                         //         Swal.fire(
                         //             'Checked!',
                         //             'This task has been checked.',
                         //             'success'
                         //         )
                         //         $(this).prop("checked", "checked");
                         //         $(this).attr("disabled", "disabled");
                         //     }
                         //     if (result.isDismissed || result.isDenied) {
                         //         $(this).prop("checked", false);
                         //         $(this).prop("disabled", false);
                         //     }
                         // })
                     });
                 }
             }
         }

         /*if (laCategoria >= totalCategoriasPorDia) {
             habilitaBoton($('#botonGuardarNext'), false);
             //console.log('Llego a su limite de categorias');
             //incrementaDia();
         }*/
         if (laSemana >= totalGolabalSemanas) {
             //console.log('primer if');
             if (elDia >= totalGlobalDias) {
                 //console.log('segundo if');
                 if (laCategoria >= totalGlobalCategorias) {
                     //console.log('tercer if');
                     habilitaBoton($('#botonGuardarNext'), false);
                 }
             }

         }

         $('#botonGuardar').click(function(event) {
             event.preventDefault();
             guardaTasks('normal');
         });

         $('#botonGuardarNext').click(function(event) {
             event.preventDefault();
             guardaTasks('next');
             incrementaCategoria();
         });

         if (!isMobile) {
             var scrollTasks = Scrollbar.init($('.seccion_tasks')[0]);
         }
         ajustaTamano();


         return leeRegTasks();
     }


     function checkea(cualCheckea) {

         setTimeout(function() {
             if (cualCheckea != 0) {
                 var cualCheckeaPrevPerfil = cualCheckea.split('_p')[0];
                 var cualCheckeaPerfil = parseInt(cualCheckea.split('_p')[1]);
             }
             //  console.log('checkea', cualCheckea, ' y cualCheckeaPerfil', cualCheckeaPerfil);



             __that['numTasksChecked' + el_sub] = 0;
             __that['numTasksChecked' + el_sub_par] = 0;

             switch (el_sub) {
                 case '_ibp':

                     switch (cualCheckeaPerfil) {
                         case 1:
                             if ($('#' + cualCheckea).prop("checked")) {
                                 if ($.inArray(cualCheckea, __that['arrayTasks' + el_sub]) != -1) {
                                     __that['arrayTasks' + el_sub].splice($.inArray(cualCheckea, __that['arrayTasks' + el_sub]), 1);
                                 }
                                 $('#' + cualCheckea).prop("checked", false);
                             } else {
                                 if ($.inArray(cualCheckea, __that['arrayTasks' + el_sub]) == -1) {
                                     if (__that['arrayTasks' + el_sub] == 0) {
                                         __that['arrayTasks' + el_sub][0] = cualCheckea;
                                     } else {
                                         __that['arrayTasks' + el_sub].push(cualCheckea);
                                     }
                                 }
                                 $('#' + cualCheckea).prop("checked", "checked");
                             }
                             break;

                         case 2:
                             if ($('#' + cualCheckea).prop("checked")) {
                                 if ($.inArray(cualCheckea, __that['arrayTasks' + el_sub_par]) != -1) {
                                     __that['arrayTasks' + el_sub_par].splice($.inArray(cualCheckea, __that['arrayTasks' + el_sub_par]), 1);
                                 }
                                 $('#' + cualCheckea).prop("checked", false);
                             } else {
                                 if ($.inArray(cualCheckea, __that['arrayTasks' + el_sub_par]) == -1) {
                                     if (__that['arrayTasks' + el_sub_par] == 0) {
                                         __that['arrayTasks' + el_sub_par][0] = cualCheckea;
                                     } else {
                                         __that['arrayTasks' + el_sub_par].push(cualCheckea);
                                     }
                                 }
                                 $('#' + cualCheckea).prop("checked", "checked");
                             }
                             break;

                         default:
                             break;
                     }

                     $(".check1:checkbox:checked").each(function() {
                         __that['numTasksChecked' + el_sub] = $(".check1:checkbox:checked").length;
                     });
                     $(".check2:checkbox:checked").each(function() {
                         __that['numTasksChecked' + el_sub_par] = $(".check2:checkbox:checked").length;
                     });
                     break;

                 case '_coach':

                     switch (cualCheckeaPerfil) {
                         case 1:
                             if ($('#' + cualCheckea).prop("checked")) {
                                 if ($.inArray(cualCheckea, __that['arrayTasks' + el_sub_par]) != -1) {
                                     __that['arrayTasks' + el_sub_par].splice($.inArray(cualCheckea, __that['arrayTasks' + el_sub_par]), 1);
                                 }
                                 $('#' + cualCheckea).prop("checked", false);
                             } else {
                                 if ($.inArray(cualCheckea, __that['arrayTasks' + el_sub_par]) == -1) {
                                     if (__that['arrayTasks' + el_sub_par] == 0) {
                                         __that['arrayTasks' + el_sub_par][0] = cualCheckea;
                                     } else {
                                         __that['arrayTasks' + el_sub_par].push(cualCheckea);
                                     }
                                 }
                                 $('#' + cualCheckea).prop("checked", "checked");
                             }
                             break;

                         case 2:
                             if ($('#' + cualCheckea).prop("checked")) {
                                 if ($.inArray(cualCheckea, __that['arrayTasks' + el_sub]) != -1) {
                                     __that['arrayTasks' + el_sub].splice($.inArray(cualCheckea, __that['arrayTasks' + el_sub]), 1);
                                 }
                                 $('#' + cualCheckea).prop("checked", false);
                             } else {
                                 if ($.inArray(cualCheckea, __that['arrayTasks' + el_sub]) == -1) {
                                     if (__that['arrayTasks' + el_sub] == 0) {
                                         __that['arrayTasks' + el_sub][0] = cualCheckea;
                                     } else {
                                         __that['arrayTasks' + el_sub].push(cualCheckea);
                                     }
                                 }
                                 $('#' + cualCheckea).prop("checked", "checked");
                             }
                             break;

                         default:
                             break;
                     }

                     $(".check1:checkbox:checked").each(function() {
                         __that['numTasksChecked' + el_sub_par] = $(".check1:checkbox:checked").length;
                     });
                     $(".check2:checkbox:checked").each(function() {
                         __that['numTasksChecked' + el_sub] = $(".check2:checkbox:checked").length;
                     });
                     break;

                 default:
                     break;
             }

             console.log('arrayTasks', el_sub, __that['arrayTasks' + el_sub]);
             console.log('arrayTasks', el_sub_par, __that['arrayTasks' + el_sub_par]);

             console.log('numTasksChecked', el_sub, __that['numTasksChecked' + el_sub], ' y totalTasksPorCategoria', totalTasksPorCategoria);
             console.log('numTasksChecked', el_sub_par, __that['numTasksChecked' + el_sub_par], ' y totalTasksPorCategoria', totalTasksPorCategoria);
         }, 10);
     }


     function leeRegTasks() {
         console.log('leeRegTasks', usuarioId, usuarioSeleccionadoId, elRol);

         var cualUsuarioId = usuarioId;
         if (usuarioSeleccionadoId != undefined) {
             cualUsuarioId = usuarioSeleccionadoId;
         }

         if (revisaConexion) {

             firebase.database().ref(laUrlBase + 'Usuarios/' + cualUsuarioId + '/Registro').once('value').then(function(snapshot) {
                 if (snapshot.val() != null) {
                     console.log('snapshot.val()', snapshot.val());

                     var arrayTasks = snapshot.val();
                     console.log('arrayTasks', arrayTasks);


                     __that['arrayTasks' + el_sub] = arrayTasks['tasks' + el_sub];
                     __that['arrayTasks' + el_sub_par] = arrayTasks['tasks' + el_sub_par];

                     if (__that['arrayTasks' + el_sub] == undefined) {
                         __that['arrayTasks' + el_sub] = [0];
                     }
                     if (__that['arrayTasks' + el_sub_par] == undefined) {
                         __that['arrayTasks' + el_sub_par] = [0];
                     }

                     console.log('arrayTasks', el_sub, __that['arrayTasks' + el_sub]);
                     console.log('arrayTasks', el_sub_par, __that['arrayTasks' + el_sub_par]);

                     return pintaRegTasks();

                 } else {
                     cuantasTasks = 0;
                     return pintaRegTasks();
                 }
             });

         }

         return $.ajax();
     }


     function pintaRegTasks() {
         console.log('pintaRegTasks', elRol);
         //  console.log('arrayTasks', el_sub, __that['arrayTasks' + el_sub]);
         //  console.log('arrayTasks', el_sub_par, __that['arrayTasks' + el_sub_par]);

         //  setTimeout(function() {
         for (a = 0; a < __that['arrayTasks' + el_sub].length; a++) {
             console.log('inArray', $.inArray(__that['arrayTasks' + el_sub][a], __that['arrayTasks' + el_sub]));
             checkea(__that['arrayTasks' + el_sub][a]);
         }
         for (aa = 0; aa < __that['arrayTasks' + el_sub_par].length; aa++) {
             console.log('inArray', $.inArray(__that['arrayTasks' + el_sub_par][aa], __that['arrayTasks' + el_sub_par]));
             checkea(__that['arrayTasks' + el_sub_par][aa]);
         }
         //  }, 1000);

         for (b = 1; b <= that['cat' + elDia + '_cuantosMessages' + laCategoria]; b++) {
             for (c = 1; c <= that['cat' + elDia + '_msg' + laCategoria + '_cuantasTasks' + b]; c++) {
                 if (elRol === 'IBP') {
                     $('#laTask_s' + laSemana + '_d' + elDia + '_c' + laCategoria + '_m' + b + '_t' + c + '_p' + 2).parent().css({
                         "opacity": "0.5"
                     })
                     $('#laTask_s' + laSemana + '_d' + elDia + '_c' + laCategoria + '_m' + b + '_t' + c + '_p' + 2).prop("disabled", "disabled");
                     $('#laTask_s' + laSemana + '_d' + elDia + '_c' + laCategoria + '_m' + b + '_t' + c + '_p' + 2).next().css({
                         "pointer-events": "none"
                     })
                 }
                 if (elRol === 'Coach') {
                     $('#laTask_s' + laSemana + '_d' + elDia + '_c' + laCategoria + '_m' + b + '_t' + c + '_p' + 1).parent().css({
                         "opacity": "0.5"
                     })
                     $('#laTask_s' + laSemana + '_d' + elDia + '_c' + laCategoria + '_m' + b + '_t' + c + '_p' + 1).prop("disabled", "disabled");
                     $('#laTask_s' + laSemana + '_d' + elDia + '_c' + laCategoria + '_m' + b + '_t' + c + '_p' + 1).next().css({
                         "pointer-events": "none"
                     })
                 }
             }
         }

     }

     function guardaTasks(modo) {
         console.log('guardaTasks', __that['arrayTasks' + el_sub]);

         var cualUsuarioId = usuarioId;
         if (usuarioSeleccionadoId != undefined) {
             cualUsuarioId = usuarioSeleccionadoId;
         }

         var onComplete = function(error) {
             if (error) {
                 console.log('Ocurrió un error en la sincronización.');
             } else {
                 console.log('Sincronización realizada.');
                 guardaStatus(modo);
             };
         };


         console.log('Guardando . . . ');
         var dataRef = firebase.database().ref(laUrlBase + 'Usuarios');
         var keyUsuario = dataRef.ref.child(cualUsuarioId + '/Registro/tasks' + el_sub);
         //  console.log(nuevoTaskData);
         firebase.database().ref(keyUsuario).set(__that['arrayTasks' + el_sub], onComplete);

     }

     function guardaStatus(modo) {
         console.log('guardaStatus', laCategoria, ' con numTasksChecked', el_sub, __that['numTasksChecked' + el_sub], ' de totalTasksPorCategoria', totalTasksPorCategoria);

         if (__that['numTasksChecked' + el_sub] >= totalTasksPorCategoria) {
             if ($.isArray(_that['arrayStatusCats' + el_sub])) {
                 if ($.inArray('week' + laSemana + '_day' + elDia + '_cat' + laCategoria, _that['arrayStatusCats' + el_sub]) == -1) {
                     if (_that['arrayStatusCats' + el_sub][0] == 0) {
                         _that['arrayStatusCats' + el_sub] = ['week' + laSemana + '_day' + elDia + '_cat' + laCategoria];
                     } else {
                         _that['arrayStatusCats' + el_sub].push('week' + laSemana + '_day' + elDia + '_cat' + laCategoria);
                     }
                 }
             } else {
                 _that['arrayStatusCats' + el_sub] = ['week' + laSemana + '_day' + elDia + '_cat' + laCategoria];
             }
         } else {
             if ($.isArray(_that['arrayStatusCats' + el_sub])) {
                 if ($.inArray('week' + laSemana + '_day' + elDia + '_cat' + laCategoria, _that['arrayStatusCats' + el_sub]) != -1) {
                     _that['arrayStatusCats' + el_sub].splice($.inArray('week' + laSemana + '_day' + elDia + '_cat' + laCategoria, _that['arrayStatusCats' + el_sub]), 1);
                 }
             }
         }

         var cualUsuarioId = usuarioId;
         if (usuarioSeleccionadoId != undefined) {
             cualUsuarioId = usuarioSeleccionadoId;
         }

         console.log('arrayStatusCats', el_sub, _that['arrayStatusCats' + el_sub]);
         var onComplete = function(error) {
             if (error) {
                 console.log('Ocurrió un error en la sincronización.');
             } else {
                 console.log('Sincronización realizada.');
                 terminaGuardar(modo);
             };
         };

         console.log('Guardando . . . ');
         var dataRef = firebase.database().ref(laUrlBase + 'Usuarios');
         var elData = dataRef.ref.child(cualUsuarioId + '/Registro/status' + el_sub + '/cats_completed');
         firebase.database().ref(elData).set(_that['arrayStatusCats' + el_sub], onComplete);

     }


     function terminaGuardar(modo) {
         if (modo == 'normal') {
             loadSeccion('home');
         }
     }


     cargaTasks();

 }

 function incrementaCategoria() {
     if (laCategoria >= totalGlobalCategorias) {
         laCategoria = 1;
         incrementaDia();
     } else {
         laCategoria++;
         loadSeccion('tasks');
     }

 }

 function incrementaSemana() {
     if (laSemana >= totalGolabalSemanas) {
         console.log('primer if');
         if (elDia >= totalGlobalDias) {
             console.log('segundo if');
             if (laCategoria >= totalGlobalCategorias) {
                 console.log('tercer if');
                 habilitaBoton($('#botonGuardarNext'), false);
             }
         }

     } else {
         laSemana++;
         loadSeccion('tasks');
     }

 }

 function incrementaDia() {

     if (elDia >= totalGlobalDias) {
         elDia = 1;
         incrementaSemana();
     } else {
         elDia++;
         loadSeccion('tasks');
     }


 }
