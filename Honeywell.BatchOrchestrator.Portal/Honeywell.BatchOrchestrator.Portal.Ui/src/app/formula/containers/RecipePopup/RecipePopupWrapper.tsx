import { useState } from 'react';
import { API_URL } from 'utils/Settings';
import RecipePopup from './RecipePopup';

export const RecipePopupWrapper = (props) => {
  const [selected, setSelected] = useState(null);
  const [showFormulaSet, setShowFormulaSet] = useState(false);
  const [showCreateFormulaSet, setShowCreateFormulaSet] = useState(false);
  const [productName, setProductName] = useState('');
  const [imported, setImported] = useState(false);
  const url = API_URL;
  return (
    <RecipePopup
      {...props}
      showCreateFormulaSet
      setShowCreateFormulaSet={setShowCreateFormulaSet}
      setSelected={setSelected}
      setShowFormulaSet={setShowFormulaSet}
      setProductName={setProductName}
      setImported={setImported}
      url={url}
    />
  );
};
