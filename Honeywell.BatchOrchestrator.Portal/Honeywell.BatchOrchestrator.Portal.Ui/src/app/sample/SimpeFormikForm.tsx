import { Input } from '@scuf/common';
import { Field, Formik } from 'formik';
import { InputField } from 'shared/form-fields';

export const BasicExample = () => (
  <div>
    <h1>My Form</h1>
    <Formik
      initialValues={{ name: 'jared' }}
      onSubmit={(values, actions) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
        }, 1000);
      }}
    >
      {(props) => (
        <form onSubmit={props.handleSubmit}>
          <InputField name="name" type="text" />
          {/* {props.errors.name && <div id="feedback">{props.errors.name}</div>} */}
          <button type="submit">Submit</button>
        </form>
      )}
    </Formik>
  </div>
);
