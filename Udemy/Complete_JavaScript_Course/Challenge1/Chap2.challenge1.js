// Three players
// Each player has height (cm), age * 5
// max value of Height, age * 5 wins
// create a player object, properties height, age, method that returns height, 5 * age
function player(name, age, height){
		this.name = name;
		this.age = age;
		this.height = height;
		this.gameResult = function(){
			return (this.age * 5) + this.height;
		};
	}


var player2 = new player('Kawhi',26,64*2.54);
var player1 = new player('Kevin',29,72*2.54);
var player3 = new player('Lebron',31,68*2.54);

var gameWinner;

if(player1.gameResult() === player2.gameResult() && player1.gameResult === player3.gameResult()){
	console.log('There is no winner between ' + player1.name + ", " + player2.name + " or " + player3.name);
}else if( (player1.gameResult() === player2.gameResult() && player1.gameResult() > player3.gameResult()) ||
		 (player1.gameResult() === player3.gameResult() && player1.gameResult() > player2.gameResult()) || 
		 (player2.gameResult() === player3.gameResult() && player2.gameResult() > player1.gameResult()) ){
	console.log('There is no winner, game ends in tie');

}else if (player1.gameResult() > player2.gameResult() && player1.gameResult() > player3.gameResult()){
	console.log(player1.name + ' has won the game, with a high score of '+ player1.gameResult() +'!');
}else if (player2.gameResult() > player1.gameResult() && player2.gameResult() > player3.gameResult()){
	console.log(player2.name + ' has won the game, with a high score of '+ player2.gameResult() +'!');
}else{
	console.log(player3.name + ' has won the game, with a high score of '+ player3.gameResult() +'!');
}






