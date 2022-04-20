import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';

export interface Data {
  id: number;
  name: string;
  alterEgo: string;
}

export interface IResponse {
  [key: string]: any;
  data: {
    data: Data[];
  };
}

const fetchSuperHeroes = () => {
  return axios.get(`http://localhost:4000/superheroes`);
};

const addSuperHero = (hero: Data) => {
  return axios.post(`http://localhost:4000/superheroes`, hero);
};

const useSuperHeroesData = (
  onSuccess: (data: IResponse) => void,
  onError: (err: Error) => void
) => {
  return useQuery<IResponse, Error>('super-heroes', fetchSuperHeroes, {
    onSuccess,
    onError,
  });
};

const useAddSuperHeroData = () => {
  const queryClient = useQueryClient();
  return useMutation(addSuperHero, {
    /* 일반적인 쿼리 최신화
      onSuccess(data) {
        queryClient.setQueryData('super-heroes', (oldData: any) => {
          return {
            ...oldData,
            data: [...oldData.data, data.data],
          };
        });
      },
      onError(err) {
        console.log(err);
      },
    */

    // Optimistic Update
    async onMutate(newHero) {
      await queryClient.cancelQueries('super-heroes');
      const previousHeroData = queryClient.getQueryData('super-heroes');
      queryClient.setQueryData('super-heroes', (oldData: any) => {
        return {
          ...oldData,
          data: [
            ...oldData.data,
            { ...newHero, id: oldData?.data?.length + 1 },
          ],
        };
      });
      return {
        previousHeroData,
      };
    },
    onError(error, hero, context: any) {
      queryClient.setQueryData('super-heroes', context.previousHeroData);
    },
    onSettled() {
      queryClient.invalidateQueries('super-heroes');
    },
  });
};

export { useSuperHeroesData, useAddSuperHeroData };
