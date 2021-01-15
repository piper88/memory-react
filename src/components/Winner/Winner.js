import React from 'react';

const Winner = props => {

  return (
    <div className="winner">
      {`The winner is ${props.winner}`}
    </div>
  )
}

export default Winner;
