'use strict';
//selecting Elements
const score0El= document.querySelector('#score--0');
const score1El= document.getElementById('score--1');
const diceEl= document.querySelector('.dice');
const btnNew=document.querySelector('.btn--new');
const btnRoll=document.querySelector('.btn--roll');
const btnHold=document.querySelector('.btn--hold');
const current0El=document.getElementById('current--0');
const current1El=document.getElementById('current--1');
const player0El=document.querySelector('.player--0');
const player1El=document.querySelector('.player--1');

let scores,currentScore,activePlayer,playing;


const init= function(){
    current0El.textContent=0;
    current1El.textContent=0;
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    document.getElementById(`score--0`).textContent=0;
    document.getElementById(`score--1`).textContent=0;
    scores=[0,0];
    currentScore=0;
    activePlayer=0;
    playing=true;
}

init();


const switchPlayer= function(){
    document.getElementById(`current--${activePlayer}`).textContent=0;
    currentScore=0;
    activePlayer=activePlayer===0?1:0;
   player0El.classList.toggle('player--active');
   player1El.classList.toggle('player--active');
}
 

diceEl.classList.add('hidden');

btnRoll.addEventListener('click',function(){
    if (playing){
    //Generating random dice roll
    const dice=Math.trunc(Math.random()*6)+1;
    //display dice
    diceEl.classList.remove('hidden');
    diceEl.src=`dice-${dice}.png`;
    //check if dice rolled 1
if (dice !==1){
    //add dice number to score
currentScore +=dice;
document.getElementById(`current--${activePlayer}`).textContent=currentScore;
}else{
    //swich player and continue
   switchPlayer();
}  
    }
});
//hold button click
btnHold.addEventListener('click',function(){
    if (playing){
    //add score to active player
    scores[activePlayer] +=currentScore;
    document.getElementById(`score--${activePlayer}`).textContent=scores[activePlayer];
  
    //check score>=100 yes -game finish active player win,no -continue
if (scores[activePlayer]>=100){
    playing=false;
    document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
    document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
    diceEl.classList.add('hidden');
}else {
  //swich to next player
  switchPlayer();
}
  }
});
//press new game button
btnNew.addEventListener('click',init);

