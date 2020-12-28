import React from 'react';

const GameInfo = props => {


  const declareWinner = () => {
    let winner;
    if (props.playerA.matches > props.playerB.matches) {
      winner = `The Winner is: ${props.playerA.name}`
    } else if (props.playerB.matches > props.playerA.matches) {
      winner = `The Winner is: ${props.playerB.name}`
    } else {
      winner = 'DRAW';
    }
    return winner;
  }

    return (
      <div>
        <button onClick = {props.fillSquares}>Begin Game</button>
          <ul>
            <li>{`Next Player: ${props.playerA.name}`}</li>
            <li>{`${props.playerA.name}'s matches: ${props.playerA.matches}`}</li>
            <li>{`${props.playerB.name}'s matches: ${props.playerB.matches}`}</li>
          </ul>
          <div className="winner">
            {props.exposedSquares.length === props.gameSquares.length && props.gameSquares.length > 0 ? declareWinner() : null}
          </div>
        </div>
      )
}

export default GameInfo;
