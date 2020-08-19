$(document).ready(function() {
    $('.options .button').click(function () {
        $('.options .button').removeClass('button--active');
        $(this).addClass('button--active');
        var value = $(this).text().replace('$', '');
        $('#donate-field input').val(value);
    });
});
