import React from 'react';
import { mount } from 'enzyme';

import WICardContext from './WICardContext';

const mockdata = {
  lastModifiedAt: '25 Nov 2018 10:10 AM',
};

describe('<WICardContext/>', () => {
  let wrapper;
  it('renders with WICardContext component with Props', () => {
    wrapper = mount(<WICardContext {...mockdata} />);
    expect(wrapper.find('.dt-format').length).toBe(1);
  });
});
