import React from 'react';
import { shallow } from 'enzyme';
import Game from './Game';
import PlayerForm from '../PlayerForm/PlayerForm'

const setUp = () => {
  let component = shallow(<Game />)
  return component;
}

describe('testing Game Component', () => {
  let component;
  beforeEach(() => {
    component = setUp();
  })
  it ('should render Player Form without errors', () => {
    let wrapper = component.find(`[data-test="Player Form"]`);
    expect(wrapper.length).toBe(1);
    wrapper = component.find(`[data-test="Board and GameInfo"]`);
    expect(wrapper.length).toBe(0);
    wrapper = component.find(`[data-test="Winner"]`);
    expect(wrapper.length).toBe(0)
  })

//props() returns props object for root node of wrapper. Must be a single node wrapper. The wrapper is now a double node wrapper, so can't call props. Call childAt(1) first
  it('should render Board and GameInfo if showForm is false', () => {
    let childComponent = component.find('.title-container').childAt(1);
    childComponent.props().setPlayerNames('whoeever', 'nobody');
    let wrapper = component.find(`[data-test="Board and GameInfo"]`);
    expect(wrapper.length).toBe(1);
    wrapper = component.find(`[data-test="Player Form"]`);
    expect(wrapper.length).toBe(0);
    wrapper = component.find(`[data-test="Winner"]`);
    expect(wrapper.length).toBe(0)
  })
})
