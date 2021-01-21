import React, { useState, useEffect, useCallback } from 'react';
import Board from '../Board/Board.js';
import PlayerForm from '../PlayerForm/PlayerForm.js';
import GameInfo from '../GameInfo/GameInfo.js';
import Winner from '../Winner/Winner.js';
import './game.scss';

import img1 from '../../images/1.svg';
import img2 from '../../images/2.svg';
import img3 from '../../images/3.svg';
import img4 from '../../images/4.svg';
import img5 from '../../images/5.svg';
import img6 from '../../images/6.svg';
import img7 from '../../images/7.svg';
import img8 from '../../images/8.svg';
import img9 from '../../images/9.svg';

const Game = () => {
  const [showForm, setShowForm] = useState(true);
  const [whichPlayer, setWhichPlayer] = useState('');
  let [numberOfTurns, setNumberOfTurns] = useState(0);
  const [playerA, setPlayerA] = useState({
    name: '',
    matches: 0,
  });
  const [playerB, setPlayerB] = useState({
    name: '',
    matches: 0,
  });
  const [gameSquares, setGameSquares] = useState([]);
  const [exposedSquares, setExposedSquares] = useState([])
  // const [tempExposedSquares, setTempExposedSquares] = useState([]);

  const [squaresClickedDuringTurn, setSquaresClickedDuringTurn] = useState([])
  const [disableClick, setDisableClick] = useState(false);
  const [winner, setWinner] = useState(false);

  const setPlayerNames = (playerAName, playerBName) => {
    setPlayerA({...playerA, name: playerAName});
    setPlayerB({...playerB, name: playerBName});
    setWhichPlayer(playerAName);
    setShowForm(false);
    fillSquares();
  }

  const fillSquares = ()  => {
    let possibleSquares = [img1,img1,img2,img2,img3,img3,img4,img4,img5,img5,img6,img6,img7,img7,img8,img8,img9,img9];
    let squares = [];

    for (let i = possibleSquares.length-1; i > -1; --i) {
      //choose random number as the index
      let chosenIndex = Math.floor(Math.random() * i);
      //choose the square at that index and push into squares array
      let chosenSquare = possibleSquares[chosenIndex];
      squares.push(chosenSquare);
      //remove that square, since it's already been used
      possibleSquares.splice(chosenIndex, 1);
    }
    setGameSquares(squares);
  }

//Check for matches
useEffect(() => {
  if (numberOfTurns === 2) {
    //if the cards were a match
    if (squaresClickedDuringTurn[0] === squaresClickedDuringTurn[1]) {
      console.log('that\'s a bingo');
      //increment score of whoever's turn it is
      whichPlayer ===playerA.name ? setPlayerA({...playerA, matches: ++playerA.matches}) : setPlayerB({...playerB, matches: ++playerB.matches})
      //current player remains player if match is made
      whichPlayer ===playerA.name ? setWhichPlayer(playerA.name) : setWhichPlayer(playerB.name);
      //reset numberOfTurns and squaresClickedDuringTurn to initial values
      setNumberOfTurns(0);
      setSquaresClickedDuringTurn([]);
      // setExposedSquares([...exposedSquares, tempExposedSquares])
      // setTempExposedSquares([]);
      //if the cards were not a match
    } else {
      console.log('no bingo')
      setNumberOfTurns(0);
      setSquaresClickedDuringTurn([]);
      //show card that was flipped for 1.5 seconds
      setDisableClick(true);
      //after 1.5 seconds, remove the unmatched cards from exposedSquares
      setTimeout(() => {
        whichPlayer===playerA.name ? setWhichPlayer(playerB.name) : setWhichPlayer(playerA.name);
        setExposedSquares(exposedSquares.slice(0, exposedSquares.length - 2))
        setDisableClick(false);
      }, 1500)
    }
  }
}, [numberOfTurns])

const handleClick = (index, square) => {
      //if the index is already in the exposedSquares (e.g. if square has already been clicked) return out of handleClick function
      if (exposedSquares.includes(index)) return;

      if (numberOfTurns === 0 || numberOfTurns === 1) {
        setNumberOfTurns(++numberOfTurns);
        setSquaresClickedDuringTurn([...squaresClickedDuringTurn, square])
        // setTempExposedSquares([...tempExposedSquares, index]);
        setExposedSquares([...exposedSquares, index]);
      }
    }


  useEffect(() => {
    if (exposedSquares.length === gameSquares.length && gameSquares.length > 0) {
      if (playerA.matches > playerB.matches) {
        setWinner(playerA.name);
      } else if (playerB.matches > playerA.matches) {
        setWinner(playerB.name);
      } else {
        setWinner('Nobody wins, Nobody loses');
      }
    }
  }, [exposedSquares])

if (showForm) {
  return (
    <div className='component-container'>
      <h1 className='title'>Memory</h1>
      <PlayerForm
      data-test="Player Form" setPlayerNames= {setPlayerNames.bind(this)}
      />
    </div>
  )
} else if (winner) {
  return (
    <div data-test="Winner">
      <Winner
      winner={winner}/>
      <button
      onClick={setShowForm.bind(this, true)}>
        Play Again
      </button>
    </div>
  )
} else {
    return (
      <div className='component-container' style={{pointerEvents: disableClick ? 'none' : 'auto'}} data-test="Board and GameInfo">
        <h1 className='title'>Memory</h1>

        <div className = 'board-container'>
          <Board
          squares = {gameSquares}
          exposedSquares ={exposedSquares}
          whichPlayer = {whichPlayer}
          onClick = {handleClick.bind(this)}/>
        </div>

          <GameInfo
          playerA = {playerA}
          playerB = {playerB}
          whichPlayer={whichPlayer}/>

      </div>
    )
  }
};

export default Game;
