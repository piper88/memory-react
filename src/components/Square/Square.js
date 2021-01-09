import React, { useEffect } from 'react'

const Square = props => {

let content  = () => {
    if (props.showImage) {
      return (
        <img src={props.square} alt=""/>
      )
    } else {
      return null;
    }
  }


  return (
    <button
    onClick = {props.onClick.bind(this)}
    data-test="Square Component">
      {content()}
    </button>
  )
}

//if returns true, won't rerender
//prevProps.showImage === nextProps.showImage doing weird stuff. Should work? But it's not adding the second clickedSquare to exposedSquares... When Square isn't rerendering because I've added showImage to the comparison expression, it impacts exposedSquares of Game. The only square that still shows/hides when clicked (after the first and second click), is the second clicked square. Since that's the only one that's rerendered. It must be being passed back to the parent through onClick?
export default React.memo(Square, (prevProps, nextProps) => {
  console.log(prevProps.showImage === nextProps.showImage);
  return (
    prevProps === nextProps
  )
});
