import styled from 'styled-components';

interface BlurredBackdropProps {
  readonly show: boolean;
}
export const BlurredBackdrop = styled.div<BlurredBackdropProps>`
  display: ${(props) => (props.show ? 'block' : 'none')};
  backdrop-filter: blur(6px); // This be the blur
  position: fixed;
  top: 0em !important;
  left: 0em !important;
  width: 100%;
  height: 100%;
  z-index: 999;
`;
