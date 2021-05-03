/* eslint-disable @typescript-eslint/no-explicit-any */
import { useField } from 'formik';
import { Checkbox } from '@scuf/common';
import { at } from 'lodash';

type CheckboxFieldType = typeof Checkbox;

export const CheckboxField: CheckboxFieldType = ({ children, ...props }) => {
  const { name, checked, ...rest } = props;
  const [field, meta, helper] = useField(props as any);
  const { onChange, value, ...remFields } = field;
  //   function hasError() {
  //     const [touched, error] = at(meta, 'touched', 'error');
  //     if (touched && error) {
  //       return error;
  //     }
  //     return '';
  //   }
  const handleOnChange = (e: boolean) => {
    helper.setValue(e);
    helper.setTouched(true);
  };
  return (
    <Checkbox
      onChange={handleOnChange}
      checked={value}
      {...remFields}
      {...rest}
    />
  );
};
