import React, { useState, useEffect } from 'react';
import { shallow, mount } from 'enzyme';
import { Input, Icon, VerticalMenu } from '@scuf/common';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { EWITags } from './EWITags';

const mockdata = {
  addTag: true,
  sugest: true,
  ewi: {
    tags: [
      {
        id: '1204b482-f25a-44cb-95b0-8687845c4dbb',
        name: 'Tag1',
      },
      {
        id: '985c658e-f2df-4f52-9c4d-bfe3895eed2a',
        name: 'Tag2',
      },
      {
        id: 'faa42c77-c63a-4320-96c4-e49c4c1cd3f4',
        name: 'Tag3',
      },
    ],
    tagsuggest: [],
  },
  addNewTagToExistingList: () => {},
  editTag: () => {},
  suggestTag: () => {},
  deleteTagFromTag: () => {},
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
    ewi: {
      tags: [
        {
          id: '1204b482-f25a-44cb-95b0-8687845c4dbb',
          name: 'Tag1',
        },
        {
          id: '985c658e-f2df-4f52-9c4d-bfe3895eed2a',
          name: 'Tag2',
        },
        {
          id: 'faa42c77-c63a-4320-96c4-e49c4c1cd3f4',
          name: 'Tag3',
        },
      ],
      tagsuggest: [],
    },
  },
  setSelectedTaskToEdit: () => {},
  deleteTaskFromTaskList: () => {},
  moveTaskInTaskList: () => {},
  index: 0,
};

describe('<EWITags />', () => {
  let wrapper;
  test('should render', () => {
    wrapper = shallow(
      <DndProvider backend={HTML5Backend}>
        <EWITags {...mockdata} />
      </DndProvider>
    );
  });
  it('rendering EWITags component', () => {
    wrapper = mount(
      <DndProvider backend={HTML5Backend}>
        <EWITags {...mockdata} />
      </DndProvider>
    );
    expect(wrapper.find(VerticalMenu).length).toBe(0);
  });
  it('renders Icon after rendering EWITags component', () => {
    wrapper = mount(
      <DndProvider backend={HTML5Backend}>
        <EWITags {...mockdata} />
      </DndProvider>
    );
    expect(wrapper.find('.cursor-hover').length).toBe(1);
  });
  it('renders Input after rendering EWITags component', () => {
    wrapper = mount(
      <DndProvider backend={HTML5Backend}>
        <EWITags {...mockdata} />
      </DndProvider>
    );
    expect(wrapper.find(Input).length).toBe(0);
  });
  it('renders Icon after rendering EWITags component', () => {
    wrapper = mount(
      <DndProvider backend={HTML5Backend}>
        <EWITags {...mockdata} />
      </DndProvider>
    );
    expect(wrapper.find('.tags-list').length).toBe(1);
  });
});
