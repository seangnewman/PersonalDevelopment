var theQuote = '';
var theAuthor = '';

$(document).ready(function(){


  $('#quoteButton').click(function(){
      $.getJSON("http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?")
         .done(updateQuoteContainer)
         .fail(handleErr);
  });

  $('#twitterButton').click(function(){

      var theTweet = 'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent('"' + theQuote + '" ' + theAuthor);
      console.log(theTweet);
      window.open(theTweet, '_blank');
  });


  $('.carousel').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
      arrows: false,
      fade: true
    });




});

function updateQuoteContainer(response) {

    theQuote = response.quoteText;
    theAuthor = response.quoteAuthor;

    $('#quote').text('"'+  theQuote + '"');
    $('#author').text('- '+  theAuthor );
}

function handleErr(jqxhr, textStatus, err) {
  console.log("Request Failed: " + textStatus + ", " + err);
}
