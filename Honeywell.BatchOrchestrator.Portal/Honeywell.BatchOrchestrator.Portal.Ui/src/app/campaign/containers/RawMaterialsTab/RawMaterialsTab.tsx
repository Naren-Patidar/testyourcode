import { useEffect, useState } from 'react';
import { lazyLoad } from 'utils/loadable';
import { Card } from '@scuf/common';
import { useCampaignFacade } from '+store/campaign';
import { RawMaterialsList } from '../../components';

export const RawMaterials: React.FC = () => {
  const {
    loading,
    payloadForBatch,
    fetchRawMaterials,
    setSearchTextRawMaterials,
    rawMaterials,
  } = useCampaignFacade();

  useEffect(() => {
    if (payloadForBatch) {
      fetchRawMaterials(payloadForBatch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [payloadForBatch]);

  return (
    <>
      <Card className="shadow-none">
        <Card.Content>
          <RawMaterialsList data={rawMaterials} loading={loading} />
        </Card.Content>
      </Card>
    </>
  );
};

export const RawMaterialsTab = lazyLoad(
  () => import('./RawMaterialsTab'),
  (page) => page.RawMaterials
);
