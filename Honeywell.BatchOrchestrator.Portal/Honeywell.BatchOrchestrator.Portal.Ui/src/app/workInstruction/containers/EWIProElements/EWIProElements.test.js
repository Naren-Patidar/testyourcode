import React from 'react';
import { shallow } from 'enzyme';

import { EWIProElements } from '.';

const mockdata = {};

describe('<EWIProElements />', () => {
  let wrapper;
  test('should render', () => {
    wrapper = shallow(<EWIProElements {...mockdata} />);
  });
});
