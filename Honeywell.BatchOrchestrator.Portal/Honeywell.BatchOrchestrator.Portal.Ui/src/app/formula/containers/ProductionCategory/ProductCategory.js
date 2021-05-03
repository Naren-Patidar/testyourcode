/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-bitwise */
/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-underscore-dangle */
/* eslint-disable import/order */
import React, { useRef, useEffect, useState } from 'react';
// import Favorites from '../../favorites/components';  // TODO:
import AllFormulasSet from './AllFormulasSet';
import '../../stylesheets/productCategory.scss';
import { Button, toggleTheme, Select, Modal } from '@scuf/common';
import { useHistory } from 'react-router-dom';
import { withProductCategoryContext } from '../../controllers/product-category/product-category-context';
import '../../components/AlertPopup/MessageBox.scss';

import { HubConnectionBuilder, HttpTransportType } from '@microsoft/signalr';
import { BASE_URL, SIGNALR_URL } from 'utils/Settings';
import { errorHandler } from 'core/error';
import AlertPopup from '../AlertPopup';
import { useAppShellFacade } from '+store/app-shell';
import SignalRService from 'core/signalr/SignalRConnection';

const ProductCategory = (props) => {
  const {
    refreshForExperionModification,
    getFormulaSets,
    formulaSetList,
    deleteFormulaSetById,
    uploadImageForFormulaSetById,
    deleteFormulaSetImageById,
    updateExperionChangesMRList,
    experionChangesMRList,
    updateSignalRConnectionStatus,
    signalRConnectionCreatedFlag,
    getAppSettingsStatus,
  } = props;
  // const { hubConnection } = useAppShellFacade();
  const _formulaSetList = JSON.parse(JSON.stringify(formulaSetList));
  const [filterStr, setFilterStr] = useState(null);
  const [messageBoxItem, setMessageBoxItem] = useState('');
  const [open, setOpen] = useState(false);

  if (_formulaSetList !== null && _formulaSetList !== undefined) {
    // Sorting with importedDt / sort function will sort both array target and destination.
    const newArray = _formulaSetList.sort(
      (x, y) => +new Date(y.importedDt) - +new Date(x.importedDt)
    );
  }

  const renderModal = () => {
    return (
      <Modal
        className="modal-Popup"
        size="small"
        closeIcon
        onClose={(e) => closeModal(e)}
        open={open}
        closeOnDimmerClick={false}
      >
        <Modal.Header className="modal-Popup-header">Alert</Modal.Header>
        <Modal.Content className="modal-Popup-content">
          {messageBoxItem}
        </Modal.Content>
        <Modal.Footer className="modal-Popup-footer">
          {/* <Button className="messageBoxCancel" type="secondary" size="medium" content="Cancel" onClick={(e) => closeModal(e)} /> */}
          <Button
            // className="messageBoxSubmit"
            type="primary"
            size="small"
            content="OK"
            onClick={(e) => closeModal(e)}
          />
        </Modal.Footer>
      </Modal>
    );
  };
  const closeModal = (e) => {
    if (e.path == undefined) {
      setOpen(false);
    }
  };

  const history = useHistory();
  const toggleMenu = () => {
    const menuDev = document.querySelector(
      '.ProductCategory-favorites-right-menu'
    );
    const filterBtn = document.querySelector(
      '.ProductCategory-favorites-right-button'
    );

    if (menuDev.style.visibility === 'hidden') {
      menuDev.style.visibility = 'visible';
    } else {
      menuDev.style.visibility = 'hidden';
    }
  };
  const menuItemHandle = (menuItem) => {
    setMessageBoxItem(menuItem.item);
    setOpen(!open);
    const menuDev = document.querySelector(
      '.ProductCategory-favorites-right-menu'
    );
    menuDev.style.visibility = 'hidden';
  };
  const refMenu = useRef();
  const filterItems = [
    'View all',
    'Released',
    'Not Released',
    'Active Campaign',
    'Approved',
    'Modified',
  ];
  useEffect(() => {
    getFormulaSets().then((res) => {
      if (res && res.status && res.status !== 200) {
        setMessageBoxItem(res.message);
        setOpen(!open);
      }
    });
    // refreshForExperionModification().then((res)=>{
    //   if(res && res.status && res.status!==200)
    //   {
    //       setMessageBoxItem(res.message);
    //       setOpen(!open);
    //   }
    //  });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectChangeHandler = (fltrItem) => {
    setFilterStr(fltrItem);
  };

  const formulaListDt = _formulaSetList?.filter((item) => {
    if (filterStr === null) {
      return item;
    }
    return item.status === filterStr;
  });

  useEffect(() => {
    // first time create new instance for signalR based on  signalRConnectionCreatedFlag=false
    // if (!signalRConnectionCreatedFlag) {
    //   const hubConnection = new HubConnectionBuilder()
    //     .withUrl(`${SIGNALR_URL}notify`, {
    //       transport: HttpTransportType.LongPolling,
    //     })
    //     .build();
    //   hubConnection
    //     .start({ withCredentials: true })
    //     .then((a) => {
    //       // when create intance for signalR and flag will be pushed to redux store
    //       updateSignalRConnectionStatus(true);
    //       // if (hubConnection.connectionId) {
    //       //     hubConnection.invoke("sendConnectionId", hubConnection.connectionId);
    //       // }
    //     })
    //     .catch((err) => console.error('SignalR Connection Error: ', err));
    if (!signalRConnectionCreatedFlag) {
      updateSignalRConnectionStatus(true);
      // hubConnection.on('SendNotification', (res) => {
      //   console.log('SendNotification', res);
      //   updateExperionChangesMRList(res);
      // });
      SignalRService.OnRecipeModificationDetected((res) => {
        updateExperionChangesMRList(res);
      });
      // hubConnection?.on('OnRecipeModificationDetected', (res) => {
      //   console.log('OnRecipeModificationDetected', res);
      //   updateExperionChangesMRList(res);
      // });
    }
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="ProductCategory">
      <div className="ProductCategory-favorites">
        <div className="ProductCategory-favorites-title">
          {/* <p>Product Category</p> */}
          {/* {renderModal()} */}
          <AlertPopup
            messageBoxItem={messageBoxItem}
            open={open}
            setOpen={setOpen}
          />
        </div>
        <div className="ProductCategory-favorites-right">
          <div className="ProductCategory-favorites-right-menu" ref={refMenu}>
            <ul>
              {filterItems.map((item, index) => {
                return (
                  <li key={index} onClick={(event) => menuItemHandle({ item })}>
                    {item}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
      {/* <Favorites formulaSetList={formulaListDt}></Favorites> */}
      <AllFormulasSet
        formulaSetList={formulaListDt}
        deleteFormulaSetById={deleteFormulaSetById}
        uploadImageForFormulaSetById={uploadImageForFormulaSetById}
        deleteFormulaSetImageById={deleteFormulaSetImageById}
        experionChangesMRList={experionChangesMRList}
        refreshForExperionModification={refreshForExperionModification}
        getAppSettingsStatus={getAppSettingsStatus}
        getFormulaSets={getFormulaSets}
      />
    </div>
  );
};

export default withProductCategoryContext(ProductCategory);
