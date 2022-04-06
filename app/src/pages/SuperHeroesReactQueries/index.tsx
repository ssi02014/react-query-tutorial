import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  useSuperHeroesData,
  useAddSuperHeroData,
  Data,
  IResponse,
} from '../../hooks/useSuperHeroesData';

const SuperHerosReactQueryPage = () => {
  const [name, setName] = useState('');
  const [alterEgo, setAlterEgo] = useState('');

  const onSuccess = useCallback((data: IResponse) => {
    console.log('Success', data);
  }, []);

  const onError = useCallback((err: Error) => {
    console.log('Error', err);
  }, []);

  const { isLoading, isFetching, data, refetch } = useSuperHeroesData(
    onSuccess,
    onError
  );

  const { mutate } = useAddSuperHeroData();

  const onChangeInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;

      if (name === 'name') setName(value);
      else setAlterEgo(value);
    },
    []
  );

  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (Array.isArray(data?.data)) {
        const ids = data?.data.map((el) => el.id) as number[];
        const max = Math.max(...ids);
        const hero = { id: max + 1, name, alterEgo };
        mutate(hero);
      }
    },
    [data?.data, name, alterEgo, mutate]
  );

  const handleClickRefetch = useCallback(() => {
    refetch();
  }, [refetch]);

  return (
    <>
      {isLoading || isFetching ? (
        <div>로딩중...</div>
      ) : (
        <>
          <form onSubmit={onSubmit}>
            <input
              name="name"
              type="text"
              onChange={onChangeInput}
              value={name}
            />
            <input
              name="alterEgo"
              type="text"
              onChange={onChangeInput}
              value={alterEgo}
            />
            <button>Add Hero</button>
          </form>
          <div>
            {Array.isArray(data?.data) &&
              data?.data.map((hero: Data) => (
                <div key={hero.id}>
                  <Link to={`/super-hero/${hero.id}`}>{hero.name}</Link>
                </div>
              ))}
            <button onClick={handleClickRefetch}>Fetch Heroes</button>
          </div>
        </>
      )}
    </>
  );
};

export default SuperHerosReactQueryPage;
