import { useEffect, useState } from 'react';
import { useUserProfile } from '+store/user-profile';
import { checkAccess } from '../utility/checkAccess';

export const useAuthorize = (
  allowedPermissions: number[]
): { authorized: boolean | null } => {
  const {
    profile: { tasks },
  } = useUserProfile();
  const [authorized, setAuthorized] = useState<boolean | null>(null);
  useEffect(() => {
    const visibility = checkAccess(
      tasks.map((m) => m.taskId),
      allowedPermissions
    );
    setAuthorized(visibility);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tasks, allowedPermissions]);
  return { authorized };
};
