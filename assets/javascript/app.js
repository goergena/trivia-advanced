$(document).ready(function () {

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
        },  {
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
        }, {
            question: "Hermione founds an organization called the 'House Elf Liberation Front'",
            answerArray: [{
                answer: "true",
                val: 0
            }, {
                answer: "false",
                val: 1
            }, ],
            response: "It was definitely called S.P.E.W."
        },  {
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
        },  {
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
        },  {
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
                val: 1,
            }, ],
            response: "7! Don't forget about Quirrel's troll!"
        },  {
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
        //goes through question array to display question object
        var display = $("<div>");
        var displayQuestion = $("<h3>");
        displayQuestion.text(questions[i].question);
        display.append(displayQuestion);
        //finds answers in question array, displays answers as buttons with values 
        for (j = 0; j < questions[i].answerArray.length; j++) {
            var displayAns = $("<button>");
            displayAns.addClass("btn btn-outline-secondary ans");
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
    // i indicates which question of the questions array we are on.
    var i = 0;
    var time = 20;
    var intervalId;
    var clockRunning = false;

    var timedGame = {
        //starts game
        start: function () {
            $("#area1, #area2").empty();
            displayQuestion(i);
            $("#timer").text("20");
            //starts countdown
            if (!clockRunning) {
                intervalId = setInterval(timedGame.countdown, 1000);
                clockRunning = true;
            }
        },
        //when the game stops: (1) the timer stops, (2) question, timer and answers are cleared 
        //(3)response is displayed for 3 seconds  (4) time reset to 15 seconds
        stop: function () {
            setTimeout(nextQuestion, 1000 * 3);
            clearInterval(intervalId);
            clockRunning = false;
            $("#area1, #area2, #timer").empty();
            $("#area2").html("<h4>" + questions[i].response + "</h4>");
            time = 20;
        },
        countdown: function () {
            //decrements time down
            time--;
            $("#timer").text(time);
            //countdown stops when time is out, 
            //and player receives response + "did not answer" msg.
            if (time === 0) {
                timedGame.stop();
                $("#area1").html("<h3>You didn't answer!</h3>");
            }
        },
    };

    $("#start-button").on("click", function () {
        timedGame.start();
    });

    $(document).on("click", ".ans", function () {
        timedGame.stop();
        unanswered--;
        var input = $(this).val();
        if (input === "1") {
            correctAnswers++;
            $("#area1").html("<h3>Correct!</h3>");
        } else {
            incorrectAnswers++;
            $("#area1").html("<h3>Nope!</h3>");
        }
    });

//var i indicates which question of the questions array we are on. 
//next question is called in a 3-second timeout when the response is displayed.
//each time next question is out, i increments up, so that the next item in the array is called.
    function nextQuestion() {
        i++;
        //when you call all the items in the questions array, the gameover function runs. 
        if (i === totalQuestions) {
            gameOver();
        } else {
            timedGame.start();
        }
    };

    function gameOver() {
        $("#area1, #area2").empty();
        var a = $("<div>");
        var b = $("<div>");
        var c = $("<div>");
        a.text("Correct: " + correctAnswers);
        b.text("Incorrect: " + incorrectAnswers);
        c.text("Unanswered: " + unanswered);
        $("#area1").text("Game over!");
        $("#area2").append(a, b, c);
        generateRestartBtn();
    }
    function generateRestartBtn() {
        var restartBtn = $("<button>");
        restartBtn.attr("id", "restart");
        restartBtn.addClass("btn btn-secondary");
        restartBtn.text("Play again!");
        $("#area2").append(restartBtn);
    };

    $(document).on("click", "#restart", function () {
        i=0;
        correctAnswers = 0;
        incorrectAnswers = 0;
        unanswered = totalQuestions;
        timedGame.start();
    });



});