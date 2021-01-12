import React from 'react';
import { shallow } from 'enzyme';
import PlayerForm from './PlayerForm';

const setUp = (props) => {
  let component = shallow(<PlayerForm {...props}/>)
  return component;
}

describe('testing PlayerForm component', () => {
  let component;
  beforeEach(() => {
    const props = {
      setPlayerNames: () => 'Fake fn'
    }
    component = setUp(props);
  });

  it('should render without errors', () => {
    let wrapper = component.find(`[data-test="Player Form"]`);
    expect(wrapper.length).toBe(1);
  })

  it('should render two input tags for player names', () => {
    let wrapper = component.find('input');
    expect(wrapper.length).toBe(2);
  })

  it('should return null if showForm is false', () => {
    let wrapper = component.find('form').simulate('submit', {
      //a fake function that gets passed to event handlers (handleSubmit in this case). Event was undefined and throwing an error, now it's just this empty function
      preventDefault: () => {}
    })
    wrapper = component.find(`[data-test="PLayer Form"]`);
    expect(wrapper.length).toBe(0);
  })
})
