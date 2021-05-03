/* eslint-disable import/named */
import { Grid } from '@scuf/common';
import { batchStartMethods } from 'app/campaign/models/campaign-start-method';
import { useFormikContext } from 'formik';
import { Campaign } from '../../models/campaign';
import { CampaignDetailsFormModelType } from '../../models/campaignFormModel';
import { getFormattedDateTime } from '../../utils';

const { Row, Column } = Grid;
export const CampaignDetailsInfo: React.FC<{
  formModel: CampaignDetailsFormModelType;
  data: Campaign;
}> = ({ formModel, data }) => {
  // const {
  //   values: { BatchIdPatternPreview },
  // } = useFormikContext<Campaign>();
  return (
    <>
      <Row>
        <Column sWidth={4} xsWidth={4}>
          {formModel.batchIdPattern.label}
        </Column>
        <Column sWidth={8} xsWidth={8}>
          {data.batchIdPattern !== 'CustomizeBatchId'
            ? data.batchIdPattern
            : data.BatchIdPatternPreview}
        </Column>
      </Row>
      <Row>
        <Column sWidth={4} xsWidth={4}>
          {formModel.batchStartMethod.label}
        </Column>
        <Column sWidth={8} xsWidth={8}>
          {
            batchStartMethods.find((f) => f.value === data.batchStartMethod)
              ?.text
          }
        </Column>
      </Row>
      <Row>
        <Column sWidth={4} xsWidth={4}>
          {formModel.simultaneousBatches.label}
        </Column>
        <Column sWidth={8} xsWidth={8}>
          {data.simultaneousBatches}
        </Column>
      </Row>
      <Row>
        <Column sWidth={4} xsWidth={4}>
          {formModel.startTime.label}
        </Column>
        <Column sWidth={8} xsWidth={8}>
          {data.isScheduledCampaign ? (
            <span>
              {data.startTime
                ? getFormattedDateTime(new Date(data.startTime))
                : ''}
            </span>
          ) : (
            'Unscheduled'
          )}
        </Column>
      </Row>
    </>
  );
};
