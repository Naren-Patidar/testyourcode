import { useEffect, useState } from 'react';
import { Tooltip } from '@scuf/common';
import { AppConstants } from 'utils/app-constants';
import { useUserProfile } from '+store/user-profile';
import { checkAccess } from '../../utility/checkAccess';

interface PermissionsProps {
  allowed?: number[];
  except?: number[];
  type: 'hide' | 'disable';
  children: ({ authorized }: { authorized?: boolean }) => JSX.Element;
}

export const Permissions: React.FC<PermissionsProps> = ({
  allowed,
  except,
  type,
  children,
}) => {
  const {
    profile: { tasks },
  } = useUserProfile();
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const visibility = checkAccess(
      tasks.map((m) => m.taskId),
      allowed,
      except
    );
    setVisible(visibility);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tasks]);
  return (
    <>
      {type === 'disable' &&
        (!visible ? (
          <Tooltip
            content={AppConstants.UNAUTHORIZED_MESSAGE}
            element={
              <div>
                {children({
                  authorized: visible,
                })}
              </div>
            }
            event="hover"
            flowing
            hideOnScroll
            position="top center"
            hoverable
          />
        ) : (
          children({
            authorized: visible,
          })
        ))}
      {type === 'hide' && visible && children({ authorized: visible })}
    </>
  );
};
