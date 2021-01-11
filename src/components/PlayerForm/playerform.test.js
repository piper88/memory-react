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
    let form = component.find(`[data-test="Player Form"]`);
    expect(form.length).toBe(1);
  })
})
