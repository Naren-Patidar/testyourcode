import { useEffect, useState } from 'react';
import { Tab } from '@scuf/common';
import { useFormikContext } from 'formik';
import { Campaign } from 'app/campaign/models/campaign';
import { campaignFormModel } from 'app/campaign/models/campaignFormModel';
import { BatchStartMethod } from 'app/campaign/models/campaign-start-method';
import { CampaignUnitSelection } from 'app/campaign/models/campaign-unit-selection';
import { PayloadForBatch } from 'app/campaign/models/batch-size';
import { FormulaParametersTab } from '../FormulaParametersTab/FormulaParametersTab';
import { RawMaterialsTab } from '../RawMaterialsTab/RawMaterialsTab';
import { EditSelectUnitsTab } from '../EditSelectUnitsTab/EditSelectUnitsTab';
import { useCampaignFacade } from '+store/campaign';

export const EditResourceManagement: React.FC = () => {
  const { unitSelectionFormField } = campaignFormModel;
  const {
    selectionUnits,
    payloadForBatch,
    campaignFieldDisabled,
    selectionUnitsEdited,
    campaign,
    mode,
    actionState,
    fetchSelectionUnits,
    setSelectionUnitsEdited,
    setDisableNext,
    setDisableSave,
  } = useCampaignFacade();
  const {
    values: {
      isRecipeBased,
      isUnitSelectionDeferred: unitSelectionDeferred,
      campaignUnitSelection: campaignUnitSelectionValues,
      simultaneousBatches,
      batchStartMethod,
      recipeName,
    },
    setFieldValue,
  } = useFormikContext<Campaign>();
  const [selectedTab, setSelectedTab] = useState<number | null>(null);
  const [errorInUnits, setErrorInUnits] = useState<number | null>(null);
  useEffect(() => {
    setSelectedTab(isRecipeBased ? 1 : 0);
  }, [isRecipeBased]);

  /**
   * When batch start method = Automatic start then preselect unit option should be selected
   */
  useEffect(() => {
    if (batchStartMethod === BatchStartMethod.AutomaticStart) {
      setFieldValue(unitSelectionFormField.isUnitSelectionDeferred.name, false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [batchStartMethod]);
  useEffect(() => {
    if (+simultaneousBatches > 1) {
      setFieldValue(unitSelectionFormField.isUnitSelectionDeferred.name, true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [simultaneousBatches]);
  /**
   * if preselect unit is selected then fetch selection units from API
   */
  useEffect(() => {
    if (
      selectionUnitsEdited ||
      actionState === 'loading' ||
      actionState === 'error'
    ) {
      return;
    }
    if (!unitSelectionDeferred && payloadForBatch?.recipeName) {
      const payload: PayloadForBatch = {
        ...payloadForBatch,
        id:
          mode === 'edit' && recipeName === campaign.recipeName
            ? campaign.id
            : null,
      };
      fetchSelectionUnits(payload);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    unitSelectionDeferred,
    payloadForBatch,
    mode,
    actionState,
    recipeName,
    campaign.id,
  ]);

  const checkForPrimaryUnit = (units: CampaignUnitSelection[]) => {
    return units.some((s) => !s.primaryUnit);
  };
  const getErrorCountForPrimaryUnit = (units: CampaignUnitSelection[]) => {
    return units.filter((s) => !s.primaryUnit).length;
  };

  /**
   * disable save and next if primary unit not present
   */
  useEffect(() => {
    if (!unitSelectionDeferred && campaignUnitSelectionValues.length > 0) {
      const primaryUnitNotPresent = checkForPrimaryUnit(
        campaignUnitSelectionValues
      );
      setDisableNext(primaryUnitNotPresent);
      setDisableSave(primaryUnitNotPresent);
      if (primaryUnitNotPresent) {
        const errorCount = getErrorCountForPrimaryUnit(
          campaignUnitSelectionValues
        );
        setErrorInUnits(errorCount);
      } else {
        setErrorInUnits(null);
      }
    } else {
      setDisableNext(false);
      setDisableSave(false);
      setErrorInUnits(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unitSelectionDeferred, campaignUnitSelectionValues]);
  return (
    <>
      {selectedTab !== null && (
        <Tab activeIndex={selectedTab} onTabChange={setSelectedTab}>
          <Tab.Pane title="Assess raw materials" disabled={isRecipeBased}>
            {!isRecipeBased ? <RawMaterialsTab /> : null}
          </Tab.Pane>

          <Tab.Pane title="Check formula parameters">
            <FormulaParametersTab />
          </Tab.Pane>
          <Tab.Pane
            title="Select units"
            badgeColor="red"
            badge={errorInUnits?.toString()}
          >
            <EditSelectUnitsTab />
          </Tab.Pane>
        </Tab>
      )}
    </>
  );
};
