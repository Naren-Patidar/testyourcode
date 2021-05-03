import React from 'react';
import { Icon } from '@scuf/common';
import { useDrag } from 'react-dnd';
import { useDispatch } from 'react-redux';
import { DragItemType } from './DragItemType';

import { addInstructionOnDragDrop } from '+store/workInstruction/workInstrSlice';

const DragItem: React.FC<{
  customclass: string;
  iconName: string;
  name: string;
}> = ({ customclass, iconName, name }) => {
  const dispatch = useDispatch();
  const [{ isDragging }, drag] = useDrag({
    item: { name, type: DragItemType[name] },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        dispatch(addInstructionOnDragDrop(item.name));
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <span
      ref={drag}
      className={`drag-item ${customclass} ${iconName} ${
        isDragging ? 'drag-item-active' : ''
      }`}
    >
      {/* <Icon root="common" name={name} size="medium" /> */}
    </span>
  );
};

export default DragItem;

// export default withWorkInstructionsContext(DragItem);
