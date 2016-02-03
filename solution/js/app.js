$(function() {
  console.log('app.js linked');
  // game play section will go here
});

// functions and object constructors go here

// here is a deck to use - may not be needed
var deck = {
  hearts: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'],
  diamonds: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'],
  spades: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'],
  clubs: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']
}

// function to determine the points a card is worth
function cardPoints(card) {
  switch (card) {
    case 'J': case 'Q': case 'K':
      return 10;
      break;
    case 'A':
      return 11;
      break;
    default: // the remainder of cards are 1 - 10 and are worth the numerical value
      return parseInt(card);
  }
}

// card constructor
function Card(suit, val) {
  this.val = val;
  this.suit = suit;
  this.points = cardPoints(val);
}

// hand constructor - dealer or player will pass through this hand when called
function Hand() {
  this.cards = []; // to store an array of card objects
  this.points = 0; // to store the running total of points on the hand
  this.hits = 0; // to keep track of the number of hits made
}

// add card to the array of cards, card being passed through is a newly created card object
Hand.prototype.addCard = function(card) {
  this.cards.push(card);
};

// add the points on the card object to the hand points
Hand.prototype.calcPoints = function() {
  // last card in the array is the last card dealt
  var cardIndex = (this.cards.length) - 1;
  this.points += this.cards[cardIndex].points;
  console.log(this.points);
};

// count the amount of hits done on the hand
// may not be needed
Hand.prototype.setHits = function () {
  this.hits++;
};

// check for a bust
Hand.prototype.bust = function () {
  if (this.points > 21) {
    return true;
  } else {
    return false;
  }
};

// check for a blackjack
Hand.prototype.blackjack = function () {
  if (this.points === 21) {
    return true;
  } else {
    return false;
  }
};

// check if the hand is playable
// rule is different for the dealer vs the player
Hand.prototype.playable = function(player) {
  if ((player === 'dealer') && (this.points < 17)) {
    return true;
  } if ((player !== 'dealer') && (this.points < 21)) {
    return true;
  } else {
    return false;
  }
};

// end of hand object and prototypes //
