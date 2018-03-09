(function ($) {
    "use strict"; // Start of use strict

    // Smooth scrolling using jQuery easing
    $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: (target.offset().top)
                }, 1000, "easeInOutExpo");
                return false;
            }
        }
    });

    // Closes responsive menu when a scroll trigger link is clicked
    $('.js-scroll-trigger').click(function () {
        $('.navbar-collapse').collapse('hide');
    });

    // Activate scrollspy to add active class to navbar items on scroll
    $('body').scrollspy({
        target: '#sideNav'
    });

    // Activate WordCloud
    var list = $("#skills-list li").map(function() {
        return [[$(this).attr("name"), parseInt($(this).data("size"))]]
    }).get()


    WordCloud(document.getElementById('skill-canvas'), {
        list: list,
        fontFamily: 'Open Sans',
        minRotation: 0,
        maxRotation: 0,
        gridSize: 10,
        weightFactor: 0.40,
        shape: 'square',
        color: $("body").css("color"),
        backgroundColor: 'rgba(255,255,255,0,01)',
        // click: function(item) {
        //     var items = document.getElementsByName(item[0])
        //     if(items.length > 0){
        //         var link = $(items[0]).attr('href');
        //         if(link != '#'){
        //             location.href = link;
        //         }
        //     }
        // }
    });

    $("#skills-list li").map(function() {

    }).get()


})(jQuery); // End of use strict
