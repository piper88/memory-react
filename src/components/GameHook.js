import React, { useState, useEffect } from 'react';
import Board from './Board.js';
import PlayerForm from './PlayerForm.js';
import GameInfo from './GameInfo.js';
import Winner from './Winner.js';

import img1 from '../images/1.svg';
import img2 from '../images/2.svg';
import img3 from '../images/3.svg';
import img4 from '../images/4.svg';
import img5 from '../images/5.svg';
import img6 from '../images/6.svg';
import img7 from '../images/7.svg';
import img8 from '../images/8.svg';
import img9 from '../images/9.svg';

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
  const [squaresClickedDuringTurn, setSquaresClickedDuringTurn] = useState([])
  const [disableClick, setDisableClick] = useState(false);
  const [winner, setWinner] = useState(false);

  const setPlayerNames = (playerAName, playerBName) => {
    setPlayerA({...playerA, name: playerAName});
    setPlayerB({...playerB, name: playerBName});
    setShowForm(false);
  }

  const fillSquares = ()  => {
    console.log(playerA);
    let possibleSquares = [img1,img1,img2,img2,img3,img3,img4,img4,img5,img5,img6,img6,img7,img7,img8,img8,img9,img9];
    let squares = [];

    for (let i = possibleSquares.length-1; i > -1; --i) {
      //choose random number as the index
      let chosenIndex = Math.floor(Math.random() * i);
      //choose the square at theat index and push into squares array
      let chosenSquare = possibleSquares[chosenIndex];
      squares.push(chosenSquare);
      //remove that square, since it's already been used
      possibleSquares.splice(chosenIndex, 1);
    }
    setGameSquares(squares);
  }

const handleClick = (index, square) => {
    let squaresClicked = squaresClickedDuringTurn;

    //if the index is already in the exposedSquares (e.g. if square has already been clicked) return out of handleClick function
    if (exposedSquares.includes(index)) return;

    if (numberOfTurns === 0) {
      console.log('numberOfTurns is 0')
      setNumberOfTurns(++numberOfTurns);
      squaresClicked.push(square);
      setSquaresClickedDuringTurn(squaresClicked);
      // setSquaresClickedDuringTurn([...squaresClickedDuringTurn, square])
      setExposedSquares([...exposedSquares, index]);
    } else {
      console.log('numberOfTurns is not 0');
      squaresClicked.push(square);
      // setSquaresClickedDuringTurn([...squaresClickedDuringTurn, square])
      setSquaresClickedDuringTurn(squaresClicked);
      setExposedSquares([...exposedSquares, index]);
      //if the cards were a match
      if (squaresClicked[0] === squaresClicked[1]) {
        console.log('that\'s a bingo');
        //increment score of whoever's turn it is
        whichPlayer ==='A' ? setPlayerA({...playerA, matches: ++playerA.matches}) : setPlayerB({...playerB, matches: ++playerB.matches})
        //current player remains player if match is made
        whichPlayer ==='A' ? setWhichPlayer('A') : setWhichPlayer('B');
        //reset numberOfTurns and squaresClickedDuringTurn to initial values
        setNumberOfTurns(0);
        setSquaresClickedDuringTurn([]);
        setExposedSquares([...exposedSquares, index])
        //if the cards were not a match
      } else {
        console.log('no bingo')
        //show card that was flipped for 1.5 seconds
        setExposedSquares([...exposedSquares, index]);
        setDisableClick(true);

        //after 1.5 seconds, remove the unmatched cards from exposedSquares and update the state
        setTimeout(() => {
          whichPlayer==='A' ? setWhichPlayer('B') : setWhichPlayer('A');
          setNumberOfTurns(0);
          setSquaresClickedDuringTurn([]);
          //remove squares that were added
          setExposedSquares(exposedSquares.slice(0, exposedSquares.length - 1))
          setDisableClick(false);
        }, 1500)
      }
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
  }, [exposedSquares, gameSquares, playerA, playerB])

if (showForm) {
  return (
    <PlayerForm
    setPlayerNames= {setPlayerNames.bind(this)}
    />
  )
} else if (winner) {
  return (
    <div>
      <Winner
      winner={winner}/>
      <button onClick={setShowForm.bind(this, true)}>Play Again</button>
    </div>
  )
} else {
    return (
      <div style={{pointerEvents: disableClick ? 'none' : 'auto'}}>

      <div className="board">
      <Board
      squares = {gameSquares}
      exposedSquares ={exposedSquares}
      whichPlayer = {whichPlayer}
      onClick = {handleClick.bind(this)}/>
      </div>

      <div className="game-info">
      <GameInfo
      playerA = {playerA}
      playerB = {playerB}
      exposedSquares = {exposedSquares}
      gameSquares = {gameSquares}
      fillSquares = {fillSquares.bind(this)}/>
      </div>

      </div>
    )
  }
};

export default Game;
