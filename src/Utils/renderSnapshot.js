import React from 'react';
import renderer from 'react-test-renderer';

const renderSnapshot = (component) => {
  return renderer.create(component).toJSON();
}

export default renderSnapshot;
