import React from 'react';
import { mount, shallow } from 'enzyme';
import { Checkbox, Icon, Input, List } from '@scuf/common';

import { SafetyCheckModal } from '.';

const mockdata = {
  activeModalPopup: '',
  onCloseOfModalPopup: () => {},
  safetyItemList: [
    {
      id: 1,
      name: 'Ear protection',
      icon: 'user',
      isCustom: false,
      isChecked: false,
      isFocused: false,
    },
    {
      id: 2,
      name: 'Hard hat',
      icon: 'user',
      isCustom: true,
      isChecked: false,
      isFocused: true,
    },
  ],
  setCheckedStatusInSafetyItems: () => {},
  addCustomSafetyItem: () => {},
  onChangeOfSafetyItemText: () => {},
  canEditSafetyItemText: () => {},
  deleteCustomSafetyItem: () => {},
  saveCheckedSafetyItems: () => {},
};

describe('<SafetyCheckModal />', () => {
  let wrapper;
  test('should render', () => {
    wrapper = shallow(<SafetyCheckModal {...mockdata} />);
  });
  it('renders List after rendering SafetyCheckModal component', () => {
    wrapper = mount(<SafetyCheckModal {...mockdata} />);
    expect(wrapper.find(List).length).toBe(1);
  });
  it('renders Input after rendering SafetyCheckModal component based on the condition', () => {
    wrapper = mount(<SafetyCheckModal {...mockdata} />);
    expect(wrapper.find(Input).length).toBe(1);
  });
  it('renders Icon after rendering SafetyCheckModal component based on the condition', () => {
    wrapper = mount(<SafetyCheckModal {...mockdata} />);
    expect(wrapper.find(Icon).length).toBe(3);
  });
  it('renders Checkbox after rendering SafetyCheckModal component', () => {
    wrapper = mount(<SafetyCheckModal {...mockdata} />);
    expect(wrapper.find(Checkbox).length).toBe(2);
  });
});
