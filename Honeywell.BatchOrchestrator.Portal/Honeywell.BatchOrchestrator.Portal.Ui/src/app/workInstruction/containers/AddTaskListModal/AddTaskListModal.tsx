import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Icon, Select, Button } from '@scuf/common';
import {
  DUPLICATE_TASK,
  MAX_NUMBER_OF_TASKS,
  MAXIMUM_NUMBER_OF_TASK_LIMIT,
} from 'utils/app-constants';
import { Task } from 'app/workInstruction/models';
import {
  selectWIs,
  selectWITasks,
  selectEwi,
  selectAtiveModalPopup,
} from '+store/workInstruction/selector';
import {
  addTaskFromImportTaskList,
  onCloseOfModalPopup,
} from '+store/workInstruction/workInstrSlice';
import { getWorkInstruction } from '+store/workInstruction/effects';
import './AddTaskListModal.scss';

const AddTaskListModal: React.FC = () => {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();
  const ewiList = useSelector(selectWIs);
  const ewiTaskList = useSelector(selectWITasks);
  const ewi = useSelector(selectEwi);
  const activeModalPopup = useSelector(selectAtiveModalPopup);
  const getInstructionOptions = () =>
    ewiList.map((wi) => {
      const option = { value: wi.id, text: wi.title };
      return option;
    });
  const getEwiTaskOptions = () =>
    ewiTaskList.map((t) => {
      const option = { value: t.key, text: t.instruction_name };
      return option;
    });
  const handleOnchangeOfInstruction = (viewDefinationId: string) => {
    setErrorMessage('');
    setSelectedTask(null);
    dispatch(getWorkInstruction(viewDefinationId));
  };
  const handleOnChangeOfTask = (taskKey: number) => {
    setErrorMessage('');
    const currentSelectedTask = ewiTaskList.find(
      (task) => task.key === taskKey
    );
    if (currentSelectedTask !== undefined) {
      setSelectedTask(currentSelectedTask);
    }
  };
  const handleAddTask = () => {
    if (ewi.view_content.length < MAXIMUM_NUMBER_OF_TASK_LIMIT) {
      setErrorMessage('');
      if (
        selectedTask !== null &&
        !ewi.view_content.some(
          (task) => task.instruction_name === selectedTask.instruction_name
        )
      ) {
        // eslint-disable-next-line camelcase
        const display_seq = ewi.view_content.length + 1;
        const key = Math.floor(100000 + Math.random() * 900000);
        const newTask: Task = { ...selectedTask, display_seq, key };
        dispatch(addTaskFromImportTaskList(newTask));
      } else if (
        selectedTask !== null &&
        ewi.view_content.some(
          (task) => task.instruction_name === selectedTask.instruction_name
        )
      ) {
        setErrorMessage(DUPLICATE_TASK);
      }
    }
    if (ewi.view_content.length >= MAXIMUM_NUMBER_OF_TASK_LIMIT) {
      setErrorMessage(MAX_NUMBER_OF_TASKS);
    }
  };
  const handleOncloseOfPopup = () => {
    setErrorMessage('');
    dispatch(onCloseOfModalPopup());
  };
  return (
    <div
      className={`dropdown-menu import-task ${
        activeModalPopup === 'Import tasklist' ? 'show' : ''
      }`}
    >
      <div className="dd-title">
        <h6>Import Tasks</h6>
        <Icon
          root="common"
          name="close"
          size="small"
          className="close"
          onClick={() => handleOncloseOfPopup()}
        />
      </div>
      <Select
        className="mb-4"
        placeholder="Instruction to import from"
        options={getInstructionOptions()}
        onChange={(viewDefId) => handleOnchangeOfInstruction(viewDefId)}
      />
      <Select
        className="mb-1"
        placeholder="-- select a task--"
        options={getEwiTaskOptions()}
        onChange={(task) => handleOnChangeOfTask(task)}
      />
      {errorMessage !== '' && (
        <span className="error-msg">
          <small>{errorMessage}</small>
        </span>
      )}
      <div className="row align-items-center pl-4 pr-2 mt-4">
        <div className="col-auto ml-auto">
          <Button
            className="rounded px-5"
            type="primary"
            content="Add"
            size="small"
            onClick={() => handleAddTask()}
          />
        </div>
      </div>
    </div>
  );
};
export default AddTaskListModal;
