import React from 'react';
import { mount } from 'enzyme';
import { Button } from '@scuf/common';

import WIGroupHeader from './WIGroupHeader';

const mockdata = {
  heading: 'Draft',
  showButton: true,
};

describe('<WICardContext/>', () => {
  let wrapper;
  it('renders with WICardContext component with Props', () => {
    wrapper = mount(<WIGroupHeader {...mockdata} />);
    expect(wrapper.find(Button).length).toBe(1);
  });
});
