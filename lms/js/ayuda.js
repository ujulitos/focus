
function activaSecAyuda() {
	console.log('activaSecAyuda');
	$('.panel-header div h3').html('Ayuda');
	$('#subtituloSeccion').html('');

	return cuentaAyuda().then(function () {
		pintaAyuda().then(function () {
			activaBotonesAyuda().then(function () {
				cargador('oculta');
			});
		});
	});
}

function cuentaAyuda() {

	/////////// aqui el código /////////////

	return $.ajax();

}




function pintaAyuda() {
	console.log('pintaAyuda');

	/////////// aqui el código /////////////

	// $('.Ayuda_int').append(contenidoSecCursos);
	$('#subtituloSeccion').html('Ayuda');

	return $.ajax();
}


function activaBotonesAyuda() {
	console.log('activaBotonesAyuda');

	/////////// aqui el código /////////////

	return $.ajax();
}