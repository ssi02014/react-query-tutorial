# 💻 TanStack Query(React)

- 해당 저장소는 TanStack Query(React)에서 자주 사용하는 개념들을 정리한 저장소입니다. TanStack Query(React)의 모든 활용 방법이 작성된 상태는 아니며, 필요한 내용은 추가, 보완할 예정입니다.

<br />

## Contributors

- 기여해주신 모든 분께 감사드립니다.
- 오탈자, 가독성이 좋지 않은 부분 또는 추가 내용은 `Pull Request`, `Issue` 등을 자유롭게 남겨주시면 검토 후에 반영하겠습니다.

[![contributors](https://contrib.rocks/image?repo=ssi02014/react-query-tutorial)](https://github.com/ssi02014/react-query-tutorial/graphs/contributors)

<br />

## TanStack Query(React) v5

- ⭐️ TanStack Query(React) `v5`가 23.10.17에 릴리즈됐습니다. 해당 문서는 `v5` 기준으로 작성되어 있습니다.
- ⭐️ 기존 `v4` 문서는 [react query tutorial v4 문서](https://github.com/ssi02014/react-query-tutorial/tree/master/README.v4.md)를 확인해 주세요.

![스크린샷 2023-10-18 오전 2 09 09](https://github.com/ssi02014/react-query-tutorial/assets/64779472/84de2a61-7e39-4d52-aed8-b0ab67af95bc)

- `v3 -> v4`, `v4 -> v5` Migrating 정리 문서는 아래 문서들을 확인해 주시기 바랍니다.
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
7. [staleTime과 gcTime](#staletime과-gctime)
8. [마운트 될 때마다 재요청하는 refetchOnMount](#refetchonmount)
9. [윈도우가 포커싱 될 때마다 재요청하는 refetchOnWindowFocus](#refetchonwindowfocus)
10. [Polling 방식을 구현하기 위한 refetchInterval와 refetchIntervalInBackground)](#polling)
11. [자동 실행의 enabled와 수동으로 쿼리를 다시 요청하는 refetch](#enabled-refetch)
12. [실패한 쿼리에 대해 재요청하는 retry](#retry)
13. [onSuccess, onError, onSettled](#onsuccess-onerror-onsettled) - 💡 **v5 @Deprecated**
14. [select를 이용한 데이터 변환](#select)
15. [쿼리가 pending 상태인 동안 보여 줄 수 있는 placeholderData](#placeholderdata)
16. [Paginated 구현에 유용한 keepPreviousData](#keepPreviousData) - 💡 **v5 @Deprecated**
17. [특정 쿼리 프로퍼티 변경 시에만 리렌더링을 트리거 할 수 있는 notifyOnChangeProps](#notifyOnChangeProps)
18. [쿼리를 병렬(Parallel) 요청할 수 있는 useQueries](#parallel)
19. [종속 쿼리(Dependent Queries)](#dependent-queries)
20. [QueryClient 인스턴스를 반환하는 useQueryClient](#usequeryclient)
21. [초기 데이터를 설정할 수 있는 initialData](#initial-query-data)
22. [데이터를 미리 불러오는 PreFetching](#prefetching)
23. [Infinite Queries(무한 쿼리) + useInfiniteQuery](#infinite-queries)
24. [서버와 HTTP CUD관련 작업을 위한 useMutation](#usemutation)
25. [쿼리 수동 취소 cancelQueries](#cancelqueries)
26. [쿼리를 무효화할 수 있는 queryClient.invalidateQueries](#쿼리-무효화)
27. [캐시 데이터 즉시 업데이트를 위한 queryClient.setQueryData](#캐시-데이터-즉시-업데이트)
28. [사용자 경험(UX)을 올려주는 Optimistic Updates(낙관적 업데이트)](#optimistic-update)
29. [에러가 발생했을 때 Fallback UI를 선언적으로 보여주기 위한 ErrorBoundary + useQueryErrorResetBoundary](#usequeryerrorresetboundary)
30. [서버 로딩 중일 때 Fallback UI를 선언적으로 보여주기 위한 Suspense](#suspense)
31. [앱 전체에 동일한 쿼리 함수를 공유하는 Default Query Function](#default-query-function)
32. [리액트 쿼리에 타입스크립트 적용](#react-query-typescript)
33. [리액트 쿼리 ESLint 적용](#react-query-eslint-plugin)
34. [리액트 쿼리 지원 버전](#지원-버전)

<br />

## 📃 기타 참고 문서

1. [QueryClient 주요 내용 정리 문서](https://github.com/ssi02014/react-query-tutorial/tree/master/document/queryClient.md)
2. [기본적인 React Query 아키텍처 살펴보기: inside React Query](https://github.com/ssi02014/react-query-tutorial/tree/master/document/insideReactQuery.md)

<br />

## 👨🏻‍💻 주요 참고 페이지

- [TanStack/query 공식 깃허브](https://github.com/TanStack/query)
- [TkDodo 블로그(TanStack Query maintainer)](https://tkdodo.eu/blog/)

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

- [QueryClient 공식 문서](https://tanstack.com/query/v5/docs/reference/QueryClient)
- [QueryClientProvider 공식 문서](https://tanstack.com/query/v5/docs/react/reference/QueryClientProvider)

```tsx
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
- QueryClient에서 모든 `query` 또는 `mutation`에 기본 옵션을 추가할 수 있으며, 종류가 상당하므로 공식 문서를 참고해 보자.

```tsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({ /* options */});

function App() {
  return (
   <QueryClientProvider client={queryClient}>
      <div>블라블라</div>
   </QueryClientProvider>;
  );
}
```

- react-query를 사용하기 위해서는 `QueryClientProvider`를 최상단에서 감싸주고 `QueryClient` 인스턴스를 client props로 넣어 애플리케이션에 연결해야 한다.
- 위 예시에서 App.js에 QueryClientProvider로 컴포넌트를 감싸고, client props에다 queryClient를 연결함으로써, 이 context는 앱에서 비동기 요청을 알아서 처리하는 `background` 계층이 된다.

<br />

## Devtools

![스크린샷 2022-04-07 오후 11 53 32](https://user-images.githubusercontent.com/64779472/162228222-d1c7dd3e-ce62-484d-bfa0-8493f3e68cae.png)

[목차 이동](#주요-컨셉-및-가이드-목차)

- [React Query Devtools 공식 문서](https://tanstack.com/query/v5/docs/react/devtools)
- react-query는 `전용 devtools`를 제공하며 별도의 패키지 설치가 필요하다.
- devtools를 사용하면 React Query의 모든 내부 동작을 `시각화`하는 데 도움이 되며 문제가 발생하면 `디버깅 시간을 절약`할 수 있다.
- devtools는 기본값으로 `process.env.NODE_ENV === "development"` 인 경우에만 실행된다, 즉 일반적으로 개발 환경에서만 작동하도록 설정되어 있으므로, 프로젝트 배포 시에 Devtools 삽입 코드를 제거해 줄 필요가 없다.
- Next 13+의 App Dir에선 dev dependency로 설치해야 동작한다.

```bash
$ npm i @tanstack/react-query-devtools
# or
$ pnpm add @tanstack/react-query-devtools
# or
$ yarn add @tanstack/react-query-devtools
# or
$ bun add @tanstack/react-query-devtools
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

### options

- initialIsOpen (Boolean)
  - `true`이면 개발 도구가 기본적으로 열려 있도록 설정할 수 있다.
- buttonPosition?: ("top-left" | "top-right" | "bottom-left" | "bottom-right" | "relative")
  - 기본값: `bottom-right`
  - devtools 패널을 여닫기 위한 로고 위치
  - `relative`일 때 버튼은 devtools를 렌더링하는 위치에 배치된다.
- 일반적으로 initialIsOpen, buttonPosition을 자주 사용하며 그 외에 position, client와 같은 옵션들도 존재한다.

<br />

## 캐싱 라이프 사이클

[목차 이동](#주요-컨셉-및-가이드-목차)

- [React Query 캐시 라이프 사이클 공식 문서](https://tanstack.com/query/v5/docs/react/guides/caching)

```
* Query Instances with and without cache data(캐시 데이터가 있거나 없는 쿼리 인스턴스)
* Background Refetching(백그라운드 리패칭)
* Inactive Queries(비활성 쿼리)
* Garbage Collection(가비지 컬렉션)
```

```tsx
const result = useQuery({
  queryKey: ["A"],
  queryFn,
  staleTime: 0, // (기본값 0초)
  gcTime: 1000 * 60 * 5, // (기본값 5분)
});
```

1. `A`라는 `queryKey`를 가진 쿼리 인스턴스가 `mount`됩니다.
2. 네트워크 요청을 통해 데이터를 fetch하고, 해당 데이터는 `A`라는 `queryKey`로 캐싱됩니다.
3. 기본값인 `staleTime`이 0이므로, 데이터를 가져오자마자 바로 `stale` 상태로 전환됩니다.
4. 쿼리 인스턴스가 `unmount`되면, TanStack Query는 해당 캐시를 `gcTime`동안 유지합니다.
5. 만약 5분 이내에 `A` 쿼리가 다시 `mount`된다면, 캐시된 데이터를 즉시 반환하고, 동시에 `queryFn`은 `background`에서 실행됩니다.
   - `queryFn`이 성공적으로 실행되면 캐시를 최신 데이터로 채우며, `gcTime`은 다시 5분으로 초기화됩니다.
   - [stale-while-revalidate(swr)](https://web.dev/articles/stale-while-revalidate?hl=ko) 전략 적용
6. 반면, 쿼리가 5분 동안 다시 `mount`되지 않으면, 해당 캐시는 가비지 컬렉션에 의해 삭제됩니다.

<br />

## useQuery

[목차 이동](#주요-컨셉-및-가이드-목차)

### useQuery 기본 문법

- [useQuery 공식 문서](https://tanstack.com/query/v5/docs/react/reference/useQuery)
- useQuery는 `v5`부터 인자로 단 하나의 `객체`만 받는다. 그중에 첫 번째 인자가 `queryKey`, `queryFn`가 필수 값이다.

```tsx
const result = useQuery({
  queryKey, // required
  queryFn, // required
  // ...options ex) gcTime, staleTime, select, ...
});

result.data;
result.isLoading;
result.refetch;
// ...
```

```tsx
// 실제 예제
// 💡 queryFn의 반환 타입을 지정해주면 useQuery의 타입 추론이 원활합니다.
const getAllSuperHero = async (): Promise<AxiosResponse<Hero[]>> => {
  return await axios.get("http://localhost:4000/superheroes");
};

const { data, isLoading } = useQuery({
  queryKey: ["super-heroes"],
  queryFn: getAllSuperHero,
});
```

<br >

**1. queryKey**

```tsx
// (1) queryKey는 데이터를 고유하게 식별에 더해 쿼리 함수에 아래와 같이 편리하게 전달할 수도 있다.
const getSuperHero = async ({
  queryKey,
}: {
  queryKey: ["super-hero", number];
}): Promise<AxiosResponse<Hero>> => {
  const heroId = queryKey[1]; // ex) queryKey: ["super-hero", "3"]

  return await axios.get(`http://localhost:4000/superheroes/${heroId}`);
};

const useSuperHeroData = (heroId: string) => {
  return useQuery({
    queryKey: ["super-hero", heroId],
    queryFn: getSuperHero, // (*)
  });
};
```

- useQuery의 queryKey는 `배열`로 지정해 줘야 한다.
  - 이는 단일 문자열만 포함된 배열이 될 수도 있고, 여러 문자열과 중첩된 객체로 구성된 복잡한 형태일 수도 있다.

```tsx
// An individual todo
useQuery({ queryKey: ["todo", 5], ... })

// An individual todo in a "preview" format
useQuery({ queryKey: ["todo", 5, { preview: true }], ...})
```

- useQuery는 `queryKey`를 기반으로 `쿼리 캐싱`을 관리하는 것이 핵심이다.
  - 만약, 쿼리가 특정 변수에 `의존`한다면 배열에다 이어서 줘야 한다. `ex: ["super-hero", heroId, ...]`
  - **이는 사실 굉장히 중요하다.** 예를 들어, `queryClient.setQueryData` 등과 같이 특정 쿼리에 접근이 필요 할 때 `초기에 설정해둔 포맷`을 지켜줘야 제대로 쿼리에 접근할 수 있다.
  - 아래 options 예제를 살펴보면 useSuperHeroData의 queryKey는 `["super-hero", heroId]`이다. 그렇다면 queryClient.setQueryData를 이용할 때 똑같이 `["super-hero", heroId]` 포맷을 가져야 한다. 그렇지 않으면 원하는 쿼리에 접근할 수 없다.

<br />

**2. queryFn**

- useQuery의 queryFn는 `Promise`를 반환하는 함수를 넣어야 한다.

```tsx
// (2) 상단의 queryKey 예제와 반대로 queryFn 자체적으로 인자를 받는 형태
const getSuperHero = async (heroId: string): Promise<AxiosResponse<Hero>> => {
  return await axios.get(`http://localhost:4000/superheroes/${heroId}`);
};

const useSuperHeroData = (heroId: string) => {
  return useQuery({
    queryKey: ["super-hero", heroId],
    queryFn: () => getSuperHero(heroId), // (*)
  });
};
```

<br />

**3. options**

- [useQuery 공식 문서](https://tanstack.com/query/v5/docs/react/reference/useQuery)
- useQuery의 `options`에 많이 쓰이는 옵션들은 차근차근 살펴볼 예정이다. 문서 외에 더욱 자세히 알고 싶다면 위 공식 문서를 참고하자.

<br />

```tsx
const useSuperHeroData = (heroId: string) => {
  return useQuery({
    queryKey: ["super-hero", heroId],
    queryFn: () => getSuperHero(heroId),
    gcTime: 5 * 60 * 1000, // 5분
    staleTime: 1 * 60 * 1000, // 1분
    retry: 1,
    // ... options
  });
};
```

<br />

### useQuery 주요 리턴 데이터

- [useQuery 공식 문서](https://tanstack.com/query/v5/docs/react/reference/useQuery)

```tsx
const {
  data,
  error,
  status,
  isPending,
  fetchStatus,
  isLoading,
  isFetching,
  isError,
  refetch,
  // ...
} = useQuery({
  queryKey: ["super-heroes"],
  queryFn: getAllSuperHero,
});
```

- **data**: 쿼리 함수가 리턴한 `Promise`에서 `resolved`된 데이터
- **error**: 쿼리 함수에 오류가 발생한 경우, 쿼리에 대한 오류 객체
- **status**: `data`, 쿼리 결과값에 대한 상태를 표현하는 status는 문자열 형태로 `3가지`의 값이 존재한다.
  - pending: 쿼리 데이터가 없고, 쿼리 시도가 아직 완료되지 않은 상태.
    - `{ enabled: false }` 상태로 쿼리가 호출되면 이 상태로 시작된다.
    - [Dependent Queries 공식 문서](https://tanstack.com/query/v5/docs/react/guides/dependent-queries)
  - error: 에러 발생했을 때 상태
  - success: 쿼리 함수가 오류 없이 요청 성공하고 데이터를 표시할 준비가 된 상태.
- **isPending**: 쿼리가 아직 수행되지 않았고, 캐싱된 데이터가 없을 때 `true`를 반환한다.
  - status(pending)에 파생된 boolean 값이다.
- **fetchStatus**: `queryFn`에 대한 정보를 나타냄
  - fetching: 쿼리가 현재 실행 중인 상태
  - paused: 쿼리를 요청했지만, 잠시 중단된 상태 (network mode와 연관)
  - idle: 쿼리가 현재 아무 작업도 수행하지 않는 상태
- **isLoading**: `캐싱 된 데이터가 없을 때` 즉, 처음 실행된 쿼리일 때 로딩 여부에 따라 `true/false`로 반환된다.
  - 이는 캐싱 된 데이터가 있다면 로딩 여부에 상관없이 `false`를 반환한다.
  - status(pending)와 fetchStatus(fetching) 결합된 boolean이다. 즉, `isFetching && isPending` 와 동일하다.
- **isFetching**: 캐싱된 데이터가 있더라도 서버에 요청을 보내면 `true`를 반환한다.
  - fetchStatus(fetching)에 파생된 boolean 값이다.
- **isSuccess**: 쿼리 요청이 성공하면 `true`
- **isError**: 쿼리 요청 중에 에러가 발생한 경우 `true`
- **refetch**: 쿼리를 수동으로 다시 가져오는 함수.
- **그 외 반환 데이터들을 자세히 알고 싶으면 useQuery 공식 문서 참고**

<br />

### 💡 status, fetchStatus 나눠서 다루는 걸까?

- [Why Two Different States 공식 문서](https://tanstack.com/query/v5/docs/react/guides/queries#why-two-different-states)
- fetchStatus는 HTTP 네트워크 연결 상태와 좀 더 관련된 상태 데이터이다.
  - 예를 들어, status가 `success` 상태라면 주로 fetchStatus는 `idle` 상태지만, 백그라운드에서 re-fetch가 발생할 때 `fetching` 상태일 수 있다.
  - status가 보통 `loading` 상태일 때 fetchStatus는 주로 `fetching`를 갖지만, 네트워크 연결이 되어 있지 않은 경우 `paused` 상태를 가질 수 있다.
- 정리하자면 아래와 같다.
  - status는 `data`가 있는지 없는지에 대한 상태를 의미한다.
  - fetchStatus는 쿼리 즉, `queryFn 요청`이 진행 중인지 아닌지에 대한 상태를 의미한다.

<br />

### 💡 isPending, isLoading 주요 차이점

- isPending은 status(pending) 필드에서 직접 파생된 상태인 반면, isLoading은 status(pending)와 fetchStatus(fetching)의 결합된 상태입니다.
- 쉽게 접근하자면 isPending은 "아직 데이터가 없습니다" 를 의미합니다. 그에 반해 isLoading은 "아직 데이터가 없고, 데이터를 가져오는 중입니다"를 의미합니다.
- 이러한 차이는 enabled 옵션이 false일 때 예시로 들면 이해하가 쉽습니다.
  - enabled가 false일 때, isPending은 true로 설정되지만, isLoading은 false로 설정됩니다.

```ts
useQuery({ queryKey, queryFn, enabled: false });
// isPending: true, isLoading: false
```

- [React Query v5부터는 isLoading 대신 isPending 사용을 권장합니다.](https://github.com/TanStack/query/discussions/6297#discussioncomment-7467010)
  - 로더 표시 여부는 사용 사례마다 다르지만, 대부분의 경우 isPending만으로 충분합니다. isLoading의 경우 이론적으로 "보류중이지만, 로딩되지 않은 경우(ex. enabled: false)"를 항상 검증해야 합니다.

<br />

## useQuery 주요 옵션

[목차 이동](#주요-컨셉-및-가이드-목차)

- [useQuery 공식 문서](https://tanstack.com/query/v5/docs/react/reference/useQuery)

<br />

### staleTime과 gcTime

- stale은 용어 뜻대로 `썩은`이라는 의미이다. 즉, 최신 상태가 아니라는 의미이다.
- fresh는 뜻 그대로 `신선한`이라는 의미이다. 즉, 최신 상태라는 의미이다.

```tsx
const {
  data,
  // ...
} = useQuery({
  queryKey: ["super-heroes"],
  queryFn: getAllSuperHero,
  gcTime: 5 * 60 * 1000, // 5분
  staleTime: 1 * 60 * 1000, // 1분
});
```

<br />

1. staleTime: `(number | Infinity)`
   - staleTime은 데이터가 `fresh에서 stale` 상태로 변경되는 데 걸리는 시간, 만약 staleTime이 `3000`이면 fresh 상태에서 `3초` 뒤에 stale로 변환
   - `fresh` 상태일 때는 쿼리 인스턴스가 새롭게 mount 되어도 네트워크 요청(fetch)이 일어나지 않는다.
   - 참고로, staleTime의 기본값은 `0`이기 때문에 일반적으로 fetch 후에 바로 stale이 된다.
2. gcTime: `(number | Infinity)`
   - 데이터가 사용하지 않거나, `inactive` 상태일 때 `캐싱 된 상태로` 남아있는 시간(밀리초)이다.
   - 쿼리 인스턴스가 unmount 되면 데이터는 `inactive 상태로 변경`되며, 캐시는 `gcTime`만큼 유지된다.
   - gcTime이 지나면 `가비지 콜렉터`로 수집된다.
   - gcTime이 지나기 전에 쿼리 인스턴스가 다시 mount 되면, 데이터를 fetch 하는 동안 캐시 데이터를 보여준다.
   - gcTime은 staleTime과 관계없이, 무조건 `inactive` 된 시점을 기준으로 캐시 데이터 삭제를 결정한다.
   - gcTime의 기본값은 `5분`이다. SSR 환경에서는 `Infinity`이다.

- 여기서 주의할 점은 staleTime과 gcTime의 기본값은 각각 `0분`과 `5분`이다. 따라서 staleTime에 어떠한 설정도 하지 않으면 해당 쿼리를 사용하는 컴포넌트(Observer)가 mount 됐을 때 매번 다시 API를 요청할 것이다.
- staleTime을 gcTime보다 길게 설정했다고 가정하면, staleTime만큼의 캐싱을 기대했을 때 원하는 결과를 얻지 못할 것이다. 즉, 두 개의 옵션을 적절하게 설정해 줘야 한다.
  - 참고로, [TkDodo의 reply](https://github.com/TanStack/query/discussions/1685#discussioncomment-1876723)에 따르면 TkDodo는 `staleTime을 gcTime보다 작게 설정하는 것이 좋다.`는 의견에 동의하지 않는다고 한다.
  - 예컨대, staleTime이 60분일지라도 유저가 자주 사용하지 않는 데이터라면 굳이 gcTime을 60분 이상으로 설정하여 메모리를 낭비할 필요가 없다.

<br />

### refetchOnMount

```tsx
const {
  data,
  // ...
} = useQuery({
  queryKey: ["super-heroes"],
  queryFn: getAllSuperHero,
  refetchOnMount: true,
});
```

- refetchOnMount: `boolean | "always" | ((query: Query) => boolean | "always")`
- refetchOnMount는 데이터가 `stale` 상태일 경우, mount마다 `refetch`를 실행하는 옵션이다.
- refetchOnMount의 기본값은 `true`이다.
- `always`로 설정하면 마운트 시마다 매번 refetch를 실행한다.
- `false`로 설정하면 최초 fetch 이후에는 refetch 하지 않는다.

<br />

### refetchOnWindowFocus

```tsx
const {
  data,
  // ...
} = useQuery({
  queryKey: ["super-heroes"],
  queryFn: getAllSuperHero,
  refetchOnWindowFocus: true,
});
```

- refetchOnWindowFocus: `boolean | "always" | ((query: Query) => boolean | "always")`
- refetchOnWindowFocus는 데이터가 `stale` 상태일 경우 `윈도우 포커싱` 될 때마다 refetch를 실행하는 옵션이다.
- refetchOnWindowFocus의 기본값은 `true`이다.
- 예를 들어, 크롬에서 다른 탭을 눌렀다가 다시 원래 보던 중인 탭을 눌렀을 때도 이 경우에 해당한다. 심지어 F12로 개발자 도구 창을 켜서 네트워크 탭이든, 콘솔 탭이든 개발자 도구 창에서 놀다가 페이지 내부를 다시 클릭했을 때도 이 경우에 해당한다.
- `always`로 설정하면 항상 윈도우 포커싱 될 때마다 refetch를 실행한다는 의미이다.

<br />

### Polling

```tsx
const {
  data,
  // ...
} = useQuery({
  queryKey: ["super-heroes"],
  queryFn: getAllSuperHero,
  refetchInterval: 2000,
  refetchIntervalInBackground: true,
});
```

```
Polling(폴링)이란?
실시간 웹을 위한 기법으로 "일정한 주기(특정한 시간)"를 가지고 서버와 응답을 주고받는 방식이 폴링 방식이다.
react-query에서는 "refetchInterval", "refetchIntervalInBackground"을 이용해서 구현할 수 있다.
```

1. refetchInterval: `number | false | ((data: TData | undefined, query: Query) => number | false)`

- refetchInterval은 `시간(ms)`를 값으로 넣어주면 일정 시간마다 자동으로 refetch를 시켜준다.

2. refetchIntervalInBackground: `boolean`

- refetchIntervalInBackground는 `refetchInterval`과 함께 사용하는 옵션이다.
- 탭/창이 백그라운드에 있는 동안 refetch 시켜준다. 즉, 브라우저에 focus 되어 있지 않아도 refetch를 시켜주는 것을 의미한다.

<br />

### enabled refetch

```tsx
const {
  data,
  refetch,
  // ...
} = useQuery({
  queryKey: ["super-heroes"],
  queryFn: getAllSuperHero,
  enabled: false,
});

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

- enabled: `boolean`
- enabled는 `쿼리가 자동으로 실행되지 않도록 할 때 설정`할 수 있다.
- enabled를 `false`를 주면 쿼리가 자동 실행되지 않는다.
  - useQuery 반환 값 중 status가 `pending` 상태로 시작한다.
- refetch는 쿼리를 `수동`으로 다시 요청하는 기능이다. 쿼리 오류가 발생하면 오류만 기록된다.
  - 오류를 발생시키려면 `throwOnError` 속성을 `true`로 해서 전달해야 한다.
- 보통 자동으로 쿼리 요청을 하지 않고 `버튼 클릭`이나 특정 이벤트를 통해 요청을 시도할 때 같이 사용한다.
- 💡 주의할 점은, `enabled: false`를 줬다면 `queryClient`가 쿼리를 다시 가져오는 방법 중 `invalidateQueries`와 `refetchQueries`를 무시한다.

<br />

### retry

```tsx
const {
  data,
  refetch,
  // ...
} = useQuery({
  queryKey: ["super-heroes"],
  queryFn: getAllSuperHero,
  retry: 10, // 오류를 표시하기 전에 실패한 요청을 10번 재시도합니다.
});
```

- retry: `(boolean | number | (failureCount: number, error: TError) => boolean)`
- retry는 쿼리가 `실패`하면 useQuery를 `특정 횟수`만큼 재요청하는 옵션이다.
- retry가 `false`인 경우, 실패한 쿼리는 기본적으로 다시 시도하지 않는다. `true`인 경우에는 실패한 쿼리에 대해서 무한 재요청을 시도한다.
- 값으로 `숫자`를 넣을 경우, 실패한 쿼리가 해당 숫자를 충족할 때까지 요청을 재시도한다.
- 기본값은 클라이언트 환경에서는 `3`, 서버 환경에서는 `0`이다.

<br />

### onSuccess, onError, onSettled

- _NOTE_: `v4`까지 있던 onSuccess, onError, onSettled Callback은 `useQuery` 옵션에서 [@Deprecated](https://github.com/TanStack/query/pull/5353) 됐다. 단, `useMutation`에서는 사용 가능하다.
- [Breaking React Query's API on purpose](https://velog.io/@cnsrn1874/breaking-react-querys-api-on-purpose) 참고

<br />

### select

```tsx
const {
  data,
  // ...
} = useQuery({
  queryKey: ["super-heroes"],
  queryFn: getAllSuperHero,
  select: (data) => {
    const superHeroNames = data.data.map((hero) => hero.name);
    return superHeroNames;
  },
});

return (
  <div>
    {data.map((heroName, idx) => (
      <div key={`${heroName}-${idx}`}>{heroName}</div>
    ))}
  </div>
);
```

- select: `(data: TData) => unknown`
- select 옵션을 사용하여 쿼리 함수에서 `반환된 데이터의 일부를 변환하거나 선택할 수 있다.`
- 참고로, 반환된 데이터 값에는 영향을 주지만 쿼리 캐시에 저장되는 내용에는 영향을 주지 않는다.

<br />

### placeholderData

```tsx
const placeholderData = useMemo(() => generateFakeHeroes(), []);

const {
  data,
  // ...
} = useQuery({
  queryKey: ["super-heroes"],
  queryFn: getAllSuperHero,
  placeholderData: placeholderData,
});
```

- placeholderData: `TData | (previousValue: TData | undefined; previousQuery: Query | undefined,) => TData`
- placeholderData를 설정하면 쿼리가 `pending` 상태인 동안 특정 쿼리에 대한 placeholder data로 사용된다.
- placeholderData는 캐시에 유지되지 않으며, 서버 데이터와 관계없는 보여주기용 가짜 데이터다.
- placeholderData에 함수를 제공하는 경우 첫 번째 인자로 이전에 관찰된 쿼리 데이터를 수신하고, 두 번째 인자는 이전 쿼리 인스턴스가 된다.

<br />

### keepPreviousData

- v4까지 있던 keepPreviousData은 `페이지네이션`과 같은 기능을 구현할 때 많이 사용하던 옵션이었다. 캐싱 되지 않은 페이지를 가져올 때 목록이 `깜빡거리는 현상을 방지`할 수 있다.
- **하지만, v5부터 `keepPreviousData`, `isPreviousData`은 옵션은 제거됐다.**

  - [Removed keepPreviousData in favor of placeholderData identity function](https://github.com/ssi02014/react-query-tutorial/blob/main/document/v5.md#9-%EF%B8%8F-removed-keeppreviousdata-in-favor-of-placeholderdata-identity-function)

- 이들은 각각 `placeholderData`와 `isPlaceholderData` 플래그와 거의 유사하게 동작하기 때문이다.
- 아래 예제처럼 `placeholderData`를 활용하면서 이전 버전에서 `keepPreviousData의 값을 "true"`로 줬을 때와 동일한 기능을 수행할 수 있다.

```tsx
import { useQuery, keepPreviousData } from "@tanstack/react-query";

const {
  data,
  // ...
} = useQuery({
  queryKey: ["super-heroes"],
  queryFn: getAllSuperHero,
  placeholderData: keepPreviousData,
});
```

- 아래 예시처럼 작성해서 위의 `keepPreviousData` 예시와 동일한 동작을 할 수 있다.

```tsx
import { useQuery } from "@tanstack/react-query";

const {
  data,
  // ...
} = useQuery({
  queryKey: ["super-heroes"],
  queryFn: getAllSuperHero,
  placeholderData: (previousData, previousQuery) => previousData,
});
```

<br />

### notifyOnChangeProps

```tsx
import { useQuery } from "@tanstack/react-query";

const { data, dataUpdatedAt } = useQuery({
  queryKey: ["super-heroes"],
  queryFn: getAllSuperHero,
  notifyOnChangeProps: ["data"], // data 값 변경시에만 리렌더링이 발생한다
});
```

- notifyOnChangeProps: `string[] | "all" | (() => string[] | "all")`
- 쿼리의 특정 프로퍼티들이 변경되었을 때만 리렌더링이 발생하도록 설정할 수 있다.
- 별도로 설정하지 않으면, **컴포넌트에서 접근한 값이 변경되었을 때** 리렌더링이 발생한다 (기본 동작). 즉, 위 예시에서 `notifyOnChangeProps`에 설정값을 주지 않았다면, `data`, `dataUpdatedAt` 중 어느 하나가 변경되면 리렌더링이 발생한다.
- `"all"`로 설정할 경우, 쿼리의 어떤 프로퍼티가 변경되든 컴포넌트가 리렌더링된다.
- 참고: 기본 동작은 [Object.defineProperty()](https://github.com/TanStack/query/pull/1578/files#diff-93f379800fc8abf895eba249b2e2371eda98740aa40fc9f284a8088d190f46c3R506-R514)를 활용한다.

<br />

## Parallel

[목차 이동](#주요-컨셉-및-가이드-목차)

- [useQueries 공식 문서](https://tanstack.com/query/v5/docs/react/reference/useQueries)

```tsx
const { data: superHeroes } = useQuery({
  queryKey: ["super-heroes"],
  queryFn: getAllSuperHero,
});

const { data: friends } = useQuery({
  queryKey: ["friends"],
  queryFn: getFriends,
});
```

- 몇 가지 상황을 제외하면 쿼리 여러 개가 선언된 일반적인 상황일 때, 쿼리 함수들은 `그냥 병렬로 요청돼서 처리`된다.
- 이러한 특징은 쿼리 처리의 `동시성`을 극대화시킨다.

```tsx
const queryResults = useQueries({
  queries: [
    {
      queryKey: ["super-hero", 1],
      queryFn: () => getSuperHero(1),
      staleTime: Infinity, // 다음과 같이 option 추가 가능!
    },
    {
      queryKey: ["super-hero", 2],
      queryFn: () => getSuperHero(2),
      staleTime: 0,
    },
    // ...
  ],
});
```

- 하지만, 쿼리 여러 개를 동시에 수행해야 하는데, 렌더링이 거듭되는 사이사이에 계속 쿼리가 수행되어야 한다면 쿼리를 수행하는 로직이 hook 규칙에 어긋날 수도 있다. 이럴 때는 `useQueries`를 사용한다.
- useQueries 훅은 모든 쿼리 결과가 포함된 배열을 반환한다. 반환되는 순서는 쿼리가 입력된 순서와 동일하다.

### Queries Combine

- [useQueries Combine 공식 문서](https://tanstack.com/query/v5/docs/react/reference/useQueries#combine)

- useQueries 훅이 반환한 모든 쿼리 결과가 포함된 배열을 단일 값으로 결합하려면 combine 옵션을 사용할 수 있다.

```tsx
const ids = [1,2,3]
const combinedQueries = useQueries({
  queries: ids.map(id => (
    { queryKey: ["post", id], queryFn: () => fetchPost(id) },
  )),
  combine: (results) => {
    return ({
      data: results.map(result => result.data),
      pending: results.some(result => result.isPending),
    })
  }
})
```

- combinedQueries는 `data`와 `pending` 프로퍼티를 갖는다.
- _Note_: 참고로 결합하면 쿼리 결과의 나머지 다른 프로퍼티들은 손실된다.

<br />

## Dependent Queries

[목차 이동](#주요-컨셉-및-가이드-목차)

- [Dependent Queries 공식 문서](https://tanstack.com/query/v5/docs/react/guides/dependent-queries)
- `종속 쿼리`는 어떤 A라는 쿼리가 있는데 이 A 쿼리를 실행하기 전에 사전에 완료되어야 하는 B 쿼리가 있는데, 이러한 B 쿼리에 의존하는 A 쿼리를 종속 쿼리라고 한다.
- react-query에서는 `enabled` 옵션을 통해 종속 쿼리를 쉽게 구현할 수 있다.

```tsx
// 사전에 완료되어야 할 쿼리
const { data: user } = useQuery({
  queryKey: ["user", email],
  queryFn: () => getUserByEmail(email),
});

const channelId = user?.data.channelId;

// user 쿼리에 종속 쿼리
const { data: courses } = useQuery({
  queryKey: ["courses", channelId],
  queryFn: () => getCoursesByChannelId(channelId),
  enabled: !!channelId,
});
```

<br />

## useQueryClient

[목차 이동](#주요-컨셉-및-가이드-목차)

- useQueryClient는 `QueryClient` 인스턴스를 반환한다.
- `QueryClient`는 캐시와 상호작용한다.
- QueryClient는 다음 문서에서 자세하게 다룬다.
  - [QueryClient](https://github.com/ssi02014/react-query-tutorial/tree/master/document/queryClient.md)

```tsx
import { useQueryClient } from "@tanstack/react-query";

const queryClient = useQueryClient();
```

<br />

## Initial Query Data

[목차 이동](#주요-컨셉-및-가이드-목차)

- [Initial Query Data 공식 문서](https://tanstack.com/query/v5/docs/react/guides/initial-query-data)
- 쿼리에 대한 `초기 데이터`가 필요하기 전에 캐시에 제공하는 방법이 있다.
- initialData 옵션을 통해서 쿼리를 미리 채우는 데 사용할 수 있으며, 초기 로드 상태도 건너뛸 수도 있다.

```tsx
const useSuperHeroData = (heroId: string) => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["super-hero", heroId],
    queryFn: () => getSuperHero(heroId),
    initialData: () => {
      const queryData = queryClient.getQueryData(["super-heroes"]) as any;
      const hero = queryData?.data?.find(
        (hero: Hero) => hero.id === parseInt(heroId)
      );

      if (hero) return { data: hero };
    },
  });
};
```

<br />

- 참고로 위 예제에서 `queryClient.getQueryData` 메서드는 기존 쿼리의 `캐싱 된 데이터`를 가져오는 데 사용할 수 있는 동기 함수이다. 쿼리가 존재하지 않으면 `undefined`를 반환한다.

<br />

## Prefetching

[목차 이동](#주요-컨셉-및-가이드-목차)

- [prefetching 공식 문서](https://tanstack.com/query/v5/docs/react/guides/prefetching)
- prefetch는 말 그대로 미리 fetch해오겠다는 의미이다.
- 비동기 요청은 데이터양이 클수록 받아오는 속도가 느리고, 시간이 오래 걸린다. 사용자 경험을 위해 데이터를 미리 받아와서 캐싱해 놓으면? 새로운 데이터를 받기 전에 사용자가 캐싱 된 데이터를 볼 수 있어 `UX에 좋은 영향`을 줄 수 있다.
  - 예를 들어 페이지네이션을 구현했다고 가정하면, 페이지1에서 페이지2로 이동했을 때 페이지3의 데이터를 미리 받아놓는 것이다!
- react query에서는 `queryClient.prefetchQuery`을 통해서 prefetch 기능을 제공한다.

### prefetchQuery

```tsx
const prefetchNextPosts = async (nextPage: number) => {
  const queryClient = useQueryClient();
  // 해당 쿼리의 결과는 일반 쿼리들처럼 캐싱 된다.
  await queryClient.prefetchQuery({
    queryKey: ["posts", nextPage],
    queryFn: () => fetchPosts(nextPage),
    // ...options
  });
};

// 단순 예
useEffect(() => {
  const nextPage = currentPage + 1;

  if (nextPage < maxPage) {
    prefetchNextPosts(nextPage);
  }
}, [currentPage]);
```

- 참고로 prefetchQuery를 통해 가져오는 쿼리에 대한 데이터가 `이미 캐싱 되어 있으면 데이터를 가져오지 않는다.`

<br />

### prefetchInfiniteQuery

- infinite 쿼리는 바로 아래에 나오겠지만 일반 쿼리들처럼 infinite 쿼리도 prefetch 할 수 있다.
- 기본적으로 쿼리의 `첫 번째 페이지만 prefetch` 되며, 그 이상을 prefetch 하려면 `pages 옵션`을 활용해야 한다.
  - 이 경우에는 `getNextPageParam` 함수를 무조건 제공해 줘야 한다는 점을 주의하자.

```tsx
const prefetchTodos = async () => {
  await queryClient.prefetchInfiniteQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
    pages: 3, // prefetch the first 3 pages
  });
};
```

<br />

## Infinite Queries

[목차 이동](#주요-컨셉-및-가이드-목차)

- [Infinite Queries 공식 문서](https://tanstack.com/query/v5/docs/react/guides/infinite-queries)
- [useInfiniteQuery 공식 문서](https://tanstack.com/query/v5/docs/react/reference/useInfiniteQuery)
- Infinite Queries(무한 쿼리)는 `무한 스크롤`이나 `load more(더 보기)`과 같이 특정 조건에서 데이터를 추가적으로 받아오는 기능을 구현할 때 사용하면 유용하다.
- react-query는 이러한 무한 쿼리를 지원하기 위해 useQuery의 유용한 버전인 `useInfiniteQuery`을 지원한다.

```tsx
import { useInfiniteQuery } from "@tanstack/react-query";

// useInfiniteQuery의 queryFn의 매개변수는 `pageParam`이라는 프로퍼티를 가질 수 있다.
const fetchColors = async ({
  pageParam,
}: {
  pageParam: number;
}): Promise<AxiosResponse<PaginationColors>> => {
  return await axios.get(`http://localhost:4000/colors?page=${pageParam}`);
};

const InfiniteQueries = () => {
  const { data, hasNextPage, isFetching, isFetchingNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey: ["colors"],
      queryFn: fetchColors,
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) => {
        return allPages.length < 4 && allPages.length + 1;
      },
      // ...
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
- useInfiniteQuery는 반환 값으로 `isFetchingNextPage`, `isFetchingPreviousPage`, `fetchNextPage`, `fetchPreviousPage`, `hasNextPage` 등이 추가적으로 있다.
  - data.pages: 모든 페이지 데이터를 포함하는 배열이다.
  - data.pageParams: 모든 페이지 매개변수를 포함하는 배열이다.
  - fetchNextPage: `다음 페이지`를 fetch 할 수 있다.
  - fetchPreviousPage: `이전 페이지`를 fetch 할 수 있다.
  - isFetchingNextPage: `fetchNextPage` 메서드가 다음 페이지를 가져오는 동안 true이다.
  - isFetchingPreviousPage: `fetchPreviousPage` 메서드가 이전 페이지를 가져오는 동안 true이다.
  - hasNextPage: 가져올 수 있는 `다음 페이지`가 있을 경우 true이다.
  - hasPreviousPage: 가져올 수 있는 `이전 페이지`가 있을 경우 true이다.

<br />

### 주요 옵션

1. initialPageParam: `TPageParam`

- initialPageParam을 이용해서 첫 페이지를 가져올 때 사용할 기본 페이지 매개변수이다. `필수값`이다.

#### 중요한 동작 특성

- `initialPageParam`은 쿼리가 처음 실행될 때 `pageParams[0]`에 기록되며, **동일한 queryKey를 가진 쿼리의 전체 캐시 생명주기 동안 고정된 값으로 유지**된다.
- 만약 여러 컴포넌트에서 동일한 `queryKey`를 사용하지만 서로 다른 `initialPageParam` 값으로 `useInfiniteQuery`를 호출하는 경우, **가장 먼저 호출된 값이 일관되게 사용**된다.

#### queryKey와의 관계

- 서로 다른 `initialPageParam` 값을 사용하는 경우, **queryKey에도 해당 값을 포함**시켜야 한다.
- `initialPageParam`이 다르면 사실상 다른 데이터 세트를 의미하므로, **queryKey도 그에 맞춰 구분**되어야 한다.
- 즉, `initialPageParam`의 값이 변경될 때마다 queryKey도 함께 변경하는 것이 올바른 패턴이다.

```typescript
// 잘못된 예: 같은 queryKey로 다른 initialPageParam 사용
const query1 = useInfiniteQuery({
  queryKey: ["posts", "infinite"], // 동일한 queryKey
  queryFn: fetchPosts,
  initialPageParam: 0, // 첫 번째 호출: 0이 사용됨
});

const query2 = useInfiniteQuery({
  queryKey: ["posts", "infinite"], // 동일한 queryKey
  queryFn: fetchPosts,
  initialPageParam: 10, // 두 번째 호출: 무시되고 여전히 0이 사용됨
});

// 올바른 예: initialPageParam 값을 queryKey에 포함
const query1 = useInfiniteQuery({
  queryKey: ["posts", "infinite", { initialPage: 0 }], // initialPageParam을 queryKey에 반영
  queryFn: fetchPosts,
  initialPageParam: 0,
});

const query2 = useInfiniteQuery({
  queryKey: ["posts", "infinite", { initialPage: 10 }], // initialPageParam을 queryKey에 반영
  queryFn: fetchPosts,
  initialPageParam: 10,
});
```

2. getNextPageParam: `(lastPage, allPages, lastPageParam, allPageParams) => TPageParam | undefined | null`

- getNextPageParam 을 이용해서 페이지를 증가시킬 수 있다. `필수값`이다.
  - getNextPageParam의 첫 번째 인자 `lastPage`는 fetch 해온 가장 최근에 가져온 페이지 목록이다.
  - 두 번째 인자 `allPages`는 현재까지 가져온 모든 페이지 데이터이다.
  - 세 번째 인자 `firstPageParam` 는 첫 번째 페이지의 매개변수이다.
  - 네 번째 인자 `allPageParams` 는 모든 페이지의 매개변수이다.
- 사용 가능한 다음 페이지가 없음을 표시하려면 `undefined` 또는 `null`을 반환하면 된다.
- `getPreviousPageParam`도 존재하며, `getNextPageParam`와 반대의 속성을 갖고 있다.

3. maxPages: `number | undefined`

- infinite 쿼리에 저장할 `최대 페이지 수`이다.
- 최대 페이지 수에 도달했는데 새 페이지를 가져오면 `지정된 방향(next, previous)`에 따라 페이지 배열에서 첫 번째 페이지 또는 마지막 페이지가 제거된다.
- `0` 또는 `undefined`라면 페이지 수는 무제한이다.

<br />

### 💡 pageParam

- `queryFn`에 넘겨주는 pageParam가 단순히 다음 page의 값만을 관리할 수 있는 것은 아니다.
- pageParam 값은 `getNextPageParam`에서 원하는 형태로 변경시켜 줄 수 있다.
- 무슨 말인지 예시를 보면 이해가 쉽다. 👍 아래와 같이 getNextPageParam에서 반환 데이터가 단순히 다음 페이지값이 아닌 객체로 반환한다고 해보자.

```tsx
const { data, hasNextPage, isFetching, isFetchingNextPage, fetchNextPage } =
  useInfiniteQuery({
    queryKey: ["colors"],
    queryFn: ({ pageParam }) => fetchColors(pageParam), // pageParam: { page: number; etc: string }
    initialPageParam: {
      page: number,
      etc: "hi",
    },
    getNextPageParam: (lastPage, allPages) => {
      return (
        allPages.length < 4 && {
          page: allPages.length + 1,
          etc: "bye",
        };
      )
    },
  });
```

- 그러면 `queryFn`에 넣은 pageParam에서 getNextPageParam에서 반환한 객체를 받아올 수 있다.

```tsx
const fetchColors = async ({
  page,
  etc,
}: {
  page: number;
  etc: string;
}): Promise<AxiosResponse<PaginationColors>> => {
  return await axios.get(
    `http://localhost:4000/colors?page=${page}?etc=${etc}`
  );
};
```

- 즉, getNextPageParam의 반환 값이 pageParams로 들어가기 때문에 pageParams를 원하는 형태로 변경하고 싶다면 getNextPageParam의 반환 값을 설정하면 된다.

<br />

## useMutation

[목차 이동](#주요-컨셉-및-가이드-목차)

- [useMutation 공식 문서](https://tanstack.com/query/v5/docs/react/reference/useMutation)
- react-query에서 기본적으로 서버에서 데이터를 Get 할 때는 useQuery를 사용한다.
- 만약 서버의 data를 post, patch, put, delete와 같이 수정하고자 한다면 이때는 useMutation을 이용한다.
- 요약하자면 `R(read)는 useQuery`, `CUD(Create, Update, Delete)는 useMutation`을 사용한다.

```tsx
const mutation = useMutation({
  mutationFn: createTodo,
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
  mutate({ title });
};
```

- useMutation의 반환 값인 mutation 객체의 `mutate` 메서드를 이용해서 요청 함수를 호출할 수 있다.
- mutate는 `onSuccess`, `onError` 메서드를 통해 성공했을 시, 실패했을 시 response 데이터를 핸들링할 수 있다.
- `onMutate`는 mutation 함수가 실행되기 전에 실행되고, mutation 함수가 받을 동일한 변수가 전달된다.
- `onSettled`는 try...catch...finally 구문의 `finally`처럼 요청이 성공하든 에러가 발생하든 상관없이 마지막에 실행된다.

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

### 💡 mutate와 mutateAsync는 무엇을 사용하는 게 좋을까?

- 대부분의 경우에 우리는 mutate를 사용하는 것이 유리하다. 왜냐하면 mutate는 콜백(onSuccess, onError)를 통해 data와 error에 접근할 수 있기 때문에 우리가 특별히 핸들링해 줄 필요가 없다.
- 하지만 mutateAsync는 Promise를 직접 다루기 때문에 이런 에러 핸들링 같은 부분을 직접 다뤄야 한다.
  - 만약 이를 다루지 않으면 `unhandled promise rejection` 에러가 발생할 수 있다.
- [TkDodo Blog: Mutate or MutateAsync](https://tkdodo.eu/blog/mastering-mutations-in-react-query#mutate-or-mutateasync)

<br />

### 💡 useMutation callback과 mutate callback의 차이

- useMutation은 onSuccess, onError, onSettled와 같은 Callback 함수들을 가질 수 있다.
- 그뿐만 아니라, mutate 역시 위와 같은 Callback 함수들을 가질 수 있다.
- 둘의 동작은 같다고 생각할 수 있지만 약간의 차이가 있다. 다음과 같다.
  - useMutation의 Callback 함수와 mutate의 Callback 함수는 독립적으로 실행된다.
  - 순서는 `useMutation의 Callback -> mutate의 Callback` 순으로 실행된다.
  - mutation이 완료되기 전에 컴포넌트가 unmount된다면 mutate의 Callback은 실행되지 않을 수 있다.
- `TkDodo`는 위와 같은 이유로 둘을 분리해서 사용하는 것이 적절하다고 한다.
  - 꼭 필요한 로직(ex. `쿼리 초기화`)은 useMutation의 Callback으로 실행시킨다.
  - 리다이렉션 및 UI 관련 작업은 mutate Callback에서 실행시킨다.
- [TkDodo Blog: Some callbacks might not fire](https://tkdodo.eu/blog/mastering-mutations-in-react-query#some-callbacks-might-not-fire)

<br />

## cancelQueries

[목차 이동](#주요-컨셉-및-가이드-목차)

- [Query Cancellation 공식 문서](https://tanstack.com/query/v5/docs/react/guides/query-cancellation)
- 쿼리를 `수동으로 취소`하고 싶을 수도 있다.
  - 예를 들어 요청을 완료하는 데 시간이 오래 걸리는 경우 사용자가 취소 버튼을 클릭하여 요청을 중지하도록 허용할 수 있다.
  - 또는, 아직 HTTP 요청이 끝나지 않았을 때, 페이지를 벗어날 때도 중간에 취소해서 불필요한 네트워크 리소스를 개선할 수 있다.
- 이렇게 하려면 쿼리를 취소하고 이전 상태로 되돌리기 위해 `queryClient.cancelQueries(queryKey)`를 사용할 수 있다. 또한 react-query는 쿼리 취소뿐만아니라 queryFn의 Promise도 취소한다.

```tsx
const query = useQuery({
  queryKey: ["super-heroes"],
  queryFn: getAllSuperHero,
});

const queryClient = useQueryClient();

const onCancelQuery = (e) => {
  e.preventDefault();

  queryClient.cancelQueries({
    queryKey: ["super-heroes"],
  });
};

return <button onClick={onCancelQuery}>Cancel</button>;
```

<br />

## 쿼리 무효화

[목차 이동](#주요-컨셉-및-가이드-목차)

- invalidateQueries은 화면을 최신 상태로 유지하는 가장 간단한 방법이다.
- 예를 들면, 게시판 목록에서 어떤 게시글을 `작성(Post)`하거나 게시글을 `제거(Delete)`했을 때 화면에 보여주는 게시판 목록을 실시간으로 최신화해야 할 때가 있다.
- 하지만 이때, `query Key`가 변하지 않으므로 강제로 쿼리를 무효화하고 최신화를 진행해야 하는데, 이런 경우에 `invalidateQueries()` 메소드를 이용할 수 있다.
- 즉, query가 오래되었다는 것을 판단하고 다시 `refetch`를 할 때 사용한다!

```tsx
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const useAddSuperHeroData = () => {
  const queryClient = useQueryClient();

  return useMutation(addSuperHero, {
    onSuccess(data) {
      queryClient.invalidateQueries({ queryKey: ["super-heroes"] }); // 이 key에 해당하는 쿼리가 무효화!
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
queryClient.invalidateQueries({ queryKey: ["super-heroes"] });

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
  - [Disabling/Pausing Queries 공식 문서](https://tanstack.com/query/v5/docs/react/guides/disabling-queries) 참고
- 자세한 내용은 [queryClient.invalidateQueries 정리](https://github.com/ssi02014/react-query-tutorial/blob/master/document/queryClient.md#invalidateQueries)를 참고하자.

<br />

## 캐시 데이터 즉시 업데이트

[목차 이동](#주요-컨셉-및-가이드-목차)

- [queryClient.setQueryData 공식 문서](https://tanstack.com/query/v5/docs/reference/QueryClient#queryclientsetquerydata)
- 바로 위에서 `queryClient.invalidateQueries`를 이용해 캐시 데이터를 최신화하는 방법을 알아봤는데 `queryClient.setQueryData`를 이용해서도 데이터를 즉시 업데이트할 수 있다.
- `queryClient.setQueryData`는 쿼리의 캐시 된 데이터를 즉시 업데이트하는 데 사용할 수 있는 `동기 함수`이다.
- setQueryData의 두 번째 인자는 `updater` 함수이다. 해당 함수의 첫 번째 매개변수는 `oldData`로 기존 데이터를 가져온다.

```tsx
const useAddSuperHeroData = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addSuperHero,
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

- `Optimistic Update(낙관적 업데이트)`란 서버 업데이트 시 UI에서도 어차피 업데이트할 것이라고(낙관적인) 가정해서 `미리 UI를 업데이트` 시켜주고 서버를 통해 검증받고 업데이트 또는 롤백하는 방식이다.
- 예를 들어 facebook에 좋아요 버튼이 있는데 이것을 유저가 누른다면, 일단 client 쪽 state를 먼저 업데이트한다. 그리고 만약에 실패한다면, 예전 state로 돌아가고 성공하면 필요한 데이터를 다시 fetch 해서 서버 데이터와 확실히 연동을 진행한다.
- Optimistic Update가 정말 유용할 때는 인터넷 속도가 느리거나 서버가 느릴 때이다. 유저가 행한 액션을 기다릴 필요 없이 바로 업데이트되는 것처럼 보이기 때문에 사용자 경험(UX) 측면에서 좋다.

```tsx
const useAddSuperHeroData = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutateFn: addSuperHero,
    onMutate: async (newHero: any) => {
      await queryClient.cancelQueries({ queryKey: ["super-heroes"] });

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
      return { previousHeroData };
    },
    // mutation이 실패하면 onMutate에서 반환된 context를 사용하여 롤백 진행
    onError(error, hero, context: any) {
      queryClient.setQueryData(["super-heroes"], context.previousHeroData);
    },
    // 오류 또는 성공 후에는 항상 refetch
    onSettled() {
      queryClient.invalidateQueries({ queryKey: ["super-heroes"] });
    },
  });
};
```

- 참고로 위 예제에서 `cancelQueries`는 쿼리를 `수동으로 취소`시킬 수 있다. 취소시킬 query의 queryKey를 cancelQueries의 인자로 보내 실행시킨다.
- 예를 들어, 요청을 완료하는 데 시간이 오래 걸리는 경우, 사용자가 취소 버튼을 클릭하여 요청을 중지하는 경우 이용할 수 있다.

<br />

## useQueryErrorResetBoundary

[목차 이동](#주요-컨셉-및-가이드-목차)

- [useQueryErrorResetBoundary 공식 문서](https://tanstack.com/query/v5/docs/react/reference/useQueryErrorResetBoundary)
- react-query에서 ErrorBoundary와 useQueryErrorResetBoundary를 결합해 `선언적`으로 에러가 발생했을 때 Fallback UI를 보여줄 수 있다.
- ErrorBoundary에 대한 설명은 해당 문서 참고 [ErrorBoundary](https://github.com/ssi02014/react-query-tutorial/blob/master/document/errorBoundary.md)

<br />

- `useQueryErrorResetBoundary`는 `ErrorBoundary`와 함께 사용되는데 이는, 기본적으로 리액트 공식 문서에서 기본 코드 베이스가 제공되긴 하지만 좀 더 쉽게 활용할 수 있는 `react-error-boundary` 라이브러리가 존재하고, react-query 공식 문서에서도 해당 라이브러리 사용을 예시로 제공해 주기 때문에 `react-error-boundary`를 설치해서 사용해 보자.

```bash
$ npm i react-error-boundary
# or
$ pnpm add react-error-boundary
# or
$ yarn add react-error-boundary
# or
$ bun add react-error-boundary
```

- 설치 후에 아래와 같은 QueryErrorBoundary라는 컴포넌트를 생성하고, 그 내부에 `useQueryErrorResetBoundary` 훅을 호출해 `reset` 함수를 가져온다.
- 아래 코드 내용은 단순하다.
  - Error가 발생하면 ErrorBoundary의 `fallbackRender` prop으로 넘긴 내용이 렌더링 되고, 그렇지 않으면 children 내용이 렌더링 된다.
  - 또한, fallbackRender에 넣어주는 콜백 함수 매개 변수로 `resetErrorBoundary`를 구조 분해 할당을 통해 가져올 수 있는데, 이를 통해 모든 쿼리 에러를 `초기화`할 수 있다. 아래 코드 같은 경우에는 button을 클릭하면 에러를 초기화하게끔 작성했다.

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

- 그리고 App.js에다 QueryErrorBoundary 컴포넌트를 추가하면 된다. 여기서 주의할 점은 queryClient 옵션에다 `{ throwOnError: true }`를 추가해야 한다는 점이다. 그래야 오류가 발생했을 때 `ErrorBoundary` 컴포넌트가 감지할 수 있다.

```tsx
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import QueryErrorBoundary from "./components/ErrorBoundary"; // (*)

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      throwOnError: true, // (*) 여기서는 글로벌로 세팅했지만, 개별 쿼리로 세팅 가능
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

- ErrorBoundary는 에러가 발생했을 때 보여주는 Fallback UI를 `선언적`으로 작성할 수 있고, 리액트 쿼리는 `Suspense`와도 결합해서 `서버 통신 상태가 로딩 중`일 때 Fallback UI를 보여줄 수 있게 선언적으로 작성할 수 있다.
- 참고로, Suspense 컴포넌트는 리액트 v16부터 제공되는 `Component Lazy Loading`이나 `Data Fetching` 등의 비동기 처리를 할 때, 응답을 기다리는 동안 Fallback UI(ex: Loader)를 보여주는 기능을 하는 컴포넌트다.

```tsx
import { Suspense } from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // suspense: true, - 💡 v5부터 Deprecated
      // useQuery/useInfiniteQuery와 같은 일반 훅 대신 useSuspenseQuery/useSuspenseInfiniteQuery와 같은 suspense 훅 사용
      throwOnError: true,
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
- Suspense컴포넌트 내부에서 어떤 로직이 동작하는지 우리는 신경 쓰지 않아도된다. 이처럼 `내부 복잡성을 추상화`하는 게 바로 `선언형 컴포넌트`이다.
- 위와 같이 `react-query(useSuspenseQuery)`와 결합한 `Suspense`는 아래와 같은 과정으로 동작한다.

```
1. Suspense mount
2. MainComponent mount
3. MainComponent에서 useSuspenseQuery 훅을 사용하여 비동기 데이터 요청
4. MainComponent unmount, fallback UI인 Loader mount
5. 비동기 데이터 요청이 완료되면 fallback UI인 Loader unmount
6. MainComponent mount
```

<br />

### 💡 New hooks for suspense

- [new hooks for suspense](https://github.com/ssi02014/react-query-tutorial/blob/main/document/v5.md#21-%EF%B8%8F-new-hooks-for-suspense)
- v5에서는 `data fetching`에 대한 `suspense`가 마침내 안정화되었습니다.
- `useSuspenseQuery`, `useSuspenseInfiniteQuery`, `useSuspenseQueries` 3가지 훅이 추가되었습니다.
- 기존의 `suspense 옵션`은 제거되었습니다. 따라서 Suspense를 적용하려면 위 훅들을 활용해야 합니다.
- 위 3가지 훅을 사용하게 되면 타입 레벨에서 `data`가 `undefined` 상태가 되지 않습니다.

```tsx
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";

const fetchGroups = async (): Promise<{ data: Group[] }> => {
  const res = await axios.get("/groups");
  return res;
};

// as-is
const { data } = useQuery({
  queryKey: ["groups"],
  queryFn: fetchGroups,
  select: (data) => data.data,
});

// to-be
const { data } = useSuspenseQuery({
  queryKey: ["groups"],
  queryFn: fetchGroups,
  select: (data) => data.data,
});
```

<br />

### 💡 @suspensive/react-query

- TanStack Query(React) 공식 문서의 `Community Resources`에서는 Suspense를 더 `타입 세이프`하게 잘 사용하기 위해 [useSuspenseQuery](https://suspensive.org/ko/docs/react-query/useSuspenseQuery), [useSuspenseQueries](https://suspensive.org/ko/docs/react-query/useSuspenseQueries), [useSuspenseInfiniteQuery](https://suspensive.org/ko/docs/react-query/useSuspenseInfiniteQuery)를 제공하는 [@suspensive/react-query](https://tanstack.com/query/v4/docs/react/community/suspensive-react-query)를 소개하고 있다.

- suspensive/react-query의 훅(useSuspenseQuery, useSuspenseQueries, useSuspenseInfiniteQuery)은 @tanstack/react-query v5 버전에 추가([관련 Pull Request](https://github.com/TanStack/query/pull/5739))되고 공식 API로 [이 페이지](https://tanstack.com/query/v5/docs/react/guides/suspense)에서 확인할 수 있습니다.

<br />

## Default Query Function

[목차 이동](#주요-컨셉-및-가이드-목차)

- [Default Query Function 공식 문서](https://tanstack.com/query/v5/docs/react/guides/default-query-function)
- 앱 전체에서 동일한 쿼리 함수를 공유하고, `queryKey`를 사용해 가져와야 할 데이터를 식별하고 싶다면 `QueryClient`에 `queryFn` 옵션을 통해 Default Query Function을 지정해 줄 수 있다.

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
  return useQuery({ queryKey: ["super-hero", heroId] });
};
```

```tsx
// 다음 형태는 불가능
const useSuperHeroData = (heroId: string) => {
  return useQuery({
    queryKey: ["super-hero", heroId],
    queryFn: () => getSuperHero(heroId),
  });
};
```

- useQuery의 첫 번째 인자로 `queryKey`만 넣어주면 두 번째 인자에 들어갈 `queryFn`은 자동으로 설정된 기본 쿼리 함수가 들어간다.
- 일반적으로 `useQuery`를 사용할 때와 달리 `queryFn`을 지정하지 않기에 쿼리 함수에 직접 인자를 넣어주는 형태의 사용은 불가능하다.

<br />

## React Query Typescript

[목차 이동](#주요-컨셉-및-가이드-목차)

- React Query는 TypeScript의 `제네릭(Generics)`을 많이 사용한다. 이는 라이브러리가 실제로 데이터를 가져오지 않고 API가 반환하는 데이터 유형을 알 수 없기 때문이다.

<br />

### useQuery

현재 useQuery가 갖고 있는 제네릭은 `4개`이며, 다음과 같다.

1. **TQueryFnData**: useQuery로 실행하는 query function의 `실행 결과`의 타입을 지정하는 제네릭 타입이다.
2. **TError**: query function의 `error` 형식을 정하는 제네릭 타입이다.
3. **TData**: useQuery의 `data에 담기는 실질적인 데이터`의 타입을 말한다. 첫 번째 제네릭과의 차이점은 `select`와 같이 query function의 반환 데이터를 추가 핸들링을 통해 반환하는 경우에 대응할 수 있는 타입이라고 생각하면 좋다.
4. **TQueryKey**: useQuery의 첫 번째 인자 `queryKey`의 타입을 명시적으로 지정해 주는 제네릭 타입이다.

```tsx
// useQuery의 타입
export function useQuery<
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>
```

```tsx
import { AxiosError } from "axios";

// useQuery 타입 적용 예시
const { data } = useQuery<
  AxiosResponse<Hero[]>,
  AxiosError,
  string[],
  ["super-heroes", number]
>({
  queryKey: ["super-heroes", id],
  queryFn: getSuperHero,
  select: (data) => {
    const superHeroNames = data.data.map((hero) => hero.name);
    return superHeroNames;
  },
});

/**
 주요 타입
 * data: string[] | undefined
 * error: AxiosError<any, any>
 * select: (data: AxiosResponse<Hero[]>): string[]
 */
```

<br />

### useMutation

useMutation도 useQuery와 동일하게 현재 4개이며, 다음과 같다.

1. **TData**: useMutation에 넘겨준 mutation function의 `실행 결과`의 타입을 지정하는 제네릭 타입이다.
   - data의 타입과 onSuccess(1번째 인자) 인자의 타입으로 활용된다.
2. **TError**: useMutation에 넘겨준 mutation function의 `error` 형식을 정하는 제네릭 타입이다.
3. **TVariables**: `mutate 함수`에 전달 할 인자를 지정하는 제네릭 타입이다.
   - onSuccess(2번째 인자), onError(2번째 인자), onMutate(1번째 인자), onSettled(3번째 인자) 인자의 타입으로 활용된다.
4. **TContext**: mutation function을 실행하기 전에 수행하는 `onMutate 함수의 return값`을 지정하는 제네릭 타입이다.
   - onMutate의 결과값의 타입을 onSuccess(3번째 인자), onError(3번째 인자), onSettled(4번째 인자)에서 활용하려면 해당 타입을 지정해야 한다.

```tsx
export function useMutation<
  TData = unknown,
  TError = DefaultError,
  TVariables = void,
  TContext = unknown
>
```

```tsx
// useMutation 타입 적용 예시
const { mutate } = useMutation<Todo, AxiosError, number, number>({
  mutationFn: postTodo,
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
 * data: Todo
 * error: AxiosError<any, any>
 * onSuccess: (res: Todo, id: number, nextId: number)
 * onError: (err: AxiosError, id: number, nextId: number)
 * onMutate: (id: number)
 * onSettled: (res: Todo, err: AxiosError, id: number, nextId: number),
*/
```

<br />

### useInfiniteQuery

현재 useInfiniteQuery 갖고 있는 제네릭은 `4개`이며, useQuery와 유사하다.

1. **TQueryFnData**: useInfiniteQuery로 실행하는 query function의 `실행 결과`의 타입을 지정하는 제네릭 타입이다.
2. **TError**: query function의 `error` 형식을 정하는 제네릭 타입이다.
3. **TData**: useInfiniteQuery의 `data에 담기는 실질적인 데이터`의 타입을 말한다. 첫 번째 제네릭과의 차이점은 `select`와 같이 query function의 반환 데이터를 추가 핸들링을 통해 반환하는 경우에 대응할 수 있는 타입이라고 생각하면 좋다.
4. **TQueryKey**: useInfiniteQuery의 첫 번째 인자 `queryKey`의 타입을 명시적으로 지정해 주는 제네릭 타입이다.

```tsx
export function useInfiniteQuery<
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = InfiniteData<TQueryFnData>,
  TQueryKey extends QueryKey = QueryKey
>
```

```tsx
const {
  data,
  hasNextPage,
  fetchNextPage,
  //...
} = useInfiniteQuery<
  AxiosResponse<PaginationColors>,
  AxiosError,
  InfiniteData<AxiosResponse<PaginationColors>, number>,
  ["colors"]
>({
  queryKey: ["colors"],
  queryFn: fetchColors,
  initialPageParam: 1,
  getNextPageParam: (lastPage, allPages) => {
    return allPages.length < 4 && allPages.length + 1;
  },
  // ...options
});

/**
 주요 타입
 * data: InfiniteData<AxiosResponse<PaginationColors>, number> | undefined
 * error: AxiosError<any, any>
 * select: (data: InfiniteData<AxiosResponse<PaginationColors>, number>): InfiniteData<AxiosResponse<PaginationColors>, number>
 * getNextPageParam: GetNextPageParamFunction<number, AxiosResponse<PaginationColors>>
*/
```

<br />

### 💡 Typescript Best Practice

- [TypeScript 공식 문서](https://tanstack.com/query/v5/docs/react/typescript)
- 위의 제네릭을 모두 사용하는 건 코드의 복잡도가 늘어난다. 하지만 react query는 타입을 잘 전달하므로 굳이 제네릭을 모두 직접 제공할 필요가 없다.
- 가장 좋은 방법은 `queryFn`의 타입을 잘 정의해서 `타입 추론`이 원활하게 되게 하는 것이다.

```tsx
const fetchGroups = async (): Promise<AxiosResponse<Group[]> => {
  return await axios.get("/groups");
};

const { data } = useQuery({
  queryKey: ["groups"],
  queryFn: fetchGroups,
  select: (data) => data.data,
});

/**
 주요 타입
 * data: AxiosResponse<Group[]> | undefined
 * error: Error | null
 * select: (data: AxiosResponse<Group[]>): Group[]
 */
```

<br />

## React Query ESLint Plugin

[목차 이동](#주요-컨셉-및-가이드-목차)

- Tanstack Query는 `자체 ESLint Plugin`을 제공합니다. 해당 플러그인을 통해 모범 사례를 적용하고, 일반적인 실수를 방지할 수 있습니다.

### 설치

```bash
$ npm i -D @tanstack/eslint-plugin-query
# or
$ pnpm add -D @tanstack/eslint-plugin-query
# or
$ yarn add -D @tanstack/eslint-plugin-query
# or
$ bun add -D @tanstack/eslint-plugin-query
```

<br />

### 사용 방법(1)

- 플러그인에 대한 `권장하는 모든 rule`을 적용하려면 아래와 같이 `.eslintrc.js` 파일의 `extends`배열 안에 `plugin:@tanstack/eslint-plugin-query/recommended`을 추가합니다.

```js
module.exports = {
  // ...
  extends: ["plugin:@tanstack/eslint-plugin-query/recommended"],
  rules: {
    /* 수정하고자 하는 rule 추가 가능... */
  },
};
```

- 물론, rule을 변경하고 싶다면 rules에 아래 `사용방법(2)`와 같이 rule을 추가하면 됩니다.

<br />

### 사용 방법(2)

- 원하는 `rule`을 개별적으로 설정해서 적용하려면 아래와 같이 `.eslintrc.js` 파일의 `plugins`배열 안에 `@tanstack/query`를 추가하고, 적용하고자 하는 `rules`에 규칙을 추가합니다.

```js
module.exports = {
  // ...
  plugins: ["@tanstack/query"],
  rules: {
    "@tanstack/query/exhaustive-deps": "error",
    "@tanstack/query/no-rest-destructuring": "warn",
    "@tanstack/query/stable-query-client": "error",
  },
};
```

<br />

## 지원 버전

[목차 이동](#주요-컨셉-및-가이드-목차)

- Tanstack Query v5에 필요한 TypeScript 최소 버전은 `v4.7`입니다.
- Tanstack Query v5에 필요한 React 최소 버전은 `v18`입니다.

  - React v18 이상에서 지원하는 `useSyncExternalStore` 훅을 사용하고 있기 때문입니다.

- Tanstack Query v5의 브라우저별 지원 버전은 아래와 같습니다.

```
Chrome >= 91
Firefox >= 90
Edge >= 91
Safari >= 15
iOS >= 15
opera >= 77
```

<br />
