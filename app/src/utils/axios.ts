import axios from 'axios';

const customAxios = axios.create({
  baseURL: 'https://api.github.com',
  //withCredentials: true,
  // 사이트 간 액세스 제어 요청 여부를 나타낸다. true면 클라이언트와 서버의 쿠키 값을 공유하겠다는 의미.
});

customAxios.interceptors.request.use(
  function (config) {
    console.log('요청 성공 직전!');
    console.log(config);
    return config;
  },
  function (err) {
    console.log('요청 실패 직전 ㅠ');
    return err;
  }
);

customAxios.interceptors.response.use(
  function (response) {
    console.log('응답 성공 직전!');
    console.log(response);
    return response;
  },
  function (err) {
    console.log('응답 실패 직전 ㅠ');
    return err;
  }
);

export default customAxios;
