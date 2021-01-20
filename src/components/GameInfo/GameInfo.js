import React from 'react';
import PropTypes from 'prop-types';
import './gameinfo.css';

const GameInfo = props => {
  const beginGame = props.gameSquares.length > 0 ? null : <button onClick = {props.fillSquares}>Begin Game</button>;

  return (
    <div data-set="GameInfo Component">

        {beginGame}
        <div>
          <h4>{`Next Player: ${props.playerA.name}`}</h4>
          <p>{`${props.playerA.name}'s matches: ${props.playerA.matches}`}</p>
          <p>{`${props.playerB.name}'s matches: ${props.playerB.matches}`}</p>
        </div>
      </div>
    )
}

GameInfo.propTypes = {
  playerA: PropTypes.object,
  playerB: PropTypes.object,
  fillSquares: PropTypes.func,
}

export default GameInfo;
