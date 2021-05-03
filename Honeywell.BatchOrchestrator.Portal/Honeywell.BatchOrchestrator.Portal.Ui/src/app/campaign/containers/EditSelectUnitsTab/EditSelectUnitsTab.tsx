/* eslint-disable react-hooks/exhaustive-deps */
import { Campaign } from 'app/campaign/models/campaign';
import { useFormikContext } from 'formik';
import { useEffect } from 'react';
import { lazyLoad } from 'utils/loadable';
import { CampaignUnitSelection } from 'app/campaign/models/campaign-unit-selection';
import { BatchStartMethod } from 'app/campaign/models/campaign-start-method';
import { PayloadForBatch } from 'app/campaign/models/batch-size';
import { useCampaignFacade } from '+store/campaign';
import { SelectUnitsForm } from '../../components';
import {
  campaignFormModel,
  CampaignFormModelType,
} from '../../models/campaignFormModel';

export const EditSelectUnits: React.FC = () => {
  const { unitSelectionFormField } = campaignFormModel;
  const {
    campaignFieldDisabled,
    selectionUnitsEdited,
    setSelectionUnitsEdited,
  } = useCampaignFacade();
  const {
    values: {
      isUnitSelectionDeferred: unitSelectionDeferred,
      campaignUnitSelection: campaignUnitSelectionValues,
      simultaneousBatches,
      batchStartMethod,
      recipeName,
    },
    setFieldValue,
  } = useFormikContext<Campaign>();

  const unitSelectionChangeHandler = (val) => {
    if (!selectionUnitsEdited) {
      setSelectionUnitsEdited(true);
    }
  };
  return (
    <SelectUnitsForm
      formModel={unitSelectionFormField}
      selectionUnits={campaignUnitSelectionValues}
      unitSelectionDeferred={unitSelectionDeferred}
      simultaneousBatches={simultaneousBatches}
      fieldDisabled={campaignFieldDisabled}
      batchStartMethod={batchStartMethod}
      onUnitSelectionChange={unitSelectionChangeHandler}
    />
  );
};
export const EditSelectUnitsTab = lazyLoad(
  () => import('./EditSelectUnitsTab'),
  (page) => page.EditSelectUnits
);
