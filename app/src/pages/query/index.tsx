import React, { useCallback } from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';
import { getAPI } from '../../utils/axios';

interface Data {
  id: number;
  name: string;
  alterEgo: string;
}

const QueryPage = () => {
  const getSuperHero = useCallback(() => {
    return axios.get('http://localhost:4000/superheroes');
  }, []);

  const { isLoading, data } = useQuery('super-heroes', getSuperHero);

  const results = useQuery('super-heroes', () => {
    return getAPI('http://localhost:4000/superheroes');
  });

  console.log(data);
  console.log(results);

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

export default QueryPage;
