/* eslint-disable react/require-default-props */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable import/no-cycle */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormulaSetCardContextProvider } from './formulaset-card-context';
import {
  updateFavoriteFlagFormulaSet,
  getFormulaSets,
} from '+store/formula/actions/formulaSets';

export class FormulaSetCardController extends Component {
  render() {
    const {
      children,
      updateFavoriteFlagFormulaSet,
      getFormulaSets,
    } = this.props;

    return (
      <FormulaSetCardContextProvider
        value={{
          updateFavoriteFlagFormulaSet,
          getFormulaSets,
        }}
      >
        {children}
      </FormulaSetCardContextProvider>
    );
  }
}

FormulaSetCardController.propTypes = {
  children: PropTypes.element,
  updateFavoriteFlagFormulaSet: PropTypes.func,
  getFormulaSets: PropTypes.func,
};

const mapStateToProps = ({ formulasetcard }) => ({ ...formulasetcard });

const mapDispatchToProps = {
  updateFavoriteFlagFormulaSet,
  getFormulaSets,
};

export const ConnectedFormulaSetCardController = connect(
  mapStateToProps,
  mapDispatchToProps
)(FormulaSetCardController);
