import React from 'react';
import { shallow } from 'enzyme';
import GameInfo from './GameInfo';
import checkPropTypes from 'check-prop-types';

const setUp = (props={}) => {
  let component = shallow(<GameInfo {...props} />);
  return component;
}

describe ('GameInfo Component', () => {
  let component;
  beforeEach(() => {
    const props = {
      playerA: {name: 'Sarah', matches: 0},
      playerB: {name: 'Piper', matches: 0},
      fillSquares: () => 'Fake fn',
    }
    component = setUp(props);
  })

  describe('testing prop types', () => {

    it('should not throw a warning', () => {
      const testProps = {
        playerA: {name: 'dog', matches: 5},
        playerB: {name: 'human', matches: 2},
        fillSquares: () => 'Fake fn',
      }
      const propsErr = checkPropTypes(GameInfo.propTypes, testProps, 'prop', GameInfo);
      expect(propsErr).toBeUndefined();
    })

    it('should throw a warning', () => {
      const testProps = {
        playerA: 'dog',
        playerB: {name: 'Sarah', matches: 0},
        fillSquares: () => 'Fake fn',
      }

      const propsErr = (/Failed prop type/).test(checkPropTypes(GameInfo.propTypes.playerA, testProps.playerA, 'prop', GameInfo));
      expect(propsErr).toBe(true);

    })
  })

  describe('have props', () => {
    it ('should render without error', () => {
      let wrapper = component.find(`[data-test="GameInfo Component"]`);
      expect(wrapper.length).toBe(1);
    })

    it('should render a button', () => {
      let wrapper = component.find(`[data-test="GameInfo Component"]`);
      expect(wrapper.containsMatchingElement('<button>'))
    })

    it('should render a ul', () => {
      let wrapper = component.find(`[data-test="GameInfo Component"]`);
      expect(wrapper.containsMatchingElement('<ul>'))
    })
  });
})
