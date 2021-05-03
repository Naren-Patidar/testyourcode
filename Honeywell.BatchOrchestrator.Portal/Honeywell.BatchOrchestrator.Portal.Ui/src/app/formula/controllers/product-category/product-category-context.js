/* eslint-disable import/no-cycle */
import React, { createContext } from 'react';
import { ConnectedProductCategoryController } from './product-category-controller';
import { productCategoryInitialState } from '+store/formula/reducers/product-category';

// Create the context
export const productCategoryContextDefaultValue = {
  ...productCategoryInitialState,
};

const ProductCategoryContext = createContext(
  productCategoryContextDefaultValue
);

// Export Provider and Consumer

export const ProductCategoryContextProvider = ProductCategoryContext.Provider;
export const ProductCategoryContextConsumer = ProductCategoryContext.Consumer;

export const withProductCategoryContext = (Component) => (props) => (
  <ConnectedProductCategoryController>
    <ProductCategoryContextConsumer>
      {(ctx) => <Component {...props} {...ctx} />}
    </ProductCategoryContextConsumer>
  </ConnectedProductCategoryController>
);
