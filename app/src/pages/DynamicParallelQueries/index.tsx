import axios from 'axios';
import React from 'react';
import { useQueries } from 'react-query';

interface Props {
  heroIds: number[];
}

const fetchSuperHero = (heroId: number) => {
  return axios.get(`http://localhost:4000/superheroes/${heroId}`);
};

const DynamicParallelPage = ({ heroIds }: Props) => {
  const queryResults = useQueries(
    heroIds.map((id) => ({
      queryKey: ['super-hero', id],
      queryFn: () => fetchSuperHero(id),
    }))
  );

  return <div></div>;
};

export default DynamicParallelPage;
