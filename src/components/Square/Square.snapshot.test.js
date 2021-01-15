import React from 'react';
import renderer from 'react-test-renderer';
import Square from './Square';

//snapshot tests just make sure that your UI doesn't change unexpectedly during development. Should also still write unit and functional tests, to verify that the application behaves as it should, not just that it hasn't changed
test('should render Square component correctly, with showImage prop equal to true', () => {
  const component = renderer.create(
    <Square
     showImage = {true}
     onClick = {() => 'fake callback'}
    />
  )
  //tree is just what's returned from the component
  let tree = component.toJSON();
  console.log('tree when true');
  console.log(tree);
  expect(tree).toMatchSnapshot();

})

test('should render Square component correctly, with showImage prop equal to false', () => {
  const component = renderer.create(
    <Square
    showImage={false}
    onClick = {() => 'fake callback'}
    />
  )

  let tree = component.toJSON();
  console.log('tree when false');
  console.log(tree);
  expect(tree).toMatchSnapshot();
})
