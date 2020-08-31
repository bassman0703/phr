$(document).ready(function(){

    $('#adjust').on('click', function (e) {
        e.preventDefault()
        var element = document.querySelector("body");
        element.classList.toggle("adjust-background");

        var element1 = document.querySelector(".page-header__middle");
        element1.classList.toggle("adjust-background");

        var element2 = document.querySelector(".form--search");
        element2.classList.toggle("adjust-background");
        var element3 = document.querySelector(".lang-li");
        element3.classList.toggle("adjust-background");
        var element4 = document.querySelector(".lang-a");
        element4.classList.toggle("adjust-background");
        var element5 = document.querySelector(".lang-b");
        element5.classList.toggle("adjust-background");
        var element6 = document.querySelector(".border-lang");
        element6.classList.toggle("adjust-background");

    })

    $('#font').on('click', function (e) {
        e.preventDefault()
        var element = document.querySelector("html");
        element.classList.toggle("adjust-font-size");
        var element = document.querySelector("card-title");
        element.classList.toggle("adjust-font-size");
    })
});



