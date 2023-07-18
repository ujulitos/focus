function hazRipple(elY, elX) {
    // let elX = event.offsetX;
    // let elY = event.offsetY;

    let bodyRipple = $('body').append($('<div class="ripple"></div>'));

    $('.ripple').css({
        'left': elX + 'px',
        'top': elY + 'px'
    })

    bodyRipple.one('webkitAnimationEnd oanimationend msAnimationEnd animationend',
        function() {
            $('.ripple').remove();
        });
}