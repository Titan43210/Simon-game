var buttonColours=["red", "blue", "green", "yellow"];
var gamePattern=[];
var userClickedPattern=[];
var level=0;
var newgame=false;


$(document).keydown(function(){
    if(level==0||newgame)
    nextSequence();
});

function nextSequence()
{   newgame=false;  
    $("h1").text("Level "+level);
    var randomNumber=(Math.floor(Math.random()*4));
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    var aud=new Audio("sounds/"+randomChosenColour+".mp3");
    aud.play();
    level++;
}

function checkAnswer(){
    if(userClickedPattern[userClickedPattern.length-1]==gamePattern[userClickedPattern.length-1])
    return true;
    else
    return false;
}


$(".btn").click(function(){
    var self=$(this);
    var userChosenColour = self.attr("id");
    userClickedPattern.push(userChosenColour);
    var aud=new Audio("sounds/"+userChosenColour+".mp3");
    aud.play();
    self.addClass("pressed");
    setTimeout(function(){
    self.removeClass("pressed");
    },100);
  
    if(checkAnswer())
{
    if(userClickedPattern.length==gamePattern.length)
  {
    userClickedPattern=[];
    setTimeout(function(){
    nextSequence();
    },1000);
  }
}
    else
    {   userClickedPattern=[];
        gamePattern=[];
        newgame=true;
        $("body").addClass("game-over").delay(200).removeClass("game-over");
        $("h1").text("Game Over, Press Any Key to Restart");
        var aud=new Audio("sounds/wrong.mp3");
        aud.play();
        level=0;
    }
}
);



