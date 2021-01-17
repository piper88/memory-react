//This is only running if I manually call console.error in the test. If I use check-prop-types library, a console.error is (I think) running, but for some reason isn't triggering this to run...
//this is also running during the failed test 'should render without errors', if a prop type warning is thrown in the browser.
const propTypeWarnings = () => {
  const originalConsoleError = global.console.error;

//I think this doesn't work nicely with checkPropTypes. This utility function works with console.errors in the browser console. With checkPropTypes, the warning isn't coming through the browser?
//but this isn't even being called with a warning in the browser...
global.console.error = (...args) => {
    const propTypeErrors = [/Failed prop type/, /Warning: Failed/];
    //array.some(callback(element)) -- if callback returns true for any item in array, returns true.
    //test() method runs a search for a match between a regex object and a string
    //regexobj.test(str). Returns boolean
    if (propTypeErrors.some(warning => warning.test(args[0]))) {
      throw new Error('Prop Type Failure');
    }
    console.error(originalConsoleError);
  }
}

export default propTypeWarnings;
