$(document).ready(function () {

    $("#start-button").on("click", function () {
        timedGame.start();
    });

    $(document).on("click", ".ans", function () {
        setTimeout(nextQuestion, 1000 * 3);
        timedGame.stop();
        var input = $(this).val();
        if (input === "1") {
            correctAnswers++;
            unanswered--;
            $("#area1").text("Correct!");
        } else {
            incorrectAnswers++;
            unanswered--;
            $("#area1").text("Nope!");
        }

    });

    function nextQuestion() {
        i++;
        console.log(i);
        if (i===7) {
            gameOver();
        } else {
            timedGame.start();
        }

    };

    function gameOver() {
        $("#area1").empty();
        $("#area2").empty();
        var a = $("<div>");
        var b = $("<div>");
        var c = $("<div>");
        a.text("Correct: " + correctAnswers);
        b.text("Incorrect: " + incorrectAnswers);
        c.text("Unanswered: " + unanswered);
        $("#area1").text("Game over!");
        $("#area2").append(a, b, c);

    }

    var correctAnswers = 0;
    var incorrectAnswers = 0;
    var unanswered = 7;


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
            },
            response: "There are 4 bedrooms in the Dursley house!"

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
            },
            response: "They bet 37 Galleons, x sickles and y knuts!"

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
            },
            response: "It was definitely called S.P.E.W."

        },
         {
            question: "Where is the Riddle house?",
            answer1: {
                answer: "Little Whinging",
                val: 0
            },
            answer2: {
                answer: "Little Hangleton",
                val: 1
            },
            response: "The Riddle House is in Little Hangleton!"

        },
         {
            question: "Which is the fake house elf?",
            answer1: {
                answer: "Pokey",
                val: 1
            },
            answer2: {
                answer: "Hokey",
                val: 0
            },
            response: "Hokey the House Elf served Hepzibah Smith!"

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
            }, 
            response: "7! Don't forget about Quirrel's troll!"

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
            },
            response: "Gregory the Smarmy guards the boys prefects bathroom!"

        },

    ]
var i = 0;

function displayQuestion(x) {
    var display = $("<div>");
    var displayQuestion = $("<h4>");
    var displayAns1 = $("<button>");
    displayAns1.addClass("btn btn-outline-primary ans");
    var displayAns2 = $("<button>");
    displayAns2.addClass("btn btn-outline-primary ans");
    displayQuestion.text(questions[i].question);
    displayAns1.text(questions[i].answer1.answer);
    displayAns1.val(questions[i].answer1.val);
    displayAns2.text(questions[i].answer2.answer);
    displayAns2.val(questions[i].answer2.val);
    display.append(displayQuestion, displayAns1, displayAns2);
    $("#area1").append(display);

}
//yo Ali! put those answers in an array inside  your object
//inside your array so that you can loop through like a baller 
//and add the button, class, answer, val!
//great idea! just like, not right now.

    var time = 15;
    var intervalId;
    var clockRunning = false;
    var timedGame = {
        //sets time to 30 seconds
       // time: 30,
        //starts game
        start: function () {
            $("#area1").empty();
            $("#area2").empty();
            displayQuestion(i);
            $("#timer").text("15");
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
            $("#area1").empty();
            $("#area2").empty();
            $("#timer").empty();
            $("#area2").text(questions[i].response);
            
           // calculateResults();
           // displayThe.results();
           time= 15;
        },


        countdown: function () {
            //decrements time down
            time--;
            //converts current time to minutes and displays it
            var currentTime = timedGame.timeConverter(time);
            $("#timer").text(currentTime);
            //countdown stops when time is out
            if (time === 0) {
                setTimeout(nextQuestion, 1000 * 3);
                timedGame.stop();
                $("#area1").text("You didn't answer!");
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


});