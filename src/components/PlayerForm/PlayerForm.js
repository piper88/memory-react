import React, { useState, useEffect }from 'react';

//A controlled component is one in which react controls the values of form inputs.

const PlayerForm = props => {
  const [playerA, setPlayerA] = useState('');
  const [playerB, setPlayerB] = useState('');
  const [showForm, setShowForm] = useState(true);

  //set the player's names
  function handleChange(event) {
    let player = event.target;
    player.name ==='playerA' ? setPlayerA(player.value) : setPlayerB(player.value);
  }

  function handleSubmit(event) {
    props.setPlayerNames(playerA, playerB);
    event.preventDefault();
    setShowForm(false);
  }

  useEffect(() => {
    return () => {
      console.log('component did unmount');
    };
  }, []);

  if (showForm) {
    return (
      <form onSubmit = {handleSubmit} data-test = "Player Form">
        <label>
          Player A:
          <input
          type="text"
          name='playerA'
          value = {playerA}
          onChange = {handleChange.bind(this)}/>
        </label>
        <label>
          Player B:
          <input
          type="text"
          name='playerB'
          value = {playerB}
          onChange = {handleChange.bind(this)}/>
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

export default PlayerForm;
