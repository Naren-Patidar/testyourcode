import React from 'react';
import { shallow, mount } from 'enzyme';
import { Select, Button, Icon } from '@scuf/common';

import { AddTaskListModal } from '.';

const mockdata = {
  isShow: true,
  onClose: () => {},
  ewiList: [
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
  getEwi: () => {},
  ewiTaskList: [],
  addTaskFromImportTaskList: () => {},
};

const mockdataForModalHide = {
  isShow: false,
  onClose: () => {},
  ewiList: [
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
  getEwi: () => {},
  ewiTaskList: [],
  addTaskFromImportTaskList: () => {},
};

describe('<AddTaskListModal />', () => {
  let wrapper;
  test('should render', () => {
    wrapper = shallow(<AddTaskListModal {...mockdata} />);
  });
  it('renders with correct classname show for the props isShow true', () => {
    wrapper = mount(<AddTaskListModal {...mockdata} />);
    expect(wrapper.find('.show').length).toBe(1);
  });
  it('renders without classname show for the props isShow false', () => {
    wrapper = mount(<AddTaskListModal {...mockdataForModalHide} />);
    expect(wrapper.find('.show').length).toBe(0);
  });
  it('renders Icon after rendering AddTaskListModal component', () => {
    wrapper = mount(<AddTaskListModal {...mockdata} />);
    expect(wrapper.find(Icon).length).toBe(1);
  });
  it('renders Select after rendering AddTaskListModal component', () => {
    wrapper = mount(<AddTaskListModal {...mockdata} />);
    expect(wrapper.find(Select).length).toBe(2);
  });
  it('renders Button after rendering AddTaskListModal component', () => {
    wrapper = mount(<AddTaskListModal {...mockdata} />);
    expect(wrapper.find(Button).length).toBe(1);
  });
});
