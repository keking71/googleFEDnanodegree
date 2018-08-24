// create a list that holds all of the card values
let cardOptions = [
  "fa fa-diamond",
  "fa fa-paper-plane-o",
  "fa fa-anchor",
  "fa fa-bolt",
  "fa fa-cube",
  "fa fa-leaf",
  "fa fa-bicycle",
  "fa fa-bomb",
  "fa fa-diamond",
  "fa fa-paper-plane-o",
  "fa fa-anchor",
  "fa fa-bolt",
  "fa fa-cube",
  "fa fa-leaf",
  "fa fa-bicycle",
  "fa fa-bomb"];

// grab the container for all the cards
const cardDeck = document.querySelector(".deck");

// create an array for tracking open cards
let openCards = [];
// create an array for tracking current cards clicked
let flippedOptions = [];
// create a variable to track moves
let moves = 0;

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

// shuffle the cards
cardOptions = shuffle(cardOptions);

// define behavior when a card is clicked
function cardClick(val) {
  val.addEventListener("click",function(){

    displayCard(this); // display card

    addToOpen(this); // add classes to card

    if (flippedOptions.length === 2) { // when there are two cards open

      openCards = cardDeck.querySelectorAll(".open"); // find the HTML of the open cards

      if (flippedOptions[0] === flippedOptions[1]){  //compare the values of the open cards for a match
        cardMatch(); // if match
      } else {
        cardNoMatch(); // if no match
      };

      flippedOptions = []; // reset open card values for more attempts

    };


    incrementMoves();


    // if all cards are matched, pop-up dialog and display score
      // check for all cards matched
      matchWinner();
  });
};




function displayCard(val){
  if (!val.classList.contains("match") && !val.classList.contains("open") && flippedOptions.length < 2){ //card clicked is not a match already, nor open already, and there aren't already 2 cards open
    val.className += " open show"; // display card
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
};


function cardNoMatch(){ // when there is not a match
  setTimeout(function(){
    openCards.forEach(function(card){ // for each open card HTML
      card.classList.remove("open","show"); // remove classes to hide card
    });

    openCards = []; // reset list of open cards
  }, 1500); // after 5 seconds
};


function incrementMoves(){
  moves += 1; // increment moves taken
  // based on number of moves taken, remove stars
};


function matchWinner(){
  // stop timer
  // congratulations pop-up
  // display final score (timer and stars)
  // ask to restart
};

function restart(){
  initialize();
  //reset timer
  //reset stars
  //reset moves
};


// prepare the game
function initialize() {
  for (let i = 0; i < cardOptions.length; i++){ // perform function on each value in the card list

    let card = document.createElement('li'); // create a list item element and store it in a variable

    card.className = "card"; // add a class to that list item variable

    card.innerHTML = `<i class="${cardOptions[i]}"></i>`; // insert the current value from the card list inside the list item variable

    cardDeck.appendChild(card); // add the entire card to the card container

    cardClick(card); // add the click listener to the card

  };

};

// run the prep function
initialize();

// on first card click, start timer



/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
