import React from 'react';
import Winner from './Winner';
import renderSnapshot from '../../Utils/renderSnapshot';

test('should render Winner Component correctly', () => {
  let snapshot = renderSnapshot(
    <Winner
      winner = {'me'}
    />
  )

  expect(snapshot).toMatchSnapshot();
})
