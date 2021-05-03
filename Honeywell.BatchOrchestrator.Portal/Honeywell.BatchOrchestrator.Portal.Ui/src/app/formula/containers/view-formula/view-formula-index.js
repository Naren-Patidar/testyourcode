/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { AppRoutes } from 'routing';
import { getCookie } from 'utils/utility';
import AlertPopup from '../AlertPopup';
import { API_URL, FM_URL } from '../../../../utils/Settings';
// import { BASE_ROUTE } from '../../../../utils/constants/routes';
import ViewFormula from './ViewFormula';
import { errorHandler } from '../../../../core/error';

const xsrfToken = getCookie('X-XSRF-TOKEN');
const axiosClient = axios.create({
  headers: {
    'content-type': 'application/json',
    'X-XSRF-TOKEN': xsrfToken,
  },
  withCredentials: true,
});
const ViewFormulaIndex = (props) => {
  // const [showCreateFormulaSet, setShowCreateFormulaSet] = useState(false);
  // const [showFormulaSet, setShowFormulaSet] = useState(false);
  // const [showFormulaSets, setShowFormulaSets] = useState(false);
  const [showCreateProduct, setShowCreateProduct] = useState(false);
  // const [showFormulas, setShowFormulas] = useState(false);
  const [showCreateSimilarFormula, setShowCreateSimilarFormula] = useState(
    false
  );
  const [showModifyFormula, setShowModifyFormula] = useState(false);
  const [showViewFormula, setShowViewFormula] = useState(false);
  const [alloweditFormulaDataPost, setAllowEditFormulaDataPost] = useState(
    false
  );

  // const [showViewFormulaSet, setShowViewFormulaSet] = useState(false);

  const [editFormulaData, setEditFormulaData] = useState([]);
  const [submitterFormulaComment, setSubmitterFormulaComment] = useState(null);
  const [approverFormulaComment, setApproverFormulaComment] = useState(null);
  const [submitForFormulaApproval, setSubmitForFormulaApproval] = useState(
    false
  );
  const [messageBoxItem, setMessageBoxItem] = useState('');
  const [open, setOpen] = useState(false);

  const [productMR, setProductMR] = useState({});
  const [product, setProduct] = useState({});
  const [comment, setComment] = useState('');
  const [productNeedToBeSave, setProductNeedToBeSave] = useState(false);
  const history = useHistory();
  useEffect(() => {
    async function postEditedFormulaData() {
      const item = JSON.parse(JSON.stringify(editFormulaData[0]));
      item.importedDt = new Date();
      item.comment = submitterFormulaComment;
      item.submitterComment = submitterFormulaComment;
      item.approverComment = approverFormulaComment;
      if (submitForFormulaApproval) {
        item.status = 1;
      } else {
        item.status = 0;
      }

      try {
        await axiosClient
          .put(`${FM_URL}UpdateFormula/${item.id}`, item)
          .then((response) => {
            if (response.status === 200) {
              return response;
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

      try {
        await axiosClient
          .put(`${FM_URL}UpdateFormula2/${item.id}`, item)
          .then((response) => {
            if (response.status === 200) {
              return response.json();
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
      history.push(AppRoutes.DEFAULT.path);
    }
    if (productNeedToBeSave) {
      postEditedFormulaData();
      setAllowEditFormulaDataPost(false);
      setProductNeedToBeSave(false);
    }
  }, [productNeedToBeSave]);
  console.log('productNeedToBeSave', productNeedToBeSave);
  console.log('editFormulaData', editFormulaData);

  return (
    <div>
      <AlertPopup
        messageBoxItem={messageBoxItem}
        open={open}
        setOpen={setOpen}
      />
      <ViewFormula
        showViewFormula
        setShowViewFormula={props.setShowViewFormula}
        setShowFormulas={props.setShowFormulas}
        productMR={productMR}
        product={product}
        setEditFormulaData={setEditFormulaData}
        setAllowEditFormulaDataPost={setAllowEditFormulaDataPost}
        setShowCreateProduct={props.setShowCreateProduct}
        setShowFormulaSets={props.setShowViewFormulaSet}
        setComment={props.setComment}
        setSubmitForFormulaApproval={setSubmitForFormulaApproval}
        submitterFormulaComment={submitterFormulaComment}
        approverFormulaComment={approverFormulaComment}
        setSubmitterFormulaComment={setSubmitterFormulaComment}
        setApproverFormulaComment={setApproverFormulaComment}
        setProductNeedToBeSave={setProductNeedToBeSave}
        productNeedToBeSave={productNeedToBeSave}
      />
    </div>
  );
};
export default ViewFormulaIndex;
