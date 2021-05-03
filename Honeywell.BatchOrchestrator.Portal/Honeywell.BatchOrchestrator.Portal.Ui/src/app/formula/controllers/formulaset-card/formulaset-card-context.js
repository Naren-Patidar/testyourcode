/* eslint-disable import/no-cycle */
import React, { createContext } from 'react';
import { ConnectedFormulaSetCardController } from './formulaset-card-controller';
// import { productCategoryInitialState } from '../../reducer/product-category';

// // Create the context
// export const formulaSetCardContextDefaultValue = {
//   ...productCategoryInitialState,
//  };

const FormulaSetCardContext = createContext();

// Export Provider and Consumer

export const FormulaSetCardContextProvider = FormulaSetCardContext.Provider;
export const FormulaSetCardContextConsumer = FormulaSetCardContext.Consumer;

export const withFormulaSetCardContext = (Component) => (props) => (
  <ConnectedFormulaSetCardController>
    <FormulaSetCardContextConsumer>
      {(ctx) => <Component {...props} {...ctx} />}
    </FormulaSetCardContextConsumer>
  </ConnectedFormulaSetCardController>
);
