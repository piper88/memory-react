import React from 'react';
import renderer from 'react-test-renderer';
import Square from './Square';

//snapshot tests just make sure that your UI doesn't change unexpectedly during development. Should also still write unit and functional tests, to verify that the application behaves as it should, not just that it hasn't changed
test('should render Square component correctly, with showImage prop equal to true as well as false', () => {
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
