import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'
const uuid = require('uuid/v4');

//whose turn is it
  //each player gets to turn over at least 2 symbols. If they match, gets to go again
//bunch of symbols, 2 of each
//keep track of how many pairs each player has collected

class Square extends React.Component {
  //each square will have a symbol property

  showSquares() {
    return this.props.exposedSquares.map((index) => {
      //if index is equal to this.props.index, then button should show this.props.square
      if (index === this.props.index) {
        return this.props.square
      } else {
        return null
      }
    })
  }

  render() {
    return (
      <button
      onClick= {() => this.props.onClick()}
      >
        {this.showSquares()}
      </button>
    )
  }
}



class Board extends React.Component {
  //this.props.squares is array of numbers
  //this.props.whichPlayer is either A or B
  //this.props.onClick

  renderGrid() {
    // console.log('grid rendered')
    return this.props.squares.map((square, index) => {
      return (
        <Square
          squaresClickedDuringTurn = {this.props.squaresClickedDuringTurn}
          //passes index back to Game
          onClick = {() => this.props.onClick(index, square)}
          exposedSquares = {this.props.exposedSquares}
          index = {index}
          square = {square}
          key = {uuid()}
        />
      )
    })
  }

  render() {
    return (
      <div className="container">
        {this.renderGrid()}
      </div>
    )
  }
}


//game should keep track of the state, pass it down
class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      whichPlayer: 'A',
      numberOfTurns: 0,
      //maybe unnecessary. if Match isn't made, just switch to other player
      matchMade: true,
      playerAMatches: 0,
      playerBMatches: 0,
      winner: null,
      //2 each of 1,2,3,4
      squares: [],
      //either index or both index and value, as array of arrays
      exposedSquares: [],
      //array of last two things clicked, either index or both index and value, as array of arrays
      squaresClickedDuringTurn: [],
    }
    //'this' is the game
    this.handleClick = this.handleClick.bind(this);
    this.fillSquares = this.fillSquares.bind(this);
  }

  fillSquares() {

    //choose random number between 0 and 7 (length of possibleSquares -1), add that number to the empty array, and then remove that number out of the possibleSquares array, and decrement possibleSquares.length
      let possibleSquares = [1,1,2,2,3,3,4,4];
      let squares = this.state.squares;
      //if squares have already been filled, return
      if (squares.length) return;

      for (let i = 7; i > -1; --i) {
        let chosenIndex = Math.floor(Math.random() * i);

        let chosenSquare = possibleSquares[chosenIndex];
        squares.push(chosenSquare);
        possibleSquares.splice(chosenIndex, 1);
      }
      console.log(squares)
      this.setState({
        squares: squares,
      })
  }

//shows second card in turn momentarily when second card is not a match
  showCard(callback) {
    setTimeout(callback, 2000)
  }

  declareWinner() {
    if (this.state.winner === 'A' || this.state.winner === 'B') {
      return `The Winner is ${this.state.winner}`;
    } else {
      return `Result is a Draw`;
    }
  }

  handleClick(index, square) {
    //if the player is still taking his turn, exposed squares should be pushed into. Once the player is done, if no match is made, those squares should be taken out. If there is a match, those squares should stay

    let squaresClickedDuringTurn = this.state.squaresClickedDuringTurn;
    let numberOfTurns = this.state.numberOfTurns;
    let playerAMatches = this.state.playerAMatches;
    let playerBMatches = this.state.playerBMatches;
    let whichPlayer = this.state.whichPlayer;
    let exposedSquares = this.state.exposedSquares;

    //if the index is already in the exposedSquares, return out of handleClick function
    for (let i = 0; i < exposedSquares.length; ++i) {
      if (exposedSquares[i] === index) {
        console.log('duplicate');
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
      // console.log('two cards flipped');
      squaresClickedDuringTurn.push(square);
      // console.log(`squaresClickedDuringTurn ${squaresClickedDuringTurn}`)
      exposedSquares.push(index);
      if (squaresClickedDuringTurn[0] === squaresClickedDuringTurn[1]) {
        console.log('thats a bingo');
        //increment the matches of whoever's turn it is
        this.state.whichPlayer==='A' ? playerAMatches++ : playerBMatches++;
        //current player remains player if match is made
        whichPlayer==='A' ? whichPlayer='A' : whichPlayer='B'
        this.setState({
          matchMade: true,
          whichPlayer: whichPlayer,
          playerAMatches: playerAMatches,
          playerBMatches: playerBMatches,
          numberOfTurns: 0,
          squaresClickedDuringTurn: [],
          exposedSquares: exposedSquares,
        })
        //if cards flipped didn't match
      } else {
        this.showCard(() => {
          console.log('callback')
          //switch the current player
          this.state.whichPlayer==='A' ? whichPlayer='B' : whichPlayer='A';
          //remove squares that were added
          exposedSquares.pop();
          exposedSquares.pop();
          this.setState({
            matchMade: false,
            whichPlayer: whichPlayer,
            numberOfTurns: 0,
            squaresClickedDuringTurn: [],
            //if no match, then reset exposedSquares to original state, removing the temporarily added squares
            exposedSquares: exposedSquares,
          })
        })

        this.setState({
          matchMade: false,
          whichPlayer: whichPlayer,
          numberOfTurns: 0,
          squaresClickedDuringTurn: [],
          //if no match, then reset exposedSquares to original state, removing the temporarily added squares
          exposedSquares: exposedSquares,
        })
      }
    }

    //declare winner
    if (exposedSquares.length === this.state.squares.length) {
      let winner;
      if (this.state.playerAMatches > this.state.playerBMatches) {
        winner = 'A';
      } else if (this.state.playerBMatches > this.state.playerAMatches) {
        winner = 'B';
      } else {
        winner = 'DRAW';
      }
      this.setState({
        winner: winner,
      })
    }
  }

  //if there's a winner, declare the winner
  //if there's no winner, empty
  //if there's a draw, declare a draw


  render() {
    return (
      <div>
        <div className="board">
          <Board matchMade = {this.state.matchMade} squaresClickedDuringTurn = {this.state.squaresClickedDuringTurn} squares = {this.state.squares} exposedSquares ={this.state.exposedSquares} whichPlayer = {this.state.whichPlayer} onClick = {this.handleClick}/>
        </div>
        <div className="game-info">
          <button onClick = {this.fillSquares}>Begin Game</button>
          <ul>
            <li>{`Next Player: ${this.state.whichPlayer}`}</li>
            <li>{`Player A Matches: ${this.state.playerAMatches}`}</li>
            <li>{`Player B Matches: ${this.state.playerBMatches}`}</li>
          </ul>
          <div className="winner">
            {this.state.winner ? this.declareWinner() : null }
          </div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(
  <Game/>,
  document.getElementById('root')
)
