import React from 'react';
import renderer from 'react-test-renderer';
import Square from '../components/Square.js';

//snapshot tests just make sure that your UI doesn't change unexpectedly during development. Should also still write unit and functional tests, to verify that the application behaves as it should, not just that it hasn't changed
test('Image tag returned if props.showImage is true, null returned if props.showImage is false', () => {
  const component = renderer.create(
    <Square
     showImage = {true}
     onClick = {() => 'fake callback'}
    />
  )
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  tree.props.showImage = false
  expect(tree).toMatchSnapshot();
})
