import { Popup, Table } from '@scuf/common';
import styled from 'styled-components/macro';

const { Body, Cell, Header, Row, HeaderCell } = Table;
const NonStrippedTable = styled(Table)`
  tbody tr {
    background-color: #303030 !important;
    td {
      font-size: 0.75rem !important;
    }
  }
`;

export const MinMaxTooltip: React.FC<{
  element: JSX.Element;
  min?: number | null;
  current?: number | null;
  max?: number | null;
}> = ({ element, min, current, max }) => {
  return (
    <Popup
      element={element}
      on="hover"
      position="left center"
      hideOnScroll
      hoverable
      className="min-max-tooltip"
    >
      <NonStrippedTable className="border-0">
        <Header>
          <HeaderCell
            className="border-0 text-center px-2 pt-2 pb-0"
            content="Min"
          />
          <HeaderCell
            className="border-0 text-center px-2 pt-2 pb-0"
            content="Current"
          />
          <HeaderCell
            className="border-0 text-center px-2 pt-2 pb-0"
            content="Max"
          />
        </Header>
        <Body>
          <Row>
            <Cell className="pt-0 px-2 pb-2 text-bold text-center">{min}</Cell>
            <Cell className="pt-0 px-2 pb-2 text-bold text-center">
              {current}
            </Cell>
            <Cell className="pt-0 px-2 pb-2 text-bold text-center">{max}</Cell>
          </Row>
        </Body>
      </NonStrippedTable>
    </Popup>
  );
};
