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
                window.open('http://docs.google.com/viewer?url=' + laURL + 'docs/Distribution_Agreement.pdf');
                // Swal.fire({
                //     title: 'Distribution Agreement',
                //     html: '<iframe src="http://docs.google.com/viewer?url=' + laURL + 'docs/Distribution_Agreement.pdf&embedded=true" type="application/pdf" style="min-height:80vh; width:100%"></iframe>',
                //     showCloseButton: true,
                //     showConfirmButton: false,
                //     heightAuto: true,
                //     width: '100%',
                //     background: '#f3f3f3',
                //     backdrop: `rgb(0 0 0 / 60%)`
                // });
                break;
            case 2:
                window.open('http://docs.google.com/viewer?url=' + laURL + 'docs/Handheld_(HHC).pdf');
                // Swal.fire({
                //     title: 'Handheld (HHC)',
                //     html: '<iframe src="http://docs.google.com/viewer?url=' + laURL + 'docs/Handheld_(HHC).pdf&embedded=true" type="application/pdf" style="min-height:80vh; width:100%"></iframe>',
                //     showCloseButton: true,
                //     showConfirmButton: false,
                //     heightAuto: true,
                //     width: '100%',
                //     background: '#f3f3f3',
                //     backdrop: `rgb(0 0 0 / 60%)`
                // });
                break;
            case 3:
                // window.open('docs/ION_Coaching.pdf');
                window.open('http://docs.google.com/viewer?url=' + laURL + 'docs/ION_Coaching.pdf');
                // Swal.fire({
                //     title: 'ION Coaching',
                //     html: '<object data="docs/ION_Coaching.pdf" type="application/pdf" style="min-height:80vh; width:100%"></object>',
                //     showCloseButton: true,
                //     showConfirmButton: false,
                //     heightAuto: true,
                //     width: '100%',
                //     background: '#f3f3f3',
                //     backdrop: `rgb(0 0 0 / 60%)`
                // });
                break;
            case 4:
                // window.open('docs/ION_SetUp.pdf');
                window.open('http://docs.google.com/viewer?url=' + laURL + 'docs/ION_SetUp.pdf');
                // Swal.fire({
                //     title: 'ION SetUp',
                //     html: '<iframe src="https://view.officeapps.live.com/op/embed.aspx?src=' + laURL + 'docs/ION_SetUp.pdf" type="application/pdf" style="min-height:80vh; width:100%"></iframe>',
                //     showCloseButton: true,
                //     showConfirmButton: false,
                //     heightAuto: true,
                //     width: '100%',
                //     background: '#f3f3f3',
                //     backdrop: `rgb(0 0 0 / 60%)`
                // });
                break;
            case 5:
                Swal.fire({
                    title: 'Merchandising Arnold',
                    html: '<video width="100%" class="video" autoplay controls controlsList="nodownload">' +
                        '<source src="docs/Merchandising_Arnold.mov" type="video/mp4">' +
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
                Swal.fire({
                    title: 'Merchandising BallPark',
                    html: '<video width="100%" class="video" autoplay controls controlsList="nodownload">' +
                        '<source src="docs/Merchandising_BallPark.mov" type="video/mp4">' +
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
                Swal.fire({
                    title: 'Merchandising Barcel-Takis',
                    html: '<video width="100%" class="video" autoplay controls controlsList="nodownload">' +
                        '<source src="docs/Merchandising_BarcelTakis.mov" type="video/mp4">' +
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
                Swal.fire({
                    title: 'Merchandising Best Practices',
                    html: '<video width="100%" class="video" autoplay controls controlsList="nodownload">' +
                        '<source src="docs/Merchandising_Best_Practices.mov" type="video/mp4">' +
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
                Swal.fire({
                    title: 'Merchandising Bimbo-Marinela',
                    html: '<video width="100%" class="video" autoplay controls controlsList="nodownload">' +
                        '<source src="docs/Merchandising_BimboMarinela.mov" type="video/mp4">' +
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
                Swal.fire({
                    title: 'Merchandising Brownberry',
                    html: '<video width="100%" class="video" autoplay controls controlsList="nodownload">' +
                        '<source src="docs/Merchandising_Brownberry.mov" type="video/mp4">' +
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
                Swal.fire({
                    title: 'Merchandising Entenmanns',
                    html: '<video width="100%" class="video" autoplay controls controlsList="nodownload">' +
                        '<source src="docs/Merchandising_Entenmanns.mov" type="video/mp4">' +
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
                Swal.fire({
                    title: 'Merchandising SaraLee',
                    html: '<video width="100%" class="video" autoplay controls controlsList="nodownload">' +
                        '<source src="docs/Merchandising_SaraLee.mov" type="video/mp4">' +
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
                Swal.fire({
                    title: 'Merchandising Thomas',
                    html: '<video width="100%" class="video" autoplay controls controlsList="nodownload">' +
                        '<source src="docs/Merchandising_Thomas.mov" type="video/mp4">' +
                        '</video>',
                    showCloseButton: true,
                    showConfirmButton: false,
                    heightAuto: true,
                    width: '100%',
                    background: '#f3f3f3',
                    backdrop: `rgb(0 0 0 / 60%)`
                });
                break;
            case 14:
                // window.open('docs/Merchandising_Thomas.mov');
                Swal.fire({
                    title: 'Merchandising Oroweat',
                    html: '<video width="100%" class="video" autoplay controls controlsList="nodownload">' +
                        '<source src="docs/Merhandising_Oroweat.mov" type="video/mp4">' +
                        '</video>',
                    showCloseButton: true,
                    showConfirmButton: false,
                    heightAuto: true,
                    width: '100%',
                    background: '#f3f3f3',
                    backdrop: `rgb(0 0 0 / 60%)`
                });
                break;
            case 15:
                // window.open('docs/Safe_Carry_Over_(SCO).pdf');
                window.open('http://docs.google.com/viewer?url=' + laURL + 'docs/Safe_Carry_Over_(SCO).pdf');
                // Swal.fire({
                //     title: 'Safe Carry Over (SCO)',
                //     html: '<object data="docs/Safe_Carry_Over_(SCO).pdf" type="application/pdf" style="min-height:80vh; width:100%"></object>',
                //     showCloseButton: true,
                //     showConfirmButton: false,
                //     heightAuto: true,
                //     width: '100%',
                //     background: '#f3f3f3',
                //     backdrop: `rgb(0 0 0 / 60%)`
                // });
                break;
            case 16:
                // window.open('docs/Scan_Based_Trading_(SBT).pdf');
                window.open('http://docs.google.com/viewer?url=' + laURL + 'docs/Scan_Based_Trading_(SBT).pdf');
                // Swal.fire({
                //     title: 'Scan Based Trading (SBT)',
                //     html: '<object data="docs/Scan_Based_Trading_(SBT).pdf" type="application/pdf" style="min-height:80vh; width:100%"></object>',
                //     showCloseButton: true,
                //     showConfirmButton: false,
                //     heightAuto: true,
                //     width: '100%',
                //     background: '#f3f3f3',
                //     backdrop: `rgb(0 0 0 / 60%)`
                // });
                break;
            case 17:
                // window.open('docs/SETTLEMENT.pdf');
                window.open('http://docs.google.com/viewer?url=' + laURL + 'docs/SETTLEMENT.pdf');
                // Swal.fire({
                //     title: 'Settlement',
                //     html: '<object data="docs/SETTLEMENT.pdf" type="application/pdf" style="min-height:80vh; width:100%"></object>',
                //     showCloseButton: true,
                //     showConfirmButton: false,
                //     heightAuto: true,
                //     width: '100%',
                //     background: '#f3f3f3',
                //     backdrop: `rgb(0 0 0 / 60%)`
                // });
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