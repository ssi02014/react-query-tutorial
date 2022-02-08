import axios from 'axios';

const customAxios = axios.create({
  baseURL: 'https://api.github.com',
  withCredentials: true, // 사이트 간 액세스 제어 요청 여부를 나타낸다. true면 클라이언트와 서버의 쿠키 값을 공유하겠다는 의미.
});

export default customAxios;
