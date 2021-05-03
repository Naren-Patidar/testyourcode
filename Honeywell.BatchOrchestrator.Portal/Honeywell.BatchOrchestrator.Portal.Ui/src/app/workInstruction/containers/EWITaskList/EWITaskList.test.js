import React from 'react';
import { shallow } from 'enzyme';
import { List } from '@scuf/common';

import EWITaskList from './EWITaskList';

const mockdata = {
  ewi: {
    ewi_id: '',
    ewi_title: '',
    description: '',
    version: '',
    enforce_order: false,
    category: '',
    status: '',
    tags: [],
    safety: [],
    attachments: [],
    view_content: [],
  },
  createDefaultThreeTaskList: () => {},
  addNewTaskToExistingList: () => {},
};

describe('<EWITaskList />', () => {
  let wrapper;
  test('should render', () => {
    wrapper = shallow(<EWITaskList {...mockdata} />);
  });
  it('renders List after rendering EWITaskList component', () => {
    wrapper = shallow(<EWITaskList {...mockdata} />);
    expect(wrapper.find(List).length).toBe(1);
  });
});
