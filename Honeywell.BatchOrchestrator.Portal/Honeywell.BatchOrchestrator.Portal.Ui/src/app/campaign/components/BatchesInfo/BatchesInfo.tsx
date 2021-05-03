/* eslint-disable react/no-array-index-key */
import { Button, Table, Icon, Tooltip, InputLabel } from '@scuf/common';
import { useState } from 'react';
import { FadeIn, FadeOut } from 'shared/fade-transition';
import styled from 'styled-components/macro';
import { useFormikContext } from 'formik';
import { Campaign } from 'app/campaign/models/campaign';
import { CampaignBatch } from '../../models/campaign-batch';

const { Body, Cell, Header, Row, HeaderCell } = Table;
const NonStrippedTable = styled(Table)`
  tbody tr {
    background-color: #303030 !important;
    td {
      font-size: 0.75rem !important;
    }
  }
`;
const ShowMoreCell = styled(Cell)`
  background: #404040;
`;
const ShowMoreText = styled.div`
  margin: 0.0625rem !important;
`;
const BatchRow: React.FC<{
  item: CampaignBatch;
  batchPatternIdPreview: string | null | undefined;
}> = ({ item, batchPatternIdPreview }) => {
  // const {
  //   values: { BatchIdPatternPreview },
  // } = useFormikContext<Campaign>();
  return (
    <Row>
      <Cell className="p-0 w-50">
        {item.batchId !== 'CustomizeBatchId'
          ? item.batchId
          : batchPatternIdPreview}
      </Cell>
      <Cell className="p-0 w-50 text-center">{item.currentBatchSize}</Cell>
    </Row>
  );
};
const ShowMore: React.FC<{
  hiddenCount: number;
  onShowMoreClick: (show: boolean) => void;
}> = ({ onShowMoreClick, hiddenCount }) => {
  const [showText, setShowText] = useState(false);
  return (
    <Row
      className="cursor-pointer"
      onClick={() => onShowMoreClick(true)}
      onMouseEnter={() => setShowText(true)}
      onMouseLeave={() => setShowText(false)}
    >
      <ShowMoreCell className="p-0 w-50" colSpan={2}>
        <div className="d-flex justify-content-center">
          <FadeIn show={showText}>
            {showText && (
              <ShowMoreText>{`Show ${hiddenCount} hidden rows`}</ShowMoreText>
            )}
          </FadeIn>
          <FadeOut show={!showText}>
            {!showText && (
              <Icon root="common" name="ellipsis-horizontal" size="medium" />
            )}
          </FadeOut>
        </div>
      </ShowMoreCell>
    </Row>
  );
};
export const BatchesInfo: React.FC<{
  data: CampaignBatch[];
  engUnit?: string;
  batchPatternIdPreview: string | undefined | null;
}> = ({ data, engUnit, batchPatternIdPreview }) => {
  const [showMore, setShowMore] = useState(false);
  return (
    <NonStrippedTable className="border-0">
      <Header>
        <HeaderCell className="border-0 p-0 w-50" content="Batch ID" />
        <HeaderCell
          className="border-0 p-0 w-50 text-center"
          content={`Qty. (${engUnit})`}
        />
      </Header>
      <Body>
        {data.map((item, index) => {
          // eslint-disable-next-line no-nested-ternary
          return data.length > 10 ? (
            // eslint-disable-next-line no-nested-ternary
            !showMore ? (
              // eslint-disable-next-line no-nested-ternary
              index === 3 ? (
                // eslint-disable-next-line react/no-array-index-key
                <ShowMore
                  key={`${item.batchId}_${index}`}
                  hiddenCount={data.length - 4}
                  onShowMoreClick={setShowMore}
                />
              ) : index > 3 && index < data.length - 1 ? null : (
                <BatchRow
                  item={item}
                  key={`${item.batchId}_${index}`}
                  batchPatternIdPreview={batchPatternIdPreview}
                />
              )
            ) : (
              <BatchRow
                item={item}
                key={`${item.batchId}_${index}`}
                batchPatternIdPreview={batchPatternIdPreview}
              />
            )
          ) : (
            <BatchRow
              item={item}
              key={`${item.batchId}_${index}`}
              batchPatternIdPreview={batchPatternIdPreview}
            />
          );
        })}
      </Body>
    </NonStrippedTable>
  );
};
