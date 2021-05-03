/* eslint-disable import/named */
import { Grid } from '@scuf/common';
import { CampaignType, campaignTypes } from 'app/campaign/models/campaign-type';
// import { useCampaignFacade } from '+store/campaign';
import { Campaign, TypeValues } from '../../models/campaign';
import { CampaignTypeFormModelType } from '../../models/campaignFormModel';

const { Row, Column } = Grid;

export const CampaignTypeInfo: React.FC<{
  formModel: CampaignTypeFormModelType;
  data: Campaign;
}> = ({ formModel, data }) => {
  // const { formulaSelected, formulaSetSelected } = useCampaignFacade();
  return (
    <>
      <Row>
        <Column sWidth={4} xsWidth={4}>
          {formModel.isRecipeBased.label}
        </Column>
        <Column sWidth={8} xsWidth={8}>
          {!data.isRecipeBased ? 'Formula Set' : 'Recipe'}
        </Column>
      </Row>
      {!data.isRecipeBased ? (
        <>
          <Row>
            <Column sWidth={4} xsWidth={4}>
              {formModel.formulaSetId.label}
            </Column>
            <Column sWidth={8} xsWidth={8}>
              {data.formulaSetName}
            </Column>
          </Row>
          <Row>
            <Column sWidth={4} xsWidth={4}>
              {formModel.formulaId.label}
            </Column>
            <Column sWidth={8} xsWidth={8}>
              {data.formulaName}
            </Column>
          </Row>
        </>
      ) : (
        <Row>
          <Column sWidth={4} xsWidth={4}>
            {formModel.recipeName.label}
          </Column>
          <Column sWidth={8} xsWidth={8}>
            {data.recipeName}
          </Column>
        </Row>
      )}

      <Row>
        <Column sWidth={4} xsWidth={4}>
          {formModel.campaignType.label}
        </Column>
        <Column sWidth={8} xsWidth={8}>
          {campaignTypes.find((f) => f.value === data.campaignType)?.text}
        </Column>
      </Row>
      <Row>
        {data.campaignType === CampaignType.ProductionQuantity && (
          <>
            <Column sWidth={4} xsWidth={4}>
              {formModel.productionQty.label}
            </Column>
            <Column sWidth={8} xsWidth={8}>
              <span>
                {data.productionQty} {data.batchSizeEngUnit}
              </span>
            </Column>
          </>
        )}
        {data.campaignType === CampaignType.NoOfBatches && (
          <>
            <Column sWidth={4} xsWidth={4}>
              {formModel.noOfBatches.label}
            </Column>
            <Column sWidth={8} xsWidth={8}>
              {data.noOfBatches}
            </Column>
          </>
        )}
        {data.campaignType === CampaignType.RawMaterialConsumption && (
          <>
            <Column sWidth={4} xsWidth={4}>
              {formModel.rawMaterial.label}
            </Column>
            <Column sWidth={8} xsWidth={8}>
              {data.rawMaterial}
            </Column>
            <Column sWidth={4} xsWidth={4}>
              {formModel.rawMaterialQty.label}
            </Column>
            <Column sWidth={8} xsWidth={8}>
              <span>
                {data.rawMaterialQty} {data.rawMaterialEngUnit}
              </span>
            </Column>
          </>
        )}
      </Row>
      <Row>
        <Column sWidth={4} xsWidth={4}>
          {formModel.campaignRefId.label}
        </Column>
        <Column sWidth={8} xsWidth={8}>
          {data.campaignRefId}
        </Column>
      </Row>
      <Row>
        <Column sWidth={4} xsWidth={4}>
          {formModel.currentBatchSize.label}
        </Column>
        <Column sWidth={8} xsWidth={8}>
          <span>
            {data.currentBatchSize} {data.batchSizeEngUnit}
          </span>
        </Column>
      </Row>
      <Row>
        <Column sWidth={4} xsWidth={4}>
          {formModel.referenceBatch.label}
        </Column>
        <Column sWidth={8} xsWidth={8}>
          {data.referenceBatch}
        </Column>
      </Row>
      {data.campaignType === CampaignType.ProductionQuantity ||
      data.campaignType === CampaignType.RawMaterialConsumption ? (
        <Row>
          <Column sWidth={4} xsWidth={4}>
            {formModel.isLastBatchScaled.helpText}
          </Column>
          <Column sWidth={8} xsWidth={8}>
            {data.isLastBatchScaled ? 'Yes' : 'No'}
          </Column>
        </Row>
      ) : null}
      {data.isLastBatchScaled ? (
        <Row>
          <Column sWidth={4} xsWidth={4}>
            {formModel.minimumBatchSize.label}
          </Column>
          <Column sWidth={8} xsWidth={8}>
            {data.minimumBatchSize}
          </Column>
        </Row>
      ) : null}
    </>
  );
};
