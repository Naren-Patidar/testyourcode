import { Accordion, Card, Grid } from '@scuf/common';
import { batchStartMethods } from 'app/campaign/models/campaign-start-method';
import { campaignTypes } from 'app/campaign/models/campaign-type';
// import { getFormattedDateTime } from 'app/campaign/utils';
import { toLocalTimeStringFormatted } from 'app/../utils/date-utils';
import React from 'react';
import {
  CampaignDetails,
  CampaignType,
} from '../../../models/campaign-details';
import './CampaignBasicDetail.scss';

export const CampaignBasicDetail: React.FC<{
  campaignDetails: CampaignDetails | null;
  campaignType: CampaignType | null;
  productionYield: number;
  loading?: boolean;
}> = ({ campaignDetails, campaignType, productionYield }) => {
  return (
    <>
      <Accordion className="basic-detail" defaultActiveIndex={-1}>
        <Accordion.Content title="Basic Setup" arrowPosition="left">
          <Card className="campaign-basic-detail bg-transparent">
            <Card.Content className="border">
              {/* <Grid> */}
              <div className="main-container">
                {/* <Grid.Column width={6}> */}
                <div className="campaign-type-container ml-8">
                  {/* <Grid.Row>
                    <span className="shortCampaignName">
                      {campaignType?.formulaName
                        ? campaignType?.formulaName
                            .substr(0, 3)
                            .toUpperCase()
                        : ''}
                    </span>
                  </Grid.Row> */}
                  <div className="details-type-Header mb-4">Campaign type</div>
                  <Grid.Row>
                    <Grid.Column width={6}>
                      <span className="details-property-name">
                        Campaign type
                      </span>
                    </Grid.Column>
                    <Grid.Column width={6}>
                      <span className="details-property-name">
                        {
                          campaignTypes.find(
                            (f) => f.value === campaignType?.campaignType
                          )?.text
                        }
                      </span>
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column width={6}>
                      <span className="details-property-name">
                        Planned quantity
                      </span>
                    </Grid.Column>
                    <Grid.Column width={6}>
                      <span className="details-property-name">
                        {campaignType?.batchSizeEngUnit === '%'
                          ? 'Not Applicable'
                          : `${campaignType?.productionQty}
                        ${campaignType?.batchSizeEngUnit}`}
                      </span>
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column width={6}>
                      <span className="details-property-name">
                        Estimated quantity
                      </span>
                    </Grid.Column>
                    <Grid.Column width={6}>
                      <span className="details-property-name">
                        {campaignType?.batchSizeEngUnit === '%'
                          ? 'Not Applicable'
                          : `${campaignType?.estimatedQty}
                        ${campaignType?.batchSizeEngUnit}`}
                      </span>
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column width={6}>
                      <span className="details-property-name">
                        Actual quantity
                      </span>
                    </Grid.Column>
                    <Grid.Column width={6}>
                      <span className="details-property-name">
                        {productionYield}
                      </span>
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column width={6}>
                      <span className="details-property-name">
                        No. of Batches
                      </span>
                    </Grid.Column>
                    <Grid.Column width={6}>
                      <span className="details-property-name">
                        {campaignType?.noOfBatches}
                      </span>
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column width={6}>
                      <span className="details-property-name">
                        Last batch scaled
                      </span>
                    </Grid.Column>
                    <Grid.Column width={6}>
                      <span className="details-property-name">
                        {campaignType?.isLastBatchScaled ? 'Yes' : 'No'}
                      </span>
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column width={6}>
                      <span className="details-property-name">Batch size</span>
                    </Grid.Column>
                    <Grid.Column width={6}>
                      <span className="details-property-name">
                        {campaignType?.currentBatchSize}{' '}
                        {campaignType?.batchSizeEngUnit}
                      </span>
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column width={6}>
                      <span className="details-property-name">
                        Reference batch
                      </span>
                    </Grid.Column>
                    <Grid.Column width={6}>
                      <span className="details-property-name">
                        {campaignType?.referenceBatch}
                      </span>
                    </Grid.Column>
                  </Grid.Row>
                  {/* </Grid.Column> */}
                </div>
                <div className="separator vertical" />
                {/* <Grid.Column width={5}> */}
                <div className="campaign-details-container ml-8">
                  <div className="details-type-Header mb-4">
                    Campaign Details
                  </div>
                  <Grid.Row>
                    <Grid.Column width={6}>
                      <span className="details-property-name">Formula set</span>
                    </Grid.Column>
                    <Grid.Column width={6}>
                      <span className="details-property-name">
                        {campaignType?.isRecipeBased
                          ? 'Not Applicable'
                          : campaignType?.formulaSetName}
                      </span>
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column width={6}>
                      <span className="details-property-name">Recipe name</span>
                    </Grid.Column>
                    <Grid.Column width={6}>
                      <span className="details-property-name">
                        {campaignType?.recipeName}
                      </span>
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column width={6}>
                      <span className="details-property-name">
                        Identification no
                      </span>
                    </Grid.Column>
                    <Grid.Column width={6}>
                      <span className="details-property-name">
                        {campaignType?.isRecipeBased
                          ? 'Not Applicable'
                          : campaignType?.identificationNumber}
                      </span>
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column width={6}>
                      <span className="details-property-name">
                        Batch start method
                      </span>
                    </Grid.Column>
                    <Grid.Column width={6}>
                      <span className="details-property-name">
                        {
                          batchStartMethods.find(
                            (f) => f.value === campaignDetails?.batchStartMethod
                          )?.text
                        }
                      </span>
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column width={6}>
                      <span className="details-property-name">
                        {' '}
                        Simultaneous batch
                      </span>
                    </Grid.Column>
                    <Grid.Column width={6}>
                      <span className="details-property-name">
                        {campaignDetails?.simultaneousBatches}
                      </span>
                    </Grid.Column>
                  </Grid.Row>
                </div>
              </div>
            </Card.Content>
          </Card>
        </Accordion.Content>
      </Accordion>
    </>
  );
};
