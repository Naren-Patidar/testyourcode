import { Card, Grid, InputLabel, Accordion } from '@scuf/common';
import styled from 'styled-components/macro';
import { Campaign } from 'app/campaign/models/campaign';
import { CampaignType } from 'app/campaign/models/campaign-type';
import { CampaignBatch } from 'app/campaign/models/campaign-batch';
import { campaignFormModel } from 'app/campaign/models/campaignFormModel';
import { BatchSize } from 'app/campaign/models/batch-size';
import { useRef } from 'react';
import { CampaignTypeInfo } from '../CampaignTypeInfo/CampaignTypeInfo';
import { CampaignDetailsInfo } from '../CampaignDetailsInfo/CampaignDetailsInfo';
import { SelectionUnitsInfo } from '../SelectionUnitsInfo/SelectionUnitsInfo';
import { BatchesInfo } from '../BatchesInfo/BatchesInfo';
import './CampaignInfoCard.scss';

const { Row, Column } = Grid;
const ScrollableGrid = styled(Grid)`
  height: 400px;
  overflow-y: auto;
  font-size: 0.75rem !important;
  /* padding: 1rem 0 !important; */
`;
export const CampaignInfoCard: React.FC<{
  campaign: Campaign;
  batches: CampaignBatch[];
}> = ({ campaign, batches }) => {
  const {
    campaignDetailsFormField,
    campaignTypeFormField,
    unitSelectionFormField,
  } = campaignFormModel;
  const batchInfoRef = useRef<HTMLDivElement>(null);
  return (
    <Card interactive className="shadow-none m-0 mr-4 p-2 campaign-info-card">
      <Card.Content className="border">
        <ScrollableGrid className="my-2 mr-2 p-0">
          <Row>
            <Column>
              <InputLabel label="Campaign type" />
            </Column>
          </Row>
          <CampaignTypeInfo data={campaign} formModel={campaignTypeFormField} />

          <Row>
            <Column>
              <InputLabel label="Campaign details" />
            </Column>
          </Row>
          <CampaignDetailsInfo
            data={campaign}
            formModel={campaignDetailsFormField}
          />
          <Row>
            <Column>
              <InputLabel label="Units" />
            </Column>
          </Row>
          <SelectionUnitsInfo
            data={campaign}
            formModel={unitSelectionFormField}
          />
          <Accordion className="border-0 px-0" defaultActiveIndex={-1}>
            <Accordion.Content
              className="border-0 px-0"
              title={`No. of batches (${batches.length})`}
              arrowPosition="left"
              onClick={() => {
                setTimeout(() => {
                  if (batchInfoRef.current) {
                    batchInfoRef.current.scrollIntoView();
                  }
                }, 0);
              }}
            >
              <Grid>
                <Row>
                  <Column sWidth={8} xsWidth={8}>
                    <div ref={batchInfoRef}>
                      <BatchesInfo
                        data={batches}
                        batchPatternIdPreview={campaign.BatchIdPatternPreview}
                        engUnit={campaign.batchSizeEngUnit || ''}
                      />
                    </div>
                  </Column>
                </Row>
              </Grid>
            </Accordion.Content>
          </Accordion>
        </ScrollableGrid>
      </Card.Content>
    </Card>
  );
};
