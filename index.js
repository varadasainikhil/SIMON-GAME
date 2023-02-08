buttonColors = ["red","blue","green","yellow"];
level=0;
gamePattern = [];
userClickPattern =[];
started = false;
$("h2").hidden;

$(document).on("keypress",function (event) {
    if (started != true) {
        $("h1").text("Level "+level);
        nextSequence();
        started = true;
    }
});

$("button").on("click",function () {
   var userChosenColor = $(this).attr("id");
   userClickPattern.push(userChosenColor);
   playSound(userChosenColor);
   animatePress(userChosenColor);
   checkAnswer(userClickPattern.length-1);
});

function nextSequence(){
    userClickPattern =[];
    level++;
    $("h1").text("Level "+level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    animatePress(randomChosenColor);
    playSound(randomChosenColor);
    
}

function playSound(color) {
    var audio = new Audio("sounds/"+color+".mp3");
    audio.play();    
}

function animatePress(color) {
    $("#"+color).addClass("pressed");
    setTimeout(function () {
        $("#"+color).removeClass("pressed")
    },100);
    $("#"+color).fadeOut(100).fadeIn(100);
}

function wrongAnimation() {
    $("body").addClass("wrong");
    setTimeout(function () {
        $("body").removeClass("wrong")
    },100);
}

function checkAnswer(level) {
    if (userClickPattern[level] === gamePattern[level]) { //=== means strict equality
        console.log("success");

        if (userClickPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            },1000);
        }
    }
    else{
        playSound("sounds/wrong.mp3");
        wrongAnimation();
        $("h1").text("Game Over, Better Luck next Time");
        console.log("failure");
        $("h2").text("Your Score is : "+level);
        $("h2").show;
        startOver();
    }
    
}

function startOver() {
    level = 0;
    started = false;
    gamePattern=[];
}