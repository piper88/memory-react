import React from 'react';
import renderer from 'react-test-renderer';
import Winner from './Winner';

test('should render Winner Component correctly', () => {
  let component = renderer.create(
    <Winner
      winner = {'me'}
    />
  )

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
})
