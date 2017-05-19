var $randomWiki = 'https://en.wikipedia.org/wiki/Special:Random'
var $searchWiki = 'http://en.wikipedia.org/w/api.php?action=opensearch&limit=10&namespace=0&format=json&search=';


$(document).ready(function(){

    drawFCCBanner();

    $('#getRandomWiki').click(function(){
      window.open($randomWiki);
    });



    $('#getSearchWiki').click(function(){
        $('#buttonOptions').css('display','none');
        $('#wikiSearchForm').css('display','inline-block');
        $('#wikiResetForm').css('display','block');
    });



    $('#getWikiSearchText').click(function(){
      if($('#wikiSearchText').val() !== ''){
      $('#searchError').css('display','none');

      var $searchWikiTerm = $('#wikiSearchText').val().split(' ').join('+');


      var $url =  $searchWiki + $searchWikiTerm;
      $.ajax({
          type: "GET",
          url: $url,
          contentType: "application/json; charset=utf-8",
          async: false,
          dataType: "jsonp",
          success: function (data, textStatus, jqXHR) {

              $('#wikiSearchForm').css('display','none');

              var $wikiResult = '';
              var $hRef = '#';



              //build list
              console.log(data);
              for(var i = 0; i < data[1].length; i++){

                $hRef = data[3][i];
                $wikiTitle = data[1][i];
                $wikiDescription = data[2][i];
                $wikiResult = '<section id="wikiArticle" class="Wiki">';
                $wikiResult += '<header>';
                $wikiResult += '<div class="wikiTitle" id="wikiTitle-"'+ i +'"><a href= "'+ $hRef +  '" id="ref-"'+ i +' target="_blank">'+ $wikiTitle +'</a> </div>';
                $wikiResult += '</header>';
                $wikiResult += '<div class="wikiDescription" id="wikiDesc-"'+ i +'>'+ $wikiDescription + '</div>';
                $wikiResult += '</section>';

                $('#wikiResults').append($wikiResult);
              }






          },
          error: function (errorMessage) {
            alert(errorMessage);

          }
      });
    }
    else{


      $('#searchError').css('display','block');

    }




      return false;
    });

  $('#wikiResetForm').on('click',function(){

    window.location.reload(true);
  });

});



function handleErr(jqxhr, textStatus, err) {
  alert('fail');
  console.log( textStatus + ", " + err);
  //var responseText = jQuery.parseJSON(jqxhr.responseText);

}

function processWiki(data) {

  alert('success');

}

/*
$(document).ready(function(){

    $.ajax({
        type: "GET",
        url: $searchWiki + 'phoenix&suns',
        contentType: "application/json; charset=utf-8",
        async: false,
        dataType: "jsonp",
        success: function (data, textStatus, jqXHR) {
            console.log(data);
        },
        error: function (errorMessage) {
        }
    });
});
*/


function wikiAPI(data){
  alert('in API call');


}

function drawFCCBanner(){


    var theCanvas = document.getElementById('FCCBanner');
    if (theCanvas && theCanvas.getContext) {
      var ctx = theCanvas.getContext("2d");
      if (ctx) {

        // set up our basic shadow settings
        ctx.shadowColor = "#000000";
        ctx.shadowOffsetX = 10;
        ctx.shadowOffsetY = 10;
        ctx.shadowBlur = 10;


        var theString = "Free Code Camp";
        var theString2 = "Wikipedia Viewer";
        // draw the string with some font information
        // change the shadow settings to be a bit lighter
        ctx.fillStyle = "green";
        ctx.shadowColor = "rgba(0,100,100,0.5)";
        ctx.shadowOffsetX = -15;
        ctx.shadowOffsetY = -15;
        ctx.shadowBlur = 5;
        ctx.font = "25pt Georgia";
        ctx.fillText(theString, 25,50);

        ctx.font = "20pt Georgia";
        ctx.fillText(theString2, 40,110);

      }
    }


}
