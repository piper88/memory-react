import React from 'react';
import { shallow } from 'enzyme';
import Memory from './Memory';

const setUp = () => {
  let component = shallow(<Memory />);
  return component;
}

describe('testing Memory component', () => {
  let component;
  beforeEach(() => {
    component = setUp();
  })
  it('should render without errors', () => {
    let wrapper = component.find(`[data-test='Game Component']`)
    expect(wrapper.length).toBe(1);
  })
})
