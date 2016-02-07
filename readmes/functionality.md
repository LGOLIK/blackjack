# Constructor objects, objects and arrays

## Deck

This may need to be a con
```javascript
var deck = {
  hearts: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'],
  diamonds: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'],
  spades: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'],
  clubs: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']
}

or
function Deck() {
  this.hearts = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
  this.diamonds = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
  this.spades = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
  this.clubs = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
}
```
## Card(suit, val)
*New card object will be generated every time a card is dealt.*

Constructor object with the following properties:
- **val** will store the value passed through (1 - 10, J, Q, K, A)
- **suit** will store the suit of the card
- **points** initially 0

and methods:
- **calcPoints()** will determine the point value based on the card val

## Hand()
*an object that will store each player's hand (you and the dealer)*

Constructor object with the following properties:
- **cards** an array of each of the player's or dealer's card objects, initially []
- **points** initially 0
- **hits** initially 0

and methods:
- **addCard()** will add a new card object to the array of cards
- **calcPoints()** will add the points from the current card to the points on the hand
- **setHits()** will add 1 to hits
- **bust()** returns true if points > 21
- **blackjack()** returns true if points = 21
- **playable()** returns true if points < 21 and hits < 5

## game (object literal)
Should have the following properties
- a player
- a dealer
- a current player
- a winner
- playable
- a deck of cards

functions include
- start game
  - create player hand object - done
  - create dealer hand object - done
  - set current player to player - done
  - shuffle the deck *** - done
    - build a new deck
    - shuffle it
  - hit the dealer twice - done
  - hit the player twice - done
- hit(player) - done
  - adds one card to the current player's hand
  - if moves are > 2, it adds a hit count to the player's hand
- stay(player) - done
  - player stay status changes to true
  - current player changes from player to dealer or from dealer to end
- isBlackjack(player) - done
- isBust(player) - done
- isWinner - checks for the winner after both dealer and player stay - done
  - dealer and player stay = person with higher score wins
- dealerMoves - done
  - while loop
