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
    return axios.get('http://localhost:4000/superheroes   ');
  }, []);

  const { isLoading, isFetching, data, isError, error } = useQuery(
    'super-heroes',
    getSuperHero,
    {
      // refetchInterval: 20000,
      refetchIntervalInBackground: true,
    }
  );
  console.log(isLoading, isFetching);
  return (
    <>
      {isLoading ? (
        <div>로딩중...</div>
      ) : (
        <div>
          {data?.data.map((hero: Data) => (
            <div key={hero.id}>{hero.name}</div>
          ))}
        </div>
      )}
    </>
  );
};

export default SuperHerosReactQueryPage;
