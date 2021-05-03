export const checkAccess = (
  permissions: number[],
  allowed?: number[],
  except?: number[]
): boolean => {
  if (except) {
    if (
      except.length > 0 &&
      except.some((item) => permissions.indexOf(item) > -1)
    ) {
      return false;
    }
  }
  if (allowed) {
    if (
      allowed.length > 0 &&
      allowed.some((item) => permissions.indexOf(item) > -1)
    ) {
      return true;
    }
    return false;
  }
  return true;
};
