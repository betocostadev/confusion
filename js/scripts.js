$(document).ready(function() {
    // jQuery custom controls to play/pause the carousel
    $('#mycarousel').carousel({interval: 2200});
    $('#carouselButton').click(function() {
        if ($('#carouselButton').children('span').hasClass('fa-pause')) {
        $('#mycarousel').carousel('pause');
        $('#carouselButton').children('span').removeClass('fa-pause');
        $('#carouselButton').children('span').addClass('fa-play');
        } else if ($('#carouselButton').children('span').hasClass('fa-play')) {
        $('#mycarousel').carousel('cycle');
        $('#carouselButton').children('span').removeClass('fa-play');
        $('#carouselButton').children('span').addClass('fa-pause');
        }
    });
    // jQuery custom controls to show the Reserve Table Modal
    $('#reserveBtn').click(function() {
        if ($('#reservationsModal').hasClass('show')) {
            $('#reservationsModal').modal('hide');
        } else {
            $('#reservationsModal').modal('show');
        }
    });
    $('#closeResModal').click(function() {
        $('#reservationsModal').modal('hide');
    });
    $('#reserveCancel').click(function() {
        $('#reservationsModal').modal('hide');
    });
    $('#reserveDone').click(function() {
        $('#reservationsModal').modal('hide');
    });
    // jQuery custom controls to show the Login Modal
    $('#loginBtn').click(function() {
        $('#loginModal').modal('show');
    })


});