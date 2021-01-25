import React from 'react';
import Memory from './Memory';
import renderSnapshot from '../../Utils/renderSnapshot';

test('should render Memory Component correctly', () => {
  let snapshot = renderSnapshot(<Memory />);
  expect(snapshot).toMatchSnapshot();
})
