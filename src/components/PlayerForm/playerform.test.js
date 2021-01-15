import React from 'react';
import { shallow } from 'enzyme';
import PlayerForm from './PlayerForm';
import checkPropTypes, { assertPropTypes } from 'check-prop-types';
import { propTypeWarnings } from '../../Utils/index';

const setUp = (props={}) => {
  let component = shallow(<PlayerForm {...props}/>)
  return component;
}

describe('testing PlayerForm component', () => {
  let component;
  beforeEach(() => {
    //calling the spy here, causes the util function to be called, because the console.error with the wrong prop type is being called immediately upon rendering the component.
    // propTypeWarnings();
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

  describe('testing PropTypes', () => {

    // //this isn't doing anything when using check-prop-types library.
    // beforeEach(() => {
    //   propTypeWarnings();
    // })

    it ('should not throw a warning', () => {
      const testProps = {
        setPlayerNames: () => 'Fake fn',
      }
      const propsErr = checkPropTypes(PlayerForm.propTypes, testProps, 'prop', PlayerForm);
      expect(propsErr).toBeUndefined();
    })

    it ('should throw a warning', () => {
      const testProps = {
        setPlayerNames: 47,
      }
      //checkPropTypes should now throw a warning, which, because I've set up the spy to watch for console.error warnings, should turn that into a thrown exception, with an argument of 'Prop Type Failure'. But why is it not throwing the exception?
      // expect(() => {
      //   assertPropTypes(PlayerForm.propTypes, testProps, 'prop', PlayerForm)
      // }).toThrow('Prop Type Failure');

      const propsErr = (/Failed prop type/).test(checkPropTypes(PlayerForm.propTypes, testProps, 'prop', PlayerForm));
      expect(propsErr).toBe(true);
    })
  })
})
