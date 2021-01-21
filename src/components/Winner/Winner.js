import React from 'react';
import PropTypes from 'prop-types';
import './winner.scss';

const Winner = props => {

  return (
    <div className="winner" data-test="Winner Component">
      {`The winner is ${props.winner}`}
      <button
        onClick={props.playAgain()}>
        Play Again
      </button>
    </div>
  )
}

Winner.propTypes = {
  winner: PropTypes.string,
}

export default Winner;
