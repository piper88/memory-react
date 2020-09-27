import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'

//whose turn is it
  //each player gets to turn over at least 2 symbols. If they match, gets to go again
//bunch of symbols, 2 of each
//keep track of how many pairs each player has collected

class Square extends React.Component {
  //each square will have a symbol property
  render() {
    return (
      <button className={this.props.className === 0 || this.props.className === 1 || this.props.className === 2 || this.props.className === 3 ? 'firstRow' : 'secondRow'}>
        {this.props.value}
      </button>
    )
  }
}

class Board extends React.Component {
  //this.prop.squares is array of numbers
  //this.prop.whichPlayer is either A or B

  renderGrid() {
    return this.props.squares.map((square, index) => {
      console.log(index);
      return (
        <Square
          value = {square}
          key = {Math.floor(Math.random() * 100)}
          className={index}
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
      playerOneMatches: 0,
      playerTwoMatches: 0,
      //2 each of 1,2,3,4
      squares: [],
    }
  }

  fillSquares() {
    //choose random number between 0 and 7 (length of possibleSquares -1), add that number to the empty array, and then remove that number out of the possibleSquares array, and decrement possibleSquares.length
      let possibleSquares = [1,1,2,2,3,3,4,4];
      let squares = this.state.squares;
      for (let i = 7; i > -1; --i) {
        let chosenIndex = Math.floor(Math.random() * i);

        let chosenSquare = possibleSquares[chosenIndex];
        squares.push(chosenSquare);
        possibleSquares.splice(chosenIndex, 1);
      }
      this.setState({
        squares: squares,
      })
  }



  handleClick(i) {
    //increment the number of turns until 2
    //if matchMade, set matchMade to true, increment the playerOneMatches or playerTwoMatches
    //if not, set matchMade to false and change whichPlayer to 'B'
  }



  render() {
    return (
      <div>
        <div className="board">
          <Board squares = {this.state.squares} whichPlayer = {this.state.whichPlayer} onClick = {() => this.handleClick()}/>
        </div>
        <div className="game-info">
          <button onClick = {() => this.fillSquares()}>Begin Game</button>
          {`Next Player: ${this.state.whichPlayer}`}
        </div>
      </div>
    )
  }
}

ReactDOM.render(
  <Game/>,
  document.getElementById('root')
)
