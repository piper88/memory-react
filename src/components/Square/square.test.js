import React from 'react';
import Square from './Square.js';
import { shallow } from 'enzyme';

const setUp = (props={}) => {
  const component = shallow(<Square {...props} />)
  return component;
}

describe('Square Component', () => {

  let component;
  beforeEach(() => {
    const props = {
      showImage: true,
      square: 'image.img',
      onClick: () => null
    }
    component = setUp(props);
  })

  it('should render without errors', () => {
    console.log(component)
    const wrapper = component.find(`[data-test="Square Component"]`);
    expect(wrapper.length).toBe(1);
  });

  it('should render an image', () => {
    const wrapper = component.containsMatchingElement(<img src={component.square} alt=""/>)
    expect(wrapper).toBe(true);
  })

  it('should not render an image', () => {
    component.showImage=false;
    const wrapper = component.containsMatchingElement(<img src={component.square} alt="" />)
    expect(wrapper.length).toBe(undefined)
  })
})
