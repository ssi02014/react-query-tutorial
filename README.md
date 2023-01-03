# 💻 React-query

- 해당 저장소는 `react-query`에서 자주 사용하는 개념들을 정리한 저장소입니다. react-query의 모든 활용 방법이 작성된 상태는 아니며, 추가가 필요한 내용은 추가, 보완할 예정입니다.
- 오탈자 및 가독성이 안 좋거나 수정이 필요한 내용은 `Pull Request`, `Issue` 등 자유롭게 남겨주시면 검토 후에 반영하겠습니다. 많관부 🙇‍♂️
- react-query의 자세한 활용법은 [공식 사이트](https://react-query-v3.tanstack.com/overview)를 참고해주시길 바랍니다.

<br />

## 🌟 Contributors

[![contributors](https://contrib.rocks/image?repo=ssi02014/react-query-tutorial)](https://github.com/ssi02014/react-query-tutorial/graphs/contributors)

<br />

## react-query v4 정식 릴리즈

![스크린샷 2022-08-17 오후 2 20 01](https://user-images.githubusercontent.com/64779472/185040681-2352e8c8-b2d7-40f7-893d-3ee2270904c9.png)

- react-query v4가 정식 릴리즈되면서 주요 변경 사항을 아래 문서에 추가하고 있습니다.
- [react-query v3 vs v4 비교 문서](https://github.com/ssi02014/react-query-tutorial/tree/master/document/v4.md)

<br />

## 📃 주요 컨셉 및 가이드 목차

1. [React-Query 기능](#기능)
2. [기본 설정(QueryClientProvider, QueryClient)](#react-query-기본-설정)
3. [React Query Devtools](#devtools)
4. [React Query 캐싱 라이프 사이클](#캐싱-라이프-사이클)
5. [useQuery](#usequery)
6. [useQuery 주요 리턴 데이터](#usequery-주요-리턴-데이터)
7. [staleTime과 cacheTime](#staletime-cachetime)
8. [마운트 될 때마다 재요청하는 refetchOnMount](#refetchonmount)
9. [윈도우가 포커싱 될 때마다 재요청하는 refetchOnWindowFocus](#refetchOnWindowFocus)
10. [Polling 방식을 구현하기 위한 refetchInterval와 refetchIntervalInBackground)](#polling)
11. [자동 실행의 enabled와 수동으로 쿼리를 다시 요청하는 refetch](#enabled-refetch)
12. [실패한 쿼리에 대해 재요청하는 retry](#retry)
13. [onSuccess, onError, onSettled Callback](#onsuccess-onerror-onsettled)
14. [select를 이용한 데이터 변환](#select)
15. [Paginated 구현에 유용한 keepPreviousData](#keeppreviousdata)
16. [쿼리를 병렬(Parallel) 요청할 수 있는 useQueries](#parallel)
17. [종속 쿼리(Dependent Queries)](#dependent-queries)
18. [QueryClient 인스턴스를 반환하는 useQueryClient](#usequeryclient)
19. [초기 데이터를 설정할 수 있는 initialData](#initial-query-data)
20. [Infinite Queries](#infinite-queries)
21. [서버와 Http CUD관련 작업을 위한 useMutation과 mutate](#usemutation-mutate)
22. [쿼리를 무효화할 수 있는 queryClient.invalidateQueries](#쿼리-무효화)
23. [캐시 데이터 즉시 업데이트를 위한 queryClient.setQueryData](#캐시-데이터-즉시-업데이트)
24. [사용자 경험(UX)을 올려주는 Optimistic Updates(낙관적 업데이트)](#optimistic-update)
25. [에러 처리를 위한 useQueryErrorResetBoundary](#usequeryerrorresetboundary)
26. [리액트 쿼리에 타입스크립트 적용](#react-query-typescript)

<br />

## 📃 API Reference

1. [QueryClient 주요 내용 정리 문서(v3/v4)](https://github.com/ssi02014/react-query-tutorial/tree/master/document/queryClient.md)

<br />
<br />

## 📃 React-Query 개요 및 기능

### 개요

- react-query는 리액트 애플리케이션에서 `서버 상태 가져오기`, `캐싱`, `동기화 및 업데이트`를 보다 쉽게 다룰 수 있도록 도와주며 클라이언트 상태와 서버 상태를 명확히 구분하기 위해서 만들어진 라이브러리이다.
- react-query에서 기존 상태 관리 라이브러리`(redux, mobX)`는 `클라이언트 상태 작업`에 적합하지만 `비동기 또는 서버 상태 작업`에는 그다지 좋지 않다고 말하고 있다.
- 클라이언트 상태(Client State)와 서버 상태(Server State)는 완전히 다르며, 클라이언트 상태는 컴포넌트에서 관리하는 각각의 input 값으로 예를 들 수 있고 서버 상태는 database에 저장되어있는 데이터로 예를 들 수 있다.

<br />

### 기능

1. 자동

   - React Query에 데이터를 가져올 위치와 데이터가 얼마나 필요한지 알려주면 나머지는 자동이다. React Query는 구성이 필요 없는 즉시 `캐싱`, `백그라운드 업데이트` 및 오래된 데이터를 처리합니다.

2. 친숙하고 간단하다.

   - `promise` 또는 `async/await`로 작업하는 방법을 알고 있다면 이미 React Query를 사용하는 방법을 알고 있는 것이다. 관리할 전역 상태, 감속기, 정규화 시스템 또는 이해해야 할 무거운 구성이 없다. 데이터를 해결하는(또는 오류를 발생시키는) 함수를 전달하기만 하면 된다.

3. 강력한 도구 및 구성

   - React Query는 모든 사용 사례에 맞는 노브와 옵션을 사용하여 쿼리의 각 관찰자 인스턴스까지 구성할 수 있다. `전용 devtools`, `무한 로딩 API` 및 `데이터 업데이트`를 쉽게 만들어주는 mutation 도구가 있다.

4. 적은 코드. 더 적은 엣지 케이스.
   - `리듀서`, `캐싱 로직`, `타이머`, `재사용 로직`, `복잡한 비동기/대기 스크립팅`을 평소 하던 코드보다 적은 양의 코드로 작성할 수 있다.

<br />

## React-Query 기본 설정

- [QueryClientProvider 공식 사이트 참고](https://react-query.tanstack.com/reference/QueryClientProvider)
- [QueryClient 공식 사이트 참고](https://react-query.tanstack.com/reference/QueryClient)

```jsx
// QueryClient 예제
import { QueryClient } from "react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      // ...
    },
  },
});
```

- QueryClient를 사용하여 `캐시`와 상호 작용할 수 있습니다.
- QueryClient에서 `모든 query` 또는 `mutation`에 기본 옵션들을 추가할 수 있는데 종류가 상당하니 상단에 공식 사이트를 참고하자.

```jsx
// QueryClientProvider + QueryClient
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

- App 전체에서 리액트 쿼리를 사용하기 위해서는 `QueryClientProvider`를 최상단에서 감싸주고 `QueryClient`를 Props로 넣어줘야 한다.
- App.js에 QueryClientProvider로 이하 컴포넌트를 감싸고 QueryClient를 내려보내 줌 ⇒ 이 context는 앱에서 비동기 요청을 알아서 처리하는 `background` 계층이 된다.
- QueryClientProvider 컴포넌트를 사용하여 App에 QueryClient를 연결하고 제공한다.

<br />

## Devtools

![스크린샷 2022-04-07 오후 11 53 32](https://user-images.githubusercontent.com/64779472/162228222-d1c7dd3e-ce62-484d-bfa0-8493f3e68cae.png)

- React Query는 `전용 devtools`를 제공한다.
- devtools를 사용하면 React Query의 모든 내부 동작을 `시각화`하는 데 도움이 되며 문제가 발생하면 `디버깅 시간을 절약`할 수 있다.

```jsx
import { ReactQueryDevtools } from "react-query/devtools";

<AppContext.Provider value={user}>
  <QueryClientProvider client={queryClient}>
    // ...
    <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
  </QueryClientProvider>
</AppContext.Provider>;
```

- initialIsOpen (Boolean)
  - `true`이면 개발 도구가 기본적으로 열려 있도록 설정할 수 있다.
- position?: ("top-left" | "top-right" | "bottom-left" | "bottom-right")
  - 기본값: `bottom-left`
  - devtools 패널을 열고 닫기 위한 로고 위치
- 일반적으로 initialIsOpen, position을 자주 사용하지만, 아래와 같은 옵션들도 존재한다.
- panelProps
  - 패널에 `props`을 추가할 수 있다. 예를 들어 className, style, onClick 등
- closeButtonProps
  - `닫기 버튼`에 props를 추가할 수 있다.
- toggleButtonProps

  - `토글 버튼`에 props를 추가할 수 있다.

- Devtools는 기본값으로 `process.env.NODE_ENV === 'development'` 인 경우에만 실행된다, 즉 일반적으로 개발환경에서만 작동하므로 설정되어있으므로 프로젝트 배포 시에 Devtools 삽입코드를 제거해줄 필요가 없다.

<br />

## 캐싱 라이프 사이클

- React-Query 캐시 라이프 사이클

```
* Query Instances with and without cache data(캐시 데이터가 있거나 없는 쿼리 인스턴스)
* Background Refetching(백그라운드 리패칭)
* Inactive Queries(비활성 쿼리)
* Garbage Collection(가비지 컬렉션)
```

- cacheTime의 기본값 5분, staleTime 기본값 0분을 가정

1. `A`라는 queryKey를 가진 A 쿼리 인스턴스가 `mount`됨
2. 네트워크에서 데이터 fetch하고, 불러온 데이터는 A라는 queryKey로 `캐싱`함
3. 이 데이터는 `fresh`상태에서 `staleTime(기본값 0)` 이후 `stale` 상태로 변경됨
4. A 쿼리 인스턴스가 `unmount`됨
5. 캐시는 `cacheTime(기본값 5min)` 만큼 유지되다가 `가비지 콜렉터(GC)`로 수집됨
6. 만일, cacheTime이 지나기 전이고, A 쿼리 인스턴스 fresh한 상태라면 새롭게 mount되면 캐시 데이터를 보여준다.

<br />

## useQuery

### useQuery 기본 문법

- [useQuery 공식 사이트 참고](https://react-query.tanstack.com/reference/useQuery)

```jsx
// 사용법(1)
const { data, isLoading, ... } =  useQuery(queryKey, queryFn, {
  //옵션들 ex) enabled, staleTime
});

// 사용법(2)
const result = useQuery({
  queryKey,
  queryFn,
  //옵션들 ex) enabled, staleTime
});
```

```jsx
// 실제 예제
const getSuperHero = useCallback(() => {
  return axios.get("http://localhost:4000/superheroes");
}, []);

const { data, isLoading } = useQuery(["super-heroes"], getSuperHero);
```

- useQuery는 기본적으로 3개의 인자를 받습니다. 첫 번째 인자가 `queryKey(필수)`, 두 번째 인자가 `queryFn(필수)`, 세 번째 인자가 `options`입니다.
- useQuery는 첫 번째 인자인 `queryKey`를 기반으로 `데이터 캐싱`을 관리합니다. `문자열` 또는 `배열`로 지정할 수 있는데, 일반적으로는 위 예제처럼 `문자열`로 지정할 수 있지만, 만약 쿼리가 특정 변수에 의존하는 경우에는 아래 예제처럼 `배열`로 지정해 해당 변수를 추가해주어야 합니다.
  - 참고로 해당 내용은 v3기준이고, react-query `v4`부터는 무조건 `배열`로 지정해야 합니다.
- `사용법 (1)`과 `(2)`번 둘 다 사용되는데. 접근 방식의 차이입니다. 두 가지 방식 모두 잘 이해하고 사용합시다.

<br />

```jsx
// (1)
const fetchSuperHero = ({ queryKey }: any) => {
  const heroId = queryKey[1]; // queryKey: (2) ['super-hero', '3']
  return axios.get(`http://localhost:4000/superheroes/${heroId}`);
};
const useSuperHeroData = (heroId: string) => {
  return useQuery(["super-hero", heroId], fetchSuperHero);
};
```

```jsx
// (2)
const fetchSuperHero = (heroId: string) => {
  return axios.get(`http://localhost:4000/superheroes/${heroId}`);
};
const useSuperHeroData = (heroId: string) => {
  return useQuery(["super-hero", heroId], () => fetchSuperHero(heroId));
};
```

- useQuery의 두 번째 인자인 queryFn는 `Promise`를 반환하는 함수를 넣어주어야 합니다.
- useQuery의 세 번째 인자인 `options`에 많이 쓰이는 옵션들을 밑에서 설명하였습니다. 그 외에는 위에 useQuery 참고 사이트를 통해 확인하면 된다.

<br />

- 참고로 나중에 queryClient로 특정 key에 해당하는 query에 접근할 때는 초기에 설정해둔 포맷을 지켜줘야 제대로 가져올 수 있다.
- 아래 예제를 참고하면 useQuery에서 queryKey에 해당하는 포맷이 배열`["super-hero", heroId]`이다. 그렇다면 밑에 useMutation에서 setQueryData를 이용할 때 똑같이 `["super-hero", heroId]` 포맷을 가져야 한다.

<br />

```js
// 예
const useSuperHeroData = (heroId: string) => {
  return useQuery(["super-hero", heroId], () => fetchSuperHero(heroId));
};

const useAddSuperHeroData = () => {
  const queryClient = useQueryClient();
  return useMutation(addSuperHero, {
    onSuccess(data) {
      // 포맷이 안 맞아서 제대로 못 가져옴! ["super-hero", heroId]로 해야 됨
      queryClient.setQueryData("super-hero", (oldData: any) => {
        return {
          ...oldData,
          data: [...oldData.data, data.data],
        };
      });
    },
    onError(err) {
      console.log(err);
    },
  });
};
```

<br />

### useQuery 주요 리턴 데이터

```js
const { isLoading, isError, error, data, isFetching } = useQuery(
  ["colors", pageNum],
  () => fetchColors(pageNum)
);
```

- [react-query: useQuery 공식 사이트](https://react-query.tanstack.com/reference/useQuery)
- status: 쿼리 요청 함수의 상태를 표현하는 status는 4가지의 값이 존재한다.(문자열 형태)
  - idle: 쿼리 데이터가 없고 비었을 때, { enabled: false } 상태로 쿼리가 호출되면 이 상태로 시작된다.
  - loading: 말 그대로 로딩중일 때 상태
  - error: 에러 발생했을 때 상태
  - success: 요청 성공했을 때 상태
- data: 쿼리 함수가 리턴한 Promise에서 `resolved`된 데이터
- isLoading: `캐싱 된 데이터가 없을 때!` 즉, 처음 실행된 쿼리 일 때 로딩 여부에 따라 true/false로 반환된다.
  - 이는 캐싱 된 데이터가 있다면 로딩 여부에 상관없이 false를 반환한다.
- isFetching: 캐싱 된 데이터가 있더라도 쿼리가 실행되면 로딩 여부에 따라 true/false로 반환된다.
  - 이는 캐싱 된 데이터가 있더라도 쿼리 로딩 여부에 따라 true/false를 반환한다.
- error: 쿼리 함수에 오류가 발생한 경우, 쿼리에 대한 오류 객체
- isError: 에러가 발생한 경우 `true`
- 그외 리턴 데이터들을 확인하고 싶으면 [공식 사이트](https://react-query.tanstack.com/reference/useQuery) 참고

<br />

## useQuery 주요 Options

- [useQuery 공식 사이트 참고](https://react-query.tanstack.com/reference/useQuery)
- 아래 예제들 제외하고 추가적인 옵션들은 위 사이트 참고

### staleTime cacheTime

- stale은 용어 뜻대로 `썩은` 이라는 의미이다. 즉, 최신 상태가 아니라는 의미이다.
- fresh는 뜻 그대로 `신선한` 이라는 의미이다. 즉, 최신 상태라는 의미이다.

```jsx
const { isLoading, isFetching, data, isError, error } = useQuery(
  ["super-heroes"],
  getSuperHero,
  {
    cacheTime: 3000,
    staleTime: 50000,
  }
);
```

<br />

1. staleTime (number | Infinity)
   - staleTime은 데이터가 `fresh에서 stale` 상태로 변경되는 데 걸리는 시간, 만약 staleTime이 3000이면 fresh상태에서 3초 뒤에 stale로 변환
   - `fresh` 상태일 때는 쿼리 인스턴스가 새롭게 mount 되어도 네트워크 요청(fetch)이 일어나지 않는다.
   - 데이터가 한번 fetch 되고 나서 `staleTime`이 지나지 않았다면(fresh상태) unmount 후 다시 mount 되어도 fetch가 일어나지 않는다.
   - staleTime의 기본값은 `0`이기 때문에 일반적으로 fetch 후에 바로 stale이 된다.
2. cacheTime (number | Infinity)
   - 데이터가 `inactive` 상태일 때 `캐싱 된 상태로` 남아있는 시간
   - 쿼리 인스턴스가 unmount 되면 데이터는 `inactive 상태로 변경`되며, 캐시는 `cacheTime`만큼 유지된다.
   - cacheTime이 지나면 `가비지 콜렉터`로 수집된다.
   - cacheTime이 지나기 전에 쿼리 인스턴스가 다시 mount 되면, 데이터를 fetch하는 동안 캐시 데이터를 보여준다.
   - cacheTime은 staleTime과 관계없이, 무조건 inactive 된 시점을 기준으로 캐시 데이터 삭제를 결정한다.
   - cacheTime의 기본값은 `5분`이다.

- 여기서 주의할 점은 staleTime과 cacheTime의 기본값은 각각 `0분`과 `5분`이다. 따라서 staleTime에 어떠한 설정도 하지 않으면 캐싱이 전혀 되지 않는다. 왜냐하면, 항상 캐싱 되어 있는 데이터가 `stale`하다고 여기기 때문이다.
- staleTime을 길게 설정하더라도 cacheTime이 짧다면 이 또한 캐싱이 원활하게 진행되지 않을 것이다. 결국에는 두 개의 옵션을 적절하게 설정해줘야 한다.

<br />

### refetchOnMount

```jsx
const { isLoading, isFetching, data, isError, error } = useQuery(
  ["super-heroes"],
  getSuperHero,
  {
    refetchOnMount: true,
  }
);
```

- refetchOnMount (boolean | "always")
- refetchOnMount는 데이터가 `stale` 상태일 경우, mount마다 `refetch`를 실행하는 옵션이다. 기본값은 `true`이다.
- `always` 로 설정하면 마운트 시마다 매번 refetch를 실행한다.
- `false`로 설정하면 최초 fetch 이후에는 refetch하지 않는다.

<br />

### refetchOnWindowFocus

```jsx
const { isLoading, isFetching, data, isError, error } = useQuery(
  "super-heroes",
  getSuperHero,
  {
    refetchOnWindowFocus: true,
  }
);
```

- refetchOnWindowFocus (boolean | "always")
- refetchOnWindowFocus는 데이터가 `stale` 상태일 경우 `윈도우 포커싱` 될 때마다 refetch를 실행하는 옵션이다. 기본값은 `true`이다.
- 예를 들어, 크롬에서 다른 탭을 눌렀다가 다시 원래 보던 중인 탭을 눌렀을 때도 이 경우에 해당한다. 심지어 F12로 개발자 도구 창을 켜서 네트워크 탭이든, 콘솔 탭이든 개발자 도구 창에서 놀다가 페이지 내부를 다시 클릭했을 때도 이 경우에 해당한다.
- `always` 로 설정하면 항상 윈도우 포커싱 될 때마다 refetch를 실행한다는 의미이다.

<br />

### Polling

```jsx
const { isLoading, isFetching, data, isError, error } = useQuery(
  ["super-heroes"],
  getSuperHero,
  {
    // refetchInterval: 2000,
    refetchIntervalInBackground: true,
  }
);
```

- 폴링이란? 리얼타임 웹을 위한 기법으로 `일정한 주기(특정한 시간)`를 가지고 서버와 응답을 주고받는 방식이 폴링 방식이다.
- react-query에서는 `refetchInterval`을 이용해서 구현할 수 있다.
- `refetchIntervalInBackground`로도 폴링을 구현할 수 있는데 `refetchInterval` 탭/창이 백그라운드에 있는 동안 계속 다시 가져옵니다.

<br />

### enabled refetch

```jsx
const { isLoading, isFetching, data, isError, error, refetch } = useQuery(
  ["super-heroes"],
  getSuperHero,
  {
    enabled: false,
  }
);

const handleClickRefetch = useCallback(() => {
  refetch();
}, [refetch]);

return (
  <div>
    {data?.data.map((hero: Data) => (
      <div key={hero.id}>{hero.name}</div>
    ))}
    <button onClick={handleClickRefetch}>Fetch Heroes</button>
  </div>
);
```

- `enabled`는 쿼리가 자동으로 실행되지 않도록 할 때 설정할 수 있다. `false`를 주면 자동 실행되지 않는다. 또한, useQuery 리턴 데이터 중 status가 idle 상태로 시작한다.
- `refetch`는 쿼리를 `수동`으로 다시 요청하는 기능이다. 쿼리 오류가 발생하면 오류만 기록된다. 오류를 발생시키려면 `throwOnError`속성을 `true`로 해서 전달해야 한다.
- 보통 자동으로 쿼리 요청을 하지 않고 버튼 클릭이나 특정 이벤트를 통해 요청을 시도할 때 같이 사용한다.
- 만약 `enabled: false`를 줬다면 `queryClient`가 쿼리를 다시 가져오는 방법 중 `invalidateQueries`와 `refetchQueries`를 무시한다.

<br />

### retry

```jsx
const result = useQuery(["todos", 1], fetchTodoListPage, {
  retry: 10, // 오류를 표시하기 전에 실패한 요청을 10번 재시도합니다.
});
```

- retry (boolean | number | (failureCount: number, error: TError) => boolean)
- retry는 쿼리가 `실패`하면 useQuery를 `특정 횟수(기본값 3)`만큼 재요청하는 옵션이다.
- retry가 `false`인 경우, 실패한 쿼리는 기본적으로 다시 시도하지 않는다.
- `true`인 경우에는 실패한 쿼리에 대해서 무한 재요청을 시도한다.
- 값으로 `숫자`를 넣을 경우, 실패한 쿼리가 해당 숫자를 충족할 때까지 요청을 재시도한다.

<br />

### onSuccess onError onSettled

```jsx
const onSuccess = useCallback((data) => {
  console.log("Success", data);
}, []);

const onError = useCallback((err) => {
  console.log("Error", err);
}, []);

const onSettled = useCallback(() => {
  console.log("Settled");
}, []);

const { isLoading, isFetching, data, isError, error, refetch } = useQuery(
  ["super-heroes"],
  getSuperHero,
  {
    onSuccess,
    onError,
    onSettled,
  }
);
```

- `onSuccess` 함수는 쿼리 요청이 성공적으로 진행돼서 새 데이터를 가져오거나 캐시가 업데이트될 때마다 실행된다.
- `onError` 함수는 쿼리에 오류가 발생하고 오류가 전달되면 실행된다.
- `onSettled` 함수는 쿼리 요청이 성공, 실패 모두 실행된다.

<br />

### select

```jsx
const { isLoading, isFetching, data, isError, error, refetch } = useQuery(
  ["super-heroes"],
  getSuperHero,
  {
    onSuccess,
    onError,
    select(data) {
      const superHeroNames = data.data.map((hero: Data) => hero.name);
      return superHeroNames;
    },
  }
);

return (
  <div>
    <button onClick={handleClickRefetch}>Fetch Heroes</button>
    {data.map((heroName: string, idx: number) => (
      <div key={idx}>{heroName}</div>
    ))}
  </div>
);
```

- `select` 옵션을 사용하여 쿼리 함수에서 반환된 데이터의 일부를 변환하거나 선택할 수 있다.

<br />

### keepPreviousData

```jsx
const fetchColors = (pageNum: number) => {
  return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageNum}`);
};

const { isLoading, isError, error, data, isFetching, isPreviousData } =
  useQuery(["colors", pageNum], () => fetchColors(pageNum), {
    keepPreviousData: true,
  });
```

- keepPreviousData를 `true`로 설정하면 쿼리 키가 변경되어서 새로운 데이터를 요청하는 동안에도 `마지막 data 값을 유지한다.`
- keepPreviousData은 `페이지네이션`과 같은 기능을 구현할 때 편리하다. 캐싱 되지 않은 페이지를 가져올 때 목록이 `깜빡거리는 현상을 방지`할 수 있다.
- 또한, `isPreviousData` 값으로 현재의 쿼리 키에 해당하는 값인지 확인할 수 있다. `페이지네이션`을 예로 들면, 아직 새로운 데이터가 캐싱 되지 않았다면, 이전 데이터이므로 true를 반환하고 새로운 데이터가 정상적으로 받아져 왔다면 이전데이터가 아니므로 false를 반환한다.

<br />

### placeholderData

```js
function Todos() {
  const placeholderData = useMemo(() => generateFakeTodos(), []);
  const result = useQuery(["todos"], () => fetch("/todos"), {
    placeholderData,
  });
}
```

- placeholderData를 사용하면 `mock 데이터` 설정도 가능하다. 대신 캐싱이 안된다는 단점이 있다.

<br />

## Parallel

```jsx
const { data: superHeroes } = useQuery(["super-heroes"], fetchSuperHeroes);
const { data: friends } = useQuery(["friends"], fetchFriends);
```

- 몇 가지 상황을 제외하면 쿼리 여러 개가 선언된 일반적인 상황일 때, 쿼리 함수들은 `그냥 병렬로 요청돼서 처리`된다.
- 이러한 특징은 쿼리 처리의 `동시성`을 극대화 시킨다.

```jsx
const queryResults = useQueries(
  heroIds.map((id) => ({
    queryKey: ["super-hero", id],
    queryFn: () => fetchSuperHero(id),
  }))
);
```

- 하지만, 쿼리 여러 개를 동시에 수행해야 하는데, 렌더링이 거듭되는 사이사이에 계속 쿼리가 수행되어야 한다면 쿼리를 수행하는 로직이 hook 규칙에 어긋날 수도 있다. 이럴 때는 `useQueries`를 사용한다.

<br />
<br />

## Dependent Queries

- `종속 쿼리`는 어떤 A라는 쿼리가 있는데 이 A쿼리를 실행하기 전에 사전에 완료되어야 하는 B 쿼리가 있는데, 이러한 B쿼리에 의존하는 A쿼리를 종속 쿼리라고 한다.
- react-query에서는 쿼리를 실행할 준비가 되었다는 것을 알려주는 `enabled` 옵션을 통해 종속 쿼리를 쉽게 구현할 수 있다.

```jsx
const DependantQueriesPage = ({ email }: Props) => {
  // 사전에 완료되어야할 쿼리
  const { data: user } = useQuery(['user', email], () =>
    fetchUserByEmail(email)
  );

  const channelId = user?.data.channelId;

  // user 쿼리에 종속 쿼리
  const { data } = useQuery(
    ['courses', channelId],
    () => fetchCoursesByChannelId(channelId),
    { enabled: !!channelId }
  );
```

<br />

## useQueryClient

- useQueryClient는 `QueryClient` 인스턴스를 반환한다.
- `QueryClient`는 캐시와 상호작용한다.

```jsx
import { useQueryClient } from "react-query";

const queryClient = useQueryClient();
```

<br />

## Initial Query Data

- 쿼리에 대한 `초기 데이터`가 필요하기 전에 캐시에 제공하는 방법이 있다. 아래 예제 참고
- initialData 옵션을 통해서 쿼리를 미리 채우는 데 사용할 수 있으며, 초기 로드 상태도 건너뛸 수도 있다.

```jsx
  const useSuperHeroData = (heroId: string) => {
    const queryClient = useQueryClient();
    return useQuery(['super-hero', heroId], fetchSuperHero, {
      initialData: () => {
        const queryData = queryClient.getQueryData(['super-heroes']) as any;
        const hero = queryData?.data?.find(
          (hero: Hero) => hero.id === parseInt(heroId)
        );

        if (hero) return { data: hero };
        return undefined;
      },
    });
  };
```

<br />

- 참고로 위 예제에서 `queryClient.getQueryData` 메서드는 기존 쿼리의 `캐싱 된 데이터`를 가져오는 데 사용할 수 있는 동기 함수이다. 쿼리가 존재하지 않으면 `undefined`를 반환한다.

<br />

## Infinite Queries

- 무한 쿼리는 무한 스크롤이나 load more과 같이 특정 조건에서 데이터를 추가적으로 받아오는 기능을 구현할 때 사용하면 유용하다.

```jsx
import { useInfiniteQuery } from "react-query";
// import { useInfiniteQuery } from '@tanstack/react-query' v4

const fetchColors = ({ pageParam = 1 }) => {
  return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageParam}`);
};

const InfiniteQueries = () => {
  const { data, hasNextPage, isFetching, isFetchingNextPage, fetchNextPage } =
    useInfiniteQuery(["colors"], fetchColors, {
      getNextPageParam: (lastPage, allPages) => {
        return allPages.length < 4 && allPages.length + 1;
      },
    });

  return (
    <div>
      {data?.pages.map((group, idx) => ({
        /* ... */
      }))}
      <div>
        <button disabled={!hasNextPage} onClick={() => fetchNextPage()}>
          LoadMore
        </button>
      </div>
      <div>{isFetching && !isFetchingNextPage ? "Fetching..." : null}</div>
    </div>
  );
};
```

<b>주요 반환</b>

- `useInfiniteQuery`는 기본적으로 useQuery와 사용법은 비슷하지만, 차이점이 있다.
- useInfiniteQuery는 반환값으로`isFetchingNextPage`, `isFetchingPreviousPage`, `fetchNextPage`, `fetchPreviousPage`, `hasNextPage` 등이 추가적으로 있다.
  - fetchNextPage: `다음 페이지`를 fetch 할 수 있다.
  - fetchPreviousPage: `이전 페이지`를 fetch 할 수 있다.
  - isFetchingNextPage: `fetchNextPage` 메서드가 다음 페이지를 가져오는 동안 true이다.
  - isFetchingPreviousPage: `fetchPreviousPage` 메서드가 이전 페이지를 가져오는 동안 true이다.
  - hasNextPage: 가져올 수 있는 `다음 페이지`가 있을 경우 true이다.
  - hasPreviousPage: 가져올 수 있는 `이전 페이지`가 있을 경우 true이다.

<b>옵션</b>

- `pageParam`이라는 프로퍼티가 존재하며, `queryFn`에 할당해줘야 한다. 이때 기본값으로 초기 페이지 값을 설정 해줘야한다.
- `getNextPageParam`을 이용해서 페이지를 증가시킬 수 있다.
  - getNextPageParam의 첫 번째 인자 `lastPage`는 fetch 해온 가장 최근에 가져온 페이지 목록이다.
  - 두 번째 인자 `allPages`는 현재까지 가져온 모든 페이지 데이터이다.
- `getPreviousPageParam`도 존재하며, `getNextPageParam`와 반대의 속성을 갖고 있다.

<b>(+)pageParam</b>

- `queryFn`에 넘겨주는 pageParam가 단순히 다음 page의 값만을 관리할 수 있는 것은 아니다.
- pageParam 값은 `getNextPageParam`에서 원하는 형태로 변경시켜줄 수 있다.
- 무슨 말인지 예시를 보면 이해가 쉽다. 👍 아래와 같이 getNextPageParam에서 반환 데이터가 단순히 다음 페이지 값이 아닌 객체로 반환한다고 해보자.

```js
const { data } = useInfiniteQuery(["colors"], fetchColors, {
  getNextPageParam: (lastPage, allPages) => {
    return (
      allPages.length < 4 && {
        page: allPages.length + 1,
        etc: "hi",
      };
    )
  },
});
```

- 그러면 `queryFn`에 넣은 pageParams에서 getNextPageParam에서 반환한 객체를 받아올 수 있다.

```js
/**
 * pageParam
 * { page, etc }
 */
const fetchColors = ({ pageParam }) => {
  const { page = 1, etc } = pageParam;

  return axios.get(`http://localhost:4000/colors?_limit=2&_page=${page}`);
};
```

- 즉, getNextPageParam의 반환 값이 pageParams로 들어가기 때문에 pageParams를 원하는 형태로 변경하고 싶다면 getNextPageParam의 반환 값을 설정하면 된다.

<br />

## useMutation mutate

- [useMutation 공식 사이트](https://react-query.tanstack.com/reference/useMutation)
- react-query에서 기본적으로 서버에서 데이터를 Get 할 때는 useQuery를 사용한다.
- 만약 서버의 data를 post, patch, put, delete와 같이 수정하고자 한다면 이때는 useMutation을 이용한다.
- 요약하자면 `R(read)는 useQuery`, `CUD(Create, Update, Delete)는 useMutation`을 사용한다.

```jsx
const CreateTodo = () => {
  const mutation = useMutation(createTodo, {
    onMutate() {},
    onSuccess(data) {
      console.log(data);
    },
    onError(err) {
      console.log(err);
    },
  });

  const onCreateTodo = (e) => {
    e.preventDefault();
    mutation.mutate({ title });
  };

  return <>...</>;
};
```

- useMutation의 반환 값인 mutation 객체의 `mutate` 메서드를 이용해서 요청 함수를 호출할 수 있다.
- mutate는 `onSuccess`와 `onError` 메서드를 통해 요청이 성공했을 시와 실패했을 시에 대한 response 데이터를 핸들링할 수 있다.
- `onMutate`는 mutation 함수가 실행되기 전에 실행되고 mutation 함수가 받을 동일한 변수가 전달된다.

```jsx
const mutation = useMutation(addTodo);

try {
  const todo = await mutation.mutateAsync(todo);
  console.log(todo);
} catch (error) {
  console.error(error);
} finally {
  console.log("done");
}
```

- 만약, useMutation을 사용할 때 promise 형태의 response가 필요한 경우라면 `mutateAsync`를 사용해서 얻어올 수 있다.
- Redux와 같은 Request 성공 액션을 미들웨어에서 확인하여 추가 액션을 실행하는 것 같은 작업을 할 때는, mutate는 onSuccess, onError와 같은 메서드를 같이 사용해야 하기 때문에 `mutateAsync가 더 가독성이 좋다`

<br />

## 쿼리 무효화

- invalidateQueries은 화면을 최신 상태로 유지하는 가장 간단한 방법이다.
- 예를 들면, 게시판 목록에서 어떤 게시글을 `작성(Post)`하거나 게시글을 `제거(Delete)`했을 때 화면에 보여주는 게시판 목록을 실시간으로 최신화 해야할 때가 있다.
- 하지만 이때, `query Key`가 변하지 않으므로 강제로 쿼리를 무효화하고 최신화를 진행해야 하는데, 이런 경우에 `invalidateQueries()` 메소드를 이용할 수 있다.
- 즉, query가 오래되었다는 것을 판단하고 다시 `refetch`를 할 때 사용한다!

```tsx
import { useMutation, useQuery, useQueryClient } from "react-query";

const useAddSuperHeroData = () => {
  const queryClient = useQueryClient();
  return useMutation(addSuperHero, {
    onSuccess(data) {
      queryClient.invalidateQueries(["super-heroes"]); // 이 key에 해당하는 쿼리가 무효화!
      console.log(data);
    },
    onError(err) {
      console.log(err);
    },
  });
};
```

- 만약 무효화 하려는 키가 여러 개라면 아래 예제와 같이 다음과 같이 배열로 보내주면 된다.

```tsx
queryClient.invalidateQueries(["super-heroes", "posts", "comment"]);
```

- 위에 `enabled/refetch`에서도 언급했지만 `enabled: false` 옵션을 주면`queryClient`가 쿼리를 다시 가져오는 방법 중 `invalidateQueries`와 `refetchQueries`를 무시한다.
  - [Disabling/Pausing Queries](https://tanstack.com/query/v4/docs/guides/disabling-queries?from=reactQueryV3&original=https://react-query-v3.tanstack.com/guides/disabling-queries) 참고
- 자세한 내용은 [queryClient.invalidateQueries 정리](https://github.com/ssi02014/react-query-tutorial/blob/master/document/queryClient.md#invalidateQueries)를 참고하자.

<br />

## 캐시 데이터 즉시 업데이트

- 바로 위에서 `queryClient.invalidateQueries`를 이용해 캐시 데이터를 최신화하는 방법을 알아봤는데 queryClient.setQueryData를 이용해서도 데이터를 즉시 업데이트할 수 있다.
- `queryClient.setQueryData`는 쿼리의 캐시 된 데이터를 즉시 업데이트하는 데 사용할 수 있는 `동기 함수`이다.

```tsx
const useAddSuperHeroData = () => {
  const queryClient = useQueryClient();
  return useMutation(addSuperHero, {
    onSuccess(data) {
      queryClient.setQueryData(["super-heroes"], (oldData: any) => {
        return {
          ...oldData,
          data: [...oldData.data, data.data],
        };
      });
    },
    onError(err) {
      console.log(err);
    },
  });
};
```

<br />

## Optimistic Update

- `Optimistic Update(낙관적 업데이트)`란 서버 업데이트 시 UI에서도 어차피 업데이트할 것이라고(낙관적인) 가정해서 `미리 UI를 업데이트` 시켜주고 서버를 통해 검증을 받고 업데이트 또는 롤백하는 방식이다.
- 예를 들어 facebook에 좋아요 버튼이 있는데 이것을 유저가 누른다면, 일단 client 쪽 state를 먼저 업데이트한다. 그리고 만약에 실패한다면, 예전 state로 돌아가고 성공하면 필요한 데이터를 다시 fetch해서 서버 데이터와 확실히 연동을 진행한다.
- Optimistic Update가 정말 유용할 때는 인터넷 속도가 느리거나 서버가 느릴 때이다. 유저가 행한 액션을 기다릴 필요 없이 바로 업데이트되는 것처럼 보이기 때문에 사용자 경험(UX) 측면에서 좋다.

```js
const useAddSuperHeroData = () => {
  const queryClient = useQueryClient();
  return useMutation(addSuperHero, {
    async onMutate(newHero) {
      // 낙관적 업데이트를 덮어쓰지 않기 위해 쿼리를 수동으로 삭제한다.
      await queryClient.cancelQueries(["super-heroes"]);

      // 이전 값
      const previousHeroData = queryClient.getQueryData("super-heroes");

      // 새로운 값으로 낙관적 업데이트 진행
      queryClient.setQueryData(["super-heroes"], (oldData: any) => {
        return {
          ...oldData,
          data: [
            ...oldData.data,
            { ...newHero, id: oldData?.data?.length + 1 },
          ],
        };
      });

      // 값이 들어있는 context 객체를 반환
      return {
        previousHeroData,
      };
    },
    // mutation이 실패하면 onMutate에서 반환된 context를 사용하여 롤백 진행
    onError(error, hero, context: any) {
      queryClient.setQueryData(["super-heroes"], context.previousHeroData);
    },
    // 오류 또는 성공 후에는 항상 리프레쉬
    onSettled() {
      queryClient.invalidateQueries(["super-heroes"]);
    },
  });
};
```

- 참고로 위 예제에서 `cancelQueries`는 쿼리를 `수동으로 취소`시킬 수 있다. 취소시킬 query의 queryKey를 cancelQueries의 인자로 보내 실행시킨다.
- 예를 들어, 요청을 완료하는 데 시간이 오래 걸리는 경우, 사용자가 취소 버튼을 클릭하여 요청을 중지하는 경우 이용할 수 있다.

<br />

## useQueryErrorResetBoundary

- [useQueryErrorResetBoundary 공식 문서](https://react-query-v3.tanstack.com/reference/useQueryErrorResetBoundary)
- react-query에서는 `Error`가 발생했을 때 대응할 수 있는 `useQueryErrorResetBoundary hook`을 제공한다.
- 자세한 내용을 설명하기보다는 간단하게 사용할 수 있는 방법을 알아보고, 응용해서 사용하면 될 것 같다.
- 우선, useQueryErrorResetBoundary는 `ErrorBoundary`와 함께 사용되는데 이는, `react-error-boundary` 라이브러리 설치가 필요하다.

```
npm i react-error-boundary
또는
yarn add react-error-boundary
```

- 설치 후에 아래와 같은 QueryErrorBoundary라는 컴포넌트를 생성하고, 그 내부에 `useQueryErrorResetBoundary` 훅을 호출해 `reset` 함수를 가져온다.
- 아래 코드 내용은 단순하다.
  - Error가 발생하면 ErrorBoundary의 `fallbackRender` prop으로 넘긴 내용이 렌더링 되고, 그렇지 않으면 children 내용이 렌더링 된다.
  - 또한, fallbackRender에 넣어주는 콜백 함수 매개 변수로 `resetErrorBoundary`를 구조 분해 할당을 통해 가져올 수 있는데, 이를 통해 모든 쿼리 에러를 `초기화` 할 수 있다. 아래 코드 같은 경우에는 button을 클릭하면 에러를 초기화하게끔 작성했다.

```jsx
import { useQueryErrorResetBoundary } from "react-query"; // (*)
import { ErrorBoundary } from "react-error-boundary"; // (*)

interface Props {
  children: React.ReactNode;
}

const QueryErrorBoundary = ({ children }: Props) => {
  const { reset } = useQueryErrorResetBoundary(); // (*)

  return (
    <ErrorBoundary
      onReset={reset}
      fallbackRender={({ resetErrorBoundary }) => (
        <div>
          Error!!
          <button onClick={() => resetErrorBoundary()}>Try again</button>
        </div>
      )}
    >
      {children}
    </ErrorBoundary>
  );
};

export default QueryErrorBoundary;
```

- 그리고 App.js에다 QueryErrorBoundary 컴포넌트를 추가하면 된다. 여기서 주의 할 점은 queryClient 옵션에다 `{ useErrorBoundary: true }`를 추가해야 한다는 점이다. 그래야 오류가 발생했을 때 `ErrorBoundary` 컴포넌트가 감지할 수 있다.

```jsx
import { QueryClientProvider, QueryClient } from "react-query";
import QueryErrorBoundary from "./components/ErrorBoundary"; // (*)

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      useErrorBoundary: true, // (*)
    },
  },
});

export const AppContext = createContext < any > undefined;

function App() {
  return (
    <AppContext.Provider value={user}>
      <QueryClientProvider client={queryClient}>
        <QueryErrorBoundary>{/* code */}</QueryErrorBoundary>
      </QueryClientProvider>
    </AppContext.Provider>
  );
}

export default App;
```

- 추가적으로 useQueryErrorResetBoundary hook을 사용하지 않고 `QueryErrorResetBoundary` 컴포넌트를 사용해서 Error를 처리하는 경우도 있는데, 결국 컨셉은 비슷해서 아래 공식 문서를 참고하면 충분히 이해할 수 있을 것이다.
- [QueryErrorResetBoundary](https://react-query-v3.tanstack.com/reference/QueryErrorResetBoundary)

<br />

## React Query Typescript

- React Query는 TypeScript의 `제네릭(Generics)`을 많이 사용한다. 이는 라이브러리가 실제로 데이터를 가져오지 않고 API가 반환하는 데이터 유형을 알 수 없기 때문이다.
- 공식 문서에서는 타입스크립트를 그다지 광범위하게 다루지는 않고, useQuery를 호출할 때 기대하는 제네릭을 명시적으로 지정하도록 알려준다.

<br />

### useQuery

- 현재 useQuery가 갖고 있는 제네릭은 `4개`이며, 다음과 같다.
  1. TQueryFnData: useQuery로 실행하는 query function의 `실행 결과`의 타입을 지정하는 제네릭 타입이다.
  2. TError: query function의 `error` 형식을 정하는 제네릭 타입이다.
  3. TData: useQuery의 `data에 담기는 실질적인 데이터`의 타입을 말한다. 첫 번째 제네릭과의 차이점은 `select`와 같이 query function의 반환 데이터를 추가 핸들링을 통해 반환하는 경우에 대응할 수 있는 타입이라고 생각하면 좋다.
  4. TQueryKey: useQuery의 첫 번째 인자로 주는 `queryKey`의 타입을 명시적으로 지정해주는 제네릭 타입이다.

```ts
// useQuery의 타입
export function useQuery<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>
```

```ts
// useQuery 타입 적용 예시
const { data } = useQuery<
  SuperHeros,
  AxiosError,
  SuperHeroName[],
  [string, number]
>(["super-heros", id], getSuperHero, {
  select: (data) => {
    const superHeroNames = data.data.map((hero) => hero.name);
    return superHeroNames;
  },
});
```

- data: `SuperHeroName[]`
- error: `AxiosError<any, any>`
- select: `(data: SuperHeros): SuperHeroName[]`

<br />

### useMutation

- useMutation도 useQuery와 동일하게 현재 4개이며, 다음과 같다.
  1. TData: useMutaion에 넘겨준 mutation function의 `실행 결과`의 타입을 지정하는 제네릭 타입이다.
     - data의 타입과 onSuccess(1번째 인자)의 인자의 타입으로 활용된다.
  2. TError: useMutaion에 넘겨준 mutation function의 `error` 형식을 정하는 제네릭 타입이다.
  3. TVariables: `mutate 함수`에 전달 할 인자를 지정하는 제네릭 타입이다.
     - onSuccess(2번째 인자), onError(2번째 인자), onMutate(1번째 인자), onSettled(3번째 인자) 인자의 타입으로 활용된다.
  4. TContext: mutation function을 실행하기 전에 수행하는 `onMutate 함수의 return값`을 지정하는 제네릭 타입이다.
     - onMutate의 결과 값의 타입을 onSuccess(3번째 인자), onError(3번째 인자), onSettled(4번째 인자)에서 활용하려면 해당 타입을 지정해야 한다.

```ts
export function useMutaion<
  TData = unknown,
  TError = unknown,
  TVariables = void,
  TContext = unknown
>
```

```ts
// useMutation 타입 적용 예시
const { mutate } = useMutation<Todo, AxiosError, number, number>(postTodo, {
  onSuccess: (res, id, nextId) => {},
  onError: (err, id, nextId) => {},
  onMutate: (id) => id + 1,
  onSettled: (res, err, id, nextId) => {},
});

const onClick = () => {
  mutate(5);
};
```

- data: `Todo`
- error: `AxiosError<any, any>`
- onSuccess: `(res: Todo, id: number, nextId: number)`
- onError: `(err: AxiosError, id: number, nextId: number)`
- onMutate: `(id: number)`
- onSettled: `(res: Todo, err: AxiosError, id: number, nextId: number)`,

<br />
