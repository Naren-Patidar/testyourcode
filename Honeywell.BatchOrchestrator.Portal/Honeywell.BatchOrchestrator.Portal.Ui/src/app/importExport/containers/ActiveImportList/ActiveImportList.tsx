import React from 'react';
import { Icon, Accordion, Button } from '@scuf/common';
import { useDispatch, useSelector } from 'react-redux';
import {
  genExportLogs,
  genExportedFileLogs,
} from '+store/importExport/effects';
import { getExportLogsResponse } from '+store/importExport/selector';

import './ActiveImportList.scss';

const ActiveImportList = (props) => {
  const dispatch = useDispatch();
  const exportLogsResponse = useSelector(getExportLogsResponse);
  const onClickExportLogs = () => {
    if (props.checkedFunction === 'import') {
      dispatch(genExportLogs());
    } else {
      dispatch(genExportedFileLogs());
    }
  };
  return (
    <div className="active-import-list pt-2 pl-5">
      <h6>
        {props.checkedFunction === 'import'
          ? 'Active Import List'
          : 'Active Export List'}
      </h6>
      <div className="d-flex">
        <div>
          <Icon
            name="document-report"
            size="medium"
            color="blue"
            root="common"
          />
        </div>
        <div className="px-2">
          <h6 className="m-0">
            {props.checkedFunction === 'import' ? 'Imported' : 'Exported'}{' '}
            <small className="progress-items">
              {' '}
              `{props.importedFileLength} Items`
            </small>
          </h6>
          <p>File name: {props.fileName}</p>
        </div>
        <Button
          type="secondary"
          content="Export Logs"
          onClick={onClickExportLogs}
          className="ml-5"
        />
      </div>
      {/* <Accordion>
        <Accordion.Content
          title="Show details (8 errors found)"
          arrowPosition="left"
          className="pt-4"
        >
          <div className="import-list-status pb-2">
            <p className="m-0">Name of file</p>
            <small>
              <Icon
                name="close-circled"
                size="small"
                color="#EE3124"
                root="building"
                className="pr-2"
              />
              Failed - failure message
            </small>
          </div>
          <div className="import-list-status pb-2">
            <p className="m-0">Name of file</p>
            <small>
              <Icon
                name="close-circled"
                size="small"
                color="#EE3124"
                root="building"
                className="pr-2"
              />
              Failed - failure message
            </small>
          </div>
          <div className="import-list-status pb-2">
            <p className="m-0">Name of file</p>
            <small>
              <Icon
                name="close-circled"
                size="small"
                color="#EE3124"
                root="building"
                className="pr-2"
              />
              Failed - failure message
            </small>
          </div>
          <div className="import-list-status pb-2">
            <p className="m-0">Name of file</p>
            <small>
              <Icon
                name="close-circled"
                size="small"
                color="#EE3124"
                root="building"
                className="pr-2"
              />
              Failed - failure message
            </small>
          </div>
          <div className="import-list-status pb-2">
            <p className="m-0">Name of file</p>
            <small>
              <Icon
                name="close-circled"
                size="small"
                color="#EE3124"
                root="building"
                className="pr-2"
              />
              Failed - failure message
            </small>
          </div>
          <div className="import-list-status pb-2">
            <p className="m-0">Name of file</p>
            <small>
              <Icon
                name="close-circled"
                size="small"
                color="#EE3124"
                root="building"
                className="pr-2"
              />
              Failed - failure message
            </small>
          </div>
          <div className="import-list-status pb-2">
            <p className="m-0">Name of file</p>
            <small>
              <Icon
                name="close-circled"
                size="small"
                color="#EE3124"
                root="building"
                className="pr-2"
              />
              Failed - failure message
            </small>
          </div>
        </Accordion.Content>
      </Accordion> */}
    </div>
  );
};

export default ActiveImportList;
