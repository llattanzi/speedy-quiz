
var quizLength = $(".question").length;

// initial quiz set-up function, hides everything but the welcome screen
var startQuiz = function() {
    $("#quiz-welcome").show();
    $(".question").hide();
    $("#result").hide();
    $("#done").hide();
    $("#high-scores").hide();
}

// start quiz button was clicked
$("#start-quiz").click(function() {
    $("#quiz-welcome").hide();
    var questionStart = 1;
    askQuestion(questionStart)
    
})

var askQuestion = function(questionNum) {
    $("#question-" + questionNum).show();


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



startQuiz();