$(function() {
  console.log('app.js linked');
  // game play section will go here
});

// functions and object constructors go here

// function to make a random number, with a min and max value
function randNum(min, max) {
  return Math.ceil(Math.random() * (max - min)) + min;
}

// function to build a new deck of card objects
function makeDeck() {
  var names = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
  var suits = ['clubs', 'diamonds', 'hearts', 'spades'];

  var deck = []; // initialize the deck
  for (var x = 0; x < suits.length; x++) {
    for (var y = 0; y < names.length; y++) {
      var card = new Card(suits[x], names[y]);
      deck.push(card);
    }
  }
  // at this point, there's an ordered deck array
  // now shuffle the deck
  var shuffled = [];
  shuffled = shuffle(deck);
  return shuffled;
} // end of make deck

// function to shuffle an array into a random order
// fisher yates shuffle
function shuffle(arr) {
  var x = 0;
  var y = 0;
  var temp = null;

  for (x = 0; x < arr.length; x++) {
    y = Math.floor(Math.random() * arr.length);
    temp = arr[x];
    arr[x] = arr[y];
    arr[y] = temp;
  }

  return arr;
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
} // end of card points

// card objects constructor
function Card(suit, val) {
  this.val = val;
  this.suit = suit;
  this.points = cardPoints(val);
}

// hand constructor - dealer or player will pass through this hand when called
function Hand(player) {
  this.player = player; // will store 1 to signify player, or 2 to signify dealer
  this.cards = []; // to store an array of card objects
  this.points = 0; // to store the running total of points on the hand
  this.hits = 0; // to keep track of the number of hits made
  this.stay = false; // a place to store whether the hand is at stay state. initially set to false
  this.bust = false; // initially set bust to false
  this.blackjack = false; // initially set blackjack to false
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
};

// set stay to true
Hand.prototype.setStay = function() {
  this.stay = true;
};

// check for a bust
Hand.prototype.isBust = function () {
  if (this.points > 21) {
    this.bust = true;
  }
};

// check for a blackjack
Hand.prototype.isBlackjack = function () {
  if (this.points === 21) {
    this.blackjack = true;
  }
};

// check if the hand is playable
// rule is different for the dealer vs the player
// player being passed through is the current player from the game object
Hand.prototype.playable = function() {
  if ((this.player === 0) && (this.points < 17)) { // if it's the dealer
    return true;
  } if ((this.player === 1) && (this.points < 21)) { // if it's the player
    return true;
  } else {
    return false;
  }
};
// end of hand object and prototypes //

// game object
var game = {
  player: '', // will store a hand object
  dealer: '', // will store another hand object
  currHand: [],
  deck: [], // initially a blank array
  winner: '', // will store the winner (1 or 0)
  playable: true, // keeps track of the state of the game, if it can continue play
  // start the game function
  start: function() {
    this.player = new Hand(1);
    this.dealer = new Hand(2);
    this.currPlayer = 1; // set the curr player indicator
    this.deck = makeDeck(); // make and shuffle a new deck
    this.hit(this.player); // deal the player
    this.hit(this.dealer); // then deal the dealer
    this.hit(this.player); // deal the player again
    this.hit(this.dealer); // then deal the dealer
    console.log('after the game starts...');
    console.log('the current player: ' + game.currPlayer);
    console.log('deck count: ' + game.deck.length);
    console.log('points on the player hand: ' + game.player.points);
    console.log('hits on the player hand: ' + game.player.hits);
    console.log('points on the dealer hand: ' + game.dealer.points);
    console.log('hits on the dealer hand: ' + game.dealer.hits);
  }, // end of start game
  // deal a card
  hit: function(p) {
    // get the first card from the deck
    var card = this.deck.shift();
    p.addCard(card); // add card
    p.calcPoints(); // calc points on the hand
    if (p.cards.length > 2) { // add to hit count if more than 2 cards on the hand
      p.hits ++;
    }
  }, // end of hit
  // stay
  stay: function(p) {
    // change the hand stay status to true
    p.setStay();
    // change current player to the dealer
    this.currPlayer --; // subtract 1 from the curr player (1) to get to the dealer (0)
  }
} // end of game object

// test the game object
// game.start();
// game.hit(game.player);
// game.hit(game.dealer);
// game.stay(game.player);
// game.stay(game.dealer);