import React from 'react';
import PropTypes from 'prop-types';
import './gameinfo.scss';

const GameInfo = props => {
  // const beginGame = props.gameSquares.length > 0 ? null : <button onClick = {props.fillSquares}>Begin Game</button>;

// {beginGame}

// <p>{`${props.playerA.name}'s matches: ${props.playerA.matches}`}</p>
  return (
    <div className='game-info' data-test="GameInfo Component">

      <div className='which-player'>
        <h4>Next Player    </h4>
        <h4 className='next-player'>{props.whichPlayer}</h4>
      </div>

      <div className='name-and-matches'>

        <div className='wrap-player'>
          <p className='player-name'>{`${props.playerA.name}'s matches`}    </p>
          <p className='player-matches'>{props.playerA.matches}     </p>
        </div>

        <div className='wrap-player'>
          <p className='player-name'>{`${props.playerB.name}'s matches`}    </p>
          <p className='player-matches'>{props.playerB.matches}</p>
        </div>

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
