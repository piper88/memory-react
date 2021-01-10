import React from 'react';
import { shallow } from 'enzyme';
import Board from './Board';

const setUp = (props) => {
  const component = shallow(<Board {...props}/>);
  return component;
}

describe('Board Component', () => {

  let component;
  beforeEach(() => {
    const props = {
      squares: ['img1', 'img2', 'img2', 'img1'],
      exposedSquares: [0],
      whichPlayer: 'A',
      onClick: () => 'fakeFn'

    }
    component = setUp(props);
  })

  it('should render without error', () => {
    let wrapper = component.find('.container');
    expect(wrapper.length).toBe(1);
  })

  it('should render squares', () => {
    let wrapper = component.find('[data-test="Board Component"]')
    expect(wrapper.length).toBe(4);
  })

  it('should render square with showImage prop equal to true if that square is in exposedSquares prop', () => {
    //Square component with an index equal to exposedSquares[0] should also have a showImage prop of true
    let wrapper = component.find('[data-test="Board Component"]');
    //have Square, now find the square that has an idnex of 0
    let square = wrapper.find(`[index=0]`);
    //now check to see if that square also has a showImage property of true
    let showImage = square.find('[showImage=true]');
    expect(showImage.length).toBe(1);
  })
})
