var buttonSequence = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var gameStarted = false;

//Audio files
var blueAudio = new Audio('sounds/blue.mp3');
var greenAudio = new Audio('sounds/green.mp3');
var redAudio = new Audio('sounds/red.mp3');
var yellowAudio = new Audio('sounds/yellow.mp3');
var wrongAudio = new Audio('sounds/wrong.mp3'); 



$(".btn").click(function (e) { 
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);   
    playAudioAndAnimate(userChosenColor);

    checkAnswer(userClickedPattern.length - 1);
                   
});

$(document).keydown(function (e) { 
    if (gameStarted === false) {
        gameStarted = true;
        $("#level-title").html("Level " + level);
        nextSequence();        
    }        
});

function checkAnswer(currentlevel) {
    if (userClickedPattern[currentlevel] === gamePattern[currentlevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            //user is correct so far so do nothing.
            setTimeout(function(){ nextSequence(); }, 1000); 
        }        
    }
    else {
        $("body").addClass("game-over");
        $("#level-title").html("Game Over, Press Any Key to Restart");
        playAudioAndAnimate("wrong");

        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);

        startOver();
        

    }
}

function playAudioAndAnimate(color) {
    switch (color) {    
        case "blue":
            {
                $("#" + color).fadeOut(100).fadeIn(100);
                animatePress(color);
                blueAudio.play();
                break;
            }
        case "green":
            {
                $("#" + color).fadeOut(100).fadeIn(100);
                animatePress(color);
                greenAudio.play();
                break;
            }
        case "red":
            {
                $("#" + color).fadeOut(100).fadeIn(100);
                animatePress(color);
                redAudio.play();
                break;
            }
        case "yellow":
            {
                $("#" + color).fadeOut(100).fadeIn(100);
                animatePress(color);
                yellowAudio.play();
                break;
            }
        default:
            {                   
                wrongAudio.play();                
                break;
            }
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    gameStarted = false;
}

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);    
    var randomChosenColor = buttonSequence[randomNumber];
    gamePattern.push(randomChosenColor);

    playAudioAndAnimate(randomChosenColor);
    animatePress(randomChosenColor);        
    
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed").delay(100).removeClass("pressed");
}