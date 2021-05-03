import { Card, Accordion } from '@scuf/common';

export const CampaignCommentCard: React.FC<{ comment: string }> = ({
  comment,
}) => {
  return (
    <Accordion className="border-0 px-0 mt-2" defaultActiveIndex={-1}>
      <Accordion.Content
        className="border-0 px-0"
        title="View Comments"
        arrowPosition="left"
      >
        <Card>
          <Card.Content className="border p-4">{comment}</Card.Content>
        </Card>
      </Accordion.Content>
    </Accordion>
  );
};
