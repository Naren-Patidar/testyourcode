// eslint-disable-next-line import/named
import { lazyLoad } from 'utils/loadable';
import { useEffect, useState } from 'react';
import { FormulaParameter } from 'app/campaign/models/formula-parameter';
import { Card } from '@scuf/common';
import { useFormikContext } from 'formik';
import { Campaign } from 'app/campaign/models/campaign';
import { campaignFormModel } from 'app/campaign/models/campaignFormModel';
import { NEW_PARAM_TYPES } from 'utils/constants/enums';
import { IOption } from '@scuf/common/dist/components/Select/ISelectProps';
import { PayloadForBatch } from 'app/campaign/models/batch-size';
import { useCampaignFacade } from '+store/campaign';
import { FormulaParamsList } from '../../components';

export const FormulaParameters: React.FC = () => {
  const { resourceManagement } = campaignFormModel;
  const {
    campaign,
    mode,
    loading,
    formulaParams,
    payloadForBatch,
    campaignFieldDisabled,
    formulaParamsEdited,
    actionState,
    fetchFormulaParameters,
    setSearchTextFormulaParams,
    updateFormulaParamter,
    setDisableSave,
    setDisableNext,
    setFormulaParamterEdited,
  } = useCampaignFacade();
  const {
    values: { isRecipeBased, campaignFormulaSetParameter, recipeName },
    setFieldValue,
  } = useFormikContext<Campaign>();

  const getValueFromOptions = (options, defaultValue) => {
    const object = options.filter(
      (row) => row.text.toLowerCase() === defaultValue.toLowerCase()
    );
    return object[0]?.value;
  };
  const validateFormFields = (data: FormulaParameter[]) => {
    let isDataValid = data.length > 0;

    if (data.length > 0) {
      for (let i = 0; i < data.length; i += 1) {
        const row = data[i];
        const {
          paramType,
          optionValue,
          minValue,
          maxValue,
          defaultValue,
        } = row;

        // If parameter is removed then no validation
        // if (diffType === 4) {
        //   continue;
        // }
        if (paramType === NEW_PARAM_TYPES.STRING) {
          if (defaultValue.length > 8) {
            isDataValid = false;
            break;
          }
        } else if (
          paramType === NEW_PARAM_TYPES.ENUMERATION ||
          paramType === NEW_PARAM_TYPES.BOOLEAN
        ) {
          let optionValues: IOption[] = [];
          const options = JSON.parse(optionValue);
          optionValues = options.map(
            (opt) =>
              ({
                text: opt.EnumerationString,
                value: opt.EnumerationNumber,
              } as IOption)
          );
          const valueFromOptions = getValueFromOptions(
            optionValues,
            defaultValue
          );
          if (valueFromOptions === undefined) {
            isDataValid = false;
            break;
          }
        } else if (
          paramType === NEW_PARAM_TYPES.INT32 ||
          paramType === NEW_PARAM_TYPES.FLOAT64
        ) {
          if (defaultValue.toLowerCase() === 'nan') {
            isDataValid = true;
          } else if (
            defaultValue.toLowerCase() !== 'nan' &&
            // eslint-disable-next-line no-restricted-globals
            (isNaN(Number(defaultValue)) || defaultValue === '')
          ) {
            isDataValid = false;
          } else if (defaultValue.toLowerCase() !== 'nan') {
            if (
              minValue.toLowerCase() !== 'nan' &&
              maxValue.toLowerCase() === 'nan' &&
              parseFloat(defaultValue) < parseFloat(minValue)
            ) {
              isDataValid = false;
              break;
            }
            if (
              maxValue.toLowerCase() !== 'nan' &&
              minValue.toLowerCase() === 'nan' &&
              parseFloat(defaultValue) > parseFloat(maxValue)
            ) {
              isDataValid = false;
              break;
            }
            if (
              maxValue.toLowerCase() !== 'nan' &&
              minValue.toLowerCase() !== 'nan' &&
              (parseFloat(defaultValue) < parseFloat(minValue) ||
                parseFloat(defaultValue) > parseFloat(maxValue))
            ) {
              isDataValid = false;
              break;
            }
            if (
              paramType === NEW_PARAM_TYPES.INT32 &&
              defaultValue.indexOf('.') !== -1
            ) {
              isDataValid = false;
              break;
            }
          }
        }
      }
    }
    return isDataValid;
  };

  /**
   * Fetch formula parameters
   */
  useEffect(() => {
    if (actionState === 'loading' || actionState === 'error') {
      return;
    }
    if (isRecipeBased && !formulaParamsEdited && recipeName) {
      const payload: PayloadForBatch = {
        ...payloadForBatch,
        id:
          mode === 'edit' && recipeName === campaign.recipeName
            ? campaign.id
            : null,
      };
      fetchFormulaParameters(payload);
    } else if (!isRecipeBased && payloadForBatch?.recipeName) {
      fetchFormulaParameters(payloadForBatch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    isRecipeBased,
    formulaParamsEdited,
    recipeName,
    campaign.id,
    mode,
    payloadForBatch,
    actionState,
  ]);

  /**
   * validate formula parameters and set form field
   */
  useEffect(() => {
    if (isRecipeBased && formulaParams.length) {
      setFieldValue(
        resourceManagement.campaignFormulaSetParameter.name,
        formulaParams
      );

      const isDataValid = validateFormFields(formulaParams);
      setDisableSave(!isDataValid);
      setDisableNext(!isDataValid);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formulaParams]);

  const onEditCell = (editedData: FormulaParameter) => {
    if (!formulaParamsEdited) {
      setFormulaParamterEdited(true);
    }

    updateFormulaParamter(editedData);
  };

  return (
    <>
      <Card className="shadow-none">
        <Card.Content>
          <FormulaParamsList
            loading={loading}
            data={formulaParams}
            editable={isRecipeBased && actionState !== 'loading'}
            onCellDataChange={onEditCell}
          />
        </Card.Content>
      </Card>
    </>
  );
};

export const FormulaParametersTab = lazyLoad(
  () => import('./FormulaParametersTab'),
  (page) => page.FormulaParameters
);
