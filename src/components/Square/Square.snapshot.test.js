import React from 'react';
import Square from './Square';
import renderSnapshot from '../../Utils/renderSnapshot';

//snapshot tests just make sure that your UI doesn't change unexpectedly during development. Should also still write unit and functional tests, to verify that the application behaves as it should, not just that it hasn't changed
test('should render Square component correctly, with showImage prop equal to true', () => {
  let snapshot = renderSnapshot(
    <Square
     showImage = {true}
     onClick = {() => 'fake callback'}
     />)
  expect(snapshot).toMatchSnapshot();
})

test('should render Square component correctly, with showImage prop equal to false', () => {
  let snapshot = renderSnapshot(
    <Square
    showImage={false}
    onClick = {() => 'fake callback'}
    />
  )
  expect(snapshot).toMatchSnapshot();
})
