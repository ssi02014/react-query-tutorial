import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '../../components/Button';
import { fetchGithubUserData } from '../../features/github/githubSlice';

const HomePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGithubUserData('ssi02014'));
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
      <Button />
      <Button.red />
    </>
  );
};

export default HomePage;
