$(document).ready(function () {
    // Animate the heading and main to fade in and move up
    $("#heading").animate({
        opacity: 1,
        top: '165px'
    }, 1500);

    $(".main").animate({
        opacity: 1,
        top: '0'
    }, {
        duration: 1500,
        start: function () {
            // On animation start, animate the overlay opacity
            $(".overlay").animate({
                opacity: 0.9
            }, 600);
        },
        complete: function () {
            // On animation complete, perform any other actions
            // You can add additional animations or actions here
        }
    });
});

$('#loginForm').submit(function (event) {
    var email = $('#email').val();
    var password = $('#pass').val();
    var storedEmail = localStorage.getItem('email');
    var storedPassword = localStorage.getItem('password')

    if (!email) {
        $('.emptyEmail').show();
        $('.email').hide();
        $('.incorrectEmail').hide();
        event.preventDefault();
    } else if (!validEmail(email)) {
        $('.incorrectEmail').show();
        $('.emptyEmail').hide();
        $('.email').hide();
        event.preventDefault();
    } else if (email !== storedEmail) {
        $('.email').show();
        $('.incorrectEmail').hide();
        $('.emptyEmail').hide();
        event.preventDefault();
    } else if (!password || password !== storedPassword) {
        $('.pass').show();
        $('.email').hide();
        event.preventDefault();
    } else {
        window.close()
    }
});

function validEmail(email) {
    // Basic email validation, you may want to enhance this
    var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
}