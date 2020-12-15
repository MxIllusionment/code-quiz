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
var timerDiv = document.getElementById("timer-div");
var startBtn = document.getElementById("start-btn");

var currentQuestion;

/* Updates the question and answer text to the specified question index */
function updateQuestion(qIdx) {
  var questionText = document.getElementById("question-text");

  currentQuestion = qIdx;

  questionText.textContent = questionList[qIdx].question;
  
  for(var i = 0; i < 4; i++) {
    var answerText = document.getElementById("answer-btn-" + (i+1));
    answerText.textContent = questionList[qIdx].answers[i];
  }
}

/* Removes a component by ID by setting its display to 'none' */
function hideID(id) {
  var element = document.getElementById(id);

  element.setAttribute("style", "display:none");
}

/* Removes a component by ID by setting its display to 'none' */
function showID(id) {
  var element = document.getElementById(id);

  element.setAttribute("style", "");
}

/* Set initial state */
hideID("question-page");
hideID("result-block");
hideID("complete-page");
hideID("high-score-page");
timerDiv.setAttribute("style", "visibility:hidden");

/* Add listener to start quiz when Start button is clicked */
startBtn.addEventListener("click", function() {
  /* Hide 'View High Scores' */
  viewScoresDiv.setAttribute("style", "visibility: hidden");

  /* Show Timer */
  timerDiv.setAttribute("style", "visibility: visible");

  /* Hide start page */
  hideID("start-page");

  /* Load first question */
  updateQuestion(0);

  /* Show question page */
  showID("question-page");
});