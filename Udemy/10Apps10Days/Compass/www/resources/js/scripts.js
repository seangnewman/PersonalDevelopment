var watch;

var cnv;
var cnvWidth = 300;
var cnvHeight = 334;
var curDegrees = 0;
var img;

function init(){
  var options = { frequency : 2000 };

  watch = navigator.compass.watchHeading(success, fail, options);


  cnv = document.getElementById('myCanvas').getContext('2d');
  cnv.canvas.width = cnvWidth;
  cnv.canvas.height = cnvHeight;

  img = new Image();
  img.onload = function(){
    cnv.drawImage(img, 0, 0);
  }
  img.src = './resources/images/compass.jpg';

}

function success(compass){
  document.getElementById('compassNumerical').innerHTML = Math.round(compass.magneticHeading) + '&deg;';

  var degreeMove = curDegrees - compass.magneticHeading;
  curDegrees = compass.magneticHeading;

  cnv.clearRect(0,0,cnvWidth, cnvHeight);
  cnv.translate( cnvWidth/2, cnvHeight/2);
  cnv.rotate(degreeMove * Math.PI/180);
  cnv.translate( -cnvWidth/2, -cnvHeight/2);
  cnv.drawImage(img,  0, 0);

}

function fail(error){
  alert('Error :' + error.code);
}



window.onload = function(){

  document.addEventListener("deviceready", onDeviceReady, false);
  //init();

}

function onDeviceReady() {

     init();
}
