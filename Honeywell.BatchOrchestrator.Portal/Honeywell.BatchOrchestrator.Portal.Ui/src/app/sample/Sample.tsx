import { Button, Modal, Checkbox } from '@scuf/common';
import { DataTable } from '@scuf/datatable';
import { ErrorBoundaryContainer } from 'core/error/ErrorBoundary';
import { useCallback, useState } from 'react';
import { useConfirm } from 'shared/confirm-dialog';
import { useDialog } from 'shared/dialog';
import { toastr } from 'shared/toastr';
import { EditCampaignView } from '../campaign/containers/EditCampaignView/EditCampaignView';
import { FormikSample } from './FormikStepperSample';
import { BasicExample } from './SimpeFormikForm';

const Bomb: React.FC<{ subject: any | null }> = ({ subject }) => {
  return <div>Hello {subject.toUpperCase()}</div>;
};
export const SamplePage: React.FC = () => {
  const confirm = useConfirm();
  const [openCampaign, setOpenCampaign] = useState(false);
  const [isDialogOpen, setShowDialog] = useState(false);
  const [showModal, hideModal] = useDialog(() => (
    <EditCampaignView open closeCampaignView={hideModal} />
  ));
  const [tempData, setData] = useState([
    { pilot: 'Aron Davis', status: undefined, flights: 0 },
    { pilot: 'Garven Dresis', status: 'Active', flights: 10 },
    { pilot: 'David JP', status: 'Active', flights: 9 },
  ]);
  const [explode, setExplode] = useState(false);

  // const [showDialog, hideDialog] = useDialog(
  //   ({ open }) => (
  //     <Modal open={open}>
  //       <h1>Hello World</h1>
  //     </Modal>
  //   ),
  //   {
  //     size: 'large',
  //   }
  // );
  const showConfirm = async () => {
    const isConfirmed = await confirm.show();
    if (isConfirmed) {
      // eslint-disable-next-line no-console
      console.log('Confirmed');
    } else {
      // eslint-disable-next-line no-console
      console.log('Not Confirmed');
    }
  };
  const showDialog = useCallback(() => {
    setShowDialog(!isDialogOpen);
  }, [isDialogOpen]);
  const showToast = useCallback(() => {
    toastr.banner('Error', 'Something went wrong', 'error');
  }, []);
  function editData(newVal, cellData) {
    const newData = [...tempData];
    const status = newVal ? 'Active' : 'Retired';
    newData[cellData.rowIndex].status = status;
    setData(newData);
  }
  function statusEditRenderer(cellData) {
    const active = cellData.value !== 'Retired';
    return (
      <div className="ui-cell-data">
        <Checkbox
          className="cell-edit-checkbox"
          label="Still Active"
          checked={active}
          onChange={(checked) => editData(checked, cellData)}
        />
      </div>
    );
  }
  return (
    <>
      {/* <Button
        type="primary"
        size="small"
        content="Show Confirm"
        onClick={showConfirm}
      />
      <Button
        type="primary"
        size="small"
        content="Show Dialog"
        onClick={showDialog}
      /> */}

      <Button
        type="primary"
        size="small"
        content="Open Create Campaign"
        onClick={showModal}
      />
      <Button
        type="primary"
        size="small"
        content="Show Toastr"
        onClick={showToast}
        className="ml-4"
      />
      <Button
        type="primary"
        size="small"
        content="toggle explode"
        onClick={() => setExplode((e) => !e)}
        className="ml-4"
      />
      <ErrorBoundaryContainer>
        {explode ? <Bomb subject={null} /> : null}
      </ErrorBoundaryContainer>

      <DataTable
        data={tempData}
        onEdit={(newData, cellData) => editData(newData, cellData)}
      >
        <DataTable.Column field="pilot" header="Pilot" />
        <DataTable.Column
          field="status"
          header="Status"
          // eslint-disable-next-line react/jsx-boolean-value
          editable={true}
          customEditRenderer={(cellData) => statusEditRenderer(cellData)}
        />
      </DataTable>
      {/* <FormikSample /> */}
      {/* <BasicExample /> */}
    </>
  );
};
