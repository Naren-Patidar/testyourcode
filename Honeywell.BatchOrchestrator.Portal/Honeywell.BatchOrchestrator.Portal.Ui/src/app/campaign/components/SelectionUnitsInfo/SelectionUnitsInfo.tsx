/* eslint-disable import/named */
import { Grid } from '@scuf/common';
import { unitSelectionTypeVals } from 'app/campaign/models/campaign-unit-selection';
import { Campaign } from '../../models/campaign';
import { SelectionUnitsFormModelType } from '../../models/campaignFormModel';

const { Row, Column } = Grid;
export const SelectionUnitsInfo: React.FC<{
  formModel: SelectionUnitsFormModelType;
  data: Campaign;
}> = ({ formModel, data }) => {
  return (
    <>
      <Row>
        <Column sWidth={4} xsWidth={4} className="px-2">
          {formModel.isUnitSelectionDeferred.label}
        </Column>
        <Column sWidth={8} xsWidth={8} className="px-2">
          {
            unitSelectionTypeVals.find(
              (f) => f.value === data.isUnitSelectionDeferred
            )?.text
          }
        </Column>
      </Row>
    </>
  );
};
