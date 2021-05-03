import { DataTable } from '@scuf/datatable';
import { Checkbox, Input, Icon, Tooltip, Card } from '@scuf/common';
import { debounce, round } from 'lodash';
import { FormulaParameter } from 'app/campaign/models/formula-parameter';
import { ColumnProps } from 'utils/datatable-column-props';
import { useCallback, useEffect, useState } from 'react';
import { RawMaterial } from 'app/campaign/models/raw-material';
import { ICellData } from '@scuf/datatable/dist/components/DataTable/IDataTableInterfaces';
import { useFormikContext } from 'formik';
import { Campaign } from 'app/campaign/models/campaign';
import { CampaignType } from 'app/campaign/models/campaign-type';

function descRenderer(cellData) {
  return (
    <Tooltip
      content={cellData.value}
      element={<span className="text-truncate">{cellData.value}</span>}
      position="top left"
      event="hover"
      hoverable
    />
  );
}

export const RawMaterialsList: React.FC<{
  data: FormulaParameter[];
  loading?: boolean;
  editable?: boolean;
  onEdit?: (cellData: ICellData) => void;
  onCellDataChange?: (dataItem: FormulaParameter) => void;
  onRawMaterialSelection?: (e: {
    data: FormulaParameter;
    index: number;
  }) => void;
}> = ({
  data,
  loading,
  editable,
  onEdit,
  onCellDataChange,
  onRawMaterialSelection,
}) => {
  const [localData, setLocaldata] = useState<FormulaParameter[]>([]);
  const [showName, setShowName] = useState(false);
  const {
    values: { campaignType },
  } = useFormikContext<Campaign>();
  useEffect(() => {
    setLocaldata(data);
  }, [data]);

  // const editData = useCallback(
  //   (newVal, cellData) => {
  //     // const dataItem = { ...data[cellData.rowIndex] };
  //     // dataItem[cellData.field] = newVal;
  //     // if (onCellDataChange !== undefined) {
  //     //   onCellDataChange(dataItem);
  //     // }

  //     const filteredDataCopy = [...localData];
  //     const dataItem = filteredDataCopy.find(
  //       (f) => f.id === cellData.rowData.id
  //     );

  //     if (dataItem) {
  //       const localItem = { ...dataItem };
  //       localItem[cellData.field] = newVal;

  //       if (onCellDataChange) {
  //         onCellDataChange(localItem);
  //       }
  //     }
  //   },
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  //   [localData]
  // );
  function totalQtyRenderer(cellData) {
    // return cellData.rowData?.editable ? (
    //   <Input
    //     value={cellData.value}
    //     onChange={(val) => editData(val, cellData)}
    //     className="xs-input"
    //   />
    // ) : (
    //   <span>{cellData.value}</span>
    // );
    return (
      <span>{cellData.value ? round(cellData.value, 2) : cellData.value}</span>
    );
  }
  const getColumnDefs = () => {
    const cols = [
      {
        field: showName ? 'name' : 'description',
        header: showName ? 'Name' : 'Description',
        renderer: descRenderer,
        align: 'left',
        initialWidth: '200px',
      },
      {
        field: 'defaultValue',
        header: 'Qty / Batch',
        align: 'right',
        initialWidth: '100px',
      },
      {
        field: 'totalQuantityForCampaign',
        header: 'Total Qty for campaign',
        renderer: totalQtyRenderer,
        align: 'right',
        initialWidth: '100px',
      },
      {
        field: 'engUnit',
        header: 'Eng Unit',
        align: 'center',
        initialWidth: '100px',
      },
    ] as ColumnProps[];
    if (editable || campaignType === CampaignType.ContinuousCampaign) {
      return cols.filter((f) => f.field !== 'totalQuantityForCampaign');
    }
    return cols;
  };
  const columnDefs = getColumnDefs();

  return (
    <Card>
      <Card.Content style={{ background: '#272727' }}>
        <DataTable
          data={localData}
          loading={loading}
          resizableColumns
          scrollable
          scrollHeight="250px"
          rows={10}
          // onCellClick={onEdit}
          onRowClick={onRawMaterialSelection}
          search
          searchPlaceholder="Search raw materials"
        >
          <DataTable.HeaderBar>
            <DataTable.HeaderBar.Item
              content=""
              className="d-flex align-items-center mt-2"
              icon={
                <Checkbox
                  label="Show parameter name"
                  toggle
                  onChange={setShowName}
                  className="mb-0"
                />
              }
            />
          </DataTable.HeaderBar>
          {columnDefs.map((col) => (
            <DataTable.Column
              key={col.field}
              field={col.field}
              header={col.header}
              renderer={col.renderer}
              align={col.align}
              initialWidth={col.initialWidth}
              sortable
            />
          ))}
          <DataTable.Pagination
            itemsPerPage={10}
            totalItems={0}
            showDisplayDetails
            showNav
            expandEllipsis
          />
        </DataTable>
      </Card.Content>
    </Card>
  );
};
