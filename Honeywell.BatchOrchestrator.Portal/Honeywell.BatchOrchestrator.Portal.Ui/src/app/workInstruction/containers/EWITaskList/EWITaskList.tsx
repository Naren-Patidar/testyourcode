/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { List, Icon, Tooltip } from '@scuf/common';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import {
  MAXIMUM_NUMBER_OF_TASK_LIMIT,
  MAX_NUMBER_OF_TASKS,
} from 'utils/app-constants';
import update from 'immutability-helper';
import {
  addNewTaskToExistingList,
  createDefaultThreeTaskList,
  moveTaskInTaskList,
} from '+store/workInstruction/workInstrSlice';

import { selectEwi } from '+store/workInstruction/selector';

import EWITask from '../EWITask/EWITask';
import './EWITaskList.scss';

const EWITaskList: React.FC = () => {
  const ewi = useSelector(selectEwi);
  const { showPreview } = ewi;
  const [ewitasks, setEwitasks] = useState<any>([]);
  const dispatch = useDispatch();

  const handleAddTask = () => {
    if (!ewi.view_content || !ewi.view_content.length) {
      dispatch(createDefaultThreeTaskList());
    } else if (ewi.view_content.length < 32)
      dispatch(addNewTaskToExistingList());
  };

  const moveTasks = useCallback(
    (dragIndex, hoverIndex) => {
      const dragTask = { ...ewitasks[dragIndex] };
      const tasks = update(ewitasks, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragTask],
        ],
      });

      setEwitasks(
        tasks.map((eachtask, id) => {
          const clonetask = { ...eachtask };
          clonetask.display_seq = id + 1;
          return clonetask;
        })
      );
    },
    [ewitasks]
  );

  useEffect(() => {
    if (!!ewi.view_content && !!ewi.view_content.length) {
      setEwitasks(ewi.view_content);
    }
  }, [ewi]);

  const dispatchDraggedTask = () => {
    dispatch(moveTaskInTaskList({ ewitasks }));
  };

  const ewiTaskListData = ewitasks.map((task, index) => (
    <List.Content key={task.key}>
      <EWITask
        task={task}
        index={index}
        moveTasks={moveTasks}
        dispatchDraggedTask={dispatchDraggedTask}
      />
    </List.Content>
  ));

  return (
    <DndProvider backend={HTML5Backend}>
      <List>{ewiTaskListData}</List>
      {!showPreview && (
        <span
          className={`add-taskbtn ${
            ewi.view_content.length >= MAXIMUM_NUMBER_OF_TASK_LIMIT
              ? 'addtask-disabled'
              : ''
          }`}
          onClick={handleAddTask}
        >
          <Icon
            root="common"
            className="pr-4"
            name="slidercontrols-plus"
            size="small"
          />
          {ewi.view_content.length >= MAXIMUM_NUMBER_OF_TASK_LIMIT ? (
            <Tooltip
              content={MAX_NUMBER_OF_TASKS}
              element={<span> Add new task</span>}
              position="bottom left"
              event="hover"
              className="customclass"
            />
          ) : (
            <span> Add new task </span>
          )}
        </span>
      )}
    </DndProvider>
  );
};

export default EWITaskList;
