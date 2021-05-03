/* eslint-disable react/jsx-boolean-value */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable camelcase */

import React, { useState, useEffect } from 'react';
import { Select, Icon, Input } from '@scuf/common';
import { useConfirm } from 'shared/confirm-dialog';
import { Pattern, patternProps } from './pattern';
import {
  patternOptions,
  delimiterOptions,
  monthOptions,
  yearOptions,
  autoIncrementOptions,
  textLength,
  IncLength,
} from './pattern-options';
import './patterns.scss';

export const PatternContainer: React.FC<{
  state: Pattern;
  updatePatternState: any;
  position: number;
}> = ({ state, updatePatternState, position }) => {
  const [dependentPattern, setDependentPattern] = useState('');
  const [propValue, setPropValue] = useState('');
  const [propMonthFormat, setPropMonthFormat] = useState('');
  const [propYearFormat, setPropYearFormat] = useState('');
  const [propAutoIncrement, setPropAutoIncrement] = useState('');
  const [propLength, setPropLength] = useState(0);
  const [proptxt, setProptxt] = useState('');
  const [propBase, setPropBase] = useState('');
  const [propIncLength, setPropIncLength] = useState(0);
  const [patternType, setPatternType] = useState('');
  const maxCustomLength = 16;

  const INC_No_Reset = 'INC_No_R';
  const INC_Monthly_Reset = 'INC_Monthly_R';

  const confirm = useConfirm();
  useEffect(() => {
    if (state !== undefined && state.type !== undefined) {
      if (state.props.val !== null && state.props.val !== '') {
        setPropValue(state.props.val);
        updatePatternState(position, state);
      } else {
        // setPropValue('#');
        setProptxt('');
        setPropBase('');
        // state.props.val = '#';
      }
      if (state.props.fmtType !== null && state.props.fmtType !== '') {
        setPropMonthFormat(state.props.fmtType);
        setPropYearFormat(state.props.fmtType);
      } else {
        setPropMonthFormat('2D');
        setPropYearFormat('2D');
        state.props.fmtType = '2D';
        state.props.fmt = '2D';
      }
      if (state.props.freq !== null && state.props.freq !== '') {
        setPropAutoIncrement(state.props.freq);
      } else {
        setPropAutoIncrement('N');
        state.props.freq = 'N';
      }
      if (state.props.len !== null && state.props.len !== 0) {
        setPropLength(state.props.len);
      } else {
        setPropLength(0);
        state.props.len = 0;
      }

      if (state.type !== null) {
        setPatternType(state.type);
      }

      switch (state.type) {
        case 'BASE':
          setPropBase(state.props.val);
          setProptxt('');
          break;
        case 'TXT':
          setProptxt(state.props.val);
          setPropBase('');
          break;
        case 'INC':
          state.props.fmtType = 'NUM';
          if (state.props.fmt === 'N') {
            setPatternType(INC_No_Reset);
          } else if (state.props.fmt === 'M') {
            setPatternType(INC_Monthly_Reset);
          }
          if (state.props.len !== null && state.props.len !== 0) {
            setPropIncLength(state.props.len);
          } else {
            // --Set default
            setPropIncLength(1);
            state.props.len = 1;
          }
          break;
        case 'YEAR':
          if (state.props.fmtType === '2D') {
            setPatternType('YEAR_2D');
          } else if (state.props.fmtType === '4D') {
            setPatternType('YEAR_4D');
          }
          break;
        case 'MONTH':
          if (state.props.fmtType === '2D') {
            setPatternType('MONTH_2D');
          } else if (state.props.fmtType === 'SM') {
            setPatternType('MONTH_SM');
          }
          break;
        case 'CAM_ID':
          state.props.len = 0;
          break;
        case 'R':
          state.props.len = 0;
          break;
        case 'F':
          state.props.len = 0;
          break;
        case '':
          // setPropIncLength(1);
          // state.props.len = 1;
          break;
        default:
          break;
      }
      if (state.type !== '') {
        updatePatternState(position, state);
      }
    }
  }, [state, position]);
  const handlePatternChange = (val) => {
    state.type = val;
    switch (val) {
      case INC_No_Reset:
        state.type = 'INC';
        state.props.fmtType = 'NUM';
        state.props.fmt = 'N';
        if (state.props.len === 0) {
          state.props.len = 1;
          setPropIncLength(1);
        }
        break;
      case INC_Monthly_Reset:
        state.type = 'INC';
        state.props.fmtType = 'NUM';
        state.props.fmt = 'M';
        if (state.props.len === 0) {
          state.props.len = 1;
          setPropIncLength(1);
        }
        break;
      case 'YEAR_2D':
        state.props.fmtType = '2D';
        state.props.fmt = '2D';
        state.type = 'YEAR';
        break;
      case 'YEAR_4D':
        state.props.fmtType = '4D';
        state.props.fmt = '4D';
        state.type = 'YEAR';
        break;
      case 'MONTH_2D':
        state.props.fmtType = '2D';
        state.props.fmt = '2D';
        state.type = 'MONTH';
        break;
      case 'MONTH_SM':
        state.props.fmtType = 'SM';
        state.props.fmt = 'SM';
        state.type = 'MONTH';
        break;
      case 'CAM_ID':
        state.props.len = 0;
        break;
      case 'R':
        state.props.len = 0;
        break;
      case 'F':
        state.props.len = 0;
        break;
      default:
        break;
    }

    // if (val === '') {
    //   state.type = val;
    // }
    // if (val === 'INC') {
    //   state.props.fmtType = 'NUM';
    //   state.props.fmt = 'N';
    // }
    setPatternType(val);
    setDependentPattern(val);
    updatePatternState(position, state);
  };
  const handleDelimiterChanges = (val) => {
    state.props.val = val;
    setPropValue(val);
    updatePatternState(position, state);
  };
  const handleAutoIncrementChanges = (val) => {
    state.props.freq = val;
    state.props.fmtType = 'NUM';
    setPropAutoIncrement(val);
    updatePatternState(position, state);
  };
  const handleMonthChanges = (val) => {
    state.props.fmtType = val;
    state.props.fmt = val;
    setPropMonthFormat(val);
    updatePatternState(position, state);
  };
  const handleYearChanges = (val) => {
    state.props.fmtType = val;
    state.props.fmt = val;
    setPropYearFormat(val);
    updatePatternState(position, state);
  };
  const handleTextLengthChanges = (val) => {
    state.props.len = val;
    setPropLength(val);
    updatePatternState(position, state);
  };
  const handleAutoIncrementLengthChanges = (val) => {
    state.props.len = val;
    setPropIncLength(val);
    updatePatternState(position, state);
  };

  const onTxtChange = (value) => {
    // const clt = event.target;
    state.props.val = value;
    state.props.len = 0;
    state.props.fmt = '';
    state.props.fmtType = '';
    state.props.freq = '';
    if (value.length <= maxCustomLength) {
      setProptxt(value);
      updatePatternState(position, state);
    } else {
      confirm.show({
        title: 'Alert',
        message: `Max ${maxCustomLength} char allowed.`,
        type: 'alert',
        confirmText: 'Ok',
      });
    }
  };
  const onBaseChange = (event) => {
    const clt = event.target;
    state.props.val = clt.value;
    if (clt.value.length <= 16) {
      setPropBase(clt.value);
      updatePatternState(position, state);
    }
  };
  return (
    <div className="pattern d-flex align-items-end flex-wrap">
      <Select
        options={patternOptions}
        value={patternType}
        search={true}
        placeholder="Select Pattern"
        onChange={(val) => handlePatternChange(val)}
        className="pattern-main-container"
      />
      {/* {state.type === 'DELIMITER' && (
        <Select
          options={delimiterOptions}
          value={propValue}
          onChange={(val) => handleDelimiterChanges(val)}
          className="pattern-dependent-delimiter"
        />
      )} */}
      {/* {(state.type === 'CAM_ID' ||
        state.type === 'R' ||
        state.type === 'F') && (
        <div className="d-flex align-items-start flex-column">
          <div>Length</div>
          <Select
            options={textLength}
            value={propLength}
            onChange={(val) => handleTextLengthChanges(val)}
            className="pattern-dependent-delimiter"
          />
        </div>
      )} */}
      {state.type === 'TXT' && (
        <div className="pattern-txtbox">
          <Input value={proptxt} onChange={(event) => onTxtChange(event)} />
        </div>
      )}
      {/* {state.type === 'BASE' && (
        <input
          value={propBase}
          className="txt-pattern"
          onChange={(event) => onBaseChange(event)}
        />
      )} */}
      {/* {state.type === 'MONTH' && (
        <Select
          options={monthOptions}
          value={propMonthFormat}
          onChange={(val) => handleMonthChanges(val)}
          className="pattern-dependent-month"
        />
      )}
      {state.type === 'YEAR' && (
        <Select
          options={yearOptions}
          value={propYearFormat}
          onChange={(val) => handleYearChanges(val)}
          className="pattern-dependent-year"
        />
      )} */}
      {state.type === 'INC' && (
        <>
          {/* <div className="d-flex align-items-start flex-column">
            <div>Reset</div>
            <Select
              options={autoIncrementOptions}
              value={propAutoIncrement}
              onChange={(val) => handleAutoIncrementChanges(val)}
              className="pattern-dependent-auto-increment"
            />
          </div> */}
          <div className="d-flex align-items-start flex-column">
            <div>Length</div>
            <Select
              options={IncLength}
              value={propIncLength}
              onChange={(val) => handleAutoIncrementLengthChanges(val)}
              className="pattern-dependent-delimiter"
            />
          </div>
        </>
      )}
    </div>
  );
};
