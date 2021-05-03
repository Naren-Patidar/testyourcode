/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable camelcase */
import React, { useState } from 'react';
import './tableRow.scss';
import { Checkbox } from '@scuf/common';
import New_Icon from 'assets/icons/New_Icon.svg';
import ReactTooltip from 'react-tooltip';

const TableRow = (props) => {
  const [flag, setFlag] = useState(false);
  const { item, index, itemType } = props;
  // const item=props.item;
  // console.log("itemType",itemType);
  //  console.log("ITEM",item);
  const renderCheckbox = (flag = false) => {
    return <Checkbox checked={flag} />;
  };
  const renderDot = (item) => {
    if (
      item.isFormulaSetParameterModified ||
      (item.notApplicableValuePrevious &&
        item.notApplicableValue != item.notApplicableValuePrevious)
    )
      return <span className="TableRow_dot" />;
    return null;
  };

  const renderNew = (flag = false) => {
    if (flag) return <img src={New_Icon} />;
    return null;
  };

  const renderIcon = (isFormulaModified, isNewRow) => {
    if (isNewRow) {
      // return <img src={New_Icon}></img>;
      // return <span title="new" className="icon_new"></span>
      return (
        <span title="New parameter" className="icon-New-indicator span_new">
          <span>New</span>
        </span>
      );
    }
    if (isFormulaModified) {
      return <span className="TableRow_dot" />;
    }
    return null;
  };

  const renderTooltip = (cellData) => {
    return (
      <div>
        <span
          data-tip
          data-for={
            props.showDescription
              ? cellData.rowData.desc
              : cellData.rowData.item
          }
        >
          {props.showDescription
            ? displayText(cellData.rowData.desc)
            : displayText(cellData.rowData.item)}
        </span>
        <ReactTooltip
          backgroundColor="#303030"
          textColor="#d0d0d0"
          id={
            props.showDescription
              ? cellData.rowData.desc
              : cellData.rowData.item
          }
          place="bottom"
          effect="solid"
        >
          <div
            style={{
              minWidth: 'auto',
              maxWidth: '400px',
              wordBreak: 'break-word',
              padding: '1px',
            }}
          >
            <p>
              {props.showDescription
                ? cellData.rowData.desc
                : cellData.rowData.item}
            </p>
          </div>
        </ReactTooltip>
      </div>
    );
  };
  const displayText = (value) => {
    if (value.length > 64) {
      return `${value.substring(0, 63)}...`;
    }
    return value;
  };

  return (
    <div
      className="TableRow"
      onMouseOver={() => setFlag(true)}
      onMouseLeave={() => setFlag(false)}
    >
      {itemType === 'formulaset' ? (
        <div style={{ msGridColumn: 1 }}>{renderDot(item)}</div>
      ) : (
        <div style={{ msGridColumn: 1 }} data-tip>
          {renderIcon(item.isFormulaParameterModified, item.isNewRow)}
        </div>
      )}
      <div style={{ msGridColumn: 2 }}>{index + 1}</div>
      {itemType === 'formulaset' ? (
        <div
          style={{
            msGridColumn: 3,
            display: 'grid',
            justifySelf: 'start',
            paddingLeft: '1.4rem',
          }}
        >
          {/* {item.description.length>64 ? item.description.substring(0, 63)+"...":item.description} */}
          <div style={{ lineHeight: '14px' }}>
            <span
              style={{ wordBreak: 'break-word' }}
              data-tip
              data-for={item.description}
            >
              {displayText(item.description)}
            </span>
            <ReactTooltip
              backgroundColor="#303030"
              textColor="#d0d0d0"
              id={item.description}
              place="bottom"
              effect="solid"
            >
              <div
                style={{
                  minWidth: 'auto',
                  maxWidth: '400px',
                  wordBreak: 'break-word',
                  padding: '1px',
                }}
              >
                <p>{item.description}</p>
              </div>
            </ReactTooltip>
          </div>
        </div>
      ) : (
        <div
          style={{
            msGridColumn: 3,
            display: 'grid',
            justifySelf: 'start',
            paddingLeft: '0rem',
          }}
        >
          {/* {item.formulaParameterDescription.length>64 ? item.formulaParameterDescription.substring(0,63)+"...":item.formulaParameterDescription} */}
          <div style={{ lineHeight: '14px', paddingLeft: '1.5rem' }}>
            <span
              style={{ wordBreak: 'break-word' }}
              data-tip
              data-for={item.formulaParameterDescription}
            >
              {displayText(item.formulaParameterDescription)}
            </span>
            <ReactTooltip
              backgroundColor="#303030"
              textColor="#d0d0d0"
              id={item.formulaParameterDescription}
              place="bottom"
              effect="solid"
            >
              <div
                style={{
                  minWidth: 'auto',
                  maxWidth: '400px',
                  wordBreak: 'break-word',
                  padding: '1px',
                }}
              >
                <p>{item.formulaParameterDescription}</p>
              </div>
            </ReactTooltip>
          </div>
        </div>
      )}
      {itemType === 'formulaset' ? (
        <div className="approval_column" style={{ msGridColumn: 4 }}>
          {renderCheckbox(item.isRawMaterial)}
        </div>
      ) : (
        <div className="approval_column" style={{ msGridColumn: 4 }}>
          {item.defaultValue}
        </div>
      )}
      {itemType === 'formulaset' ? (
        <div className="approval_column" style={{ msGridColumn: 5 }}>
          {item.engUnit}
        </div>
      ) : (
        <div className="approval_column" style={{ msGridColumn: 5 }}>
          {item.enggUnit}
        </div>
      )}
      {itemType === 'formulaset' ? (
        <div className="approval_column" style={{ msGridColumn: 6 }}>
          {item.minval}
        </div>
      ) : (
        <div className="approval_column" style={{ msGridColumn: 6 }}>
          {item.minSetPoint}
        </div>
      )}
      {itemType === 'formulaset' ? (
        <div className="approval_column" style={{ msGridColumn: 7 }}>
          {item.maxval}
        </div>
      ) : (
        <div className="approval_column" style={{ msGridColumn: 7 }}>
          {item.maxSetPoint}
        </div>
      )}
      <div className="approval_column" style={{ msGridColumn: 8 }}>
        {renderCheckbox(item.scalable)}
      </div>
      {itemType === 'formulaset' ? (
        <div className="approval_column" style={{ msGridColumn: 9 }}>
          {item.notApplicableValue}
        </div>
      ) : (
        <div style={{ msGridColumn: 9 }} />
      )}

      {!item.isNewRow &&
      flag &&
      itemType === 'formula' &&
      (item.defaultValuePrevious != item.defaultValue ||
        item.minSetPoint != item.minSetPointPrevious ||
        item.maxSetPointPrevious != item.maxSetPoint) ? (
        <div className="TableRow-popup">
          <ReactTooltip
            backgroundColor="#303030"
            textColor="#d0d0d0"
            place="bottom"
            effect="solid"
          >
            <div className="TableRow-popup-details">
              <div style={{ msGridColumn: 1 }}>
                {item.defaultValuePrevious &&
                item.defaultValuePrevious != item.defaultValue
                  ? `old Value: ${item.defaultValuePrevious}`
                  : ''}
              </div>
              <div style={{ msGridColumn: 2 }}>
                {item.minSetPointPrevious &&
                item.minSetPoint != item.minSetPointPrevious
                  ? `old Min Val: ${item.minSetPointPrevious}`
                  : ''}
              </div>
              <div style={{ msGridColumn: 3 }}>
                {item.maxSetPointPrevious &&
                item.maxSetPointPrevious != item.maxSetPoint
                  ? `old Max Val: ${item.maxSetPointPrevious}`
                  : ''}
              </div>
            </div>
          </ReactTooltip>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default TableRow;
