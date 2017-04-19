//Convert a string to spinal case. Spinal case is all-lowercase-words-joined-by-dashes.

function spinalCase(str) {
  // "It's such a fine line between stupid, and clever."
  // --David St. Hubbins

  // Remove all special characters, include the space character
  var newStr = str.replace(/["*",._()]/g,"");
 
  var arrayStr = [];

  for(var i = 0; i < newStr.length; i++){
      if( i === 0){
      	if(newStr[i] === newStr[i].toUpperCase()){
      		arrayStr[i] = newStr[i].toLowerCase();
      	}else{
      		arrayStr[i] = newStr[i];
      	}
      } else{  // Not first character in string

      	if(newStr[i] === ' '){
      		arrayStr[i] = '-';
      	}else{   // Not a space character
      		if(newStr[i] == newStr[i].toUpperCase()  && newStr[i] !== '-'){
      				// Evaluate the previous character, if it is a '-', then simply update the array
      				if(arrayStr[i-1] === '-'){
      					arrayStr[i] = newStr[i].toLowerCase();
      				}else{
      					arrayStr[i] = '-' + newStr[i].toLowerCase();
      				}	

      				
      			}else{
      				arrayStr[i] = newStr[i];
      			}
      	


      }



      }
  	
  }
 


  //return arrayStr.join("");
  return arrayStr.join("");
}

console.log(spinalCase('This Is Spinal Tap'));
console.log(spinalCase('The_Andy_Griffith_Show'));
console.log(spinalCase('Teletubbies say Eh-oh'));
console.log(spinalCase('AllThe-small Things'));
