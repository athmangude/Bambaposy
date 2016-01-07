$(document).ready(function() {
    $('form[name="sign-in-form"] input')
        .on('focus', function() {
            $(this).siblings('small').removeClass('hidden');
        })
        .on('blur', function() {
            $(this).siblings('small').addClass('hidden');
        });


    $('form[name="sign-in-form"]').parsley()
        .on('form:submit', function(event) {
            console.log(event);
            var email = event.fields[0].value;
            var password = event.fields[1].value;

            console.log(email, password);
        });
});
