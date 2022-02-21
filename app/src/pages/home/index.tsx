import React, { useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppContext } from '../../App';
import Button from '../../components/Button';
import { fetchGithubUserData } from '../../features/github/githubSlice';

const HomePage = () => {
  const user = useContext(AppContext);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGithubUserData('ssi02014'));
  }, [dispatch]);

  return (
    <>
      <div>홈페이지입니다.</div>
      <p>{user.name}</p>
      <p>{user.job}</p>
      <Button />
      <Button.Red />
    </>
  );
};

export default HomePage;
