import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Icon } from '@scuf/common';
import { EWI_STATUS } from 'utils';
import AddTaskListModal from '../AddTaskListModal/AddTaskListModal';
import SafetyCheckModal from '../SafetyCheckModal/SafetyCheckModal';
import DocumentLinkModal from '../DocumentLinkModal/DocumentLinkModal';
import { setActiveModalPopup } from '+store/workInstruction/workInstrSlice';
import { selectChangeLog } from '+store/workInstruction/selector';

import './WIAuthoringActions.scss';

const WIAuthoringActions: React.FC<{ showPreview: boolean }> = ({
  showPreview,
}) => {
  const dispatch = useDispatch();
  const changelogdata = useSelector(selectChangeLog);
  let documentlinkstar = false;
  if (showPreview) {
    documentlinkstar =
      changelogdata &&
      changelogdata.attachments &&
      changelogdata.attachments.some(
        (eachdocument) =>
          eachdocument.stateCode === EWI_STATUS.DRAFT ||
          eachdocument.stateCode === EWI_STATUS.UNDERREVIEW
      );
  }
  return (
    <div className="action-button-list px-3">
      {!showPreview && (
        <div className="btn-group dropright w-100 mb-3">
          <button
            type="button"
            className="btn btn-secondary dropdown-toggle"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            onClick={() => dispatch(setActiveModalPopup('Import tasklist'))}
          >
            Import tasklist
          </button>
          <AddTaskListModal />
        </div>
      )}

      <div className="btn-group dropright w-100 mb-3" id="documentlink">
        <button
          type="button"
          className="btn btn-secondary dropdown-toggle"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
          onClick={() => dispatch(setActiveModalPopup('Document link'))}
        >
          Document link
          {documentlinkstar ? <span className="preview-star">*</span> : null}
        </button>
        <DocumentLinkModal showPreview={showPreview} />
      </div>

      {!showPreview && (
        <div className="btn-group dropright w-100 mb-3">
          <button
            type="button"
            className="btn btn-secondary dropdown-toggle"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Version history
          </button>
          <div className="dropdown-menu safety-list">
            <div className="dd-title">
              <h6>Changes History</h6>
              <Icon root="common" name="close" size="small" />
            </div>
          </div>
        </div>
      )}

      <div className="btn-group dropright w-100 mb-3" id="safetcheck">
        <button
          type="button"
          className="btn btn-secondary dropdown-toggle"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
          onClick={() => dispatch(setActiveModalPopup('Safety check'))}
        >
          Safety check
          {changelogdata &&
          showPreview &&
          changelogdata.safety &&
          changelogdata.safety.added &&
          changelogdata.safety.added.length > 0 ? (
            <span className="preview-star">*</span>
          ) : null}
        </button>
        <SafetyCheckModal showPreview={showPreview} />
      </div>
    </div>
  );
};

export default WIAuthoringActions;
