/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-return-assign */
/* eslint-disable no-continue */

import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from '@scuf/datatable';
import axios from 'axios';
import './Recipes.scss';
import { API_URL, FM_URL } from 'utils/Settings';
import { getCookie } from 'utils/utility';
import { errorHandler } from 'core/error';
import { toastr } from 'shared/toastr';
import AlertPopup from '../AlertPopup';

const xsrfToken = getCookie('X-XSRF-TOKEN');
const axiosClient = axios.create({
  headers: {
    'content-type': 'application/json',
    'X-XSRF-TOKEN': xsrfToken,
  },
  withCredentials: true,
});
function Recipes(props) {
  const [rows, setRows] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [selectedChanged, setSelectedChanged] = useState(false);
  const refSelected = useRef(null);
  const [messageBoxItem, setMessageBoxItem] = useState('');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (selectedChanged) {
      const tableRows = document.getElementsByClassName('p-datatable-row');
      for (let i = 0; i < tableRows.length; i += 1) {
        const parentDiv =
          tableRows[i].parentElement.parentElement.parentElement.parentElement
            .parentElement.parentElement.parentElement.parentElement;
        if (parentDiv.classList[0] !== 'card-table-MRList') {
          continue;
        }
        const child = tableRows[i].children[0].children[0].children[0];
        if (child.classList[1] === 'selected') {
          tableRows[i].classList.add('selected-row');
        } else {
          tableRows[i].classList.remove('selected-row');
        }
      }
      setSelectedChanged(false);
    }
  }, [selectedChanged]);

  useEffect(() => {
    if (props.search.length > 0) {
      const data = [];
      for (let i = 0; i < rows.length; i += 1) {
        if (
          rows[i].recipeName.toLowerCase().includes(props.search.toLowerCase())
        ) {
          data.push(rows[i]);
        }
      }
      setFilterData(data);
    } else {
      setFilterData([]);
    }
    // eslint-disable-next-line
  }, [props.search]);

  useEffect(() => {
    let data = [];
    let recipesList = [];

    async function getRecipesList() {
      try {
        await axiosClient
          .get(`${FM_URL}GetFormulaSetRecipies`)
          .then((response) => {
            if (response.status === 200) {
              recipesList = response.data;
              return response.data;
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
    }

    async function fetchData() {
      setRows([]);
      try {
        await axiosClient
          .get(`${FM_URL}GetMasterRecipies`)
          .then((response) => {
            if (response.status === 200) {
              data = response.data;
              return response.data;
            }
            throw errorHandler(response);
          })
          // .then((json) => {
          //   data = json.slice(0);
          // })
          .catch((err) => {
            if (err && err.response.status && err.response.status === 503) {
              toastr.banner('Service Unavailable', err.response.data, 'error');
              // setMessageBoxItem(err.response.data);
              // setOpen(!open);
            }
          });
      } catch (ex) {
        errorHandler();
      }

      const tableData = [];
      let count = 0;
      for (let i = 0; i < data.length; i += 1) {
        // let done = false
        for (let j = 0; j < recipesList.length; j += 1) {
          if (data[i].recipeName === recipesList[j]) {
            // done = true
            break;
          }
        }
        // if (done) {
        //   continue
        // }

        count += 1;
        tableData.push({
          selected: count,
          recipeName: data[i].recipeName,
          description: data[i].description,
          // template: data[i].templateName,
          version: data[i].version,
          proceduralLevel: data[i].proceduralLevel,
          // createdby: data[i].createdby,
          publicName: data[i].publicName,
          clusterName: data[i].clusterName,
          parentAsset: data[i].parentAsset,
          pntbldDate: data[i].pntbldDate,
          dataBlockName: data[i].dataBlockName,
          dataBlockTypeID: data[i].dataBlockTypeID,
          numOfFormulaParameter: data[i].numOfFormulaParameter,
          baseName: data[i].baseName,
          currentVersion: data[i].currentVersion,
        });
      }
      setRows(tableData);
      setFilterData(tableData);
    }

    if (props.showRecipes) {
      getRecipesList();
      fetchData();
      props.setShowRecipes(false);
    }
    // eslint-disable-next-line
  }, [props.showRecipes]);

  function renderRadio(cellData) {
    let className = 'table-radio unselected';
    let ref = null;
    if (cellData.value === props.selection) {
      className = 'table-radio selected';
      ref = refSelected;
    }
    return (
      <div
        ref={ref}
        className={className}
        onClick={() => {
          props.setSelection(cellData.value);
          const select = [];
          select.push(rows[cellData.value - 1]);
          props.setSelectedRecipe(select);
          setSelectedChanged(true);
        }}
      >
        <div className="inner" />
      </div>
    );
  }

  return (
    <div className="card-table-MRList">
      <AlertPopup
        messageBoxItem={messageBoxItem}
        open={open}
        setOpen={setOpen}
      />
      <DataTable
        loading={rows.length <= 0}
        data={props.search.length > 0 ? filterData : rows}
        scrollable
        scrollHeight="35vh"
        scrollWidth="100%"
        columnResizeMode="expand"
      >
        <DataTable.Column
          field="selected"
          header=""
          initialWidth="2.667rem"
          renderer={renderRadio}
          className="selector"
        />
        <DataTable.Column field="recipeName" header="Recipe Name" sortable />
        <DataTable.Column field="description" header="Description" sortable />
      </DataTable>
    </div>
  );
}
export default Recipes;
