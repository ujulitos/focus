function activaSeccionTools() {
    console.log('seccionTools');

    var cuantosTools = 27;

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
                    title: 'Aramark Clothing Options & Order Form ',
                    html: '<iframe id="pdfFrame" src="http://docs.google.com/gview?url=https://revisioni4l.mx/revision/appweb/Onboarding_v7/docs/Aramark_Clothing_Options_and_Order_Form.pdf&embedded=true" style="min-height:80vh; width:100%"></iframe>',
                    showCloseButton: true,
                    showConfirmButton: false,
                    heightAuto: true,
                    width: '100%',
                    background: '#f3f3f3',
                    backdrop: `rgb(0 0 0 / 60%)`
                });

                // docs/Aramark_Order_Form.pdf&embedded=true

                http://docs.google.com/gview?url=&embedded=true

                // $('#pdfFrame').hide();

                // setTimeout(function() {
                //     var pdfFrame = document.getElementById('pdfFrame');
                //     pdfFrame.contentWindow.location.replace('./docs/Distribution_Agreement.pdf');
                //     $('#pdfFrame').on('load', function() {
                //         $('#pdfFrame').show();
                //         var documentWidth = $(document).width()
                //         var scale = (documentWidth / documentWidth) * 0.95;
                //         $('#pdfFrame').css("-webkit-transform", "scale(" + scale + ")");
                //     });
                // }, 500);

                break;
            case 2:
                // window.open('http://docs.google.com/viewer?url=' + laURL + 'docs/Handheld_(HHC).pdf');
                
                Swal.fire({
                    title: 'Distribution Agreement 4, 6, 8',
                    html: '<iframe id="pdfFrame" src="http://docs.google.com/gview?url=https://revisioni4l.mx/revision/appweb/Onboarding_v7/docs/Distribution_Agreement468.pdf&embedded=true" type="application/pdf" style="min-height:80vh; width:100%"></iframe>',
                    showCloseButton: true,
                    showConfirmButton: false,
                    heightAuto: false,
                    width: '100%',
                    background: '#f3f3f3',
                    backdrop: `rgb(0 0 0 / 60%)`
                });

                // setTimeout(function() {
                //     $('#pdfFrame').hide();
                //     var pdfFrame = document.getElementById('pdfFrame');
                //     pdfFrame.contentWindow.location.replace('./docs/Distribution_Agreement.pdf');
                //     $('#pdfFrame').on('load', function() {
                //         $('#pdfFrame').show();
                //         var documentWidth = $(document).width()
                //         var scale = (documentWidth / documentWidth) * 0.95;
                //         $('#pdfFrame').css("-webkit-transform", "scale(" + scale + ")");
                //         $('#pdfFrame').css("zoom", 1);
                //     });
                // }, 500);

                break;
            case 3:
                // window.open('docs/ION_Coaching.pdf');
                // window.open('http://docs.google.com/viewer?url=' + laURL + 'docs/ION_Coaching.pdf');
                Swal.fire({
                    title: 'ION Intelligent Ordering Network',
                    html: '<iframe src="http://docs.google.com/gview?url=https://revisioni4l.mx/revision/appweb/Onboarding_v7/docs/ION Introduction.pdf&embedded=true&navpanes=0&scrollbar=0" type="application/pdf" style="min-height:80vh; width:100%"></iframe>',
                    showCloseButton: true,
                    showConfirmButton: false,
                    heightAuto: true,
                    width: '100%',
                    background: '#f3f3f3',
                    backdrop: `rgb(0 0 0 / 60%)`
                });
                break;
            case 4:
                // window.open('docs/ION_Coaching.pdf');
                // window.open('http://docs.google.com/viewer?url=' + laURL + 'docs/ION_Coaching.pdf');
                Swal.fire({
                    title: 'ION Video 1 – Route Summary Page Overview',
                    html: '<video id="vid1" width="100%" class="video" autoplay playsinline controls="true" controlsList="nodownload">' +
                    '<source src="docs/IONVideo1.mp4" type="video/mp4">' +
                    '</video>',
                    showCloseButton: true,
                    showConfirmButton: false,
                    heightAuto: true,
                    width: '100%',
                    background: '#f3f3f3',
                    backdrop: `rgb(0 0 0 / 60%)`
                });
                break;
            case 5:
                // window.open('docs/ION_Coaching.pdf');
                // window.open('http://docs.google.com/viewer?url=' + laURL + 'docs/ION_Coaching.pdf');
                Swal.fire({
                    title: 'ION Video 2 – Product & Store Tabs within Route Summary Page',
                    html: '<video id="vid2" width="100%" class="video" autoplay playsinline controls="true" controlsList="nodownload">' +
                    '<source src="docs/IONVideo2.mp4" type="video/mp4">' +
                    '</video>',
                    showCloseButton: true,
                    showConfirmButton: false,
                    heightAuto: true,
                    width: '100%',
                    background: '#f3f3f3',
                    backdrop: `rgb(0 0 0 / 60%)`
                });
                break;
            case 6:
                // window.open('docs/ION_Coaching.pdf');
                // window.open('http://docs.google.com/viewer?url=' + laURL + 'docs/ION_Coaching.pdf');
                Swal.fire({
                    title: 'ION Video 3 – Customer Information, Messaging, & Adding Product within Store Summary Page',
                    html: '<video id="vid3" width="100%" class="video" autoplay playsinline controls="true" controlsList="nodownload">' +
                    '<source src="docs/IONVideo3.mp4" type="video/mp4">' +
                    '</video>',
                    showCloseButton: true,
                    showConfirmButton: false,
                    heightAuto: true,
                    width: '100%',
                    background: '#f3f3f3',
                    backdrop: `rgb(0 0 0 / 60%)`
                });
                break;
            case 7:
                // window.open('docs/ION_Coaching.pdf');
                // window.open('http://docs.google.com/viewer?url=' + laURL + 'docs/ION_Coaching.pdf');
                Swal.fire({
                    title: 'ION Video 4 – Product Filters & Buckets within Store Summary Page',
                    html: '<video id="vid1" width="100%" class="video" autoplay playsinline controls="true" controlsList="nodownload">' +
                    '<source src="docs/IONVideo4.mp4" type="video/mp4">' +
                    '</video>',
                    showCloseButton: true,
                    showConfirmButton: false,
                    heightAuto: true,
                    width: '100%',
                    background: '#f3f3f3',
                    backdrop: `rgb(0 0 0 / 60%)`
                });
                break;
            case 8:
                // window.open('docs/ION_Coaching.pdf');
                // window.open('http://docs.google.com/viewer?url=' + laURL + 'docs/ION_Coaching.pdf');
                Swal.fire({
                    title: 'ION Video 5 – Promotion Tab & New Items within Store Summary Page',
                    html: '<video id="vid5" width="100%" class="video" autoplay playsinline controls="true" controlsList="nodownload">' +
                    '<source src="docs/IONVideo5.mp4" type="video/mp4">' +
                    '</video>',
                    showCloseButton: true,
                    showConfirmButton: false,
                    heightAuto: true,
                    width: '100%',
                    background: '#f3f3f3',
                    backdrop: `rgb(0 0 0 / 60%)`
                });
                break;
            case 9:
                // window.open('docs/ION_Coaching.pdf');
                // window.open('http://docs.google.com/viewer?url=' + laURL + 'docs/ION_Coaching.pdf');
                Swal.fire({
                    title: 'ION Video 6 – Customer Service Pattern within Store Summary Page',
                    html: '<video id="vid6" width="100%" class="video" autoplay playsinline controls="true" controlsList="nodownload">' +
                    '<source src="docs/IONVideo6.mp4" type="video/mp4">' +
                    '</video>',
                    showCloseButton: true,
                    showConfirmButton: false,
                    heightAuto: true,
                    width: '100%',
                    background: '#f3f3f3',
                    backdrop: `rgb(0 0 0 / 60%)`
                });
                break;
            case 10:
                // window.open('docs/ION_Coaching.pdf');
                // window.open('http://docs.google.com/viewer?url=' + laURL + 'docs/ION_Coaching.pdf');
                Swal.fire({
                    title: 'ION Video 7 – Product Information within Product Summary Page',
                    html: '<video id="vid7" width="100%" class="video" autoplay playsinline controls="true" controlsList="nodownload">' +
                    '<source src="docs/IONVideo7.mp4" type="video/mp4">' +
                    '</video>',
                    showCloseButton: true,
                    showConfirmButton: false,
                    heightAuto: true,
                    width: '100%',
                    background: '#f3f3f3',
                    backdrop: `rgb(0 0 0 / 60%)`
                });
                break;
            case 11:
                // window.open('docs/ION_Coaching.pdf');
                // window.open('http://docs.google.com/viewer?url=' + laURL + 'docs/ION_Coaching.pdf');
                Swal.fire({
                    title: 'ION Video 8 – Weekly, Monthly, Yearly, SCO Tabs within Product Summary Page',
                    html: '<video id="vid1" width="100%" class="video" autoplay playsinline controls="true" controlsList="nodownload">' +
                    '<source src="docs/IONVideo8.mp4" type="video/mp4">' +
                    '</video>',
                    showCloseButton: true,
                    showConfirmButton: false,
                    heightAuto: true,
                    width: '100%',
                    background: '#f3f3f3',
                    backdrop: `rgb(0 0 0 / 60%)`
                });
                break;
            case 12:
                // window.open('docs/ION_Coaching.pdf');
                // window.open('http://docs.google.com/viewer?url=' + laURL + 'docs/ION_Coaching.pdf');
                Swal.fire({
                    title: 'ION Video 9 – How to Make Order Adjustment within Product Summary Page',
                    html: '<video id="vid9" width="100%" class="video" autoplay playsinline controls="true" controlsList="nodownload">' +
                    '<source src="docs/IONVideo9.mp4" type="video/mp4">' +
                    '</video>',
                    showCloseButton: true,
                    showConfirmButton: false,
                    heightAuto: true,
                    width: '100%',
                    background: '#f3f3f3',
                    backdrop: `rgb(0 0 0 / 60%)`
                });
                break;
            case 13:
            //     // window.open('docs/ION_SetUp.pdf');
            //     // window.open('http://docs.google.com/viewer?url=' + laURL + 'docs/ION_SetUp.pdf');
                Swal.fire({
                    title: 'Classroom Day',
                    html: '<iframe src="http://docs.google.com/gview?url=https://revisioni4l.mx/revision/appweb/Onboarding_v7/docs/Classroom_Day.pdf&embedded=true" type="application/pdf" style="min-height:80vh; width:100%"></iframe>',
                    showCloseButton: true,
                    showConfirmButton: false,
                    heightAuto: true,
                    width: '100%',
                    background: '#f3f3f3',
                    backdrop: `rgb(0 0 0 / 60%)`
                });
                break;
            case 14:
                Swal.fire({
                    title: 'Merchandising Arnold',
                    html: '<video id="vid10" width="100%" class="video" autoplay playsinline controls="true" controlsList="nodownload">' +
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
            case 15:
                Swal.fire({
                    title: 'Merchandising BallPark',
                    html: '<video id="vid11" width="100%" class="video" autoplay playsinline controls="true" controlsList="nodownload">' +
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
            case 16:
                Swal.fire({
                    title: 'Merchandising Barcel-Takis',
                    html: '<video id="vid12" width="100%" class="video" autoplay playsinline controls="true" controlsList="nodownload">' +
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
            case 17:
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
            case 18:
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
            case 19:
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
            case 20:
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
            case 21:
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
            case 22:
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
            case 23:
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
            case 24:
                // window.open('docs/Safe_Carry_Over_(SCO).pdf');
                // window.open('http://docs.google.com/viewer?url=' + laURL + 'docs/Safe_Carry_Over_(SCO).pdf');
                Swal.fire({
                    title: 'Safe Carry Over (SCO)',
                    html: '<iframe src="http://docs.google.com/gview?url=https://revisioni4l.mx/revision/appweb/Onboarding_v7/docs/Safe_Carry_Over_(SCO).pdf&embedded=true&navpanes=0&scrollbar=0" type="application/pdf" style="min-height:80vh; width:100%"></iframe>',
                    showCloseButton: true,
                    showConfirmButton: false,
                    heightAuto: true,
                    width: '100%',
                    background: '#f3f3f3',
                    backdrop: `rgb(0 0 0 / 60%)`
                });
                break;
            case 25:
                // window.open('docs/Scan_Based_Trading_(SBT).pdf');
                // window.open('http://docs.google.com/viewer?url=' + laURL + 'docs/Scan_Based_Trading_(SBT).pdf');
                Swal.fire({
                    title: 'Scan Based Trading (SBT) Introduction',
                    html: '<iframe src="http://docs.google.com/gview?url=https://revisioni4l.mx/revision/appweb/Onboarding_v7/docs/Scan_Based_Trading_(SBT)_Introduction.pdf&embedded=true&navpanes=0&scrollbar=0" type="application/pdf" style="min-height:80vh; width:100%"></iframe>',
                    showCloseButton: true,
                    showConfirmButton: false,
                    heightAuto: true,
                    width: '100%',
                    background: '#f3f3f3',
                    backdrop: `rgb(0 0 0 / 60%)`
                });
                break;
            case 26:
                // window.open('docs/Scan_Based_Trading_(SBT).pdf');
                // window.open('http://docs.google.com/viewer?url=' + laURL + 'docs/Scan_Based_Trading_(SBT).pdf');
                Swal.fire({
                    title: 'Scan Based Trading (SBT)',
                    html: '<iframe src="http://docs.google.com/gview?url=https://revisioni4l.mx/revision/appweb/Onboarding_v7/docs/Scan_Based_Trading_(SBT).pdf&embedded=true&navpanes=0&scrollbar=0" type="application/pdf" style="min-height:80vh; width:100%"></iframe>',
                    showCloseButton: true,
                    showConfirmButton: false,
                    heightAuto: true,
                    width: '100%',
                    background: '#f3f3f3',
                    backdrop: `rgb(0 0 0 / 60%)`
                });
                break;
            case 27:
                // window.open('docs/SETTLEMENT.pdf');
                // window.open('http://docs.google.com/viewer?url=' + laURL + 'docs/SETTLEMENT.pdf');
                Swal.fire({
                    title: 'Settlement',
                    html: '<iframe src="http://docs.google.com/gview?url=https://revisioni4l.mx/revision/appweb/Onboarding_v7/docs/Settlement.pdf&embedded=true&navpanes=0&scrollbar=0" type="application/pdf" style="min-height:80vh; width:100%"></iframe>',
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