
function translatePigLatin(str) {
  
  var vowels = "aeiou";

  var newStr = str;
  var appendStr = "way";
  var vowelIndex = -1;

  //find the position of the first vowel
  for(var i = 0; i < newStr.length; i++){
  	if( vowels.indexOf(newStr[i]) >= 0){
  		vowelIndex = i;
  		break;
  	}

  } 
 
  if (vowelIndex > -1){
 	if (vowelIndex === 0){
 		newStr += appendStr;
 	}else{
 		
 		newStr = newStr.slice(vowelIndex) + newStr.substr(0,vowelIndex) + appendStr.slice(1);
 	}

  }
  

  return newStr;
}

console.log(translatePigLatin("eight"));
