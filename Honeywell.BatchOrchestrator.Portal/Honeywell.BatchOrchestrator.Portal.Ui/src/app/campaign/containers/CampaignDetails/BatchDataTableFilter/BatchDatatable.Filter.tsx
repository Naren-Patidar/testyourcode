/* eslint-disable react/self-closing-comp */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable prefer-template */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable prefer-destructuring */
/* eslint-disable spaced-comment */
/* eslint-disable no-return-assign */
/* eslint-disable no-else-return */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable object-shorthand */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable prefer-const */
/* eslint-disable import/newline-after-import */
/* eslint-disable import/no-duplicates */
/* eslint-disable import/extensions */
/* eslint-disable import/order */
/* eslint-disable import/no-unresolved */
/* eslint-disable prettier/prettier */
import React, { useEffect, useRef, useState } from 'react';
import { DataTable } from '@scuf/datatable';
import { Input, Icon, DatePicker, Button, Checkbox } from '@scuf/common';
import './BatchDatatable.Filter.scss';

export const DataTableFilter: React.FC<{
  applyBatchFilter: (
    values?: string[],
    minValue?: string,
    maxValue?: string,
    startTime?: Date | null,
    endTime?: Date | null
  ) => void;
}> = ({ applyBatchFilter }) => {
  const [stateData, setStateData] = useState<string[]>([]);
  const [minActualValue, setMinActualValue] = useState('');
  const [maxActualValue, setMaxActualValue] = useState('');
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [showState, setShowState] = useState(false);
  const [showActualQuantity, setShowActualQuantity] = useState(false);
  const [showStartTime, setShowStartTime] = useState(false);
  const [showEndTime, setShowEndTime] = useState(false);

  const handleState = (key) => {
    const stateArray = [...stateData];
    if (!stateArray.includes(key)) {
      stateArray.push(key);
      setStateData(stateArray);
    } else {
      const index = stateArray.indexOf(key);
      if (index > -1) {
        stateArray.splice(index, 1);
      }
      setStateData(stateArray);
    }
  };
  const handleMinActualValue = (input) => {
    setMinActualValue(input);
  };
  const handleMaxActualValue = (input) => {
    setMaxActualValue(input);
  };
  const handleStartTime = (date) => {
    setStartTime(date);
  };
  const handleEndTime = (date) => {
    setEndTime(date);
  };
  const resetFilters = () => {
    setStateData([]);
    setMinActualValue('');
    setMaxActualValue('');
    setStartTime(null);
    setEndTime(null);
    applyBatchFilter([]);
  };
  const applyFilters = () => {
    applyBatchFilter(
      stateData,
      minActualValue,
      maxActualValue,
      startTime,
      endTime
    );
  };
  const refFilter = useRef(null);
  function useOnClickOutsideFilter(refFilter, handler) {
    useEffect(() => {
      const listener = (event) => {
        if (
          !refFilter.current ||
          refFilter.current.contains(event.target) // ||
          // event.target.classList[0] === 'tab' ||
          // event.target.parentNode.classList[0] === 'sidebar' ||
          // event.target.parentNode.parentNode.classList[0] === 'sidebar' ||
          // event.target.parentNode.classList[0] === 'filter' ||
          // event.target.parentNode.classList[0] === 'filter-button'
        ) {
          return;
        }
        handler(event);
      };

      document.addEventListener('mousedown', listener);
      document.addEventListener('touchstart', listener);

      return () => {
        document.removeEventListener('mousedown', listener);
        document.removeEventListener('touchstart', listener);
      };
    }, [refFilter, handler]);
  }
  useOnClickOutsideFilter(refFilter, () => {
    setShowFilters(false);
  });

  const ref = useRef();
  function useOnClickOutside(ref, handler) {
    useEffect(() => {
      const listener = (event) => {
        if (
          !ref.current ||
          ref.current.contains(event.target) //  ||
          // event.target.classList[0] === 'tab' ||
          // event.target.parentNode.classList[0] === 'sidebar' ||
          // event.target.parentNode.parentNode.classList[0] === 'sidebar'
        ) {
          return;
        }
        handler(event);
      };

      document.addEventListener('mousedown', listener);
      document.addEventListener('touchstart', listener);

      return () => {
        document.removeEventListener('mousedown', listener);
        document.removeEventListener('touchstart', listener);
      };
    }, [ref, handler]);
  }
  const stateDate = [
    { value: 'idle', text: 'Idle' },
    { value: 'running', text: 'Running' },
    { value: 'CommErr', text: 'CommErr' },
    { value: 'held', text: 'Held' },
    { value: 'aborted', text: 'Aborted' },
    { value: 'stopped', text: 'Stopped' },
    { value: 'complete', text: 'Complete' },
    { value: 'unknown', text: 'Unknown' },
  ];
  return (
    <div className="Batch-filter-container">
      <div className="">
        <div className="filter">
          <div
            className={
              'filter-button d-flex align-items-center' +
              (showFilters ? ' show-filter' : '')
            }
            onClick={() => {
              setShowFilters(!showFilters);
              setShowState(false);
              setShowActualQuantity(false);
              setShowStartTime(false);
              setShowEndTime(false);
            }}
          >
            <Icon
              name="filter"
              root="common"
              exactSize="0.6667rem"
              className="filter-icon"
            />
            <span className="filter-header-text">All Filters</span>
          </div>
          <div className="clear"></div>

          <div
            className={'filter-card' + (showFilters ? '' : ' none')}
            ref={refFilter}
          >
            <div className="filter-parameter ">
              <span className="filter-parameter-header-text">Filters</span>
              <Button type="link" content="Clear All" onClick={resetFilters} />
            </div>
            <div
              className="filter-parameter"
              onClick={() => {
                setShowState(!showState);
                setShowActualQuantity(false);
                setShowStartTime(false);
                setShowEndTime(false);
              }}
            >
              <span className="filter-parameter-header-text">State</span>
              <span className="caret-icon mr-4">
                <Icon
                  name={'caret' + (showState ? '-up' : '-down')}
                  root="common"
                  exactSize=".6667rem"
                  className="parameter-icon"
                />
              </span>
            </div>
            <div className={'filter-options' + (showState ? '' : ' none')}>
              {stateDate.map((item) => {
                return (
                  <div>
                    <Checkbox
                      label={item.text}
                      checked={stateData.includes(item.value)}
                      onChange={() => handleState(item.value)}
                    />
                  </div>
                );
              })}
            </div>
            <div
              className="filter-parameter"
              onClick={() => {
                setShowState(false);
                setShowActualQuantity(!showActualQuantity);
                setShowStartTime(false);
                setShowEndTime(false);
              }}
            >
              <span className="filter-parameter-header-text">
                Actual Quantity
              </span>
              <span className="caret-icon mr-4">
                <Icon
                  name={'caret' + (showActualQuantity ? '-up' : '-down')}
                  root="common"
                  exactSize=".6667rem"
                  className="parameter-icon"
                />
              </span>
            </div>
            <div
              className={'filter-options' + (showActualQuantity ? '' : ' none')}
            >
              <div>
                <Input
                  type="text"
                  placeholder="min value"
                  onChange={(data) => handleMinActualValue(data)}
                  value={minActualValue}
                />{' '}
                {' - '}
                <Input
                  type="text"
                  placeholder="max value"
                  onChange={(data) => handleMaxActualValue(data)}
                  value={maxActualValue}
                />
              </div>
            </div>
            <div
              className="filter-parameter"
              onClick={() => {
                setShowState(false);
                setShowActualQuantity(false);
                setShowStartTime(!showStartTime);
                setShowEndTime(false);
              }}
            >
              <span className="filter-parameter-header-text">Start Time</span>
              <span className="caret-icon mr-4">
                <Icon
                  name={'caret' + (showStartTime ? '-up' : '-down')}
                  root="common"
                  exactSize=".6667rem"
                  className="parameter-icon"
                />
              </span>
            </div>
            <div className={'filter-options' + (showStartTime ? '' : ' none')}>
              <DatePicker
                type="datetime"
                onChange={(date) => handleStartTime(date)}
              />
            </div>
            <div
              className="filter-parameter"
              onClick={() => {
                setShowState(false);
                setShowActualQuantity(false);
                setShowStartTime(false);
                setShowEndTime(!showEndTime);
              }}
            >
              <span className="filter-parameter-header-text">End Time</span>
              <span className="caret-icon mr-4">
                <Icon
                  name={'caret' + (showEndTime ? '-up' : '-down')}
                  root="common"
                  exactSize=".6667rem"
                  className="parameter-icon"
                />
              </span>
            </div>
            <div className={'filter-options' + (showEndTime ? '' : ' none')}>
              <DatePicker
                type="datetime"
                onChange={(date) => handleEndTime(date)}
              />
            </div>
            <div className="filter-parameter ">
              <Button
                className="filter-parameter-header-text"
                type="secondary"
                content="Apply"
                onClick={() => {
                  applyFilters();
                  setShowFilters(false);
                  setShowState(false);
                  setShowActualQuantity(false);
                  setShowStartTime(false);
                  setShowEndTime(false);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
