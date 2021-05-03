/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import { Radio, List, Checkbox, Input, Icon } from '@scuf/common';
import { useDrop } from 'react-dnd';
import { Task } from 'app/workInstruction/models';
import {
  EMPTY_TASK_NAME,
  MAX_CHARACTERS_FOR_TASK_NAME,
} from 'utils/app-constants';
import { useDispatch } from 'react-redux';
import { DragItemType } from './DragItemType';

import { editTaskNameHandler } from '+store/workInstruction/workInstrSlice';

export const InstructionsContainer: React.FC<{
  selectedTask: Task;
  checkValidTaskName;
}> = ({ selectedTask, checkValidTaskName }) => {
  const dispatch = useDispatch();
  const [isInputTextEditable, setIsInputTextEditable] = useState(true);
  const [isInputUnitEditable, setIsInputUnitEditable] = useState(true);
  const [inputText, setInputText] = useState('New Instruction');
  const [unit, setUnit] = useState('Kgs');
  const [inputValue, setInputValue] = useState('0.0');
  const [isChecked, SetIsChecked] = useState(true);
  const [taskName, setTaskName] = useState('');
  const [charLimitMessage, setCharLimitMessage] = useState<string | null>(null);

  const [{ canDrop, isOver }, drop] = useDrop({
    accept: Object.values(DragItemType),
    drop: () => ({ name: 'InstructionsContainer' }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });
  const isActive = canDrop && isOver;

  const handleEditTaskName = (value) => {
    setTaskName(value);
    dispatch(editTaskNameHandler(value));
    if (value.length < 500) {
      setCharLimitMessage(null);
      if (value.length === 0) {
        setCharLimitMessage(EMPTY_TASK_NAME);
        checkValidTaskName(false);
      } else {
        checkValidTaskName(true);
      }
    }
  };

  const handleKeyDown = () => {
    if (taskName.length === 500) {
      setCharLimitMessage(MAX_CHARACTERS_FOR_TASK_NAME);
    }
  };

  const renderInstruction = (components) => {
    const getItem = (component) => {
      switch (component.type) {
        case 'checkbox':
          return (
            <>
              <Checkbox
                label={component.description}
                checked={isChecked}
                onChange={() => SetIsChecked(!isChecked)}
              />
              <div className="task-actions">
                <Icon
                  root="common"
                  name="arrow-left-and-right"
                  size="small"
                  className="drag-icon"
                />
                <Icon root="common" name="edit" size="small" />
                <Icon root="common" name="delete" size="small" />
              </div>
            </>
          );
        case 'dvr':
          return (
            <>
              {/* <Checkbox label={component.description} checked={false} /> */}
              <div className="input-instructionset">
                {isInputTextEditable ? (
                  <Input
                    className="input-text-input pr-2"
                    value={inputText}
                    onChange={(value) => setInputText(value)}
                    onEnter={() => setIsInputTextEditable(false)}
                  />
                ) : (
                  <p
                    className="input-description-text pr-2"
                    onClick={() => setIsInputTextEditable(true)}
                  >
                    {inputText}
                  </p>
                )}

                <Input
                  className="parameter"
                  value={inputValue}
                  onChange={(value) => setInputValue(value)}
                />

                {isInputUnitEditable ? (
                  <Input
                    className="input-text-parameter pl-2"
                    value={unit}
                    onEnter={() => setIsInputUnitEditable(false)}
                    onChange={(value) => setUnit(value)}
                  />
                ) : (
                  <p
                    className="input-description-text pl-2"
                    onClick={() => setIsInputUnitEditable(true)}
                  >
                    {unit}
                  </p>
                )}
              </div>
              <div className="task-actions">
                <Icon
                  root="common"
                  name="arrow-left-and-right"
                  size="small"
                  className="drag-icon"
                />
                <Icon root="common" name="edit" size="small" />
                <Icon root="common" name="delete" size="small" />
              </div>
            </>
          );
        default:
          return null;
      }
    };
    return (
      !!components &&
      components.map((component) => {
        return <List.Content>{getItem(component)}</List.Content>;
      })
    ).filter((e) => e !== null);
  };

  return (
    <div style={{ overflow: 'hidden', clear: 'both' }}>
      <div ref={drop}>
        <div
          className={`draggable-container ${
            isActive ? 'draggable-container-active' : ''
          }`}
        >
          <div className="checklist-title">
            <Radio label="" checked={false} />
            <Input
              // className="btn btn-secondary"
              value={selectedTask.instruction_name}
              maxLength={500}
              error={
                charLimitMessage !== undefined && charLimitMessage !== null
                  ? charLimitMessage
                  : ''
              }
              onChange={(value) => handleEditTaskName(value)}
              onKeyDown={() => handleKeyDown()}
              onBlur={() => setCharLimitMessage(null)}
            />
          </div>
          <div className="instruction-set">
            <List selection>{renderInstruction(selectedTask.components)}</List>
          </div>
        </div>
      </div>
    </div>
  );
};
