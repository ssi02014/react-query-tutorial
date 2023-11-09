# 💻 TanStack Query(React)

- 해당 저장소는 TanStack Query(React)에서 자주 사용하는 개념들을 정리한 저장소입니다. TanStack Query(React)의 모든 활용 방법이 작성된 상태는 아니며, 필요한 내용은 추가, 보완할 예정입니다.
- 오탈자, 가독성 안좋은 부분 또는 추가 내용은 `Pull Request`, `Issue` 등 자유롭게 남겨주시면 검토 후에 반영하겠습니다.

<br />

## 🌟 Contributors

[![contributors](https://contrib.rocks/image?repo=ssi02014/react-query-tutorial)](https://github.com/ssi02014/react-query-tutorial/graphs/contributors)

<br />

## TanStack Query(React v4)

![스크린샷 2022-08-17 오후 2 20 01](https://user-images.githubusercontent.com/64779472/185040681-2352e8c8-b2d7-40f7-893d-3ee2270904c9.png)

- TanStack Query(React) v4는 `React Query v3의 대부분의 기능을 호환`합니다. 주요 차이점은 아래 문서에 간략하게 정리했습니다. 참고해주시면 감사드립니다 🙇‍♂️

- [Migrating to TanStack Query(React) v5](https://github.com/ssi02014/react-query-tutorial/tree/master/document/v5.md)

- [Migrating to TanStack Query(React) v4](https://github.com/ssi02014/react-query-tutorial/tree/master/document/v4.md)

<br />

## 주요 컨셉 및 가이드 목차

1. [React Query 개요 및 기능](#개요)
2. [기본 설정(QueryClientProvider, QueryClient)](#react-query-기본-설정)
3. [React Query Devtools](#devtools)
4. [React Query 캐싱 라이프 사이클](#캐싱-라이프-사이클)
5. [useQuery](#usequery)
6. [useQuery 주요 리턴 데이터](#usequery-주요-리턴-데이터)
7. [staleTime과 cacheTime](#staletime과-cachetime)
8. [마운트 될 때마다 재요청하는 refetchOnMount](#refetchonmount)
9. [윈도우가 포커싱 될 때마다 재요청하는 refetchOnWindowFocus](#refetchonwindowfocus)
10. [Polling 방식을 구현하기 위한 refetchInterval와 refetchIntervalInBackground)](#polling)
11. [자동 실행의 enabled와 수동으로 쿼리를 다시 요청하는 refetch](#enabled-refetch)
12. [실패한 쿼리에 대해 재요청하는 retry](#retry)
13. [onSuccess, onError, onSettled](#onsuccess-onerror-onsettled)
14. [select를 이용한 데이터 변환](#select)
15. [Paginated 구현에 유용한 keepPreviousData](#keeppreviousdata)
16. [쿼리를 병렬(Parallel) 요청할 수 있는 useQueries](#parallel)
17. [종속 쿼리(Dependent Queries)](#dependent-queries)
18. [QueryClient 인스턴스를 반환하는 useQueryClient](#usequeryclient)
19. [초기 데이터를 설정할 수 있는 initialData](#initial-query-data)
20. [데이터를 미리 불러오는 PreFetching](#prefetching)
21. [Infinite Queries(무한 쿼리) + useInfiniteQuery](#infinite-queries)
22. [서버와 HTTP CUD관련 작업을 위한 useMutation](#usemutation)
23. [쿼리 수동 무효화 cancelQueries](#cancelqueries)
24. [쿼리를 무효화할 수 있는 queryClient.invalidateQueries](#쿼리-무효화)
25. [캐시 데이터 즉시 업데이트를 위한 queryClient.setQueryData](#캐시-데이터-즉시-업데이트)
26. [사용자 경험(UX)을 올려주는 Optimistic Updates(낙관적 업데이트)](#optimistic-update)
27. [에러가 발생했을 때 Fallback UI를 선언적으로 보여주기 위한 ErrorBoundary + useQueryErrorResetBoundary](#usequeryerrorresetboundary)
28. [서버 로딩중일 때 Fallback UI를 선언적으로 보여주기 위한 Suspense](#suspense)
29. [앱 전체에 동일한 쿼리 함수를 공유하는 Default Query Function](#default-query-function)
30. [리액트 쿼리에 타입스크립트 적용](#react-query-typescript)

<br />

## 📃 API Reference

1. [QueryClient 주요 내용 정리 문서](https://github.com/ssi02014/react-query-tutorial/tree/master/document/queryClient.md)

<br />

## 👨🏻‍💻 주요 참고 블로그

- [TkDoDo 블로그(TanStack Query 관리자)](https://tkdodo.eu/blog/)

<br />

## 📃 React Query 개요 및 기능

[목차 이동](#주요-컨셉-및-가이드-목차)

### 개요

- react-query는 리액트 애플리케이션에서 `서버 상태 가져오기`, `캐싱`, `동기화 및 업데이트`를 보다 쉽게 다룰 수 있도록 도와주는 라이브러리이다. 클라이언트 상태와 서버 상태를 명확히 구분하기 위해 만들어졌다.
- react-query에서는 기존 상태 관리 라이브러리인 `redux`, `mobX`가 `클라이언트 상태 작업`에 적합하지만, `비동기 또는 서버 상태 작업`에는 그다지 좋지 않다고 언급한다.
- 클라이언트 상태(Client State)와 서버 상태(Server State)는 완전히 다른 개념이며, 클라이언트 상태는 각각의 input 값으로 예를 들 수 있고, 서버 상태는 데이터베이스에 저장되어 있는 데이터로 예를 들 수 있다.

<br />

### 기능

- 캐싱
- 동일한 데이터에 대한 중복 요청을 단일 요청으로 통합
- 백그라운드에서 오래된 데이터 업데이트
- 데이터가 얼마나 오래되었는지 알 수 있다.
- 데이터 업데이트를 가능한 빠르게 반영
- 페이지네이션 및 데이터 지연 로드와 같은 성능 최적화
- 서버 상태의 메모리 및 가비지 수집 관리
- 구조 공유를 사용하여 쿼리 결과를 메모화

<br />

## React Query 기본 설정

[목차 이동](#주요-컨셉-및-가이드-목차)

- [QueryClient 공식 사이트 참고](https://tanstack.com/query/v4/docs/react/reference/QueryClient#queryclientsetquerydata)
- [QueryClientProvider 공식 사이트 참고](https://tanstack.com/query/v4/docs/react/reference/QueryClientProvider)

```tsx
// v4
import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      // ...
    },
  },
});
```

- QueryClient를 사용하여 `캐시`와 상호 작용할 수 있다.
- QueryClient에서 모든 `query` 또는 `mutation`에 기본 옵션을 추가할 수 있으며, 종류가 상당하기 때문에 공식 사이트를 참고해보자.

```tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({ /* options */});

function App() {
  return (
   <QueryClientProvider client={queryClient}>
      <div>블라블라</div>
   </QueryClientProvider>;
  );
}
```

- react-query를 사용하기 위해서는 `QueryClientProvider`를 최상단에서 감싸주고 `QueryClient` 인스턴스를 client props로 넣어 애플리케이션에 연결시켜야 한다.
- 위 예시에서 App.js에 QueryClientProvider로 컴포넌트를 감싸고, client props에다 queryClient를 연결함으로써, 이 context는 앱에서 비동기 요청을 알아서 처리하는 `background` 계층이 된다.

<br />

## Devtools

![스크린샷 2022-04-07 오후 11 53 32](https://user-images.githubusercontent.com/64779472/162228222-d1c7dd3e-ce62-484d-bfa0-8493f3e68cae.png)

[목차 이동](#주요-컨셉-및-가이드-목차)

- react-query는 `전용 devtools`를 제공한다.
- devtools를 사용하면 React Query의 모든 내부 동작을 `시각화`하는 데 도움이 되며 문제가 발생하면 `디버깅 시간을 절약`할 수 있다.
- devtools는 기본값으로 `process.env.NODE_ENV === 'development'` 인 경우에만 실행된다, 즉 일반적으로 개발환경에서만 작동하므로 설정되어있으므로, 프로젝트 배포 시에 Devtools 삽입코드를 제거해줄 필요가 없다.

```tsx
// v3
import { ReactQueryDevtools } from "react-query/devtools";

<AppContext.Provider value={user}>
  <QueryClientProvider client={queryClient}>
    // ...
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
</AppContext.Provider>;
```

<br />

### options

- initialIsOpen (Boolean)
  - `true`이면 개발 도구가 기본적으로 열려 있도록 설정할 수 있다.
- position?: ("top-left" | "top-right" | "bottom-left" | "bottom-right")
  - 기본값: `bottom-left`
  - devtools 패널을 열고 닫기 위한 로고 위치
- 일반적으로 initialIsOpen, position을 자주 사용하지만, panelProps, closeButtonProps, toggleButtonProps와 같은 옵션들도 존재한다.

<br />

### v4

- v4부터는 devtools를 위한 별도의 패키지 설치가 필요하다.

```bash
$ npm i @tanstack/react-query-devtools
# or
$ pnpm add @tanstack/react-query-devtools
# or
$ yarn add @tanstack/react-query-devtools
```

```tsx
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* The rest of your application */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
```

<br />

## 캐싱 라이프 사이클

[목차 이동](#주요-컨셉-및-가이드-목차)

- React-Query 캐시 라이프 사이클

```
* Query Instances with and without cache data(캐시 데이터가 있거나 없는 쿼리 인스턴스)
* Background Refetching(백그라운드 리패칭)
* Inactive Queries(비활성 쿼리)
* Garbage Collection(가비지 컬렉션)
```

- `cacheTime`의 기본값 5분, `staleTime` 기본값 0초를 가정

1. `A`라는 queryKey를 가진 A 쿼리 인스턴스가 `mount`됨
2. 네트워크에서 데이터 fetch하고, 불러온 데이터는 A라는 queryKey로 `캐싱`함
3. 이 데이터는 `fresh`상태에서 `staleTime(기본값 0)` 이후 `stale` 상태로 변경됨
4. A 쿼리 인스턴스가 `unmount`됨
5. 캐시는 `cacheTime(기본값 5min)` 만큼 유지되다가 `가비지 콜렉터(GC)`로 수집됨
6. 만일, cacheTime이 지나기 전이고, A 쿼리 인스턴스 fresh한 상태라면 새롭게 mount되면 캐시 데이터를 보여준다.

<br />

## useQuery

[목차 이동](#주요-컨셉-및-가이드-목차)

### useQuery 기본 문법

- [useQuery v4](https://tanstack.com/query/v4/docs/react/reference/useQuery)

```tsx
// 사용법(1)
const { data, isLoading, ... } =  useQuery(queryKey, queryFn, {
  // ...options ex) enabled, staleTime, ...
});

// 사용법(2)
const result = useQuery({
  queryKey,
  queryFn,
  // ...options ex) enabled, staleTime, ...
});

result.data
result.isLoading
// ...
```

```tsx
// 실제 예제
const getAllSuperHero = async () => {
  return await axios.get("http://localhost:4000/superheroes");
};

const { data, isLoading } = useQuery(["super-heroes"], getAllSuperHero);
```

- useQuery는 기본적으로 3개의 인자를 받는다. 첫 번째 인자가 `queryKey(필수)`, 두 번째 인자가 `queryFn(필수)`, 세 번째 인자가 `options(optional)`이다.

<br >

**1. queryKey**

```tsx
// (1)
const getSuperHero = async ({ queryKey }: any) => {
  const heroId = queryKey[1]; // queryKey: ['super-hero', '3']

  return await axios.get(`http://localhost:4000/superheroes/${heroId}`);
};

const useSuperHeroData = (heroId: string) => {
  // 해당 쿼리는 heroId에 의존
  return useQuery(["super-hero", heroId], getSuperHero);
};
```

- **v3까지는 queryKey로 문자열 또는 배열 모두 지정할 수 있는데, `v4`부터는 무조건 `배열`로 지정해야 한다.**
- useQuery는 첫 번째 인자인 `queryKey`를 기반으로 `데이터 캐싱`을 관리한다.

  - 만약, 쿼리가 특정 변수에 `의존`한다면 배열에다 이어서 넣어주면 된다. `ex: ["super-hero", heroId, ...]`
  - 이는 사실 굉장히 중요하다. 예를 들어, `queryClient.setQueryData` 등과 같이 특정 쿼리에 접근이 필요 할때 `초기에 설정해둔 포맷`을 지켜줘야 제대로 쿼리에 접근 할 수 있다.
  - 아래 options 예제를 살펴보면 useSuperHeroData의 queryKey는 `["super-hero", heroId]`이다. 그렇다면 queryClient.setQueryData를 이용할 때 똑같이 `["super-hero", heroId]` 포맷을 가져야 한다. 안그러면 제대로 원하는 쿼리 접근이 안된다.

<br />

**2. queryFn**

```tsx
// (2)
const getSuperHero = async (heroId: string) => {
  return await axios.get(`http://localhost:4000/superheroes/${heroId}`);
};

const useSuperHeroData = (heroId: string) => {
  return useQuery(["super-hero", heroId], () => getSuperHero(heroId));
};
```

- useQuery의 두 번째 인자인 queryFn는 `Promise`를 반환하는 함수를 넣어야한다.
- 참고로, queryKey의 예제와 queryFn 예제가 `약간 차이점`이 있다.
  - queryKey 예제는 2번째 queryFn에 getSuperHero 함수를 바로 넘겨주고, getSuperHero에서 매개 변수로 객체를 받아와 해당 객체의 queryKey를 활용하고 있다.
  - queryFn 예제는 그냥 2번째 queryFn에 화살표 함수를 사용하고, getSuperHero의 인자로 heroId를 넘겨주고 있다.
  - 해당 두 가지 방법은 모두 알아야되고, 결과는 동일하다.

<br />

**3. options**

- useQuery의 세 번째 인자인 `options`에 많이 쓰이는 옵션들은 아래 내용에서 설명 할 예정이다. 문서 외에 더 많은 옵션들을 알고싶다면 [useQuery 공식 문서](https://tanstack.com/query/v4/docs/react/reference/useQuery)를 통해 확인해보자.

<br />

```tsx
// 예
const useSuperHeroData = (heroId: string) => {
  return useQuery(["super-hero", heroId], () => getSuperHero(heroId), {
    cacheTime: 5 * 60 * 1000, // 5분
    staleTime: 1 * 60 * 1000, // 1분
    retry: 1,
    // ...options
  });
};
```

<br />

### useQuery 주요 리턴 데이터

```tsx
const { status, isLoading, isError, error, data, isFetching, ... } = useQuery(
  ["colors", pageNum],
  () => fetchColors(pageNum)
);
```

- status: 쿼리 요청 함수의 상태를 표현하는 status는 4가지의 값이 존재한다.(문자열 형태)
  - idle: 쿼리 데이터가 없고 비었을 때, `{ enabled: false }` 상태로 쿼리가 호출되면 이 상태로 시작된다.
  - loading: 말 그대로 아직 캐시된 데이터가 없고 로딩중일 때 상태
  - error: 요청 에러 발생했을 때 상태
  - success: 요청 성공했을 때 상태
- data: 쿼리 함수가 리턴한 Promise에서 `resolved`된 데이터
- isLoading: `캐싱 된 데이터가 없을 때` 즉, 처음 실행된 쿼리 일 때 로딩 여부에 따라 true/false로 반환된다.
  - 이는 캐싱 된 데이터가 있다면 로딩 여부에 상관없이 false를 반환한다.
- isFetching: 캐싱 된 데이터가 있더라도 쿼리가 실행되면 로딩 여부에 따라 true/false로 반환된다.
  - 이는 캐싱 된 데이터가 있더라도 쿼리 로딩 여부에 따라 true/false를 반환한다.
- error: 쿼리 함수에 오류가 발생한 경우, 쿼리에 대한 오류 객체
- isError: 에러가 발생한 경우 `true`
- **그 외 반환 데이터들을 자세히 알고 싶으면 useQuery 공식 사이트 문서 참고**
  - [useQuery v4](https://tanstack.com/query/v4/docs/react/reference/useQuery)

<br />

### 💡 v4부터는 status의 idle 상태값이 제거되고 fetchStatus가 추가

- TanStack Query(v4) 부터는 status의 `idle이 제거`되고, 새로운 상태값인 `fetchStatus`가 추가됐다.
- fetchStatus
  - fetching: 쿼리가 현재 실행중이다.
  - paused: 쿼리를 요청했지만, 잠시 중단된 상태이다.
  - idle: 쿼리가 현재 아무 작업도 수행하지 않는 상태이다.

<br />

### 💡 v4부터는 왜 status, fetchStatus 나눠서 다루는 걸까?

- fetchStatus는 HTTP 네트워크 연결 상태와 좀 더 관련된 상태 데이터이다.
  - 예를 들어, status가 `success` 상태라면 주로 fetchStatus는 `idle` 상태지만, 백그라운드에서 re-fetch가 발생할 때 `fetching` 상태일 수 있다.
  - status가 보통 `loading` 상태일 때 fetchStatus는 주로 `fetching`를 갖지만, 네트워크 연결이 되어 있지 않은 경우 `paused` 상태를 가질 수 있다.
- 정리하자면 아래와 같다.

  - status는 `data`가 있는지 없는지에 대한 상태를 의미한다.
  - fetchStatus는 쿼리 즉, `queryFn 요청`이 진행중인지 아닌지에 대한 상태를 의미한다.

- [why-two-different-states](https://tanstack.com/query/v4/docs/react/guides/queries#why-two-different-states)

<br />

## useQuery 주요 옵션

[목차 이동](#주요-컨셉-및-가이드-목차)

- 추가적인 옵션들은 [useQuery v4 공식 문서](https://tanstack.com/query/v4/docs/react/reference/useQuery) 참고

<br />

### staleTime과 cacheTime

- stale은 용어 뜻대로 `썩은` 이라는 의미이다. 즉, 최신 상태가 아니라는 의미이다.
- fresh는 뜻 그대로 `신선한` 이라는 의미이다. 즉, 최신 상태라는 의미이다.

```tsx
const { isLoading, isFetching, data, isError, error } = useQuery(
  ["super-hero"],
  getSuperHero,
  {
    cacheTime: 5 * 60 * 1000, // 5분
    staleTime: 1 * 60 * 1000, // 1분
  }
);
```

<br />

1. staleTime: `(number | Infinity)`
   - staleTime은 데이터가 `fresh에서 stale` 상태로 변경되는 데 걸리는 시간, 만약 staleTime이 3000이면 fresh상태에서 3초 뒤에 stale로 변환
   - `fresh` 상태일 때는 쿼리 인스턴스가 새롭게 mount 되어도 네트워크 요청(fetch)이 일어나지 않는다.
   - 데이터가 한번 fetch 되고 나서 `staleTime`이 지나지 않았다면(fresh상태) unmount 후 다시 mount 되어도 fetch가 일어나지 않는다.
   - staleTime의 기본값은 `0`이기 때문에 일반적으로 fetch 후에 바로 stale이 된다.
2. cacheTime: `(number | Infinity)`
   - 데이터가 `inactive` 상태일 때 `캐싱 된 상태로` 남아있는 시간
   - 쿼리 인스턴스가 unmount 되면 데이터는 `inactive 상태로 변경`되며, 캐시는 `cacheTime`만큼 유지된다.
   - cacheTime이 지나면 `가비지 콜렉터`로 수집된다.
   - cacheTime이 지나기 전에 쿼리 인스턴스가 다시 mount 되면, 데이터를 fetch하는 동안 캐시 데이터를 보여준다.
   - cacheTime은 staleTime과 관계없이, 무조건 inactive 된 시점을 기준으로 캐시 데이터 삭제를 결정한다.
   - cacheTime의 기본값은 `5분`이다.

- 여기서 주의할 점은 staleTime과 cacheTime의 기본값은 각각 `0분`과 `5분`이다. 따라서 staleTime에 어떠한 설정도 하지 않으면 해당 쿼리를 사용하는 컴포넌트(Observer)가 mount됐을 때 매번 다시 API를 요청할 것이다.
- staleTime을 cacheTime보다 길게 설정했다고 가정하면, staleTime만큼의 캐싱을 기대했을 때 원하는 결과를 얻지 못할 것이다. 즉, 두 개의 옵션을 적절하게 설정해줘야 한다.
  - 참고로, [TkDodo의 reply](https://github.com/TanStack/query/discussions/1685#discussioncomment-1876723)에 따르면 TkDodo는 'staleTime을 cacheTime보다 작게 설정하는 것이 좋다.'는 의견에 동의하지 않는다고 한다.
  - 예컨대, staleTime이 60분일지라도 유저가 자주 사용하지 않는 데이터라면 굳이 cacheTime을 60분 이상으로 설정하여 메모리를 낭비할 필요가 없다.

<br />

### refetchOnMount

```tsx
const { isLoading, isFetching, data, isError, error } = useQuery(
  ["super-hero"],
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

```tsx
const { isLoading, isFetching, data, isError, error } = useQuery(
  ["super-hero"],
  getSuperHero,
  {
    refetchOnWindowFocus: true,
  }
);
```

- refetchOnWindowFocus는 데이터가 `stale` 상태일 경우 `윈도우 포커싱` 될 때마다 refetch를 실행하는 옵션이다. 기본값은 `true`이다.
- 예를 들어, 크롬에서 다른 탭을 눌렀다가 다시 원래 보던 중인 탭을 눌렀을 때도 이 경우에 해당한다. 심지어 F12로 개발자 도구 창을 켜서 네트워크 탭이든, 콘솔 탭이든 개발자 도구 창에서 놀다가 페이지 내부를 다시 클릭했을 때도 이 경우에 해당한다.
- `always` 로 설정하면 항상 윈도우 포커싱 될 때마다 refetch를 실행한다는 의미이다.

<br />

### Polling

```tsx
const { isLoading, isFetching, data, isError, error } = useQuery(
  ["super-hero"],
  getSuperHero,
  {
    refetchInterval: 2000,
    refetchIntervalInBackground: true,
  }
);
```

- Polling(폴링)이란? 리얼타임 웹을 위한 기법으로 `일정한 주기(특정한 시간)`를 가지고 서버와 응답을 주고받는 방식이 폴링 방식이다.
- react-query에서는 `refetchInterval`, `refetchIntervalInBackground`을 이용해서 구현할 수 있다.
- `refetchInterval`은 시간(ms)를 값으로 넣어주면 일정 시간마다 자동으로 refetch를 시켜준다.
- `refetchIntervalInBackground`는 `refetchInterval`과 함께 사용하는 옵션이다. 탭/창이 백그라운드에 있는 동안 refetch 시켜준다. 즉, 브라우저에 focus되어 있지 않아도 refetch를 시켜주는 것을 의미한다.

<br />

### enabled refetch

```tsx
const { isLoading, isFetching, data, isError, error, refetch } = useQuery(
  ["super-hero"],
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

```tsx
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

### onSuccess, onError, onSettled

- _NOTE_: 위 onSuccess, onError, onSettled Callback은 `useQuery` 옵션에서 [`@Deprecated`되어 삭제될 예정](https://github.com/TanStack/query/pull/5353)(v5에 반영)이다. 단, `useMutation`에서는 사용 가능하다.
  - [Breaking React Query's API on purpose](https://velog.io/@cnsrn1874/breaking-react-querys-api-on-purpose) TkDodo 문서 번역 문서 참고

<br />

```tsx
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
  ["super-hero"],
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

```tsx
const { isLoading, isFetching, data, isError, error, refetch } = useQuery(
  ["super-hero"],
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

```tsx
const fetchColors = async (pageNum: number) => {
  return await axios.get(
    `http://localhost:4000/colors?_limit=2&_page=${pageNum}`
  );
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

```tsx
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

[목차 이동](#주요-컨셉-및-가이드-목차)

```tsx
const { data: superHeroes } = useQuery(["super-hero"], getSuperHero);
const { data: friends } = useQuery(["friends"], fetchFriends);
```

- 몇 가지 상황을 제외하면 쿼리 여러 개가 선언된 일반적인 상황일 때, 쿼리 함수들은 `그냥 병렬로 요청돼서 처리`된다.
- 이러한 특징은 쿼리 처리의 `동시성`을 극대화 시킨다.

```tsx
// v3
const queryResults = useQueries(
  heroIds.map((id) => ({
    queryKey: ["super-hero", id],
    queryFn: () => getSuperHero(id),
  }))
);
/*
  const queryResults = useQueries(
    { 
      queryKey: ['super-hero', 1], 
      queryFn: () => fetchSuperHero(1) 
    },
    { 
      queryKey: ['super-hero', 2], 
      queryFn: () => fetchSuperHero(2) 
    },
    // ...
  );
*/
```

- 하지만, 쿼리 여러 개를 동시에 수행해야 하는데, 렌더링이 거듭되는 사이사이에 계속 쿼리가 수행되어야 한다면 쿼리를 수행하는 로직이 hook 규칙에 어긋날 수도 있다. 이럴 때는 `useQueries`를 사용한다.

<br />

- useQueries가 v4부터 쿼리를 넘기는 방식이 변경됐다. 차이점으로는 queries프로퍼티를 가진 객체를 넘겨줘야 한다.

```tsx
// v4
const queryResults = useQueries({
  queries: [
    {
      queryKey: ["super-hero", 1],
      queryFn: () => fetchSuperHero(1),
      staleTime: Infinity, // 다음과 같이 option 추가 가능
    },
    {
      queryKey: ["super-hero", 2],
      queryFn: () => fetchSuperHero(2),
      staleTime: 0,
    },
    // ...
  ],
});
```

<br />

## Dependent Queries

[목차 이동](#주요-컨셉-및-가이드-목차)

- `종속 쿼리`는 어떤 A라는 쿼리가 있는데 이 A쿼리를 실행하기 전에 사전에 완료되어야 하는 B 쿼리가 있는데, 이러한 B쿼리에 의존하는 A쿼리를 종속 쿼리라고 한다.
- react-query에서는 쿼리를 실행할 준비가 되었다는 것을 알려주는 `enabled` 옵션을 통해 종속 쿼리를 쉽게 구현할 수 있다.

```tsx
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

[목차 이동](#주요-컨셉-및-가이드-목차)

- useQueryClient는 `QueryClient` 인스턴스를 반환한다.
- `QueryClient`는 캐시와 상호작용한다.
- QueryClient는 다음 문서에서 자세하게 다룬다
  - [QueryClient](https://github.com/ssi02014/react-query-tutorial/tree/master/document/queryClient.md)

```tsx
import { useQueryClient } from "@tanstack/react-query";

const queryClient = useQueryClient();
```

<br />

## Initial Query Data

[목차 이동](#주요-컨셉-및-가이드-목차)

- 쿼리에 대한 `초기 데이터`가 필요하기 전에 캐시에 제공하는 방법이 있다.
- initialData 옵션을 통해서 쿼리를 미리 채우는 데 사용할 수 있으며, 초기 로드 상태도 건너뛸 수도 있다.

```tsx
const useSuperHeroData = (heroId: string) => {
  const queryClient = useQueryClient();
  return useQuery(["super-hero", heroId], fetchSuperHero, {
    initialData: () => {
      const queryData = queryClient.getQueryData(["super-heroes"]) as any;
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

## Prefetching

[목차 이동](#주요-컨셉-및-가이드-목차)

- prefetch는 말 그대로 미리 fetch해오겠다는 의미이다.
- 비동기 요청은 데이터 양이 클 수록 받아오는 속도가 느리고, 시간이 오래걸린다. 사용자 경험을 위해 데이터를 미리 받아와서 캐싱해놓으면? 새로운 데이터를 받기전에 사용자가 캐싱된 데이터를 볼 수 있어 `UX에 좋은 영향`을 줄 수 있다.
  - 예를 들어 페이지네이션을 구현했다고 가정하면, 페이지1에서 페이지2로 이동했을 때 페이지3의 데이터를 미리 받아놓는 것이다!
- react query에서는 `queryClient.prefetchQuery`을 통해서 prefetch 기능을 제공한다.

```tsx
const prefetchNextPosts = async (nextPage: number) => {
  const queryClient = useQueryClient();
  // 해당 쿼리의 결과는 일반 쿼리들처럼 캐싱된다.
  await queryClient.prefetchQuery(
    ["posts", nextPage],
    () => fetchPosts(nextPage),
    { ...options }
  );
};

// 단순 예
useEffect(() => {
  const nextPage = currentPage + 1;

  if (nextPage < maxPage) {
    prefetchNextPosts(nextPage);
  }
}, [currentPage]);
```

- 참고로 prefetchQuery를 통해 가져오는 쿼리에 대한 데이터가 `이미 캐싱되어 있으면 데이터를 가져오지 않는다.`

<br />

## Infinite Queries

[목차 이동](#주요-컨셉-및-가이드-목차)

- Infinite Queries(무한 쿼리)는 `무한 스크롤`이나 `load more(더 보기)`과 같이 특정 조건에서 데이터를 추가적으로 받아오는 기능을 구현할 때 사용하면 유용하다.
- react-query는 이러한 무한 쿼리를 지원하기 위해 useQuery의 유용한 버전인 `useInfiniteQuery`을 지원한다.

```tsx
import { useInfiniteQuery } from "@tanstack/react-query";

const fetchColors = async ({ pageParam = 1 }) => {
  return await axios.get(
    `http://localhost:4000/colors?_limit=2&_page=${pageParam}`
  );
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

### 주요 반환

- `useInfiniteQuery`는 기본적으로 useQuery와 사용법은 비슷하지만, 차이점이 있다.
- useInfiniteQuery는 반환값으로`isFetchingNextPage`, `isFetchingPreviousPage`, `fetchNextPage`, `fetchPreviousPage`, `hasNextPage` 등이 추가적으로 있다.
  - fetchNextPage: `다음 페이지`를 fetch 할 수 있다.
  - fetchPreviousPage: `이전 페이지`를 fetch 할 수 있다.
  - isFetchingNextPage: `fetchNextPage` 메서드가 다음 페이지를 가져오는 동안 true이다.
  - isFetchingPreviousPage: `fetchPreviousPage` 메서드가 이전 페이지를 가져오는 동안 true이다.
  - hasNextPage: 가져올 수 있는 `다음 페이지`가 있을 경우 true이다.
  - hasPreviousPage: 가져올 수 있는 `이전 페이지`가 있을 경우 true이다.

<br />

### 주요 옵션

- `pageParam`이라는 프로퍼티가 존재하며, `queryFn`에 할당해줘야 한다. 이때 기본값으로 초기 페이지 값을 설정 해줘야한다.
- `getNextPageParam`을 이용해서 페이지를 증가시킬 수 있다.
  - getNextPageParam의 첫 번째 인자 `lastPage`는 fetch 해온 가장 최근에 가져온 페이지 목록이다.
  - 두 번째 인자 `allPages`는 현재까지 가져온 모든 페이지 데이터이다.
- `getPreviousPageParam`도 존재하며, `getNextPageParam`와 반대의 속성을 갖고 있다.

<br />

### 💡 pageParam

- `queryFn`에 넘겨주는 pageParam가 단순히 다음 page의 값만을 관리할 수 있는 것은 아니다.
- pageParam 값은 `getNextPageParam`에서 원하는 형태로 변경시켜줄 수 있다.
- 무슨 말인지 예시를 보면 이해가 쉽다. 👍 아래와 같이 getNextPageParam에서 반환 데이터가 단순히 다음 페이지 값이 아닌 객체로 반환한다고 해보자.

```tsx
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

```tsx
/**
 * pageParam
 * { page, etc }
 */
const fetchColors = async ({ pageParam }) => {
  const { page = 1, etc } = pageParam;

  return await axios.get(`http://localhost:4000/colors?_limit=2&_page=${page}`);
};
```

- 즉, getNextPageParam의 반환 값이 pageParams로 들어가기 때문에 pageParams를 원하는 형태로 변경하고 싶다면 getNextPageParam의 반환 값을 설정하면 된다.

<br />

### 💡 refetchPage

- 전체 페이지 중 일부만 직접 refetch하고 싶을 때에는, `useInfiniteQuery`가 반환하는 refetch 함수에 `refetchPage`를 넘겨주면 된다.
- `refetchPage`는 각 페이지에 대해 실행되며, 이 함수가 true를 반환하는 페이지만 refetch가 된다.

```tsx
const { refetch } = useInfiniteQuery(["colors"], fetchColors, {
  getNextPageParam: (lastPage, allPages) => {
    return allPages.length < 4 && allPages.length + 1;
  },
});

// 첫번째 페이지만 refetch 합니다.
refetch({ refetchPage: (page, index) => index === 0 });
```

<br />

## useMutation

[목차 이동](#주요-컨셉-및-가이드-목차)

- [useMutation v4](https://tanstack.com/query/v4/docs/react/reference/useMutation)
- react-query에서 기본적으로 서버에서 데이터를 Get 할 때는 useQuery를 사용한다.
- 만약 서버의 data를 post, patch, put, delete와 같이 수정하고자 한다면 이때는 useMutation을 이용한다.
- 요약하자면 `R(read)는 useQuery`, `CUD(Create, Update, Delete)는 useMutation`을 사용한다.

```tsx
const CreateTodo = () => {
  const mutation = useMutation(createTodo, {
    onMutate() {
      /* ... */
    },
    onSuccess(data) {
      console.log(data);
    },
    onError(err) {
      console.log(err);
    },
    onSettled() {
      /* ... */
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
- mutate는 `onSuccess`, `onError` 메서드를 통해 성공 했을 시, 실패 했을 시 response 데이터를 핸들링할 수 있다.
- `onMutate`는 mutation 함수가 실행되기 전에 실행되고, mutation 함수가 받을 동일한 변수가 전달된다.
- `onSettled`는 try...catch...finally 구문의 `finally`처럼 요청이 성공하든 에러가 발생되든 상관없이 마지막에 실행된다.

```tsx
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

<br />

### 💡 mutate와 mutateAsync는 무엇을 사용하는게 좋을까?

- 대부분의 경우 우리는 mutate를 사용하는 것이 유리하다. 왜냐하면 mutate는 콜백(onSuccess, onError)를 통해 data와 error에 접근할 수 있기 때문에 우리가 특별히 핸들링 해 줄 필요가 없다.
- 하지만 mutateAsync는 Promise를 직접 다루기 때문에 이런 에러 핸들링 같은 부분을 직접 다뤄야한다.
  - 만약 이를 다루지 않으면 `unhandled promise rejection` 에러가 발생 할 수 있다.
- [tkdodo: Mutate or MutateAsync](https://tkdodo.eu/blog/mastering-mutations-in-react-query#mutate-or-mutateasync)

<br />

### 💡 useMutation callback과 mutate callback의 차이

- useMutation은 onSuccess, onError, onSettled와 같은 Callback 함수들을 가질 수 있다.
- 뿐만아니라, mutate 역시 위와 같은 Callback 함수들을 가질 수 있다.
- 둘의 동작은 같다고 생각할 수 있지만 약간의 차이가 있다. 다음과 같다.
  - useMutation의 Callback 함수와 mutate의 Callback 함수는 독립적으로 실행된다.
  - 순서는 `useMutation의 Callback -> mutate의 Callback` 순으로 실행된다.
  - mutation이 완료되기 전에 컴포넌트가 unmount된다면 mutate의 Callback은 실행되지 않을 수 있다.
- `tkdodo`는 위와 같은 이유로 둘을 분리해서 사용하는 것이 적절하다고 한다.
  - 꼭 필요한 로직(ex. `쿼리 초기화`)은 useMutation의 Callback으로 실행시킨다.
  - 리다이렉션 및 UI 관련 작업은 mutate Callback에서 실행시킨다.
- [tkdodo Blog: Some callbacks might not fire](https://tkdodo.eu/blog/mastering-mutations-in-react-query#some-callbacks-might-not-fire)

<br />

## cancelQueries

[목차 이동](#주요-컨셉-및-가이드-목차)

- 쿼리를 `수동으로 취소`하고 싶을 수도 있다.
  - 예를 들어 요청을 완료하는 데 시간이 오래 걸리는 경우 사용자가 취소 버튼을 클릭하여 요청을 중지하도록 허용할 수 있다.
  - 또는, 아직 HTTP 요청이 끝나지 않았을 때, 페이지를 벗어날 경우에도 중간에 취소해서 불 필요한 네트워크 리소스를 개선할 수 있다.
- 이렇게 하려면 쿼리를 취소하고 이전 상태로 되돌리기 위해 `queryClient.cancelQueries(queryKey)`를 사용할 수 있다. 또한 react-query는 쿼리 취소뿐만아니라 queryFn의 Promise도 취소한다.
- [query-cancellation](https://tanstack.com/query/v4/docs/react/guides/query-cancellation)

```tsx
const query = useQuery(["super-heroes"], {
  /* ...options */
});

const queryClient = useQueryClient();

const onCancelQuery = (e) => {
  e.preventDefault();

  queryClient.cancelQueries(["super-heroes"]);
};

return <button onClick={onCancelQuery}>Cancel</button>;
```

<br />

## 쿼리 무효화

[목차 이동](#주요-컨셉-및-가이드-목차)

- invalidateQueries은 화면을 최신 상태로 유지하는 가장 간단한 방법이다.
- 예를 들면, 게시판 목록에서 어떤 게시글을 `작성(Post)`하거나 게시글을 `제거(Delete)`했을 때 화면에 보여주는 게시판 목록을 실시간으로 최신화 해야할 때가 있다.
- 하지만 이때, `query Key`가 변하지 않으므로 강제로 쿼리를 무효화하고 최신화를 진행해야 하는데, 이런 경우에 `invalidateQueries()` 메소드를 이용할 수 있다.
- 즉, query가 오래되었다는 것을 판단하고 다시 `refetch`를 할 때 사용한다!

```tsx
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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

- 참고로, queryKey에 `["super-heroes"]`을 넘겨주면 queryKey에 "super-heroes"를 포함하는 모든 쿼리가 무효화된다.

```tsx
queryClient.invalidateQueries(["super-heroes"]);

// 아래 query들 모두 무효화 된다.
const query = useQuery({
  queryKey: ["super-heroes", "superman"],
  queryFn: fetchSuperHero,
});
const query = useQuery({
  queryKey: ["super-heroes", { id: 1 }],
  queryFn: fetchSuperHero,
});
```

- 위에 `enabled/refetch`에서도 언급했지만 `enabled: false` 옵션을 주면`queryClient`가 쿼리를 다시 가져오는 방법 중 `invalidateQueries`와 `refetchQueries`를 무시한다.
  - [Disabling/Pausing Queries](https://tanstack.com/query/v4/docs/react/guides/disabling-queries) 참고
- 자세한 내용은 [queryClient.invalidateQueries 정리](https://github.com/ssi02014/react-query-tutorial/blob/master/document/queryClient.md#invalidateQueries)를 참고하자.

<br />

## 캐시 데이터 즉시 업데이트

[목차 이동](#주요-컨셉-및-가이드-목차)

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

[목차 이동](#주요-컨셉-및-가이드-목차)

- `Optimistic Update(낙관적 업데이트)`란 서버 업데이트 시 UI에서도 어차피 업데이트할 것이라고(낙관적인) 가정해서 `미리 UI를 업데이트` 시켜주고 서버를 통해 검증을 받고 업데이트 또는 롤백하는 방식이다.
- 예를 들어 facebook에 좋아요 버튼이 있는데 이것을 유저가 누른다면, 일단 client 쪽 state를 먼저 업데이트한다. 그리고 만약에 실패한다면, 예전 state로 돌아가고 성공하면 필요한 데이터를 다시 fetch해서 서버 데이터와 확실히 연동을 진행한다.
- Optimistic Update가 정말 유용할 때는 인터넷 속도가 느리거나 서버가 느릴 때이다. 유저가 행한 액션을 기다릴 필요 없이 바로 업데이트되는 것처럼 보이기 때문에 사용자 경험(UX) 측면에서 좋다.

```tsx
const useAddSuperHeroData = () => {
  const queryClient = useQueryClient();
  return useMutation(addSuperHero, {
    async onMutate(newHero) {
      // 낙관적 업데이트를 덮어쓰지 않기 위해 쿼리를 수동으로 삭제한다.
      await queryClient.cancelQueries(["super-heroes"]);

      // 이전 값
      const previousHeroData = queryClient.getQueryData(["super-heroes"]);

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

[목차 이동](#주요-컨셉-및-가이드-목차)

- [useQueryErrorResetBoundary v4](https://tanstack.com/query/v4/docs/react/reference/useQueryErrorResetBoundary)
- react-query에서 ErrorBoundary와 useQueryErrorResetBoundary를 결합해 `선언적`으로 에러가 발생했을 때 Fallback UI를 보여줄 수 있다.
- ErrorBoundary에 대한 설명은 해당 문서 참고 [ErrorBoundary](https://github.com/ssi02014/react-query-tutorial/blob/master/document/errorBoundary.md)

<br />

- `useQueryErrorResetBoundary`는 `ErrorBoundary`와 함께 사용되는데 이는, 기본적으로 리액트 공식문서에서 기본 코드 베이스가 제공되긴 하지만 좀 더 쉽게 활용할 수 있는 `react-error-boundary` 라이브러리가 존재하고, react-query 공식문서에서도 해당 라이브러리 사용을 예시로 제공해주기 때문에 `react-error-boundary`를 설치해서 사용해보자.

```bash
$ npm i react-error-boundary
# or
$ pnpm add react-error-boundary
# or
$ yarn add react-error-boundary
```

- 설치 후에 아래와 같은 QueryErrorBoundary라는 컴포넌트를 생성하고, 그 내부에 `useQueryErrorResetBoundary` 훅을 호출해 `reset` 함수를 가져온다.
- 아래 코드 내용은 단순하다.
  - Error가 발생하면 ErrorBoundary의 `fallbackRender` prop으로 넘긴 내용이 렌더링 되고, 그렇지 않으면 children 내용이 렌더링 된다.
  - 또한, fallbackRender에 넣어주는 콜백 함수 매개 변수로 `resetErrorBoundary`를 구조 분해 할당을 통해 가져올 수 있는데, 이를 통해 모든 쿼리 에러를 `초기화` 할 수 있다. 아래 코드 같은 경우에는 button을 클릭하면 에러를 초기화하게끔 작성했다.

```tsx
import { useQueryErrorResetBoundary } from "@tanstack/react-query"; // (*)
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

```tsx
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import QueryErrorBoundary from "./components/ErrorBoundary"; // (*)

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      useErrorBoundary: true, // (*) 여기서는 글로벌로 셋팅했지만 개별 쿼리로 셋팅가능
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <QueryErrorBoundary>{/* 하위 컴포넌트들 */}</QueryErrorBoundary>
    </QueryClientProvider>
  );
}
```

<br />

## Suspense

[목차 이동](#주요-컨셉-및-가이드-목차)

- ErrorBoundary는 에러가 발생했을 때 보여주는 Fallback UI를 `선언적`으로 작성할 수 있고, 리액트 쿼리는 `Suspense`와도 결합해서 `서버 통신 상태가 로딩중`일 때 Fallback UI를 보여줄 수 있게 선언적으로 작성할 수 있다.
- 참고로, Suspense 컴포넌트는 리액트 v16부터 제공되는 `Component Lazy Loading`이나 `Data Fetching` 등의 비동기 처리를 할 때, 응답을 기다리는 동안 Fallback UI(ex: Loader)를 보여주는 기능을 하는 컴포넌트다.

```tsx
import { Suspense } from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      useErrorBoundary: true,
      suspense: true,  // (*) 여기서는 글로벌로 셋팅했지만 개별 쿼리로 셋팅가능
    },
  },
});

function App() {
  return (
    <QueryErrorBoundary>
      <Suspense fallback={<Loader />}>{/* 하위 컴포넌트들 */}</Suspense>
    </QueryErrorBoundary>;
  );
}
```

- 코드를 보면 우리는 서버 상태가 로딩일 때 Loader 컴포넌트를 보여주겠다!라고 이해할 수 있다.
- Suspense컴포넌트 내부에서 어떤 로직이 동작하는지 우리는 신경쓰지 않아도된다. 이처럼 `내부 복잡성을 추상화`하는게 바로 `선언형 컴포넌트`이다.
- 또한, 위와 같이 react-query와 결합한 Suspense는 아래와 같은 과정으로 동작을한다. 참고해보자.

```
1. Suspense mount
2. MainComponent mount
3. MainComponent에서 useQuery에 있는 api Call
4. MainComponent unmount, fallback UI인 Loader mount
5. api Call Success일 경우, useQuery에 있는 onSuccess 동작
6. onSuccess 완료 이후 Loader unmount
7. MainComponent mount
```

<br />

### 💡 @suspensive/react-query

- Tanstack React Query 공식문서의 `Community Resources`에서는 Suspense를 더 `타입 세이프`하게 잘 사용하기 위해 [useSuspenseQuery](https://suspensive.org/ko/docs/react-query/useSuspenseQuery), [useSuspenseQueries](https://suspensive.org/ko/docs/react-query/useSuspenseQueries), [useSuspenseInfiniteQuery](https://suspensive.org/ko/docs/react-query/useSuspenseInfiniteQuery)를 제공하는 [@suspensive/react-query](https://tanstack.com/query/v4/docs/react/community/suspensive-react-query)를 소개하고 있다.

### AS IS (@tanstack/react-query)

```tsx
import { useQuery } from "@tanstack/react-query";

const Example = () => {
  const query = useQuery({
    queryKey,
    queryFn,
    suspense: true,
  });

  query.data; // TData | undefined

  if (query.isSuccess) {
    query.data; // TData
  }
};
```

### TO BE (@suspensive/react-query)

```tsx
import { useSuspenseQuery } from "@suspensive/react-query";

const Example = () => {
  const query = useSuspenseQuery({
    queryKey,
    queryFn,
  }); // suspense: true가 기본입니다.

  // isSuccess으로 type narrowing이 필요하지 않습니다.
  query.data; // TData
};
```

> suspensive/react-query의 훅(useSuspenseQuery, useSuspenseQueries, useSuspenseInfiniteQuery)은 @tanstack/react-query v5 alpha버전에 추가([관련 Pull Request](https://github.com/TanStack/query/pull/5739))되고 공식 API로 [이 페이지](https://tanstack.com/query/v5/docs/react/guides/suspense)에서 확인할 수 있습니다.

<br />

## Default Query Function

[목차 이동](#주요-컨셉-및-가이드-목차)

- 앱 전체에서 동일한 쿼리 함수를 공유하고, `queryKey`를 사용해 가져와야 할 데이터를 식별하고 싶다면 `QueryClient`에 `queryFn` 옵션을 통해 Default Query Function을 지정해 줄 수 있다.
- [Default Query Function v4](https://tanstack.com/query/v4/docs/react/guides/default-query-function)

```tsx
// 기본 쿼리 함수
const getSuperHero = async ({ queryKey }: any) => {
  const heroId = queryKey[1];

  return await axios.get(`http://localhost:4000/superheroes/${heroId}`);
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getSuperHero,
      // ...queries options
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>{/* ... */}</QueryClientProvider>
  );
}
```

- `QueryClient`에 앱 전체에서 사용할 쿼리 함수를 지정해 준다.

```tsx
// 사용 예시
const useSuperHeroData = (heroId: string) => {
  return useQuery(["super-hero", heroId]);
};
```

```tsx
// 다음 형태 불가능
const useSuperHeroData = (heroId: string) => {
  return useQuery(["super-hero", heroId], () => getSuperHero(heroId));
};
```

- useQuery의 첫 번째 인자로 `queryKey`만 넣어주면 두 번째 인자에 들어갈 `queryFn`은 자동으로 설정된 기본 쿼리 함수가 들어간다.
- 일반적으로 `useQuery`를 사용할 때와 달리 `queryFn`을 지정하지 않기에 쿼리 함수에 직접 인자를 넣어주는 형태의 사용은 불가능하다.

<br />

## React Query Typescript

[목차 이동](#주요-컨셉-및-가이드-목차)

- React Query는 TypeScript의 `제네릭(Generics)`을 많이 사용한다. 이는 라이브러리가 실제로 데이터를 가져오지 않고 API가 반환하는 데이터 유형을 알 수 없기 때문이다.
- 공식 문서에서는 타입스크립트를 그다지 광범위하게 다루지는 않고, useQuery를 호출할 때 기대하는 제네릭을 명시적으로 지정하도록 알려준다.

<br />

### useQuery

현재 useQuery가 갖고 있는 제네릭은 `4개`이며, 다음과 같다.

1. TQueryFnData: useQuery로 실행하는 query function의 `실행 결과`의 타입을 지정하는 제네릭 타입이다.
2. TError: query function의 `error` 형식을 정하는 제네릭 타입이다.
3. TData: useQuery의 `data에 담기는 실질적인 데이터`의 타입을 말한다. 첫 번째 제네릭과의 차이점은 `select`와 같이 query function의 반환 데이터를 추가 핸들링을 통해 반환하는 경우에 대응할 수 있는 타입이라고 생각하면 좋다.
4. TQueryKey: useQuery의 첫 번째 인자 `queryKey`의 타입을 명시적으로 지정해주는 제네릭 타입이다.

```tsx
// useQuery의 타입
export function useQuery<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>
```

```tsx
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

/**
 주요 타입
 * data: `SuperHeroName[]`
 * error: `AxiosError<any, any>`
 * select: `(data: SuperHeros): SuperHeroName[]`
 */
```

<br />

### useMutation

useMutation도 useQuery와 동일하게 현재 4개이며, 다음과 같다.

1. TData: useMutation에 넘겨준 mutation function의 `실행 결과`의 타입을 지정하는 제네릭 타입이다.
   - data의 타입과 onSuccess(1번째 인자)의 인자의 타입으로 활용된다.
2. TError: useMutation에 넘겨준 mutation function의 `error` 형식을 정하는 제네릭 타입이다.
3. TVariables: `mutate 함수`에 전달 할 인자를 지정하는 제네릭 타입이다.
   - onSuccess(2번째 인자), onError(2번째 인자), onMutate(1번째 인자), onSettled(3번째 인자) 인자의 타입으로 활용된다.
4. TContext: mutation function을 실행하기 전에 수행하는 `onMutate 함수의 return값`을 지정하는 제네릭 타입이다.
   - onMutate의 결과 값의 타입을 onSuccess(3번째 인자), onError(3번째 인자), onSettled(4번째 인자)에서 활용하려면 해당 타입을 지정해야 한다.

```tsx
export function useMutation<
  TData = unknown,
  TError = unknown,
  TVariables = void,
  TContext = unknown
>
```

```tsx
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

/** 
 주요 타입
 * data: `Todo`
 * error: `AxiosError<any, any>`
 * onSuccess: `(res: Todo, id: number, nextId: number)`
 * onError: `(err: AxiosError, id: number, nextId: number)`
 * onMutate: `(id: number)`
 * onSettled: `(res: Todo, err: AxiosError, id: number, nextId: number)`,
*/
```

<br />

### useInfiniteQuery

현재 useInfiniteQuery 갖고 있는 제네릭은 `4개`이며, useQuery와 유사하다.

1. TQueryFnData: useInfiniteQuery로 실행하는 query function의 `실행 결과`의 타입을 지정하는 제네릭 타입이다.
2. TError: query function의 `error` 형식을 정하는 제네릭 타입이다.
3. TData: useInfiniteQuery의 `data에 담기는 실질적인 데이터`의 타입을 말한다. 첫 번째 제네릭과의 차이점은 `select`와 같이 query function의 반환 데이터를 추가 핸들링을 통해 반환하는 경우에 대응할 수 있는 타입이라고 생각하면 좋다.
4. TQueryKey: useInfiniteQuery의 첫 번째 인자 `queryKey`의 타입을 명시적으로 지정해주는 제네릭 타입이다.

```tsx
export function useInfiniteQuery<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>
```

```tsx
const fetchColors = async ({ pageParam }) => {
  const { page = 1, etc } = pageParam;

  return await axios.get(`http://localhost:4000/colors?_limit=2&_page=${page}`);
};

const { mutate } = useInfiniteQuery<Colors, AxiosError, Colors, ["colors"]>(
  ["colors"],
  ({ pageParam = 0 }) => {
    fetchColors({ page: pageParam });
  },
  {
    getNextPageParam: (lastPage) => {
      return allPages.length < 4 && allPages.length + 1;
    },
    ...options,
  }
);

/**
 주요 타입
 * data:  InfiniteData<ModelListResponse>
 * error: `AxiosError<any, any>`
 * select: InfiniteData<ModelListResponse>
 * getNextPageParam: GetNextPageParamFunction<Colors>
*/
```
