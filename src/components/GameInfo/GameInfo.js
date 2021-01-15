import React from 'react';
import PropTypes from 'prop-types';

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

GameInfo.propTypes = {
  playerA: PropTypes.object,
  playerB: PropTypes.object,
  fillSquares: PropTypes.func,
}

export default GameInfo;
