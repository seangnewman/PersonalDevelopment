
function convertHTML(str) {
  // &colon;&rpar;
 
  var newStr =  str.replace(/&/g,'&amp;').replace(/,/g,'&comma;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&apos;');
 
  return newStr;
}

console.log(convertHTML('Stuff in "quotation marks"'));
