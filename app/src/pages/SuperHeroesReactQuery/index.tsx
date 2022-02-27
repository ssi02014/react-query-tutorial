import React, { useCallback } from 'react';
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

  const { isLoading, data, isError, error } = useQuery(
    'super-heroes',
    getSuperHero
  );

  if (isError) {
    return <h2>{'에러'}</h2>;
  }

  return (
    <>
      {isLoading ? (
        <div>로딩중</div>
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
