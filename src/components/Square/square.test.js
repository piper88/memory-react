import React from 'react';
import Square from './Square.js';
import { shallow } from 'enzyme';

const setUp = (props) => {
  const component = shallow(<Square {...props} />)
  console.log(component)
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
    const wrapper = component.find(`[data-test="Square Component"]`);
    expect(wrapper.length).toBe(1);
  });
})
