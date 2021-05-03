import React from 'react';
import { mount } from 'enzyme';

import { Icon, Popup } from '@scuf/common';
import WICard from './WICard';
import Heading from '../Generic/Heading/Heading';
import WICardContext from '../WICardContext';

const mockdata = {
  ewi: {
    id: '15b00be6-f17b-4e15-847f-20d7dbfe6d3f',
    workInstrId: '100104',
    title: 'C-BMR Mfg - Clean & Charge',
    description: 'Seeding - II (Purification)',
    status: 1,
    version: '01.0001',
    lastModifiedAt: '2020-12-10T22:07:17.0186915+05:30',
  },
};
describe('<WICard/>', () => {
  let wrapper;
  it('renders with WI card class', () => {
    wrapper = mount(<WICard {...mockdata} />);
    expect(wrapper.find('.wi-card').length).toBe(1);
  });
  it('renders generic heading component', () => {
    wrapper = mount(<WICard {...mockdata} />);
    expect(wrapper.find(Heading).length).toBe(1);
  });
  it('renders Popup from Scuf Library', () => {
    wrapper = mount(<WICard {...mockdata} />);
    expect(wrapper.find(Popup).length).toBe(1);
  });
  it('renders Icon in the Card Component', () => {
    wrapper = mount(<WICard {...mockdata} />);
    expect(wrapper.find(Icon).length).toBe(1);
  });
  it('renders WICardContext Component', () => {
    wrapper = mount(<WICard {...mockdata} />);
    expect(wrapper.find(WICardContext).length).toBe(1);
  });
});
