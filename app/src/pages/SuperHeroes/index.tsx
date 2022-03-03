import React, { useState, useCallback, useEffect } from 'react';
import { getAPI } from '../../utils/axios';

interface Data {
  id: number;
  name: string;
  alterEgo: string;
}
const SuperHeroPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<Data[]>([]);
  const [error, setError] = useState('');

  const getSuperHero = useCallback(async () => {
    try {
      const response = await getAPI('http://localhost:4000/superheroes');
      setIsLoading(false);
      setData(response);
    } catch (err: any) {
      setIsLoading(false);
      setError(err.message);
    }
  }, []);

  useEffect(() => {
    getSuperHero();
  }, [getSuperHero]);

  if (error) {
    return <h2>{error}</h2>;
  }
  return (
    <>
      {isLoading ? (
        <div>로딩중</div>
      ) : (
        <div>
          {data?.map((hero) => (
            <div key={hero.id}>{hero.name}</div>
          ))}
        </div>
      )}
    </>
  );
};

export default SuperHeroPage;
