import React, { createContext } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import HomePage from './pages/home';
import ParamPage from './pages/params';
import QueryPage from './pages/SuperHeroesReactQuery';
import SuperHeroes from './pages/SuperHeroes';
import ToolkitPage from './pages/toolkit';

const queryClient = new QueryClient();

export const AppContext = createContext<any>(undefined);

function App() {
  const user = {
    name: '전민재',
    job: '프로그래머',
  };
  return (
    <AppContext.Provider value={user}>
      <QueryClientProvider client={queryClient}>
        <ul>
          <li>
            <Link to="/">홈</Link>
          </li>
          <li>
            <Link to="/toolkit">툴킷(동기)</Link>
          </li>
          <li>
            <Link to="/param">파라미터</Link>
          </li>
          <li>
            <Link to="/superHero">슈퍼히어로</Link>
          </li>
          <li>
            <Link to="/query">슈퍼히어로 쿼리</Link>
          </li>
        </ul>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/toolkit" element={<ToolkitPage />} />
          <Route path="/query" element={<QueryPage />} />
          <Route path="/param" element={<ParamPage />} />
          <Route path="/superHero" element={<SuperHeroes />} />
        </Routes>
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      </QueryClientProvider>
    </AppContext.Provider>
  );
}

export default App;
