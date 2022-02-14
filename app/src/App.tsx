import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/home';
import ParamPage from './pages/params';
import QueryPage from './pages/query';
import ToolkitPage from './pages/toolkit';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/toolkit" element={<ToolkitPage />} />
        <Route path="/query" element={<QueryPage />} />
        <Route path="/param" element={<ParamPage />} />
      </Routes>
    </>
  );
}

export default App;
