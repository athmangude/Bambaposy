$(document).ready(function() {
    var API_URL = 'http://private-anon-f6d541990-bambapos.apiary-mock.com/';
    $('form input, form select')
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
            }).catch(function(error) {
                console.log('in error block');
                console.log(error);
            });
        });


    $('form[name="create-store-form-stage-one"]')
        .on('submit', function(event) {
            event.preventDefault();

            var self = $(this);

            var userObject = {
                name: self.parsley().fields[0].value,
                email: self.parsley().fields[1].value,
                password: self.parsley().fields[2].value,
            }

            storage({ userObject: userObject}, function(error) {
                if (error) {
                    return console.log(error);
                }

                $('#create-store-stage-one').addClass('hidden slideOutLeft');
                $('#create-store-stage-two').addClass('slideInRight').removeClass('hidden');
            });
        });

    $('form[name="create-store-form-stage-two"]')
        .on('submit', function(event) {
            event.preventDefault();

            var self = $(this);

            var userObject = {
                contact_name: self.parsley().fields[0].value + " " + self.parsley().fields[1].value,
                phone: self.parsley().fields[2].value,
                industry_id: self.parsley().fields[3].value
            }

            storage('userObject', function(error, result) {
                if (error) {
                    return console.log('there was an error');
                }

                var signUpToken = $.extend(result, userObject, {"channel": "NEWSTORE"});


                storage({ userObject: signUpToken}, function(error) {
                    if (error) {
                        return console.log(error);
                    }

                    // disable button
                    $('#sign-in-button').attr('disabled', 'disabled');

                    // show progress indicator
                    $('div.sign-in-button-holder i').removeClass('hidden');

                    fetch(API_URL+'signup', {
                        method: 'post',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(signUpToken)
                    })
                    .then(function(response) {
                        return response.json();
                    }).then(function(responseData) {
                        // enabled sign in button
                        $('#sign-in-button').removeAttr('disabled');

                        // hide progress indicator
                        $('div.sign-in-button-holder i').addClass('hidden');
                        console.log(responseData);

                        // set loginState
                        storage({loginState: true}, function(error) {
                            if (error) {
                                return console.log('An error occured when setting the login state');
                            }
                        });
                    }).catch(function(error) {
                        console.log('An error occured', error);
                    });

                });

            });
        });
});
