import styled from 'styled-components';
import { Button, Icon } from '@scuf/common';
import { ReactComponent as ErrorIcon } from 'assets/icons/error-icon.svg';

export type BannerType = 'info' | 'success' | 'warning' | 'error';
const BannerTypeColors = {
  info: '#64C3FF',
  success: '#4DBC48',
  warning: '#F77224',
  error: '#D60B13',
};

const BannerContainer = styled.div<{ type?: BannerType }>`
  font-family: 'Honeywell Sans Web', Arial, Helvetica, sans-serif;
  letter-spacing: 0px;
  font-weight: 400;
  font-size: 0.875rem;
  line-height: 1.375rem;
  color: ${(props) =>
    // eslint-disable-next-line no-nested-ternary
    props.type ? (props.type === 'error' ? '#f0f0f0' : '#303030') : '#303030'};
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 0;
  background-color: ${(props) =>
    props.type ? BannerTypeColors[props.type] : '#A0A0A0'};
  padding: 1rem 1.5rem;
  i.close-banner {
    font-size: 1rem !important;
    color: ${(props) =>
      // eslint-disable-next-line no-nested-ternary
      props.type
        ? props.type === 'error'
          ? '#f0f0f0'
          : '#303030'
        : '#303030'};
  }
  i.close-banner:hover {
    color: ${(props) =>
      // eslint-disable-next-line no-nested-ternary
      props.type
        ? props.type === 'error'
          ? '#d0d0d0'
          : '#1c1c1c'
        : '#1c1c1c'};
  }
  .banner-icon {
    padding: 0.5rem 0;
    font-size: 1.25rem !important;
    font-weight: 700 !important;
  }
`;
const BannerTitle = styled.div`
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1.5rem;
`;
const BannerMessage = styled.div`
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5rem;
`;

export const Banner: React.FC<{
  title: string;
  message: string;
  type?: BannerType;
  action?: () => void;
}> = ({ title, message, type, action }) => {
  return (
    <BannerContainer type={type}>
      <div className="d-flex flex-grow-1 align-items-center">
        {/* <i className="icon-Information banner-icon" /> */}
        {/* <Icon
          root="common"
          name="badge-warning"
          exactSize="1.25rem"
          className="banner-icon"
        /> */}
        <ErrorIcon />
        <div className="d-flex ml-4 flex-column">
          <BannerTitle>{title}</BannerTitle>
          <BannerMessage>{message}</BannerMessage>
        </div>
      </div>
      {action && (
        <Button
          type="inline-secondary"
          actionType="button"
          content="Try again"
          onClick={action}
          size="small"
          textTransform={false}
          className="mr-8"
        />
      )}
      <Icon root="common" name="close" size="small" className="close-banner" />
    </BannerContainer>
  );
};
