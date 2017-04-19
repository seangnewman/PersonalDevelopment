function uniteUnique(arr1) {

 var args = [].slice.call(arguments);


 var unitedArray = [];
 var merged = [].concat.apply([], args);



 for(var i = 0; i< merged.length; i++){
	  if(  unitedArray.length === 0  || unitedArray.indexOf(merged[i]) == -1 ){
	     unitedArray.push(merged[i]);
	  }
}

  return unitedArray;

}

console.log(uniteUnique([1, 3, 2], [5, 2, 1, 4], [2, 1]));
