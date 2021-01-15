export const propTypeWarnings = () => {
  const originalConsoleError = global.console.error;

//I think this doesn't work nicely with checkPropTypes. This utility function works with console.errors in the browser console. With checkPropTypes, the warning isn't coming through the browser?
global.console.error = (...args) => {
    console.log('!!!!');
    console.log(...args);
    const propTypeErrors = [/Failed prop type/, /Warning: Failed/];

    //array.some(callback(element)) -- if callback returns true for any item in array, returns true.
    //test() method runs a search for a match between a regex object and a string
    //regexobj.test(str). Returns boolean
    if (propTypeErrors.some(warning => warning.test(args[0]))) {
      throw new Error(args[0]);
    }
    console.error(originalConsoleError);
  }
}
