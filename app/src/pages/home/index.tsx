import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Button from '../../components/Button';
import { fetchGithubUserData } from '../../features/github/githubSlice';

const HomePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGithubUserData('ssi02014'));
  }, [dispatch]);

  return (
    <>
      <div>홈페이지입니다.</div>
      <Button />
      <Button.Red />
    </>
  );
};

export default HomePage;
