import styled from 'styled-components';
import { Icon } from '@scuf/common';

const SnackbarContainer = styled.div`
  font-family: 'Honeywell Sans Web', Arial, Helvetica, sans-serif;
  letter-spacing: 0px;
  font-weight: 400;
  font-size: 0.875rem;
  line-height: 1.375rem;
  color: #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 8px;
  background-color: #303030;
  padding: 1rem;
  i {
    font-size: 0.75rem !important;
    color: #fff;
  }
  i:hover {
    color: #d0d0d0;
  }
`;
const CloseIcon = styled.div`
  float: right;
`;

export const Snackbar: React.FC<{ message: string }> = ({ message }) => {
  return (
    <SnackbarContainer>
      <span>{message}</span>
      <CloseIcon>
        <Icon root="common" name="close" size="small" />
      </CloseIcon>
    </SnackbarContainer>
  );
};
