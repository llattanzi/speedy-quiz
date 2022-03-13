
var quizLength = $(".question").length;

// start quiz button was clicked
$("#start-quiz").click(function() {
    $("#quiz-welcome").hide();
    var questionStart = 1;
    askQuestion(questionStart);
})

var askQuestion = function(questionNum) {
    $("#question-" + questionNum).show();
    console.log($(this))

    $(".answer").click(function() { 
        $("#question-" + questionNum).hide();
        questionNum++;
        if (questionNum <= quizLength) {

            askQuestion(questionNum);
        }
        else {
            $("#done").show();
        }
    });
}

// on submit button click save score to local storage and show high score screen
$("#save-score").click(function(){
    $("#main-content").hide();
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

// show previous screen when go back is clicked
$("#go-back").click(function() {
    $("#high-scores").hide();
    $("#main-content").show();
    $("#header").css("visibility", "visible");
})
