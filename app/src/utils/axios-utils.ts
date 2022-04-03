import axios, { AxiosResponse } from 'axios';

const client = axios.create({ baseURL: 'http://localhost:4000' });

export const request = ({ ...options }) => {
  client.defaults.headers.common.Authorization = 'minjae';
  const onSuccess = (response: AxiosResponse) => response;
  const onError = (error: any) => error.response;

  return client(options).then(onSuccess).catch(onError);
};
