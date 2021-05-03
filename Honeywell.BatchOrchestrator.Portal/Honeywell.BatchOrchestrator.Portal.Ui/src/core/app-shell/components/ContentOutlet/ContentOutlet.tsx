import { Children } from 'react';
import styled from 'styled-components/macro';
import BreadcrumbList from '../BreadcrumbList/BreadcrumbList';

const Wrapper = styled.div`
  /* width: auto; */
  background: #202020;
  /* min-height: calc(100vh - 66px); */
  /* padding: 8px 16px; */
  margin: 8px 16px;
`;
const PageContainer = styled.div`
  background: #1c1c1c;
  padding: 0.875rem 1rem;
  border-radius: 0.5rem;
`;
export const ContentOutlet: React.FC = (props) => {
  return (
    <Wrapper>
      <BreadcrumbList />
      <PageContainer>{Children.only(props.children)}</PageContainer>
    </Wrapper>
  );
};
