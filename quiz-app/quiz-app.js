import { quizQuestions } from "./quiz-questions.js";

let followUp = 0,
  quizQuestion,
  scores = 0;

function renderQuestionsAndOptions() {
  if (followUp <= quizQuestions.length) {
    let html = "";

    quizQuestion = quizQuestions[followUp];

    html += `
        <div class="question-container js-question-container">
              Question ${followUp + 1}: ${quizQuestion.question}
        </div>
        <div class="options js-options">
          ${renderOptions()}
        </div>
      `;
    document.querySelector(".js-container").innerHTML = html;

    document.querySelectorAll(".js-option").forEach((option) => {
      option.addEventListener("click", handleOptionClicksAdd);
    });
  } else {
    document.querySelector(".js-weldone").innerHTML = "Quiz Over";
  }
}

function renderOptions() {
  let html = "",
    optionA,
    optionB,
    optionC,
    optionD;
  const sortedOptions = quizQuestion.options.sort(() => Math.random() - 0.5);

  sortedOptions.forEach((option, index) => {
    if (index === 0) optionA = option;
    if (index === 1) optionB = option;
    if (index === 2) optionC = option;
    if (index === 3) optionD = option;

    html = `
      <div class="option-a-b">
        <div class="js-option option-a js-option-a">A: ${optionA}</div>
        <div class="js-option option-b js-option-b">B: ${optionB}</div>
      </div>
      <div class="option-c-d">
        <div class="js-option option-c js-option-c">C: ${optionC}</div>
        <div class="js-option option-d js-option-d">D: ${optionD}</div>
      </div>
    `;
  });
  return html;
}

function handleOptionClicksAdd(event) {
  const optionClicked = event.target;
  if (optionClicked.textContent.slice(3) === quizQuestion.correctAnswer) {
    scores++;
    optionClicked.style.backgroundColor = "green";
    document.querySelector(".js-weldone").style.visibility = "visible";
    document.querySelector(".js-weldone").innerHTML = "Correct!";
    document.querySelector(".js-weldone").style.color = "green";
    document.querySelector(".js-weldone").style.backgroundColor = "white";
  } else {
    optionClicked.style.backgroundColor = "red";
    document.querySelector(".js-weldone").style.visibility = "visible";
    document.querySelector(".js-weldone").innerHTML = "Wrong!";
    document.querySelector(".js-weldone").style.color = "red";
    document.querySelector(".js-weldone").style.backgroundColor = "white";
  }
  document.querySelector(".js-scores").innerHTML = `Scores: ${scores}/10`;
  handleOptionClicksRemove();
}

function handleOptionClicksRemove() {
  document.querySelectorAll(".js-option").forEach((remove) => {
    remove.removeEventListener("click", handleOptionClicksAdd);
  });
}

document
  .querySelector(".js-next-button")
  .addEventListener("click", handleNextClick);

function handleNextClick() {
  document.querySelector(".js-weldone").style.visibility = "hidden";
  followUp++;
  renderQuestionsAndOptions();
  if (followUp === 9) {
    document
      .querySelector(".js-next-button")
      .removeEventListener("click", handleNextClick);
  }
}

document.querySelector(".js-submit-button").addEventListener("click", () => {
  const weldone = document.querySelector(".js-weldone");
  if (scores === 10) {
    weldone.innerHTML = "Weldone!";
  }
  document.querySelector(
    ".js-scores"
  ).innerHTML = `Total score is ${scores}/10`;
  handleOptionClicksRemove();
  document
    .querySelector(".js-next-button")
    .removeEventListener("click", handleNextClick);
  if (weldone.textContent === "Correct!" || weldone.textContent === "Wrong!") {
    weldone.style.visibility = "hidden";
  }
  document
    .querySelectorAll(".js-container, .js-buttons-container")
    .forEach((element) => {
      element.style.visibility = "hidden";
    });

  document.querySelector(".js-restart-container").style.display = "block";
});

document.querySelector(".js-start-button").addEventListener("click", () => {
  document
    .querySelectorAll(".js-start-button-container, .js-start-button")
    .forEach((button) => {
      button.style.display = "none";
    });
  document
    .querySelectorAll(".js-next-button, .js-submit-button, .js-scores")
    .forEach((element) => {
      element.style.display = "block";
    });
  renderQuestionsAndOptions();
});

document.querySelector(".js-yes-button").addEventListener("click", () => {
  location.reload();
});

document.querySelector(".js-no-button").addEventListener("click", () => {
  document.querySelector(".js-restart-container").style.display = "none";
  document
    .querySelectorAll(".js-container, .js-buttons-container")
    .forEach((button) => {
      button.style.visibility = "visible";
    });
});
