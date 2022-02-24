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
                window.open('docs/Distribution_Agreement.pdf');
                break;
            case 2:
                window.open('docs/Handheld_(HHC).pdf');
                break;
            case 3:
                window.open('docs/ION_Coaching.pdf');
                break;
            case 4:
                window.open('docs/ION_SetUp.pdf');
                break;
            case 5:
                // window.open('docs/Merchandising_Best_Practices.mov');
                Swal.fire({
                    title: 'Merchandising Best Practices',
                    html: '<video id="VisaChipCardVideo" width="100%" class="video" autoplay controls controlsList="nodownload">' +
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
            case 6:
                // window.open('docs/Distribution_Agreement.pdf');
                break;
            case 7:
                // window.open('docs/Distribution_Agreement.pdf');
                break;
            case 8:
                // window.open('docs/Distribution_Agreement.pdf');
                break;
            case 9:
                // window.open('docs/Distribution_Agreement.pdf');
                break;
            case 10:
                // window.open('docs/Distribution_Agreement.pdf');
                break;
            case 11:
                // window.open('docs/Distribution_Agreement.pdf');
                break;
            case 12:
                // window.open('docs/Merchandising_SaraLee.mov');
                Swal.fire({
                    title: 'Merchandising SaraLee',
                    html: '<video id="VisaChipCardVideo" width="100%" class="video" autoplay controls controlsList="nodownload">' +
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
                // window.open('docs/Distribution_Agreement.pdf');
                break;
            case 14:
                // window.open('docs/Merchandising_Thomas.mov');
                Swal.fire({
                    title: 'Merchandising Thomas',
                    html: '<video id="VisaChipCardVideo" width="100%" class="video" autoplay controls controlsList="nodownload">' +
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
            case 15:
                window.open('docs/Safe_Carry_Over_(SCO).pdf');
                break;
            case 16:
                window.open('docs/Scan_Based_Trading_(SBT).pdf');
                break;
            case 17:
                window.open('docs/SETTLEMENT.pdf');
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