var questionList = [
  {
    question: "All lines should be terminated with a ________",
    answers: ["semicolon", "period", "ampersand", "backslash"],
    correctAnswer: 1
  },
  {
    question: "Which of these variable types can be stored in arrays?",
    answers: ["numbers", "strings", "booleans", "all of the above"],
    correctAnswer: 4
  },
  {
    question: "What character is used to bracket the contents of an array?",
    answers: ["quotation mark", "square bracket", "curly bracket", "angle bracket"],
    correctAnswer: 2
  },
  {
    question: "Which of these functions displays a message to the user with only an 'OK' button?",
    answers: ["prompt()", "confirm()", "check()", "alert()"],
    correctAnswer: 4
  },
  {
    question: "What function do you call to print something to the console?",
    answers: ["console.log()", "console()", "log()", "print()"],
    correctAnswer: 1
  },
  {
    question: "Which of the following will check if the variable 'x' is equal in both value and type to the variable 'y'?",
    answers: ["x = y", "x == y", "x === y", "x != y"],
    correctAnswer: 3
  },
];

var viewScoresDiv = document.getElementById("view-high-scores");
var resultDiv = document.getElementById("result-block");
var resultText = document.getElementById("result-text");
var timerDiv = document.getElementById("timer-div");
var timeCounter = document.getElementById("timer");
var startBtn = document.getElementById("start-btn");

var currentQuestion;
var currentTime;
var timerInterval;

/* Updates the question and answer text to the specified question index */
function updateQuestion(qIdx) {
  var questionText = document.getElementById("question-text");

  if (qIdx < questionList.length) {
    questionText.textContent = questionList[qIdx].question;
    
    for(var i = 0; i < 4; i++) {
      var answerText = document.getElementById("answer-btn-" + (i+1));
      answerText.textContent = questionList[qIdx].answers[i];
    }
  }
}

/* Responds to a question answer by updating score, result text, and moving to next question */
function answerQuestion(event) {
  /* Check if answer is correct */
  if (event.target.id === "answer-btn-" + questionList[currentQuestion].correctAnswer ) {
    resultText.textContent = "Correct!";
  } else {
    updateTimer(-10);
    resultText.textContent = "Wrong!";
  }
  showID("result-block");

  /* Remove focus from button */
  event.target.blur();

  currentQuestion++;
  if(currentQuestion < questionList.length) {
    updateQuestion(currentQuestion);
  } else {
    finishQuiz();
  }
}

/* Finishes the quiz by moving to the final score screen */
function finishQuiz() {
  var scoreDisplay = document.getElementById("final-score");
  clearInterval(timerInterval);

  hideID("question-page");
  timerDiv.style.visibility = "hidden";
  scoreDisplay.textContent = currentTime;
  showID("complete-page");
}

/* Removes a component by ID by setting its display to 'none' */
function hideID(id) {
  var element = document.getElementById(id);

  element.style.display = "none";
}

/* Removes a component by ID by setting its display to 'none' */
function showID(id) {
  var element = document.getElementById(id);

  element.style.display = "";
}

/* Update timer and finishes quiz if timer is expired */
function updateTimer(adjust) {
  currentTime = currentTime + adjust > 0 ? currentTime + adjust : 0;
  timeCounter.textContent = currentTime;

  if (currentTime === 0) {
    finishQuiz();
  }
}

function countdown() {
  updateTimer(-1);
}

/* Set initial state */
function initializePage() {
  hideID("question-page");
  hideID("result-block");
  hideID("complete-page");
  hideID("high-score-page");
  viewScoresDiv.style.visibility = "visible";
  timerDiv.style.visibility = "hidden";
}

/* Add listener to start quiz when Start button is clicked */
startBtn.addEventListener("click", function() {
  /* Hide 'View High Scores' */
  viewScoresDiv.style.visibility = "hidden";

  /* Show Timer */
  timerDiv.style.visibility = "visible";

  /* Hide start page */
  hideID("start-page");

  /* Load first question */
  currentQuestion = 0;
  updateQuestion(0);

  /* Show question page */
  showID("question-page");

  /* Start timer countdown */
  currentTime = 60;
  timeCounter.textContent = currentTime;
  timerInterval = setInterval(countdown, 1000);
});

/* Add listener to question answer buttons */
for (var i = 0; i < 4; i++) {
  var button = document.getElementById("answer-btn-" + (i + 1));
  button.addEventListener("click", answerQuestion);
}

initializePage();