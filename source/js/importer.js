var ImportEvents = ImportEvents || {};

ImportEvents = ImportEvents || {};
ImportEvents.Parser = ImportEvents.Parser || {};

ImportEvents.Parser.Eventhandling = (function ($) {

    var i                   = 0;
    var newPosts            = {events:0,locations:0,contacts:0};
    var data                = {action:'import_events', value:'', api_keys:''};
    var short               = 200;
    var long                = 400;
    var timerId             = null;
    var loadingOccasions    = false;

    function Eventhandling() {
        $(function() {

            $(document).on('click', '#cbis, #xcap', function (e) {
                e.preventDefault();

                if (! loadingOccasions) {
                    loadingOccasions = true;
                    var button = $(this);
                    var storedCss = Eventhandling.prototype.collectCssFromButton(button);
                    Eventhandling.prototype.redLoadingButton(button, function() {
                        // Get button id
                        data.value = button.attr('id');

                        if (data.value === "xcap") {
                            console.log('run xcap');
                            jQuery.post(ajaxurl, data, function(response) {
                            newPosts = response;
                            console.log(newPosts);
                            loadingOccasions = false;
                            Eventhandling.prototype.dataPopUp(newPosts);
                            Eventhandling.prototype.restoreButton(button, storedCss);
                            });
                        } else if(data.value === "cbis") {
                            console.log('run CBIS');
                            Eventhandling.prototype.parseCbis(data, button, storedCss);
                        }

                        return;
                    });
                }
            });

            $(document).on('click', '#cbislocation', function (e) {
                e.preventDefault();

                if (! loadingOccasions) {
                    loadingOccasions = true;
                    var button = $(this);
                    var storedCss = Eventhandling.prototype.collectCssFromButton(button);
                    Eventhandling.prototype.redLoadingButton(button, function() {
                        console.log('run CBIS Location');
                        Eventhandling.prototype.parseCbislocation({action:'import_events', value:'cbislocation', api_keys:''}, button, storedCss);

                        return;
                    });
                }
            });

            $(document).on('click', '#occasions', function (e) {
                e.preventDefault();
                if (! loadingOccasions) {
                    loadingOccasions = true;
                    var button = $(this);
                    var storedCss = Eventhandling.prototype.collectCssFromButton(button);
                    Eventhandling.prototype.redLoadingButton(button, function() {
                        var data = {
                            'action'    : 'collect_occasions'
                        };

                        jQuery.post(ajaxurl, data, function(response) {
                            console.log(response);
                            loadingOccasions = false;
                            Eventhandling.prototype.restoreButton(button, storedCss);
                        });
                    });
                }
            });

        }.bind(this));
    }

    // Parse CBIS locations, loop through each API key
    Eventhandling.prototype.parseCbislocation = function(ajaxvars, button, storedCss) {
        // Show result if there's no API keys left to parse
        if( (typeof cbis_ajax_vars.cbis_keys[i] == 'undefined') ) {
            console.log('parsing done, return');
            Eventhandling.prototype.dataPopUp(newPosts);
            Eventhandling.prototype.restoreButton(button, storedCss);
            return;
        }

        var j = 0;

        var functionOne = function() {
            var r = $.Deferred();

            if ( j === 1 ) {
                console.log('each loc keys done, return');

                return r;
            }

            ajaxvars.api_keys = cbis_ajax_vars.cbis_keys[i];

            $.ajax({
                url: eventmanager.ajaxurl,
                type: 'post',
                data: ajaxvars,
                beforeSend: function() {
                },
                success: function(response) {
                    // Update response object
                    newPosts.events    += response.events;
                    newPosts.locations += response.locations;
                    newPosts.contacts  += response.contacts;

                    console.log( i );
                    console.log( response );
                    console.log( newPosts );
                    //loadingOccasions = false;

                    // Run this function again
                    j++;
                    functionOne();
                }
            })
        }

        functionOne();

        // Run this function again
// Fixa callback
        functionOne().done( Eventhandling.prototype.parseCbislocation(data, button, storedCss) );
        //Eventhandling.prototype.parseCbislocation(data, button, storedCss);
    };

    // Parse each location ID
    Eventhandling.prototype.parseEachId = function(ajaxvars){

        console.log();
        console.log(ajaxvars);

        // if( (typeof cbis_ajax_vars.cbis_keys[i] == 'undefined') ) {
        //     console.log('each loc keys done, return');
        //     return;
        // }

        $.ajax({
            url: eventmanager.ajaxurl,
            type: 'post',
            data: ajaxvars,
            beforeSend: function() {

            },
            success: function(response) {
                // Update response object
                newPosts.events    += response.events;
                newPosts.locations += response.locations;
                newPosts.contacts  += response.contacts;

                console.log( i );
                console.log( response );
                console.log( newPosts );
                loadingOccasions = false;

                // Run this function again
                //i++;
                //Eventhandling.prototype.parseEachId(ajaxvars, button, storedCss);
            }
        })

    };


    // Parse CBIS, loop through each API key
    Eventhandling.prototype.parseCbis = function(data, button, storedCss) {
        // Show result if there's no API keys left to parse
        if( (typeof cbis_ajax_vars.cbis_keys[i] == 'undefined') ) {
            console.log('parsing done, return');
            Eventhandling.prototype.dataPopUp(newPosts);
            Eventhandling.prototype.restoreButton(button, storedCss);
            return;
        }

        data.api_keys = cbis_ajax_vars.cbis_keys[i];
        $.ajax({
            url: eventmanager.ajaxurl,
            type: 'post',
            data: data,
            beforeSend: function() {

            },
            success: function(response) {
                // Update response object
                newPosts.events    += response.events;
                newPosts.locations += response.locations;
                newPosts.contacts  += response.contacts;

                console.log( i );
                console.log( response );
                console.log( newPosts );
                loadingOccasions = false;

                // Run this function again
                i++;
                Eventhandling.prototype.parseCbis(data, button, storedCss);
            }
        })
    };

    Eventhandling.prototype.dataPopUp = function(newData){
        $('#blackOverlay').show();
        var responsePopup = $('#importResponse');
        responsePopup.show(500, function() {
            var eventNumber = responsePopup.find('#event');
            var locationNumber = responsePopup.find('#location');
            var contactNumber = responsePopup.find('#contact');
            var normalTextSize = eventNumber.css('fontSize');
            var bigTextSize = '26px';
            eventNumber.text(newData.events);
            locationNumber.text(newData.locations);
            contactNumber.text(newData.contacts);
            eventNumber.animate({opacity: 1}, long).animate({fontSize: bigTextSize}, short).animate({fontSize: normalTextSize}, short, function() {
                locationNumber.animate({opacity: 1}, long).animate({fontSize: bigTextSize}, short).animate({fontSize: normalTextSize}, short, function() {
                    contactNumber.animate({opacity: 1}, long).animate({fontSize: bigTextSize}, short).animate({fontSize: normalTextSize}, short, function() {
                        var loadingBar = responsePopup.find('#untilReload #meter');
                        loadingBar.animate({width: '100%'}, 7000, function() {
                            location.reload();
                        });
                    });
                });
            });
        });
    };

    Eventhandling.prototype.collectCssFromButton = function (button) {
        return {
            bgColor: button.css('background-color'),
            textColor: button.css('color'),
            borderColor: button.css('border-color'),
            textShadow: button.css('text-shadow'),
            boxShadow: button.css('box-shadow'),
            width: button.css('width'),
            text: button.text()
        };
    };

    Eventhandling.prototype.redLoadingButton = function (button, callback) {
        button.fadeOut(500, function() {
            var texts = [eventmanager.loading + '&nbsp;&nbsp;&nbsp;', eventmanager.loading + '.&nbsp;&nbsp;', eventmanager.loading + '..&nbsp;', eventmanager.loading + '...'];
            button.css('background-color', 'rgb(51, 197, 255)');
            button.css('border-color', 'rgb(0, 164, 230)');
            button.css('color', 'white');
            button.css('text-shadow', '0 -1px 1px rgb(0, 164, 230),1px 0 1px rgb(0, 164, 230),0 1px 1px rgb(0, 164, 230),-1px 0 1px rgb(0, 164, 230)');
            button.css('box-shadow', 'none');
            button.css('width', '85px');
            button.html(texts[0]);
            button.fadeIn(500);

            var counter = 1;
            timerId = setInterval(function()
            {
                if(counter > 3)
                    counter = 0;
                button.html(texts[counter]);
                ++counter;
            }, 500);
            if(callback != undefined)
                callback();
        });
    };

    Eventhandling.prototype.restoreButton = function (button, storedCss) {
        button.fadeOut(500, function() {
            button.css('background-color', storedCss.bgColor);
            button.css('color', storedCss.textColor);
            button.css('border-color', storedCss.borderColor);
            button.css('text-shadow', storedCss.textShadow);
            button.css('box-shadow', storedCss.boxShadow);
            button.css('width', storedCss.width);
            button.text(storedCss.text);
            button.fadeIn(500);
            clearTimeout(timerId);
        });
    };

    return new Eventhandling();

})(jQuery);
