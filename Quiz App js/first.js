const questions = [
  {
    question: "What does HTML stand for?",
    options: ["Hyper Text Markup Language", "High Text Machine Learning", "Hyperlink Tool Markup Language", "Home Tool Markup Language"],
    answer: 0
  },
  {
    question: "Which language is used for styling web pages?",
    options: ["HTML", "JQuery", "CSS", "XML"],
    answer: 2
  },
  {
    question: "Which is not a JavaScript framework?",
    options: ["React", "Angular", "Vue", "Django"],
    answer: 3
  },
  {
    question: "Inside which HTML element do we put the JavaScript?",
    options: ["<script>", "<js>", "<javascript>", "<code>"],
    answer: 0
  }
];

let currentQuestion = 0;
let score = 0;

const questionBox = document.getElementById("question-box");
const optionsBox = document.getElementById("options-box");
const nextBtn = document.getElementById("next-btn");
const resultBox = document.getElementById("result-box");
const scoreText = document.getElementById("score-text");
const saveScoreBtn = document.getElementById("save-score-btn");
const playerNameInput = document.getElementById("playerName");
const leaderboardList = document.getElementById("leaderboard-list");

function showQuestion() {
  nextBtn.disabled = true;
  const q = questions[currentQuestion];
  questionBox.textContent = q.question;
  optionsBox.innerHTML = "";

  q.options.forEach((opt, index) => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.classList.add("option-btn");
    btn.onclick = () => selectAnswer(btn, index);
    optionsBox.appendChild(btn);
  });
}

function selectAnswer(button, index) {
  const q = questions[currentQuestion];
  const buttons = document.querySelectorAll(".option-btn");

  buttons.forEach(b => b.disabled = true);

  if (index === q.answer) {
    button.classList.add("correct");
    score++;
  } else {
    button.classList.add("wrong");
    buttons[q.answer].classList.add("correct");
  }

  nextBtn.disabled = false;
}

nextBtn.addEventListener("click", () => {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    endQuiz();
  }
});

function endQuiz() {
  document.getElementById("quiz-box").classList.add("hidden");
  resultBox.classList.remove("hidden");
  scoreText.textContent = `Your Score: ${score} / ${questions.length}`;
}

// Save score to leaderboard
saveScoreBtn.addEventListener("click", () => {
  const name = playerNameInput.value.trim() || "Anonymous";
  const leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
  leaderboard.push({ name, score });
  leaderboard.sort((a, b) => b.score - a.score);
  localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
  showLeaderboard();
  saveScoreBtn.disabled = true;
});

function showLeaderboard() {
  const leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
  leaderboardList.innerHTML = "";
  leaderboard.slice(0, 5).forEach((entry, index) => {
    const li = document.createElement("li");
    li.textContent = `${entry.name} - ${entry.score}`;
    leaderboardList.appendChild(li);
  });
}

// Load leaderboard on page load
showLeaderboard();

// Start quiz
showQuestion();
