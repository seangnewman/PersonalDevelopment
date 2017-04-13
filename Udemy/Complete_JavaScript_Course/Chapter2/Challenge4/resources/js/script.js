/* Function constructor
   Build a function constructor called Question to describe a question. A question should include:
   a) question itself
   b) the answers from which the player can choose the correct one (choose an adequate data structure here, array, object, etc.)
  c) correct answer (I would use a number for this)
*/


(function (){

function Question( question, answer, correctAnswer){
     this.question = question;
      this.answer = answer;
      this.correctAnswer = correctAnswer;
};

Question.prototype.returnQuestion = function(){
  console.log(this.question);
};


Question.prototype.returnAnswers = function(){
    this.answer.foreach(function(value){
        console.log(value);
      });

};

Question.prototype.checkCorrectAnswer  = function(answer){


   if( answer === this.correctAnswer){
     console.log("Sweet, keep truckin'!");
     return 1;
   }else{
     console.log("Try harder,  you can do it.");
     return 0;
   }
};


/*
2. Create a couple of questions using the constructor
*/
var Question1 = new Question("Is your JavaScript proceeding as Expected?",['Yes','No'], 1);
var Question2 = new Question("Are you planniong to pass 70-480 this year?",['Yes','No'], 1);
var Question3 = new Question("Are you planniong to pass 70-483 this year?",['Yes','No'], 1);
var Question4 = new Question("Do you think you will learn Python this year?",['Yes','No'], 0);

/*
3. Store them all inside an array
*/


/*
4. Select one random question and log it on the console, together with the possible answers (each question should have a number) (Hint: write a method for the Question objects for this task).
*/
var arrayOfQuestions = [Question1, Question2, Question3, Question4];
var index = Math.floor(Math.random() * arrayOfQuestions.length);

//console.log(arrayOfQuestions[index]);


//arrayOfQuestions[index].returnQuestion();
//var getAnswer = parseInt(prompt("Please select correct answer to question :"));

//arrayOfQuestions[index].checkCorrectAnswer(getAnswer);


/*
8. After you display the result, display the next random question, so that the game never ends (Hint: write a function for this and call it right after displaying the result)


9. Be careful: after Task 8, the game literally never ends. So include the option to quit the game if the user writes 'exit' instead of the answer. In this case, DON'T call the function from task 8.
*/
var response;


/*
10. Track the user's score to make the game more fun! So each time an answer is correct, add 1 point to the score (Hint: I'm going to use the power of closures for this, but you don't have to, just do this with the tools you feel more comfortable at this point).
*/
var userScore = 0;


function randomQuestions(){
  do{

    index = Math.floor(Math.random() * arrayOfQuestions.length);
    console.log(arrayOfQuestions[index]);
    arrayOfQuestions[index].returnQuestion();
    response = prompt("Please select correct answer to question :");
    if(response !== 'exit'){
      var getAnswer = parseInt(response);
      userScore += arrayOfQuestions[index].checkCorrectAnswer(getAnswer);
    }else{
      console.log("No more questions!");
    }

  }while(response !== 'exit')
}

randomQuestions();

console.log('Your final score = ' + userScore)



})();
