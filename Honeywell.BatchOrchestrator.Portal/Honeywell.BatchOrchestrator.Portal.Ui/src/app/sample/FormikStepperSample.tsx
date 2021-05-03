/* eslint-disable no-nested-ternary */
import { Button, Card, Checkbox, Grid, Input, Stepper } from '@scuf/common';
import { Field, Form, Formik, FormikConfig, FormikValues } from 'formik';
import React, { useState } from 'react';
import { InputField } from 'shared/form-fields';
import { mixed, number, object } from 'yup';

const sleep = (time) => new Promise((acc) => setTimeout(acc, time));
export interface FormikStepProps
  extends Pick<FormikConfig<FormikValues>, 'children' | 'validationSchema'> {
  label: string;
}

export function FormikStep({ children }: FormikStepProps) {
  return <>{children}</>;
}

export function FormikStepper({
  children,
  ...props
}: FormikConfig<FormikValues>) {
  const childrenArray = React.Children.toArray(
    children
  ) as React.ReactElement<FormikStepProps>[];
  const [step, setStep] = useState(0);
  const currentChild = childrenArray[step];
  const [completed, setCompleted] = useState(false);

  function isLastStep() {
    return step === childrenArray.length - 1;
  }

  return (
    <Formik
      {...props}
      validationSchema={currentChild.props.validationSchema}
      onSubmit={async (values, helpers) => {
        if (isLastStep()) {
          await props.onSubmit(values, helpers);
          setCompleted(true);
        } else {
          setStep((s) => s + 1);

          // the next line was not covered in the youtube video
          //
          // If you have multiple fields on the same step
          // we will see they show the validation error all at the same time after the first step!
          //
          // If you want to keep that behaviour, then, comment the next line :)
          // If you want the second/third/fourth/etc steps with the same behaviour
          //    as the first step regarding validation errors, then the next line is for you! =)
          //
          // In the example of the video, it doesn't make any difference, because we only
          //    have one field with validation in the second step :)
          helpers.setTouched({});
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form autoComplete="off">
          {/* <Stepper alternativeLabel activeStep={step}>
              {childrenArray.map((child, index) => (
                <Step
                  key={child.props.label}
                  completed={step > index || completed}
                >
                  <StepLabel>{child.props.label}</StepLabel>
                </Step>
              ))}
            </Stepper> */}

          {currentChild}

          {step > 0 ? (
            <Button
              disabled={isSubmitting}
              type="primary"
              onClick={() => setStep((s) => s - 1)}
            >
              Back
            </Button>
          ) : null}

          <Button disabled={isSubmitting} actionType="submit" type="primary">
            {isSubmitting ? 'Submitting' : isLastStep() ? 'Submit' : 'Next'}
          </Button>
        </Form>
      )}
    </Formik>
  );
}
export const FormikSample = () => {
  return (
    <Card>
      <Card.Content>
        <FormikStepper
          initialValues={{
            firstName: '',
            lastName: '',
            millionaire: false,
            money: 0,
            description: '',
          }}
          onSubmit={async (values) => {
            await sleep(3000);
            console.log('values', values);
          }}
        >
          <FormikStep label="Personal Data">
            <Grid>
              <Grid.Row>
                <Grid.Column>
                  <Field
                    name="firstName"
                    component={InputField}
                    label="First Name"
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <Field
                    name="lastName"
                    component={InputField}
                    label="Last Name"
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <Field
                    name="millionaire"
                    type="checkbox"
                    label="I am a millionaire"
                    component={Checkbox}
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </FormikStep>
          <FormikStep
            label="Bank Accounts"
            validationSchema={object({
              money: mixed().when('millionaire', {
                is: true,
                then: number()
                  .required()
                  .min(
                    1_000_000,
                    'Because you said you are a millionaire you need to have 1 million'
                  ),
                otherwise: number().required(),
              }),
            })}
          >
            <Grid>
              <Grid.Row>
                <Grid.Column>
                  <Field
                    name="money"
                    type="number"
                    component={InputField}
                    label="All the money I have"
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </FormikStep>
          <FormikStep label="More Info">
            <Grid>
              <Grid.Row>
                <Grid.Column>
                  <Field
                    name="description"
                    component={InputField}
                    label="Description"
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </FormikStep>
        </FormikStepper>
      </Card.Content>
    </Card>
  );
};
