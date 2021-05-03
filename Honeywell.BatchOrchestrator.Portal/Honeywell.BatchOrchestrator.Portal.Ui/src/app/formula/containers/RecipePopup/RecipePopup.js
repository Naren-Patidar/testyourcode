/* eslint-disable object-shorthand */
/* eslint-disable no-return-assign */
/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-use-before-define */

import React, { useState, useEffect, useRef } from 'react';
import { Button, Input, Icon, Modal, Card } from '@scuf/common';
// import './RecipePopup.scss';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import '../../components/AlertPopup/MessageBox.scss';
import { FM_URL } from 'utils/Settings';
import { getCookie } from 'utils/utility';
import { errorHandler } from 'core/error';
import { FORMULASET } from 'utils/constants/boterminology';
import { AppRoutes } from 'routing';
import { loginSuccessActionCreator } from '+store/authentication/actions';
import { getUsers } from '+store/user-management/actions';
import AlertPopup from '../AlertPopup';
import Recipes from './Recipes';

const xsrfToken = getCookie('X-XSRF-TOKEN');
const axiosClient = axios.create({
  headers: {
    'content-type': 'application/json',
    'X-XSRF-TOKEN': xsrfToken,
  },
  withCredentials: true,
});
function RecipePopup({ openModal, onCloseModal, ...props }) {
  const [showRecipes, setShowRecipes] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState([]);
  const [productName, setProductName] = useState('');
  const [selection, setSelection] = useState(-1);
  const [search, setSearch] = useState('');
  const [messageBoxItemFlag, setMessageBoxItemFlag] = useState(false);
  const [messageBoxItem, setMessageBoxItem] = useState('');
  const [open, setOpen] = useState(false);
  const [isRecipeValid, setIsRecipeValid] = useState(true);

  const renderModal = () => {
    return (
      <Modal
        className="modal-Popup"
        closeIcon
        size="small"
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
            content="Ok"
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
  const { setSelected } = props;
  const history = useHistory();

  function performValidations(productName) {
    const pattern = new RegExp(
      /^([^` ~\t!@$^_+=./,<>'"*?|:;[\]{}()%#&-])[a-zA-Z0-9`~!@$^+\t= _-]{0,31}$/
    );
    if (pattern.test(productName)) {
      props.setShowFormulaSet(true);
      props.setProductName(productName || '');
      props.setImported(true);
      setShowRecipes(false);
      setSelectedRecipe([]);
      setProductName('');
      setSelection(-1);
      setSearch('');

      // history.push({pathname:FORMULASET_ROUTE,state:{mr:selectedRecipe}});

      validateMasterRecipe(productName);
    } else {
      // alert("Check for special characters or length");
      setMessageBoxItem(
        'Check for special characters or length or Empty Space'
      );
      // setMessageBoxItemFlag(true)
      setOpen(!open);
    }
  }

  const validateFormulaCategoryName = (FormulaCategoryName) => {
    const pattern = new RegExp(
      /^([^` ~\t!@$^_+=./,<>'"*?|:;[\]{}()%#&-])[a-zA-Z0-9`~!@$^+\t= _-]{0,31}$/
    );
    if (pattern.test(FormulaCategoryName)) {
      return true;
    }
    return false;
  };

  const validateMasterRecipe = async (productName) => {
    let data = [];
    try {
      await axiosClient
        .post(
          `${FM_URL}GetMasterFormulaParametersByRecipeName/`,
          selectedRecipe[0]
        )
        .then((response) => {
          if (response.status === 200) {
            data = response.data;
            return response.data.json();
          }
          throw errorHandler(response);
        })
        .catch((err) => {
          if (err && err.status && err.status !== 200) {
            setMessageBoxItem(err.message);
            setOpen(!open);
          }
        });
    } catch (ex) {
      errorHandler();
    }

    if (data !== null && data.isValidToImport === true) {
      setIsRecipeValid(true);
      onCloseModal();
      history.push({
        pathname: AppRoutes.ADD_FORMULASET.path,
        state: { mr: selectedRecipe, productName: productName },
      });
    } else if (data !== null && data.isValidToImport === false) {
      // --error condition
      setIsRecipeValid(false);
    }
  };

  useEffect(() => {
    if (props.showCreateFormulaSet) {
      setShowRecipes(true);
    }
    // eslint-disable-next-line
  }, [props.showCreateFormulaSet]);

  // const { getUsers1, loginSuccessActionCreator } = props

  // const ref = useRef()
  // function useOnClickOutside(ref, handler) {
  //   useEffect(() => {
  //     const listener = event => {
  //       if (
  //         !ref.current ||
  //         ref.current.contains(event.target) ||
  //         event.target.classList[0] === "tab" ||
  //         event.target.innerHTML === "Create Formula Set" ||
  //         event.target.parentNode.classList[0] === "sidebar" ||
  //         event.target.parentNode.parentNode.classList[0] === "sidebar"
  //       ) {
  //         return
  //       }
  //       handler(event)
  //     }

  //     document.addEventListener('mousedown', listener)
  //     document.addEventListener('touchstart', listener)

  //     return () => {
  //       document.removeEventListener('mousedown', listener)
  //       document.removeEventListener('touchstart', listener)
  //     }
  //   }, [ref, handler])
  // }
  // useOnClickOutside(ref, () => clearStates())

  useEffect(() => {
    if (selectedRecipe && selectedRecipe.length > 0) {
      setSelected([
        selectedRecipe[0].clusterName,
        selectedRecipe[0].recipeName,
      ]);
    } else {
      setSelected(null);
    }
  }, [selectedRecipe, setSelected]);

  function clearStates() {
    setShowRecipes(false);
    setSelectedRecipe([]);
    setProductName('');
    setSelection(-1);
    setSearch('');
    // history.push(AppRoutes.DEFAULT.path);
    // props.setShowCreateFormulaSet(false)
  }

  return (
    <>
      <AlertPopup
        messageBoxItem={messageBoxItem}
        open={open}
        setOpen={setOpen}
      />

      <Modal
        open={openModal}
        closeOnDimmerClick={false}
        closeOnDocumentClick={false}
        className="medium"
      >
        <Modal.Content scrolling={false}>
          <Card>
            <Card.Content>
              <div className="m-4 p-4">
                <div className="d-flex justify-content-between">
                  <div className="font-size-18 text-dark-400 text-semibold">{`Create ${FORMULASET}`}</div>
                  <Icon
                    name="close"
                    root="common"
                    className="cursor-pointer font-size-l7-rem-force"
                    onClick={() => {
                      clearStates();
                      onCloseModal();
                    }}
                  />
                </div>
                <div className="d-flex justify-content-between mt-8">
                  <div className="font-size-16 text-dark-700 text-semibold">
                    Select Recipe to import
                  </div>
                  <div className="d-flex align-items-center ">
                    <Input
                      value={search}
                      placeholder="Search"
                      iconPosition="left"
                      icon={
                        <Icon name="search" root="common" exactSize="1rem" />
                      }
                      onChange={(value) => {
                        setSearch(value);
                      }}
                    />
                    <Icon
                      name="refresh"
                      root="common"
                      exactSize="1rem"
                      className="ml-4 cursor-pointer"
                      onClick={() => {
                        setShowRecipes(true);
                        setSearch('');
                        setSelection(-1);
                        setSelected(null);
                        setSelectedRecipe([]);
                      }}
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <Recipes
                    showRecipes={showRecipes}
                    setShowRecipes={setShowRecipes}
                    selectedRecipe={selectedRecipe}
                    setSelectedRecipe={setSelectedRecipe}
                    selection={selection}
                    setSelection={setSelection}
                    search={search}
                    setSearch={setSearch}
                    url={props.url}
                  />
                </div>
                {!isRecipeValid && (
                  <div className="error-text mt-4">
                    Recipe is not valid to import
                  </div>
                )}
                <div className="mt-4">
                  <Input
                    fluid
                    label={`${FORMULASET} Name`}
                    placeholder={`Enter ${FORMULASET} name`}
                    value={productName}
                    size={33}
                    onChange={(event) => {
                      if (event.length) {
                        if (validateFormulaCategoryName(event)) {
                          setProductName(event);
                        } else {
                          setMessageBoxItem(
                            'Check for special characters or length or Empty Space'
                          );
                          // setMessageBoxItemFlag(true)
                          setOpen(!open);
                        }
                      } else {
                        setProductName('');
                      }
                    }}
                    icon={
                      productName.length > 0 ? (
                        <Icon
                          className="btn-cross-formula-set-inputbox"
                          name="close"
                          root="common"
                          exactSize="0.875rem"
                          onClick={() => {
                            setProductName('');
                          }}
                        />
                      ) : null
                    }
                    iconPosition="right"
                  />
                </div>
                <div className="d-flex justify-content-end mt-4">
                  <Button
                    type="primary"
                    size="small"
                    content="Import"
                    disabled={
                      !(productName.length !== 0 && selectedRecipe.length !== 0)
                    }
                    onClick={() => {
                      performValidations(productName);
                    }}
                  />
                </div>
              </div>
            </Card.Content>
          </Card>
        </Modal.Content>
      </Modal>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    ...state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUsers1: () => dispatch(getUsers()),
    loginSuccessActionCreator: () => dispatch(loginSuccessActionCreator()),
  };
};
// export default RecipePopup
export default connect(mapStateToProps, mapDispatchToProps)(RecipePopup);
