import React from 'react';
import { mount, shallow } from 'enzyme';
import { Modal } from '@scuf/common';

import WIAuthoring from './WIAuthoring';
import { WIAuthoringContent } from '../WIAuthoringContent';
import { WIAuthoringActions } from '../WIAuthoringActions';

const mockdata = {
  isAuthoringScreenActive: true,
  setAuthoringScreenActiveStatus: () => {},
};

describe('<WIAuthoring />', () => {
  let wrapper;
  test('should render', () => {
    wrapper = shallow(<WIAuthoring {...mockdata} />);
  });
  it('renders Modal after rendering WIAuthoring component', () => {
    wrapper = shallow(<WIAuthoring {...mockdata} />);
    expect(wrapper.find(Modal).length).toBe(1);
  });
  it('renders WIAuthoringContent after rendering WIAuthoring component', () => {
    wrapper = shallow(<WIAuthoring {...mockdata} />);
    expect(wrapper.find(WIAuthoringContent).length).toBe(1);
  });
  it('renders WIAuthoringActions after rendering WIAuthoring component', () => {
    wrapper = shallow(<WIAuthoring {...mockdata} />);
    expect(wrapper.find(WIAuthoringActions).length).toBe(1);
  });
});
