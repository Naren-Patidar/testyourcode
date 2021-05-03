import React from 'react';
import { shallow, mount } from 'enzyme';

import { Accordion, Checkbox, Input } from '@scuf/common';
import { WIAuthoringContent } from '.';
import EWITaskList from '../EWITaskList';
import { EWITags } from '../EWITags';
import { EWIProElements } from '../EWIProElements';

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
  setEwiTitle: () => {},
  setEnforceOrderInTasklist: () => {},
};
const mockdataForEmptyTitle = {
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
  setEwiTitle: () => {},
  setEnforceOrderInTasklist: () => {},
};

const mockdataForMaxCharactersInTitle = {
  ewi: {
    ewi_id: '',
    ewi_title:
      'titletest1titletest1titletest1titletest1titletest1titletest1a-bc',
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
  setEwiTitle: () => {},
  setEnforceOrderInTasklist: () => {},
};

describe('<WIAuthoringContent />', () => {
  let wrapper;
  test('should render', () => {
    wrapper = shallow(<WIAuthoringContent {...mockdata} />);
  });
  it('renders Accordion after rendering WIAuthoringContent component', () => {
    wrapper = mount(<WIAuthoringContent {...mockdata} />);
    expect(wrapper.find(Accordion).length).toBe(4);
  });
  it('renders Enforce Checkbox after rendering WIAuthoringContent component', () => {
    wrapper = mount(<WIAuthoringContent {...mockdata} />);
    expect(wrapper.find(Checkbox).length).toBe(1);
  });
  it('renders Title Input after rendering WIAuthoringContent component', () => {
    wrapper = mount(<WIAuthoringContent {...mockdata} />);
    expect(wrapper.find(Input).length).toBe(1);
  });
  it('renders EWITaskList component after rendering WIAuthoringContent component', () => {
    wrapper = mount(<WIAuthoringContent {...mockdata} />);
    expect(wrapper.find(EWITaskList).length).toBe(1);
  });
  it('renders EWITags component after rendering WIAuthoringContent component', () => {
    wrapper = mount(<WIAuthoringContent {...mockdata} />);
    expect(wrapper.find(EWITags).length).toBe(1);
  });
  it('renders EWIProElements component after rendering WIAuthoringContent component', () => {
    wrapper = mount(<WIAuthoringContent {...mockdata} />);
    expect(wrapper.find(EWIProElements).length).toBe(1);
  });
  it('displays the error message when there is no title provided in the ewi', () => {
    wrapper = shallow(<WIAuthoringContent {...mockdataForEmptyTitle} />);
    expect(wrapper.find('.error').length).toBe(1);
  });
  it('displays the error message when the title entered is already having 64 characters', () => {
    wrapper = shallow(
      <WIAuthoringContent {...mockdataForMaxCharactersInTitle} />
    );
    expect(wrapper.find('.error').simulate('keypress').length).toBe(1);
  });
});
