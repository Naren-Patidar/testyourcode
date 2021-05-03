import { useEffect, useState } from 'react';
import { Card, Button, Popup, Icon, InputLabel } from '@scuf/common';
import { FormulaParameter } from 'app/campaign/models/formula-parameter';
import isNumeric from 'validator/es/lib/isNumeric';
import { RawMaterialsList } from '../../components/RawMaterialsList/RawMaterialsList';
import { useCampaignFacade } from '+store/campaign';

export const RawMaterialSelection: React.FC<{
  onHideRawMaterials: () => void;
}> = ({ onHideRawMaterials }) => {
  const {
    loading,
    payloadForBatch,
    fetchRawMaterials,
    setSearchTextRawMaterials,
    markEditableRawMaterial,
    updateRawMaterial,
    rawMaterials,
    selectedRawMaterial,
    setSelectedRawMaterial,
  } = useCampaignFacade();
  const [rawMaterialSelectionError, setRawMaterialSelectionError] = useState(
    ''
  );
  useEffect(() => {
    if (payloadForBatch) {
      fetchRawMaterials(payloadForBatch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [payloadForBatch]);
  // const editHandler = (dataItem: FormulaParameter) => {
  //   const editableData = { ...dataItem };
  //   editableData.editable = true;
  //   markEditableRawMaterial(editableData);
  // };
  // const cellDataChangeHandler = (dataItem: FormulaParameter) => {
  //   updateRawMaterial(dataItem);
  // };
  return (
    <>
      <div className="d-flex">
        <Button
          actionType="button"
          content="Back"
          icon={
            <Icon
              name="caret-left"
              root="common"
              size="small"
              color="primary"
            />
          }
          iconPosition="left"
          size="small"
          textTransform={false}
          type="link"
          onClick={onHideRawMaterials}
        />
      </div>
      <Card className="m-0 mr-4 p-2 shadow-none">
        <Card.Content className="border">
          <div className="m-4 p-0">
            <div>Select raw material below</div>
            {rawMaterialSelectionError && (
              <div className="text-danger">{rawMaterialSelectionError}</div>
            )}
            <RawMaterialsList
              data={rawMaterials}
              loading={loading}
              editable
              // onEdit={(cellData) => editHandler(cellData.rowData)}
              // onCellDataChange={cellDataChangeHandler}
              onRawMaterialSelection={({ data }) => {
                if (isNumeric(data.defaultValue) && +data.defaultValue > 0) {
                  setSelectedRawMaterial(data);
                  setRawMaterialSelectionError('');
                  onHideRawMaterials();
                } else {
                  setRawMaterialSelectionError(
                    `Raw material: ${data.description} can't be selected as qty / batch is not valid.`
                  );
                }
              }}
            />
          </div>
        </Card.Content>
      </Card>
    </>
  );
};
