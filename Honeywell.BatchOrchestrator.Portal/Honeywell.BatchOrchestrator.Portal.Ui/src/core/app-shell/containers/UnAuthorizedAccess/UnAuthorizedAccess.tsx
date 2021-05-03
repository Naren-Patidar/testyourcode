/* eslint-disable react/void-dom-elements-no-children */
import { useEffect } from 'react';
import styled from 'styled-components';
import authorization from '../../../../assets/images/authorization.png';
import './UnAuthorizedAccess.scss';

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  justify-content: center;
  /* height: 85vh; */
  padding: 25% 0 0 10%;
`;
const Header = styled.div`
  display: flex;
  font-size: 40px;
  font-weight: 600;
`;
const Message = styled.div`
  display: flex;
  font-size: 24px;
  font-weight: 600;
  margin-top: 4rem;
`;
export const UnAuthorizedAccess: React.FC<{
  title?: string;
  message?: string;
}> = ({ title, message }) => {
  useEffect(() => {
    document.body.classList.add('unauthorized-access');
    return () => {
      document.body.classList.remove('unauthorized-access');
    };
  }, []);
  return (
    <MessageContainer>
      <Header>{title ?? 'No authorization'}</Header>
      <Message>
        {message ?? 'We are sorry, it looks like you are not authorized.'}
      </Message>
    </MessageContainer>
  );
};
