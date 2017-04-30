


var birthYear = [1962, 1964, 1964,1998,2002];
var ages = [];

//create array indicating age of each birthyear

for( var i = 0; i < birthYear.length; i++){
	ages.push(2017 - birthYear[i]);
}

//For each age indicate if the age is less than or greater than 18
for ( var i = 0; i < ages.length; i++){
 
     var ageIndicator = '' ;
     if( ages[i] < 18){
     	ageIndicator = ' not ';
     }else {
     	ageIndicator = ' ';
     }

    // write the value to the console
	console.log('Person ' + i + ' is' + ageIndicator + 'of age. The persons age is ' +  ages[i]);
} 


// Create a function to determine the ages of the birthyears contained in the array

function areTheyOfAge(age){
   
	var ages=[];
	var isOfAge=[];

	// Create an array of ages
	for( var i = 0; i < age.length; i++){
		ages.push(2017 - age[i]);
		
    }
     
    // create separate array indicating if the age is less than or greater than/equal to 18
	for ( var i = 0; i < ages.length; i++){
        
     	if( ages[i] < 18){
     		isOfAge[i] = false;
     	}else {
     		isOfAge[i] = true;
     	}
  	
} 
  return isOfAge;
}


// Calling the function with two separte arrays of dates
var ourKids   = [1994, 1997, 2010, 1998];
var theirKids = [1984, 1994, 2002, 1996];;

console.log(areTheyOfAge(ourKids));
console.log(areTheyOfAge(theirKids)); 
