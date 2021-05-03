import { Footer } from '@scuf/common';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const FooterBar: React.FC = () => {
  return (
    <Footer>
      <Footer.Item href="#">Terms & Conditions</Footer.Item>
      <Footer.Item href="#">Privacy Policy</Footer.Item>
    </Footer>
  );
};
