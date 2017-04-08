
 function generateCardValues() {

var unplacedMatchCardArray = [];          // Array of randomly ordered cards
  var randomlyMatchedCardArray=[];          // Array to hold each card value twice
  var matchCardArray = [1,2,3,4,5,6,7,8];   // Valid Card Values

  //Write a loop to iterate through each card value, 1 through 8.
  // Place each card value into the unplaced Card array twice
  for (var i = 0; i < 8 ; i++){
     unplacedMatchCardArray.push(matchCardArray[i]);
     unplacedMatchCardArray.push(matchCardArray[i]);
  }

// Randomly placed each value in the random array, removing the value from the unplaced
//array an into  the random array.

 while(unplacedMatchCardArray.length > 0){
    var index = Math.floor(Math.random() * unplacedMatchCardArray.length );
    randomlyMatchedCardArray.push(unplacedMatchCardArray[index]);
    unplacedMatchCardArray.splice(index, 1);

 };

 return randomlyMatchedCardArray;

};

generateCardValues();




function renderCards(cardValues, $game) {

  var colorArray = ['hsl(25, 85%,65%)','hsl(55, 85%,65%)','hsl(90, 85%,65%)','hsl(160, 85%,65%)','hsl(220, 85%,65%)','hsl(265, 85%,65%)','hsl(310, 85%,65%)','hsl(25, 85%,65%)'];

  $game = '';

  for(var i = 0; i < cardValues.length; i++){
    $card = ('<div class="col-md-3 col-sm-3 >'+
                '<div class="cardContainer">' +
                  '<div class="cardTextContainer">' +
                      '<div class="cardText"></div>' +
                  '</div>' +
                '</div>' +
              '</div>');
    $card.data('row', cardValues[index]);
    $card.data('flipped', false);
    $card.data('color',(cardValues[index] - 1));
    $game.append($card);
  }



};

var thisString;

var cardValues = generateCardValues();
console.log(cardValues);
renderCards(cardValues,thisString);