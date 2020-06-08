const cards = document.querySelectorAll('.memory-card');

let hasCardFlipped = false;
let lockGame = false;
let firstCard, secondCard;


function flipCard() {
  if (lockGame) return;
  if (this === firstCard) return;
  this.classList.add('flip');
  

  if (!hasCardFlipped ) {
    // first click
    hasCardFlipped  = true;
    firstCard = this;

  } else {
    // second click
    hasCardFlipped  = false;
    secondCard = this;


    if (firstCard.dataset.framework === secondCard.dataset.framework) {
      // if it matches
      firstCard.removeEventListener('click', flipCard);
      secondCard.removeEventListener('click', flipCard);
      resetLock()
    } else {
      lockGame = true;
      // if it doesn't match
      setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetLock()
      }, 1500);
    }
  }
}

function resetLock() {
  [hasCardFlipped, lockGame] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function congratulations(){
  if (cards.length === 12){
      modal.classList.add("show") 
  }
}

(function shuffleCards() {
  cards.forEach(card => {
  let randomShuffle = Math.floor(Math.random() * 12);
  card.style.order = randomShuffle;
  });
})()

cards.forEach(card => card.addEventListener('click', flipCard));