import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { shallow } from 'enzyme';
import { App } from '.';

test('renders the component', () => {
  const component = shallow(<App />);
  expect(component).toMatchSnapshot();
});
