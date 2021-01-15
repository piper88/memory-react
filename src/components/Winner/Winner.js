import React from 'react';
import PropTypes from 'prop-types';

const Winner = props => {

  return (
    <div className="winner" data-test="Winner Component">
      {`The winner is ${props.winner}`}
    </div>
  )
}

Winner.propTypes = {
  winner: PropTypes.string,
}

export default Winner;
