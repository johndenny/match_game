import React from "react";

export const ModalWindow = (props) => {

  const startGame = () => {
    const cardsArray = [...document.querySelectorAll('.cardSidesWrapper')];
    setTimeout(() => {cardsArray.forEach((element) => element.classList.add('derotate'))}, 3000);
    setTimeout(() => {
      cardsArray.forEach((element) => element.classList.remove('derotate', 'rotate'));
      props.allowChange()
    }, 4000);
    document.querySelector('.startButton').disabled = true;
    document.querySelector('.modal').classList.add('fadeOut');
    setTimeout(() => {
      props.allowGameStart();
      cardsArray.forEach((element) => element.classList.add('rotate'));  
    }, 400);
  }

  return (
    <div className="modal">
      <div className="modalContent">
        {props.matchCount === 10
        ? <h1>Game Over!</h1>
        : <h1>Match Game</h1>
        } 
        {props.matchCount === 10
        ? <button className="newGameButton" onClick={props.scoreReset}>New Game</button>
        : <button className="startButton" onClick={startGame}>PLAY</button>
        }        
      </div>    
    </div>

  )
}