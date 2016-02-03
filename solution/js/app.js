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

// card constructor
function Card(suit, val) {
  this.val = val;
  this.suit = suit;
  this.points = 0;
}

// determine the point value of each card getting generated and store it on the card
Card.prototype.calcPoints = function() {
  switch (this.val) {
    case 'J': case 'Q': case 'K':
      this.points = 10;
      break;
    case 'A':
      this.points = 11;
      break;
    default: // the remainder of cards are 1 - 10 and are worth the numerical value
      this.points = parseInt(this.val);
  }
  console.log(this.points);
};
