/* eslint-disable consistent-return */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable array-callback-return */
/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { DataTable } from '@scuf/datatable';
import ReactTooltip from 'react-tooltip';

import './Formula-List.scss';
import {
  Icon,
  Button,
  Input,
  Popup,
  Modal,
  Select,
  Tooltip,
} from '@scuf/common';
import { Permissions, useAuthorize } from 'core/authentication';
import { PermissionValues } from 'core/authentication/models/user-permission';
import { AppRoutes } from 'routing';
import { SplitButton } from 'shared/split-button/splitButton';
import { getCookie } from 'utils/utility';
import { AppConstants } from 'utils/app-constants';
import { BASE_URL } from '../../../../utils/Settings';
import { withFormulaManagementContext } from '../../controllers/formula-list/formula-list-context';

import { useAppShellFacade } from '+store/app-shell';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
// import {
//   CREATE_PRODUCT_ROUTE,
//   VIEW_FORMULA_ROUTE,
//   CREATE_SIMILAR_FORMULA_ROUTE,
//   CREATE_BATCH_ROUTE,
// } from '../../../../utils/constants/routes';

import AlertPopup from '../AlertPopup';
import {
  FORMULA,
  IDENTIFICATION,
} from '../../../../utils/constants/boterminology';

const getCampaignLiceseEndPoint = `${BASE_URL}LicenceModel/LicenceCheck`;

const xsrfToken = getCookie('X-XSRF-TOKEN');
const axiosClient = axios.create({
  headers: {
    'content-type': 'application/json',
    'X-XSRF-TOKEN': xsrfToken,
  },
  withCredentials: true,
});

const FormulaList = (props) => {
  const {
    masterRecipeName,
    formulaList,
    getFormulaListByFormulaSetId,
    ProductTypName,
    formulaSetId,
    recipeID,
    deleteFormulaByFormulaId,
  } = props;
  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState(formulaList);
  const [messageBoxItem, setMessageBoxItem] = useState('');
  const [open, setOpen] = useState(false);
  const [rowDataId, SetRowDataId] = useState(null);
  const [deleteProductConfirmation, setDeleteProductConfirmation] = useState(
    false
  );
  const [selectedRow, setselectedRow] = useState(false);
  const [filterValue, setFilterValue] = useState(-1);

  const history = useHistory();
  const { advancedBatchLicense } = useAppShellFacade();

  const fltrOptions = [
    { value: -1, text: 'View all' },
    { value: 0, text: 'Draft' },
    { value: 1, text: 'In Review' },
    { value: 2, text: 'Approved' },
  ];

  const { authorized: canViewFormula } = useAuthorize([
    PermissionValues.ViewFormulaSetAndFormula,
  ]);
  const { authorized: canDeleteFormula } = useAuthorize([
    PermissionValues.DeleteFormulaSetAndFormula,
  ]);

  useEffect(() => {
    getFormulaListByFormulaSetId(formulaSetId).then((res) => {
      if (res && res.status && res.status !== 200) {
        setMessageBoxItem(res.message);
        setOpen(!open);
      }
    });
  }, []);
  useEffect(() => {
    if (formulaList) {
      setSearchResult(formulaList);
    }
  }, [formulaList]);

  useEffect(() => {
    let result;
    if (formulaList) {
      // result = FilterFormulaList(filterValue, formulaList);
      const searchedResult = SearchFormulaList(
        search,
        FilterFormulaList(filterValue, formulaList)
      );
      setSearchResult(searchedResult);
    }
  }, [search, formulaList]);

  useEffect(() => {
    let result;
    if (formulaList) {
      // result = SearchFormulaList(search, formulaList);
      const filterResult = FilterFormulaList(
        filterValue,
        SearchFormulaList(search, formulaList)
      );
      setSearchResult(filterResult);
    }
  }, [filterValue]);

  const FilterFormulaList = (filterValue, itemArry) => {
    const result = itemArry.filter((item) => {
      if (filterValue === -1) {
        return item;
      }
      if (item.status === filterValue) {
        return item;
      }
    });
    return result;
  };

  const SearchFormulaList = (searchText, formulaList) => {
    const items = formulaList.filter((data) => {
      if (searchText == null || searchText == '') return data;
      if (
        data.name.toLowerCase().includes(searchText.toLowerCase()) ||
        data.productId.toLowerCase().includes(searchText.toLowerCase())
      ) {
        return data;
      }
    });
    return items;
  };

  // This will get called with delete image will be asked to user
  const renderModalForDeleteProdutConfirmation = () => {
    return (
      <Modal
        className="modal-Popup"
        size="small"
        closeIcon
        onClose={cancelDeleteFormulaAction}
        open={deleteProductConfirmation}
        closeOnDimmerClick={false}
      >
        <Modal.Header className="modal-Popup-header">Alert</Modal.Header>
        <Modal.Content className="modal-Popup-content">
          Are you sure to delete?
        </Modal.Content>
        <Modal.Footer className="modal-Popup-footer">
          <Button
            // className="messageBoxCancel"
            type="secondary"
            size="small"
            content="Cancel"
            onClick={(e) => cancelDeleteFormulaAction()}
          />
          <Button
            // className="messageBoxSubmit"
            type="primary"
            size="small"
            content="Ok"
            onClick={(e) => deleteFormula(e)}
          />
        </Modal.Footer>
      </Modal>
    );
  };

  const deleteFormula = (e) => {
    // -Sending formula setId to get list of formula after delete
    deleteFormulaByFormulaId(selectedRow.id).then((res) => {
      if (res && res.data && !res.data.success) {
        setMessageBoxItem(res.data.message);
        setOpen(!open);
      }
      if (res && res.status && res.status !== 200) {
        setMessageBoxItem(res.message);
        setOpen(!open);
      } else {
        getFormulaListByFormulaSetId(formulaSetId).then((res) => {
          if (res && res.status && res.status !== 200) {
            setMessageBoxItem(res.message);
            setOpen(!open);
          }
        });
        setSearch('');
      }
    });
    setDeleteProductConfirmation(!deleteProductConfirmation);
  };
  const cancelDeleteFormulaAction = () => {
    setDeleteProductConfirmation(!deleteProductConfirmation);
  };

  const onDatatableRowClick = (data) => {
    // console.log('Row clicked')
  };

  const actionRenderer = (cellData) => {
    return (
      <div className="d-flex justify-content-end align-items-center">
        <Tooltip
          content="Click to view formula details"
          position="right center"
          element={
            <Icon
              className="cursor-pointer"
              name="visible"
              root="common"
              size="small"
              color="white"
              onClick={(e) => viewFormulaDetails(e, cellData.rowData)}
            />
          }
        />

        {cellData.rowData.status !== 1 ? (
          <span
            className="ml-2"
            onClick={(e) => deleteProduct(e, cellData.rowData)}
          >
            <Tooltip
              content="Click to delete this formula"
              element={
                <i className="icon-Delete cursor-pointer font-size-16" />
              }
              position="right center"
            />
          </span>
        ) : (
          // <Popup
          //   className="popup-content"
          //   element={
          //     <Icon name="ellipsis-horizontal" root="common" size="small" />
          //   }
          //   on="click"
          //   position="left center"
          //   hideOnScroll
          // >
          //   <div className="popup-content">
          //     {/* <div onClick={(event) => cloneProduct(event, cellData.rowData)}> <Icon className='icon' name="duplicate" root="common" size="small" color="white"  /> Clone Product</div> */}
          //     <div
          //       className="content-icon"
          //       onClick={(event) => deleteProduct(event, cellData.rowData)}
          //     >
          //       {' '}
          //       <Icon
          //         className="icon"
          //         title="delete"
          //         name="delete"
          //         root="global"
          //         size="medium"
          //         color="white"
          //       />{' '}
          //       Delete
          //     </div>
          //   </div>
          // </Popup>
          ''
        )}
      </div>
    );
  };

  const textWithToopTipRenderer = (cellData) => {
    return cellData ? (
      <Tooltip
        content={cellData.value}
        element={<span className="text-truncate">{cellData.value}</span>}
        position="top left"
        event="hover"
        hoverable
      />
    ) : null;
  };

  const statusRenderer = (cellData) => {
    if (cellData.value == 0) {
      // return <img src={EDIT_STATE}></img>
      return (
        <Tooltip
          content="Draft"
          position="bottom center"
          event="hover"
          hoverable
          element={<span className="icon icon-Draft orange" />}
        />
      );
    }
    if (cellData.value == 1) {
      // return <img src={InReview}></img>
      return (
        <Tooltip
          content="In Review"
          position="bottom center"
          event="hover"
          hoverable
          element={<span className="icon icon-In-review yellow" />}
        />
      );
    }
    if (cellData.value == 2) {
      // return <img src={Approved}></img>
      return (
        <Tooltip
          content="Approved"
          position="bottom center"
          event="hover"
          hoverable
          element={<span className="icon icon-Approved green" />}
        />
      );
    }

    return <span />;
  };

  const SplitButtonOptions = {
    CREATEBATCH: 'Create batch',
    CREATECAMPAIGN: 'Create campaign',
  };

  const handleClickToBatchOrToCampaign = (value, rowDataForSplitButton) => {
    if (value === SplitButtonOptions.CREATEBATCH) {
      return history.push({
        pathname: AppRoutes.CREATE_BATCH.path,
        state: {
          productForBatch: {
            formulaSetId,
            masterRecipeName,
            productID: rowDataForSplitButton.rowData.id,
            productTypName: ProductTypName,
          },
          fromNavigationMenu: false,
        },
      });
    }
    if (value === SplitButtonOptions.CREATECAMPAIGN) {
      return history.push(AppRoutes.CAMPAIGN_DASHBOARD.path, {
        formulaSetId,
        formulaId: rowDataForSplitButton.rowData.id,
      });
    }
  };
  const getSplitButtonItems = () => {
    if (advancedBatchLicense) {
      return ['Create campaign', 'Create batch'];
    }
    return ['Create batch'];
  };
  // const SplitButtonProps = {
  //   items: getSplitButtonItems(),
  //   onClick: (index) => handleClickToBatchOrToCampaign(index),
  //   // verticalMenuWidth: 300,
  //   disableSplitButton: false,
  //   cellData:cellData
  // };

  const moreActionRenderer = (cellData) => {
    if (cellData.value == 2) {
      SetRowDataId(cellData.rowData.id);
      return (
        <div className="action-button-section float-right">
          <Button
            type="secondary"
            size="small"
            content="Create batch"
            onClick={() => {
              return history.push({
                pathname: AppRoutes.CREATE_BATCH.path,
                state: {
                  productForBatch: {
                    formulaSetId,
                    masterRecipeName,
                    productID: cellData.rowData.id,
                    productTypName: ProductTypName,
                  },
                  fromNavigationMenu: false,
                },
              });
            }}
          />
        </div>
        // <SplitButton {...SplitButtonProps} />
      );
    }

    return <div>Not released</div>;
  };

  const moreActionRendererSplitButton = (cellData) => {
    if (cellData.value == 2) {
      SetRowDataId(cellData.rowData.id);
      const SplitButtonProps = {
        items: getSplitButtonItems(),
        onClick: (index, rowDataForSplitButton) =>
          handleClickToBatchOrToCampaign(index, rowDataForSplitButton),

        disableSplitButton: false,
        dataOfRow: cellData,
      };
      return <SplitButton {...SplitButtonProps} />;
    }
    return <div className="font-size-14 text-dark-000">Not released</div>;
  };

  const viewFormulaDetails = (e, row) => {
    if (!canViewFormula) {
      e.stopPropagation();
      setMessageBoxItem(AppConstants.UNAUTHORIZED_MESSAGE);
      setOpen(!open);
    } else if (canViewFormula) {
      return history.push({
        pathname: AppRoutes.VIEW_FORMULA.path,
        state: {
          product: {
            productId: row.id,
            productType: ProductTypName,
            name: row.name,
            formulaID: row.productId,
          },
        },
      });
    }
  };

  const cloneProduct = (event, row) => {
    event.stopPropagation();

    // return history.push({
    //   pathname: CREATE_SIMILAR_FORMULA_ROUTE, state: {
    //     product: {
    //       productID: row.productId,
    //       productType: ProductTypName
    //     },
    //   }
    // });
  };

  const deleteProduct = async (event, row) => {
    event.stopPropagation();
    if (!canDeleteFormula) {
      setMessageBoxItem(AppConstants.UNAUTHORIZED_MESSAGE);
      setOpen(!open);
    } else {
      setselectedRow(row);
      setDeleteProductConfirmation(!deleteProductConfirmation);
    }
  };

  const formulaFilterChangeHandler = (filterValue) => {
    setFilterValue(filterValue);
  };

  return (
    <div className="formula-container">
      {renderModalForDeleteProdutConfirmation()}
      <AlertPopup
        messageBoxItem={messageBoxItem}
        open={open}
        setOpen={setOpen}
      />
      <div className="d-flex justify-content-between mt-8">
        {/* <div className="button-container"> */}
        <Permissions
          type="disable"
          allowed={[PermissionValues.CreateFormulaSetAndFormula]}
        >
          {({ authorized }) => (
            <Button
              type="primary"
              size="small"
              content="Create new"
              disabled={!authorized}
              onClick={() => {
                return history.push({
                  pathname: AppRoutes.CREATE_PRODUCT.path,
                  state: {
                    productMR: {
                      id: recipeID,
                      number: 1,
                      recipe: '',
                      formulaSetId,
                      masterRecipeName,
                      set: ProductTypName,
                    },
                  },
                });
              }}
            />
          )}
        </Permissions>
        {/* </div> */}
        <div className="d-flex align-items-center">
          <Input
            value={search}
            placeholder="Search"
            iconPosition="left"
            icon={<Icon name="search" root="common" exactSize="0.875rem" />}
            onChange={(value) => {
              setSearch(value);
            }}
          />
          <Select
            placeholder="View all"
            value={filterValue}
            options={fltrOptions}
            onChange={(value) => formulaFilterChangeHandler(value)}
            className="ml-4"
          />
        </div>
      </div>
      <div className="mt-4">
        <DataTable
          data={searchResult}
          resizableColumns
          scrollable
          scrollHeight="48vh"
        >
          <DataTable.Column
            field="name"
            header={`${FORMULA} name`}
            sortable
            initialWidth={144}
            renderer={textWithToopTipRenderer}
          />

          <DataTable.Column
            field="productId"
            header={`${IDENTIFICATION}`}
            sortable
            initialWidth={158}
            renderer={textWithToopTipRenderer}
          />
          <DataTable.Column
            field="status"
            header="STATUS"
            align="center"
            initialWidth={95}
            renderer={statusRenderer}
          />
          <DataTable.Column
            field="status"
            header=""
            initialWidth={173}
            renderer={
              advancedBatchLicense
                ? moreActionRendererSplitButton
                : moreActionRenderer
            }
          />
          <DataTable.Column
            field="actions"
            header="ACTIONS"
            align="right"
            initialWidth={112}
            renderer={actionRenderer}
          />
        </DataTable>
      </div>
    </div>
  );
};

export default withFormulaManagementContext(FormulaList);
