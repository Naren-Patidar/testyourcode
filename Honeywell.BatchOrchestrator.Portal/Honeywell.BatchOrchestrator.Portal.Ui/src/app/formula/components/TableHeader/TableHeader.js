import React from 'react';
import './tableHeader.scss';

const TableHeader = (props) => {
  const { columns } = props;
  return (
    <div className="TableHeader">
      {columns.map((item, index) => {
        return (
          <div
            style={{ msGridColumn: index + 1 }}
            className="TableHeader_column"
            key={item.id}
          >
            {item.name}
          </div>
        );
      })}
    </div>
  );
};

export default TableHeader;
