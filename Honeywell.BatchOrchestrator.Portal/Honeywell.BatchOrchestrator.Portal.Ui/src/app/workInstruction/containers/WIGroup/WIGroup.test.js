import React from 'react';
import { mount } from 'enzyme';

import WIGroup from './WIGroup';
import WIGroupHeader from '../WIGroupHeader';
import WICard from '../WICard';

const mockdata = {
  heading: 'Drafts',
  showButton: true,
  items: [
    {
      id: '15b00be6-f17b-4e15-847f-20d7dbfe6d3f',
      workInstrId: '100104',
      title: 'C-BMR Mfg - Clean & Charge',
      description: 'Seeding - II (Purification)',
      status: 1,
      version: '01.0001',
      lastModifiedAt: '2020-12-10T22:07:17.0186915+05:30',
    },
    {
      id: '15b00be6-f17b-4e15-847f-20d7dbfe6d3e',
      workInstrId: 100103,
      title: 'A-BMR Mfg Procedure',
      description: 'Manufacturing Procedure',
      status: 1,
      version: '01.0001',
      lastModifiedAt: '2020-12-10T22:07:17.018525+05:30',
    },
  ],
};

describe('<WIGroup/>', () => {
  let wrapper;
  it('renders with WI Group class', () => {
    wrapper = mount(<WIGroup {...mockdata} />);
    expect(wrapper.find('.wi-group').length).toBe(1);
  });
  it('renders WI Group Header component', () => {
    wrapper = mount(<WIGroup {...mockdata} />);
    expect(wrapper.find(WIGroupHeader).length).toBe(1);
  });
  it('renders array of the WI card components', () => {
    wrapper = mount(<WIGroup {...mockdata} />);
    expect(wrapper.find(WICard).length).toBe(2);
  });
});
