# Constructor objects, objects and arrays

## Deck
```javascript
var deck = {
  hearts: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', J, Q, K, A]
}
```
## Card(player, suit, val)
*New card object will be generated every time a card is dealt.*

Constructor object with the following properties:
- **player** will be the player or dealer, passed through when object is made
- **val** will store the value passed through (1 - 10, J, Q, K, A)
- **suit** will store the suit of the card
- **points** initially 0
