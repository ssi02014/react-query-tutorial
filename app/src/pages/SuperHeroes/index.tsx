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

  const getSuperHero = useCallback(async () => {
    const response = await getAPI('http://localhost:4000/superheroes');
    setIsLoading(false);
    setData(response);
  }, []);

  useEffect(() => {
    getSuperHero();
  }, [getSuperHero]);

  return (
    <>
      {isLoading ? (
        <div>로딩중</div>
      ) : (
        <div>
          {data.map((hero) => (
            <div key={hero.id}>{hero.name}</div>
          ))}
        </div>
      )}
    </>
  );
};

export default SuperHeroPage;
