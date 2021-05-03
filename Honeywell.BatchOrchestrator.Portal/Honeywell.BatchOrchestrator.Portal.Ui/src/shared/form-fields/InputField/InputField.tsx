/* eslint-disable @typescript-eslint/no-explicit-any */
import { Field, FieldProps, getIn, useField } from 'formik';
import { Input } from '@scuf/common';
import { at } from 'lodash';
// import { InputHTMLAttributes } from 'react';
type InputFieldType = JSX.LibraryManagedAttributes<
  typeof Input,
  Input['props']
>;

export const InputField: React.FC<InputFieldType> = ({
  children,
  ...props
}) => {
  const {
    name,
    error: errorText,
    onChange: onInputChange,
    value,
    reserveSpace,
    ...rest
  } = props;

  const [field, meta, helper] = useField(props as any);
  const { onChange, onBlur, ...remFields } = field;
  function hasError() {
    const [touched, error] = at(meta, 'touched', 'error');
    if (touched && error) {
      return error;
    }
    return '';
  }
  const handleOnChange = (e: string) => {
    helper.setValue(e.trim());
    helper.setTouched(true);
    if (onInputChange) {
      onInputChange(e.trim());
    }
  };

  return (
    <Input
      error={hasError()}
      reserveSpace={false}
      onChange={handleOnChange}
      onFocus={() => helper.setTouched(true)}
      onBlur={() => helper.setTouched(true)}
      {...remFields}
      {...rest}
    />
  );
};
