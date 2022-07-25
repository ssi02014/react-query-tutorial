import React, { createContext } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import HomePage from './pages/home';
import QueryPage from './pages/SuperHeroesReactQueries';
import SuperHeroes from './pages/SuperHeroes';
import ToolkitPage from './pages/toolkit';
import RQSuperHeroDetailPage from './pages/SuperHeroDetailQueries';
import ParallelQueriesPage from './pages/ParallelQueries';
import DynamicParallelPage from './pages/DynamicParallelQueries';
import DependantQueriesPage from './pages/DependantQueries';
import PaginatedQueriesPage from './pages/PaginatedQueries';
import InfiniteQueries from './pages/InfiniteQueries';
import QueryErrorBoundary from './components/ErrorBoundary';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      useErrorBoundary: true,
    },
  },
});

export const AppContext = createContext<any>(undefined);

function App() {
  const user = {
    name: '전민재',
    job: '프로그래머',
  };
  return (
    <AppContext.Provider value={user}>
      <QueryClientProvider client={queryClient}>
        <QueryErrorBoundary>
          <ul>
            <li>
              <Link to="/">홈</Link>
            </li>
            <li>
              <Link to="/toolkit">툴킷(동기)</Link>
            </li>
            <li>
              <Link to="/super-hero">슈퍼히어로(Normal)</Link>
            </li>
            <li>
              <Link to="/query">슈퍼히어로(RQ)</Link>
            </li>
            <li>
              <Link to="/parallel">parallel(RQ)</Link>
            </li>
            <li>
              <Link to="/dynamic-parallel">Dynamic Parallel(RQ)</Link>
            </li>
            <li>
              <Link to="/dependant-queries">Dependant queries(RQ)</Link>
            </li>
            <li>
              <Link to="/paginated-queries">Paginated queries(RQ)</Link>
            </li>
            <li>
              <Link to="/infinite-queries">Infinite queries(RQ)</Link>
            </li>
          </ul>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/toolkit" element={<ToolkitPage />} />
            <Route path="/query" element={<QueryPage />} />
            <Route path="/super-hero" element={<SuperHeroes />} />
            <Route
              path="/super-hero/:heroId"
              element={<RQSuperHeroDetailPage />}
            />
            <Route path="/parallel" element={<ParallelQueriesPage />} />
            <Route
              path="/dynamic-parallel"
              element={<DynamicParallelPage heroIds={[1, 3]} />}
            />
            <Route
              path="/dependant-queries"
              element={<DependantQueriesPage email="ssi02014@naver.com" />}
            />
            <Route
              path="/paginated-queries"
              element={<PaginatedQueriesPage />}
            />
            <Route path="/infinite-queries" element={<InfiniteQueries />} />
          </Routes>
          <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
        </QueryErrorBoundary>
      </QueryClientProvider>
    </AppContext.Provider>
  );
}

export default App;
