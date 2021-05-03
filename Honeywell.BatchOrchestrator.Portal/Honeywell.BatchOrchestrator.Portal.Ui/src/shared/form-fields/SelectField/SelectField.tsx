/* eslint-disable @typescript-eslint/no-explicit-any */
import { useField } from 'formik';
import { Select } from '@scuf/common';
import { at } from 'lodash';

type SelectFieldType = JSX.LibraryManagedAttributes<
  typeof Select,
  Select['props']
>;

export const SelectField: React.FC<SelectFieldType> = ({
  children,
  ...props
}) => {
  const {
    name,
    error: errorText,
    value,
    onChange: onSelectionChange,
    reserveSpace,
    ...rest
  } = props;

  const [field, meta, helper] = useField(props as any);
  const { onChange, ...remFields } = field;
  function renderHelperText() {
    const [touched, error] = at(meta, 'touched', 'error');
    if (touched && error) {
      return error;
    }
    return '';
  }
  const handleOnChange = (e: any) => {
    helper.setValue(e);
    helper.setTouched(true);
    if (onSelectionChange) {
      onSelectionChange(e);
    }
  };

  return (
    <Select
      reserveSpace={false}
      error={renderHelperText()}
      onChange={handleOnChange}
      onClose={(e) => helper.setTouched(true)}
      {...remFields}
      {...rest}
    />
  );
};
