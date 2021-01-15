import React from 'react';
import renderer from 'react-test-renderer';
import Board from './Board';

test('should render Board Component correctly', () => {
  let component = renderer.create(
    <Board
      squares={[47,47]}
      exposedSquares = {[1]}
      whichPlayer = {'A'}
      onClick = {() => 'Fake fn'}
    />
  )
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
})
