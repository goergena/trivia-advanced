$(document).ready(function () {

    $("#submit-button").on("click", function () {
        timedGame.stop();
    });

    $("#start-button").on("click", function () {
        timedGame.start();
        $("#area1").empty();
        $("#area2").empty();
        displayQuestion(i);
    });

    $(".btn-ans").on("click", function () {
        timedGame.stop();
        if ($(this).val() === 1) {
            console.log("correct");
            correctAnswers++;
            unanswered--;
        } else if ($(this).val() === 0) {
            console.log("you did not select the correct dude");
            incorrectAnswers++;
            unanswered--;
        }


    });

    var correctAnswers = 0;
    var incorrectAnswers = 0;
    var unanswered = 10;


    var questions = [
         {
            question: "How many bedrooms are in the Dursley's house?",
            answer1: {
                answer: "3",
                val: 0
            },
            answer2: {
                answer: "4",
                val: 1
            }

        },
         {
            question: "How much gold do Fred and George bet at the Quidditch World Cup?",
            answer1: {
                answer: "37 Galleons",
                val: 1
            },
            answer2: {
                answer: "39 Galleons",
                val: 0
            }

        },
         {
            question: "Hermione founds an organization called the 'House Elf Liberation Front'",
            answer1: {
                answer: "true",
                val: 0
            },
            answer2: {
                answer: "false",
                val: 1
            }

        },
         {
            question: "WHere is the Riddle house?",
            answer1: {
                answer: "Little Whinging",
                val: 0
            },
            answer2: {
                answer: "Little Hangleton",
                val: 1
            }

        },
         {
            question: "Which is the fake house elf?",
            answer1: {
                answer: "Pokey",
                val: 0
            },
            answer2: {
                answer: "Hokey",
                val: 1
            }

        },
        {
            question: "How many challenges protect the Sorcerer's Stone??",
            answer1: {
                answer: "6",
                val: 0
            },
            answer2: {
                answer: "7",
                val: 1
            }

        },
         {
            question: "Which is a statue in Hogwarts?",
            answer1: {
                answer: "Gregory the Smarmy",
                val: 1
            },
            answer2: {
                answer: "Urg the Unclean",
                val: 0
            }

        },

    ]
var i = 0;

function displayQuestion(x) {
    var display = $("<div>");
    var displayQuestion = $("<h4>");
    var displayAns1 = $("<button>");
    displayAns1.addClass("btn btn-outline-primary btn-ans");
    var displayAns2 = $("<button>");
    displayAns2.addClass("btn btn-outline-primary btn-ans");
    displayQuestion.text(questions[i].question);
    displayAns1.text(questions[i].answer1.answer);
    displayAns1.val(questions[i].val);
    displayAns2.text(questions[i].answer2.answer);
    displayAns2.val(questions[i].answer2.val);
    display.append(displayQuestion, displayAns1, displayAns2);
    $("#area1").append(display);

}



    var intervalId;
    var clockRunning = false;
    var timedGame = {
        //sets time to 300 seconds
        time: 300,
        //starts game
        start: function () {
            //starts countdown
            if (!clockRunning) {
                intervalId = setInterval(timedGame.countdown, 1000);
                clockRunning = true;
            }
        },
        //when the game stops: (1) the timer stops, (2) results are calculated and (3) results are displayed
        stop: function () {
            clearInterval(intervalId);
            clockRunning = false;
           // calculateResults();
           // displayThe.results();
        },

        countdown: function () {
            //decrements time down
            timedGame.time--;
            //converts current time to minutes and displays it
            var currentTime = timedGame.timeConverter(timedGame.time);
            $("#timer").text(currentTime);
            //countdown stops when time is out
            if (timedGame.time === 0) {
                timedGame.stop();
            }
        },

        timeConverter: function (t) {
            //it's convenient to have this function available to other timers 

            var minutes = Math.floor(t / 60);
            var seconds = t - (minutes * 60);

            if (seconds < 10) {
                seconds = "0" + seconds;
            }
            if (minutes === 0) {
                minutes = "0";
            }
            return minutes + ":" + seconds;
        }
    };

    /*


    function calculateResults() {

        correctAnswers += $("input[type=radio][value=correct]:checked").length;
        incorrectAnswers += $("input[type=radio][value=option]:checked").length;
        unanswered -= $("input[type=radio]:checked").length;
    };

    var displayThe = {
        questions: function () {
            $("#trivia").removeClass("hidden");
            $("#start-button").addClass("hidden");
        },
        results: function () {
            $("#trivia").empty();
            var resultText =
                "<h2>Correct: " + correctAnswers + " </h2> " +
                "<h2>Incorrect: " + incorrectAnswers + " </h2> " +
                "<h2>Unanswered: " + unanswered + " </h2>";

            $(".jumbotron").html(resultText);
        }
    }; */

});