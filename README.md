# 💻 React-query, Redux-Toolkit

## 📃 json-server

- json-server 실행

```
   yarn server-json
```

## 📃 React-Query 개요 및 기능

### 개요

- React를 위한 강력하고 성능 좋은 데이터 동기화
  `전역 상태`를 건드리지 않고도 React 및 React Native 애플리케이션에서 데이터를 가져오고, 캐시하고, 업데이트할 수 있습니다.

<br />

### 기능

1. 선언적 및 자동

   - 데이터 가져오기 로직을 ​​손으로 작성하는 것은 끝났습니다. React Query에 데이터를 가져올 위치와 데이터가 얼마나 필요한지 알려주면 나머지는 자동입니다. React Query는 구성이 필요 없는 즉시 캐싱, 백그라운드 업데이트 및 오래된 데이터를 처리합니다.

2. 간단하고 친숙한

   - promise 또는 async/await로 작업하는 방법을 알고 있다면 이미 React Query를 사용하는 방법을 알고 있는 것입니다. 관리할 전역 상태, 감속기, 정규화 시스템 또는 이해해야 할 무거운 구성이 없습니다. 데이터를 해결하는(또는 오류를 발생시키는) 함수를 전달하기만 하면 나머지는 기록입니다.

3. 강력하고 구성 가능

   - React Query는 모든 사용 사례에 맞는 노브와 옵션을 사용하여 쿼리의 각 관찰자 인스턴스까지 구성할 수 있습니다. 전용 devtools, 무한 로딩 API 및 데이터 업데이트를 쉽게 만들어주는 일류 mutation 도구와 연결되어 있습니다. 걱정하지 마십시오. 모든 것이 성공을 위해 미리 구성되어 있습니다!

4. 적은 코드. 더 적은 엣지 케이스.
   - 리듀서, 캐싱 로직, 타이머, 재시도 로직, 복잡한 비동기/대기 스크립팅(계속 진행할 수 있습니다...) 대신 문자 그대로 평소 하던 코드의 아주 작은 부분을 작성합니다. React Query를 사용할 때 작성하는 코드가 얼마나 적은지 또는 얼마나 많은 코드를 삭제하는지에 놀랄 것입니다.

<br />

## 📃 React-Query 구성 요소

<br />

### 🤔 QueryClientProvider, QueryClient

- App.js에 Context Provider로 이하 컴포넌트를 감싸고 queryClient를 내려보내줌 ⇒ 이 context는 앱에서 비동기 요청을 알아서 처리하는 background 계층이 됨
- QueryClientProvider는 구성 요소를 사용하여 QueryClient를 연결하고 응용 프로그램에 제공
- QueryClient를 사용하여 캐시와 상호 작용할 수 있습니다.

```jsx
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function App() {
  return (
   <QueryClientProvider client={queryClient}>
      <div>블라블라</div>
   </QueryClientProvider>;
  );
}
```

### 🤔 useQuery

```jsx
const getSuperHero = useCallback(() => {
  return axios.get("http://localhost:4000/superheroes");
}, []);

const { isLoading, data } = useQuery("super-heroes", getSuperHero);
```
