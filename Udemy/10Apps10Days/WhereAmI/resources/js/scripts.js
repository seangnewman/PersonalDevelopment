var options;

window.onload = function(){
  //document.addEventListener('deviceready', init, false);
  init()
}

function init(){
  document.getElementById('btnLocation').style.display = 'block';
  options = {maximumAge : 3000, timeout : 5000, enableHighAccuracy : true};
}

function getLocation(){
  navigator.geolocation.getCurrentPosition(success, failure, options);
}

function success(position){
  var latitude = position.coords.latitude;
  var long = position.coords.longitude;

  var out = '<strong>Latitude:</strong>' + latitude;
  out += '<br/><strong>Longitude:</strong>' + long;

  document.getElementById('result').innerHTML = out;

  var mapOptions = {
    center : { lat:latitude, lng: long},
    scrollwheel: false,
    zoom: 15
  };

  alert(mapOptions.center.lat);
    alert(mapOptions.center.lng);

  var map = new google.maps.Map(document.getElementById('mapCanvas'), mapOptions);
  alert(map);



}

function failure(message){
  alert('Error:' + message.message);
}

function clearScreen(){
  document.getElementById('map-canvas').innerHTML = '';
  document.getElementById('map-canvas').style.backgroundColor = 'white';
  document.getElementById('result').innerHTML = '';
}

function initMap() {
        // Create a map object and specify the DOM element for display.
        alert('initialCall');
        var map = new google.maps.Map(document.getElementById('mapCanvas'), {
          center: {lat: -34.397, lng: 150.644},
          scrollwheel: false,
          zoom: 8
        });
      }
