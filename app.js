$(document).ready(function() {
    $('form[name="sign-in-form"] input')
        .on('focus', function() {
            console.log($(this).siblings('small'));
            $(this).siblings('small').removeClass('hidden');
        })
        .on('blur', function() {
            $(this).siblings('small').addClass('hidden');
        });
});
