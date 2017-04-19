function pairElement(str) {

	var dnaStr = str.split('');
	var dnaMap = {'A':'T', 'T':'A', 'C':'G', 'G':'C'}	;
	
    var dnaPairs = [];

   

	for (var i = 0; i < dnaStr.length; i++) {
		dnaPairs[i] = [dnaStr[i], dnaMap[dnaStr[i]]];
		
		}
	
  
  return dnaPairs;
}

console.log(pairElement("GCG"));
console.log(pairElement("TTGAG"));
console.log(pairElement("CTCTA"));