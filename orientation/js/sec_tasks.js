 function activaSeccionTasks() {
     console.log('seccionTasks');

     var laURLTasks = "" + laUrlAPI + "/Tasks/.json?auth=" + secret + "";
     //  var laURLTasks = "js/tasks.json";
     console.log('laURLTasks', laURLTasks);


     ajustaTamano();

     //  var totalDiasPorSemana = 0;
     var totalCategoriasPorSemana = 0;
     this.numTasksChecked = 0;
     var totalTasksPorCategoria = 0;
     this.arrayTasks = [];
     this.arrayTasksLeido = [];
     __that = this;

     function cargaTasks() {
         $.ajax({
             //  url: 'js/tasks.json',
             url: laURLTasks,
             type: 'get',
             dataType: 'json',
             cache: false,
             success: pintaTasks,
             async: true,
         });
     };

     function pintaTasks(data) {
         console.log(data);

         cuantasCats = Object.keys(data.weeks['week0' + laSemana].cats).length;
         console.log('cuantasCats', cuantasCats);

         for (a = 1; a <= cuantasCats; a++) {
             this['cuantasCategorias' + laSemana] = Object.keys(Object.values(data.weeks['week0' + laSemana].cats)).length;
             console.log('cuantasCategorias' + laSemana, this['cuantasCategorias' + laSemana]);

             for (b = 1; b <= this['cuantasCategorias' + laSemana]; b++) {
                 this['cat' + laSemana + '_cuantasSubcategorias' + b] = Object.keys(Object.values(data.weeks['week0' + laSemana].cats)[(b - 1)].subcats).length;
                 console.log('cat' + laSemana + '_cuantasSubcategorias' + b, this['cat' + laSemana + '_cuantasSubcategorias' + b]);

                 for (c = 1; c <= this['cat' + laSemana + '_cuantasSubcategorias' + b]; c++) {
                     this['cat' + laSemana + '_cuantasSubcategorias' + b + '_cuantasTasks' + c] = Object.keys(Object.values(Object.values(data.weeks['week0' + laSemana].cats)[(b - 1)].subcats)[(c - 1)].tasks).length;
                     console.log('cat' + laSemana + '_cuantasSubcategorias' + b + '_cuantasTasks' + c, this['cat' + laSemana + '_cuantasSubcategorias' + b + '_cuantasTasks' + c]);




                 }
             }
         }

         for (d = 1; d <= this['cat' + laSemana + '_cuantasSubcategorias' + laCategoria]; d++) {
             for (e = 1; e <= this['cat' + laSemana + '_cuantasSubcategorias' + laCategoria + '_cuantasTasks' + d]; e++) {

                 if (Object.values(Object.values(Object.values(Object.values(data.weeks['week0' + laSemana].cats))[(laCategoria - 1)].subcats)[(d - 1)].tasks)[(e - 1)][1] != 'all') {

                     totalTasksPorCategoria += Object.values(Object.values(Object.values(Object.values(data.weeks['week0' + laSemana].cats))[(laCategoria - 1)].subcats)[(d - 1)].tasks)[(e - 1)][1];

                 } else {

                     totalTasksPorCategoria += 1;

                 }
             }
             console.log('totalTasksPorCategoria', totalTasksPorCategoria);
         }

         //  for (d = 1; d <= this['cat' + laSemana + '_cuantasSubcategorias' + laCategoria]; d++) {
         //      totalTasksPorCategoria += Object.keys(Object.values(Object.values(data.weeks['week0' + laSemana].cats)[(laCategoria - 1)].subcats)[(d - 1)].tasks).length;
         //      console.log('totalTasksPorCategoria', totalTasksPorCategoria);
         //  }

         that = this;

         //  for (b = 1; b <= that['cuantasCategorias' + laSemana]; b++) {
         // for (c = 1; c <= that['cat' + laSemana + '_subcat' + laCategoria + '_cuantasTasks' + b]; c++) {

         console.log('totalTasksPorCategoria', totalTasksPorCategoria);
         //  totalDiasPorSemana = Object.keys(data.weeks['week0' + laSemana]).length;
         //  console.log('totalDiasPorSemana', totalDiasPorSemana);
         totalCategoriasPorSemana = Object.keys(data.weeks['week0' + laSemana].cats).length;
         console.log('totalCategoriasPorSemana', totalCategoriasPorSemana);


         totalGlobalCategorias = totalCategoriasPorSemana;
         //  totalGlobalDias = totalDiasPorSemana;
         /*************************TERMINA CAMBIOS****************************************************/

         var contenidoTasks = '';
         $('#lasTasks').empty();

         //  contenidoTasks += '<h3 class="title centrado">' + Object.values(data.weeks)[(laSemana - 1)].name + '</h3>';
         //  contenidoTasks += '<div id="botonGuardar" class="button button-primary boton_guardar">Save</div>';
         //  contenidoTasks += '<br>';
         contenidoTasks += '<div class="titulo_categoria">';
         // contenidoTasks += '<i class="titulo_categoria_img material-icons-outlined">' + Object.values(Object.values(data['week' + laSemana])[(laSemana - 1)].cats)[(laCategoria - 1)].cat_icon + '</i>';
         // contenidoTasks += '<img  style="display:block;padding-top:20px;padding-bottom:30px; width:55px; margin-left:auto; margin-right:auto;" src="./img/' + Object.values(Object.values(data['week' + laSemana])[(laSemana - 1)].cats)[(laCategoria - 1)].cat_icon + '.png" />';
         contenidoTasks += '<div class="titulo_categoria_txt centrado">' + Object.values(Object.values(data.weeks['week0' + laSemana].cats))[(laCategoria - 1)].name + '</div>';

         contenidoTasks += '</div>';
         contenidoTasks += '<div class="divider_linea"></div>';
         contenidoTasks += '<br>';


         for (b = 1; b <= that['cat' + laSemana + '_cuantasSubcategorias' + laCategoria]; b++) {

             contenidoTasks += '<br>';

             contenidoTasks += '<div class="titulo_subcategoria_txt">' + Object.values(Object.values(Object.values(data.weeks['week0' + laSemana].cats))[(laCategoria - 1)].subcats)[(b - 1)].name + '</div>';
             //  contenidoTasks += '<br>';

             //  contenidoTasks += '<tr>';
             if (elRol === 'Admin') {
                 contenidoTasks += '<th></th>';
             }
             contenidoTasks += '<p style="width: 100%;"></p>';


             for (c = 1; c <= that['cat' + laSemana + '_cuantasSubcategorias' + laCategoria + '_cuantasTasks' + b]; c++) {

                 contenidoTasks += '<div style="background-color: #ededed; border-radius: 4px; padding: 20px;">';

                 if (elRol === 'Admin') {
                     contenidoTasks += '<div id="' + 'laTaskTexto_s' + laSemana + '_c' + laCategoria + '_sc' + b + '_t' + c + '" class=" " style="line-height: 1;"><div id="boton_edit_s' + laSemana + '_c' + laCategoria + '_sc' + b + '_t' + c + '" class="boton_edit"><span class="icon_edit material-icons">edit</span></div></div>';
                 }

                 if (Object.values(Object.values(Object.values(Object.values(data.weeks['week0' + laSemana].cats))[(laCategoria - 1)].subcats)[(b - 1)].tasks)[(c - 1)][2] != 'no_tool') {
                     contenidoTasks += '<div id="' + 'laTaskTexto_s' + laSemana + '_c' + laCategoria + '_sc' + b + '_t' + c + '" class=" "><a href="' + Object.values(Object.values(Object.values(Object.values(data.weeks['week0' + laSemana].cats))[(laCategoria - 1)].subcats)[(b - 1)].tasks)[(c - 1)][2] + '" target="_blank">' + Object.values(Object.values(Object.values(Object.values(data.weeks['week0' + laSemana].cats))[(laCategoria - 1)].subcats)[(b - 1)].tasks)[(c - 1)][0] + '</a></div>';
                 } else {
                     contenidoTasks += '<div id="' + 'laTaskTexto_s' + laSemana + '_c' + laCategoria + '_sc' + b + '_t' + c + '" class=" ">' + Object.values(Object.values(Object.values(Object.values(data.weeks['week0' + laSemana].cats))[(laCategoria - 1)].subcats)[(b - 1)].tasks)[(c - 1)][0] + '</div>';
                 }

                 contenidoTasks += '<table style="width: 80%; margin: 0 auto;">';
                 //  contenidoTasks += '<tr class="tabla_row">';
                 //  contenidoTasks += '</tr>';
                 contenidoTasks += '<tr>';

                 if (Object.values(Object.values(Object.values(Object.values(data.weeks['week0' + laSemana].cats))[(laCategoria - 1)].subcats)[(b - 1)].tasks)[(c - 1)][1] != 'all') {

                     for (d = 1; d <= Object.values(Object.values(Object.values(Object.values(data.weeks['week0' + laSemana].cats))[(laCategoria - 1)].subcats)[(b - 1)].tasks)[(c - 1)][1]; d++) {
                         contenidoTasks += '<td style="border-top: solid 0px #ddd;">';
                         contenidoTasks += '<input type="checkbox" id="' + 'laTask_s' + laSemana + '_c' + laCategoria + '_sc' + b + '_t' + c + '_d' + d + '" class="check">';
                         contenidoTasks += '<label class="label_class" for="' + 'laTask_s' + laSemana + '_c' + laCategoria + '_sc' + b + '_t' + c + '_d' + d + '" data-before="Day ' + d + '"></label>';
                         contenidoTasks += '</td>';
                     }
                 } else {
                     contenidoTasks += '<td style="border-top: solid 0px #ddd;">';
                     contenidoTasks += '<input type="checkbox" id="' + 'laTask_s' + laSemana + '_c' + laCategoria + '_sc' + b + '_t' + c + '" class="check">';
                     contenidoTasks += '<label class="label_class" for="' + 'laTask_s' + laSemana + '_c' + laCategoria + '_sc' + b + '_t' + c + '" data-before="To Complete"></label>';
                     contenidoTasks += '</td>';
                 }

                 contenidoTasks += '</tr>';
                 contenidoTasks += '</table>';
                 contenidoTasks += '</div>';
                 contenidoTasks += '<br>';

             }
         }

         contenidoTasks += '<br>';
         contenidoTasks += '<div class="titulo_subcategoria_txt">Progress</div>';
         contenidoTasks += '<br>';
         contenidoTasks += '<div class="progress">';
         contenidoTasks += '<div class="progress_bar">';
         contenidoTasks += '</div>';
         contenidoTasks += '</div>';
         contenidoTasks += '<br>';



         $('#lasTasks').append(contenidoTasks);

         $('.subname1_txt').text(Object.values(Object.values(data.weeks['week0' + laSemana].cats))[(laCategoria - 1)].subname1);
         $('.subname2_txt').text(Object.values(Object.values(data.weeks['week0' + laSemana].cats))[(laCategoria - 1)].subname2);


         for (b = 1; b <= that['cat' + laSemana + '_cuantasSubcategorias' + laCategoria]; b++) {
             for (c = 1; c <= that['cat' + laSemana + '_cuantasSubcategorias' + laCategoria + '_cuantasTasks' + b]; c++) {

                 $('#boton_edit_s' + laSemana + '_c' + laCategoria + '_sc' + b + '_t' + c).click(function(event) {
                     event.preventDefault();
                     console.log('edit', $(this).attr('id'));
                     var laTaskTextoNuevo;

                     Swal.fire({
                         icon: 'warning',
                         title: 'Edit this task',
                         //  text: "You won't be able to revert this!",
                         input: 'textarea',
                         //  inputLabel: 'Message',
                         inputPlaceholder: 'Type new text...',
                         inputAttributes: {
                             'id': 'laTaskTextoEdit_s' + laSemana + '_c' + laCategoria + '_sc' + b + '_t' + c
                         },
                         showCancelButton: true,
                         confirmButtonColor: '#6ab129',
                         cancelButtonColor: '#da4730',
                         confirmButtonText: 'Save'
                     }).then((result) => {
                         if (result.isConfirmed) {
                             if (result.value.length > 0) {

                                 console.log('result.value', $(this).attr('id').split('boton_edit_')[1], result.value);
                                 guardaTasksText($(this).attr('id').split('boton_edit_')[1], result.value);

                                 Swal.fire({
                                     icon: 'success',
                                     title: 'Task saved'
                                 })
                                 $(this).prop("checked", "checked");
                                 $(this).attr("disabled", "disabled");
                             } else {
                                 Swal.fire({
                                     icon: 'error',
                                     title: 'The text must not be empty'
                                 })
                                 $(this).prop("checked", false);
                                 $(this).prop("disabled", false);
                             }
                         }
                         if (result.isDismissed || result.isDenied) {
                             $(this).prop("checked", false);
                             $(this).prop("disabled", false);
                         }
                     });
                     $('.swal2-container').css({
                         'z-index': '9999'
                     });

                 });

                 if (Object.values(Object.values(Object.values(Object.values(data.weeks['week0' + laSemana].cats))[(laCategoria - 1)].subcats)[(b - 1)].tasks)[(c - 1)][1] != 'all') {

                     for (d = 1; d <= Object.values(Object.values(Object.values(Object.values(data.weeks['week0' + laSemana].cats))[(laCategoria - 1)].subcats)[(b - 1)].tasks)[(c - 1)][1]; d++) {

                         $('#laTask_s' + laSemana + '_c' + laCategoria + '_sc' + b + '_t' + c + '_d' + d).click(function(event) {
                             event.preventDefault();

                             checkea($(this).attr('id'));
                             console.log('checkea', $(this).attr('id'));

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
                 } else {

                     $('#laTask_s' + laSemana + '_c' + laCategoria + '_sc' + b + '_t' + c).click(function(event) {
                         event.preventDefault();

                         checkea($(this).attr('id'));
                         console.log('checkea', $(this).attr('id'));
                     });

                 }
             }
         }


         if (laSemana == 1) {
             //console.log('primer if');
             if (laSemana == 1) {
                 //console.log('segundo if');
                 if (laCategoria == 1) {
                     habilitaBoton($('#botonPrev'), false);
                     //console.log('Llego a su limite de categorias');
                 }
             }
         }

         if (laSemana >= totalGolabalSemanas) {
             //console.log('primer if');
             if (laSemana >= totalGlobalDias) {
                 //console.log('segundo if');
                 if (laCategoria >= totalGlobalCategorias) {
                     //console.log('tercer if');
                     habilitaBoton($('#botonGuardarNext'), false);
                 }
             }
         }

         $('#botonPrev').click(function(event) {
             event.preventDefault();
             decrementaCategoria();
         });

         $('#botonGuardar').click(function(event) {
             event.preventDefault();
             guardaTasks('normal');
         });

         $('#botonGuardarNext').click(function(event) {
             event.preventDefault();
             guardaTasks('next');
             incrementaCategoria();
         });

         //  if (!isMobile) {
         //      var scrollTasks = Scrollbar.init($('.seccion_tasks')[0]);
         //  }
         ajustaTamano();


         //  Cambia colores de encabezados
         switch (laSemana) {
             case 1:
                 switch (laCategoria) {
                     case 1:
                         $('.titulo_categoria').addClass('titulo_categoria_OnRoute');
                         break;
                     case 2:
                         $('.titulo_categoria').addClass('titulo_categoria_Classroom');
                         break;
                     case 3:
                         $('.titulo_categoria').addClass('titulo_categoria_Market');
                         break;

                     default:
                         break;
                 }
                 break;
             case 2:
                 switch (laCategoria) {
                     case 1:
                         $('.titulo_categoria').addClass('titulo_categoria_OnRoute');
                         break;
                     case 2:
                         $('.titulo_categoria').addClass('titulo_categoria_Classroom');
                         break;
                     case 3:
                         $('.titulo_categoria').addClass('titulo_categoria_Market');
                         break;

                     default:
                         break;
                 }
                 break;
             case 3:
                 switch (laCategoria) {
                     case 1:
                         $('.titulo_categoria').addClass('titulo_categoria_OnRoute');
                         break;
                     case 2:
                         $('.titulo_categoria').addClass('titulo_categoria_Classroom');
                         break;
                     case 3:
                         $('.titulo_categoria').addClass('titulo_categoria_Market');
                         break;

                     default:
                         break;
                 }
                 break;
             case 4:
                 switch (laCategoria) {
                     case 1:
                         $('.titulo_categoria').addClass('titulo_categoria_OnRoute');
                         break;
                     case 2:
                         $('.titulo_categoria').addClass('titulo_categoria_Classroom');
                         break;
                     case 3:
                         $('.titulo_categoria').addClass('titulo_categoria_Market');
                         break;

                     default:
                         break;
                 }
                 break;
             case 5:
                 switch (laCategoria) {
                     case 1:
                         $('.titulo_categoria').addClass('titulo_categoria_306090');
                         break;

                     default:
                         break;
                 }
                 break;

             default:
                 break;
         }


         return leeRegTasks(data);
     }


     function checkea(cualCheckea) {

         setTimeout(function() {
             if (cualCheckea != 0) {
                 //  var cualCheckeaPrevPerfil = cualCheckea.split('_p')[0];
                 //  var cualCheckeaPerfil = parseInt(cualCheckea.split('_p')[1]);
             }
             //   console.log('checkea', cualCheckea);


             __that.numTasksChecked = 0;

             if ($('#' + cualCheckea).prop("checked")) {
                 if ($.inArray(cualCheckea, __that.arrayTasks) != -1) {
                     __that.arrayTasks.splice($.inArray(cualCheckea, __that.arrayTasks), 1);
                 }
                 $('#' + cualCheckea).prop("checked", false);
                 if ($('#' + cualCheckea).parent().find('label').attr("data-before") == 'Completed') {
                     $('#' + cualCheckea).parent().find('label').attr("data-before", "To Complete");
                 }
             } else {
                 if ($.inArray(cualCheckea, __that.arrayTasks) == -1) {
                     if (__that.arrayTasks == 0) {
                         __that.arrayTasks[0] = cualCheckea;
                     } else {
                         __that.arrayTasks.push(cualCheckea);
                     }
                 }
                 $('#' + cualCheckea).prop("checked", "checked");
                 if ($('#' + cualCheckea).parent().find('label').attr("data-before") == 'To Complete') {
                     $('#' + cualCheckea).parent().find('label').attr("data-before", "Completed");
                 }
             }


             $(".check:checkbox:checked").each(function() {
                 __that.numTasksChecked = $(".check:checkbox:checked").length;
             });


             var elPrograsoCat = Math.round((numTasksChecked / totalTasksPorCategoria) * 100);
             $('.progress_bar').css({
                 'width': elPrograsoCat + '%'
             });
             $('.progress_bar').text(elPrograsoCat + '%');

             //  console.log('arrayTasks', __that.arrayTasks);
             //  console.log('numTasksChecked', __that.numTasksChecked, ' y totalTasksPorCategoria', totalTasksPorCategoria);
             if (elRol === 'IBP') {
                 guardaTasks('nada');
             }

         }, 10);

     }


     function leeRegTasks(data) {
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

                     __that.arrayTasks = arrayTasks.tasks;

                     if (__that.arrayTasks == undefined) {
                         __that.arrayTasks = [0];
                     }
                     console.log('arrayTasks', __that.arrayTasks);

                     return pintaRegTasks(data);

                 } else {
                     cuantasTasks = 0;
                     return pintaRegTasks(data);
                 }
             });

         }

         return $.ajax();
     }


     function pintaRegTasks(data) {
         console.log('pintaRegTasks', elRol);

         //  setTimeout(function() {
         for (a = 0; a < __that.arrayTasks.length; a++) {
             //  console.log('inArray', $.inArray(__that.arrayTasks[a], __that.arrayTasks));
             checkea(__that.arrayTasks[a]);
         }
         //  }, 1000);

         for (e = 1; e <= totalTasksPorCategoria; e++) {
             for (f = 1; f <= that['cat' + laSemana + '_cuantasSubcategorias' + laCategoria + '_cuantasTasks' + e]; f++) {

                 if (Object.values(Object.values(Object.values(Object.values(data.weeks['week0' + laSemana].cats))[(laCategoria - 1)].subcats)[(e - 1)].tasks)[(f - 1)][1] != 'all') {
                     for (g = 1; g <= Object.values(Object.values(Object.values(Object.values(data.weeks['week0' + laSemana].cats))[(laCategoria - 1)].subcats)[(e - 1)].tasks)[(f - 1)][1]; g++) {
                         if (elRol === 'Coach' || elRol === 'Admin') {
                             $('#laTask_s' + laSemana + '_c' + laCategoria + '_sc' + e + '_t' + f + '_d' + g).parent().css({
                                 "opacity": "0.5"
                             })
                             $('#laTask_s' + laSemana + '_c' + laCategoria + '_sc' + e + '_t' + f + '_d' + g).prop("disabled", "disabled");
                             $('#laTask_s' + laSemana + '_c' + laCategoria + '_sc' + e + '_t' + f + '_d' + g).next().css({
                                 "pointer-events": "none"
                             })
                         }
                     }
                 } else {
                     if (elRol === 'Coach' || elRol === 'Admin') {
                         $('#laTask_s' + laSemana + '_c' + laCategoria + '_sc' + e + '_t' + f).parent().css({
                             "opacity": "0.5"
                         })
                         $('#laTask_s' + laSemana + '_c' + laCategoria + '_sc' + e + '_t' + f).prop("disabled", "disabled");
                         $('#laTask_s' + laSemana + '_c' + laCategoria + '_sc' + e + '_t' + f).next().css({
                             "pointer-events": "none"
                         })
                     }
                 }
             }
         }

     }

     function guardaTasks(modo) {
         console.log('guardaTasks', __that.arrayTasks);

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
         var keyUsuario = dataRef.ref.child(cualUsuarioId + '/Registro/tasks');
         //  console.log(nuevoTaskData);
         firebase.database().ref(keyUsuario).set(__that.arrayTasks, onComplete);

     }

     function guardaTasksText(cualId, cualText) {
         console.log('guardaTasksText', cualId, cualText);

         var onComplete = function(error) {
             if (error) {
                 console.log('Ocurrió un error en la sincronización.');
             } else {
                 console.log('Sincronización realizada.');

                 //  if (!isMobile) {
                 //      Scrollbar.destroyAll();
                 //  }
                 cargaTasks();
             };
         };

         var elrefTaskIdSemanaPrev = cualId.split('s')[1];
         //  console.log('elrefTaskIdSemanaPrev', elrefTaskIdSemanaPrev);
         var elrefTaskIdSemana = elrefTaskIdSemanaPrev.split('_c')[0];
         //  console.log('elrefTaskIdSemana', elrefTaskIdSemana);

         var elrefTaskIdCatPrev = cualId.split('_c')[1];
         //  console.log('elrefTaskIdCatPrev', elrefTaskIdCatPrev);
         var elrefTaskIdCat = elrefTaskIdCatPrev.split('_sc')[0];
         //  console.log('elrefTaskIdCat', elrefTaskIdCat);

         var elrefTaskIdSubcatPrev = cualId.split('_sc')[1];
         //  console.log('elrefTaskIdSubcatPrev', elrefTaskIdSubcatPrev);
         var elrefTaskIdSubcat = elrefTaskIdSubcatPrev.split('_t')[0];
         //  console.log('elrefTaskIdSubcat', elrefTaskIdSubcat);

         var elrefTaskIdTask = cualId.split('t')[1];
         //  console.log('elrefTaskIdTask', elrefTaskIdTask);


         console.log('Guardando . . . ');
         var dataRef = firebase.database().ref(laUrlBase + 'Tasks');
         var keyTask = dataRef.ref.child('weeks/week0' + elrefTaskIdSemana + '/cats/cat0' + elrefTaskIdCat + '/subcats/subcat0' + elrefTaskIdSubcat + '/tasks/task0' + elrefTaskIdTask + '/0/');
         //  console.log(nuevoTaskData);
         firebase.database().ref(keyTask).set(cualText, onComplete);

     }

     function guardaStatus(modo) {
         console.log('guardaStatus', laCategoria, ' con numTasksChecked', __that.numTasksChecked, ' de totalTasksPorCategoria', totalTasksPorCategoria);

         if (__that.numTasksChecked >= totalTasksPorCategoria) {
             if ($.isArray(_that.arrayStatusCats)) {
                 if ($.inArray('week' + laSemana + '_cat' + laCategoria, _that.arrayStatusCats) == -1) {
                     if (_that.arrayStatusCats[0] == 0) {
                         _that.arrayStatusCats = ['week' + laSemana + '_cat' + laCategoria];
                     } else {
                         _that.arrayStatusCats.push('week' + laSemana + '_cat' + laCategoria);
                     }
                 }
             } else {
                 _that.arrayStatusCats = ['week' + laSemana + '_cat' + laCategoria];
             }
         } else {
             if ($.isArray(_that.arrayStatusCats)) {
                 if ($.inArray('week' + laSemana + '_cat' + laCategoria, _that.arrayStatusCats) != -1) {
                     _that.arrayStatusCats.splice($.inArray('week' + laSemana + '_cat' + laCategoria, _that.arrayStatusCats), 1);
                 }
             }
         }

         var cualUsuarioId = usuarioId;
         if (usuarioSeleccionadoId != undefined) {
             cualUsuarioId = usuarioSeleccionadoId;
         }

         console.log('arrayStatusCats', _that.arrayStatusCats);
         var onComplete = function(error) {
             if (error) {
                 console.log('Ocurrió un error en la sincronización.');
             } else {
                 console.log('Sincronización realizada.');
                 guardaFecha(modo);
             };
         };

         console.log('Guardando . . . ');
         var dataRef = firebase.database().ref(laUrlBase + 'Usuarios');
         var elData = dataRef.ref.child(cualUsuarioId + '/Registro/status/cats_completed');
         firebase.database().ref(elData).set(_that.arrayStatusCats, onComplete);

     }

     function guardaFecha(modo) {
         console.log('guardaFecha');

         var cualUsuarioId = usuarioId;
         if (usuarioSeleccionadoId != undefined) {
             cualUsuarioId = usuarioSeleccionadoId;
         }

         var laFechaHoy = obtenerFecha();

         if (revisaConexion) {

             firebase.database().ref(laUrlBase + 'Usuarios/' + cualUsuarioId + '/Registro').once('value').then(function(snapshot) {
                 if (snapshot.val() != null) {
                     //  console.log('snapshot.val()', snapshot.val().StartDate);

                     var laStartDate = snapshot.child('StartDate').val();
                     //  console.log('laStartDate', laStartDate);

                     if (laStartDate == null || laStartDate == undefined) {
                         return registraFecha(laFechaHoy);
                     }

                     var isafter = moment(laStartDate).isAfter(laFechaHoy);
                     //  console.log('isafter', isafter);

                     if (isafter) {
                         return registraFecha(laFechaHoy);
                     }
                 }
             });

         }

         function registraFecha() {
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
             var keyUsuario = dataRef.ref.child(cualUsuarioId + '/Registro/StartDate/');
             //  console.log(nuevoTaskData);
             firebase.database().ref(keyUsuario).set(laFechaHoy, onComplete);
         }

     }

     function terminaGuardar(modo) {
         if (modo == 'normal') {
             loadSeccion('home');
         }
     }

     cargaTasks();

 }

 function decrementaCategoria() {
     if (laCategoria == 1) {
         decrementaDia();
     } else {
         laCategoria--
         loadSeccion('tasks');
     }
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

 function decrementaSemana() {
     if (laSemana == 1) {
         if (laSemana == 1) {
             if (laCategoria == 1) {
                 console.log('tercer if');
                 habilitaBoton($('#botonPrev'), false);
             }
         }
     } else {
         laSemana--;
         loadSeccion('tasks');
     }
 }

 function incrementaSemana() {
     if (laSemana >= totalGolabalSemanas) {
         console.log('primer if');
         if (laSemana >= totalGlobalDias) {
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

 function decrementaDia() {
     if (laSemana == 1) {
         decrementaSemana();
     } else {
         laSemana--;
         loadSeccion('tasks');
     }
 }

 function incrementaDia() {
     if (laSemana >= totalGlobalDias) {
         laSemana = 1;
         incrementaSemana();
     } else {
         laSemana++;
         loadSeccion('tasks');
     }
 }