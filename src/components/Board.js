import React from 'react';
import Square from './Square.js';
const uuid = require('uuid/v4');

const Board = props => {

  function renderGrid() {
    return props.squares.map((square, index) => {
      return (
        <Square
          //passes index and value of square clicked back to Game
          onClick = {props.onClick.bind(this, index, square)}
          exposedSquares = {props.exposedSquares}
          index = {index}
          square = {square}
          key = {uuid()}
        />
      )
    })
  }

  return (
    <div className="container">
      {renderGrid()}
    </div>
  )
}

export default Board;
