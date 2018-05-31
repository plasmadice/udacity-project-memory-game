/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

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

const tiles = [
    'fa-diamond', 'fa-diamond', 
    'fa-paper-plane-o', 'fa-paper-plane-o', 
    'fa-anchor', 'fa-anchor', 
    'fa-bolt', 'fa-bolt', 
    'fa-leaf', 'fa-leaf', 
    'fa-bicycle', 'fa-bicycle', 
    'fa-bomb', 'fa-bomb',
    'fa-cube', 'fa-cube'
];

// Grabs all of a particular element and removes them
const startCards = (array) => {
    // Clone given array
    let matches = shuffle(array.slice(0));

    // Select all cards
    const cards = document.querySelectorAll('.card');


    cards.
        forEach(card => card
            .firstElementChild
            .className = `fa ${matches.pop()}`
        );
}

// .open for preview color and .show for reveal

const cards = document.querySelectorAll('.card');
// Event Listener for clicks on the deck
document.querySelector('.deck').addEventListener('click', (event) => {
    // Only trigger from card clicks
    if (event.target.classList.contains('card')) {
        if (event.target.classList.contains('match')) {
            console.log('Already a match');
        } else {
            event.target.classList.toggle('open');
            event.target.classList.toggle('show');
            console.log(event.target.classList.value);
            console.log(event.target.firstElementChild.classList);
            setTimeout(() =>
                event.target.className = 'card', 
                2500);
        }
    }
});


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
