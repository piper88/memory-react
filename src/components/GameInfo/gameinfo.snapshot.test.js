import React from 'react';
import GameInfo from './GameInfo';
import renderSnapshot from '../../Utils/renderSnapshot';

test('should render GameInfo Component correctly ', () => {
  let snapshot = renderSnapshot(
    <GameInfo
      playerA =  {{name: 'Nick', matches: 2}}
      playerB = {{name: 'Nora', matches: 2}}
      fillSquares= {() => 'fake fn'}
    />
  )
  expect(snapshot).toMatchSnapshot();
})
