/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-nested-ternary */
import { Grid, Progress, Icon, Tooltip } from '@scuf/common';
import {
  CampaignStateValues,
  CampaignStatusValues,
} from 'app/campaign/models/campaign';
import { BatchDetails } from 'app/campaign/models/campaign-details';
import React, { useState } from 'react';
import { useConfirm } from 'shared/confirm-dialog';
import './CampaignProgressBar.scss';
// import { getFormattedDateTime } from 'app/campaign/utils';
import { toLocalTimeStringFormatted } from 'app/../utils/date-utils';
import { CampaignType } from 'app/campaign/models/campaign-type';
import { Permissions, useAuthorize } from 'core/authentication';
import { PermissionValues } from 'core/authentication/models/user-permission';
import { AppConstants } from 'utils';
import { useCampaignFacade } from '+store/campaign';

export const CampaignProgress: React.FC<{
  batches: BatchDetails[];
  completedBatch: number;
  getStatusUpdate: (values: number) => void;
}> = ({ batches, completedBatch, getStatusUpdate }) => {
  const confirm = useConfirm();
  const {
    campaignSummaryCampaignDetails: campaignDetails,
    campaignSummaryCampaignType: campaignType,
  } = useCampaignFacade();
  // const { authorized: canManageCampaign } = useAuthorize([
  //   PermissionValues.StartManageProductionCampaign,
  // ]);
  // const [resumePause, showResumePause] = useState(false);
  const batchLength = batches?.length ?? 0;
  const perValue =
    completedBatch !== 0 && batchLength !== 0
      ? (completedBatch / batchLength) * 100
      : 0;
  const resumeCampaignState = async () => {
    const { confirmed } = await confirm.show({
      confirmText: 'Resume',
      message: 'Do you want to resume this campaign?',
    });
    if (confirmed) {
      getStatusUpdate(CampaignStateValues.Running);
    }
  };
  const pauseCampaignState = async () => {
    const { confirmed } = await confirm.show({
      confirmText: 'Pause',
      message: 'Do you want to pause this campaign?',
    });
    if (confirmed) {
      getStatusUpdate(CampaignStateValues.Paused);
    }
  };
  const stopCampaignState = async () => {
    const { confirmed } = await confirm.show({
      confirmText: 'Terminate',
      message: 'Do you want to terminate this campaign?',
    });
    if (confirmed) {
      getStatusUpdate(CampaignStateValues.Terminating);
    }
  };
  return (
    <>
      <div className="CampaignProgressBar mt-6">
        <div className="d-flex justify-content-between w-90-p">
          <div className="d-flex font-size-12">
            <div className="mr-4">Campaign start time :</div>
            <div>
              {campaignDetails?.startTime
                ? toLocalTimeStringFormatted(`${campaignDetails.startTime}`)
                : ''}
            </div>
          </div>
          {campaignType?.campaignType !== CampaignType.ContinuousCampaign ? (
            <div className="d-flex font-size-12">
              <div className="mr-4">Percentage completed :</div>
              <div>{perValue.toFixed(2)} %</div>
            </div>
          ) : (
            <div />
          )}
        </div>

        <Grid.Row>
          <Grid.Column width={11}>
            {campaignType?.campaignType !== CampaignType.ContinuousCampaign ? (
              <Progress
                className="campaign-progress bg-transparent"
                size="xsmall"
                colors={['#4EABF8']}
                unit="%"
                stackedValues={[perValue]}
              />
            ) : (
              <span />
            )}
          </Grid.Column>

          <Grid.Column width={1}>
            <Permissions
              type="disable"
              allowed={[PermissionValues.StartManageProductionCampaign]}
            >
              {({ authorized: canManageCampaign }) => (
                <>
                  {campaignType &&
                    campaignType.state === CampaignStateValues.Running && (
                      <span
                        className={`play-pause-icon ${
                          canManageCampaign
                            ? ''
                            : 'cursor-not-allowed text-light-100'
                        }`}
                        onClick={
                          canManageCampaign ? pauseCampaignState : undefined
                        }
                      >
                        {canManageCampaign ? (
                          <Tooltip
                            content="Pause campaign"
                            element={
                              <Icon
                                root="building"
                                name="playback-pause"
                                size="large"
                              />
                            }
                          />
                        ) : (
                          <Icon
                            root="building"
                            name="playback-pause"
                            size="large"
                          />
                        )}
                      </span>
                    )}
                  {campaignType &&
                    campaignType.state === CampaignStateValues.Paused &&
                    campaignType.status === CampaignStatusValues.Approved && (
                      <span
                        className={`play-pause-icon ${
                          canManageCampaign
                            ? ''
                            : 'cursor-not-allowed text-light-100'
                        }`}
                        onClick={
                          canManageCampaign ? resumeCampaignState : undefined
                        }
                      >
                        {canManageCampaign ? (
                          <Tooltip
                            content="Resume Campaign"
                            element={
                              <Icon
                                root="building"
                                name="playback-play"
                                size="large"
                              />
                            }
                          />
                        ) : (
                          <Icon
                            root="building"
                            name="playback-play"
                            size="large"
                          />
                        )}
                      </span>
                    )}
                  {campaignType &&
                    (campaignType.state === CampaignStateValues.Paused ||
                      campaignType.state === CampaignStateValues.Running) && (
                      <span
                        className={`play-pause-icon ${
                          canManageCampaign
                            ? ''
                            : 'cursor-not-allowed text-light-100'
                        }`}
                        onClick={
                          canManageCampaign ? stopCampaignState : undefined
                        }
                      >
                        {canManageCampaign ? (
                          <Tooltip
                            content="End Campaign"
                            element={
                              <Icon
                                root="building"
                                name="playback-stop"
                                size="large"
                              />
                            }
                          />
                        ) : (
                          <Icon
                            root="building"
                            name="playback-stop"
                            size="large"
                          />
                        )}
                      </span>
                    )}
                </>
              )}
            </Permissions>
          </Grid.Column>
        </Grid.Row>
        {campaignType &&
        campaignType.campaignType !== CampaignType.ContinuousCampaign ? (
          // <span className="completed-batch-number">
          //   {props.campaignDetails.completedBatch}/
          //   {props.campaignDetails.batches.length} Batch completed
          // </span>
          <div className="d-flex justify-content-end w-90-p">
            <div className="d-flex flex-column completed-batch-number">
              <div className="batch-number">
                {batches ? `${completedBatch} / ${batches.length}` : 0}
              </div>
              <div className="batch-text">Batch completed</div>
            </div>
          </div>
        ) : (
          <div />
        )}
      </div>
    </>
  );
};
