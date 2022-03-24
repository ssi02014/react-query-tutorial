import axios from 'axios';
import { useMutation, useQuery } from 'react-query';
import customAxios from '../utils/axios';

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
  return customAxios.get(`http://localhost:4000/superheroes`, { cache: true });
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
  return useMutation(addSuperHero, {
    onSuccess(data) {
      console.log(data);
    },
    onError(err) {
      console.log(err);
    },
  });
};

export { useSuperHeroesData, useAddSuperHeroData };
