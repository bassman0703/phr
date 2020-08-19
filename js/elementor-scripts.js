(function ( $, elementor ) {
    "use strict";

    var WL_Elementor = {
        init: function () {
            var widgets = {
                'wl-main-slider.default': WL_Elementor.WL_main_slider,
                'wl-sponsors.default': WL_Elementor.WL_sponsors,
                'wl-event-counter.default': WL_Elementor.WL_Event_Counter,
                'wl-notification-bar.default': WL_Elementor.WL_Notification_Ticker,
                'wl-gallery.default': WL_Elementor.WL_Gallery,
            };

            $.each(widgets, function (widget, callback) {
                elementor.hooks.addAction('frontend/element_ready/' + widget, callback );
            });
        },

        WL_main_slider: function( $scope ) {
            var $container = $scope.find('.tile-slider');
            var controls = JSON.parse( $container.attr( 'data-controls' ) );

            var autoslide = Boolean( controls.auto_nav_slide ? true : false );
            var nav = Boolean( controls.dot_nav_show ? true : false );

            if ( $container.length > 0 ) {
                $container.not('.slick-initialized').slick({
                    infinite: true,
                    arrows: false,
                    draggable: false
                });

                /* sponsor slider steppers */
                $(".tile-slider-wrapper").find('.prev').on('click', function () {
                    $('.tile-slider').slick('slickPrev');
                });

                $(".tile-slider-wrapper").find('.next').on('click', function () {
                    $('.tile-slider').slick('slickNext');
                });
            }
        },

        WL_sponsors: function( $scope ) {
            var $container = $scope.find('.sponsors');
            var controls = JSON.parse( $container.attr( 'data-controls' ) );

            var autoslide = Boolean( controls.auto_nav_slide ? true : false );

            if ( $container.length > 0 ) {
                $container.find('.sponsors-slider').not('.slick-initialized').slick({
                    infinite: true,
                    slidesToShow: 5,
                    slidesToScroll: 1,
                    arrows: false,
                    autoplay: autoslide,
                    autoplaySpeed: 2000,
                    draggable: false,
                    responsive: [
                        {
                            breakpoint: 1024,
                            settings: {
                                slidesToShow: 3,
                            }
                        },
                        {
                            breakpoint: 700,
                            settings: {
                                slidesToShow: 2,
                            }
                        },
                        {
                            breakpoint: 400,
                            settings: {
                                slidesToShow: 1,
                            }
                        },
                    ]
                });

                /* sponsor slider steppers */
                $container.find('.prev').on('click', function () {
                    $container.find('.sponsors-slider').slick('slickPrev');
                });

                $container.find('.next').on('click', function () {
                    $container.find('.sponsors-slider').slick('slickNext');
                });
            }
        },

        WL_Event_Counter: function( $scope ) {
            var $container = $scope.find('#timer');
            var controls = $container.attr( 'data-timer' );

            var endDate = new Date(controls).getTime();

            var timer = setInterval(function() {

                var now = new Date().getTime();
                var t = endDate - now;
                
                if ( t >= 0 ) {
                
                    var days = Math.floor( t / ( 1000 * 60 * 60 * 24 ) );
                    var DaysString = String( "0" + days ).slice( -2 );
                    var daysoutput = "";
                    DaysString.split('').forEach( value => {
                        daysoutput += '<span>' + value + '</span>';
                    });
                    $container.find("#timer-days").html( daysoutput );

                    var hours = Math.floor( ( t % ( 1000 * 60 * 60 * 24 ) ) / ( 1000 * 60 * 60 ) );
                    var HoursString = String( ( "0" + hours ).slice( -2 ) );
                    var hoursOutput = "";
                    HoursString.split('').forEach( value => {
                        hoursOutput += '<span>' + value + '</span>';
                    });

                    $container.find("#timer-hours").html( hoursOutput );

                    var mins = Math.floor( ( t % ( 1000 * 60 * 60 ) ) / ( 1000 * 60 ) );
                    var MinsString = String( ( "0" + mins ).slice( -2 ) );
                    var minsOutput = "";
                    MinsString.split('').forEach( value => {
                        minsOutput += '<span>' + value + '</span>';
                    });

                    $container.find("#timer-mins").html( minsOutput );

                    var secs = Math.floor( ( t % ( 1000 * 60 ) ) / 1000 );
                    var SecString = String( ( "0"+ secs ).slice( -2 ) );
                    var SecOutput = "";
                    SecString.split('').forEach( value => {
                        SecOutput += '<span>' + value + '</span>';
                    });

                    $container.find("#timer-secs").html( SecOutput );
                } else {
                    $container.html( "The countdown is over!" );
                    $('.timer-days-counter').hide();
                }
            }, 1000 );
        },

        WL_Notification_Ticker: function( $scope ) {
            var $container = $scope.find('.info-bar');

            if ( $container.length > 0 ) {
                $container.find('.info-bar-slider').not('.slick-initialized').slick({
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                    autoplay: true,
                    cssEase:'linear',
                    autoplaySpeed: 2000,
                    draggable: false,
                    vertical: true,
                    verticalScrolling: true,
                    verticalSwiping: true,
                    responsive: [
                        {
                            breakpoint: 1024,
                            settings: {
                                slidesToShow: 1,
                            }
                        },
                        {
                            breakpoint: 700,
                            settings: {
                                slidesToShow: 1,
                            }
                        },
                        {
                            breakpoint: 400,
                            settings: {
                                slidesToShow: 1,
                            }
                        },
                    ]
                });

                $container.find('.up').on('click', function () {
                    $container.find('.info-bar-slider').slick('slickPrev');
                });

                $container.find('.down').on('click', function () {
                    $container.find('.info-bar-slider').slick('slickNext');
                });
            }
        },

        WL_Gallery: function( $scope ) {
            var $container = $scope.find('.sortable-masonry');

            if ( $container.length > 0 ) {
                var $filter = $container.find('.filter-btns');
                var $wrapper = $container.find('.items-container');

                $(document).on('click', '[data-toggle="lightbox"]', function(event) {
                    event.preventDefault();
                    $(this).ekkoLightbox();
                });

                $wrapper.isotope({
                    masonry: {
                        columnWidth : 0.5
                    },
                    animationOptions:{
                        duration:500,
                        easing:'linear'
                    }
                });

                $filter.find('li').on('click', function() {
                    var selector = $(this).attr('data-filter');

                    $wrapper.isotope({
                        filter : selector,
                        animationOptions: {
                            duration: 500,
                            easing : 'linear',
                            queue : false
                        }
                    });
                });

                var filterItemA = $filter.find('li');

                filterItemA.on('click', function(){
                    var $this = $(this);
                    if ( ! $this.hasClass('active') ) {
                        filterItemA.removeClass('active');
                        $this.addClass('active');
                    }
                });
            }
        },
    }

    $(window).on('elementor/frontend/init', WL_Elementor.init );

}(jQuery, window.elementorFrontend ));