import React from 'react';
import { shallow, mount } from 'enzyme';
import { Modal } from '@scuf/common';

import { DeleteEWIModal } from '.';

const mockdata = {};

describe('<DeleteEWIModal />', () => {
  let wrapper;
  test('should render', () => {
    wrapper = shallow(<DeleteEWIModal {...mockdata} />);
  });
  it('renders Modal after rendering DeleteEWIModal component', () => {
    wrapper = mount(<DeleteEWIModal {...mockdata} />);
    expect(wrapper.find(Modal).length).toBe(1);
  });
});
