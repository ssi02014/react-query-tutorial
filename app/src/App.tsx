import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/home';
import QueryPage from './pages/query';
import ToolkitPage from './pages/toolkit';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/toolkit" element={<ToolkitPage />} />
        <Route path="/query" element={<QueryPage />} />
      </Routes>
    </>
  );
}

export default App;
