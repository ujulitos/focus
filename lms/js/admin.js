
function activaSecAdmin() {
	console.log('activaSecAdmin');
	$('.panel-header div h3').html('Admin');
	$('#subtituloSeccion').html('');

	return cuentaAdmin().then(function () {
		pintaAdmin().then(function () {
			activaBotonesAdmin().then(function () {
				cargador('oculta');
			});
		});
	});
}

function cuentaAdmin() {

	/////////// aqui el código /////////////

	return $.ajax();

}




function pintaAdmin() {
	console.log('pintaAdmin');

	/////////// aqui el código /////////////

	// $('.Admin_int').append(contenidoSecCursos);
	$('#subtituloSeccion').html('Administración');

	return $.ajax();
}


function activaBotonesAdmin() {
	console.log('activaBotonesAdmin');

	/////////// aqui el código /////////////

	return $.ajax();
}