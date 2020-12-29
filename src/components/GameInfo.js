import React from 'react';

const GameInfo = props => {

  return (
    <div>
      <button onClick = {props.fillSquares}>Begin Game</button>
        <ul>
          <li>{`Next Player: ${props.playerA.name}`}</li>
          <li>{`${props.playerA.name}'s matches: ${props.playerA.matches}`}</li>
          <li>{`${props.playerB.name}'s matches: ${props.playerB.matches}`}</li>
        </ul>
      </div>
    )
}

export default GameInfo;
