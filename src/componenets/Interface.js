import React from "react";

export const Interface = (props) => {

  return (
    <div className="interfaceWrapper">
      <span>Score: {props.count}</span> <span>High Score: {props.highScore}</span>
    </div>
  )
}