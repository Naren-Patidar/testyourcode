import { Button } from '@scuf/common';
import { Children, Component, useEffect } from 'react';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import { toastr } from '../../shared/toastr';
import { ErrorLogService } from './error-log-service';

const ErrorFallback: React.FC<FallbackProps> = ({
  error,
  resetErrorBoundary,
}) => {
  useEffect(() => {
    // toastr.banner(error.name, error.message, 'error', resetErrorBoundary);
    toastr.banner('Error', 'Something went wrong', 'error', resetErrorBoundary);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
};

const ErrorHandler = (error: Error) => {
  ErrorLogService.logClientError({
    name: error.name,
    message: error.message,
    stack: error.stack,
  });
};

export const ErrorBoundaryContainer: React.FC = ({ children }) => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onError={ErrorHandler}>
      {children}
    </ErrorBoundary>
  );
};
