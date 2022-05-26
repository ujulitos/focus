function activaSeccionTools() {
    console.log('seccionTools');

    var cuantosTools = 17;

    $('.subname1_txt').text('');
    $('.subname2_txt').text('');


    ajustaTamano();


    function descargaTool(cualTool) {
        console.log('descargaTool', cualTool);

        switch (cualTool) {
            case 1:
                // window.open('http://docs.google.com/viewer?url=' + laURL + 'docs/Distribution_Agreement.pdf');

                // $('.modal').addClass('modal-open');

                // $('.close-modal').click(function() {
                //     $('.modal').removeClass('modal-open');
                // });



                Swal.fire({
                    title: 'Handheld (HHC)',
                    html: '<iframe src="https://' + laURL + 'docs/Distribution_Agreement.pdf#toolbar=0" type="application/pdf" style="overflow: auto; -webkit-overflow-scrolling: touch; height: 500px; min-height:80vh; width: 500px; height: 10000px" width="100%" height="80vh"></iframe>',
                    showCloseButton: true,
                    showConfirmButton: false,
                    heightAuto: false,
                    width: '100%',
                    height: '80vh',
                    background: '#f3f3f3',
                    backdrop: `rgb(0 0 0 / 60%)`
                });
                break;
            case 2:
                // window.open('http://docs.google.com/viewer?url=' + laURL + 'docs/Handheld_(HHC).pdf');
                Swal.fire({
                    title: 'Handheld (HHC)',
                    html: '<iframe src="https://' + laURL + 'docs/Handheld_(HHC).pdf#toolbar=0" type="application/pdf" style="min-height:80vh; width:100%"></iframe>',
                    showCloseButton: true,
                    showConfirmButton: false,
                    heightAuto: true,
                    width: '100%',
                    background: '#f3f3f3',
                    backdrop: `rgb(0 0 0 / 60%)`
                });
                break;
            case 3:
                // window.open('docs/ION_Coaching.pdf');
                // window.open('http://docs.google.com/viewer?url=' + laURL + 'docs/ION_Coaching.pdf');
                Swal.fire({
                    title: 'ION Coaching',
                    html: '<iframe src="https://' + laURL + 'docs/ION_Coaching.pdf#toolbar=0" type="application/pdf" style="min-height:80vh; width:100%"></iframe>',
                    showCloseButton: true,
                    showConfirmButton: false,
                    heightAuto: true,
                    width: '100%',
                    background: '#f3f3f3',
                    backdrop: `rgb(0 0 0 / 60%)`
                });
                break;
            case 4:
                // window.open('docs/ION_SetUp.pdf');
                // window.open('http://docs.google.com/viewer?url=' + laURL + 'docs/ION_SetUp.pdf');
                Swal.fire({
                    title: 'ION SetUp',
                    html: '<iframe src="https://' + laURL + 'docs/ION_SetUp.pdf#toolbar=0" type="application/pdf" style="min-height:80vh; width:100%"></iframe>',
                    showCloseButton: true,
                    showConfirmButton: false,
                    heightAuto: true,
                    width: '100%',
                    background: '#f3f3f3',
                    backdrop: `rgb(0 0 0 / 60%)`
                });
                break;
            case 5:
                Swal.fire({
                    title: 'Merchandising Arnold',
                    html: '<video id="vid1" width="100%" class="video" autoplay playsinline controls="true" controlsList="nodownload">' +
                        '<source src="docs/Merchandising_Arnold.mp4" type="video/mp4">' +
                        '</video>',
                    showCloseButton: true,
                    showConfirmButton: false,
                    heightAuto: true,
                    width: '100%',
                    background: '#f3f3f3',
                    backdrop: `rgb(0 0 0 / 60%)`
                });
                var interval = setInterval(function() {
                    var elVid = document.getElementById('vid1');
                    console.log('elVid ok', elVid);

                    if (elVid.readyState !== 4) {
                        elVid.addEventListener('canplaythrough', onCanPlay, false);
                        elVid.addEventListener('load', onCanPlay, false);
                        setTimeout(function() {
                            elVid.pause();
                        }, 1);
                    } else {
                        clearInterval(interval);
                    }

                    function onCanPlay() {
                        elVid.removeEventListener('canplaythrough', onCanPlay, false);
                        elVid.removeEventListener('load', onCanPlay, false);
                        elVid.play();
                        clearInterval(interval);
                    }
                }, 2000);

                break;
            case 6:
                Swal.fire({
                    title: 'Merchandising BallPark',
                    html: '<video id="vid2" width="100%" class="video" autoplay playsinline controls="true" controlsList="nodownload">' +
                        '<source src="docs/Merchandising_BallPark.mp4" type="video/mp4">' +
                        '</video>',
                    showCloseButton: true,
                    showConfirmButton: false,
                    heightAuto: true,
                    width: '100%',
                    background: '#f3f3f3',
                    backdrop: `rgb(0 0 0 / 60%)`
                });
                var interval = setInterval(function() {
                    var elVid = document.getElementById('vid2');
                    console.log('elVid ok', elVid);

                    if (elVid.readyState !== 4) {
                        elVid.addEventListener('canplaythrough', onCanPlay, false);
                        elVid.addEventListener('load', onCanPlay, false);
                        setTimeout(function() {
                            elVid.pause();
                        }, 1);
                    } else {
                        clearInterval(interval);
                    }

                    function onCanPlay() {
                        elVid.removeEventListener('canplaythrough', onCanPlay, false);
                        elVid.removeEventListener('load', onCanPlay, false);
                        elVid.play();
                        clearInterval(interval);
                    }
                }, 2000);
                break;
            case 7:
                Swal.fire({
                    title: 'Merchandising Barcel-Takis',
                    html: '<video id="vid3" width="100%" class="video" autoplay playsinline controls="true" controlsList="nodownload">' +
                        '<source src="docs/Merchandising_BarcelTakis.mp4" type="video/mp4">' +
                        '</video>',
                    showCloseButton: true,
                    showConfirmButton: false,
                    heightAuto: true,
                    width: '100%',
                    background: '#f3f3f3',
                    backdrop: `rgb(0 0 0 / 60%)`
                });
                var interval = setInterval(function() {
                    var elVid = document.getElementById('vid3');
                    console.log('elVid ok', elVid);

                    if (elVid.readyState !== 4) {
                        elVid.addEventListener('canplaythrough', onCanPlay, false);
                        elVid.addEventListener('load', onCanPlay, false);
                        setTimeout(function() {
                            elVid.pause();
                        }, 1);
                    } else {
                        clearInterval(interval);
                    }

                    function onCanPlay() {
                        elVid.removeEventListener('canplaythrough', onCanPlay, false);
                        elVid.removeEventListener('load', onCanPlay, false);
                        elVid.play();
                        clearInterval(interval);
                    }
                }, 2000);
                break;
            case 8:
                Swal.fire({
                    title: 'Merchandising Best Practices',
                    html: '<video id="vid4" width="100%" class="video" autoplay playsinline controls="true" controlsList="nodownload">' +
                        '<source src="docs/Merchandising_Best_Practices.mp4" type="video/mp4">' +
                        '</video>',
                    showCloseButton: true,
                    showConfirmButton: false,
                    heightAuto: true,
                    width: '100%',
                    background: '#f3f3f3',
                    backdrop: `rgb(0 0 0 / 60%)`
                });
                var interval = setInterval(function() {
                    var elVid = document.getElementById('vid4');
                    console.log('elVid ok', elVid);

                    if (elVid.readyState !== 4) {
                        elVid.addEventListener('canplaythrough', onCanPlay, false);
                        elVid.addEventListener('load', onCanPlay, false);
                        setTimeout(function() {
                            elVid.pause();
                        }, 1);
                    } else {
                        clearInterval(interval);
                    }

                    function onCanPlay() {
                        elVid.removeEventListener('canplaythrough', onCanPlay, false);
                        elVid.removeEventListener('load', onCanPlay, false);
                        elVid.play();
                        clearInterval(interval);
                    }
                }, 2000);
                break;
            case 9:
                Swal.fire({
                    title: 'Merchandising Bimbo-Marinela',
                    html: '<video id="vid5" width="100%" class="video" autoplay playsinline controls="true" controlsList="nodownload">' +
                        '<source src="docs/Merchandising_BimboMarinela.mp4" type="video/mp4">' +
                        '</video>',
                    showCloseButton: true,
                    showConfirmButton: false,
                    heightAuto: true,
                    width: '100%',
                    background: '#f3f3f3',
                    backdrop: `rgb(0 0 0 / 60%)`
                });
                var interval = setInterval(function() {
                    var elVid = document.getElementById('vid5');
                    console.log('elVid ok', elVid);

                    if (elVid.readyState !== 4) {
                        elVid.addEventListener('canplaythrough', onCanPlay, false);
                        elVid.addEventListener('load', onCanPlay, false);
                        setTimeout(function() {
                            elVid.pause();
                        }, 1);
                    } else {
                        clearInterval(interval);
                    }

                    function onCanPlay() {
                        elVid.removeEventListener('canplaythrough', onCanPlay, false);
                        elVid.removeEventListener('load', onCanPlay, false);
                        elVid.play();
                        clearInterval(interval);
                    }
                }, 2000);
                break;
            case 10:
                Swal.fire({
                    title: 'Merchandising Brownberry',
                    html: '<video id="vid6" width="100%" class="video" autoplay playsinline controls="true" controlsList="nodownload">' +
                        '<source src="docs/Merchandising_Brownberry.mp4" type="video/mp4">' +
                        '</video>',
                    showCloseButton: true,
                    showConfirmButton: false,
                    heightAuto: true,
                    width: '100%',
                    background: '#f3f3f3',
                    backdrop: `rgb(0 0 0 / 60%)`
                });
                var interval = setInterval(function() {
                    var elVid = document.getElementById('vid6');
                    console.log('elVid ok', elVid);

                    if (elVid.readyState !== 4) {
                        elVid.addEventListener('canplaythrough', onCanPlay, false);
                        elVid.addEventListener('load', onCanPlay, false);
                        setTimeout(function() {
                            elVid.pause();
                        }, 1);
                    } else {
                        clearInterval(interval);
                    }

                    function onCanPlay() {
                        elVid.removeEventListener('canplaythrough', onCanPlay, false);
                        elVid.removeEventListener('load', onCanPlay, false);
                        elVid.play();
                        clearInterval(interval);
                    }
                }, 2000);
                break;
            case 11:
                Swal.fire({
                    title: 'Merchandising Entenmanns',
                    html: '<video id="vid7" width="100%" class="video" autoplay playsinline controls="true" controlsList="nodownload">' +
                        '<source src="docs/Merchandising_Entenmanns.mp4" type="video/mp4">' +
                        '</video>',
                    showCloseButton: true,
                    showConfirmButton: false,
                    heightAuto: true,
                    width: '100%',
                    background: '#f3f3f3',
                    backdrop: `rgb(0 0 0 / 60%)`
                });
                var interval = setInterval(function() {
                    var elVid = document.getElementById('vid7');
                    console.log('elVid ok', elVid);

                    if (elVid.readyState !== 4) {
                        elVid.addEventListener('canplaythrough', onCanPlay, false);
                        elVid.addEventListener('load', onCanPlay, false);
                        setTimeout(function() {
                            elVid.pause();
                        }, 1);
                    } else {
                        clearInterval(interval);
                    }

                    function onCanPlay() {
                        elVid.removeEventListener('canplaythrough', onCanPlay, false);
                        elVid.removeEventListener('load', onCanPlay, false);
                        elVid.play();
                        clearInterval(interval);
                    }
                }, 2000);
                break;
            case 12:
                Swal.fire({
                    title: 'Merchandising SaraLee',
                    html: '<video id="vid8" width="100%" class="video" autoplay playsinline controls="true" controlsList="nodownload">' +
                        '<source src="docs/Merchandising_SaraLee.mp4" type="video/mp4">' +
                        '</video>',
                    showCloseButton: true,
                    showConfirmButton: false,
                    heightAuto: true,
                    width: '100%',
                    background: '#f3f3f3',
                    backdrop: `rgb(0 0 0 / 60%)`
                });
                var interval = setInterval(function() {
                    var elVid = document.getElementById('vid8');
                    console.log('elVid ok', elVid);

                    if (elVid.readyState !== 4) {
                        elVid.addEventListener('canplaythrough', onCanPlay, false);
                        elVid.addEventListener('load', onCanPlay, false);
                        setTimeout(function() {
                            elVid.pause();
                        }, 1);
                    } else {
                        clearInterval(interval);
                    }

                    function onCanPlay() {
                        elVid.removeEventListener('canplaythrough', onCanPlay, false);
                        elVid.removeEventListener('load', onCanPlay, false);
                        elVid.play();
                        clearInterval(interval);
                    }
                }, 2000);
                break;
            case 13:
                Swal.fire({
                    title: 'Merchandising Thomas',
                    html: '<video id="vid9" width="100%" class="video" autoplay playsinline controls="true" controlsList="nodownload">' +
                        '<source src="docs/Merchandising_Thomas.mp4" type="video/mp4">' +
                        '</video>',
                    showCloseButton: true,
                    showConfirmButton: false,
                    heightAuto: true,
                    width: '100%',
                    background: '#f3f3f3',
                    backdrop: `rgb(0 0 0 / 60%)`
                });
                var interval = setInterval(function() {
                    var elVid = document.getElementById('vid9');
                    console.log('elVid ok', elVid);

                    if (elVid.readyState !== 4) {
                        elVid.addEventListener('canplaythrough', onCanPlay, false);
                        elVid.addEventListener('load', onCanPlay, false);
                        setTimeout(function() {
                            elVid.pause();
                        }, 1);
                    } else {
                        clearInterval(interval);
                    }

                    function onCanPlay() {
                        elVid.removeEventListener('canplaythrough', onCanPlay, false);
                        elVid.removeEventListener('load', onCanPlay, false);
                        elVid.play();
                        clearInterval(interval);
                    }
                }, 2000);
                break;
            case 14:
                // window.open('docs/Merchandising_Thomas.mov');
                Swal.fire({
                    title: 'Merchandising Oroweat',
                    html: '<video id="vid10" width="100%" class="video" autoplay playsinline controls="true" controlsList="nodownload">' +
                        '<source src="docs/Merhandising_Oroweat.mp4" type="video/mp4">' +
                        '</video>',
                    showCloseButton: true,
                    showConfirmButton: false,
                    heightAuto: true,
                    width: '100%',
                    background: '#f3f3f3',
                    backdrop: `rgb(0 0 0 / 60%)`
                });
                var interval = setInterval(function() {
                    var elVid = document.getElementById('vid10');
                    console.log('elVid ok', elVid);

                    if (elVid.readyState !== 4) {
                        elVid.addEventListener('canplaythrough', onCanPlay, false);
                        elVid.addEventListener('load', onCanPlay, false);
                        setTimeout(function() {
                            elVid.pause();
                        }, 1);
                    } else {
                        clearInterval(interval);
                    }

                    function onCanPlay() {
                        elVid.removeEventListener('canplaythrough', onCanPlay, false);
                        elVid.removeEventListener('load', onCanPlay, false);
                        elVid.play();
                        clearInterval(interval);
                    }
                }, 2000);
                break;
            case 15:
                // window.open('docs/Safe_Carry_Over_(SCO).pdf');
                // window.open('http://docs.google.com/viewer?url=' + laURL + 'docs/Safe_Carry_Over_(SCO).pdf');
                Swal.fire({
                    title: 'Safe Carry Over (SCO)',
                    html: '<iframe src="https://' + laURL + 'docs/Safe_Carry_Over_(SCO).pdf#toolbar=0" type="application/pdf" style="min-height:80vh; width:100%"></iframe>',
                    showCloseButton: true,
                    showConfirmButton: false,
                    heightAuto: true,
                    width: '100%',
                    background: '#f3f3f3',
                    backdrop: `rgb(0 0 0 / 60%)`
                });
                break;
            case 16:
                // window.open('docs/Scan_Based_Trading_(SBT).pdf');
                // window.open('http://docs.google.com/viewer?url=' + laURL + 'docs/Scan_Based_Trading_(SBT).pdf');
                Swal.fire({
                    title: 'Scan Based Trading (SBT)',
                    html: '<iframe src="https://' + laURL + 'docs/Scan_Based_Trading_(SBT).pdf#toolbar=0" type="application/pdf" style="min-height:80vh; width:100%"></iframe>',
                    showCloseButton: true,
                    showConfirmButton: false,
                    heightAuto: true,
                    width: '100%',
                    background: '#f3f3f3',
                    backdrop: `rgb(0 0 0 / 60%)`
                });
                break;
            case 17:
                // window.open('docs/SETTLEMENT.pdf');
                // window.open('http://docs.google.com/viewer?url=' + laURL + 'docs/SETTLEMENT.pdf');
                Swal.fire({
                    title: 'Settlement',
                    html: '<iframe src="https://' + laURL + 'docs/SETTLEMENT.pdf#toolbar=0" type="application/pdf" style="min-height:80vh; width:100%"></iframe>',
                    showCloseButton: true,
                    showConfirmButton: false,
                    heightAuto: true,
                    width: '100%',
                    background: '#f3f3f3',
                    backdrop: `rgb(0 0 0 / 60%)`
                });
                break;

            default:
                break;
        }

    }


    for (a = 1; a <= cuantosTools; a++) {
        $("#botonTool" + a).click(function(event) {
            event.preventDefault();
            var cualBotonTool = parseInt($(this).attr('id').substr(9, 2));
            console.log('cualBotonTool', cualBotonTool);

            descargaTool(cualBotonTool);
        });
    }



    switch (elRol) {

        case 'Admin':
            break;

        case 'Coach':
            break;

        case 'IBP':
            break;

        default:
            break;
    }


}