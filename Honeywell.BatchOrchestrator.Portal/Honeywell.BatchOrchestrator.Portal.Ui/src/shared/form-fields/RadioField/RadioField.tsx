/* eslint-disable @typescript-eslint/no-explicit-any */

import { useField } from 'formik';
import { Radio } from '@scuf/common';
import { at } from 'lodash';

type RadioFieldType = typeof Radio;

export const RadioField: RadioFieldType = ({ children, ...props }) => {
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
  //   const handleOnChange = () => {
  //     helper.setValue(e);
  //   };
  return <Radio {...remFields} {...rest} />;
};
