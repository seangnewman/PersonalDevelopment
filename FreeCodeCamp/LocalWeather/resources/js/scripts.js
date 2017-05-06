var $geoLatitude;
var $geoLongitude;
var $appid = '00de164de018150d983d520a81e61b45';


function drawTitle(){
  var theCanvas = document.getElementById("titleCanvas");
  if (theCanvas && theCanvas.getContext) {
					var ctx = theCanvas.getContext("2d");
					if (ctx) {
						var theString = "FreeCodeCamp";
            var theString2 = "Local Weather Demo";
            ctx.fillStyle = "green";

            ctx.font = "24pt Verdana"
          //ctx.textBaseline="middle";
          ctx.fillStyle = "green";
          ctx.strokeStyle = "rgba(0,255,0,0.8)";
          ctx.fillText(theString, 20,50);
          ctx.strokeText(theString, 20,50)

          ctx.font = "18pt Verdana"
          ctx.strokeStyle = "rgba(0,255,0,0.8)";
          ctx.fillText(theString2, 20,100);
          ctx.strokeText(theString2, 20,100)

          ctx.font = "24pt Verdana"
          var textW = ctx.measureText(theString);
          ctx.beginPath();
          ctx.strokeStyle="green";
          ctx.moveTo(20,120);
          ctx.lineTo(textW.width,120);
          ctx.stroke();


  						//ctx.fillText(theString, 70,50);

            //ctx.fillText(theString, 20,20);



					}
}
} // end function



$( function() {

$( ".accordion").accordion();
} );


$(document).ready(function(){

    drawTitle();

  // 1. first we need to get our ip address
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            $geoLatitude =  position.coords.latitude ;
            $geoLongitude =  position.coords.longitude;
            $("p").html("latitude: " + $geoLatitude + "<br>longitude: " +$geoLongitude);
            //var $url = 'http://api.openweathermap.org/data/2.5/forecast?lat='+ $geoLatitude + '&lon=' + $geoLongitude + '&appid=' + $appid;

            var $url = 'http://api.openweathermap.org/data/2.5/weather?lat='+ $geoLatitude.toFixed(6) + '&lon=' + $geoLongitude.toFixed(6) + '&appid=' + $appid;

            //2. Get the local weather using the results from the ip address
              $.getJSON($url)
               .done(updateWeatherContainer)
               .fail(handleErr);
      });



  //      $.getJSON("http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?")
  //       .done(updateQuoteContainer)
  //       .fail(handleErr);
};



  //3. update the DOM with results





   $('#forecastContainer').on('click','.dailyForcastContainer', function(){


       var theTable = $(this).find('table')

       if(theTable.is(':hidden')){
              theTable.slideDown();
            }else{
              theTable.slideUp();
            }


       } );





});
function convertKelvinToFahrenheit(kelvin){
   return (kelvin * (9/5) - 459.67).toFixed(1);
}

function convertKelvinToCelsius(kelvin){
   return (kelvin -273.15).toFixed(1);
}

function convertMPStoMPH(mps){
   return (mps / 0.44704).toFixed(1) + ' mph';
}
function updateWeatherContainer(response) {


  var theCity = response.name;

  var theCountry = response.sys.country;
  var theDate = timeConverter(response.dt, theCountry);
  var theWeather = response.weather[0].main;
  var currentTempFahrenheit = convertKelvinToFahrenheit(response.main.temp) ;
  var currentTempCelsius = convertKelvinToCelsius(response.main.temp) ;
  var forecastTempCelsius = (convertKelvinToFahrenheit(response.main.temp) + 'F/' +  convertKelvinToCelsius(response.main.temp) +'C' );
  var forecastConditions = response.weather[0].main;
  var forecastIcon = response.weather[0].icon;
  var forecastWindSpeed = convertMPStoMPH(response.wind.speed) ;
  var forecastHumidity = response.main.humidity + '%';
/*
    theCity = response.city.name;
    theCountry = response.city.country;
    theDate = timeConverter(response.list[0].dt, response.city.country);
     theWeather = response.list[0].weather[0].main;
    currentTempFahrenheit = convertKelvinToFahrenheit(response.list[0].main.temp) ;
    currentTempCelsius = convertKelvinToCelsius(response.list[0].main.temp) ;
    forecastTempCelsius = (convertKelvinToFahrenheit(response.list[0].main.temp) + 'F/' +  convertKelvinToCelsius(response.list[0].main.temp) +'C' );
    forecastConditions = response.list[0].weather[0].main;
    forecastIcon = response.list[0].weather[0].icon;
    forecastWindSpeed = convertMPStoMPH(response.list[0].wind.speed) ;
    forecastHumidity = response.list[0].main.humidity + '%';
*/
   $('#city').text(theCity + ", " + theCountry);
   //$('#country').text(currentTempFahrenheit + " F/" + currentTempCelsius + " C");
    $('.currentDate').text(getCurrentDate());
    $('.currentTime').text(getCurrentTime());
    $('.currentHour').text(forecastTime(response.dt,));
    $('#temp-current').text(forecastTempCelsius);
    $('#conditions-current').text(forecastConditions);
    $('#currentForecastIcon').attr('src','./resources/images/icons/' + forecastIcon + '.png');
    $('#windCurrent').text(forecastWindSpeed);
    $('#humidityCurrent').text(forecastHumidity);

  //  $('p').text(date);

  // Now let's return the forecast data
   var $url = 'http://api.openweathermap.org/data/2.5/forecast?lat='+ $geoLatitude + '&lon=' + $geoLongitude + '&appid=' + $appid;

   $.getJSON($url)
    .done(updateWeatherForecast)
   .fail(handleErr);

}

function handleErr(jqxhr, textStatus, err) {

  console.log("Request Failed: " + textStatus + ", " + err);
}

function getCurrentDate(){
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  var monthIndex = today.getMonth();
  var month = months[monthIndex];
  var day = today.getDate() < 10 ? '0' + today.getDate(): today.getDate();
  return (month + ' ' + day +',' + today.getFullYear());

}

function getCurrentTime(){
  var a = new Date();
  var hour = a.getHours() < 10 ? '0' + a.getHours(): a.getHours();
  var min = a.getMinutes() < 10 ? '0' + a.getMinutes(): a.getMinutes();

  if( hour > 12){
    return ( (hour-12) + ':' + min + ' PM' );
  }else {
    return ( hour + ':' + min  + ' AM');
  }

}

function forecastTime(UNIX_timestamp){
  var a = new Date(UNIX_timestamp * 1000);
  var hour = a.getHours() < 10 ? '0' + a.getHours(): a.getHours();
  var min = a.getMinutes() < 10 ? '0' + a.getMinutes(): a.getMinutes();

  if( hour > 12){
    return ( (hour-12) + ':' + min + ' PM' );
  }else {
    return ( hour + ':' + min  + ' AM');
  }

}


function forecastDate(UNIX_timestamp){
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate() < 10 ? '0' + a.getDate(): a.getDate();


  var time = month  + ' ' + date + ', ' + year ;

  return time;
}



function timeConverter(UNIX_timestamp, country){
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate() < 10 ? '0' + a.getDate(): a.getDate();
  var hour = a.getHours() < 10 ? '0' + a.getHours(): a.getHours();
  var min = a.getMinutes() < 10 ? '0' + a.getMinutes(): a.getMinutes();
  var sec = a.getSeconds() < 10 ? '0' + a.getSeconds(): a.getSeconds();
  if(country === 'US'){
    var time = month  + ' ' + date + ', ' + year + ' ' + hour + ':' + min + ':' + sec ;
  }else{
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
  }

  return time;
}

function updateWeatherForecast(response) {


   var currentDate = forecastDate(response.list[0].dt);
   var theCity = response.city.name;
   var theCountry = response.city.country;
   var dayIndex = 0;
   var theDate;
   var theWeather;
   var currentTempFahrenheit;
   var currentTempCelsius;
   var forecastTempCelsius;
   var forecastConditions;
   var forecastIcon;
   var forecastWindSpeed;
   var forecastHumidity;
   var theTime;




    //theDate = timeConverter(response.list[0].dt, response.city.country);
    theDate = forecastDate(response.list[0].dt);
    theWeather = response.list[0].weather[0].main;
    currentTempFahrenheit = convertKelvinToFahrenheit(response.list[0].main.temp) ;
    currentTempCelsius = convertKelvinToCelsius(response.list[0].main.temp) ;
    forecastTempCelsius = (convertKelvinToFahrenheit(response.list[0].main.temp) + 'F/' +  convertKelvinToCelsius(response.list[0].main.temp) +'C' );
    forecastConditions = response.list[0].weather[0].main;
    forecastIcon = './resources/images/icons/' + response.list[0].weather[0].icon + '.png';
    forecastWindSpeed = convertMPStoMPH(response.list[0].wind.speed) ;
    forecastHumidity = response.list[0].main.humidity + '%';
    theTime = forecastTime(response.list[0].dt);

   /*
    var $theForecastString = '<div class="dailyForcastContainer" id="day-'+ dayIndex +'">' +
                              '<div class="forecastDate" id="forecastDate-' + dayIndex +'">' + theDate + '</div>' +
                                '<div class="dailyConditions">' +
                                  '<div class="generalConditions">' +
                                    '<div class="theHour" id="theHour-' + dayIndex + '"> '+ theTime +'</div>' +
                                  '</div>' +
                                  '<div class="forecastSummary">' +
                                  '<div class="specificConditions">' +
                                  '<div class="specificHeader">' +
                                  '<div class="imageContainer">' +
                                    '<div class="theIcon" id="theIcon-0"><img id="forecastIcon-'+ dayIndex + '" src="'+ forecastIcon +'"></div>' +
                                  '</div>' +
                                    '<div class="temperature" id="temp-' + dayIndex + '"> ' + forecastTempCelsius +' </div>'  +
                                  '</div>' +
                                  '<table>' +
                                    '<tr><td>Condition:</td><td id="conditions-'+ dayIndex + '">' + forecastConditions + '</td></tr>' +
                                    '<tr><td>Wind Speed:</td><td  id="wind-'+ dayIndex +'">' + forecastWindSpeed + '</td></tr>' +
                                    '<tr><td>Humidity:</td><td id="humidity-'+ dayIndex + '">' + forecastHumidity +'</td></tr>' +
                                  '</table>' +
                                '</div>';



   $('#forecastContainer').append($theForecastString);
   */
   var currentDate = 0;
    for(var i = 0 ; i < response.cnt; i++){

      theDate = forecastDate(response.list[i].dt);
      theWeather = response.list[i].weather[0].main;
      currentTempFahrenheit = convertKelvinToFahrenheit(response.list[i].main.temp) ;
      currentTempCelsius = convertKelvinToCelsius(response.list[0].main.temp) ;
      forecastTempCelsius = (convertKelvinToFahrenheit(response.list[i].main.temp) + 'F/' +  convertKelvinToCelsius(response.list[0].main.temp) +'C' );
      forecastConditions = response.list[i].weather[0].main;
      forecastIcon = './resources/images/icons/' + response.list[i].weather[0].icon + '.png';
      forecastWindSpeed = convertMPStoMPH(response.list[i].wind.speed) ;
      forecastHumidity = response.list[i].main.humidity + '%';
      theTime = forecastTime(response.list[i].dt);


      if(forecastDate(response.list[i].dt) === currentDate){


        $theForecastString =

                                    '<div class="dailyConditions">' +
                                      '<div class="generalConditions">' +
                                        '<div class="theHour" id="theHour-' + dayIndex + '">'+ theTime +'</div>' +
                                      '</div>' +
                                      '<div class="forecastSummary">' +
                                      '<div class="specificConditions">' +
                                      '<div class="specificHeader">' +
                                      '<div class="imageContainer">' +
                                        '<div class="theIcon" id="theIcon-0"><img id="forecastIcon-'+ dayIndex + '" src="'+ forecastIcon +'"></div>' +
                                      '</div>' +
                                        '<div class="temperature" id="temp-' + dayIndex + '"> ' + forecastTempCelsius +' </div>'  +
                                      '</div>' +
                                      '<table>' +
                                        '<tr><td>Condition:</td><td id="conditions-'+ dayIndex + '">' + forecastConditions + '</td></tr>' +
                                        '<tr><td>Wind Speed:</td><td  id="wind-'+ dayIndex +'">' + forecastWindSpeed + '</td></tr>' +
                                        '<tr><td>Humidity:</td><td id="humidity-'+ dayIndex + '">' + forecastHumidity +'</td></tr>' +
                                      '</table>' +
                                        '</div>' +
                                    '</div>' +
                                    '</div>';

        var theTable = $('#day-'+ dayIndex).find('table');
        theTable.slideUp();

        $('#day-'+ dayIndex).append($theForecastString);


      }else{

        currentDate = forecastDate(response.list[i].dt);
        dayIndex += 1;

        $theForecastString = '<div class="dailyForcastContainer" id="day-'+ dayIndex +'">' +

                              '<div class="forecastDate" id="forecastDate-' + dayIndex +'">' + theDate + '</div>' +


                                    '<div class="dailyConditions">' +
                                      '<div class="generalConditions">' +
                                        '<div class="theHour" id="theHour-' + dayIndex + '"> '+ theTime +'</div>' +
                                      '</div>' +
                                      '<div class="forecastSummary">' +
                                      '<div class="specificConditions">' +
                                      '<div class="specificHeader">' +
                                      '<div class="imageContainer">' +
                                        '<div class="theIcon" id="theIcon-0"><img id="forecastIcon-'+ dayIndex + '" src="'+ forecastIcon +'"></div>' +
                                      '</div>' +
                                        '<div class="temperature" id="temp-' + dayIndex + '"> ' + forecastTempCelsius +' </div>'  +
                                      '</div>' +
                                      '<table>' +
                                        '<tr><td>Condition:</td><td id="conditions-'+ dayIndex + '">' + forecastConditions + '</td></tr>' +
                                        '<tr><td>Wind Speed:</td><td  id="wind-'+ dayIndex +'">' + forecastWindSpeed + '</td></tr>' +
                                        '<tr><td>Humidity:</td><td id="humidity-'+ dayIndex + '">' + forecastHumidity +'</td></tr>' +
                                      '</table>' +
                                    '</div>' +
                                    '</div>' +
                                      '</div>' +

                                    '</div>';

        var theTable = $('#forecastContainer').find('table');
        theTable.slideUp();
        $('#forecastContainer').append($theForecastString);

      }
    }


    // Elements have been built, display
    $('#mainBanner').css('opacity','0.75');

}
