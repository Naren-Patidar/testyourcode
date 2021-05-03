import { DataTable } from '@scuf/datatable';
import { Icon } from '@scuf/common';
import { ColumnProps } from 'utils/datatable-column-props';

export interface DatatableProps {
  search?: boolean;
  refresh?: boolean;
  pagination?: boolean;
  searchPlaceholder?: string;
  reorderableColumns?: boolean;
  data: any;
  loading?: boolean;
  scrollHeight?: string;
  scrollWidth?: string;
  columns: ColumnProps[];
  onRowClick?: (e: { data: any; index: number }) => void;
  onRefresh?: () => void;
}
export const Datatable: React.FC<DatatableProps> = ({
  columns,
  data,
  loading,
  pagination,
  scrollHeight,
  scrollWidth,
  search,
  refresh,
  searchPlaceholder,
  reorderableColumns,
  onRowClick,
  onRefresh,
}) => {
  return (
    <div className="w-100">
      <DataTable
        data={data}
        loading={loading}
        resizableColumns
        reorderableColumns={reorderableColumns}
        scrollable
        scrollHeight={scrollHeight}
        rows={10}
        onRowClick={onRowClick}
        scrollWidth="100%"
        search={search}
        searchPlaceholder={searchPlaceholder}
        columnResizeMode="fit"
      >
        {refresh && (
          <DataTable.HeaderBar>
            <DataTable.HeaderBar.Item
              content=""
              className="d-flex align-items-center"
              icon={<Icon name="refresh" root="common" size="small" />}
              onClick={onRefresh}
            />
          </DataTable.HeaderBar>
        )}

        {columns.map((col) => (
          <DataTable.Column
            key={col.field}
            field={col.field}
            header={col.header}
            renderer={col.renderer}
            align={col.align}
            initialWidth={col.initialWidth}
            sortable={col.sortable}
            placeholder={col.placeholder}
          />
        ))}
        {pagination ? (
          <DataTable.Pagination
            itemsPerPage={10}
            totalItems={0}
            showDisplayDetails
            showNav
            expandEllipsis
          />
        ) : null}
      </DataTable>
    </div>
  );
};
