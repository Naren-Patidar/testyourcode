import { useEffect } from 'react';
import { Card, Button, Popup, Icon, InputLabel } from '@scuf/common';
import { RecipeFormulaSetList } from 'app/campaign/components';
import { RESPONSE_CODE } from 'utils';
import { useConfirm } from 'shared/confirm-dialog';
import { PageTitle } from 'shared/page-title';
import { useCampaignFacade } from '+store/campaign';

export const RecipeFormulaSetSelection: React.FC<{
  on: 'modal' | 'view';
  onClose: (openCreateCampaign: boolean) => void;
}> = ({ onClose, on }) => {
  const {
    loading,
    error,
    errorStatusCode,
    recipeFormulaSets,
    setMRFormulaSet,
    fetchAllRecipeFormulaSets,
  } = useCampaignFacade();
  const confirm = useConfirm();
  useEffect(() => {
    fetchAllRecipeFormulaSets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const raiseAlert = async () => {
    const { confirmed } = await confirm.show({
      confirmText: 'Ok',
      message: error,
      title: 'Alert',
      type: 'alert',
    });
    if (confirmed) {
      onClose(false);
    }
  };
  useEffect(() => {
    if (errorStatusCode === RESPONSE_CODE.FORBIDDEN) {
      raiseAlert();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorStatusCode]);
  return (
    <>
      {on === 'view' ? (
        <div className="d-flex">
          <Button
            actionType="button"
            content="Back"
            icon={
              <Icon
                name="caret-left"
                root="common"
                size="small"
                color="primary"
              />
            }
            iconPosition="left"
            size="small"
            textTransform={false}
            type="link"
            onClick={() => onClose(false)}
          />
        </div>
      ) : null}
      <Card>
        <Card.Content>
          <div className="p-8">
            <div className="d-flex justify-content-between">
              <PageTitle content="Select recipe/ formula set" />

              {on === 'modal' && (
                <Icon
                  name="close"
                  root="common"
                  className="cursor-pointer font-size-l7-rem-force"
                  onClick={() => onClose(false)}
                />
              )}
            </div>
            <div className="d-flex mt-8">
              <RecipeFormulaSetList
                data={recipeFormulaSets}
                loading={loading}
                onRefresh={fetchAllRecipeFormulaSets}
                onSelection={({ data }) => {
                  setMRFormulaSet(data);
                  onClose(true);
                }}
              />
            </div>
          </div>
        </Card.Content>
      </Card>
    </>
  );
};
