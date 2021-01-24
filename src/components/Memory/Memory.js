import React, { useState } from 'react';
import Game from '../Game/Game';

const Memory = () => {
  const [playAgain, setPlayAgain] = useState(false);

  const remountComponent = () => {
    setPlayAgain(!playAgain);
  }

  return (
    <Game
    playAgain = {remountComponent.bind(this)}
    key={playAgain}/>
  )
}

export default Memory;
