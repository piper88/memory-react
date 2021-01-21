import React from 'react';
import PropTypes from 'prop-types';
import './gameinfo.scss';

const GameInfo = props => {
  // const beginGame = props.gameSquares.length > 0 ? null : <button onClick = {props.fillSquares}>Begin Game</button>;

// {beginGame}
  return (
    <div className='game-info' data-test="GameInfo Component">

      <h4>{`Next Player: ${props.whichPlayer}`}</h4>

      <div className='matches'>
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
