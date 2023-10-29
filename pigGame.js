// selecting Elements

const score0El = document.querySelector("#score--0");
const score1El = document.querySelector("#score--1");
let currentscore0 = document.querySelector("#current--0");
let currentscore1 = document.querySelector("#current--1");
const diceEl = document.querySelector(".dice");
const btnroll = document.querySelector(".btn--roll");
const btnnew = document.querySelector(".btn--new");
const btnhold = document.querySelector(".btn--hold");
const player0 = document.querySelector(".player--0");
const player1 = document.querySelector(".player--1");

// Starting Conditions

let currentScore;
let activePlayer;
let scores;
let playing;

const newGame = function () {
  score0El.textContent = 0;
  score1El.textContent = 0;
  currentscore0.textContent = 0;
  currentscore1.textContent = 0;

  player0.classList.remove("player--winner");
  player1.classList.remove("player--winner");
  player0.classList.add("player--active");
  player1.classList.remove("player--active");
  diceEl.classList.add("hidden");

  currentScore = 0;
  activePlayer = 0;
  scores = [0, 0];
  playing = true;
};

newGame();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0.classList.toggle("player--active");
  player1.classList.toggle("player--active");
};

// roll button Functionality
btnroll.addEventListener("click", function () {
  // 1. Generating Random Dice Roll
  if (playing) {
    let dice = Math.floor(Math.random() * 6) + 1;

    //    2. Display Dice
    diceEl.classList.remove("hidden");
    diceEl.src = `pigGame_dice-${dice}.png`;

    // 3. check for dice. if not 1: add dice to current score
    if (dice !== 1) {
      currentScore = currentScore + dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // 4.if 1, Switch Player
      switchPlayer();
    }
  }
});

// 5. hold button functionality
btnhold.addEventListener("click", function () {
  // add current score to active player's score
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // check if player's score >= 100
    if (scores[activePlayer] >= 100) {
      // if yes then finish the game
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
      diceEl.classList.add("hidden");
    } else {
      // if no then switch player
      switchPlayer();
    }
  }
});

// new game button functionality
btnnew.addEventListener("click", newGame);
