import axios from 'axios';

const customAxios = axios.create({
  baseURL: 'https://api.github.com',
  //withCredentials: true,
  // 사이트 간 액세스 제어 요청 여부를 나타낸다. true면 클라이언트와 서버의 쿠키 값을 공유하겠다는 의미.
});

customAxios.interceptors.request.use(
  function (config) {
    console.log('요청 성공 직전!');
    return config;
  },
  function (err) {
    console.log('요청 실패 직전 ㅠ');
    return Promise.reject(err);
  }
);

customAxios.interceptors.response.use(
  function (response) {
    console.log('응답 성공 직전!');
    return response;
  },
  function (err) {
    console.log('응답 실패 직전 ㅠ');
    return Promise.reject(err);
  }
);

export const getAPI = async (url: string, params?: object) => {
  const response = await customAxios({
    method: 'get',
    url,
    //params는 요청과 함께 전송 될 URL 매개 변수입니다.
    params,
    // paramsSerializer는 params를 직렬화(serializing) 하는 옵션 함수입니다.
    paramsSerializer(paramObj) {
      console.log(paramObj);
      // URLSearchParams 인터페이스는 URL의 쿼리 문자열에 대해 작업할 수 있는 유틸리티 메서드를 정의합니다.
      // https://developer.mozilla.org/ko/docs/Web/API/URLSearchParams
      const params = new URLSearchParams();
      for (const key in paramObj) {
        if (paramObj[key] !== undefined) params.append(key, paramObj[key]);
      }
      return params.toString();
    },
  });
  return response.data;
};

export const postAPI = async (url: string, data?: object, params?: object) => {
  const response = await customAxios({
    method: 'post',
    url,
    params,
    data,
  });
  return response.data;
};

export default customAxios;
