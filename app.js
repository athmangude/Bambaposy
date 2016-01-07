$(document).ready(function() {
    var API_URL = 'http://private-anon-f6d541990-bambapos.apiary-mock.com/';
    $('form[name="sign-in-form"] input')
        .on('focus', function() {
            $(this).siblings('small').removeClass('hidden');
        })
        .on('blur', function() {
            $(this).siblings('small').addClass('hidden');
        });


    $('form[name="sign-in-form"]')
        .on('submit', function(event) {
            event.preventDefault();

            console.log(event);

            var self = $(this);

            self.parsley();

            console.log(self.parsley());

            var email = self.parsley().fields[0].value;
            var password = self.parsley().fields[1].value;

            // disable button
            $('#sign-in-button').attr('disabled', 'disabled');

            // show progress indicator
            $('div.sign-in-button-holder i').removeClass('hidden');

            console.log('initiating api request');

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
                // enabled sign in button
                $('#sign-in-button').removeAttr('disabled');

                // hide progress indicator
                $('div.sign-in-button-holder i').addClass('hidden');
                console.log(responseData);

                // $('form[name="create-store-form-stage-one"]').addClass('hidden');
                // $('form[name="create-store-form-stage-two"]').addClass('hidden fadeIn');

            }).catch(function(error) {
                console.log('in error block');
                console.log(error);
            });
        });


    $('form[name="create-store-form-stage-one"]')
        .on('submit', function(event) {
            event.preventDefault();

            var self = $(this);

            var storeName = self.parsley().fields[0].value;
            var email = self.parsley().fields[1].value;
            var password = self.parsley().fields[2].value;

            console.log(storeName, email, password);
        });
});
