import React from 'react';
import PlayerForm from './PlayerForm';
import renderSnapshot from '../../Utils/renderSnapshot';

test('should render PlayerForm correctly', () => {
  let snapshot = renderSnapshot(
    <PlayerForm
      setPlayerNames={() => 'Fake fn'}
    />
  )
  expect(snapshot).toMatchSnapshot();
})
