import { useQueryErrorResetBoundary } from 'react-query';
import { ErrorBoundary } from 'react-error-boundary';

interface Props {
  children: React.ReactNode;
}
const QueryErrorBoundary = ({ children }: Props) => {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <ErrorBoundary
      onReset={reset}
      fallbackRender={({ resetErrorBoundary }) => (
        <div>
          Error!!{' '}
          <button onClick={() => resetErrorBoundary()}>Try again</button>
        </div>
      )}>
      {children}
    </ErrorBoundary>
  );
};

export default QueryErrorBoundary;
