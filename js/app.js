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
let matchCount = 0;
let moves = 0;

const restart = () => {
    stopWatch('initialize');
    stopWatch('reset');
    moves = 0;
    matchCount = 0;
    matchCheck = [];
    document.querySelector('.moves').innerText = moves;
    document.querySelector('.stars').outerHTML = `<ul class="stars">
        <li><i class="fa fa-star"></i></li>
        <li><i class="fa fa-star"></i></li>
        <li><i class="fa fa-star"></i></li>
        <li><i class="fa fa-star"></i></li>
        <li><i class="fa fa-star"></i></li>
    </ul>`
    randomize(tiles);
}

const starScore = (moves) => {
    // wipes previous stars first
    const element = document.querySelector('.stars');
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

const removeStar = () => {
    if (document.querySelector('.stars').childElementCount === 1) {
        return null;
    }
    const starContainer = document.querySelector('.stars');
    const firstStar = starContainer.querySelector('li');
    starContainer.removeChild(firstStar);
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

// tingle modal js
var modal = new tingle.modal({
    footer: true,
    stickyFooter: false,
    closeMethods: ['overlay', 'button', 'escape'],
    closeLabel: "Close",
    cssClass: ['custom-class-1', 'custom-class-2'],
    onOpen: function() {
        console.log('modal open');
    },
    onClose: function() {
        console.log('modal closed');
    },
    beforeClose: function() {
        // here's goes some logic
        // e.g. save content before closing the modal
        return true; // close the modal
        return false; // nothing happens
    }
});

// Updates information in modal
const modalContents = () => {
    const scoreDisplay = () => {
        return document.querySelector('.stars').childElementCount;
    }
    
    const timerDisplay = () => {
        return document.querySelector('#timer').innerText;
    }

    modal.setContent('<h1>Game Finished!</h1>');

    modal.setFooterContent(`<h3>
        Score: ${scoreDisplay()}/5
        <br>
        Duration: ${timerDisplay()}
    </h3>`)

    modal.addFooterBtn('Restart', 'tingle-btn tingle-btn--primary tingle-btn--pull-right', function() {
        restart();
        modal.close();
    });
}

// matchSuccess and matchFail handle what occurs after a success or failure of a match
const matchSuccess = (targets) => {
    const finishGame = () => {
        stopWatch('stop');
        modal.open();
    }
    // reset match checker
    matchCheck = [];
    matchCount += 1;
    // locks in matches
    targets.forEach(match => {
        if (match.classList.contains('fail')) {
            return match.className = 'card';
        } else {
            return match.className = 'card open match animated tada'
        }
    });

    if (matchCount === 8) {
        modalContents();
        finishGame();
    }
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

// move logic, removes stars
const moveLogic = () => {
    if (moves >= 15 && moves % 5 === 0) {
        removeStar();
    }
}

const moveCounter = () => {
    moves += 1;
    // remove stars based on number of moves;
    moveLogic();
    document.querySelector('.moves').innerText = moves;
}

document.querySelector('.deck').addEventListener('click', (event) => {

    if (event.target.classList.contains('card')) {
        if (!event.target.classList.contains('match')) {

            if (moves === 0 && matchCheck.length === 0) {
                stopWatch('start');
            }

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

document.querySelector('.fa-repeat').addEventListener('click', restart)

// stopwatch courtesty of https://www.cssscript.com/lightweight-javascript-timer-library-timer-js/
const stopWatch = (command) => {
    if (command === 'initialize') {
        Timer.init('timer');
    } else if (command === 'start') {
        Timer.start();
    }else if (command === 'stop') {
        Timer.stop();
    } else if (command === 'reset') {
        Timer.reset();
    }
}


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
