$(document).ready(function() {

 var xScroll = 0;

 var lastScrollTop = 0;

 $(window).scroll(function () {


 var yScroll = $(this).scrollTop();

         if (yScroll <= xScroll ){
             $('.nav').fadeIn();
         } else {
           $('.nav').fadeOut();
         }
         xScroll = yScroll;
   });


  $('.carousel').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
      arrows: false,
      fade: true
    });



}); // End of Document Ready
