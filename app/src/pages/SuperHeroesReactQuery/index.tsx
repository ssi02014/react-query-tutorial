import React, { useCallback } from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';

interface Data {
  id: number;
  name: string;
  alterEgo: string;
}

const SuperHerosReactQueryPage = () => {
  const getSuperHero = useCallback(() => {
    return axios.get('http://localhost:4000/superheroes');
  }, []);

  const onSuccess = useCallback((data) => {
    console.log('Success', data);
  }, []);

  const onError = useCallback((err) => {
    console.log('Error', err);
  }, []);

  const { isLoading, isFetching, data, refetch } = useQuery(
    'super-heroes',
    getSuperHero,
    {
      staleTime: 300,
      cacheTime: 5000,
      onSuccess,
      onError,
    }
  );

  const handleClickRefetch = useCallback(() => {
    refetch();
  }, [refetch]);

  return (
    <>
      {isLoading || isFetching ? (
        <div>로딩중...</div>
      ) : (
        <div>
          {data?.data.map((hero: Data) => (
            <div key={hero.id}>
              <Link to={`/super-hero/${hero.id}`}>{hero.name}</Link>
            </div>
          ))}
          <button onClick={handleClickRefetch}>Fetch Heroes</button>
        </div>
      )}
    </>
  );
};

export default SuperHerosReactQueryPage;
