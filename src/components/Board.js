import React, { useEffect} from 'react';
import Square from './Square.js';
// const uuid = require('uuid/v4');

const Board = props => {


//if tempExposedSquares grows in length, then we know exposedSquares won't change
//if exposedSquares grows in length, then we can keep showing tempExposedSquares

//map through squares, you need a square for each square
//if the index of the square matches an index found in exposedSquares or tempExposedSquares, then return an image
//otherwise, return an empty box

console.log('board');

let exposedSquares = new Map();


  props.exposedSquares.map((square) => {
    exposedSquares.set(square, true);
  });

let grid =  () => {

  console.log(exposedSquares)
  return props.squares.map((square, index) => {
    if (exposedSquares.has(index)) {
      return (
        <Square
          onClick = {props.onClick.bind(this, index, square)}
          square = {square}
          index = {index}
          key ={index}
          showImage = {true}
        />
      )
    } else {
      return (
        <Square
          onClick = {props.onClick.bind(this, index, square)}
          key ={index}
          square = {square}
          index = {index}
          showImage = {false}
        />
      )
    }
  })
}

  return (
    <div className="container">
      {grid()}
    </div>
  )
}

export default React.memo(Board, (prevProps, nextProps) => {
  return (
    prevProps.exposedSquares === nextProps.exposedSquares &&
    prevProps.squares === nextProps.squares
  )
});
