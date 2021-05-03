import React from 'react';
import { shallow, mount } from 'enzyme';
import { Icon, Radio } from '@scuf/common';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { EWITask } from '.';

const mockdata = {
  task: {
    display_seq: 1,
    key: '',
    instruction_name: '',
    description: '',
    disabled: false,
    input: false,
    type: '',
    components: [],
  },
  setSelectedTaskToEdit: () => {},
  deleteTaskFromTaskList: () => {},
  moveTaskInTaskList: () => {},
  index: 0,
};

const mockdataForCondition = {
  task: {
    display_seq: 1,
    key: '',
    instruction_name: '',
    description: '',
    disabled: false,
    input: false,
    type: '',
    components: [
      {
        key: 110230,
        label: 'AV-',
        description: 'enter Agitated Vessel number.',
        disabled: false,
        input: true,
        required: true,
        type: 'textfield',
        units: '',
        attributes: {
          min_length: 3,
          max_length: 10,
        },
      },
    ],
  },
  setSelectedTaskToEdit: () => {},
  deleteTaskFromTaskList: () => {},
  moveTaskInTaskList: () => {},
  index: 0,
};

describe('<EWITask />', () => {
  let wrapper;
  test('should render', () => {
    wrapper = shallow(
      <DndProvider backend={HTML5Backend}>
        <EWITask {...mockdata} />
      </DndProvider>
    );
  });
  it('renders Radio after rendering EWITask component', () => {
    wrapper = mount(
      <DndProvider backend={HTML5Backend}>
        <EWITask {...mockdata} />
      </DndProvider>
    );
    expect(wrapper.find(Radio).length).toBe(1);
  });
  it('renders Icon after rendering EWITask component', () => {
    wrapper = mount(
      <DndProvider backend={HTML5Backend}>
        <EWITask {...mockdata} />
      </DndProvider>
    );
    expect(wrapper.find(Icon).length).toBe(3);
  });
  it('renders one more Icon after checking length Condition', () => {
    wrapper = mount(
      <DndProvider backend={HTML5Backend}>
        <EWITask {...mockdataForCondition} />
      </DndProvider>
    );
    expect(wrapper.find(Icon).length).toBe(4);
  });
});
