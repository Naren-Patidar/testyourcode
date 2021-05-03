/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from 'react';
import { Card } from '@scuf/common';
import { PayloadForBatch } from 'app/campaign/models/batch-size';
import {
  Campaign,
  initialCampaignFormValues,
} from 'app/campaign/models/campaign';
import { FormulaParamsList, CampaignInfoCard } from 'app/campaign/components';
import { useCampaignFacade } from '+store/campaign';
import './Approvals.scss';

const CampaignApprovalDetails = (props) => {
  const { campainId, setCampaignComments } = props;
  const [campaignDetails, setCampaignDetails] = useState(
    initialCampaignFormValues
  );
  const [fatchStatus, setFetchStatus] = useState(false);
  // const { values, setFieldValue } = useFormikContext<Campaign>();
  const {
    loading,
    batches,
    formulaParams,
    campaign,
    fetchFormulaParameters,
    fetchBatches,
    fetchCampaignById,
  } = useCampaignFacade();

  useEffect(() => {
    if (campainId !== null && campainId !== '') {
      fetchCampaignById(campainId || '');
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [campainId]);

  useEffect(() => {
    const payload: PayloadForBatch = {
      id: campainId,
      formulaId: campaign.formulaId || null,
      isRecipeBased: campaign.isRecipeBased,
      recipeName: campaign.recipeName,
      defaultBatchSize: campaign.defaultBatchSize && +campaign.defaultBatchSize,
      currentBatchSize: campaign.currentBatchSize && +campaign.currentBatchSize,
      productionQty: campaign.productionQty && +campaign.productionQty,
      batchIdPattern: campaign.batchIdPattern,
      isLastBatchScaled: campaign.isLastBatchScaled,
      minimumBatchSize: campaign.minimumBatchSize,
      noOfBatches: campaign.noOfBatches,
      rawMaterialParameterId: campaign.rawMaterialParameterId,
      rawMaterialQty: campaign.rawMaterialQty,
      campaignType: campaign.campaignType,
    };
    setCampaignDetails(campaign);
    // --Set campaign comments
    setCampaignComments({
      approverComment: campaign.approverComment,
      submitterComment: campaign.submitterComment,
    });

    fetchFormulaParameters(payload);
    fetchBatches(payload);
    setFetchStatus(true);
    // if (payload.formulaId !== null && payload.formulaId !== '') {

    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [campaign]);

  return (
    <>
      <div className="campaign-approvals">
        {fatchStatus && (
          <>
            <CampaignInfoCard campaign={campaign} batches={batches} />

            <Card
              interactive
              className="shadow-none m-0 mr-4 p-2 campaign-info-card"
            >
              <Card.Content className="border">
                {fatchStatus && (
                  <Card>
                    <Card.Content className="bg-light-550-force">
                      <FormulaParamsList
                        loading={loading}
                        data={formulaParams}
                      />
                    </Card.Content>
                  </Card>
                )}
              </Card.Content>
            </Card>
          </>
        )}
      </div>
    </>
  );
};

export default CampaignApprovalDetails;
