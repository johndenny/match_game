import React, { useEffect, useState } from "react";
import { GameBoard } from "./componenets/GameBoard";
import "./App.css";

const App = () => {
  const [gameboardPrint, setGameboardPrint] = useState(true);
  const [highScore, setHighScore] = useState (() => {
    const saved = localStorage.getItem("highScore");
    return saved || '';
  });

  const highScoreUpdate = (score) => {
    if (highScore === '') {
      setHighScore(score);
      return
    }
    if (score < highScore) {
      setHighScore(score);
    }
  }

  useEffect(() => {
    localStorage.setItem("highScore", highScore.toString());
  }, [highScore]);

  const handleGameboardPrint = () => {
    setGameboardPrint(false);
  }

  return (
    <div className="gameboardWrapper">
      {gameboardPrint && <GameBoard highScore={highScore} handleGameboard={handleGameboardPrint} highScoreUpdate={highScoreUpdate}/>}

    </div>
  );
}

export default App;
