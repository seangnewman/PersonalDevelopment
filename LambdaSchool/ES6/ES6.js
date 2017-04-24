//var me = 'LambdaSchool';
//var you = 'Student';
//var numberOfCatsIOwn = 0;

let me = 'LambdaSchool';
let you = 'Student';
let numberOfCatsIOwn = 0;

console.log(me);
console.log(you);
console.log(numberOfCatsIOwn);


/*
function buyCat() {
  numberOfCatsIOwn++;
  console.log('I now own ' + numberOfCatsIOwn + ' cats!');
}
*/
let buyCat = ()=>{
  numberOfCatsIOwn++;
  console.log('I now own ' + numberOfCatsIOwn + ' cats!');

};

buyCat();

let favoriteBooks = [
  'Captain Underpants',
  'Magic Treehouse',
  'Brown Bear, Brown Bear, What Do You See?',
  'Slaughterhouse 5',
];
/*
var likesCaptainUnderpants = function(bookList) {
  var yes = false;
  bookList.forEach(function(book) {
    if (book === 'Captain Underpants') yes = true;
  });
  return yes;
};
*/

var likesCaptainUnderpants = (bookList) => {
  let yes = false;
  bookList.forEach(function(book) {
    if (book === 'Captain Underpants') yes = true;
  });
  return yes;
}
 

let result = likesCaptainUnderpants(favoriteBooks);
console.log(result);
/*
var sumInput = function() {
  var total = 0;
  for (var i = 0; i < arguments.length; i++) {
    total += arguments[i];
  }
  return total;
}
*/

let sumInput = (...arguments) =>{
 let total = 0;
  for (let i = 0; i < arguments.length; i++) {
    total += arguments[i];
  }
  return total; 
}


let sum = sumInput(1, 2, 3, 4, 5);

console.log(sum);


/*
var add = function(x, x) {
  return x + x;
}
*/

var add = (x, y) => {
  return x + y;
}


let sum2 = add(5, 6);
console.log(sum2);
