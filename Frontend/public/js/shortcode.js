/*--------------------------------------------------------------------------------------------

	1. widget-client-carousel function by = owl.carousel.js
	2. Client logo Carousel-3 Carousels  function by = owl.carousel.js
	3. Client logo Carousel-2 Carousels  function by = owl.carousel.js
	4. Client logo Carousel-1  function by = owl.carousel.js
	5. Fade slider function by = owl.carousel.js
	6. Slide slider function by = owl.carousel.js
	7. CounterUp function by = counterup-min.js

---------------------------------------------------------------------------------------------*/

jQuery(document).ready(function() {

    'use strict';

    //  widget-client-carousel function by = owl.carousel.js ========================== //

    jQuery('.widget-client').owlCarousel({
        loop: true,
        autoplay: true,
        items: 1,
        nav: false,
        dots: true,
        navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
    })

    // Client logo Carousel-3 Carousels  function by = owl.carousel.js ========================== //		

    jQuery('.client-logo-carousel-3').owlCarousel({
        loop: true,
        margin: 30,
        nav: false,
        dots: true,
        navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
        responsive: {
            0: {
                items: 1
            },
            480: {
                items: 2
            },
            767: {
                items: 3
            },
            1000: {
                items: 3
            }
        }
    })

    // Client logo Carousel-2 Carousels  function by = owl.carousel.js ========================== //		

    jQuery('.client-logo-carousel-2').owlCarousel({
        loop: true,
        margin: 30,
        nav: true,
        dots: false,
        navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
        responsive: {
            0: {
                items: 1
            },
            480: {
                items: 2
            },
            767: {
                items: 2
            },
            1000: {
                items: 2
            }
        }
    })

    // Client logo Carousel-1  function by = owl.carousel.js ========================== //		

    jQuery('.client-logo-carousel-1').owlCarousel({
        loop: true,
        margin: 30,
        nav: true,
        dots: false,
        navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
        responsive: {
            0: {
                items: 1
            },
            480: {
                items: 1
            },
            767: {
                items: 1
            },
            1000: {
                items: 1
            }
        }
    })

    // Fade slider function by = owl.carousel.js ========================== //

    jQuery('.owl-fade-slider-one').owlCarousel({
        loop: true,
        autoplay: true,
        autoplayTimeout: 2000,
        margin: 30,
        nav: true,
        navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
        items: 1,
        dots: true,
        animateOut: 'fadeOut',

    })

    // Slide slider function by = owl.carousel.js ========================== //

    jQuery('.owl-slide-slider-one').owlCarousel({
        loop: true,
        autoplay: true,
        autoplayTimeout: 2000,
        margin: 30,
        nav: true,
        navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
        items: 1,
        dots: true,
    })

    //  CounterUp function by = counterup-min.js ========================== //

    jQuery('.counter').counterUp({
        delay: 10,
        time: 1000
    });

});

// Document.ready END==set-marker-popup-close============================================================//