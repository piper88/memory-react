import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';


//A controlled component is one in which react controls the values of form inputs.
//I believe it's necessary for this component to be stateful if you want it to be a controlled component.

//If you want to use uncontrolled form (normally best to use controlled), meaning the DOM handles the data from the form, and you need access to the forms data, can use a ref (look it up)
const PlayerForm = props => {
  const [playerA, setPlayerA] = useState('');
  const [playerB, setPlayerB] = useState('');

  // set the player's names
  function handleChange(event) {
    let player = event.target;
    player.name ==='playerA' ? setPlayerA(player.value) : setPlayerB(player.value);
  }

  function handleSubmit(event) {
    props.setPlayerNames(playerA, playerB);
    event.preventDefault();
  }

  useEffect(() => {
    return () => {
      console.log('component did unmount');
    };
  }, []);

    //setting value on input means its a controlled component, and without an onChange handler, the input will be read only, unless you use a ref.
    //value is what shows as the user types
  return (
    <form onSubmit = {handleSubmit} data-test = "Player Form">
      <label>
        Player A:
        <input
        type="text"
        name='playerA'
        value = {playerA}
        placeholder = 'Enter player one here...'
        onChange = {handleChange.bind(this)}
        />
      </label>
      <label>
        Player B:
        <input
        type="text"
        name='playerB'
        value = {playerB}
        placeholder = 'Enter player two here...'
        onChange = {handleChange.bind(this)}
        />
      </label>
      <button>
        Begin Game!
      </button>
    </form>
  )
}

PlayerForm.propTypes = {
  setPlayerNames: PropTypes.func,
}

export default PlayerForm;
