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
      exposedSquares: [0,1],
      whichPlayer: 'A',
      onClick: () => 'fakeFn'

    }
    component = setUp(props);
  })

  it('should render without error', () => {
    let wrapper = component.find(`[className="container"]`);
    expect(wrapper.length).toBe(1);
  })
})
