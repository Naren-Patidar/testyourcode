/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { useRef } from 'react';
import { Icon, Radio, Tooltip } from '@scuf/common';
import { MINIMUM_NUMBER_OF_TASK_LIMIT } from 'utils/app-constants';
import './EWITask.scss';
import { useDrop, useDrag } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';

import {
  deleteTaskFromTaskList,
  setIsAuthoringControlSetActive,
  setSelectedTaskToEdit,
} from '+store/workInstruction/workInstrSlice';
import { selectEwi, selectChangeLog } from '+store/workInstruction/selector';

const EWITask = ({ task, index, moveTasks, dispatchDraggedTask }) => {
  const changelogdata = useSelector(selectChangeLog);
  const ref = useRef(null);
  const ewi = useSelector(selectEwi);
  const { showPreview } = ewi;
  const dispatch = useDispatch();
  const [, drag] = useDrag({
    item: {
      type: 'card',
      task,
      index,
    },
    end() {
      dispatchDraggedTask();
    },
  });

  const [, drop] = useDrop({
    accept: 'card',
    hover: (item: any) => {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const dropIndex = index;
      if (dragIndex === dropIndex) {
        return;
      }
      moveTasks(dragIndex, dropIndex, item.task.key);
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = dropIndex;
    },
  });

  drag(drop(ref));
  const handleDelete = (key) => {
    if (ewi.view_content.length > MINIMUM_NUMBER_OF_TASK_LIMIT)
      dispatch(deleteTaskFromTaskList(key));
  };

  const changeLogTaskData =
    changelogdata &&
    changelogdata.view_content &&
    changelogdata.view_content.find((eachTask) => eachTask.key === task.key);
  let changeDataFlag = false;
  if (changeLogTaskData) {
    changeDataFlag = Object.keys(changeLogTaskData).some(
      (eachKey) =>
        changeLogTaskData[eachKey] instanceof Object &&
        changeLogTaskData[eachKey].prev
    );
    if (!changeDataFlag && changeLogTaskData.components) {
      changeDataFlag = changeLogTaskData.components.some((eachcomponent) =>
        Object.keys(eachcomponent).some(
          (eachKey) =>
            changeLogTaskData[eachKey] instanceof Object &&
            changeLogTaskData[eachKey].prev
        )
      );
    }
  }
  changeDataFlag = true;
  return (
    <div
      className={
        changeLogTaskData && showPreview && changeDataFlag
          ? 'draggable-task task-edited'
          : 'draggable-task'
      }
      ref={showPreview ? null : ref}
      id={task.key}
    >
      <Radio label="" checked={false} />
      <div role="button" className="btn btn-secondary">
        {task.instruction_name}
        {!showPreview && (
          <div className="task-actions">
            <Icon
              root="common"
              name="arrow-left-and-right"
              size="small"
              className="drag-icon"
            />
            <Icon
              root="common"
              name="edit"
              size="small"
              onClick={() => {
                dispatch(setSelectedTaskToEdit(task));
                dispatch(setIsAuthoringControlSetActive(true));
              }}
            />
            {ewi.view_content.length <= MINIMUM_NUMBER_OF_TASK_LIMIT ? (
              <Tooltip
                content="Minimum one task should be there"
                element={
                  <Icon
                    className={
                      ewi.view_content.length >= MINIMUM_NUMBER_OF_TASK_LIMIT
                        ? 'delete-disabled'
                        : ''
                    }
                    root="common"
                    name="delete"
                    size="small"
                  />
                }
                position="bottom left"
                event="hover"
                className="customclass"
              />
            ) : (
              <Icon
                root="common"
                name="delete"
                size="small"
                onClick={() => handleDelete(task.key)}
              />
            )}
          </div>
        )}
      </div>
      {!!task.components && !!task.components.length && (
        <>
          <Icon
            root="common"
            className="cursor-hover pl-3"
            name={showPreview ? 'visible' : 'edit'}
            size="small"
            onClick={() => {
              dispatch(setSelectedTaskToEdit(task));
              dispatch(setIsAuthoringControlSetActive(true));
            }}
          />
          {/* {changeLogTaskData &&
          showPreview &&
          changeLogTaskData.instruction_name &&
          changeLogTaskData.instruction_name instanceof Object ? (
            <span className="preview-star">*</span>
          ) : (
            <span className="preview-star">*</span>
          )}
          <span>*</span> */}
          {/* {!!task.components && !!task.components.length && !showPreview && (
            <Icon
              root="common"
              className="cursor-hover pl-3"
              name="edit"
              size="small"
              onClick={() => {
                dispatch(setSelectedTaskToEdit(task));
                dispatch(setIsAuthoringControlSetActive(true));
              }}
            />
          )} */}
        </>
      )}
    </div>
  );
};

export default EWITask;
