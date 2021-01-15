import React from 'react';
import Winner from './Winner';
import { shallow } from 'enzyme';
import checkPropTypes from 'check-prop-types';

const setUp = (...props) => {
  let component = shallow(<Winner {...props} />);
  return component;
}

describe('testing Winner component', () => {

  let component;
  beforeEach(() => {
    component = setUp({winner: 'me'});
  })

  describe('testing prop types', () => {

    it('should not throw a warning', () => {
      const testProps = {
        winner: 'me'
      }

      const propsErr = checkPropTypes(Winner.propTypes, testProps, 'prop', Winner);
      expect(propsErr).toBeUndefined();
    })

    it('should throw a warning', () => {
      const testProps = {
        winner: true,
      }

      const propsErr = (/Failed prop type/).test(checkPropTypes(Winner.propTypes, testProps, 'prop', Winner));
      expect(propsErr).toBe(true);
    })
  })

  describe('have props', () => {
    it('should render without error', () => {
      let wrapper = component.find(`[data-test="Winner Component"]`);
      expect(wrapper.length).toBe(1);
    })
  })
})
