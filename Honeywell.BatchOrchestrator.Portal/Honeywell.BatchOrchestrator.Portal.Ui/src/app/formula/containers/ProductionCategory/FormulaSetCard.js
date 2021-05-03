/* eslint-disable react/no-array-index-key */
/* eslint-disable prefer-const */
/* eslint-disable camelcase */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from 'react';
import '../../stylesheets/formulaSetCard.scss';
import { useHistory } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';
import { Modal, Icon, Button, Select, Tooltip, Card } from '@scuf/common';
import { DataTable } from '@scuf/datatable';
import { Permissions, useAuthorize } from 'core/authentication';
import { PermissionValues } from 'core/authentication/models/user-permission';
import FULL_STAR from 'assets/icons/full-star.svg';
import STAR from 'assets/icons/star.svg';
import EDIT from 'assets/icons/edit.svg';
import DELETE from 'assets/icons/delete.svg';
import Approved from 'assets/icons/Approved.svg';
// import inReview from 'assets/icons/inReview.svg';
// import Draft from 'assets/icons/inReview.svg';
import EDIT_STATE from 'assets/icons/edit_state.svg';
import three_dots from 'assets/icons/three_dots.svg';
import { Images_path, IMAGE_SIZE_LIMIT } from 'utils/Settings';
import '../../components/AlertPopup/MessageBox.scss';
import { AppRoutes } from 'routing/app.route-names';
import * as signalR from '@microsoft/signalr';
import { errorHandler } from 'core/error';
import { FORMULAS, FORMULASET } from 'utils/constants/boterminology';
import { AppConstants } from 'utils/app-constants';
import { useConfirm } from 'shared/confirm-dialog';
import { withFormulaSetCardContext } from '../../controllers/formulaset-card/formulaset-card-context';
import AlertPopup from '../AlertPopup';
import FormulaList from '../formula-list/Formula-List';
import { isExperionChangesAllowed } from '+store/formula/actions/formulaSets';

const stateConstants = [
  { key: 0, value: 'Draft' },
  { key: 1, value: 'In Review' },
  { key: 2, value: 'Approved' },
];

const FormulaSetCard = (props) => {
  let {
    item,
    name,
    totalProductsCount,
    recipeID,
    ProductTypName,
    formulaSetId,
    createdby,
    mrName,
    updatedOn,
    isFavorite,
    data,
    imgSrc,
    states,
    deleteFormulaSetById,
    uploadImageForFormulaSetById,
    deleteFormulaSetImageById,
    experionChangesMRList,
    getFormulaSets,
  } = props;

  states = stateConstants.find((item) => item.key === states).value;

  let imageName = imgSrc || null;

  let imageUrl;
  try {
    if (imageName !== null) {
      // imageUrl=require("C:/BO/Images/FormulaSet"+`/${imageName}`);
      imageUrl = `${Images_path}/${imageName}`;
    }
  } catch (ex) {
    imageName = null;
  }

  const [isFavoriteFlag, setIsFavoriteFlag] = useState(isFavorite);
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [popupState, setPopupState] = useState(false);
  const [imagePopupState, setImagePopupState] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageValidationMessage, setImageValidationMessage] = useState(null);
  const [messageBoxItem, setMessageBoxItem] = useState('');
  const [openModalForConfirmation, setOpenModalForConfirmation] = useState(
    false
  );
  const [
    deleteProdutCategoryConfirmation,
    setDeleteProdutCategoryConfirmation,
  ] = useState(false);
  const [isExperionChangeFlag, setIsExperionChangeFlag] = useState(false);
  const [messageBoxItemPopup, setMessageBoxItemPopup] = useState('');
  const [openPopup, setOpenPopup] = useState(false);

  const { authorized: canViewFormulaSet } = useAuthorize([
    PermissionValues.ViewFormulaSetAndFormula,
  ]);
  const { authorized: canDeleteFormulaSet } = useAuthorize([
    PermissionValues.DeleteFormulaSetAndFormula,
  ]);
  const { authorized: canUpdateFormulaSet } = useAuthorize([
    PermissionValues.ModifyFormulaSetAndFormula,
  ]);
  const confirm = useConfirm();
  const raiseAlert = async (message) => {
    const { confirmed } = await confirm.show({
      confirmText: 'Ok',
      message,
      title: 'Alert',
      type: 'alert',
    });
  };
  useEffect(() => {
    if (
      experionChangesMRList.indexOf(mrName) !== -1 ||
      item.isSyncWithDataBlock == 0
    ) {
      setIsExperionChangeFlag(true);
      if (
        experionChangesMRList.length === 1 &&
        experionChangesMRList.indexOf(mrName) !== -1 &&
        item.isSyncWithDataBlock == 1
      ) {
        setIsExperionChangeFlag(false);
      }
    } else {
      setIsExperionChangeFlag(false);
    }
  });

  // let name = "Greek Yogurt";
  const text = `${FORMULAS}`;
  const history = useHistory();
  // renderModalForConfirmation will get called when delete produt category will be asked to the user
  const renderModalForConfirmation = () => {
    return (
      <Modal
        className="modal-Popup"
        size="small"
        closeIcon
        onClose={(e) => closeModalForConfirmation(e)}
        open={openModalForConfirmation}
        closeOnDimmerClick={false}
      >
        <Modal.Header className="modal-Popup-header">Alert</Modal.Header>
        <Modal.Content className="modal-Popup-content">
          {messageBoxItem}
        </Modal.Content>
        <Modal.Footer className="modal-Popup-footer">
          <Button
            // className="messageBoxCancel"
            type="secondary"
            size="small"
            content="Cancel"
            onClick={(e) => closeModalForConfirmation(e)}
          />
          <Button
            // className="messageBoxSubmit"
            type="primary"
            size="small"
            content="Ok"
            onClick={(e) => confirmModal(e)}
          />
        </Modal.Footer>
      </Modal>
    );
  };
  const closeModalForConfirmation = (e) => {
    e.stopPropagation();
    if (e.path == undefined) {
      setOpenModalForConfirmation(false);
    }
  };
  const confirmModal = (e) => {
    e.stopPropagation();
    // setConfirmModalFlag(true)
    deleteFormulaSetById(formulaSetId, mrName).then((res) => {
      if (res && res.status && res.status !== 200) {
        setMessageBoxItemPopup(res.message);
        setOpenPopup(!open);
      }
      if (res && res.data && !res.data.success) {
        setMessageBoxItemPopup(res.data.message);
        setOpenPopup(!open);
      }
    });
    setOpenModalForConfirmation(false);
  };
  // This will get called with delete image will be asked to user
  const renderModalForDeleteProdutCategory = () => {
    return (
      <Modal
        className="modal-Popup"
        size="small"
        closeIcon
        onClose={(e) => closeModalForDeleteProdutCategory(e)}
        open={deleteProdutCategoryConfirmation}
        closeOnDimmerClick={false}
      >
        <Modal.Header className="modal-Popup-header">Alert</Modal.Header>
        <Modal.Content className="modal-Popup-content">
          {messageBoxItem}
        </Modal.Content>
        <Modal.Footer className="modal-Popup-footer">
          <Button
            // className="messageBoxCancel"
            type="secondary"
            size="small"
            content="Cancel"
            onClick={(e) => closeModalForDeleteProdutCategory(e)}
          />
          <Button
            // className="messageBoxSubmit"
            type="primary"
            size="small"
            content="Ok"
            onClick={(e) => DeleteProdutCategoryModal(e)}
          />
        </Modal.Footer>
      </Modal>
    );
  };
  const closeModalForDeleteProdutCategory = (e) => {
    e.stopPropagation();
    if (e.path == undefined) {
      setDeleteProdutCategoryConfirmation(false);
    }
  };
  const DeleteProdutCategoryModal = (e) => {
    e.stopPropagation();
    deleteFormulaSetImageById(formulaSetId).then((res) => {
      if (res && res.status && res.status !== 200) {
        setMessageBoxItemPopup(res.message);
        setOpenPopup(!open);
      }
    });
    setDeleteProdutCategoryConfirmation(false);
  };
  const renderFavoriteIcon = () => {
    if (isFavoriteFlag) return STAR;
    return FULL_STAR;
  };
  const favoriteHandle = ({ formulaSetId }) => {
    setIsFavoriteFlag(!isFavoriteFlag);
    props
      .updateFavoriteFlagFormulaSet(formulaSetId, !isFavoriteFlag)
      .then((res) => {
        if (res && res.status && res.status !== 200) {
          setMessageBoxItemPopup(res.message);
          setOpenPopup(!open);
        }
      });
  };
  const Options = [{ value: 'Create Batch', text: 'Create Batch' }];

  const closeModal = (e) => {
    if (e.path === undefined && e.srcElement === undefined) {
      getFormulaSets();
      setOpen(false);
    }
  };

  const viewExperionChanges = async () => {
    const operationResult = await isExperionChangesAllowed(mrName, name);
    if (operationResult) {
      if (operationResult.success) {
        history.push({
          pathname: AppRoutes.EXPERION_MODIFIED_PARAMETER.path,
          state: {
            formulaSetId,
            recipeName: mrName,
            ProductTypName,
          },
        });
      }
    }
  };

  const onProductModelClick = (event) => {
    event.stopPropagation();
  };

  const renderModal = () => {
    return (
      <Modal
        onClick={(event) => onProductModelClick(event)}
        // onClose={(e) => closeModal(e)}
        open={open}
        closeOnDimmerClick={false}
        closeOnDocumentClick={false}
        className="medium w-60-p"
      >
        <Modal.Content>
          <Card>
            <Card.Content>
              <div className="m-4 p-4">
                <div className="d-flex justify-content-between">
                  <div className="font-size-18 text-dark-400 text-semibold">
                    {ProductTypName}
                  </div>
                  <Icon
                    name="close"
                    root="common"
                    className="cursor-pointer font-size-l7-rem-force"
                    onClick={(e) => {
                      closeModal(e);
                    }}
                  />
                </div>

                <FormulaList
                  formulaSetId={formulaSetId}
                  ProductTypName={ProductTypName}
                  recipeID={recipeID}
                  masterRecipeName={mrName}
                />
              </div>
            </Card.Content>
          </Card>
        </Modal.Content>
      </Modal>
    );
  };

  const renderTooltip = () => {};

  const viewParametersHandle = (e, isEdit) => {
    if (!canViewFormulaSet) {
      setMessageBoxItemPopup(AppConstants.UNAUTHORIZED_MESSAGE);
      setOpenPopup(!open);
      e.stopPropagation();
    } else if (canViewFormulaSet) {
      return history.push({
        pathname: AppRoutes.VIEW_FORMULASET.path,
        state: {
          productMR: {
            creator: createdby,
            date: updatedOn,
            id: recipeID,
            number: 1,
            recipe: mrName,
            formulaSetId,
            set: ProductTypName,
          },
          isEdit,
        },
      });
    }
  };

  const confirmDeleteHandle = (event, formulaSetId) => {
    event.stopPropagation();
    if (!canDeleteFormulaSet) {
      setMessageBoxItemPopup(AppConstants.UNAUTHORIZED_MESSAGE);
      setOpenPopup(!open);
    } else if (canDeleteFormulaSet) {
      setMessageBoxItem('Are you sure to delete ?');
      setOpenModalForConfirmation(!openModalForConfirmation);
    }
  };

  const addEditImageHandler = (event, formulaSetId) => {
    event.stopPropagation();
    if (!canUpdateFormulaSet) {
      setMessageBoxItemPopup(AppConstants.UNAUTHORIZED_MESSAGE);
      setOpenPopup(!open);
    } else {
      setImagePopupState(true);
    }
  };

  const deleteImageHandler = (event, formulaSetId) => {
    event.stopPropagation();
    setMessageBoxItem('Are you sure delete image?');
    setDeleteProdutCategoryConfirmation(!deleteProdutCategoryConfirmation);
  };
  // const actionItems=[{iconPath:EDIT,displayText:"Add/edit image icon",action:addEditImageHandler},{iconPath:DELETE,displayText:"Delete Product Category",action:confirmDeleteHandle},{iconPath:DELETE,displayText:"Delete Image",action:deleteImageHandler}]
  const actionItems = [
    {
      iconPath: 'icon icon-Edit',
      displayText: 'Add/edit image',
      action: addEditImageHandler,
    },
    // {
    //   iconPath: 'icon icon-Delete',
    //   displayText: `Delete ${FORMULASET}`,
    //   action: confirmDeleteHandle,
    // },
  ];
  if (states.toLowerCase() !== 'in review') {
    actionItems.push({
      iconPath: 'icon icon-Delete',
      displayText: `Delete ${FORMULASET}`,
      action: confirmDeleteHandle,
    });
  }
  if (imageName !== null) {
    actionItems.push({
      iconPath: 'icon icon-Delete',
      displayText: 'Delete Image',
      action: deleteImageHandler,
    });
  }

  const prepareShortName = (name) => {
    const names = name.split(' ');
    let result = null;
    if (names.length === 1) {
      result = name.substring(0, 3);
      return result;
    }
    result = names[0].substring(0, 2) + names[1].substring(0, 1);
    return result;
  };

  const fileChangedHandler = (event) => {
    setImageValidationMessage(null);
    setSelectedImage(event.target.files[0]);
  };

  const uploadHandler = async () => {
    const file = selectedImage;
    if (file.type.split('/')[0] === 'image') {
      if (file.size <= IMAGE_SIZE_LIMIT) {
        await uploadImageForFormulaSetById(formulaSetId, file).then((res) => {
          if (res && res.status && res.status !== 200) {
            setMessageBoxItemPopup(res.message);
            setOpenPopup(!open);
          }
        });
        setImagePopupState(false);
      } else {
        const _tempImageSizeMaxMb = IMAGE_SIZE_LIMIT / 1000;
        setImageValidationMessage(
          `Maximum image size ${_tempImageSizeMaxMb} KB.`
        );
      }
    } else {
      setImageValidationMessage('Only image file accepts.');
    }
  };

  const imgClickHandler = (event) => {
    event.stopPropagation();
    history.push(AppRoutes.VIEW_APPROVALS.path);
  };

  return (
    <>
      {renderModalForConfirmation()}
      {renderModalForDeleteProdutCategory()}
      <AlertPopup
        messageBoxItem={messageBoxItemPopup}
        open={openPopup}
        setOpen={setOpenPopup}
      />
      <div
        className="FormulaSetCard"
        onMouseLeave={() => {
          setPopupState(false);
        }}
      >
        {renderModal()}

        <Modal
          closeIcon
          onClose={(e) => {
            setImagePopupState(false);
            setImageValidationMessage(null);
          }}
          open={imagePopupState}
          closeOnDimmerClick={false}
          size="small"
        >
          <Modal.Content>
            <div className="d-flex flex-column p-8">
              <input
                className="upload mb-4"
                type="file"
                onChange={fileChangedHandler}
              />
              <Button
                type="secondary"
                size="small"
                actionType="button"
                content="Upload"
                disabled={!selectedImage}
                onClick={(event) => {
                  event.preventDefault();
                  uploadHandler();
                }}
              />
              <div className="uploadImageDetailsDiv">
                {imageValidationMessage}
              </div>
            </div>
          </Modal.Content>
        </Modal>

        <div
          className="FormulaSetCard-card"
          onClick={() => {
            setOpen(!open);
          }}
        >
          <div
            style={{
              backgroundImage: `url(${imageUrl})`,
              backgroundPosition: 'center center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
            }}
            className="FormulaSetCard-card-header"
          >
            {!imageName && (
              <div className="shortName">
                {prepareShortName(name).toUpperCase()}
              </div>
            )}
            <div
              title="Actions"
              onClick={(event) => {
                event.stopPropagation();
                setPopupState(!popupState);
              }}
              className={`FormulaSetCard-card-header-label ${
                imageName ? 'bg-with-image' : ''
              }`}
            >
              <i className="icon icon-More-options-general" />
            </div>
            {popupState && (
              <div
                className="popupActions"
                onClick={(event) => event.stopPropagation()}
              >
                {actionItems.map((item, index) => {
                  return (
                    <div
                      className="popupActions-div"
                      key={`popupActions${index}`}
                    >
                      <span
                        style={{ paddingRight: '0.75vw' }}
                        className={item.iconPath}
                      />
                      <span
                        onClick={(event) => item.action(event, formulaSetId)}
                      >
                        {item.displayText}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          <div className="FormulaSetCard-card-footer">
            <div className="FormulaSetCard-card-footer-details">
              <Tooltip
                content={name}
                element={
                  <div className="FormulaSetCard-card-footer-details-left">
                    <div className="FormulaSetCard-card-footer-details-left-name text-truncate">
                      {name}
                    </div>
                    <div
                      className="vParameters"
                      disabled={!canViewFormulaSet}
                      onClick={(e) => {
                        return viewParametersHandle(e, states !== 'In Review');
                      }}
                    >
                      View Parameters
                    </div>
                  </div>
                }
                position="top center"
                event="hover"
                hoverable
              />

              <div className="FormulaSetCard-card-footer-details-right">
                <div className="FormulaSetCard-card-footer-details-right-total">
                  {String(totalProductsCount).length === 1
                    ? `0${totalProductsCount}`
                    : totalProductsCount}
                </div>
                <div className="FormulaSetCard-card-footer-details-right-products">
                  {text}
                </div>
              </div>
            </div>
            <div className="FormulaSetCard-card-footer-icons">
              <div className="FormulaSetCard-card-footer-icons-states">
                {states.split(',').map((item, index) => {
                  if (item === 'Draft') {
                    return (
                      <span
                        key={`icons-states-${index}`}
                        title="Draft"
                        onClick={(event) => {
                          return imgClickHandler(event);
                        }}
                        className="icon icon-Draft orange"
                      />
                    );
                  }
                  if (item === 'In Review') {
                    return (
                      <span
                        key={`icons-states-${index}`}
                        title="In Review"
                        onClick={(event) => {
                          return imgClickHandler(event);
                        }}
                        className="icon icon-In-review yellow"
                      />
                    );
                  }
                  if (item === 'Approved') {
                    return (
                      <span
                        key={`icons-states-${index}`}
                        title="Approved"
                        onClick={(event) => {
                          return imgClickHandler(event);
                        }}
                        className="icon icon-Approved green"
                      />
                    );
                  }
                })}

                {!item.isSyncWithDataBlock && (
                  <div
                    className="action-required"
                    onClick={(e) => {
                      e.stopPropagation();
                      viewExperionChanges();
                    }}
                  >
                    Action Required
                  </div>
                )}
              </div>
              <div className="FormulaSetCard-card-footer-icons-img">
                {isFavoriteFlag ? (
                  <span
                    title="favorite"
                    onClick={(event) => {
                      event.stopPropagation();
                      favoriteHandle({ formulaSetId });
                    }}
                    className="icon icon-Favorite-selected"
                  />
                ) : (
                  <span
                    title="unfavorite"
                    onClick={(event) => {
                      event.stopPropagation();
                      favoriteHandle({ formulaSetId });
                    }}
                    className="icon icon-Favorite-unselected"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default withFormulaSetCardContext(FormulaSetCard);
