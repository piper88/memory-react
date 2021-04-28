import React, { useEffect, useCallback} from 'react';
import Square from '../Square/Square.js';
import PropTypes from 'prop-types';
import './board.scss';

const Board = props => {

//map through squares, you need a square for each square
//if the index of the square matches an index found in exposedSquares or tempExposedSquares, then return an image
//otherwise, return an empty box

//useCallback memoizes callbacks, to prevent unnecessasary renderings
// const onClick = useCallback(
//   (index, square) => {

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
    <div className="grid-container">
      {grid()}
    </div>
  )
}

//this is causing error in browser console if wrong prop type is passed in to board
//problem is in tests, when using check-prop-types library, no error or warning thrown
Board.propTypes = {
  squares: PropTypes.array,
  exposedSquares: PropTypes.array,
  whichPlayer: PropTypes.string,
  onClick: PropTypes.func,
}

//React.memo prevents checkPropTypes from correctly validating prop types. Likely since component has been memoized with correct prop types
export default Board;
// export default React.memo(Board, (prevProps, nextProps) => {
//   return (
//     prevProps.exposedSquares === nextProps.exposedSquares &&
//     prevProps.squares === nextProps.squares
//   )
// });
