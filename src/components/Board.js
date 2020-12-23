import React from 'react';
import Square from './Square.js';
const uuid = require('uuid/v4');

class Board extends React.Component {
  //this.props.squares is array of numbers
  //this.props.whichPlayer is either A or B
  //this.props.onClick

  renderGrid() {
    return this.props.squares.map((square, index) => {
      return (
        <Square
          disableClick = {this.props.disableClick}
          squaresClickedDuringTurn = {this.props.squaresClickedDuringTurn}
          //passes index and value of square clicked back to Game
          onClick = {() => this.props.onClick(index, square)}
          exposedSquares = {this.props.exposedSquares}
          index = {index}
          square = {square}
          key = {uuid()}
        />
      )
    })
  }

  render() {
    return (
      <div className="container">
        {this.renderGrid()}
      </div>
    )
  }
}

export default Board;
