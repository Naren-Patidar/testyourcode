/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable import/no-cycle */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { AppSettingsContextProvider } from './app-settings-context';
import {
  getAppSettingsList,
  updateAppsettingsChanges,
} from '../../../../+store/app-settings/actions/index';
// import { deleteFormulaSet, SaveSelectionForApplyChanges, getModifiedListOfParameters, getExperionModificationFormulaListByFormulaSetId, applyExperionModificationChanges } from '../../actions/experion-modification';

export class AppSettingsController extends Component {
  render() {
    const {
      children,
      settingList,
      getAppSettingsList,
      updateAppsettingsChanges,
    } = this.props;

    return (
      <AppSettingsContextProvider
        value={{
          settingList,
          getAppSettingsList,
          updateAppsettingsChanges,
        }}
      >
        {children}
      </AppSettingsContextProvider>
    );
  }
}

AppSettingsController.propTypes = {
  children: PropTypes.element,
  getModifiedListOfParameters: PropTypes.array,
  getAppSettingsList: PropTypes.func,
  updateAppsettingsChanges: PropTypes.func,
};

const mapStateToProps = ({ appSettings }) => ({ ...appSettings });

const mapDispatchToProps = {
  getAppSettingsList,
  updateAppsettingsChanges,
};

export const ConnectedAppSettingsController = connect(
  mapStateToProps,
  mapDispatchToProps
)(AppSettingsController);
