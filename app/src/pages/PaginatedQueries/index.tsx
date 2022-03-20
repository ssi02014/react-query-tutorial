import axios from 'axios';
import React, { useCallback, useState } from 'react';
import { useQuery } from 'react-query';

interface Color {
  id: number;
  label: string;
}

const fetchColors = (pageNum: number) => {
  return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageNum}`);
};

const PaginatedQueriesPage = () => {
  const [pageNum, setPageNum] = useState(1);
  const { isLoading, isError, error, data, isFetching } = useQuery(
    ['colors', pageNum],
    () => fetchColors(pageNum),
    {
      keepPreviousData: true,
    }
  );

  const handlePrevPageButton = useCallback(() => {
    setPageNum((prev) => prev - 1);
  }, []);

  const handleNextPageButton = useCallback(() => {
    setPageNum((prev) => prev + 1);
  }, []);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    const err = error as any;
    return <h2>{err.message}</h2>;
  }

  return (
    <>
      <div>
        {data?.data.map((color: Color) => (
          <div key={color.id}>{color.label}</div>
        ))}
      </div>
      <div>
        <button onClick={handlePrevPageButton} disabled={pageNum === 1}>
          Prev Page
        </button>
        <button onClick={handleNextPageButton} disabled={pageNum === 4}>
          Next Page
        </button>
      </div>
      {isFetching && 'Loading'}
    </>
  );
};

export default PaginatedQueriesPage;
