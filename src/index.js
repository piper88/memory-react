import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css'

class Square extends React.Component {
  render() {
    return (
      <button>
        {'button'}
      </button>
    )
  }
}

class Board extends React.Component {
  render() {
    return (
      <div className="square">
        <Square/>
      </div>
    )
  }
}

class Game extends React.Component {
  render() {
    return (
        <div className="board">
          <Board/>
        </div>
    )
  }
}

ReactDOM.render(
  <Game/>,
  document.getElementById('root')
)
