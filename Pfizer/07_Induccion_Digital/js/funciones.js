// Cargar páginas---------------------------------------------------------
function cargarPagina(noPagina, paginasVistas) {

    if (noPagina < paginasVistas) {
        activarBotonAdelante();
    }

    const paginaVisualizar = paginas[noPagina];
    const url = `./paginas/${paginaVisualizar}`;

    contPaginas.attr('src', url);
    redimensionarInterfaz();
}

// Eliminar modal de bienvenida--------------------------------------------
function salidaBienvenida() {
    modalBienvenida.css({
        'opacity': 0,
        'display': 'none'
    });
}

// Spinner de carga-------------------------------------------------------
function cargando(funcion) {
    spinner.css({
        'display': 'flex',
        'opacity': '1'
    });

    spinner.html(`
        <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
    `);

    setTimeout(() => {
        spinner.css({
            'display': 'none',
            'opacity': '0'
        });
        spinner.html();
        funcion();
    }, 1500);
}

// Timepo-----------------------------------------------------------------
let tiempo = '00:00:00';

function calcularTiempo() {
    let horas = 0;
    let minutos = 0;
    let segundos = 0;
    let hr = '00';
    let min = '00'
    let seg = '00';
    let cronometro;

    cronometro = setInterval(function() {

        if (segundos > 59) {
            segundos = 0;
            minutos++;
            if (minutos < 10) {
                min = `0${minutos}`;
            } else {
                min = `${minutos}`;
            }

            if (minutos > 59) {
                minutos = 0;
                horas++;

                if (horas < 10) {
                    hr = `0${horas}`;
                } else {
                    hr = `${horas}`;
                }
            }
        }

        segundos++;

        if (segundos < 10) {
            seg = `0${segundos}`;
        } else {
            seg = `${segundos}`;
        }

        tiempo = `${hr}:${min}:${seg}`;

    }, 1000);

}

// Actualizar temario----------------------------------------------
function actualizarTemario() {
    let paginaActual = noPagina + 1;

    temas.each(function() {
        const paginaTema = $(this).data('pagina');

        if (paginaTema < paginaActual) {
            $(this).addClass('tema-activo');
            $(this).find('i').removeClass('bx-square-rounded');
            $(this).find('i').addClass('bx-check-square');
            $(this).find('i').css('fontSize', '20px');
        }
    });
}

function botonesTemario() {
    temas.each(function() {
        const paginaTema = $(this).data('pagina');

        $(this).click(function() {
            if ($(this).hasClass('tema-activo')) {
                irPagina(paginaTema);
            }
        });
    });
}

// Avanzar con teclas-----------------------------------------------
function moverTeclas() {
    $(document).keydown(function(e) {

        if (e.ctrlKey && e.keyCode === 39) {
            siguientePagina();
            return;
        }

        if (e.ctrlKey && e.keyCode === 37) {
            retrocederPagina();
        }

    });
}

// Modo Desarrollador
function modoDesarrollador() {

    const totalPaginas = paginas.length;

    const contFormulario = $('<div>');
    contFormulario.addClass('modoDesarrollador');
    contFormulario.html(`
        <div class="titulo">
            <h4>Desarrollo-Navegacion</h4>
        </div>

        <form class="formulario">
            <label for="paginaInput">Página</label>
            <input type="number" id="paginaInput" placeholder="1" min="1" max="${totalPaginas}" value="1">
        </form>
    `);

    contPrincipal.append(contFormulario);

    contFormulario.draggable();

    const input = $('#paginaInput');
    input.change(function() {
        const pagina = parseInt(input.val());

        irPagina(pagina);
    });
}