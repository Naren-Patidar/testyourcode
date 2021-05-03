import { useEffect, useState } from 'react';
import { Tooltip, Card, Icon } from '@scuf/common';
import { DataTable } from '@scuf/datatable';
import { ColumnProps } from 'utils/datatable-column-props';
import { MRFormulaSet } from '../../models/recipe-formula-set';

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
export const RecipeFormulaSetList: React.FC<{
  data: MRFormulaSet[];
  loading?: boolean;
  onSelection?: (e: { data: any; index: number }) => void;
  onRefresh: () => void;
}> = ({ data, loading, onSelection, onRefresh }) => {
  const [localData, setLocaldata] = useState<MRFormulaSet[]>([]);
  useEffect(() => {
    setLocaldata(data);
  }, [data]);
  const getColumnDefs = () => {
    const cols = [
      {
        field: 'recipeName',
        header: 'Recipe name',
        align: 'left',
        initialWidth: '150px',
      },
      {
        field: 'name',
        header: 'Formula set',
        align: 'left',
        initialWidth: '150px',
      },
      {
        field: 'description',
        header: 'Recipe description',
        align: 'left',
        renderer: descRenderer,
        initialWidth: '200px',
      },
    ] as ColumnProps[];

    return cols;
  };
  const columnDefs = getColumnDefs();
  return (
    <Card>
      <Card.Content>
        <DataTable
          data={localData}
          loading={loading}
          resizableColumns
          scrollable
          scrollHeight="250px"
          rows={50}
          onRowClick={onSelection}
          search
          searchPlaceholder="Search recipe/formula set"
        >
          <DataTable.HeaderBar>
            <DataTable.HeaderBar.Item
              content=""
              className="d-flex align-items-center"
              icon={<Icon name="refresh" root="common" size="small" />}
              onClick={onRefresh}
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
            itemsPerPage={50}
            totalItems={0}
            expandEllipsis
            showDisplayDetails
            showNav
          />
        </DataTable>
      </Card.Content>
    </Card>
  );
};
