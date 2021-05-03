import React, { useEffect, useState } from 'react';
import { API_URL } from '../../../../utils/Settings';
import CreateProduct from './CreateProduct';

const CreateFormulaIndex = (props) => {
  const [showCreateProduct, setShowCreateProduct] = useState(false);
  const [showFormulas, setShowFormulas] = useState(false);
  const [comment, setComment] = useState('');
  const [productMR, setProductMR] = useState({});
  const [showFormulaSets, setShowFormulaSets] = useState(false);
  const url = API_URL;
  return (
    <div>
      <CreateProduct
        showCreateProduct
        setShowCreateProduct={setShowCreateProduct}
        productMR={productMR}
        setShowFormulaSets={setShowFormulaSets}
        setShowFormulas={setShowFormulas}
        setComment={setComment}
        url={url}
      />
    </div>
  );
};
export default CreateFormulaIndex;
