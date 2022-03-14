// highscore variables
var highscores = [];
// define time limit
var maxTime = 750;
var penalty = 10;
// set and display initial timer
var timer = maxTime;
$("#countdown").text("Time: " + timer);
var countdownTimer = [];
// get number of quiz questions
var quizLength = $(".question").length;
var quizComplete = false;

// set countdown interval function
var startTimer = function() {
    countdownTimer = setInterval(function() {
        // stop quiz if timer hits 0
        if (timer <= 0) {
            endQuiz();
        }
        // if quiz has begun, start decrementing timer
        else if ($(".question").is(":visible")) {
            timer--;
            $("#countdown").text("Time: " + timer);
        }
    }, 1000);
}

// start quiz button was clicked
$("#start-quiz").click(function() {
    // hide welcome screen
    $("#quiz-welcome").hide();
    // set countdown
    startTimer();
    var questionStart = 1;
    askQuestion(questionStart);
});

var askQuestion = function(questionNum) {
    var questionId = "#question-" + questionNum;
    
    // show new question
    $(questionId).show();
    console.log(questionNum)
    $(questionId + " .answer").click(function() {
        // show result section for up to 3 sec at start of new question
        $("#result").show();
        // if answer is right, display correct
        if ($(this).hasClass("correct")) {
            $("#result h2").text("Correct!");
        }
        // if answer is wrong, display wrong and subtract 10 points
        else if ($(this).hasClass("wrong")) {
            $("#result h2").text("Wrong!");
            if (timer > penalty) {
                console.log("subtract")
                timer = timer - penalty;
            }
            // if timer would go to or below 0, set to 0 and end quiz 
            else {
                timer = 0;
                endQuiz();
                return
            }
        }
        // hide answered question
        $("#question-" + questionNum).hide();
        questionNum++;
        if (questionNum <= quizLength) {
            askQuestion(questionNum);
        }
        // if all questions are answered, stop timer and show "done" screen
        else {
            endQuiz();
        }
    });
}

var endQuiz = function() {
    clearInterval(countdownTimer);
    quizComplete = true;
    $("#countdown").text("Time: " + timer);
    $(".question").hide();
    $("#result").hide();
    $("#done").show();
    // display timer as final score
    $("#final-score").text("Your final score is " + timer);
}

// on submit button click save score to local storage and show high score screen
// since quiz was completed, change visibilty settings so "Go Back" on highscore screen
// will reset quiz and return to welcome screen 
$("#save-score").click(function(){
    // save score to local storage with initials
    var initials = $("input[name=initials]").val();
    getHighscores();
    highscores.push(initials + " - " + timer);
    localStorage.setItem("highscoreList", JSON.stringify(highscores));
    $("#done").hide();
    $("#header").css("visibility", "hidden");
    highscoreScreen();
})

// "View high scores" in header is clicked
// user can only switch to highscore screen when not on quiz question screens
$("#view-score").on("click", function() {
    if (!$(".question").is(":visible")) {
        $("#header").css("visibility", "hidden");
        $("#main-content").hide();
        highscoreScreen();
    }
})

// show previous screen when go back is clicked or if quiz was completed, return to welcome screen and reset
$("#go-back").click(function() {
    if (quizComplete) {
        location.reload();
    }
    else {
    $("#high-scores").hide();
    $("#main-content").show();
    $("#header").css("visibility", "visible");
    }
})

// get highscore from local storage, if none, create highscores variable
var getHighscores = function() {
    if (localStorage.getItem('highscoreList')) {
        highscores = JSON.parse(localStorage.getItem('highscoreList'));
    }
};

// build highscores screen
var highscoreScreen = function() {
    $("#high-scores").show();
    getHighscores();
    var scoreList = $("ol.score");
    $.each(highscores, function(i) {
        $('<li/>')
            .text(highscores[i])
            .appendTo(scoreList);
    })
}

// clear highscores button clicked
$("#clear-score").click(function() {
    localStorage.clear();
    highscores = [];
    $(".score li").remove();
})