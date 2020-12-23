import React from 'react'

const Square = props => {

  function showSquares() {
    console.log('showSquares');
    return props.exposedSquares.map(index => {
      if (index === props.index) {
        return <img src={props.square} alt={""}/>
      } else {
        return null;
      }
    })
  }

  return (
    <button onClick = {props.onClick.bind(this)}>
      {showSquares()}
    </button>
  )
}

export default React.memo(Square);
