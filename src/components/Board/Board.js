import React, { useEffect, useCallback} from 'react';
import Square from '../Square/Square.js';
// const uuid = require('uuid/v4');

const Board = props => {

//map through squares, you need a square for each square
//if the index of the square matches an index found in exposedSquares or tempExposedSquares, then return an image
//otherwise, return an empty box

//useCallback memoizes callbacks, to prevent unnecessasary renderings
// const onClick = useCallback(
//   (index, square) => {
//     console.log('yo');
//     return props.onClick(index, square)
//   },
//   [props.onClick]
// )


let squaresToShow = new Map();

  props.exposedSquares.map((square) => {
    squaresToShow.set(square, true);
  });

let grid = () => {

  return props.squares.map((square, index) => {
      return (
        <Square
          onClick = {props.onClick.bind(this, index, square)}
          square = {square}
          index = {index}
          key ={index}
          showImage = {squaresToShow.has(index)}
          data-test="Board Component"
        />
      )
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
