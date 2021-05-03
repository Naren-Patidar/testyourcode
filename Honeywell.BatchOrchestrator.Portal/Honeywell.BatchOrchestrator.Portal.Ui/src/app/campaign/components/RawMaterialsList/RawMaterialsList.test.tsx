import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { Checkbox, Input } from '@scuf/common';
import { DataTable } from '@scuf/datatable';
import { RawMaterialsList } from './RawMaterialsList';

describe('<RawMaterialsList />', () => {
  let wrapper: ShallowWrapper;
  beforeEach(() => {
    wrapper = shallow(
      <RawMaterialsList
        data={[]}
        onShowNameToggle={() => {}}
        searchRawMaterials={() => {}}
      />
    );
  });
  describe('<Input />', () => {
    it('should render <Input /> for search', () => {
      expect(wrapper.find(Input)).toHaveLength(1);
    });
    it('should trigger searchRawMaterials on text change', () => {});
  });
  describe('<Checkbox />', () => {
    it('should render <Checkbox /> to toggle name and checkbox', () => {
      expect(wrapper.find(Checkbox)).toHaveLength(1);
    });
    it('should trigger onShowNameToggle on change', () => {});
  });
  it('should render <DataTable/>', () => {
    expect(wrapper.find(DataTable)).toHaveLength(1);
  });
});
