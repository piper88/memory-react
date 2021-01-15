import React from 'react';
import { shallow } from 'enzyme';
import Board from './Board';
import checkPropTypes, { assertPropTypes } from 'check-prop-types';
import { propTypeWarnings } from '../../Utils/index.js';

const setUp = (props={}) => {
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

  describe('testing proptypes', () => {
    beforeEach(() => {
      propTypeWarnings();
    })

      it('should not throw a warning', () => {
        let testProps = {
          squares: [0,1,2,3],
          exposedSquares: [0,1],
          whichPlayer: 'A',
          onClick: () => 'Fake fn',
        }

        let propsErr = checkPropTypes(Board.propTypes, testProps, 'prop', Board.name);
        expect(propsErr).toBeUndefined();
      })

      it('should throw a warning', () => {

        let testProps = {
          squares: 'please work',
          exposedSquares: [0,1],
          whichPlayer: 'B',
          onClick: () => 'Fake fn',
        }

        //Below is the way to pass a test you throw an error in.
        //to test for a thrown excpetion in jest, you have to wrap the function that is throwing the error in an anonymous function, like below. Can't just do:
        //expect.checkPropTypes(blah).toThrow('asdfasd');
        //instead must do:
        // expect(() => {
        //   checkPropTypes(Board.propTypes, testProps, 'prop', Board)
        // }).toThrow('Failed to validate prop types')
        //finally works, only if component isn't memoized
        let propsErr = (/Failed prop type/).test(checkPropTypes(Board.propTypes, testProps, 'prop', Board.name));
        expect(propsErr).toBe(true);
      })
    })

  describe('have props', () => {

    it('should render without error', () => {
      let wrapper = component.find('.container');
      expect(wrapper.length).toBe(1);
    })

    it('should render squares', () => {
      let wrapper = component.find('[data-test="Board Component"]')
      expect(wrapper.length).toBe(4);
    })

    it('should render square with showImage=true', () => {
      //Square component with an index equal to exposedSquares[0] should also have a showImage prop of true
      let wrapper = component.find('[data-test="Board Component"]');
      //find square with index of 0
      let square = wrapper.find(`[index=0]`);
      //check to see if that square has showImage prop equal to true
      let showImage = square.find('[showImage=true]');
      expect(showImage.length).toBe(1);
    })
  })
})
