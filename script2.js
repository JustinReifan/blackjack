// script.js
document.getElementById("increaseBet").addEventListener("click", increaseBet);
document.getElementById("decreaseBet").addEventListener("click", decreaseBet);
document.getElementById("resetBet").addEventListener("click", resetBet);
document.getElementById("allBet").addEventListener("click", allBet);
document.getElementById("bet100").addEventListener("click", bet100);
document.getElementById("bet500").addEventListener("click", bet500);
document.getElementById("bet1000").addEventListener("click", bet1000);
document.getElementById("placeBet").addEventListener("click", placeBet);

const stopButton = document.getElementById("stopButton");
const hitButton = document.getElementById("hitButton");

// Point
let userPoint = document.getElementById("userPoint");
let dealerPoint = document.getElementById("dealerPoint");

let balance = 1000;
let currentBet = 0;

let userCards = [];
let dealerCards = [];

function drawCard() {
  // remove blankCard
  document.getElementById("blankCard").style.display = "none";

  // add card to dealer
  const handDealer = document.getElementById("handDealer");
  const dealerCard1 = newCard(handDealer);
  dealerCards.push(dealerCard1);

  // add card to user
  const handUser = document.getElementById("handUser");
  const userCard1 = newCard(handUser);
  const userCard2 = newCard(handUser);
  userCards.push(userCard1, userCard2);

  // enable hit & stop button
  stopButton.classList.remove("disabled");
  hitButton.classList.remove("disabled");

  //   display points
  let userValue = calculateHandValue(userCards);
  let dealerValue = calculateHandValue(dealerCards);

  userPoint.style.visibility = "visible";
  dealerPoint.style.visibility = "visible";
  userPoint.innerHTML = userValue;
  dealerPoint.innerHTML = dealerValue;

  //   disable bet button
  document.getElementById("increaseBet").classList.add("disabled");
  document.getElementById("decreaseBet").classList.add("disabled");
  document.getElementById("resetBet").classList.add("disabled");
  document.getElementById("allBet").classList.add("disabled");
  document.getElementById("bet100").classList.add("disabled");
  document.getElementById("bet500").classList.add("disabled");
  document.getElementById("bet1000").classList.add("disabled");
  document.getElementById("placeBet").classList.add("disabled");

  checkUserValue();
}

// logic hit button
hitButton.addEventListener("click", function () {
  stopButton.classList.add("disabled");
  hitButton.classList.add("disabled");
  const handUser = document.getElementById("handUser");
  const userCard = newCard(handUser);
  userCards.push(userCard);

  let userValue = calculateHandValue(userCards);
  let dealerValue = calculateHandValue(dealerCards);

  //   update points
  userPoint.innerHTML = userValue;
  dealerPoint.innerHTML = dealerValue;

  checkUserValue();
  setTimeout(() => {
    stopButton.classList.remove("disabled");
    hitButton.classList.remove("disabled");
  }, 700);
});

function checkUserValue() {
  let userValue = calculateHandValue(userCards);

  setTimeout(() => {
    if (userValue > 21) {
      alert("Busted!");
      resetGame();
    } else if (userValue === 21) {
      stopButton.classList.add("disabled");
      hitButton.classList.add("disabled");
      setTimeout(() => {
        stopDrawing();
      }, 500);
    }
  }, 1000);
}

// logic Stop Button
stopButton.addEventListener("click", function () {
  stopButton.classList.add("disabled");
  hitButton.classList.add("disabled");

  stopDrawing();
});

function stopDrawing() {
  checkDealerValue();
}

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
function resetBet() {
  if (currentBet > 0) {
    currentBet = 0;
    updateDisplay();
  }
}

function allBet() {
  currentBet = balance;
  updateDisplay();
}
function bet100() {
  if (balance > currentBet) {
    currentBet += 100; // Increase bet by 10
    updateDisplay();
  }
}
function bet500() {
  if (balance > currentBet) {
    currentBet += 500; // Increase bet by 10
    updateDisplay();
  }
}
function bet1000() {
  if (balance > currentBet) {
    currentBet += 1000; // Increase bet by 10
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
  } else {
    alert("Out Of Balance!");
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

  return { suit: randomSuit, value: randomValue, numericValue: numericValue };
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
  dealerCards = [];
  userCards = [];

  updateDisplay();
  userPoint.innerHTML = 0;
  dealerPoint.innerHTML = 0;

  //   enable betting
  document.getElementById("increaseBet").classList.remove("disabled");
  document.getElementById("decreaseBet").classList.remove("disabled");
  document.getElementById("resetBet").classList.remove("disabled");
  document.getElementById("allBet").classList.remove("disabled");
  document.getElementById("bet100").classList.remove("disabled");
  document.getElementById("bet500").classList.remove("disabled");
  document.getElementById("bet1000").classList.remove("disabled");
  document.getElementById("placeBet").classList.remove("disabled");
}

function calculateHandValue(cards) {
  let totalValue = cards.reduce((acc, card) => acc + card.numericValue, 0);
  let numAces = cards.filter((card) => card.value === "A").length;

  // Adjust for Aces
  while (totalValue > 21 && numAces > 0) {
    totalValue -= 10;
    numAces -= 1;
  }

  return totalValue;
}

function checkDealerValue() {
  let dealerValue = calculateHandValue(dealerCards);

  if (dealerValue < 15) {
    // Dealer must draw another card
    const handDealer = document.getElementById("handDealer");
    const dealerCard = newCard(handDealer);
    dealerCards.push(dealerCard);
    let userValue = calculateHandValue(userCards);
    let dealerValue = calculateHandValue(dealerCards);

    //   update points
    userPoint.innerHTML = userValue;
    dealerPoint.innerHTML = dealerValue;

    setTimeout(checkDealerValue, 1000); // Check again after drawing a card
  } else {
    // Dealer stops drawing, determine outcome
    stopButton.classList.remove("disabled");
    hitButton.classList.remove("disabled");
    determineOutcome();
  }
}

function determineOutcome() {
  let userValue = calculateHandValue(userCards);
  let dealerValue = calculateHandValue(dealerCards);

  if (dealerValue > 21 || userValue > dealerValue) {
    alert("You Win!");
    balance += currentBet * 2; // Assuming 2x payout for simplicity
  } else if (userValue < dealerValue) {
    alert("Dealer Wins!");
  } else {
    alert("It's a Tie!");
    balance += currentBet; // Return the bet to the player
  }
  resetGame();
}

// Initial display update
updateDisplay();
