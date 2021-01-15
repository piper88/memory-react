import React from 'react';
import PropTypes from 'prop-types';

const Winner = props => {

  return (
    <div className="winner">
      {`The winner is ${props.winner}`}
    </div>
  )
}

Winner.propTypes = {
  winner: PropTypes.string,
}

export default Winner;
