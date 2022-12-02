const paginas = [];

function generarPaginas() {
    const totalPaginas = 13;

    for (let contador = 1; contador <= totalPaginas; contador++) {
        let nombrePagina;

        if (contador < 10) {
            nombrePagina = `pagina0${contador}.html`;
        } else {
            nombrePagina = `pagina${contador}.html`;
        }

        paginas.push(nombrePagina);
    }
}