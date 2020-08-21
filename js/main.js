// jQuery(document).ready(function($){


//     var $container = $('.sponsors-slider');

//     if ( $container.length > 0 ) {

//         $container.slick({

//             infinite: true,

//             slidesToShow: 5,

//             slidesToScroll: 1,

//             arrows: false,

//             autoplay: true,

//             autoplaySpeed: 2000,

//             draggable: false,

//             responsive: [

//                 {

//                     breakpoint: 1024,

//                     settings: {

//                         slidesToShow: 3,

//                     }

//                 },

//                 {

//                     breakpoint: 700,

//                     settings: {

//                         slidesToShow: 2,

//                     }

//                 },

//                 {

//                     breakpoint: 400,

//                     settings: {

//                         slidesToShow: 1,

//                     }

//                 },

//             ]

//         });


//         /* sponsor slider steppers */

//         $container.find('.prev').on('click', function () {

//             $container.find('.sponsors-slider').slick('slickPrev');

//         });


//         $container.find('.next').on('click', function () {

//             $container.find('.sponsors-slider').slick('slickNext');

//         });

//     }

// });


// // $(function () {

// //     /**

// //      * Tile slider - homepage

// //      * */

// //     $('.tile-slider').slick({

// //         infinite: true,

// //         arrows: false,

// //         draggable: false

// //     });


// //     /* sponsor slider steppers */

// //     $(".tile-slider-wrapper").find('.prev').on('click', function () {

// //         $('.tile-slider').slick('slickPrev');

// //     });


// //     $(".tile-slider-wrapper").find('.next').on('click', function () {

// //         $('.tile-slider').slick('slickNext');

// //     });


// //     /**

// //      * Sponsor slider init

// //      */

// //     $('.sponsors-slider').slick({

// //         infinite: true,

// //         slidesToShow: 5,

// //         slidesToScroll: 1,

// //         arrows: false,

// //         draggable: false,

// //         responsive: [

// //             {

// //                 breakpoint: 1024,

// //                 settings: {

// //                     slidesToShow: 3,

// //                 }

// //             },

// //             {

// //                 breakpoint: 700,

// //                 settings: {

// //                     slidesToShow: 2,

// //                 }

// //             },

// //             {

// //                 breakpoint: 400,

// //                 settings: {

// //                     slidesToShow: 1,

// //                 }

// //             },

// //         ]

// //     });


// //     /* sponsor slider steppers */

// //     $(".sponsors").find('.prev').on('click', function () {

// //         $('.sponsors-slider').slick('slickPrev');

// //     });


// //     $(".sponsors").find('.next').on('click', function () {

// //         $('.sponsors-slider').slick('slickNext');

// //     });


// // });

(function ($) {

    "use strict";

    //Submenu Dropdown Toggle
    if ($('.page-nav li.nav__dropdown ul').length) {
        $('.page-nav li.nav__dropdown').append('<div class="dropdown-btn"><span class="icon icon-down-arrow"></span></div>');

        //Dropdown Button
        $('.page-nav li.nav__dropdown .dropdown-btn').on('click', function () {
            $(this).prev('ul').slideToggle(500);
        });

    }
// donation
    $("#donation-btn").click(function() {
        window.location.href = 'donation.html';
    });
})(window.jQuery);
