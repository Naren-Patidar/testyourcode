import React from 'react';
import { shallow, mount } from 'enzyme';

import { DocumentLinkModal } from '.';

const mockdata = {};
const action = jest.fn();
describe('<DocumentLinkModal />', () => {
  let wrapper;
  test('should render', () => {
    wrapper = shallow(<DocumentLinkModal {...mockdata} onAction={action} />);
  });
  it('renders with correct classname .dropdown-menu', () => {
    wrapper = shallow(<DocumentLinkModal {...mockdata} />);
    expect(wrapper.find('.dropdown-menu').length).toBe(1);
  });
});
