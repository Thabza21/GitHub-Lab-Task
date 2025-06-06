$(document).ready(function() {
  
  $("#loading-screen").addClass("active");

  setTimeout(function() {
    $("#loading-screen").removeClass("active").addClass("hide");
    $(".opening").addClass("active").fadeIn(500);
    $(".start").addClass("active").fadeIn(500);
    setTimeout(function() {
      $(".quiz").text("QUIZ").css("opacity", 0).animate({opacity: 1}, 1000);
    }, 500);
  }, 2000);

  $(".options").hide();
  $(".question").hide();
  $(".timer").hide();
  $(".results").hide();
  $(".difficulty-selection").hide();

  $(".start").click(function() {
    $(".opening").removeClass("active").fadeOut(500);
    $(".start").removeClass("active").fadeOut(700);
    setTimeout(function (){
        $(".difficulty-selection").addClass("active").fadeIn(800)
    }, 1000);
    
  });

  $(".difficulty-btn").click(function() {
    const difficulty = $(this).data("difficulty");
    $(this).addClass("selected"); 
    $(".difficulty-selection").removeClass("active").fadeOut(500);

    setTimeout(function (){
       $(".options").addClass("active").fadeIn(500);
    $(".timer").addClass("active").fadeIn(500);
    }, 1000);
    
    $("body").addClass("greenBackground");

    setTimeout(function() {
      $("body").removeClass("greenBackground");
    }, 500);

 
    initializeQuestions(difficulty);
    setQuestions(difficulty); 
    countdown();
    setTimeout(function() {
      randomQuestion();
    }, 1000);
   
  });

  let i = 10;
  let countdownTimer;
  let toggle = false;
  let questions = [];
  let selectedQuestion;
  let questionNumber = 0;
  let total = 0;

  function initializeQuestions(difficulty) {
    questions = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];
    setQuestions(difficulty); 
  }

  function setQuestions(difficulty) {
    const questionElements = {
      "one": $("#one"),
      "two": $("#two"),
      "three": $("#three"),
      "four": $("#four"),
      "five": $("#five"),
      "six": $("#six"),
      "seven": $("#seven"),
      "eight": $("#eight"),
      "nine": $("#nine"),
      "ten": $("#ten")
    };

    if (difficulty === "easy") {
      questionElements.one.text("Which league is known for its 'Big Six' teams?");
      questionElements.two.text("Which league has teams like Bayern Munich and Borussia Dortmund?");
      questionElements.three.text("Which league includes FC Barcelona and Real Madrid?");
      questionElements.four.text("Which league is home to Juventus and AC Milan?");
      questionElements.five.text("Which league is known for its high-scoring matches?");
      questionElements.six.text("Which league has the most viewers globally?");
      questionElements.seven.text("Which league has the most competitive title races?");
      questionElements.eight.text("Which league has teams like Atletico Madrid and Sevilla?");
      questionElements.nine.text("Which league is known for its defensive tactics?");
      questionElements.ten.text("Which league has the most UEFA Champions League titles?");
    } else if (difficulty === "moderate") {
      questionElements.one.text("Which league had the first team to go unbeaten in a season?");
      questionElements.two.text("Which league has the most UEFA Europa League titles?");
      questionElements.three.text("Which league's teams have the most Ballon d'Or winners?");
      questionElements.four.text("Which league has the highest average stadium attendance?");
      questionElements.five.text("Which league has the most consecutive title wins by a single team?");
      questionElements.six.text("Which league introduced VAR technology first?");
      questionElements.seven.text("Which league has the most intense rivalry between two teams?");
      questionElements.eight.text("Which league has teams with the most domestic cup wins?");
      questionElements.nine.text("Which league has the most financially valuable teams?");
      questionElements.ten.text("Which league's teams have the most international trophies?");
    } else if (difficulty === "advanced") {
      questionElements.one.text("Which league has the only team to complete a treble twice?");
      questionElements.two.text("Which league has the record for the longest unbeaten streak?");
      questionElements.three.text("Which league has the most teams in UEFA Champions League finals?");
      questionElements.four.text("Which league's teams have the highest transfer spending?");
      questionElements.five.text("Which league has the most players in the FIFA World XI history?");
      questionElements.six.text("Which league has the record for the fastest goal ever scored?");
      questionElements.seven.text("Which league has the most wins in the UEFA Super Cup?");
      questionElements.eight.text("Which league's teams have the most red cards in history?");
      questionElements.nine.text("Which league has the most goals per match average?");
      questionElements.ten.text("Which league has the most competitive relegation battles?");
    }
  }

  function countdown() {
    if (i > 0 && !toggle) {
      $(".timer").text(i).addClass("active");
      i--;
      countdownTimer = setTimeout(countdown, 1000);
    } else if (i === 0 && !toggle) {
      $(".timer").text("0").addClass("active");
      var list = $("<tr><td>Question " + questionNumber + ": Not Answered</td></tr>");
      $(".table").append(list);
      playSound("./sounds/wrong.mp3");
      $("body").addClass("redBackground");
      setTimeout(function() {
        $("body").removeClass("redBackground");
      }, 700);
      randomQuestion();
      i = 10;
      countdownTimer = setTimeout(countdown, 1000);
    }
  }

  function randomQuestion() {
    if (questions.length > 0) {
      var randomNumber = Math.floor(Math.random() * questions.length);
      selectedQuestion = questions[randomNumber];
      questionNumber++;
      $(".question").removeClass("active").hide();
      $("#" + selectedQuestion).addClass("active").fadeIn(500);
      questions.splice(randomNumber, 1);
    } else {
      showResults();
    }
  }

  function showResults() {
    $(".timer").removeClass("active").fadeOut(500);
    $(".options").removeClass("active").fadeOut(500);
    $(".question").removeClass("active").fadeOut(500);
    $(".results").addClass("active").fadeIn(500);
    $(".score").text("Score: " + total);
    toggle = true;
    clearTimeout(countdownTimer);
    if (total > 4) {
      playSound("./sounds/applaud.mp3");
    } else {
      playSound("./sounds/boo.mp3");
    }
  }

  function playSound(path) {
    var audio = new Audio(path);
    audio.play();
  }

  // Answer logic
  $(".click").click(function() {
    var className = this.id;
    i = 10;
    $("#" + className).addClass("pressed");

    setTimeout(function() {
      $("#" + className).removeClass("pressed");
    }, 200);

    // Easy Questions
    if ((className === "a" && selectedQuestion === "one" && $("#one").text().includes("Big Six")) ||
        (className === "b" && selectedQuestion === "two" && $("#two").text().includes("Bayern Munich")) ||
        (className === "c" && selectedQuestion === "three" && $("#three").text().includes("FC Barcelona")) ||
        (className === "d" && selectedQuestion === "four" && $("#four").text().includes("Juventus")) ||
        (className === "b" && selectedQuestion === "five" && $("#five").text().includes("high-scoring")) ||
        (className === "a" && selectedQuestion === "six" && $("#six").text().includes("most viewers")) ||
        (className === "a" && selectedQuestion === "seven" && $("#seven").text().includes("competitive title races")) ||
        (className === "c" && selectedQuestion === "eight" && $("#eight").text().includes("Atletico Madrid")) ||
        (className === "d" && selectedQuestion === "nine" && $("#nine").text().includes("defensive tactics")) ||
        (className === "c" && selectedQuestion === "ten" && $("#ten").text().includes("UEFA Champions League titles")) ||
        // Moderate Questions
        (className === "a" && selectedQuestion === "one" && $("#one").text().includes("go unbeaten")) ||
        (className === "c" && selectedQuestion === "two" && $("#two").text().includes("Europa League titles")) ||
        (className === "c" && selectedQuestion === "three" && $("#three").text().includes("Ballon d'Or winners")) ||
        (className === "b" && selectedQuestion === "four" && $("#four").text().includes("stadium attendance")) ||
        (className === "b" && selectedQuestion === "five" && $("#five").text().includes("consecutive title wins")) ||
        (className === "b" && selectedQuestion === "six" && $("#six").text().includes("VAR technology")) ||
        (className === "c" && selectedQuestion === "seven" && $("#seven").text().includes("intense rivalry")) ||
        (className === "c" && selectedQuestion === "eight" && $("#eight").text().includes("domestic cup wins")) ||
        (className === "a" && selectedQuestion === "nine" && $("#nine").text().includes("financially valuable")) ||
        (className === "c" && selectedQuestion === "ten" && $("#ten").text().includes("international trophies")) ||
        // Advanced Questions
        (className === "b" && selectedQuestion === "one" && $("#one").text().includes("complete a treble")) ||
        (className === "d" && selectedQuestion === "two" && $("#two").text().includes("unbeaten streak")) ||
        (className === "c" && selectedQuestion === "three" && $("#three").text().includes("Champions League finals")) ||
        (className === "a" && selectedQuestion === "four" && $("#four").text().includes("transfer spending")) ||
        (className === "c" && selectedQuestion === "five" && $("#five").text().includes("FIFA World XI")) ||
        (className === "a" && selectedQuestion === "six" && $("#six").text().includes("fastest goal")) ||
        (className === "c" && selectedQuestion === "seven" && $("#seven").text().includes("UEFA Super Cup")) ||
        (className === "d" && selectedQuestion === "eight" && $("#eight").text().includes("most red cards")) ||
        (className === "b" && selectedQuestion === "nine" && $("#nine").text().includes("goals per match")) ||
        (className === "a" && selectedQuestion === "ten" && $("#ten").text().includes("relegation battles"))) {
      var list = $("<tr><td>Question " + questionNumber + ": Correct</td></tr>");
      $(".table").append(list);
      total++;
      playSound("./sounds/correct.mp3");
      $("body").addClass("greenBackground");
      setTimeout(function() {
        $("body").removeClass("greenBackground");
      }, 700);
    } else {
      var list = $("<tr><td>Question " + questionNumber + ": Incorrect</td></tr>");
      $(".table").append(list);
      playSound("./sounds/wrong.mp3");
      $("body").addClass("redBackground");
      setTimeout(function() {
        $("body").removeClass("redBackground");
      }, 700);
    }

    randomQuestion();
  });

  $(".retry").click(restart);

  function restart() {
    toggle = false;
    total = 0;
    i = 10;
    questionNumber = 0;
    const selectedDifficulty = $(".difficulty-btn.selected").data("difficulty") || "easy";
    initializeQuestions(selectedDifficulty);
    setQuestions(selectedDifficulty);
    $(".results").removeClass("active").hide();
    $(".timer").addClass("active").show();
    $(".options").addClass("active").show();
    $(".question").removeClass("active").hide();
    $(".score").text("");
    $(".record").empty();
    randomQuestion();
    countdown();
  }
});