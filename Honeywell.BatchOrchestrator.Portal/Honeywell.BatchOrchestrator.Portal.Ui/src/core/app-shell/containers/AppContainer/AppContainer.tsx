import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  ContentOutlet,
  FooterBar,
  HeaderAppBar,
  NavigationMenu,
} from 'core/app-shell/components';
import { routes, Router } from 'routing';
import { useTheme } from 'theme';
import { useInjectReducer } from 'utils/@reduxjs';
import { useDispatch, useSelector } from 'react-redux';
import { lazyLoad } from 'utils/loadable';
import { useOnlineStatus } from 'utils/hooks';
import { toastr } from 'shared/toastr';
import { sliceKey, reducer, actions } from '+store/app-shell/slice';
import { selectSidebarOpen } from '+store/app-shell/selectors';
import { useUserProfile } from '+store/user-profile';
import { useAppShellFacade } from '+store/app-shell';

const Authenticate = lazyLoad(
  () => import('../Authenticate/Authenticate'),
  (view) => view.AuthenticateView
);

export const AppContainer: React.FC = () => {
  // useInjectReducer({ key: sliceKey, reducer });
  // const navigationMenuOpen = useSelector(selectSidebarOpen);
  // const dispatch = useDispatch();
  const onlineStatus = useOnlineStatus();
  const {
    sidebarOpen,
    setSidebar,
    toggleSidebar,
    fetchAdvancedBatchLicense,
  } = useAppShellFacade();
  // const [navigationMenuOpen, toggleNavigation] = useState(false);
  const [theme, changeTheme] = useTheme();

  const history = useHistory();
  const handleDrawerOpenClose = useCallback(() => {
    toggleSidebar();
    // toggleNavigation(!navigationMenuOpen);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const closeSidebar = useCallback(() => {
    setSidebar(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchAdvancedBatchLicense();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (!onlineStatus) {
      toastr.banner('No internet', 'Check your internet connection', 'error');
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onlineStatus]);

  return (
    <Authenticate>
      <HeaderAppBar
        title="Production Portal"
        drawerOpen={handleDrawerOpenClose}
        theme={theme}
        themeChange={changeTheme}
      />
      <NavigationMenu open={sidebarOpen} closeSideBar={closeSidebar}>
        <ContentOutlet>
          <Router routes={routes} />
        </ContentOutlet>
      </NavigationMenu>
      {/* <FooterBar /> */}
    </Authenticate>
  );
};
