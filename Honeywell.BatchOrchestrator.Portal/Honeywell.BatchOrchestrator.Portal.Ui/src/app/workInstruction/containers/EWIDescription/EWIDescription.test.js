import React from 'react';
import { shallow, mount } from 'enzyme';
import { TextArea } from '@scuf/common';

import { EWIDescription } from '.';

const mockdata = {
  ewi: {
    description: '',
  },
  setEwiDescription: () => {},
};

const mockdataForMaxCharactersInDescription = {
  ewi: {
    description:
      'descriptindescriptindescriptindescriptindescriptindescriptindescriptindescriptindescriptindescriptindescriptindescriptindescriptindescriptindescriptindescriptindescriptindescriptindescriptindescriptindescriptindescriptindescriptindescriptindescriptindescriptindescriptindescriptindescriptindescriptindescriptindescriptindescriptindescriptindescriptindescriptindescriptindescriptindescriptindescriptindescriptindescriptindescriptindescriptindescriptindescriptindescriptindescriptindescriptindescriptin',
  },
  setEwiDescription: () => {},
};

describe('<EWIDescription />', () => {
  let wrapper;
  test('should render', () => {
    wrapper = shallow(<EWIDescription {...mockdata} />);
  });
  it('renders with correct classname description-box in EWIDescription', () => {
    wrapper = mount(<EWIDescription {...mockdata} />);
    expect(wrapper.find('.description-box').length).toBe(1);
  });
  it('renders TextArea after rendering EWIDescription component', () => {
    wrapper = mount(<EWIDescription {...mockdata} />);
    expect(wrapper.find(TextArea).length).toBe(1);
  });
  it('displays the error message when the description entered is already having 500 characters', () => {
    wrapper = shallow(
      <EWIDescription {...mockdataForMaxCharactersInDescription} />
    );
    expect(wrapper.find('.error').simulate('keypress').length).toBe(1);
  });
});
