function activaSeccionSplash() {
    console.log('seccionSplash');
    ajustaTamano();

    setTimeout(function() {
        leeLocalStorage();
    }, 1000);
}
