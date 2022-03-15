import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';

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

  const { isLoading, isFetching, data, isError, error, refetch } = useQuery(
    'super-heroes',
    getSuperHero,
    {
      onSuccess,
      onError,
      select(data) {
        const superHeroNames = data.data.map((hero: Data) => hero.name);
        return superHeroNames;
      },
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
          {/* {data?.data.map((hero: Data) => (
            <div key={hero.id}>{hero.name}</div>
          ))} */}
          <button onClick={handleClickRefetch}>Fetch Heroes</button>
          {data.map((heroName: string, idx: number) => (
            <div key={idx}>{heroName}</div>
          ))}
        </div>
      )}
    </>
  );
};

export default SuperHerosReactQueryPage;
