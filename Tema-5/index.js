import { quiz, sampler, colors, synth } from "./constants.js";

const containerDiv = document.getElementById("quiz-container");
const counterDiv = document.getElementById("counter");
const questionDiv = document.getElementById("question");
const startQuiz = document.getElementById("start-quiz");
const singleQuestion = quiz[Math.floor(Math.random() * quiz.length)];

let buttonsAnswers = [];
let timeleft = 10;
let timer;

startQuiz.addEventListener("click", () => {
  startGame();
  startCronometer();
});

function startGame() {
  startQuiz.classList.add("hide");
  counterDiv.classList.remove("hide");
  createQuiz();
}

function startCronometer() {
  timer = setInterval(timerCB, 1000);
}

function timerCB() {
  if (timeleft <= 0) {
    clearInterval(timer);
    counterDiv.innerText = "0";
    lose();
    disabledButtons();
  } else {
    synth.triggerAttackRelease("C4", "8n");
    counterDiv.innerText = timeleft;
  }
  timeleft--;
}

function createQuiz() {
  questionDiv.innerText = singleQuestion.question;
  singleQuestion.answers.map((answer, i) => {
    const answerDiv = document.createElement("button");
    answerDiv.classList.add("answer");
    answerDiv.style.background = colors[i];
    answerDiv.innerText = answer;
    buttonsAnswers.push(answerDiv);
    answerDiv.addEventListener("click", () => {
      if (answerDiv.textContent === singleQuestion.answer) {
        win();
      } else {
        lose();
      }
      clearInterval(timer);
      disabledButtons();
    });
    containerDiv.appendChild(answerDiv);
  });
}
function lose() {
  const osc = new Tone.Oscillator().toDestination();
  osc.frequency.value = "C4";
  osc.frequency.rampTo("C2", 2);
  osc.start().stop("+3");
  colorAnswers();
  question.innerText = "The answer is incorrect!";
}
function win() {
  const now = Tone.now();
  sampler.triggerAttackRelease("C4", "8n", now);
  sampler.triggerAttackRelease("E4", "8n", now + 0.5);
  sampler.triggerAttackRelease("G4", "8n", now + 1);
  sampler.triggerAttackRelease("C5", "8n", now + 1.5);
  colorAnswers();
  questionDiv.innerText = "The answer is correct!";
}

function disabledButtons() {
  buttonsAnswers.map((button) => (button.disabled = "true"));
}

function colorAnswers() {
  buttonsAnswers.map((button) => {
    button.style.background =
      button.textContent === singleQuestion.answer ? "green" : "red";
  });
}
