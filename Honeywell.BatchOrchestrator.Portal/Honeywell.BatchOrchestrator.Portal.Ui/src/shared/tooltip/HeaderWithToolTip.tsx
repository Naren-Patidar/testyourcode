import { Tooltip } from '@scuf/common';
import React from 'react';

interface IHeaderWithToolTip {
  contentOfToolTip: string;
  element: JSX.Element;
}

export const HeaderWithToolTip: React.FC<IHeaderWithToolTip> = ({
  contentOfToolTip,
  element,
}) => (
  <Tooltip
    content={contentOfToolTip}
    element={element}
    position="top center"
    event="hover"
    hoverable
  />
);
