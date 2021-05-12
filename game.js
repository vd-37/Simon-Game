var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var started = false ;
var level = 0;


$(document).keypress(function(){
   if(!started){
       $('#level-title').text('Level ' + level);
       started = true;
       nextSequence();
   } 
});

$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    active(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
})

function checkAnswer(currentLevel){
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        console.log("success");
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    } 
    else{
        console.log("Wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("#level-title").html("Game Over!!! <br>"  + " You went upto level " + 
        currentLevel + " <br>You were supposed to click " + 
        gamePattern[currentLevel] +". <br> Press Any Key to Restart.");

        startOver();
    }
       
}

function nextSequence() {
  level++;
  userClickedPattern = [];
  $('#level-title').text('Level ' + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function active(actBtn){
    $("#"+ actBtn).addClass("pressed");
    setTimeout(function(){
    $("#"+ actBtn).removeClass("pressed");
    },100);
}
