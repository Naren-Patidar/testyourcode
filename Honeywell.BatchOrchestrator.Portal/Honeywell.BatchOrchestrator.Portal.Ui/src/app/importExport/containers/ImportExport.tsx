import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import './ImportExport.scss';
import { Radio, List, Button, Input, Icon, Select, Modal } from '@scuf/common';
import { EWI_STATUS } from 'utils/app-constants';
import { useInjectReducer } from 'utils/@reduxjs';

import { useAuthorize } from 'core/authentication';
import { PermissionValues } from 'core/authentication/models/user-permission';
import DecryptionKeyModal from './ImportDecryptModal/ImportDecryptModal';
import {
  acquireLock,
  releaseLock,
  exportData,
} from '+store/importExport/effects';
import {
  sliceKey,
  reducer,
  setActivePopup,
  setEmptyExportLogs,
  setShowExportLogs,
  setImpExpErrorMessage,
  setEmptyImportEwi,
  setEmptyImportFormula,
  setImportType,
  clearExportDataResponse,
} from '+store/importExport/importExportSlice';
import ExportPopup from '../../formula/containers/ExportPopup/ExportPopup';
import {
  getAcquireResponse,
  getExportDataResponse,
  selectActivePopup,
  selectImportType,
  getShowExportLogs,
  getExportLogsResponse,
  getImpExpErrorMessage,
} from '+store/importExport/selector';
import EwiImport from './EWIImport/EWIImport';
import FormulaImport from './FormulaImport/FormulaImport';
import ActiveImportList from './ActiveImportList/ActiveImportList';
import FormulaExport from './FormulaExport/FormulaExport';
import EWIExport from './EWIExport/EWIExport';
import { ExportFilterData } from '../models';

export const ImportExport: React.FC = () => {
  useInjectReducer({ key: sliceKey, reducer });
  const dispatch = useDispatch();
  const [exportType, setExportType] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [stateOptions, setStateOptions] = useState([]);
  const [tagsOptions, setTagsOptions] = useState([]);
  const [tagsFilter, setTagsFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState(0);
  const [importFile, setImportFile] = useState(null);
  const [locationValue, setLocationValue] = useState('');
  const [checkedFunction, setCheckedFunction] = useState('');
  const [open, setOpen] = useState(false);
  const [fileName, setFileName] = useState('');
  const [encryptionKey, setEncryptionKey] = useState('');
  const [reEnterKey, setReEnterKey] = useState('');
  const [validationError, setValidationError] = useState('');
  const [fileNameError, setFileNameError] = useState('');
  const [showExport, setShowExport] = useState(false);
  const [showProgress, setShowProgress] = useState(false);
  const [selectedEwi, setSeletedEwi] = useState(null);
  const [selectedFormulaSets, setSelectedFormulaSets] = useState(null);
  const [formulaSetFilter, setFormulaSetFilter] = useState('viewAll');
  const [dataCount, setDataCount] = useState(0);
  const [clearSelection, setClearSelection] = useState(false);
  const [importTypeLocal, setImportTypeLocal] = useState('');
  const [startDownload, setStartDownload] = useState(false);
  const [selectedImportItem, setSelectedImportItem] = useState(0);
  const [importClicked, setImportClicked] = useState(false);
  const [impExpErrorModal, setImpExpErrorModal] = useState(false);

  const acquireResponse = useSelector(getAcquireResponse);
  const exportRespone = useSelector(getExportDataResponse);
  const activeModal = useSelector(selectActivePopup);
  const importedType = useSelector(selectImportType);
  const showActiveExportLogs = useSelector(getShowExportLogs);
  const getExportLogs = useSelector(getExportLogsResponse);
  const impExpErrorMessage = useSelector(getImpExpErrorMessage);

  useEffect(() => {
    setImportTypeLocal(importedType);
  }, [importedType]);

  useEffect(() => {
    if (impExpErrorMessage) {
      setImpExpErrorModal(true);
    }
  }, [impExpErrorMessage]);

  const closeModal = () => {
    dispatch(setActivePopup(''));
    setImportFile(null);
    setLocationValue('');
  };

  useEffect(() => {
    return () => {
      dispatch(setImportType(''));
      closeModal();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (
      getExportLogs.impExpStartTimeStamp &&
      getExportLogs.impExpEndTimeStamp
    ) {
      const url = window.URL.createObjectURL(
        new Blob([JSON.stringify(getExportLogs)])
      );
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'ExportLogs.txt');
      document.body.appendChild(link);
      link.click();
      dispatch(setEmptyExportLogs());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getExportLogs]);

  const downloadFile = (data, filename) => {
    const linkSource = `data:application/zip;base64,${data}`;
    const downloadLink = document.createElement('a');
    downloadLink.href = linkSource;
    downloadLink.download = filename || 'Production_package';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    dispatch(clearExportDataResponse());
  };

  useEffect(() => {
    if (checkedFunction === 'export' && acquireResponse.isLockAcquired) {
      const payload: ExportFilterData = {
        lockId: acquireResponse.lockId,
        type: exportType,
        exportFileName: fileName || 'Production_package',
        workInstructions: selectedEwi || [],
        formulaSets: selectedFormulaSets || [],
        encryptionKey,
      };
      dispatch(exportData(payload));
      setStartDownload(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [acquireResponse]);

  useEffect(() => {
    if (startDownload && exportRespone.data) {
      downloadFile(exportRespone.data, fileName);
      setShowProgress(true);
      setStartDownload(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exportRespone, startDownload]);

  const getSelectedImportItem = (selectedItemCount) => {
    setImportClicked(true);
    setSelectedImportItem(selectedItemCount);
  };

  const onChangeSearch = (value) => {
    setSearchQuery(value);
  };

  const getStatusData = (statusArray) => {
    const dataArr = [] as any;
    statusArray.map((item) => {
      const statusValue = Object.keys(EWI_STATUS).find(
        (key) => EWI_STATUS[key] === item
      );
      return dataArr.push({ value: item, text: statusValue });
    });
    setStateOptions(dataArr);
  };

  const getTagsData = (tagsArray) => {
    const dataArr = [] as any;
    tagsArray.map((item) => {
      return dataArr.push({ value: item, text: item });
    });
    setTagsOptions(dataArr);
  };

  const onChangeStatus = (value) => {
    setStatusFilter(value);
  };

  const onChangeTags = (value) => {
    setTagsFilter(value);
  };

  const onChangeFavourites = (value) => {
    setFormulaSetFilter(value);
  };

  const onClickClearFilters = () => {
    setSearchQuery('');
    setStatusFilter(0);
    setTagsFilter('');
    setFormulaSetFilter('viewAll');
  };

  const getSelectedEWI = (selectedEWIArray) => {
    if (selectedEWIArray && selectedEWIArray.length > 0) {
      const ewiArray = [] as any;
      selectedEWIArray.map((item) => {
        return ewiArray.push({ id: item.id, title: item.title });
      });
      setSeletedEwi(ewiArray);
    }
  };

  const onClickExportSelected = () => {
    setFileName('');
    setOpen(true);
  };

  const onChangeFileName = (value) => {
    if (fileNameError) {
      setFileNameError('');
    }
    setFileName(value);
  };

  const onChangeKey = (value) => {
    if (validationError) {
      setValidationError('');
    }
    setEncryptionKey(value);
  };

  const onChangeReEnterKey = (value) => {
    if (validationError) {
      setValidationError('');
    }
    setReEnterKey(value);
  };

  const onClickExportFormula = (formulaData) => {
    setOpen(true);
    setSelectedFormulaSets(formulaData);
  };

  const onClickEncrypt = async () => {
    if (fileName && !fileName.match(/^[0-9a-zA-Z_@#$&*+-]+$/)) {
      setFileNameError('Filename is incorrect');
    } else if (encryptionKey !== reEnterKey) {
      setValidationError('Keys are not matching');
    } else if (encryptionKey.length < 8) {
      setValidationError('Key must be minimum 8 characters');
    } else {
      setOpen(false);
      setShowExport(true);
      dispatch(acquireLock());
    }
  };

  const onClickCloseModal = () => {
    setOpen(false);
    setFileName('');
    setEncryptionKey('');
    setReEnterKey('');
    setValidationError('');
    setFileNameError('');
  };

  const onClickCancel = () => {
    setShowExport(false);
  };

  const onClickOk = () => {
    dispatch(setShowExportLogs(true));
    setShowExport(false);
    setShowProgress(false);
    // setFileName('');
    setEncryptionKey('');
    setReEnterKey('');
    setClearSelection(true);
  };

  const handleOpenDecryptionModal = (e?) => {
    dispatch(setActivePopup('importDecryptModal'));
    if (showActiveExportLogs) {
      dispatch(setShowExportLogs(false));
    }
    // setIsModalOpen(true);
    if (e !== undefined) {
      setImportFile(e.target.files[0]);
      setLocationValue(e.target.files[0].name);
      e.target.value = null;
    }
  };
  const handleCheckedImport = () => {
    if (showActiveExportLogs) {
      dispatch(setShowExportLogs(false));
    }
    setCheckedFunction('import');
    setExportType('');
  };
  const handleCheckedExport = () => {
    if (showActiveExportLogs) {
      dispatch(setShowExportLogs(false));
    }
    if (importedType) {
      dispatch(setImportType(''));
    }
    closeModal();
    dispatch(setEmptyImportEwi());
    dispatch(setEmptyImportFormula());
    setCheckedFunction('export');
  };

  const { authorized: impExpAuth } = useAuthorize([
    PermissionValues.ImportExportFormulaNdEWI,
  ]);

  return (
    <div className="import-export">
      <div className="import-export_leftPanel">
        <span className="import-export_leftPanel-headerText">
          Import / Export
        </span>
        <List>
          <List.Content>
            <Radio
              disabled={!impExpAuth}
              label="Export"
              checked={checkedFunction === 'export'}
              name="radio-impexp"
              onChange={() => handleCheckedExport()}
            />
            <div className="sub-child">
              <Radio
                disabled={!impExpAuth}
                label="Work instructions"
                name="exportGroup"
                checked={exportType === 'ewi'}
                onChange={() => {
                  setExportType('ewi');
                  setSearchQuery('');
                  setSelectedFormulaSets(null);
                  setClearSelection(false);
                  handleCheckedExport();
                }}
              />
              <Radio
                disabled={!impExpAuth}
                label="Formula sets"
                name="exportGroup"
                checked={exportType === 'formula'}
                className="d-block"
                onChange={() => {
                  setExportType('formula');
                  setSearchQuery('');
                  setSeletedEwi(null);
                  setFormulaSetFilter('viewAll');
                  setClearSelection(false);
                  handleCheckedExport();
                }}
              />
            </div>
          </List.Content>
          <List.Content className="pt-3">
            <Radio
              label="Import"
              disabled={!impExpAuth}
              name="radio-impexp"
              checked={checkedFunction === 'import'}
              onChange={() => {
                handleCheckedImport();
              }}
            />
            <div className="sub-child">
              <span className="d-block pb-2">Import from</span>
              <input
                readOnly={!impExpAuth}
                type="file"
                accept=".zip,.rar,.7zip"
                onChange={(e) => handleOpenDecryptionModal(e)}
                disabled={checkedFunction !== 'import'}
              />
              <Input
                className="pt-2"
                value={locationValue}
                label="Location"
                disabled={checkedFunction !== 'import'}
              />
            </div>
          </List.Content>
        </List>
      </div>
      {activeModal === 'importDecryptModal' && (
        <DecryptionKeyModal
          open
          closeModal={closeModal}
          importFile={importFile}
        />
      )}
      {showActiveExportLogs && importClicked ? (
        <ActiveImportList
          importedFileLength={selectedImportItem}
          fileName={
            checkedFunction === 'import'
              ? locationValue
              : fileName || 'Production_package'
          }
          checkedFunction={checkedFunction}
        />
      ) : (
        <div className="import-export_rightPanel_main">
          <div className="import-export_rightPanel">
            <div className="import-export_header">
              {(importTypeLocal || exportType) && (
                <Input
                  className="search-table"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(value) => onChangeSearch(value)}
                  icon={
                    <Icon
                      name="search"
                      root="common"
                      size="small"
                      iconPosition="left"
                    />
                  }
                />
              )}
              {exportType === 'ewi' && (
                <>
                  <Select
                    placeholder="Filter by tags"
                    options={tagsOptions}
                    className="pl-3"
                    value={tagsFilter}
                    onChange={(value) => onChangeTags(value)}
                  />
                  <Select
                    placeholder="Filter by status"
                    options={stateOptions}
                    className="pl-3"
                    value={statusFilter !== 0 ? statusFilter : null}
                    onChange={(value) => onChangeStatus(value)}
                  />
                </>
              )}
              {exportType === 'formula' && (
                <Select
                  options={[
                    { value: 'viewAll', text: 'View All' },
                    { value: 'favorite', text: 'Favorite' },
                  ]}
                  className="pl-3"
                  value={formulaSetFilter}
                  onChange={(value) => {
                    onChangeFavourites(value);
                  }}
                />
              )}
              {exportType && (
                <span
                  className="clear-all pl-3"
                  onClick={() => onClickClearFilters()}
                  aria-hidden="true"
                >
                  Clear filters
                </span>
              )}
            </div>
            {exportType && (
              <div className="pt-2">
                <span>Showing most recent {dataCount} items</span>
              </div>
            )}
            {exportType === 'ewi' && checkedFunction === 'export' && (
              <EWIExport
                searchQuery={searchQuery}
                getStatusData={getStatusData}
                statusFilter={statusFilter}
                tagsFilter={tagsFilter}
                onClickExportSelected={onClickExportSelected}
                getSelectedEWI={getSelectedEWI}
                getTagsData={getTagsData}
                setDataCount={setDataCount}
                clearSelectedItem={clearSelection}
                getSelectedImportItem={getSelectedImportItem}
              />
            )}
            {exportType === 'formula' && checkedFunction === 'export' && (
              <FormulaExport
                searchQuery={searchQuery}
                onClickExportFormula={(formulaArray) =>
                  onClickExportFormula(formulaArray)
                }
                formulaSetFilter={formulaSetFilter}
                setDataCount={setDataCount}
                clearSelectedItem={clearSelection}
                getSelectedImportItem={getSelectedImportItem}
              />
            )}
            {checkedFunction === 'export' && (
              <ExportPopup
                open={open}
                setOpen={setOpen}
                fileName={fileName}
                onChangeFileName={onChangeFileName}
                encryptionKey={encryptionKey}
                onChangeKey={onChangeKey}
                reEnterKey={reEnterKey}
                onChangeReEnterKey={onChangeReEnterKey}
                onClickEncrypt={onClickEncrypt}
                error={validationError}
                fileNameError={fileNameError}
                showExport={showExport}
                showProgress={showProgress}
                onClickCancel={onClickCancel}
                onClickOk={onClickOk}
                onClickCloseModal={onClickCloseModal}
              />
            )}
            {checkedFunction === 'import' && importTypeLocal === 'ewi' && (
              <EwiImport
                searchQuery={searchQuery}
                getSelectedImportItem={getSelectedImportItem}
              />
            )}
            {checkedFunction === 'import' && importTypeLocal === 'formula' && (
              <FormulaImport
                searchQuery={searchQuery}
                onClickExportFormula={(formulaArray) =>
                  onClickExportFormula(formulaArray)
                }
                formulaSetFilter={formulaSetFilter}
                setDataCount={setDataCount}
                clearSelectedItem={clearSelection}
                getSelectedImportItem={getSelectedImportItem}
              />
            )}
          </div>
        </div>
      )}
      {impExpErrorMessage && (
        <Modal open={impExpErrorModal} size="mini">
          <Modal.Content>{impExpErrorMessage}</Modal.Content>
          <Modal.Footer>
            <Button
              type="primary"
              content="OK"
              onClick={() => {
                setImpExpErrorModal(false);
                dispatch(setImpExpErrorMessage(''));
              }}
            />
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};
