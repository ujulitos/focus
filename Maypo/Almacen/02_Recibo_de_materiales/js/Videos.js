var currentVideo;
var currentCallBack;
var pausadoVideo = false;

function pausaVideo() {
    console.log('pausaVideo');
    // clearTimeout(elRetardo);
    // buzz.all().pause();
    pausadoVideo = true;
}

function despausaVideo() {
    console.log('despausaVideo');
    if (currentVideo != null || currentVideo != undefined || currentVideo != '') {
        playVideo(currentVideo, 0, currentCallBack);
    }
}

function setVolumen() {
    buzz.all().setVolume(volPage);
}

$(document).ready(function() {
    setVolumen();

    // grupoVideos.load();
    // grupoVideos.bind("loadstart", function() {
    // grupoVideosMin.load();
    // grupoVideosMin.bind("loadstart", function() {
    // console.log('loadstart');
    // });
    var cuantosVideos = grupoVideos.length;
    // var cuantosVideos = 1;
    console.log('cuantosVideos', cuantosVideos);
    var contador = 0;
    // grupoVideosMin.bind("loadeddata", function() {
    // grupoVideos.bind("loadeddata", function() {
    //     contador++;
    //     // console.log('loadeddata', contador);
    //     if (contador >= cuantosVideos) {
    //         console.log('todos los Videos cargados.');
    //         // Videos_cargados();
    //     }
    // }).bind("error", function() {
    //     console.log('hubo un error');
    // });
});