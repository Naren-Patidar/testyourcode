import React from 'react';
import { shallow } from 'enzyme';

import { EWIDetailedTaskModal, DragItem, InstructionsContainer } from '.';

const mockdata = {};

describe('<EWIDetailedTaskModal />', () => {
  let wrapper;
  test('should render EWIDetailedTaskModal', () => {
    wrapper = shallow(<EWIDetailedTaskModal {...mockdata} />);
  });
  it('renders 1 InstructionsContainer after rendering WIAuthoring component', () => {
    wrapper = shallow(<EWIDetailedTaskModal {...mockdata} />);
    expect(wrapper.find(InstructionsContainer).length).toBe(1);
  });
  it('renders 12 DragItem after rendering WIAuthoring component', () => {
    wrapper = shallow(<EWIDetailedTaskModal {...mockdata} />);
    expect(wrapper.find(DragItem).length).toBe(12);
  });
});
