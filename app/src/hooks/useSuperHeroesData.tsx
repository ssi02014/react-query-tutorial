import axios from 'axios';
import { useMutation, useQuery } from 'react-query';

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
  return useMutation(addSuperHero);
};

export { useSuperHeroesData, useAddSuperHeroData };
