/////////////////////////////////
// CODING CHALLENGE

/*

Suppose that you're working in a small town administration, and you're in charge of two town elements:
1. Parks
2. Streets

It's a very small town, so right now there are only 3 parks and 4 streets. All parks and streets have a name and a build year.

At an end-of-year meeting, your boss wants a final report with the following:
1. Tree density of each park in the town (forumla: number of trees/park area)
2. Average age of each town's park (forumla: sum of all ages/number of parks)
3. The name of the park that has more than 1000 trees
4. Total and average length of the town's streets
5. Size classification of all streets: tiny/small/normal/big/huge. If the size is unknown, the default is normal

All the report data should be printed to the console.

HINT: Use some of the ES6 features: classes, subclasses, template strings, default parameters, maps, arrow functions, destructuring, etc.

*/


class townElement{
	constructor(name, buildYear){
		this.name = name;
		this.buildYear = buildYear;
	}
}


class trees{
	constructor(name, treeCount){
		this.name = name;
		this.treeCount = treeCount;

	}
}

class parks extends townElement{
	constructor(name, parkNo, buildYear, treeArr, parkArea){
		
		super(name, buildYear);
		
		this.parkArea = parkArea;
		this.maxLimit = this.numTrees >= 1000?  true:  false;
		this.treeArr = treeArr;
		this.numTrees = numTrees(this.treeArr);
		this.counter = parkNo;
		this.age = new Date().getFullYear() - buildYear;
			 
	}
	parkDensity(){
		const pDensity = this.numTrees/this.parkArea;
		console.log( `Park ${this.name} has a tree density of ${Math.round((this.numTrees / this.parkArea) * 100,2)}% per square mile`);
	}
	isParkAtLimitTrees(){
		var atlimit ;
		( this.numTrees >= 1000) ? atlimit =  true: atlimit = false;
		return atlimit;
	}

}



let parkCounter = 0;
let streetCounter = 0;
 
var numTrees = function(treeArray){
			var sum = 0;
			for (var i = 0; i < treeArray.length; i++){
				sum += treeArray[i].treeCount;
			}
			return sum;
		};


//Let's initialize data
const paloVerdeTrees = new trees('Palo Verde', 500);
const mesquiteTrees = new trees('Mesquite', 1200);
const pineTrees = new trees('Pine', 300);
const AfricanSumacTrees = new trees('African Sumac', 150);
const JoshuaTrees = new trees('Joshua Trees', 9000);
const SaguaroTrees = new trees('Saguaro', 13150);



const park1 = [paloVerdeTrees, mesquiteTrees];
const park2 = [pineTrees];
const park3 = [AfricanSumacTrees, SaguaroTrees ];

const townPark = [];
 townPark[parkCounter] = new parks('Estrella Mountain',++parkCounter, 1996, park1, 30000);
 townPark[parkCounter] = new parks('Agua Fria', ++parkCounter, 2008, park2, 6000);
 townPark[parkCounter] = new parks('Goodyear Airfield', ++parkCounter, 2004, park2, 6000);


class streets extends townElement{

	constructor(streetName, streetNumber, streetLength, streetClassification, buildYear){

		super(streetName, buildYear);
		 
		this.streetNumber = streetNumber, 
		this.streetLength = streetLength;
		this.age  = new Date().getFullYear() - buildYear;
		this.streetClassification = streetClassification;
		
	}

	classifyStreet(){
			 
			switch(this.streetClassification){
				case 0:
					return 'dirt road';
				case 1:
					return 'unpaved';
				case 2:
					return 'normal';
				case 3:
					return 'County Highway';
				case 4:
					return 'State Highway';
				case 5:
					return 'InterState';
				default:
					return 'normal';
			}
		}

}

	const townStreets = [];
 	townStreets[streetCounter] = new streets('Bethany Home',++streetCounter,30, 2, 1996);
 	townStreets[streetCounter] = new streets('Red Mountain', ++streetCounter, 60, 5, 2006);
 	townStreets[streetCounter] = new streets('Agua Fria', ++streetCounter, 90, 5, 1996);
 	townStreets[streetCounter] = new streets('Piestewa', ++streetCounter, 120, 4, 2004);

/*
At an end-of-year meeting, your boss wants a final report with the following:
1. Tree density of each park in the town (forumla: number of trees/park area)
2. Average age of each town's park (forumla: sum of all ages/number of parks)
3. The name of the park that has more than 1000 trees
4. Total and average length of the town's streets
5. Size classification of all streets: tiny/small/normal/big/huge. If the size is unknown, the default is normal
*/

//Print the tree denisity of each park 
console.log('......  Reporting for Parks ...........');
let totalAges = 0;
for(var i=0; i < townPark.length; i++ ){

	townPark[i].parkDensity();
	totalAges += townPark[i].age;
	if(townPark[i].isParkAtLimitTrees()){
		console.log(`Town Park ${townPark[i].name} has ${townPark[i].numTrees} Trees`);
	}
}

console.log( `The average age of the park is ${Math.round(totalAges/townPark.length,2)} years`);

console.log('......  Reporting for Streets ...........');
let totalLength = 0;
for(var i =0; i < townStreets.length; i++){
	totalLength += townStreets[i].streetLength;
	

	console.log(`${townStreets[i].name} is ${townStreets[i].classifyStreet()} with a length of ${townStreets[i].streetLength} miles`);
}

console.log( `The average length of the roads is ${Math.round(totalLength/townStreets.length,2)} miles`);