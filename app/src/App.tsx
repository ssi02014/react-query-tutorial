import React from 'react';
import { Route, Routes } from 'react-router-dom';
import QueryPage from './pages/query';
import ToolkitPage from './pages/toolkit';

function App() {
  return (
    <>
      <Routes>
        <Route path="/toolkit" element={<ToolkitPage />} />
        <Route path="/query" element={<QueryPage />} />
      </Routes>
    </>
  );
}

export default App;
