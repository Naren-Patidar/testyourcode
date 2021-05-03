export const errorHandler = (error = null) => {
  if (error) {
    const { status, statusText } = error;
    if (status === 503) {
      return {
        message:
          'EPKS service is down/ not responding, please check the configuration and retry.',
        status,
      };
    }
    if (status === 500) {
      return {
        message: 'Something went wrong, please try again.',
        status,
      };
    }
    if (status === 409) {
      return {
        message: 'FormulaSet/Formula name already exists.',
        status,
      };
    }
    if (status === 403) {
      return {
        message: 'You do not have permission to perform this action.',
        status,
      };
    }
    if (status === 400) {
      return { message: 'Bad request.', status };
    }
    return { message: statusText, status };
  }
  return {
    message: 'You do not have permission to perform this action.',
    status: 403,
  };
};
