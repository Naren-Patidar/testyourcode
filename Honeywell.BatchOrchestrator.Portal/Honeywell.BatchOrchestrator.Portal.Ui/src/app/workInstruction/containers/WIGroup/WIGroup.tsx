import { WorkInstruction } from 'app/workInstruction/models';
import React from 'react';
import WICard from '../WICard/WICard';
import WIGroupHeader from '../WIGroupHeader/WIGroupHeader';

import './WIGroup.scss';

const WIGroup: React.FC<{
  heading: string;
  showButton: boolean;
  items: WorkInstruction[];
}> = ({ heading, showButton, items }) => {
  return (
    <div className={`wi-group ${heading.toLowerCase()}`}>
      <WIGroupHeader
        heading={heading}
        showButton={showButton}
        numberOfItems={items.length}
      />
      <div className="wi-cards">
        {!!items &&
          !!items.length &&
          items.map((item: WorkInstruction) => {
            return <WICard key={item.id} ewiItem={item} />;
          })}
      </div>
    </div>
  );
};

export default WIGroup;
