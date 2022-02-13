import React, { useState, useEffect } from "react";
import uniqid from 'uniqid';
import { Interface } from "./Interface";
import { ModalWindow } from "./ModalWindow";

export const GameBoard = (props) => {
  const [cardOrder, setCardOrder] = useState([1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10]);
  const [randomArray, setRandomArray] = useState([]);
  const [jsxArray, setJsxArray] = useState([]);
  const [allowClick, setAllowClick] = useState(false);
  const [cardMatch, setCardMatch] = useState([]);
  const [matchCount, setMatchCount] = useState(0);
  const [count, setCount] = useState(0);
  const [gameStart, setGameStart] = useState(false);

  const scoreReset = () => {
    [...document.querySelectorAll('.cardSidesWrapper')].forEach((element) => element.classList.add('derotate'));
    setTimeout(() => {
      [...document.querySelectorAll('.cardSidesWrapper')].forEach((element) => element.classList.remove('derotate', 'rotate'));
      props.highScoreUpdate(count);
      setMatchCount(0);
      setCount(0);
      randomizeJsxArray();                
    }, 1000);
  }

  const cardFlip = (event) => {
    document.querySelectorAll('.cardSidesWrapper').forEach((element) => element.classList.add('disabled'));
    const { id } = event.target;
    const { card } = event.target.dataset
    event.target.classList.add('rotate');
    setCount((count) => count + 1);
    setCardMatch((cardMatch) => [...cardMatch, [id, card]])
  };

  const matchCheck = () => {
    if (cardMatch.length === 2) {
      if (cardMatch[0][1] === cardMatch[1][1]) {
        setMatchCount((matchCount) => matchCount + 1);
        setCardMatch([]);
        document.querySelectorAll('.cardSidesWrapper').forEach((element) => element.classList.remove('disabled'));
        return
      }
      setTimeout(() => {
      document.getElementById(cardMatch[0][0]).classList.add('derotate');
      document.getElementById(cardMatch[1][0]).classList.add('derotate');
      setCardMatch([]);        
      }, 1000)
      setTimeout(() => {
        document.getElementById(cardMatch[0][0]).classList.remove('derotate', 'rotate');
        document.getElementById(cardMatch[1][0]).classList.remove('derotate', 'rotate');
        document.querySelectorAll('.cardSidesWrapper').forEach((element) => element.classList.remove('disabled'));
      }, 2000)
      return
    }
    setTimeout(() => {
      document.querySelectorAll('.cardSidesWrapper').forEach((element) => element.classList.remove('disabled'));      
    }, 1000);
  }

  const winCheck = () => {
    if (matchCount === 10) {
      setTimeout(() => {
        setGameStart(false);        
      }, 1000);
    };
  };

  useEffect(() => {
    matchCheck();
    winCheck();
    console.log(cardMatch)
  },[cardMatch,matchCount]);

  const allowClickChange = () => {
    setAllowClick(true);
  }

  const allowGameStart = () => {
    setGameStart(true);
  }

  const randomArrayIndex = (array) => { 
    const index = Math.floor(Math.random() * array.length);
    return index
  }
  const newRandomArray = () => {
    const standardArray = cardOrder;
    const newArray = [];
    while (standardArray.length !== 0) {
      const randomIndex = randomArrayIndex(standardArray);
      newArray.push(standardArray[randomIndex]);
      standardArray.splice(randomIndex, 1);
    }
    setRandomArray(newArray);
  };

  useEffect(() => {
    newRandomArray()
  },[]);
  
  const addJSXtoArray = () => {
    const heart = (
    <svg xmlns="http://www.w3.org/2000/svg" width="2vh" height="2vh" fill="currentColor" className="bi bi-suit-heart-fill" viewBox="0 0 16 16">
      <path d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1z"/>
    </svg>
    )
    const newArray = randomArray;
    const jsxArray = newArray.map((number) =>
    <div 
      className="cardSidesWrapper"
      {... allowClick ? {onClick: cardFlip} : {}}
      id={uniqid()}
      data-card={number}
      key={uniqid()}
    >
      <div className="backSide">
        <div className="backgroundWrapper">
          <div className="cardBackBorder">
          </div>          
        </div>
      </div>
      <div className="frontSide">
        {number === 1 && 
        <div className="fontWrapper">
          <div className="cardLeft">
            <div className="numberAndSymbolWrapper">
              A{heart}
            </div>            
          </div>
          <div className="symbolWrapperOne">
            {heart}
          </div>
          <div className="cardRight">
            <div className="numberAndSymbolWrapper">
              A{heart}
            </div>        
          </div>
        </div>
        }
        {number === 2 &&
        <div className="fontWrapper">
          <div className="cardLeft">
            <div className="numberAndSymbolWrapper">
              {number}{heart}
            </div>             
          </div>
          <div className="symbolWrapper">
            {heart}{heart}
          </div>
          <div className="cardRight">
            <div className="numberAndSymbolWrapper">
              {number}{heart}
            </div>        
          </div>
        </div>
        }
        {number === 3 &&
        <div className="fontWrapper">
          <div className="cardLeft">
            <div className="numberAndSymbolWrapper">
              {number}{heart}
            </div>             
          </div>
          <div className="symbolWrapper">
            {heart}{heart}{heart}
          </div>
          <div className="cardRight">
            <div className="numberAndSymbolWrapper">
              {number}{heart}
            </div>        
          </div>
        </div>
        }
        {number === 4 &&
        <div className="fontWrapper">
          <div className="cardLeft">
            <div className="numberAndSymbolWrapper">
              {number}{heart}
            </div>             
          </div>
          <div className="symbolWrapper4">
            <div className="symbolLeft">
              {heart}{heart}
            </div>
            <div className="symbolRight">
              {heart}{heart}
            </div>
          </div>
          <div className="cardRight">
            <div className="numberAndSymbolWrapper">
              {number}{heart}
            </div>        
          </div>
        </div>
        }
        {number === 5 &&
        <div className="fontWrapper">
          <div className="cardLeft">
            <div className="numberAndSymbolWrapper">
              {number}{heart}
            </div>             
          </div>
          <div className="symbolWrapper4">
            <div className="symbolLeft">
              {heart}{heart}
            </div>
            <div className="symbolRight">
              {heart}{heart}
            </div>
            <div className="symbolCenter">
              {heart}
            </div>
          </div>
          <div className="cardRight">
            <div className="numberAndSymbolWrapper">
              {number}{heart}
            </div>        
          </div>
        </div>
        }
        {number === 6 &&
        <div className="fontWrapper">
          <div className="cardLeft">
            <div className="numberAndSymbolWrapper">
              {number}{heart}
            </div>             
          </div>
          <div className="symbolWrapper4">
            <div className="symbolLeft">
              {heart}{heart}{heart}
            </div>
            <div className="symbolRight">
              {heart}{heart}{heart}
            </div>
          </div>
          <div className="cardRight">
            <div className="numberAndSymbolWrapper">
              {number}{heart}
            </div>        
          </div>
        </div>
        }
        {number === 7 &&
        <div className="fontWrapper">
          <div className="cardLeft">
            <div className="numberAndSymbolWrapper">
              {number}{heart}
            </div>             
          </div>
          <div className="symbolWrapper4">
            <div className="symbolLeft">
              {heart}{heart}{heart}
            </div>
            <div className="symbolRight">
              {heart}{heart}{heart}
            </div>
            <div className="symbolCenter7">
              {heart}{heart}
            </div>
          </div>
          <div className="cardRight">
            <div className="numberAndSymbolWrapper">
              {number}{heart}
            </div>        
          </div>
        </div>
        }
        {number === 8 &&
        <div className="fontWrapper">
          <div className="cardLeft">
            <div className="numberAndSymbolWrapper">
              {number}{heart}
            </div>             
          </div>
          <div className="symbolWrapper4">
            <div className="symbolLeft">
              {heart}{heart}{heart}
            </div>
            <div className="symbolRight">
              {heart}{heart}{heart}
            </div>
            <div className="symbolCenter8">
              {heart}{heart}
            </div>
          </div>
          <div className="cardRight">
            <div className="numberAndSymbolWrapper">
              {number}{heart}
            </div>        
          </div>
        </div>
        }
        {number === 9 &&
        <div className="fontWrapper">
          <div className="cardLeft">
            <div className="numberAndSymbolWrapper">
              {number}{heart}
            </div>             
          </div>
          <div className="symbolWrapper9">
            <div className="symbolLeft">
              {heart}{heart}{heart}{heart}
            </div>
            <div className="symbolRight">
              {heart}{heart}{heart}{heart}
            </div>
            <div className="symbolCenter9">
              {heart}{heart}
            </div>
          </div>
          <div className="cardRight">
            <div className="numberAndSymbolWrapper">
              {number}{heart}
            </div>        
          </div>
        </div>
        }
        {number === 10 &&
        <div className="fontWrapper">
          <div className="cardLeft">
            <div className="numberAndSymbolWrapper">
              {number}{heart}
            </div>             
          </div>
          <div className="symbolWrapper9">
            <div className="symbolLeft">
              {heart}{heart}{heart}{heart}
            </div>
            <div className="symbolRight">
              {heart}{heart}{heart}{heart}
            </div>
            <div className="symbolCenter10">
              {heart}{heart}
            </div>
          </div>
          <div className="cardRight">
            <div className="numberAndSymbolWrapper">
              {number}{heart}
            </div>        
          </div>
        </div>
        }                
      </div>      
    </div> 
    );
    setJsxArray(jsxArray);
  };

  useEffect(() => {
    addJSXtoArray();
  },[allowClick, randomArray]);

  const randomizeJsxArray = () => {
    const oldJsxArray = jsxArray;
    const newArray = [];
    while (oldJsxArray.length !== 0) {
      const randomIndex = randomArrayIndex(oldJsxArray);
      newArray.push(oldJsxArray[randomIndex]);
      oldJsxArray.splice(randomIndex, 1);
    }
    setJsxArray(newArray);    
  }

  return (
    <React.Fragment>
      <div className="cardsWrapper">
        {jsxArray}
      </div>
      {!gameStart && 
        <ModalWindow 
          allowChange={allowClickChange}
          allowGameStart={allowGameStart}
          scoreReset={scoreReset}
          matchCount={matchCount}
        />
      }
      <Interface count={count} matchCount={matchCount} highScore={props.highScore}/>      
    </React.Fragment>

  );
};