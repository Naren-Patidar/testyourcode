import { Breadcrumb, Icon } from '@scuf/common';
import { useHistory } from 'react-router-dom';
import withBreadcrumbs from 'react-router-breadcrumbs-hoc';
import { AppRoutes } from '../../../../routing';

const BreadcrumbList = ({ breadcrumbs }) => {
  const history = useHistory();
  const gotoRoute = (item) => {
    history.push(item.url);
  };
  return (
    <Breadcrumb>
      {breadcrumbs.map(({ match, name, key, param }, index) => {
        if (breadcrumbs.length > 2) {
          if (index === breadcrumbs.length - 1) {
            return name ? (
              <Breadcrumb.Item key={match.url}>{name}</Breadcrumb.Item>
            ) : null;
          }
          if (index === 0 && key === '/') {
            return (
              // <Breadcrumb.Item
              //   key={match.url}
              //   onClick={(item) => gotoRoute(match)}
              // >
              //   <div
              //     style={{
              //       paddingRight: '0.25rem',
              //       display: 'flex',
              //       alignItems: 'center',
              //     }}
              //   >
              //     <Icon name="globe" root="common" size="small" />
              //   </div>
              //   Home
              // </Breadcrumb.Item>
              null
            );
          }
          if (param) {
            return <Breadcrumb.Item key={match.url}>{name}</Breadcrumb.Item>;
          }
          return (
            <Breadcrumb.Item
              key={match.url}
              onClick={(item) => gotoRoute(match)}
            >
              {name}
            </Breadcrumb.Item>
          );
        }
        return null;
      })}
    </Breadcrumb>
  );
};
export default withBreadcrumbs(Object.values(AppRoutes))(BreadcrumbList);
