import React from 'react';
//maybe helpful for testing winner component?
import {render, screen} from '@testing-library/react'
import renderer from 'react-test-renderer';
import { shallow, mount } from 'enzyme';
import Game from './Game';

const renderComponent = () => (
  shallow(<Game />)
)

test('should render PlayerForm', () => {
  let component = renderer.create( <Game /> )
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

})

test('should render Board component', () => {
  //create shallow rendering of component
  let shallowComponent = renderComponent();
  //call setPlayerNames prop, which will setShowForm to false
  shallowComponent.props().setPlayerNames('Sarah', 'Piper');
  let component = renderer.create(shallowComponent);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

//having trouble figuring out how to test rendering of Winner component. Since no function that calls the setWinner...maybe use render() method? Maybe sinon? tbd
//in order to avoid testing implementation details (details the user doesn't see), you should instead simulate what the user will be doing. So in order to set winner, have to have exposedSquares.length === gameSquares.length && gameSquares.length > 0. Which is quite a length process to go throough.
