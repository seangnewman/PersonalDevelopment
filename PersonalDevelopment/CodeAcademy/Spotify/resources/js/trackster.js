var Trackster = {};

$(document).ready(function() {
  $( ".searchbutton" ).click(function() {
  //alert( "Handler for .click() called." );
  //alert( $('#srch-term').val());
    $('.songData').empty();
  Trackster.searchTracksByTitle($('#srch-term').val());

});

$('#srch-term').keypress(function(e){
       if(e.which == 13){//Enter key pressed
           $('.searchbutton').click();//Trigger search button click event
       }
   });


}); // End of Document Ready



/*
  Given an array of track data, create the HTML for a Bootstrap row for each.
  Append each "row" to the container in the body to display all tracks.
*/
Trackster.renderTracks = function(tracks) {


  var durationMin = Math.floor(tracks[5] / (1000 * 60));
  var durationSec = (tracks[5] % (1000 * 60)) * 60;

  var rowDefinition = '<div class="rowContainer">';
  var playIconDef = '\<div class="col-md-1" id="playIcon"><a href="' + tracks[6] + '"><li class="fa fa-play-circle-o fa-2x"></li></a></div>';
  var trackNoDef = '<div class="col-md-1" id="trackNoData">' + tracks[0] + '</div>';
  var songTitleDef ='<div class="col-md-3" id="songTitleData">' + tracks[1] + '</div>';
  var artistDef = '<div class="col-md-2" id="artistData">' + tracks[2] + '</div>';
  var albumDef = '<div class="col-md-2" id="albumData">' + tracks[3] + '</div>';
  var popularityDef = '<div class="col-md-2" id="popularitytData">' + tracks[4] + '</div>';
  //var durationDef = '<div class="col-md-1" id="durationData">' + tracks[5] + '</div>';
  var durationDef = '<div class="col-md-1" id="durationData">' + durationMin + ":" + durationSec.toString().substring(0,2) + '</div>';
  var rowDefinitionEnd = '</div>';

  var rowString = rowDefinition +  playIconDef + trackNoDef + songTitleDef + artistDef + albumDef + popularityDef + durationDef + rowDefinitionEnd;

  $('.songData').append(rowString);
};

/*
  Given a search term as a string, query the Spotify API.
  Render the tracks given in the API query response.
*/
Trackster.searchTracksByTitle = function(title) {

  $.ajax({
     url: 'https://api.spotify.com/v1/search?type=track&q=' + title,
      dataType: "json",
     error: function() {
        alert("an error has occurred");
     },

     success: function(data) {
        for(var i=0; i< data.tracks.items.length; i++){
        // Load the retrieved data into an array
        var trackArray= [data.tracks.items[i].track_number
                        ,data.tracks.items[i].name
                        ,data.tracks.items[i].artists[0].name
                        ,data.tracks.items[i].album.name
                        ,data.tracks.items[i].popularity
                        ,data.tracks.items[i].duration_ms
                        ,data.tracks.items[i].preview_url
                      ];

        //Pass the array data to the rendering function
        Trackster.renderTracks(trackArray);
      }

     },

  });
};
