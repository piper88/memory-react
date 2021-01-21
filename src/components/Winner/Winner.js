import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './winner.scss';
import url from '../../assets/party-horn.mp3';

const Winner = props => {

  let audio = new Audio(url);
//allows access to methods in confetti cdn
  let confetti = window.confetti;
  useEffect(() => {
    confetti.start();
    audio.play();
    return () => {
      confetti.stop();
    }
  }, [])

  return (
    <div className="winner" data-test="Winner Component">
      <h4>
      {`The winner is ${props.winner}`}
      </h4>
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
