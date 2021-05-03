/* eslint-disable react/jsx-boolean-value */
/* eslint-disable react/self-closing-comp */
/* eslint-disable no-else-return */
/* eslint-disable prefer-template */
/* eslint-disable prefer-const */
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { AppRoutes } from 'routing';
import { getCookie } from 'utils/utility';
import AlertPopup from '../AlertPopup';
import { API_URL, FM_URL } from '../../../../utils/Settings';
// import { BASE_ROUTE } from '../../../../utils/constants/routes';
import { errorHandler } from '../../../../core/error';
import FormulaSet from './create-formulaSet';

const xsrfToken = getCookie('X-XSRF-TOKEN');
const axiosClient = axios.create({
  headers: {
    'content-type': 'application/json',
    'X-XSRF-TOKEN': xsrfToken,
  },
  withCredentials: true,
});
const CreateFormulaSetIndex = (props) => {
  const history = useHistory();
  const [productName, setProductName] = useState('');
  const [strategyID, setStrategyID] = useState(null);
  const [recipeName, setRecipeName] = useState('');
  const [saveData, setSaveData] = useState([]);
  const [imported, setImported] = useState(false);
  const [comment, setComment] = useState('');
  const [submitterComment, setSubmitterComment] = useState(null);
  const [submitForApproval, setSubmitForApproval] = useState(false);
  const [allowPost, setAllowPost] = useState(false);
  const [showFormulaSets, setShowFormulaSets] = useState(false);
  const [showFormulaSet, setShowFormulaSet] = useState(false);
  const [messageBoxItem, setMessageBoxItem] = useState('');
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState([]);
  const url = API_URL;

  useEffect(() => {
    async function postData() {
      let item = JSON.parse(JSON.stringify(saveData[saveData.length - 1]));
      item.importedDt = new Date();
      item.comment = submitterComment;
      item.submitterComment = submitterComment;

      if (submitForApproval) {
        item.status = 1;
      } else {
        item.status = 0;
      }
      try {
        await axiosClient
          .post(FM_URL + 'CreateFormulaSet', item)
          .then((response) => {
            // if (!response.ok) {
            //   if (response.status == 500)
            //   {
            //     //alert('Duplicate formula-set Names')
            //     setMessageBoxItem("Duplicate formula-set Names")
            //     setOpen(!open)
            //   }
            //   history.push(BASE_ROUTE)
            //   throw Error(response.status)
            // }
            if (response.status === 200) {
              setSubmitterComment(null);
              history.push(AppRoutes.DEFAULT.path);
              return response.json();
            } else {
              throw errorHandler(response);
            }
          })
          .catch((err) => {
            if (err && err.response.status && err.response.status === 409) {
              setMessageBoxItem(err.response.data);
              setOpen(!open);
            }

            // history.push(AppRoutes.DEFAULT.path);
          });
      } catch (ex) {
        errorHandler();
      }
    }

    if (allowPost) {
      postData();
      setShowFormulaSet(false);
      setShowFormulaSets(true);
      setAllowPost(false);
      setSubmitForApproval(false);
    }

    // eslint-disable-next-line
  }, [allowPost, editData, saveData, setAllowPost]);

  return (
    <div>
      <AlertPopup
        messageBoxItem={messageBoxItem}
        open={open}
        setOpen={setOpen}
      ></AlertPopup>

      <FormulaSet
        showFormulaSet={true}
        productName={productName}
        strategyID={strategyID}
        setAllowPost={setAllowPost}
        setShowFormulaSet={setShowFormulaSet}
        recipeName={recipeName}
        imported={imported}
        setImported={setImported}
        saveData={saveData}
        setSaveData={setSaveData}
        setRecipeName={setRecipeName}
        setStrategyID={setStrategyID}
        setProductName={setProductName}
        setComment={setComment}
        url={url}
        setSubmitForApproval={setSubmitForApproval}
        submitterComment={submitterComment}
        setSubmitterComment={setSubmitterComment}
      />
    </div>
  );
};
export default CreateFormulaSetIndex;
