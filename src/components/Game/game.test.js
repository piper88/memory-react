import React from 'react';
import { shallow } from 'enzyme';
import Game from './Game';

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

  it('should render Board and GameInfo if showForm is false', () => {
    component.props().setPlayerNames('whoeever', 'nobody');
    let wrapper = component.find(`[data-test="Board and GameInfo"]`);
    expect(wrapper.length).toBe(1);
    wrapper = component.find(`[data-test="Player Form"]`);
    expect(wrapper.length).toBe(0);
    wrapper = component.find(`[data-test="Winner"]`);
    expect(wrapper.length).toBe(0)
  })
})
