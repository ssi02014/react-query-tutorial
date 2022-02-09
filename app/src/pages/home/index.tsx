import axios from 'axios';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  useEffect(() => {
    axios
      .get(`https://api.github.com/users/ssi02014`)
      .then((res) => console.log(res));
  }, []);

  return (
    <>
      <ul>
        <li>
          <Link to="/toolkit">툴킷(동기)</Link>
        </li>
        <li>
          <Link to="/query">쿼리</Link>
        </li>
      </ul>
      <div>홈페이지입니다.</div>
    </>
  );
};

export default HomePage;
