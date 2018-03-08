$(document).ready(function () {

    $("#start-button").on("click", function () {
        timedGame.start();
    });

    $(document).on("click", ".ans", function () {
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
        if (i === totalQuestions) {
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

    var questions = [{
            question: "How many bedrooms are in the Dursley's house?",
            answerArray: [{
                answer: "2",
                val: 0
            }, {
                answer: "3",
                val: 0
            }, {
                answer: "4",
                val: 1
            }, ],
            response: "There are 4 bedrooms in the Dursley house!"
        },
        {
            question: "How much gold do Fred and George bet at the Quidditch World Cup?",
            answerArray: [{
                answer: "33 Galleons",
                val: 0
            }, {
                answer: "35 Galleons",
                val: 0
            }, {
                answer: "37 Galleons",
                val: 1
            }, {
                answer: "39 Galleons",
                val: 0
            }, ],
            response: "They bet 37 Galleons, x sickles and y knuts!"
        },
        {
            question: "Hermione founds an organization called the 'House Elf Liberation Front'",
            answerArray: [{
                answer: "true",
                val: 0
            }, {
                answer: "false",
                val: 1
            }, ],
            response: "It was definitely called S.P.E.W."
        },
        {
            question: "Where is the Riddle house?",
            answerArray: [{
                answer: "Little Whinging",
                val: 0
            }, {
                answer: "Little Hangleton",
                val: 1
            }, {
                answer: "Ottery St. Catchpole",
                val: 0
            }],
            response: "The Riddle House is in Little Hangleton!"
        },
        {
            question: "Which is the fake house elf?",
            answerArray: [{
                answer: "Dobby",
                val: 0
            }, {
                answer: "Winky",
                val: 0
            }, {
                answer: "Pokey",
                val: 1
            }, {
                answer: "Hokey",
                val: 0
            }, ],
            response: "Hokey the House Elf served Hepzibah Smith! Pokey ain't real."
        },
        {
            question: "How many challenges protect the Sorcerer's Stone??",
            answerArray: [{
                answer: "4",
                val: 0
            }, {
                answer: "5",
                val: 0
            }, {
                answer: "6",
                val: 0,
            }, {
                answer: "7",
                val: 7
            }, ],
            response: "7! Don't forget about Quirrel's troll!"
        },
        {
            question: "Which is NOT a statue in Hogwarts?",
            answerArray: [{
                answer: "Gregory the Smarmy",
                val: 0
            }, {
                answer: "Urg the Unclean",
                val: 1
            }, {
                answer: "Boris the Bewildered",
                val: 0
            }, {
                answer: "Gunhilda de Gorsemoor",
                val: 0
            }, ],
            response: "Urg the Unclean fought in the Goblin rebellions!"
        },
    ];

    function displayQuestion(x) {
        var display = $("<div>");
        var displayQuestion = $("<h4>");
        displayQuestion.text(questions[i].question);
        display.append(displayQuestion);
        for (j = 0; j < questions[i].answerArray.length; j++) {
            var displayAns = $("<button>");
            displayAns.addClass("btn btn-outline-primary ans");
            displayAns.text(questions[i].answerArray[j].answer);
            displayAns.val(questions[i].answerArray[j].val);
            display.append(displayAns);
        }
        $("#area1").append(display);

    };

    var totalQuestions = questions.length;
    var correctAnswers = 0;
    var incorrectAnswers = 0;
    var unanswered = totalQuestions;
    var i = 0;
    var time = 15;
    var intervalId;
    var clockRunning = false;
    var timedGame = {
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
            setTimeout(nextQuestion, 1000 * 3);
            clearInterval(intervalId);
            clockRunning = false;
            $("#area1").empty();
            $("#area2").empty();
            $("#timer").empty();
            $("#area2").text(questions[i].response);
            time = 15;
        },

        countdown: function () {
            //decrements time down
            time--;
            $("#timer").text(time);
            //countdown stops when time is out
            if (time === 0) {
                timedGame.stop();
                $("#area1").text("You didn't answer!");
            }
        },
    };

});