
function fearNotLetter(str) {
 for(var i = 0; i < str.length; i++){
 	if( i < (str.length - 1)){

 
 		if((str.charCodeAt(i+1) - str.charCodeAt(i)) != 1){

 			return String.fromCharCode( str.charCodeAt(i) + 1);
 		}
 	}
 }


  return undefined;
}

console.log(fearNotLetter("abce"));
console.log(fearNotLetter("abcdefghjklmno"));
console.log(fearNotLetter("bcd"));
console.log(fearNotLetter("yz"));