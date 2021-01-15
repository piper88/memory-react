import React from 'react';
import renderer from 'react-test-renderer';
import PlayerForm from './PlayerForm';

test('should render PlayerForm correctly', () => {
  let component = renderer.create(
    <PlayerForm
      setPlayerNames={() => 'Fake fn'}
    />
  )
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
})
