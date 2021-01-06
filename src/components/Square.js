import React, { useEffect } from 'react'

const Square = props => {

let content  = () => {
    console.log(`square at index ${props.index} should show: ${props.showImage}`);
    if (props.showImage) {
      return (
        <img src={props.square} alt=""/>
      )
    } else {
      return null;
    }
  }


  return (
    <button onClick = {props.onClick.bind(this)}>
      {content()}
    </button>
  )
}

//if returns true, won't rerender
//prevProps.showImage === nextProps.showImage doing weird stuff. Should work?
export default React.memo(Square, (prevProps, nextProps) => {
  return (
    prevProps === nextProps
  )
});
