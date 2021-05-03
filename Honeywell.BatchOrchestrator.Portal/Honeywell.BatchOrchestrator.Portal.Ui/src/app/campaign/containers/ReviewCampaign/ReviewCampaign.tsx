import { Campaign } from 'app/campaign/models/campaign';
import { campaignFormModel } from 'app/campaign/models/campaignFormModel';
import { useFormikContext } from 'formik';

import { useEffect, useState } from 'react';
import { useCampaignFacade } from '+store/campaign';

import { CampaignInfoCard, CampaignCommentCard } from '../../components';

export const ReviewCampaignView: React.FC = () => {
  const { values, setFieldValue } = useFormikContext<Campaign>();
  const { batches, payloadForBatch, fetchBatches } = useCampaignFacade();
  const { reviewFormField } = campaignFormModel;

  useEffect(() => {
    if (payloadForBatch) {
      fetchBatches(payloadForBatch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    setFieldValue(reviewFormField.campaignBatches.name, batches);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [batches]);

  return (
    <>
      <CampaignInfoCard campaign={values} batches={values.campaignBatches} />

      {values.approverComment && (
        <CampaignCommentCard comment={values.approverComment} />
      )}
    </>
  );
};
