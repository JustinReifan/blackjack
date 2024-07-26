// script.js
document.getElementById("increaseBet").addEventListener("click", increaseBet);
document.getElementById("decreaseBet").addEventListener("click", decreaseBet);
document.getElementById("placeBet").addEventListener("click", placeBet);

const stopButton = document.getElementById("stopButton");
const hitButton = document.getElementById("hitButton");
let balance = 1000;
let currentBet = 0;

let usercard = [];
let dealercard = [];

function drawCard() {
  // remove blankCard
  document.getElementById("blankCard").style.display = "none";

  // add card to dealer
  const handDealer = document.getElementById("handDealer");
  const dealercard1 = newCard(handDealer);
  dealercard.push(dealercard1);

  // add card to user
  const handUser = document.getElementById("handUser");
  const usercard1 = newCard(handUser);
  const usercard2 = newCard(handUser);
  usercard.push(usercard1, usercard2);

  // enable hit & stop button
  stopButton.classList.remove("disabled");
  hitButton.classList.remove("disabled");
}

// logic hit button
hitButton.addEventListener("click", function () {
  const usercardX = newCard(handUser);
  usercard.push(usercardX);

  let userValue = usercard.reduce((acc, curr) => acc + curr, 0);

  setTimeout(() => {
    if (userValue > 21) {
      alert("Busted!");
      resetGame();
    } else if (userValue == 21) {
      checkDealerValue;
    }
  }, 1000);
});

// logic Stop Button
stopButton.addEventListener("click", function () {
  checkDealerValue();
});

function closeOverlay() {
  document.getElementById("overlay").style.display = "none";
}

function increaseBet() {
  if (balance > currentBet) {
    currentBet += 10; // Increase bet by 10
    updateDisplay();
  }
}

function decreaseBet() {
  if (currentBet > 0) {
    currentBet -= 10; // Decrease bet by 10
    updateDisplay();
  }
}

function placeBet() {
  if (currentBet > 0 && currentBet <= balance) {
    balance -= currentBet;
    updateDisplay();
    // Here you can add more logic for when a bet is placed

    // play game trigger

    drawCard();
  }
}

function updateDisplay() {
  document.getElementById("balanceAmount").innerHTML = balance;
  document.getElementById("betAmount").innerHTML = currentBet;
}

function newCard(hand) {
  const suits = ["hearts", "diamonds", "clubs", "spades"];
  const values = [
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
    "A",
  ];

  // Generate random suit and value
  const randomSuit = suits[Math.floor(Math.random() * suits.length)];
  const randomValue = values[Math.floor(Math.random() * values.length)];

  const card = document.createElement("div");
  card.classList.add("cards", "mx-2");

  card.style.backgroundImage = `url('images/${randomSuit}_${randomValue}.png')`;
  hand.appendChild(card);

  let numericValue;
  if (randomValue === "J" || randomValue === "Q" || randomValue === "K") {
    numericValue = 10;
  } else if (randomValue === "A") {
    numericValue = 11;
  } else {
    numericValue = parseInt(randomValue);
  }

  return numericValue;
}

function resetGame() {
  const handUser = document.getElementById("handUser");
  const handDealer = document.getElementById("handDealer");
  handUser.innerHTML = ""; // Remove all cards from hand
  handDealer.innerHTML = ""; // Remove all cards from hand
  currentBet = 0; // Reset bet
  document.getElementById("blankCard").style.display = "block"; // make unknown card visible
  // disable hit & stop button
  stopButton.classList.add("disabled");
  hitButton.classList.add("disabled");
  dealercard = [];
  usercard = [];
  updateDisplay();
}

function checkValue() {
  let betValue = document.getElementById("betAmount").innerHTML;
  let dealerValue = dealercard.reduce((acc, curr) => acc + curr, 0);
  let userValue = usercard.reduce((acc, curr) => acc + curr, 0);

  if (userValue > dealerValue && userValue <= 21) {
    alert("You Win!");
    balance += betValue * 2;
    resetGame();
  }
  //   cek apakah bandar lebih besar
  else if (dealerValue > userValue && dealerValue <= 21) {
    alert("You Lose!");
    resetGame();
  }
  // cek kalau lebih dari 21 & lebih banyak user dari dealer
  else if (dealerValue > 21) {
    alert("You Win!");
    balance += betValue * 2;
    resetGame();
  }
  //   cek apakah user pas 21
  else if (userValue == 21) {
    alert("You Win!");
    balance += betValue * 2;
    resetGame();
  } else {
    alert("Tie!");
    balance += betValue * 1;
    resetGame();
  }

  userValue = 0;
  dealerValue = 0;
}

function checkDealerValue() {
  const dealerValue = dealercard.reduce((acc, curr) => acc + curr, 0);
  if (dealerValue < 15) {
    // Dealer must draw another card
    const dealercardX = newCard(handDealer);
    dealercard.push(dealercardX);

    setTimeout(checkDealerValue, 1000); // Check again after drawing a card
  } else {
    // Dealer stops drawing, determine outcome
    setTimeout(() => {
      checkValue();
    }, 500);
  }
}
// Initial display update
updateDisplay();
