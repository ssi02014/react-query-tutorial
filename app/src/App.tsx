import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import QueryPage from './pages/query';
import ToolkitPage from './pages/toolkit';

function App() {
  useEffect(() => {
    fetch(`https://api.github.com/users/ssi02014`)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
      });
  }, []);
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
