
const mainText = document.getElementById("hero");
const quizText = document.getElementById("quiz");
const scoreLink = document.querySelector("scoreLink");
const topScores = document.getElementById("high-scores");
const results = document.querySelector(".notification");

// Define quiz questions and answers
const quizQuestions = [
  {
    question: "Which are primitive data types in JavaScript?",
    answer: "all of the above",
    choice1: "number",
    choice2: "string",
    choice3: "boolean",
    choice4: "all of the above",
  },
  {
    question: "What is the correct way to declare a variable in JavaScript?",
    answer: "var, let, or const",
    choice1: "variable x;",
    choice2: "var x;",
    choice3: "let x;",
    choice4: "const x;",
  },
  {
    question: "How do you write a single-line comment in JavaScript?",
    answer: "// This is a comment",
    choice1: "'This is a comment",
    choice2: "<!-- This is a comment -->",
    choice3: "# This is a comment",
    choice4: "// This is a comment",
  },
  {
    question: "What does 'DOM' stand for in web development?",
    answer: "Document Object Model",
    choice1: "Data Object Model",
    choice2: "Dynamic Object Model",
    choice3: "Document Object Model",
    choice4: "Design Object Model",
  },
];

// Initialize variables
let questionIndex = 0;
let answerMessage;
let endingScore = 0;
const playerScores = [];

// View high scores function
const displayHighScors = () => {
  //scoreLink.classList.add("hidden");
  mainText.classList.add("hidden");
  quizText.classList.add("hidden");
  topScores.classList.remove("hidden");
};

// Clear high scores function
const clearScoreList = () => {
  const list = document.getElementById("scores-list");
  list.innerHTML = "";
  localStorage.clear();
};

// Create a list item with player info in high score view
const addHighScore = (highScoreObj) => {
  const nameList = document.createElement("li");
  nameList.className = "score";
  nameList.textContent = `${highScoreObj.name} - ${highScoreObj.score}`;
  const listElement = document.getElementById("scores-list");
  listElement.appendChild(nameList);
  playerScores.push(highScoreObj);
};

// Submit score form function
const addPlayerName = (event) => {
  event.preventDefault();
  const playerScore = endingScore;
  const playerName = document.getElementById("player-initials").value;
  const highScoreObj = { name: playerName, score: playerScore };
  addHighScore(highScoreObj);
  saveScore();
  document.getElementById("score-form").reset();
  displayHighScors();
};

// Click handler for answer choice buttons
const choiceAnswerBtn = function (e) {
  if (questionIndex < quizQuestions.length) {
    const playerAnswer = e.target.textContent.slice(3);
    if (playerAnswer === quizQuestions[questionIndex].answer) {
      answerMessage = "Correct!";
    } else {
      answerMessage = "Wrong!";
      timeLeft -= 10;
      timer.textContent = `Time: ${timeLeft}`;
    }
    questionIndex++;
    showQuiz();
  }
};

// Hide notification with a delay
const hideanswerMessage = (delay) => {
  setTimeout(() => {
    results.style.display = "none";
  }, delay);
};

// Display notification function
const displayAnswerMessage = () => {
  notification.textContent = answerMessage;
  if (notification.textContent !== "") {
    results.style.display = "block";
  }
  hideanswerMessage(2000);
};

// Quiz timer/countdown
let timeLeft;
const timer = document.getElementById("timer");
let timerTimeout;

// Update the timer
const updateTimer = () => {
  timer.textContent = `Time: ${timeLeft}`;
  if (timeLeft > 0) {
    timeLeft--;
    timerTimeout = setTimeout(updateTimer, 1000);
  } else {
    displayHighScors();
  }
};

// Start timer function
const startTimer = () => {
  timeLeft = 75;
  updateTimer();
};

// Stop timer function
const stopTimer = () => {
  clearTimeout(timerTimeout);
};

// Display a question
const showQuiz = () => {
  displayAnswerMessage();
  if (questionIndex < quizQuestions.length) {
    const question = document.getElementById("question");
    question.textContent = quizQuestions[questionIndex].question;

    for (let i = 1; i <= 4; i++) {
      const choiceBtn = document.getElementById(`choice${i}`);
      console.log(choiceBtn)
      choiceBtn.textContent = `${i}. ${
        quizQuestions[questionIndex]["choice" + i]
      }`;
    }
    const buttonsArray = document.querySelectorAll("#quiz-info button");
    buttonsArray.forEach((button) => {
      button.addEventListener("click", choiceAnswerBtn);
    });
  } else {
    const quizContent = document.getElementById("quiz-info");
    quizContent.style.display = "none";
    const quizResultsSection = document.getElementById("answer-results");
    quizResultsSection.style.display = "block";
    endingScore = timeLeft;
    document.getElementById(
      "game-score",
    ).textContent = `Your final score is ${endingScore}.`;
    clearInterval(timerTimeout);
    questionIndex = 0;
  }
};

// Save player's submitted score to local storage
const saveScore = () => {
  localStorage.setItem("scores", JSON.stringify(playerScores));
};

// Load existing scores
const loadScores = () => {
  const savedScores = localStorage.getItem("scores");
  if (savedScores) {
    const parsedScores = JSON.parse(savedScores);
    parsedScores.forEach(addHighScore);
  }
};

// Load any existing scores once
loadScores();

// Start the quiz
const startQuiz = () => {
  startTimer();
  mainText.style.display = "none";
  quizText.style.display = "block";
  showQuiz();
};

// Click handler for "Start Quiz" button
document.getElementById("startQuizBtn").addEventListener("click", startQuiz);

// Click handler for "View high scores" button
topScores.addEventListener("click", displayHighScors);

// Click handler for final score submit button
document.getElementById("score-form").addEventListener("submit", addPlayerName);

// Click handler for go back button on high score view
document.getElementById("backbtn").addEventListener("click", () => window.location.reload());

// Click handler to clear high scores from local storage
document.getElementById("clearbtn").addEventListener("click", clearScoreList);
