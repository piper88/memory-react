import React from 'react'

class Square extends React.Component {
  //each square will have a symbol property

  showSquares() {
    return this.props.exposedSquares.map((index) => {
      //if index is equal to this.props.index, then button should show this.props.square
      if (index === this.props.index) {
        //did not work to just 'return this.props.square', and then in render function, do <img src={this.showSquares()}/>. The first square clicked would show, but never the second.
        return <img src={this.props.square} alt={""}/>;
      } else {
        return null;
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

export default Square;
