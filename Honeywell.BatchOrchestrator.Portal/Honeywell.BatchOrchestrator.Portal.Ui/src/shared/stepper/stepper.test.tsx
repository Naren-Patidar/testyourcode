import React from 'react';
import { render, screen } from '@testing-library/react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { shallow } from 'enzyme';
import Stepper from './stepper';

const steps = [
  {
    title: 'one',
  },
  {
    title: 'two',
  },
  {
    title: 'three',
  },
  {
    title: 'four',
  },
];
const steps2 = [
  {
    title: '',
  },
];
const steps3 = [{}];

test('renders the component', () => {
  const component = shallow(
    <Stepper steps={steps} activeStep={0} disabledSteps={0} />
  );
  expect(component).toMatchSnapshot();
});
test('renders the component with different input', () => {
  const component = shallow(
    <Stepper steps={steps} activeStep={2} disabledSteps={0} />
  );
  expect(component).toMatchSnapshot();
});
test('renders the component with one step', () => {
  const component = shallow(
    <Stepper steps={steps2} activeStep={0} disabledSteps={0} />
  );
  expect(component).toMatchSnapshot();
});
test('renders the component with empty', () => {
  const component = shallow(
    <Stepper steps={steps3} activeStep={0} disabledSteps={0} />
  );
  expect(component).toMatchSnapshot();
});
