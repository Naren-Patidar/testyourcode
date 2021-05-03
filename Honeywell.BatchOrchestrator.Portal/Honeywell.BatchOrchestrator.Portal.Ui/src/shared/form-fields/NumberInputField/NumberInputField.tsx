/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input } from '@scuf/common';
import { useField } from 'formik';
import { at } from 'lodash';

type InputFieldType = JSX.LibraryManagedAttributes<
  typeof Input,
  Input['props']
>;

export const NumberInputField: React.FC<InputFieldType> = ({
  children,
  ...props
}) => {
  const { name, error: errorText, value, reserveSpace, ...rest } = props;

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
    // if (e.length) {
    //   if (!Number(e)) {
    //     return;
    //   }
    //   helper.setValue(+e);
    //   helper.setTouched(true);
    //   return;
    // }
    helper.setValue(e);
    helper.setTouched(true);
  };

  return (
    <Input
      type="number"
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
