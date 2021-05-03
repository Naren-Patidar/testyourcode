/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component, useState } from 'react';
import { Button } from '@scuf/common';
import { Stepper } from './index';

// import Stepper from 'react-stepper-horizontal'

const TestStepper = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const steps = [
    {
      title: 'Basic',
      onClick: (e) => {
        e.preventDefault();
        console.log('onClick', 1);
      },
    },
    {
      title: 'Step Two',
      onClick: (e) => {
        e.preventDefault();
        console.log('onClick', 2);
      },
    },
    //   {
    //     title: 'Step Three (Disabled)',
    //     href: 'http://example3.com',
    //     onClick: (e) => {
    //       e.preventDefault()
    //       console.log('onClick', 3)
    //     }
    //   },
    {
      title: 'Step three',
      onClick: (e) => {
        e.preventDefault();
        console.log('onClick', 4);
      },
    },
    {
      title: 'Step Four',
      onClick: (e) => {
        e.preventDefault();
        console.log('onClick', 4);
      },
    },
  ];

  const onClickNext = () => {
    setCurrentStep(currentStep + 1);
    // this.setState({
    //   currentStep: currentStep + 1,
    // });
  };

  const buttonStyle = {
    background: '#1792e5',
    width: 80,
    padding: 16,
    textAlign: 'center',
    margin: '0 auto',
    marginTop: 32,
  } as React.CSSProperties;

  return (
    <div>
      <div>
        <Stepper steps={steps} activeStep={currentStep} disabledSteps={0} />
      </div>

      <div style={buttonStyle} onClick={onClickNext}>
        Next
      </div>
    </div>
  );
};
export default TestStepper;
