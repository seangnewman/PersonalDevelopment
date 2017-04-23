var xmlhttp;

window.onload=function(){
  //document.addEventListener("deviceready", init, false);
  init();
}

function init(){

  document.getElementById("btnGetJoke").addEventListener('click', getJoke, false);

  xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = receiveJoke;

}

function getJoke(){
  var url = 'http://api.icndb.com/jokes/random/';
  url += '?firstName=';
  url += document.getElementById('first').value;
  url += '&lastName=';
  url += document.getElementById('last').value;

 

  //xmlhttp.open('GET', 'http://api.icndb.com/jokes/random/',false);
  xmlhttp.open('GET', url,false);
  xmlhttp.send();
}

function receiveJoke(){
  if(xmlhttp.readyState === 4 && xmlhttp.status === 200){
    var json = jQuery.parseJSON(xmlhttp.responseText);
    console.log(json);
    document.getElementById('joke').innerHTML = json.value.joke;
  }
}
