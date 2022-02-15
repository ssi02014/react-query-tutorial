import React, { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getAPI, postAPI } from '../../utils/axios';

const ParamPage = () => {
  const location = useLocation();
  const [data, setData] = useState<any>();
  const [postData, setPostData] = useState<any>();

  const get = useCallback(async () => {
    const response = await getAPI('https://jsonplaceholder.typicode.com/posts');
    setData(response);
  }, []);

  const post = useCallback(async () => {
    const data = { id: 1, name: 'minjae' };
    const response = await postAPI(
      'https://jsonplaceholder.typicode.com/posts',
      data
    );
    setPostData(response);
  }, []);

  useEffect(() => {
    get();
  }, [get]);

  return (
    <>
      <div>파라미터페이지</div>
      <button onClick={post}>버튼</button>
    </>
  );
};

export default ParamPage;
