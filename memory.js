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

const timerMins = 0.5;
let time = timerMins * 60;

const timerCount = document.getElementById('timer');
let timeDown=setInterval(startTimer, 1000);

function startTimer() {
  const minutes = Math.floor(time / 60);
  let seconds = time % 60;

  seconds = seconds < 10 ? '0' + seconds : seconds;

  timerCount.innerHTML = `${minutes}: ${seconds}`;
  time--;
  
  
  

  if(time == -1){
   
    clearInterval(timeDown);
    cards.forEach(card => card.removeEventListener('click', flipCard));
    alert("YOU LOSE!");
  }
}

function resetLock() {
  [hasCardFlipped, lockGame] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffleCards() {
  cards.forEach(card => {
  let randomShuffle = Math.floor(Math.random() * 12);
  card.style.order = randomShuffle;
  });
})()

cards.forEach(card => card.addEventListener('click', flipCard));

/*
let second = 30, minute = 0;
let timer = document.querySelector('.timer');
let interval;
timer.innerHTML =  minute+'mins '+second+'secs';

function startTimer(){
    interval = setInterval(function(){
        timer.innerHTML = minute+'mins '+second+'secs';
        second--;
    },1000);
}*/