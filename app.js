$(document).ready(function() {
    var API_URL = 'http://private-anon-f6d541990-bambapos.apiary-mock.com/';
    $('form[name="sign-in-form"] input')
        .on('focus', function() {
            $(this).siblings('small').removeClass('hidden');
        })
        .on('blur', function() {
            $(this).siblings('small').addClass('hidden');
        });


    $('form[name="sign-in-form"]').parsley()
        .on('form:submit', function(event) {
            var email = event.fields[0].value;
            var password = event.fields[1].value;

            fetch(API_URL+'signin', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    channel: "LOGIN"
                })
            })
            .then(function(response) {
                return response.json();
            }).then(function(responseData) {
                console.log(responseData);
            }).catch(function(error) {
                console.log(error);
            });

            console.log(email, password);
        });
});
