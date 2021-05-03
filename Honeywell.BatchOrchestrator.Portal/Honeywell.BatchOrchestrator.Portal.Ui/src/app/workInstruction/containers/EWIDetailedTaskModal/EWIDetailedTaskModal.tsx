import React, { useState, ExoticComponent, memo } from 'react';
import { Modal } from '@scuf/common';
import { useDispatch } from 'react-redux';
import { Task } from 'app/workInstruction/models';
import DragItem from './DragItem';
import { InstructionsContainer } from './InstructionsContainer';
import './EWIDetailedTaskModal.scss';

export const EWIDetailedTaskModal: ExoticComponent<{
  selectedTask: Task;
  setSelectedTaskToEdit: (task: Task | null) => void;
  onSaveTasksDetailsEdit: (taskKey: number) => void;
  editTaskNameHandler: (instructionName: string) => void;
}> = memo(function EWIDetailedTaskModal({
  selectedTask,
  setSelectedTaskToEdit,
  onSaveTasksDetailsEdit,
}) {
  const dispatch = useDispatch();
  const [validTask, setValidTask] = useState(false);
  const checkValidTaskName = (value) => {
    setValidTask(value);
  };
  return (
    <div>
      <Modal
        className="wi-instructionset-modal"
        closeIcon
        open
        size="mini"
        closeOnDimmerClick={false}
        onClose={() => {
          if (validTask) {
            dispatch(onSaveTasksDetailsEdit(selectedTask.key));
          }
          dispatch(setSelectedTaskToEdit(null));
        }}
      >
        <Modal.Header>
          <h6>Add detailed instruction text</h6>
        </Modal.Header>
        <Modal.Content>
          <InstructionsContainer
            selectedTask={selectedTask}
            checkValidTaskName={checkValidTaskName}
          />
          <div
            className={`control-pallet ${
              selectedTask.components.length === 10 ? 'reached-maxnum' : ''
            }`}
          >
            <DragItem
              customclass="format-text"
              iconName="text-color"
              name="camera"
            />
            <DragItem
              customclass="format-text"
              iconName="text-bold"
              name="camera"
            />
            <DragItem
              customclass="format-text"
              iconName="text-underline"
              name="numbers"
            />
            <DragItem
              customclass="format-text"
              iconName="text-italic"
              name="numbers"
            />
            <DragItem
              customclass="format-text"
              iconName="text-box"
              name="dvr"
            />
            <DragItem
              customclass="instruction-set-item"
              iconName="icon-experionpoint"
              name="tag"
            />
            <DragItem
              customclass="instruction-set-item"
              iconName="icon-batchInput"
              name="dvr"
            />
            <DragItem
              customclass="instruction-set-item"
              iconName="icon-bulletlist"
              name="numbers"
            />
            <DragItem
              customclass="instruction-set-item"
              iconName="icon-checkbox"
              name="checkbox"
            />
            <DragItem
              customclass="instruction-set-item"
              iconName="icon-select"
              name="message-new"
            />
            <DragItem
              customclass="instruction-set-item"
              iconName="icon-image"
              name="numbers"
            />
            <DragItem
              customclass="instruction-set-item"
              iconName="icon-video"
              name="youtube"
            />
          </div>
        </Modal.Content>
      </Modal>
    </div>
  );
});

export default EWIDetailedTaskModal;
