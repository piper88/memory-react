import React from 'react';

//A controlled component is one in which react controls the values of form inputs.
class PlayerForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playerA: '',
      playerB: '',
      showForm: true,
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  //set the player names
  handleChange(event) {
    //event.target is the input element
    event.target.name==='playerA' ? this.setState({playerA: event.target.value}) : this.setState({playerB: event.target.value});
  }

  //send chosen player names back to Game
  handleSubmit(event) {
    this.props.setPlayerNames(this.state.playerA, this.state.playerB);
    event.preventDefault();
    this.setState({
      showForm: false,
    })
  }

  render() {
    if (this.state.showForm) {
      return (
        <form onSubmit = {this.handleSubmit}>
          <label>
            Player A:
            <input
            type="text"
            name='playerA'
            value = {this.state.playerA}
            onChange = {this.handleChange}/>
          </label>
          <label>
            Player B:
            <input
            type="text"
            name='playerB'
            value = {this.state.playerB}
            onChange = {this.handleChange}/>
          </label>
          <button>
            Submit
          </button>
        </form>
      )
    } else {
      return (
        null
      )
    }

  }
}

export default PlayerForm
