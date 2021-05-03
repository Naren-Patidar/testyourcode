/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Icon, List, SidebarLayout, VerticalMenu, Tooltip } from '@scuf/common';
import { Children, useCallback, useEffect, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
// eslint-disable-next-line import/named
import { NavigationItems } from 'routing/navigation-menu';
import styled from 'styled-components/macro';
import { AppConstants } from 'utils';
import { useClickInside } from 'utils/hooks';
import { checkAccess } from 'core/authentication/utility/checkAccess';
import { useAppShellFacade } from '+store/app-shell';
import { useUserProfile } from '+store/user-profile';
import { BlurredBackdrop } from '../BlurredBackdrop/BlurredBackdrop';

const Menu = styled.div`
  padding: 0.5rem;
`;
const MenuHeader = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.875rem;
  padding: 0.25rem 0.75rem;
  margin: 0.75rem 0 -2rem 0.5rem;
`;
const MenuItemSection = styled.div`
  font-family: 'Honeywell Sans Web', Arial, Helvetica, sans-serif;
  letter-spacing: 0.125rem;
  font-weight: 400;
  font-size: 0.75rem;
  font-weight: 700;
  color: #f0f0f0;
  line-height: 1rem;
  padding: 0.25rem 0.75rem;
  margin: 2.5rem 0 1rem 0.5rem; // 1.75rem 0 0.75rem 0.5rem;
  text-transform: uppercase;
`;
const MenuLink = styled(NavLink)`
  display: flex;
  text-decoration: none !important;
  font-family: 'Honeywell Sans Web', Arial, Helvetica, sans-serif;
  letter-spacing: 0.0625rem;
  font-weight: 400;
  font-size: 1rem;
  color: #d0d0d0 !important;
  line-height: 1.5rem;
  padding: 0.25rem 0.75rem;
  margin-top: 0.5rem;
  margin-left: 0.5rem;
  &.active {
    color: #f0f0f0 !important;
    font-weight: 600;
    border-left: 2px solid #1792e5;
  }
  &:hover {
    color: #f0f0f0 !important;
  }
`;
const DisabledMenuLink = styled.span`
  display: flex;
  text-decoration: none !important;
  font-family: 'Honeywell Sans Web', Arial, Helvetica, sans-serif;
  letter-spacing: 0.0625rem;
  font-weight: 400;
  font-size: 1rem;
  color: #808080 !important;
  line-height: 1.5rem;
  padding: 0.25rem 0.75rem;
  margin-top: 0.5rem;
  margin-left: 0.5rem;
`;
const MenuFooter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: flex-end;
  flex: 1 1 auto;
  padding: 0.5rem;
`;
const AppVersion = styled.div`
  font-family: 'Honeywell Sans Web', Arial, Helvetica, sans-serif;
  letter-spacing: 0.0625rem;
  font-weight: 400;
  font-size: 1rem;
  color: #d0d0d0;
  line-height: 1rem;
  padding: 0.25rem 0.75rem;
  margin: 2.5rem 0 1rem 0.5rem; // 1.75rem 0 0.75rem 0.5rem;
  text-transform: capitalize;
`;
const IconXS = styled(Icon)`
  font-size: 0.75rem !important;
`;
// interface BlurredBackdropProps {
//   readonly show: boolean;
// }
// const BlurredBackdrop = styled.div<BlurredBackdropProps>`
//   display: ${(props) => (props.show ? 'block' : 'none')};
//   backdrop-filter: blur(6px); // This be the blur
//   position: fixed;
//   top: 0em !important;
//   left: 0em !important;
//   width: 100%;
//   height: 100%;
//   z-index: 999;
// `;
const { Sidebar } = SidebarLayout;
interface NavProps {
  // version: string;
  open: boolean;
  closeSideBar: () => void;
}

export const NavigationMenu: React.FC<NavProps> = ({
  open,
  closeSideBar,
  children,
}) => {
  const {
    version,
    fetchVersion,
    advancedBatchLicense,
    fetchAdvancedBatchLicense,
  } = useAppShellFacade();
  const {
    profile: { roles },
  } = useUserProfile();
  const backdropRef = useRef(null);
  useClickInside(backdropRef, closeSideBar);
  useEffect(() => {
    if (!version) {
      fetchVersion();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [version]);
  useEffect(() => {
    fetchAdvancedBatchLicense();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SidebarLayout collapsed={!open} className="app-sidebar" noIcons>
      <Sidebar className="d-flex overflow-auto">
        <Menu>
          <MenuHeader>
            <div />
            <div className="cursor-pointer" onClick={closeSideBar}>
              <IconXS name="close" root="common" />
            </div>
          </MenuHeader>
          {NavigationItems.map((item) =>
            checkAccess(
              roles.map((m) => m.roleId),
              item.permissions
            ) ? (
              <div key={item.header}>
                <MenuItemSection>{item.header}</MenuItemSection>
                {item.children.map((childItem) =>
                  checkAccess(
                    roles.map((m) => m.roleId),
                    childItem.permissions
                  ) ? (
                    childItem.licenseRequired && !advancedBatchLicense ? (
                      <Tooltip
                        content={AppConstants.LICENSE_REQUIRED_MESSAGE}
                        element={
                          <DisabledMenuLink key={childItem.name}>
                            <Icon
                              name="badge-important"
                              root="common"
                              size="small"
                              className="mr-2 pt-1"
                            />
                            {childItem.desc}
                          </DisabledMenuLink>
                        }
                        position="top center"
                        event="hover"
                        hoverable
                      />
                    ) : (
                      <MenuLink
                        key={childItem.name}
                        to={
                          childItem.state
                            ? {
                                pathname: childItem.route,
                                state: childItem.state,
                              }
                            : childItem.route
                        }
                        activeClassName="active"
                        onClick={closeSideBar}
                      >
                        {childItem.desc}
                      </MenuLink>
                    )
                  ) : null
                )}
              </div>
            ) : null
          )}
        </Menu>
        <MenuFooter>
          <AppVersion>Version: {version}</AppVersion>
        </MenuFooter>
      </Sidebar>
      <SidebarLayout.Content>
        {Children.only(children)}
        {open && <BlurredBackdrop show={open} ref={backdropRef} />}
      </SidebarLayout.Content>
    </SidebarLayout>
  );
};
