"use-strict";

const score0El = document.getElementById("score--0");
const score1El = document.getElementById("score--1");
const currentScore0El = document.getElementById("current--0");
const currentScore1El = document.getElementById("current--1");
const diceEl = document.querySelector(".dice");
const newBtnEl = document.querySelector(".btn--new");
const rollBtnEl = document.querySelector(".btn--roll");
const holdBtnEl = document.querySelector(".btn--hold");

const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");

// Declaring Variables

let scores, currentScore, activePlayer, playing;

// start Funtion
const startGame = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  currentScore0El.textContent = 0;
  currentScore1El.textContent = 0;

  diceEl.classList.add("hidden");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
};
startGame();

// Swicth Player function
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

// Rolling dice functionality
rollBtnEl.addEventListener("click", function () {
  if (playing) {
    // 1. Generating a random dice roll

    const randomDice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display dice

    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${randomDice}.png`;

    // 3. Check for rolled 1 : if true switch to 2nd player

    if (randomDice !== 1) {
      // Add dice to current score

      currentScore += randomDice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Switch to next player

      switchPlayer();
    }
  }
});

holdBtnEl.addEventListener("click", function () {
  if (playing) {
    // 1. Add current score to active player's score

    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Check if player's score is >=100
    // Finish the game

    if (scores[activePlayer] >= 50) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");

      diceEl.classList.add("hidden");
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
});

newBtnEl.addEventListener("click", startGame);
