import React from 'react';
import renderer from 'react-test-renderer';
import GameInfo from './GameInfo';

test('should render GameInfo Component correctly ', () => {
  //render component
  let component = renderer.create(
    <GameInfo
      playerA =  {{name: 'Nick', matches: 2}}
      playerB = {{name: 'Nora', matches: 2}}
      fillSquares= {() => 'fake fn'}
    />
  )

  //turn component into JSON
  let tree = component.toJSON();
  //compare tree to snapshot
  expect(tree).toMatchSnapshot()
})
