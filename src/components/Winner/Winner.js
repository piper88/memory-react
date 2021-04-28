import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './winner.scss';
import url from '../../assets/party-horn.mp3';

const Winner = props => {

  let audio = new Audio(url);
//allows access to methods in confetti cdn
  let confetti = window.confetti;
  console.log(confetti);
  useEffect(() => {
    confetti({
      particleCount: 150,
      spread: 180,
    });
    // confetti.start();
    audio.play();
    // return () => {
    //   confetti.stop();
    // }
  }, [])

  return (
    <div className="winner" data-test="Winner Component">
      <h4>
      {`The winner is ${props.winner}`}
      </h4>
    </div>
  )
}

Winner.propTypes = {
  winner: PropTypes.string,
}

export default Winner;
