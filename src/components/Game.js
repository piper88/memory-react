import React from 'react';
import Board from './Board.js';
import PlayerForm from './PlayerForm.js';

import symbol1 from '../images/1.svg';
import symbol2 from '../images/2.svg';
import symbol3 from '../images/3.svg';
import symbol4 from '../images/4.svg';
import symbol5 from '../images/5.svg';
import symbol6 from '../images/6.svg';
import symbol7 from '../images/7.svg';
import symbol8 from '../images/8.svg';
import symbol9 from '../images/9.svg';

//game should keep track of the state, pass it down
class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      whichPlayer: '',
      numberOfTurns: 0,
      playerAMatches: 0,
      playerBMatches: 0,
      playerAName: '',
      playerBName: '',
      winner: null,
      //2 each of 1,2,3,4, etc...
      //Keeps track of what symbols are where
      squares: [],
      //array of indexes of squares that should be visible
      exposedSquares: [],
      //array of values of last two squares clicked. Used to compare for matches
      squaresClickedDuringTurn: [],
      disableClick: false,
    }

    this.handleClick = this.handleClick.bind(this);
    this.fillSquares = this.fillSquares.bind(this);
    this.setPlayerNames = this.setPlayerNames.bind(this);
  }

  setPlayerNames(playerAName, playerBName) {
    this.setState({
      playerAName: playerAName,
      playerBName: playerBName,
      whichPlayer: 'A',
    })
  }

  fillSquares() {

    //choose random number between 0 and 7 (length of possibleSquares -1), add that number to the empty array, and then remove that number out of the possibleSquares array, and decrement possibleSquares.length
      let possibleSquares = [symbol1,symbol1,symbol2,symbol2,symbol3,symbol3,symbol4,symbol4,symbol5,symbol5,symbol6,symbol6,symbol7,symbol7,symbol8,symbol8,symbol9,symbol9];
      let squares = this.state.squares;
      //if squares have already been filled, return
      if (squares.length) return;

      for (let i = 17; i > -1; --i) {
        //choose random number as the index
        let chosenIndex = Math.floor(Math.random() * i);
        //choose the square at theat index and push into squares array
        let chosenSquare = possibleSquares[chosenIndex];
        squares.push(chosenSquare);
        //remove that square, since it's already been used
        possibleSquares.splice(chosenIndex, 1);
      }
      this.setState({
        squares: squares,
      })
  }

  declareWinner() {
    let winner;
    if (this.state.playerAMatches > this.state.playerBMatches) {
      winner = `The Winner is ${this.state.playerAName}`;
    } else if (this.state.playerBMatches > this.state.playerAMatches) {
      winner = `The Winner is ${this.state.playerBName}`;
    } else {
      winner = 'DRAW';
    }
    return winner;
  }

  handleClick(index, square) {

    let squaresClickedDuringTurn = this.state.squaresClickedDuringTurn;
    let numberOfTurns = this.state.numberOfTurns;
    let playerAMatches = this.state.playerAMatches;
    let playerBMatches = this.state.playerBMatches;
    let whichPlayer = this.state.whichPlayer;
    let exposedSquares = this.state.exposedSquares;

    //if the index is already in the exposedSquares (e.g. if square has already been clicked) return out of handleClick function
    for (let i = 0; i < exposedSquares.length; ++i) {
      if (exposedSquares[i] === index) {
        return;
      }
    }

    if (this.state.numberOfTurns === 0) {
      numberOfTurns++;
      squaresClickedDuringTurn.push(square)
      exposedSquares.push(index);
      this.setState({
        numberOfTurns: numberOfTurns,
        squaresClickedDuringTurn: squaresClickedDuringTurn,
        exposedSquares: exposedSquares,
      })

      //once two cards have been flipped, check to see if the squares are the same. If so, increment matches of player, push into exposed squares, reset turns to 0, and reset squaresClickedDuringTurn to 0
    } else {
      squaresClickedDuringTurn.push(square);
      exposedSquares.push(index);
      //if the cards were a match
      if (squaresClickedDuringTurn[0] === squaresClickedDuringTurn[1]) {
        console.log('thats a bingo');
        //increment the matches of whoever's turn it is
        this.state.whichPlayer==='A' ? playerAMatches++ : playerBMatches++;
        //current player remains player if match is made
        whichPlayer==='A' ? whichPlayer='A' : whichPlayer='B'
        this.setState({
          whichPlayer: whichPlayer,
          playerAMatches: playerAMatches,
          playerBMatches: playerBMatches,
          numberOfTurns: 0,
          squaresClickedDuringTurn: [],
          exposedSquares: exposedSquares,
        })
        //if cards flipped didn't match
      } else {
        //show card that was flipped for 1500 ms
        this.setState({
          exposedSquares: exposedSquares,
          disableClick: true,
        })

        //after 1500 ms, remove the unmatched cards from exposedSquares and update the state
        setTimeout(() => {
          this.state.whichPlayer==='A' ? whichPlayer='B' : whichPlayer='A';
          //remove squares that were added
          exposedSquares.pop();
          exposedSquares.pop();
          this.setState({
            whichPlayer: whichPlayer,
            numberOfTurns: 0,
            squaresClickedDuringTurn: [],
            //if no match, then reset exposedSquares to original state, removing the temporarily added squares
            exposedSquares: exposedSquares,
            disableClick: false,
          })
        }, 1500)
      }
    }
  }

  showGameInfo() {
    if (this.state.playerAName.length) {
      return (
        <div>
          <button onClick = {this.fillSquares}>Begin Game</button>
            <ul>
              <li>{`Next Player: ${this.state.playerAName}`}</li>
              <li>{`${this.state.playerAName}'s matches: ${this.state.playerAMatches}`}</li>
              <li>{`${this.state.playerBName}'s matches: ${this.state.playerBMatches}`}</li>
            </ul>
            <div className="winner">
              {this.state.exposedSquares.length === this.state.squares.length && this.state.squares.length > 0 ? this.declareWinner() : null}
            </div>
          </div>
      )
    } else {
      return null;
    }
  }

  render() {

    return (
      <div style={{pointerEvents:  this.state.disableClick ? 'none' : 'auto'}}>

        <div className="board">
          <Board
          disableClick={this.state.disableClick}
          matchMade = {this.state.matchMade}
          squaresClickedDuringTurn = {this.state.squaresClickedDuringTurn}
          squares = {this.state.squares}
          exposedSquares ={this.state.exposedSquares}
          whichPlayer = {this.state.whichPlayer}
          onClick = {this.handleClick}/>
        </div>

        <PlayerForm
        setPlayerNames= {this.setPlayerNames}
        />

        <div className="game-info">
          {this.showGameInfo()}
        </div>

      </div>
    )
  }
}

export default Game;
