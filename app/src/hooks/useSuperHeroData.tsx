import { useQuery, useQueryClient } from 'react-query';
import axios from 'axios';

interface Hero {
  id: number;
  alterEgo: string;
  name: string;
}

const fetchSuperHero = ({ queryKey }: any) => {
  const heroId = queryKey[1];
  return axios.get(`http://localhost:4000/superheroes/${heroId}`);
};

const useSuperHeroData = (heroId: string) => {
  const queryClient = useQueryClient();
  return useQuery(['super-hero', heroId], fetchSuperHero, {
    initialData: () => {
      const queryData = queryClient.getQueryData('super-heroes') as any;
      const hero = queryData?.data?.find(
        (hero: Hero) => hero.id === parseInt(heroId)
      );

      if (hero) return { data: hero };
      return undefined;
    },
  });
};

export default useSuperHeroData;
