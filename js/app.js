$(function() {
  console.log('app.js linked');

  // hide the make play and end buttons once the page is loaded
  $('.play').hide();
  $('.end').hide();

  // when one of the bet buttons is clicked, start the game
  $('.bet').on('click', $startGame);
  var bet = parseInt($(this).val()); // bet is the value of the button clicked
  var bank = parseInt($('#bankAmt').text()); // bank is the amount in the bank box

  // when the hit button is clicked
  $('.hit').on('click', $hit);

  // when the stand button is clicked
  $('.stand').on('click', function $stand(){
    game.dealerMoves(); // perform the dealer's moves
    $showDealer(); // show the dealer's cards on the page
    $endGame(); // end the game
  });

  // when the play again button is clicked
  $('.end').on('click', function $startOver() {
    event.stopProbagation;
    $('.end').hide(); // hide the play again button
    $('.bet').show(); // show the bet buttons, which call the start game function
    $('#message').text('Place a bet to start the game'); // change the message text
    $('.card').remove(); // remove all of the cards
    $('.dealer-header').empty(); // remove the dealer children
    $('.player-header').empty(); // remove the player header children
  });
});

// functions and object constructors go here

function $startGame() {
  event.stopProbagation;
  game.start(); // start the game object
  var bet = parseInt($(this).val()); // bet is the value of the button clicked
  var bank = parseInt($('#bankAmt').text()); // bank is the amount in the bank box
  $startBank(bet, bank);
  $('.bet').hide(); // hide the bet buttons
  // add the player and dealer headers
  $('.dealer-header').append("<h5>Dealer's cards</h5>");
  $('.player-header').append("<h5>Your cards</h5>");

  $startDeal(); // deal the starting hands
  // set the first dealer card to have the same color as the background
  $('.card p:first').css("color", "white");
  $checkWinner(); // check for a winner
} // end $start

function $hit() {
  var currPlayer = game.currPlayer;
  game.hit(game.players[currPlayer]); // deal the current player a card

  // these variables can only be defined after the card is dealt
  var lastCardID = game.players[currPlayer].cards.length-1;
  var lastCard = game.players[currPlayer].cards[lastCardID];

  $dealCard(currPlayer, lastCard.val, lastCard.suit); // display that card on the page
  $checkWinner(); // check for a winner
} // end $hit

// function to check for a winner - used in $hit and $start events
function $checkWinner() {
  // check for a winner. if there is one, end the game, since there's only 2 players
  if (game.winner !== '') {
    $endGame();
  } else {
    // there is no winner yet and the current player should be making a move
    var currPlayer = game.currPlayer;
    $('.play').show();
    $('#message').text('You have ' + game.players[currPlayer].points + '. Hit or Stand?');
  }
}

// function to update the bet and bank at the start of the game
function $startBank(bet, bank) {
  if (bet < bank) {
    bank -= bet; // subtract the bet from the bank
    $('#betAmt').text(bet); // place the bet amount on the bet view
    $('#bankAmt').text(bank); // place the updated bank amount on the bank view
  } else {
    alert("You don't have enough money to do that. Go home!")
  }
} // end $startBank

//function to end the game, passing through the winning player object
function $endGame() {
  var currPlayer = game.currPlayer;
  var winnerID = game.winner;
  var winner = game.players[winnerID];
  var loserID = game.loser;
  var loser = game.players[loserID];
  var bank = parseInt($('#bankAmt').text());
  var bet = parseInt($('#betAmt').text());
  // now show the dealer's first card value
  $('.card p:first').css("color", "");

  $endMessage(winner, winnerID, loser, loserID, bank, bet); // update the message bar
  $endBank(winner, winnerID, bank, bet); // update the bet and bank values

  $('.play').hide(); // hide the play buttons
  $('.end').show();  // show the end of game button
}

// function to update the bank at the end of the game
function $endBank(winner, winnerID, bank, bet) {
  if (winnerID > 0 && winner.blackjack) { // if winner is not the dealer
    bank += bet * 2.5; // to add original bet back, and to pay out 1.5 on the bet
  } else if (winnerID > 0) {
    bank += bet * 2;
  } else if (winnerID < 0) { // there's a tie
    bank += bet;
  }
  $('#bankAmt').text(bank); // updated bank amount on the bank view
  $('#betAmt').text(''); // clear the bet amount
} // end $endBank

// function to display end game message based on various scenarios.
function $endMessage(winner, winnerID, loser, loserID, bank, bet) {
  if (winnerID > 0 && game.players[winnerID].blackjack) { // player got a blackjack
    $('#message').text('Awesome! You got a blackjack! You win 3 to 2 on your bet. Keep the money rolling and play again!');
  } else if (winnerID === 0 && game.players[winnerID].blackjack) { // dealer got a blackjack
    $('#message').text('Ugh! The dealer got a blackjack! Keep on playing anyways!');
  } else if (loserID > 0 && loser.bust) { // player busted
    $('#message').text('Well that sucks! You busted. Try making up for it by playing again!');
  } else if (loserID === 0 && loser.bust) { // the dealer busted
    $('#message').text('Sweet! The dealer busted. You win ' + bet + '.');
  } else if (winnerID === 0) { // the dealer had a higher score
    $('#message').text('You lose! You have ' + loser.points + ', while the dealer has ' + winner.points + '. Play again and turn your luck around.');
  } else if (winnerID > 0) { // player had a higher score
    $('#message').text('You win ' + bet + '! You have ' + winner.points + ', while the dealer has ' + loser.points + '. Play again to keep the momentum going!');
  } else if (winnerID < 0) { // it's a tie
    $('#message').text('You tied. You got ' + bet + ' back! May the odds be ever in your favor.');
  } else {
    $('#message').text('Something is wrong.');
  }
} // end of $endMessage

// function to deal the starting hand
function $startDeal() {
  // deal the 2 cards in alternating order on the page
  var hands = game.players;
  var currPlayer = game.currPlayer;
  var dealer = currPlayer-1;
  var firstCard = game.players[currPlayer].cards[0];

  // player first card
  var firstName = hands[currPlayer].cards[0].val;
  var firstSuit = hands[currPlayer].cards[0].suit;
  $dealCard(currPlayer, firstName, firstSuit);

  // dealer first card
  var secondName = hands[dealer].cards[0].val;
  var secondSuit = hands[dealer].cards[0].suit;
  $dealCard(dealer, secondName, secondSuit);

  // player second card
  var thirdName = hands[currPlayer].cards[1].val;
  var thirdSuit = hands[currPlayer].cards[1].suit;
  $dealCard(currPlayer, thirdName, thirdSuit);

  // dealer second card
  var fourthName = hands[dealer].cards[1].val;
  var fourthSuit = hands[dealer].cards[1].suit;
  $dealCard(dealer, fourthName, fourthSuit);
} // end $startDeal function

// function to show the dealer hand
function $showDealer() {
  var dealerHand = game.players[0].cards

  // show any additional cards dealt on the screen
  if (dealerHand.length > 2) { // if the dealer made any hits
    for (var i = 2; i < dealerHand.length; i++) { // start at the 3rd card
      var cardName = dealerHand[i].val;
      var cardSuit = dealerHand[i].suit;
      $dealCard(0, cardName, cardSuit);
    }
  }
} // end of $showDealer

// this function is used at the start of a game, as well as when a card is being hit
// p is the number signifying the player, n is the name of the card, s is the suit of the card
function $dealCard(p, n, s) {
  // add formatted card elements to the id of the player
  // assigning each newly created div class of card and suit to make sure they are unique items that a child can be appended to
  $("<div>").appendTo('#' + p).attr("class", "card").addClass(s).addClass(n).append("<p>" + n + "&" + s + ";</p>");
} // end $dealCard

// function to build a new deck of card objects
function makeDeck() {
  var names = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
  var suits = ['clubs', 'diamond', 'hearts', 'spades'];

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
// answer inferred from http://www.brainjar.com/js/cards/default2.asp
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
function Hand(p) {
  this.player = p; // will store 1 to signify player, or 0 to signify dealer
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
  if ((this.points === 21) && (this.cards.length === 2)) {
    this.blackjack = true;
  }
};

// end of hand object and prototypes //

// game object
var game = {
  start: function() {
    // reset the properties on the game
    this.deck = [];
    this.players = []; // will store a hand objects for all players
    this.currPlayer = ''; // 1 = player, 0 = dealer
    this.winner = ''; // 1 or 0
    this.loser = ''; // 1 or 0
    // create new hand objects for the player and dealer
    this.players.push(new Hand(0)); // dealer - ideally the game could be expanded to pass through the number of players
    this.players.push(new Hand(1)); // player
    this.currPlayer = this.players.length-1; // set the curr player indicator to the last player in the array

    // make and shuffle a new deck
    this.deck = makeDeck();

    // deal the cards out, starting with the player, 2 cards to each
    for (var i = this.currPlayer; i >= 0; i--) {
      this.hit(this.players[i]);
      this.hit(this.players[i]);
    }

    // check for a blackjack
    this.blackjack();
  }, // end of start game

  // deal a card
  hit: function(p) {
    // get the first card from the deck
    var card = this.deck.shift();
    p.addCard(card); // add card
    p.calcPoints(); // calc points on the hand
    if (p.cards.length > 2) {
      p.hits++; // add to hit count
      this.bust(p); // set winner and loser if there's a bust
    }
  }, // end of hit

  // stay
  stay: function(p) {
    // change the hand stay status to true
    p.setStay();
    // change current player to the dealer
    this.currPlayer--; // subtract 1 from the curr player (1) to get to the dealer (0)
  },

  blackjack: function() {
    // check for blackjack on all players
    // only happens after the first 2 cards are dealt when game starts
    // loop starts with the dealer, so in the scenario that both players get blackjack, winner shows as the player
    // this would need to be modified if changing the game to have more players
    for (var i = 0; i < this.players.length; i++) {
      this.players[i].isBlackjack();
      if (this.players[i].blackjack) {
        this.winner = i;
      }
    }
  }, // end of blackjack

  bust: function(p) {
    // determine winner, based whether a player has busted
    p.isBust(); // check the hand for a bust
    if (p.bust) {
      this.loser = this.currPlayer; // the person who just hit loses
      this.currPlayer--; // move to the next player
      if (this.currPlayer === -1) { // the dealer just busted
        this.winner = 1; // winner equals the player
      } else if (this.currPlayer === 0) { // the player just busted
        this.winner = this.currPlayer;
      }
    }
  }, // end of bust

  isWinner: function() { // this should only be called after a dealer stay
    var player = this.players[1].points;
    var dealer = this.players[0].points;

    if (player > dealer) {
      this.winner = this.currPlayer+2;
      this.loser = this.currPlayer+1;
    } else if (player < dealer) {
      this.winner = this.currPlayer+1;
      this.loser = this.currPlayer+2;
    } else { // there's a tie
      this.winner = this.currPlayer; // set to -1
      this.loser = this.currPlayer; // set to -1
    }
  }, // end of iswinner

  dealerMoves: function() {
    // hit while the dealer hand point value is less than 17 and the dealer has made less than 5 hits
    while (this.players[0].points < 17 && this.players[0].hits < 5) {
      this.hit(this.players[0]);
    }
    // check for bust
    this.bust(this.players[0]);
    // if the dealer didn't bust, check for winner
    if (this.winner === '') {
      this.stay(this.players[0]); // change the dealer stay status to true
      this.currPlayer--; // here we are setting the curr player to -1
      this.isWinner();
    }
  } // end of dealer moves}
} // end of game object
