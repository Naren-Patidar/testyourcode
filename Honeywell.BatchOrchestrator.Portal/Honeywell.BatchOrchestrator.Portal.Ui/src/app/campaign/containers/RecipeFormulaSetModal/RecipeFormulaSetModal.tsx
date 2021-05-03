import { Modal, Card } from '@scuf/common';
import { useAuthorize } from 'core/authentication';
import { PermissionValues } from 'core/authentication/models/user-permission';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useConfirm } from 'shared/confirm-dialog';
import { AppConstants } from 'utils/app-constants';
import { RecipeFormulaSetSelection } from './RecipeFormulaSetSelection/RecipeFormulaSetSelection';

export const RecipeFormulaSetModal: React.FC<{
  open: boolean;
  onClose: (openCreateCampaign: boolean) => void;
}> = ({ open, onClose }) => {
  const confirm = useConfirm();
  const history = useHistory();
  const { authorized } = useAuthorize([
    PermissionValues.CreateProductionCampaign,
  ]);

  const raiseAlert = async (message: string) => {
    const { confirmed } = await confirm.show({
      title: 'Alert',
      confirmText: 'Ok',
      message,
      type: 'alert',
    });
    if (confirmed) {
      history.push('/');
    }
  };
  useEffect(() => {
    if (authorized !== null && !authorized) {
      raiseAlert(AppConstants.UNAUTHORIZED_MESSAGE);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authorized]);
  return (
    <Modal
      open={open}
      closeOnDimmerClick={false}
      closeOnDocumentClick={false}
      className="medium"
    >
      {/* <Modal.Header>
        <Card>
          <Card.Content>
            <div className="mx-4 p-0">
              <p className="m-0">Select recipe/ formula set</p>
            </div>
          </Card.Content>
        </Card>
      </Modal.Header> */}
      <Modal.Content scrolling={false}>
        <RecipeFormulaSetSelection on="modal" onClose={onClose} />
      </Modal.Content>
    </Modal>
  );
};
