// define time limit
var maxTime = 60;
// set and display initial timer
var timer = maxTime;
$("#countdown").text("Time: " + timer);
var countdownTimer = [];
// get number of quiz questions
var quizLength = $(".question").length;

// set countdown interval function
var startTimer = function() {
    countdownTimer = setInterval(function() {
        // stop quiz if timer hits 0
        if (timer <= 0) {
            console.log("timer stop")
            clearInterval(countdownTimer);
            $(".question").hide();
            $("#done").show();
        }
        // if quiz has begun, start decrementing timer
        else if ($(".question").is(":visible")) {
            timer--;
            $("#countdown").text("Time: " + timer);
        }
    }, 1000);
}

// start over
var reset = function() {
    // set and display initial time limit
    var timer = maxTime;
    $("#countdown").text("Time: " + timer);
    // display welcome screen and header
    $("#quiz-welcome").show();
    $("#header").show();
}

// start quiz button was clicked
$("#start-quiz").click(function() {
    // hide welcome screen
    $("#quiz-welcome").hide();
    // set countdown
    startTimer();
    var questionStart = 1;
    askQuestion(questionStart);
})

var askQuestion = function(questionNum) {
    $("#question-" + questionNum).show();

    $(".answer").click(function() { 
        $("#question-" + questionNum).hide();
        questionNum++;
        if (questionNum <= quizLength) {
            askQuestion(questionNum);
        }
        // if all questions are answered, stop timer and show "done" screen
        else {
            clearInterval(countdownTimer);
            $("#done").show();
        }
    });
}

// on submit button click save score to local storage and show high score screen
// since quiz was completed, change visibilty settings so "Go Back" on highscore screen
// will reset quiz and return to welcome screen 
$("#save-score").click(function(){
    // parent element must be hidden first so switch on welcome screen is not seen yet
    $("#main-content").hide();
    $("#done").hide();
    reset();
    $("#header").css("visibility", "hidden");
    $("#high-scores").show();
})

// "View high scores" in header is clicked
// user can only switch to highscore screen when not on quiz question screens
$("#view-score").on("click", function() {
    if (!$(".question").is(":visible")) {
        $("#header").css("visibility", "hidden");
        $("#main-content").hide();
        $("#high-scores").show();
    }
})

// show previous screen when go back is clicked or if quiz was completed, return to welcome screen and reset
$("#go-back").click(function() {
    $("#high-scores").hide();
    $("#main-content").show();
    $("#header").css("visibility", "visible");
})
