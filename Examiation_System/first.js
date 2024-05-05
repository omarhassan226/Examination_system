$(document).ready(function () {
    // Animate the main div and heading to drop down from the top
    $(".main").animate({
        top: '5px'
    }, 300); // Adjust the duration as needed
    $(".heading").animate({
        top: '-50px'
    }, 700); // Adjust the duration as needed

    $("#registrationForm").submit(function (event) {
        // Validate FirstName
        var firstName = $("#FirstName").val();
        if (!firstName) {
            $(".fname").show();
            $(".numericError").hide();
            event.preventDefault();
        } else if (!isNaN(firstName)) {
            $(".fname").hide();
            $(".numericError").show();
            event.preventDefault();
        } else {
            $(".fname").hide();
            $(".numericError").hide();
        }

        // Validate LastName
        var lastName = $("#LastName").val();
        if (!lastName) {
            $(".lname").show();
            $(".numericError2").hide();
            event.preventDefault();
        } else if (!isNaN(lastName)) {
            $(".lname").hide();
            $(".numericError2").show();
            event.preventDefault();
        } else {
            $(".lname").hide();
            $(".numericError2").hide();
        }

        // Validate Email
        var email1 = $("#Email").val();
        if (!email1 || !isValidEmail(email1)) {
            $(".email").show();
            event.preventDefault();
        } else {
            $(".email").hide();
        }

        // Validate Password
        var password = $("#Pass1").val();
        if (!password || password.length < 8) {
            $(".pass1").show();
            event.preventDefault();
        } else {
            $(".pass1").hide();
        }

        // Validate Re-Enter Password
        var reEnterPassword = $("#Pass2").val();
        if (password !== reEnterPassword ||!password) {
            $(".pass2").show();
            event.preventDefault();
        } else {
            $(".pass2").hide();
        }
        if (!event.isDefaultPrevented()) {
            // Validation passed, save data to localStorage
            localStorage.setItem('firstName', $('#FirstName').val());
            localStorage.setItem('lastName', $('#LastName').val());
            localStorage.setItem('email', $('#Email').val());
            localStorage.setItem('password', $('#Pass1').val());
            window.close();
        }
    });

    function isValidEmail(email1) {
        // Basic email validation, you may want to enhance this
        var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailRegex.test(email1);
    }
});