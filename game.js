//------------------------------------------
//------------------------------------------
//VARIABLES
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;
var answerCorrect = false;
var currentLevel = 0;

//------------------------------------------
//------------------------------------------
//CODE ACTIONS

//start the game

$(document).keydown(function() {

  if (started === false) {
    started = true;
    $("#level-title").html("Level " + level);
    setTimeout(function() {
      nextSequence();
    }, 500);
  }
})

//checking for user CLICKS
//append clicked colors from user into an array + play sound
$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  animatePress(userChosenColour);
  var answerCorrect = checkAnswer(currentLevel);

  if(answerCorrect){
    var finished = checkIfSequenceFinished();
    if (finished) {
      setTimeout(function() {
        nextSequence();
      }, 1000)
    } //else wait for more button clicks!
    currentLevel++;
  } else{
    startOver();
  }

});







//------------------------------------------
//------------------------------------------
//FUNCTIONS

function startOver(){
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  started = false;
  answerCorrect = false;
  currentLevel = 0;
}

function checkIfSequenceFinished() {
  //check if two arrays are equal
  if (gamePattern.length === userClickedPattern.length) {
    return true;
  } else false;
}
// FIXME:
function checkAnswer(currentLevel) {

  //FIX THIS check for continual correctness, from start
  //game pattern will always have at least one element inside
  if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
    playSound(userClickedPattern[currentLevel]);
    return true;
  } else{
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 100);
    $("h1").html("Game Over, Press Any Key to Restart");
    return false;
  }
  //check that user has finished sequence
}

//'flash' the button press grey when clicked
function animatePress(currentColour) {
  $("." + currentColour).addClass("pressed");
  setTimeout(function() {
    $("." + currentColour).removeClass("pressed")
  }, 100);
}


function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//supplies a sound and flash of the next button in the sequence
function nextSequence() {

  //reset user choice for this round
  currentLevel = 0;
  userClickedPattern = [];
  level++;

  //update level header
  $("#level-title").html("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);

  //play sound of selected color
  playSound(randomChosenColour);

}



//detect when any of the buttons are clicked
