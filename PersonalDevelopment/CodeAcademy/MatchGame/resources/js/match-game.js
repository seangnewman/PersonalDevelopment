$(document).ready(function() {
// More jQuery code goes in here later


  MatchGame.renderCards(MatchGame.generateCardValues(),'#game');

  $('.col-md-3').click(function(){


    MatchGame.flipCard(this,'#game') ;
  });

  //console.log(MatchGame.renderCards(MatchGame.generateCardValues(),'#game'));
});
var MatchGame = {};

/*
  Sets up a new game after HTML document has loaded.
  Renders a 4x4 board of cards.
*/

/*
  Generates and returns an array of matching card values.
 */

MatchGame.generateCardValues = function () {

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

/*
  Converts card values to jQuery card objects and adds them to the supplied game
  object.
*/

MatchGame.renderCards = function(cardValues, $game) {

  var colorArray = ['hsl(25, 85%,65%)','hsl(55, 85%,65%)','hsl(90, 85%,65%)','hsl(160, 85%,65%)','hsl(220, 85%,65%)','hsl(265, 85%,65%)','hsl(310, 85%,65%)','hsl(25, 85%,65%)'];
  var flippedCards = [];
  $($game).data('.flippedCards', []);

  for(var i = 0; i < cardValues.length; i++){

    //console.log('Inside the renderCards function');
   var $card = $('<div class="col-md-3 col-sm-3 card" >'+
                 '<div class="cardContainer">' +
                    '<div class="cardTextContainer">' +
                      '<div class="cardText"></div>' +
                    '</div>' +
                  '</div>' +
                '</div>');

     $card.data('.row', cardValues[i]);
     $card.data('.flipped', false);
     $card.data('.color',colorArray[(cardValues[i] - 1)]);

     $($game).append($card);
  }

   return $($game);

};

/*
  Flips over a given card and checks to see if two cards are flipped over.
  Updates styles on flipped cards depending whether they are a match or not.
 */

MatchGame.flipCard = function($card, $game) {


  var $cardText = $($card).find('.cardText');
  var $isCardFlipped = $($card).data(".flipped");


  if($isCardFlipped){
    return;
  }else{
    $($card).data('.flipped', true);

    $($card).css('background-color', $($card).data(".color"));
    $($cardText).text($($card).data(".row"));
     $($game).data(".flippedCards").push($card);

     if ($($game).data(".flippedCards").length === 2){

         var $firstCardValue = $($($game).data(".flippedCards")[0]).find('.cardText').text();
         var $secondCardValue = $($($game).data(".flippedCards")[1]).find('.cardText').text();

        if($firstCardValue  === $secondCardValue){

          MatchGame.deactivateCard($($game).data(".flippedCards")[1]);
          MatchGame.deactivateCard($($game).data(".flippedCards")[0]);

          $($game).data(".flippedCards").pop();
          $($game).data(".flippedCards").pop();

        }else{
          setTimeout(function(){
            MatchGame.resetCards($($game).data(".flippedCards")[0]);
            MatchGame.resetCards($($game).data(".flippedCards")[1]);
            $($game).data(".flippedCards").pop();
            $($game).data(".flippedCards").pop();
          }, 500);
        }
     }
  }
};

MatchGame.resetCards = function($card){

   var $cardText = $($card).find('.cardText');
   var $cardFlipped = $($card).data(".flipped");

   $($card).data('.flipped', false);
   $($cardText).text("");

   $($card).css('background-color','rgb(32,64,86)');

};


MatchGame.deactivateCard = function($card){

   var $cardText = $($card).find('.cardText');
   var $cardFlipped = $($card).data(".flipped");

   $($card).css('background-color','rgb(153,153,153)');
   $($card).css('border','4px solid #ffffff');
   $($card).css('color','rgb(204,204,204)');
   $($card).css('border-radius','8px');

};
