import React from 'react';
//maybe helpful for testing winner component?
import Game from './Game';
import {render, screen} from '@testing-library/react'
import { shallow, mount } from 'enzyme';
import renderSnapshot from '../../Utils/renderSnapshot';

const renderComponent = () => (
  shallow(<Game />)
)

test('should render PlayerForm', () => {
  let snapshot = renderSnapshot(<Game />)
  expect(snapshot).toMatchSnapshot();

})

test('should render Board component', () => {
  //create shallow rendering of component
  let shallowComponent = renderComponent();
  //call setPlayerNames prop, which will setShowForm to false
  shallowComponent.props().setPlayerNames('Sarah', 'Piper');
  let snapshot = renderSnapshot(shallowComponent);
  // let component = renderer.create(shallowComponent);
  // let tree = component.toJSON();
  expect(snapshot).toMatchSnapshot();
});

//having trouble figuring out how to test rendering of Winner component. Since no function that calls the setWinner...maybe use render() method? Maybe sinon? tbd
//in order to avoid testing implementation details (details the user doesn't see), you should instead simulate what the user will be doing. So in order to set winner, have to have exposedSquares.length === gameSquares.length && gameSquares.length > 0. Which is quite a length process to go throough.
