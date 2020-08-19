jQuery(document).ready(function ($) {

    var $container = $('.sponsors-slider');
    if ($container.length > 0) {
        $container.not('.slick-initialized').slick({
            infinite: true,
            slidesToShow: 5,
            slidesToScroll: 1,
            arrows: false,
            autoplay: true,
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
});
