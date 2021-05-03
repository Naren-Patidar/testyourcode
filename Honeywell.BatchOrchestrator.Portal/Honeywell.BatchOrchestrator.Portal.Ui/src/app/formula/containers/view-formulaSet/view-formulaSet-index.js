/* eslint-disable react/jsx-boolean-value */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-else-return */
/* eslint-disable prefer-template */
/* eslint-disable no-self-assign */
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { AppRoutes } from 'routing';
import { getCookie } from 'utils/utility';
import AlertPopup from '../AlertPopup';
import { API_URL, FM_URL } from '../../../../utils/Settings';
// import { BASE_ROUTE } from '../../../../utils/constants/routes';
import { errorHandler } from '../../../../core/error';
import ViewFormulaSet from './view-formulaSet';

const xsrfToken = getCookie('X-XSRF-TOKEN');
const axiosClient = axios.create({
  headers: {
    'content-type': 'application/json',
    'X-XSRF-TOKEN': xsrfToken,
  },
  withCredentials: true,
});
const ViewFormulaSetIndex = (props) => {
  const [productMR, setProductMR] = useState({});
  const [showViewFormulaSet, setShowViewFormulaSet] = useState(false);
  const [showFormulaSets, setShowFormulaSets] = useState(false);
  const [allowEditPost, setAllowEditPost] = useState(false);
  const [editData, setEditData] = useState([]);
  const [submitForApproval, setSubmitForApproval] = useState(false);
  const [submitterComment, setSubmitterComment] = useState(null);
  const [approverComment, setApproverComment] = useState(null);
  const [submitterFormulaComment, setSubmitterFormulaComment] = useState(null);
  const [approverFormulaComment, setApproverFormulaComment] = useState(null);
  const [alloweditFormulaDataPost, setAllowEditFormulaDataPost] = useState(
    false
  );
  const [messageBoxItem, setMessageBoxItem] = useState('');
  const [open, setOpen] = useState(false);
  const url = API_URL;
  const history = useHistory();
  useEffect(() => {
    async function postEditedData() {
      const item = JSON.parse(JSON.stringify(editData[0]));
      item.importedDt = new Date();
      item.comment = submitterComment;
      item.submitterComment = submitterComment;
      item.approverComment = approverComment;
      item.imageFileName = item.imageFileName;

      if (submitForApproval) {
        item.status = 1;
      } else {
        item.status = 0;
      }

      try {
        await axiosClient
          .put(`${FM_URL}UpdateFormulaSet/${item.id}`, item)
          .then((response) => {
            if (response.status === 200) {
              return response;
            } else {
              throw errorHandler(response);
            }
          })
          .catch((err) => {
            if (err && err.status && err.status !== 200) {
              setMessageBoxItem(err.message);
              setOpen(!open);
            }
          });
        history.push(AppRoutes.DEFAULT.path);
      } catch (ex) {
        errorHandler();
      }
    }

    if (allowEditPost) {
      postEditedData();
      setAllowEditPost(false);
      setSubmitForApproval(false);
      setAllowEditFormulaDataPost(false);
    }
  }, [editData, setAllowEditPost, allowEditPost]);

  return (
    <div>
      <AlertPopup
        messageBoxItem={messageBoxItem}
        open={open}
        setOpen={setOpen}
      ></AlertPopup>
      <ViewFormulaSet
        showViewFormulaSet={true}
        productMR={productMR}
        setShowViewFormulaSet={setShowViewFormulaSet}
        setShowFormulaSets={setShowFormulaSets}
        setAllowEditPost={setAllowEditPost}
        setEditData={setEditData}
        url={url}
        setSubmitForApproval={setSubmitForApproval}
        submitterComment={submitterComment}
        setSubmitterComment={setSubmitterComment}
        approverComment={approverComment}
        setApproverComment={setApproverComment}
        setSubmitterFormulaComment={setSubmitterFormulaComment}
        setApproverFormulaComment={setApproverFormulaComment}
      />
    </div>
  );
};

export default ViewFormulaSetIndex;
