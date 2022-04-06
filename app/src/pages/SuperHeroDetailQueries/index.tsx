import React from 'react';
import { useParams } from 'react-router-dom';
import useSuperHeroData from '../../hooks/useSuperHeroData';

const RQSuperHeroDetailPage = () => {
  const { heroId } = useParams();
  const { isLoading, data, isError, error } = useSuperHeroData(
    heroId as string
  );

  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  if (isError) {
    const message = error as any;
    return <h2>{message}</h2>;
  }
  return (
    <div>
      {data?.data.name} - {data?.data.alterEgo}
    </div>
  );
};

export default RQSuperHeroDetailPage;
