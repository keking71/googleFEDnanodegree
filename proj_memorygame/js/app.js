const cardDeck = document.querySelector(".deck"); // get the container for all the cards

const moveCounter = document.querySelector(".moves"); // get the container for the move counter

const starsContainer = document.querySelector(".stars"); // get the container for the star rating

const timer = document.querySelector(".timer"); // get the container for the timer

const restart = document.querySelector(".restart"); // get the container for the restart icon

const modal = document.querySelector("#final-score");

// create a list that holds all of the card values
let cardOptions = [
  "far fa-gem",
  "far fa-gem",
  "fas fa-tree",
  "fas fa-tree",
  "far fa-heart",
  "far fa-heart",
  "fas fa-bolt",
  "fas fa-bolt",
  "far fa-moon",
  "far fa-moon",
  "fas fa-paw",
  "fas fa-paw",
  "fas fa-crown",
  "fas fa-crown",
  "far fa-snowflake",
  "far fa-snowflake"];

let openCards = []; // create an array for tracking open cards

let flippedOptions = []; // create an array for tracking current cards clicked

let matchedCards = []; // create a variable to track matched cards

let moves = 0; // create a variable to track moves

let currentStars = [];

let finalScore = [];

// create variables to track the time and timer
let timerCount = 0; // tracking seconds
let currentTime = ''; // tracking nicely formatted time
let finalTime = ''; // tracking final time
let timerID = null;

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function displayCard(val){
    if (!val.classList.contains("match") && !val.classList.contains("open")){ //card clicked is not a match already, nor open already
      val.className += " open show"; // display card
      addToOpen(val); // add classes to card
    };
};


function addToOpen(val){
  let targetCard = val.querySelector("i").classList.item(1); // get card class name to use as unique value

  flippedOptions.push(targetCard); // add unique value to list of open cards
};


function cardMatch(){ // when there is a match
  openCards.forEach(function(card){ // for each open card HTML
    card.classList.add("match"); // add match class
    card.classList.remove("open","show"); // remove unnecessary classes
  });
  matchedCards = cardDeck.querySelectorAll(".match");
};


function cardNoMatch(){ // when there is not a match
  setTimeout(function(){
    openCards.forEach(function(card){ // for each open card HTML
      card.classList.remove("open","show"); // remove classes to hide card
    });
    openCards = []; // reset list of open cards
  }, 600); // after .6 seconds
};


function incrementMoves(){
  moves++; // increment moves taken

  moveCounter.textContent = moves; // update visible move counter

  currentStars = starsContainer.querySelectorAll("li > i[class='fas fa-star']"); // get stars

  if (moves === 17){ // based on number of moves taken, remove stars. This is for two stars
    currentStars[2].classList.add('hide-star');
  } else if (moves === 26) { // one star
    currentStars[1].classList.add( 'hide-star');
  };
};

function matchWinner(){ // when all matches are made

  finalTime = currentTime;
  clearInterval(timerID); // stop timer
  timerCount = 0;

  for (let i = 0; i < currentStars.length; i++){
    finalScore += '<i class="fas fa-star"></i> ';
    console.log(finalScore);
  };


  modal.innerHTML = `<h1>Congratulations, you won!</h1><p>Your score: ${finalScore}</p><p>Time taken: ${finalTime} seconds</p><p>Moves taken: ${moves}</p><p><button id="new-game">Play again?</button></p>`;

  let redoButton = document.querySelector("#new-game");   // ask to restart
  redoButton.addEventListener("click", restartGame);

  modal.addEventListener("click", function(){
    modal.style.display = "none";
  });

  modal.style.display = "block";
};

function incrementClock(){
  cardDeck.removeEventListener("click", incrementClock); // prevent function from running more than once

  timerID = setInterval(function(){
    timerCount += 1; // increment time in seconds

    let time = timerCount;

    let minutes = 0;
    let seconds = 0;

    minutes = Math.floor(time / 60);
    seconds = time % 60;

    if (seconds < 10){
     	currentTime = minutes + ":0" + seconds;
    } else {
    	currentTime = minutes + ":" + seconds;
    }

    timer.textContent = currentTime; // update visible timer
  }, 1000); // every second
};

function restartGame(){

  clearInterval(timerID);
  timerCount = 0; // reset timers
  currentTime = '';
  finalTime = '';

  finalScore = [];

  moves = 0; // reset moves

  matchedCards = []; // reset list of matched cards

  initialize();
};


function initialize() { // prepare the game

  modal.style.display = "none";

  cardDeck.innerHTML = ``; // delete any existing cards

  moveCounter.textContent = 0; // display 0 moves

  starsContainer.innerHTML = `<li><i class="fas fa-star"></i></li><li><i class="fas fa-star"></i></li><li><i class="fas fa-star"></i></li>`; // build star rating

  timer.textContent = 0; // display 0 time

  cardOptions = shuffle(cardOptions); // shuffle the cards

  for (let i = 0; i < cardOptions.length; i++){ // perform function on each value in the card list

    let card = document.createElement('li'); // create a list item element and store it in a variable

    card.className = "card"; // add a class to that list item variable

    card.innerHTML = `<i class="${cardOptions[i]}"></i>`; // insert the current value from the card list inside the list item variable

    cardDeck.appendChild(card); // add the entire card to the card container

    cardClick(card); // add the click listener to the card

  };

  cardDeck.addEventListener("click", incrementClock);   // on first click, start timer

  restart.addEventListener("click", restartGame);   // when the restart icon is clicked

};

function cardClick(val) {
  val.addEventListener("click",function(){ // define behavior when a card is clicked

    if (flippedOptions.length < 2){ // if there are less than 2 cards open
      displayCard(this); // display card
      incrementMoves(); // increment moves and adjust stars
    };

    if (flippedOptions.length === 2) { // when there are two cards open

      openCards = cardDeck.querySelectorAll(".open"); // find the HTML of the open cards

      if (flippedOptions[0] === flippedOptions[1]){  //compare the values of the open cards for a match
        cardMatch(); // if match
      } else {
        cardNoMatch(); // if no match
      };

      flippedOptions = []; // clear open card values for more attempts

    };

    if (matchedCards.length === 16){ // check for all cards matched
      matchWinner();
    };
  });

};

// run the prep function
initialize();
