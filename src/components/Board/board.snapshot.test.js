import React from 'react';
import Board from './Board';
import renderSnapshot from '../../Utils/renderSnapshot';

test('should render Board Component correctly', () => {
  let snapshot = renderSnapshot(<Board
    squares={[47,47]}
    exposedSquares = {[1]}
    whichPlayer = {'A'}
    onClick = {() => 'Fake fn'}
  />)

  expect(snapshot).toMatchSnapshot();
})
