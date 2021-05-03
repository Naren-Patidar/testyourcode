/* eslint-disable consistent-return */
/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import { Button, Icon, Select } from '@scuf/common';
import { useHistory } from 'react-router-dom';
import { Permissions } from 'core/authentication';
import { PermissionValues } from 'core/authentication/models/user-permission';
import { AppRoutes } from 'routing/app.route-names';
import { errorHandler } from 'core/error';
import { FORMULASETS } from 'utils/constants/boterminology';
import { APP_SETTINGS_STATUS_MSG } from 'utils/constants/messages';
import { AppConstants } from 'utils';
import { lazyLoad } from 'utils/loadable';
import { useDialog } from 'shared/dialog';
import AlertPopup from '../AlertPopup';
import FormulaSetCard from './FormulaSetCard';
import './formulaset-list.scss';

const RecipePopupWrapper = lazyLoad(
  () => import('../RecipePopup'),
  (page) => page.RecipePopupWrapper
);
const AllFormulasSet = (props) => {
  const [showRecipePopup, hideRecipePopup] = useDialog(() => (
    <RecipePopupWrapper openModal onCloseModal={hideRecipePopup} />
  ));
  const history = useHistory();
  const [filterStr, setFilterStr] = useState('View all');
  const {
    formulaSetList,
    refreshForExperionModification,
    deleteFormulaSetById,
    uploadImageForFormulaSetById,
    deleteFormulaSetImageById,
    experionChangesMRList,
    getAppSettingsStatus,
    getFormulaSets,
  } = props;
  const [messageBoxItem, setMessageBoxItem] = useState('');
  const [open, setOpen] = useState(false);
  const itemsPerPage = 10;
  const [visibleItems, setVisibleItems] = useState(itemsPerPage);
  const fltrOptions = [
    { value: 'View all', text: 'View all' },
    { value: 'Favorites', text: 'Favorites' },
    { value: 'Draft', text: 'Draft' },
    { value: 'InReview', text: 'In Review' },
    { value: 'Approved', text: 'Approved' },
  ];
  const selectChangeHandler = (fltrItem) => {
    setFilterStr(fltrItem);
    setVisibleItems(itemsPerPage);
  };
  const onLoadMoreClick = () => {
    let items = visibleItems;
    items += itemsPerPage;
    setVisibleItems(items);
  };

  const onCreateNewClick = () => {
    getAppSettingsStatus().then((res) => {
      if (res.data) {
        showRecipePopup();
        // return history.push(AppRoutes.CREATE_FORMULASET.path);
      } else {
        // return history.push(APPLICATION_SETTINGS);
        setMessageBoxItem(APP_SETTINGS_STATUS_MSG);
        setOpen(!open);
      }
      // if (res.data == false) {
      // }
      //  else {
      //   setMessageBoxItem(res.message);
      //   setOpen(!open);
      // }
    });
  };

  const formulaListDt = formulaSetList.filter((item) => {
    if (filterStr === 'View all') {
      return item;
    }
    if (filterStr === 'Favorites') {
      return item.isFavorite === true;
    }
    if (filterStr === 'Draft') {
      return item.status === 0;
    }
    if (filterStr === 'InReview') {
      return item.status === 1;
    }
    if (filterStr === 'Approved') {
      return item.status === 2;
    }
    return item;
  });

  const onRefreshClick = async () => {
    await refreshForExperionModification().then((res) => {
      if (res && res.status && res.status !== 200) {
        setMessageBoxItem(res.message);
        setOpen(!open);
      }
    });
    await getFormulaSets().then((res) => {
      if (res && res.status && res.status !== 200) {
        setMessageBoxItem(res.message);
        setOpen(!open);
      }
    });
    return history.push(AppConstants.BASE_URL);
  };
  return (
    <div className="AllFormulasSet">
      <AlertPopup
        messageBoxItem={messageBoxItem}
        open={open}
        setOpen={setOpen}
      />
      <div>
        <div className="d-flex justify-content-between p-4 flex-wrap">
          <div className="d-flex">
            <div className="font-size-20 text-dark-400 text-semibold">
              {FORMULASETS}
            </div>
            <Permissions
              type="disable"
              allowed={[PermissionValues.CreateFormulaSetAndFormula]}
            >
              {({ authorized }) => (
                <Button
                  className="ml-4"
                  type="primary"
                  size="small"
                  content="Create new"
                  onClick={onCreateNewClick}
                  disabled={!authorized}
                  textTransform={false}
                />
              )}
            </Permissions>
          </div>
          <div className="d-flex align-items-center">
            <Select
              className="ProductCategory-favorites-right-button refresh-span"
              placeholder="View all"
              options={fltrOptions}
              onChange={(value) => selectChangeHandler(value)}
            />
            <Icon
              className="ml-4 mr-4 cursor-pointer"
              name="refresh"
              root="common"
              size="small"
              onClick={onRefreshClick}
            />
          </div>
        </div>

        <div className="d-flex flex-wrap px-4">
          {/* className="AllFormulasSet-list" */}
          {formulaListDt.slice(0, visibleItems).map((item, index) => {
            return (
              <FormulaSetCard
                key={`FormulasSet_${index}`}
                data={formulaListDt}
                item={item}
                isFavorite={item.isFavorite}
                formulaSetId={item.id}
                ProductTypName={item.name}
                name={item.name}
                totalProductsCount={item.formulaCount}
                recipeID={item.masterRecipeId}
                createdby={item.importedDt}
                mrName={item.masterRecipeName}
                updatedOn={item.updatedOn}
                imgSrc={item.imageFileName}
                states={item.status}
                deleteFormulaSetById={deleteFormulaSetById}
                uploadImageForFormulaSetById={uploadImageForFormulaSetById}
                deleteFormulaSetImageById={deleteFormulaSetImageById}
                experionChangesMRList={experionChangesMRList}
              />
            );
          })}
        </div>
        {formulaListDt?.length > itemsPerPage &&
          formulaListDt?.length > visibleItems && (
            <div className="d-flex justify-content-around flex-wrap">
              <Button
                className="ml-4 load-more"
                type="primary"
                size="medium"
                content="Load more"
                onClick={onLoadMoreClick}
                textTransform={false}
              />
            </div>
          )}
      </div>
    </div>
  );
};

export default AllFormulasSet;
