// Al cargarse la página--------------------------------------------------------
$(window).on("load", function() {

    //Cargar Páginas total------------------------------------------------------
    generarPaginas();

    // Funciones de los botones--------------------------------------------------

    btnComenzar.click(function() {
        iniciarAplicacion();
    });

    btnAdelante.click(function() {
        siguientePagina();
    });

    btnAtras.click(function() {
        retrocederPagina();
    });

    btnAudio.click(function() {
        silenciarOPrender();
    });

    btnRecargar.click(function() {
        recargarPagina();
    });

    btnTemario.click(function() {
        abrirTemario();
    });

    btnCerrarTemario.click(function() {
        cerrarTemario();
    });

    //Función Glosario Prosa----------------------------------------------
    btnGlosario.click(function() {
        glosario.css('display', 'flex');
    });

    btnCerrarGlosario.click(function() {
        glosario.css('display', 'none');
    });

    redimensionarInterfaz();
    botonesTemario();

    // Modo desarrollador y avanzar con teclas
    // modoDesarrollador();
    moverTeclas();
});

// Al redimensionar la página----------------------------------------------
let intervaloR1;
$(window).resize(function() {
    clearTimeout(intervaloR1);
    intervaloR1 = setTimeout(escalar, 300);
});

function escalar() {
    // recargarPagina();
}

// Al cerrar la página------------------------------------------------------
$(window).on('unload', function() {
    registrarTiempo();
    cerrarConexion();
});