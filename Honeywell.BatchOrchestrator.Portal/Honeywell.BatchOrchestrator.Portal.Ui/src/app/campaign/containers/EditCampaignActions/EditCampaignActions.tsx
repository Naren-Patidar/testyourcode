/* eslint-disable react-hooks/exhaustive-deps */

import { Button, Icon } from '@scuf/common';
import { useFormikContext } from 'formik';
import {
  Campaign,
  CampaignStateValues,
  CampaignStatusValues,
} from 'app/campaign/models/campaign';
import { withAppSettingsContext } from 'app/application-settings/controllers/app-settings/app-settings-context';
import { useEffect, useState } from 'react';
import { Permissions } from 'core/authentication';
import { PermissionValues } from 'core/authentication/models/user-permission';
import { useCampaignFacade } from '+store/campaign';
import { getCampaignStateParams } from '../../utils';

type Action = 'save' | 'submit' | 'next' | null;
export const EditCampaignActions: React.FC<{
  step: number;
  isLastStep: boolean;
  // disableSave: boolean;
  handleBack: () => void;
  handleNext?: (values: Campaign, actions) => void;
  saveCampaign?: (values: Campaign, actions) => void;
}> = withAppSettingsContext(
  ({ step, isLastStep, handleBack, handleNext, saveCampaign, ...props }) => {
    const { settingList, getAppSettingsList, updateAppsettingsChanges } = props;
    const {
      actionState,
      campaignStatus,
      campaignState,
      disableNext,
      disableSave,
    } = useCampaignFacade();
    const {
      isSubmitting,
      values,
      isValid,
      submitForm,
      setFieldValue,
    } = useFormikContext<Campaign>();
    const [autoApprove, setAutoApprove] = useState<boolean>(false);
    const [action, setAction] = useState<Action>(null);

    useEffect(() => {
      getAppSettingsList();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
      if (actionState && actionState === 'finished') {
        setAction(null);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [actionState]);
    useEffect(() => {
      if (settingList) {
        const autoAppr = (settingList as Array<any>).find(
          (item) => item.key === 'CampaignAutoApproval'
        )?.value;
        if (autoAppr !== undefined) {
          if (autoAppr === 'false') {
            setAutoApprove(false);
          } else {
            setAutoApprove(true);
          }
        }
      }
    }, [settingList]);
    const handleFormSubmitClick = (data: Action) => {
      setAction(data);
      switch (data) {
        case 'next':
          setFieldValue('status', null);
          submitForm();
          break;
        case 'save':
          {
            const { status, state } = getCampaignStateParams(
              'save',
              autoApprove,
              campaignState
            );

            setFieldValue('status', status);
            setFieldValue('state', state);
            setFieldValue('isAutoApproved', autoApprove);
            submitForm();
          }

          break;
        case 'submit':
          {
            const { status, state } = getCampaignStateParams(
              'submit',
              autoApprove,
              campaignState
            );

            setFieldValue('status', status);
            setFieldValue('state', state);
            setFieldValue('isAutoApproved', autoApprove);
            submitForm();
          }

          break;

        default:
          break;
      }
    };
    return (
      <div className="d-flex w-100 flex-column">
        <div className="d-flex w-100 justify-content-between">
          <div>
            {step !== 0 && (
              <Button
                onClick={handleBack}
                type="secondary"
                content="Back"
                size="small"
                disabled={actionState === 'loading'}
                textTransform={false}
              />
            )}
          </div>

          <div>
            <Permissions
              type="disable"
              allowed={[
                PermissionValues.CreateProductionCampaign,
                PermissionValues.EditProductionCampaign,
              ]}
            >
              {({ authorized }) => (
                <Button
                  type="secondary"
                  textTransform={false}
                  actionType="button"
                  content="Save"
                  size="small"
                  disabled={
                    actionState === 'loading' || disableSave || !authorized
                  }
                  loading={actionState === 'loading' && action === 'save'}
                  onClick={() => handleFormSubmitClick('save')}
                />
              )}
            </Permissions>

            {isLastStep ? (
              <Permissions
                type="disable"
                allowed={[
                  PermissionValues.CreateProductionCampaign,
                  PermissionValues.EditProductionCampaign,
                ]}
              >
                {({ authorized }) => (
                  <Button
                    type="primary"
                    actionType="button"
                    disabled={
                      actionState === 'loading' || disableSave || !authorized
                    }
                    size="small"
                    content={
                      // eslint-disable-next-line no-nested-ternary
                      [CampaignStatusValues.Approved].includes(
                        campaignStatus
                      ) ||
                      campaignState === CampaignStateValues.Running ||
                      campaignState === CampaignStateValues.Paused
                        ? 'Update Campaign'
                        : autoApprove
                        ? 'Create Campaign'
                        : 'Submit for approval'
                    }
                    textTransform={false}
                    loading={actionState === 'loading' && action === 'submit'}
                    onClick={() => handleFormSubmitClick('submit')}
                  />
                )}
              </Permissions>
            ) : (
              <Button
                type="primary"
                textTransform={false}
                actionType="button"
                size="small"
                content="Next"
                disabled={!isValid || actionState === 'loading' || disableNext}
                onClick={() => handleFormSubmitClick('next')}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
);
