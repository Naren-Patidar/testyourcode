/* eslint-disable @typescript-eslint/no-explicit-any */
import { DatePicker } from '@scuf/common';
import { useField } from 'formik';
import { at } from 'lodash';
import { useState } from 'react';

type DatePickerFieldType = JSX.LibraryManagedAttributes<
  typeof DatePicker,
  DatePicker['props']
>;

export const DatePickerField: React.FC<DatePickerFieldType> = ({
  children,
  ...props
}) => {
  const { name, error: errorText, value, reserveSpace, ...rest } = props;
  const [field, meta, helper] = useField(props as any);
  const [err, setErr] = useState<string>();
  const { onChange, ...remFields } = field;
  function hasError() {
    const [touched, error] = at(meta, 'touched', 'error');
    if (touched && error) {
      return error;
    }
    return '';
  }
  const handleOnChange = (e: Date) => {
    helper.setValue(e);
    helper.setTouched(true);
  };
  return (
    <DatePicker
      error={hasError() || err}
      reserveSpace={false}
      onChange={handleOnChange}
      onTextChange={(e, error) => {
        helper.setTouched(true);
        setErr(error);
      }}
      closeOnSelection
      closeOnDocumentClick
      {...remFields}
      {...rest}
    />
  );
};
