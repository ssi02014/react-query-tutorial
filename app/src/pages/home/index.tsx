import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  useEffect(() => {
    fetch(`https://api.github.com/users/ssi02014`)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
      });
  }, []);

  return (
    <>
      <Link to="/toolkit">툴킷(동기)</Link>
      <Link to="/query">쿼리</Link>
      <div>홈페이지입니다.</div>
    </>
  );
};

export default HomePage;
