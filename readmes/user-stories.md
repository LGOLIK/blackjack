# Blackjack proposal
This will be a website where you can play blackjack against the dealer and accumulate your winnings.

# Blackjack wireframes
![](pics/start-afterstart.jpg)

![](pics/afterhit-gameresults.jpg)

![](pics/play-again.jpg)

# Blackjack user stories

## at the start of the game
- as a player I start off with 1000 in the bank
- player can enter name
- as a player I can start a game
- as a player when I start the game, I have to select one of 4 bets: 10, 25, 50, 100

## at the initial game outset
- bet amount is subtracted from the bank
- bet amount is added to the bet
- a new deck is shuffled
- the player is dealt 2 cards are dealt face up
- the dealer is dealt 2 cards, first card up, the second card down
- if either the dealer or player has 21 after the first play, the game ends and shows results

## during game play
- the player goes first
- the player can choose to hit or stay
- when the player hits, they are dealt a new card from the deck
- after each hit the game checks for bust or blackjack
- the player can hit up to 5 times if there is no bust or blackjack
- if the player makes blackjack, the results show and the player wins 1.5 times the bet
- if the player busts, the results show and the dealer wins
- when the player stays, the dealer's turn is computed
  - the dealer will hit while their card total is under 17
  - the dealer will stay on the scores 17 - 20
  - the dealer
- a winner is determined
  - player blackjack = player win
  - player bust = player loss
  - dealer blackjack = dealer win
  - dealer bust = dealer loss
  - dealer and player stay = person with higher number wins
- after a winner is determined, the game ends

## game results
- the dealer cards are shown
- text is generated to tell the outcome
- if player wins, bank is increased by bet * 2
- if player makes blackjack, bank is increased by bet * 2.5
- if dealer wins, bank is not adjusted
- bet amount is removed
- options are available to start over, buy more money (if i get to it), or end game

## start over
- all cards are removed from the table
- player can start a new game
- player must select a bet to play

## BONUS
- handling A value of 11 or 1, rather than just 11
- player ability to split
- player ability to double down
