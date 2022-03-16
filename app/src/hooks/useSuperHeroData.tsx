import { useQuery } from 'react-query';
import axios from 'axios';

const fetchSuperHero = ({ queryKey }: any) => {
  const heroId = queryKey[1];
  return axios.get(`http://localhost:4000/superheroes/${heroId}`);
};
const useSuperHeroData = (heroId: string) => {
  return useQuery(['super-hero', heroId], fetchSuperHero);
};

export default useSuperHeroData;
