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
let matchCheck = [];
let moves = 0;

const restart = () => {
    moves = 0;
    matchCheck = [];
    document.querySelector('.moves').innerText = moves;
    randomize(tiles);
}

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

// randomizes and resets cards at start and restart of game
const randomize = (array) => {
    // Clone given array
    let matches = shuffle(array.slice(0));

    // Select all cards
    const cards = document.querySelectorAll('.card');


    cards.
        forEach(card => card
            .firstElementChild
            .className = `fa ${matches.pop()}`
        );

    cards.forEach(card => card.className = 'card');
}

// reveal and flip each card while adding the type of card to matchCheck array
const flipCard = (event) => {
    // store potential matches
    matchCheck
    .push(event.target.firstElementChild.className
    .split(' ')
    .filter(word => word != 'fa')
    .toString()
    )
    // flip cards
    event.target.classList.toggle('open');
    event.target.classList.toggle('show');
    event.target.classList.toggle('animated');
    event.target.classList.toggle('flipInY');
    // prevents unconfirmed matches from being confirmed as matches
}

// matchSuccess and matchFail handle what occurs after a success or failure of a match
const matchSuccess = (targets) => {
    // reset match checker
    matchCheck = [];
    // locks in matches
    targets.forEach(match => {
        if (match.classList.contains('fail')) {
            return match.className = 'card';
        } else {
            return match.className = 'card open match animated tada'
        }
    });
}

const matchFail = (targets) => {
    targets.forEach(match => match.className = 'card open fail animated shake');
    // reset match checker
    matchCheck = [];
    // flip over failed match
    setTimeout(() => {
        return targets.forEach(card => card.className = 'card');
    }, 1000)
}

const moveCounter = () => {
    moves += 1;
    document.querySelector('.moves').innerText = moves;
}

document.querySelector('.deck').addEventListener('click', (event) => {

    if (event.target.classList.contains('card')) {
        if (!event.target.classList.contains('match')) {
            // trigger flip on clicked card and add it to matchCheck array
            flipCard(event);

            if (matchCheck.length === 2) {
                // organize currently revealed cards and manipulate them using an if statement
                const openCards = document.querySelectorAll('.show');
                
                // increment moves
                moveCounter();

                // on successful match
                if (matchCheck[0] === matchCheck[1]) {
                    matchSuccess(openCards)
                } else {
                    matchFail(openCards);
                }
            }
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
