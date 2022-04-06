# 💻 React-query

## 📃 목차

1. [React-Query 기능](#기능)
2. [기본 설정(QueryClientProvider, QueryClient)](#react-query-기본-설정)
3. [useQuery](#usequery)
4. [useQuery Returns](#usequery-주요-리턴-데이터)
5. [React Query Devtools](#devtools)
6. [React Query 캐싱 라이프 사이클](#캐싱-라이프-사이클)
7. [staleTime과 cacheTime](#staletime-cachetime)
8. [마운트 될 때마다 재요청하는 refetchOnMount](#refetchonmount)
9. [윈도우 포커싱 될 때 재 요청하는 refetchOnWindowFocus](#refetchOnWindowFocus)
10. [Polling 방식을 구현하기 위한 refetchInterval와 refetchIntervalInBackground)](#polling)
11. [자동 실행의 enabled와 수동으로 쿼리를 다시 요청하는 refetch](#enabled-refetch)
12. [실패 쿼리에 대한 재 요청하는 retry](#retry)
13. [onSuccess, onError, onSettled Callback](#onsuccess-onerror-onsettled)
14. [select를 이용한 데이터 변환](#select)
15. [Paginated 구현에 유용한 keepPreviousData](#keeppreviousdata)
16. [쿼리를 병렬(Parallel) 요청할 수 있는 useQueries](#parallel)
17. [종속 쿼리(Dependent Queries)](#dependent-queries)
18. [QueryClient 인스턴스를 반환하는 useQueryClient](#usequeryclient)
19. [초기 데이터 설정할 수 있는 initialData](#initial-query-data)
20. [Infinite Queries](#infinite-queries)
21. [서버와 Http CUD관련 작업을 위한 useMutation과 mutate](#usemutation-mutate)
22. [쿼리 무효화 queryClient.invalidateQueries](#쿼리-무효화)
23. [캐시 데이터 즉시 업데이트를 위한 queryClient.setQueryData](#쿼리-무효화)

<hr />

## 📃 React-Query 개요 및 기능

### 👀 개요

- react-query는 리액트 애플리케이션에서 `서버 상태 가져오기`, `캐싱`, `동기화 및 업데이트`를 보다 쉽게 다룰 수 있도록 도와주며 클라이언트 상태와 서버 상태를 명확히 구분하기 위해서 만들어진 라이브러리이다.
- react-query에서 기존 상태 관리 라이브러리`(redux, mobX)`는 `클라이언트 상태 작업`에 적합하지만 `비동기 또는 서버 상태 작업`에는 그다지 좋지 않다고 말하고 있다.
- 클라이언트 상태(Client State) 와 서버 상태(Server State)는 완전히 다르며 클라이언트 상태는 컴포넌트에서 관리하는 각각의 input 값으로 예를 들 수 있고 서버 상태는 database에 저장되어있는 데이터로 예를 들 수 있다.

<br />

### 👀 기능

1. 선언적 및 자동

   - React Query에 데이터를 가져올 위치와 데이터가 얼마나 필요한지 알려주면 나머지는 자동이다. React Query는 구성이 필요 없는 즉시 캐싱, 백그라운드 업데이트 및 오래된 데이터를 처리합니다.

2. 간단하고 친숙한

   - promise 또는 async/await로 작업하는 방법을 알고 있다면 이미 React Query를 사용하는 방법을 알고 있는 것이다. 관리할 전역 상태, 감속기, 정규화 시스템 또는 이해해야 할 무거운 구성이 없다. 데이터를 해결하는(또는 오류를 발생시키는) 함수를 전달하기만 하면됀다.

3. 강력하고 구성 가능

   - React Query는 모든 사용 사례에 맞는 노브와 옵션을 사용하여 쿼리의 각 관찰자 인스턴스까지 구성할 수 있다. `전용 devtools`, `무한 로딩 API` 및 `데이터 업데이트`를 쉽게 만들어주는 mutation 도구가 있다.

4. 적은 코드. 더 적은 엣지 케이스.
   - 리듀서, 캐싱 로직, 타이머, 재시도 로직, 복잡한 비동기/대기 스크립팅을 평소 하던 코드보다 적은 양의 코드로 작성할 수 있다.

<br />

## 📃 React-Query 기본 설정

- `QueryClientProvider`, `QueryClient`
- 리액트 쿼리를 사용하기 위해서는 `QueryClientProvider`를 최상단에서 감싸주어야 한다.
- App.js에 `QueryClientProvider`로 이하 컴포넌트를 감싸고 `queryClient`를 내려보내줌 ⇒ 이 context는 앱에서 비동기 요청을 알아서 처리하는 background 계층이 됀다.
- `QueryClientProvider`는 구성 요소를 사용하여 QueryClient를 연결하고 응용 프로그램에 제공
- `QueryClient`를 사용하여 `캐시`와 상호 작용할 수 있습니다.

```jsx
// QueryClient 예제
import { QueryClient } from "react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
});
```

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

<br />

## 📃 useQuery

### 🤔 useQuery 기본 문법

- [useQuery 공식 사이트](https://react-query.tanstack.com/reference/useQuery)

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

const { isLoading, data } = useQuery("super-heroes", getSuperHero);
```

- useQuery는 기본적으로 3개의 인자를 받습니다. 첫 번째 인자가 `queryKey(필수)`, 두 번째 인자가 `queryFn(필수)`, 세 번째 인자가 `options`입니다.
- useQuery는 첫 번째 인자인 `queryKey`를 기반으로 데이터 캐싱을 관리합니다. `문자열` 또는 `배열`로 지정할 수 있는데, 일반적으로는 위 예제 처럼 `문자열`로 지정할 수 있지만, 만약 쿼리가 특정 변수에 의존하는 경우에는 아래 예제처럼 `배열`로 지정해 해당 변수를 추가해주어야 합니다.
- 사용법 1번과 2번 둘다 사용되는데. 접근 방식의 차이입니다. 두 가지 방식 모두 잘 이해하고 사용합시다.

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

- 두 번째 인자인 queryFn는 `promise`를 반환하는 함수를 넣어주어야 합니다.
- 세 번째 인자인 `options`에 많이 쓰이는 옵션들을 밑에서 설명하였습니다. 그외에는 위에 useQuery 참고 사이트를 통해 확인하면된다.

<br />

### 🤔 useQuery 주요 리턴 데이터

- data: 쿼리 함수가 리턴한 Promise에서 `resolved`된 데이터
- isLoading: `캐싱된 데이터가 없을때!` fetch 과정 중에 true 즉, 캐싱 데이터가 있으면 false
- isFetching: 데이터가 `fetch`될 때 false에서 true가 된다. 캐싱 데이터가 있어서 백그라운드에서 fetch 되더라도 true이다.
- error: 쿼리 함수가 오류가 발생한 경우에 대한 오류 객체
- isError: 에러가 발생한 경우 true

```js
const { isLoading, isError, error, data, isFetching } = useQuery(
  ["colors", pageNum],
  () => fetchColors(pageNum)
);
```

<br />

## 📃 Devtools

- React Query는 `전용 devtools`를 제공한다.
- devtools를 사용하면 React Query의 모든 내부 동작을 시각화하는데 도움이 되며 문제가 발생하면 디버깅 시간을 절약할 수 있다.

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

- panelProps (PropsObject)

  - 패널에 props을 추가할 수 있다. 예를 들어 className, style, onClick 등

- closeButtonProps( PropsObject)

  - 닫기 버튼에 props를 추가할 수 있다.

- toggleButtonProps (PropsObject)

  - 토글 버튼에 props를 추가할 수 있다.

- position?: ("top-left" | "top-right" | "bottom-left" | "bottom-right")

  - 기본값: `bottom-left`
  - devtools 패널을 열고 닫기 위한 로고 위치

<br />

## 📃 캐싱 라이프 사이클

- React-Query 캐시 라이플 사이클

```
* Query Instances with and without cache data(캐시 데이터가 있거나 없는 쿼리 인스턴스)
* Background Refetching(백그라운드 리패칭)
* Inactive Queries(비활성 쿼리)
* Garbage Collection(가비지 컬렉션)
```

1. A 쿼리 인스턴스가 mount 됨
2. 네트워크에서 데이터 fetch 하고 A라는 query key로 캐싱함
3. 이 데이터는 `fresh` 상태에서 staleTime(기본값 0) 이후 `stale` 상태로 변경됨
4. A 쿼리 인스턴스가 unmount 됨
5. 캐시는 cacheTime(기본값 5min) 만큼 유지되다가 가비지 콜렉터로 수집됨
6. 만일 cacheTime이 지나기 전에 A 쿼리 인스턴스가 새롭게 mount되면, fetch가 실행되고 fresh한 값을 가져오는 동안 캐시 데이터를 보여줌

<br />

## 📃 useQuery 주요 Options

### 🤔 staleTime cacheTime

- staleTime, cacheTime (number | Infinity)
- stale은 용어 뜻대로 `썩은` 이라는 의미이다. 즉, 최신 상태가 아니라는 의미이다.
- fresh는 뜻 그대로 `신선한` 이라는 의미이다. 즉, 최신 상태라는 의미이다.

```jsx
const { isLoading, isFetching, data, isError, error } = useQuery(
  "super-heroes",
  getSuperHero,
  {
    cacheTime: 3000,
    staleTime: 50000,
  }
);
```

1. staleTime
   - 데이터가 `fresh에서 stale` 상태로 변경되는데 걸리는 시간
   - `fresh` 상태일때는 쿼리 인스턴스가 새롭게 mount 되어도 네트워크 요청(fetch)이 일어나지 않는다.
   - 데이터가 한번 fetch 되고 나서 staleTime이 지나지 않았다면 unmount 후 mount 되어도 fetch가 일어나지 않는다.
   - staleTime의 기본값은 `0`이기 때문에 일반적으로 fetch 후에 바로 stale이 된다.
2. cacheTime
   - 데이터가 inactive 상태일 때 `캐싱된 상태로` 남아있는 시간
   - 쿼리 인스턴스가 unmount 되면 데이터는 inactive 상태로 변경되며, 캐시는 cacheTime만큼 유지된다.
   - cacheTime이 지나면 가비지 콜렉터로 수집된다.
   - cacheTime이 지나기 전에 쿼리 인스턴스가 다시 마운트 되면, 데이터를 fetch하는 동안 캐시 데이터를 보여준다.
   - cacheTime은 staleTime과 관계없이, 무조건 inactive 된 시점을 기준으로 캐시 데이터 삭제를 결정한다.
   - cacheTime의 기본값은 `5분`

<br />

### 🤔 refetchOnMount

```jsx
const { isLoading, isFetching, data, isError, error } = useQuery(
  "super-heroes",
  getSuperHero,
  {
    refetchOnMount: true,
  }
);
```

- refetchOnMount는 데이터가 `stale` 상태일 경우 마운트 시 마다 `refetch`를 실행하는 옵션이다.
- 기본값은 `true`인데 이게 베스트다.
- `'always'` 로 설정하면 마운트 시 마다 매번 refetch를 실행한다.
- `false`로 설정하면 최초 fetch 이후에는 refetch하지 않는다.

<br />

### 🤔 refetchOnWindowFocus

```jsx
const { isLoading, isFetching, data, isError, error } = useQuery(
  "super-heroes",
  getSuperHero,
  {
    refetchOnWindowFocus: true,
  }
);
```

- refetchOnWindowFocus는 데이터가 `stale` 상태일 경우 `윈도우 포커싱` 될 때 마다 refetch를 실행하는 옵션이다.
- 예를 들어, 크롬에서 다른 탭을 눌렀다가 다시 원래 보던 중인 탭을 눌렀을 때도 이 경우에 해당한다. 심지어 F12로 개발자 도구 창을 켜서 네트워크 탭이든, 콘솔 탭이든 개발자 도구 창에서 놀다가 페이지 내부를 다시 클릭했을 때도 이 경우에 해당한다.
- 기본값은 `true`이다.
- `always` 로 설정하면 항상 윈도우 포커싱 될 때 마다 refetch를 실행한다는 의미이다.

<br />

### 🤔 Polling

```jsx
const { isLoading, isFetching, data, isError, error } = useQuery(
  "super-heroes",
  getSuperHero,
  {
    // refetchInterval: 2000,
    refetchIntervalInBackground: true,
  }
);
```

- 폴링이란? 리얼타임 웹을 위한 기법으로 `일정한 주기(특정한 시간)`를 가지고 서버와 응답을 주고받는 방식이 폴링 방식이다.
- react-query에서는 `refetchInterval`을 이용해서 구현할 수 있다.
- `refetchIntervalInBackground` 으로도 폴링을 구현할 수 있는데 `refetchInterval` 탭/창이 백그라운드에 있는 동안 계속 다시 가져옵니다.

<br />

### 🤔 enabled refetch

```jsx
const { isLoading, isFetching, data, isError, error, refetch } = useQuery(
  "super-heroes",
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

- `enabled`는 쿼리가 자동으로 실행되지 않도록 할 때 설정할 수 있다. `false`를 주면 자동 실행되지 않는다.
- `refetch`는 쿼리를 수동으로 다시 요청하는 기능이다. 쿼리 오류가 발생하면 오류만 기록된다. 오류를 발생시키려면 `throwOnError`속성을 `true`로해서 전달해야 한다.
- 보통 자동으로 쿼리 요청을 하지 않고 버튼 클릭이나 특정 이벤트를 통해 요청을 시도할 때 같이 사용한다.

<br />

### 🤔 retry

```jsx
const result = useQuery(["todos", 1], fetchTodoListPage, {
  retry: 10, // 오류를 표시하기 전에 실패한 요청을 10번 재시도합니다.
});
```

- retry가 `false`인 경우 실패한 쿼리는 기본적으로 다시 시도하지 않는다.
- `true`인 경우에는 실패한 쿼리에 대해서 무한 재요청을 시도한다.
- 값으로 `숫자`를 넣을 경우 실패한 쿼리가 해당 숫자를 충족할 때까지 요청을 재시도한다.
- 기본값은 `3`이다.

<br />

### 🤔 onSuccess onError onSettled

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
  "super-heroes",
  getSuperHero,
  {
    onSuccess,
    onError,
    onSettled,
  }
);
```

- `onSuccess` 함수는 쿼리 요청이 성공적으로 진행되서 새 데이터를 가져오거나 캐시가 업데이트될 때마다 실행된다.
- `onError` 함수는 쿼리에 오류가 발생하고 오류가 전달되면 실행된다.
- `onSettled` 함수는 쿼리 요청이 성공, 실패 모두 실행된다.

<br />

### 🤔 select

```jsx
const { isLoading, isFetching, data, isError, error, refetch } = useQuery(
  "super-heroes",
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

### 🤔 keepPreviousData

```jsx
const fetchColors = (pageNum: number) => {
  return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageNum}`);
};

const { isLoading, isError, error, data, isFetching, isPreviousData } =
  useQuery(["colors", pageNum], () => fetchColors(pageNum), {
    keepPreviousData: true,
  });
```

- `keepPreviousData`를 true로 설정하면 쿼리 키가 변경되어서 새로운 데이터를 요청하는 동안에도 마지막 data 값을 유지한다.
- `keepPreviousData`은 `페이지네이션`과 같은 기능을 구현할 때 편리하다. 캐시되지 않은 페이지를 가져올 때 목록이 `깜빡깜빡거리는 현상을 방지`할 수 있다.
- 또한, `isPreviousData` 값으로 현재의 쿼리 키에 해당하는 값인지 확인할 수 있다.

<br />

## 📃 Parallel

```jsx
const { data: superHeroes } = useQuery("super-heroes", fetchSuperHeroes);
const { data: friends } = useQuery("friends", fetchFriends);
```

- 몇 가지 상황을 제외하면 쿼리 여러개가 선언되어 있는 일반적인 상황일 때 쿼리 함수들은 `그냥 병렬로 요청되서 처리`된다.
- 이러한 특징은 쿼리 처리의 `동시성`을 극대화 시킨다.

```jsx
const queryResults = useQueries(
  heroIds.map((id) => ({
    queryKey: ["super-hero", id],
    queryFn: () => fetchSuperHero(id),
  }))
);
```

- 하지만, 쿼리 여러개를 동시에 수행해야 하는데, 렌더링이 거듭되는 사이사이에 계속 쿼리가 수행되어야 한다면 쿼리를 수행하는 로직이 hook룰에 위배될 수도 있다. 이럴 때는 `uesQueries`를 사용한다.

<br />

## 📃 Dependent Queries

- `종속 쿼리`는 어떤 A라는 쿼리가 있는데 이 A쿼리를 실행하기 전에 사전에 완료되야 하는 B 쿼리가 있는데, 이러한 B쿼리에 의존하는 A쿼리를 종속 쿼리라고 한다.
- react-query에서는 쿼리를 실행할 준비가 되었다는 것을 알려주는 `enabled` 옵션을 통해 종속 쿼리를 쉽게 구현할 수 있다.

```jsx
const DependantQueriesPage = ({ email }: Props) => {
  // 사전에 완료되야할 쿼리
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

## 📃 useQueryClient

- useQueryClient는 `QueryClient` 인스턴스를 반환한다.
- `QueryClient`는 캐시와 상호작용 한다.

```jsx
import { useQueryClient } from "react-query";

const queryClient = useQueryClient();
```

<br />

## 📃 Initial Query Data

- 쿼리에 대한 `초기 데이터`가 필요하기 전에 캐시에 제공하는 방법이 있다. 아래 예제 참고
- initialData 옵션을 통해서 쿼리를 미리 채우는데 사용할 수 있으며, 초기 로드 상태도 건너띌 수 있다.

```jsx
  const useSuperHeroData = (heroId: string) => {
  const queryClient = useQueryClient();
  return useQuery(['super-hero', heroId], fetchSuperHero, {
    initialData: () => {
      const queryData = queryClient.getQueryData('super-heroes') as any;
      const hero = queryData?.data?.find(
        (hero: Hero) => hero.id === parseInt(heroId)
      );

      if (hero) return { data: hero };
      return undefined;
    },
  });
};
```

- 참고로 위 예제에서 `queryClient.getQueryData` 메서드는 기존 쿼리의 `캐시된 데이터`를 가져오는데 사용할 수 있는 동기 함수이다. 쿼리가 존재하지 않으면 `undefined`를 반환한다.

<br />

## 📃 Infinite Queries

- 무한 쿼리는 무한 스크롤이나 load more 같이 특정 조건에서 데이터를 추가적으로 받아오는 기능 구현할 때 사용하면 유용하다.

```jsx
import { useInfiniteQuery } from "react-query";

const fetchColors = ({ pageParam = 1 }) => {
  return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageParam}`);
};

const InfiniteQueries = () => {
  const { data, hasNextPage, isFetching, isFetchingNextPage, fetchNextPage } =
    useInfiniteQuery("colors", fetchColors, {
      getNextPageParam: (lastPage, allPages) => {
        if (allPages.length < 4) {
          return allPages.length + 1;
        } else {
          return undefined;
        }
      },
    });

  return (
    <div>
      {data?.pages.map((group, idx) => (
        <Fragment key={idx}>
          {group.data.map((color: any) => (
            <h2 key={color.id}>
              {color.id}. {color.label}
            </h2>
          ))}
        </Fragment>
      ))}
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

<b>Returns</b>

- `useInfiniteQuery`는 기본적으로 useQuery와 사용법은 비슷하지만 차이점이 있다.
- useInfiniteQuery는 반환값으로 isFetchingNextPage, isFetchingPreviousPage, fetchNextPage, fetchPreviousPage 등이 추가적으로 있다.
  - `fetchNextPage`를 호출하면 다음 페이지를 fetch 할 수 있다.
  - `fetchPreviousPage`를 호출하면 이전 페이지를 fetch 할 수 있다.
  - `isFetchingNextPage`은 `fetchNextPage` 메서드가 다음 페이지를 가져오는 동안 true이다. 즉, 초기값은 true이고, 데이터를 가져오면 false가 된다.
  - `isFetchingPreviousPage`은 `fetchPreviousPage` 메서드가 이전 페이지를 가져오는 동안 true이다. 즉, 초기값은 true이고, 데이터를 가져오면 false가 된다.
  - `hasNextPage`는 가져올 수 있는 다음 페이지가 있을 경우 true이다.

<b>옵션</b>

- `pageParam`이라는 프로퍼티가 존재하며 queryFn에 할당해줘야한다. 이때 기본값을 `1`로 해줘야한다.
- 그리고 `getNextPageParam`을 이용해서 페이지를 증가시킨다.
  - 이때, getNextPageParam의 첫 번째 인자 `lastPage`는 fetch 해온 가장 최근에 가져온 페이지 목록이다.
  - 두 번째 인자 `allPages`는 현재까지 가져온 모든 페이지들 데이터이다.
- `getPreviousPageParam`도 존재하며, `getNextPageParam`와 반대의 속성을 갖고 있다.
- 그리고 요청이 성공하고 반환되는 data는 `pages`라는 프로퍼티를 갖고있으며, pages는 `group`이라는 프로퍼티를 갖고있다.

<br />

## 📃 useMutation mutate

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
- mutate는 `onSuccess`, `onError` 메서드를 통해 성공 했을 시, 실패 했을 시 response 데이터를 핸들링할 수 있다.
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
- Redux와 같은 Request 성공 액션을 미들웨어에서 확인하여 추가 액션을 실행하는 것 같은 작업을 할 때는, mutate는 onSuccess, onError와 같은 메서드를 같이 사용해야 되기때문에 `mutateAsync가 더 가독성이 좋다`

<br />

## 📃 쿼리 무효화

- 이것은 개념적으로 화면을 최신 상태로 유지하는 가장 간단한 방법이다..
- 예를 들면, 게시판 목록에서 어떤 게시글을 `작성(Post)`하거나 게시글을 `제거(Delete)`했을 때 화면에 보여주는 게시판 목록을 실시간 최신화 해야될 때가 있다.
- 하지만 이때, `query Key`가 변하지 않으므로 이럴때 강제 리프레쉬를 진행해야 하는데 이때, `queryClient`의 `invalidateQueries()` 메소드를 이용한다.
- 즉, query가 오래 되었다는 것을 판단하고 다시 `refetch`를 할 때 사용한다!

```tsx
import { useMutation, useQuery, useQueryClient } from "react-query";

const useAddSuperHeroData = () => {
  const queryClient = useQueryClient();
  return useMutation(addSuperHero, {
    onSuccess(data) {
      queryClient.invalidateQueries("super-heroes"); // 이 key에 해당 하는 쿼리가 무효화!
      console.log(data);
    },
    onError(err) {
      console.log(err);
    },
  });
};
```

- 만약 무효화 하려는 키가 여러개라면 아래 예제와 같이 다음과 같이 배열로 보내주면 된다.

```tsx
queryClient.invalidateQueries(["super-heroes", "posts", "comment"]);
```

<br />

### 🤔 캐시 데이터 즉시 업데이트

- 바로 위에서 `queryClient.invalidateQueries`를 이용해 캐시 데이터를 최신화하는 방법을 알아봤는데 queryClient.setQueryData를 이용해서도 데이터를 즉시 업데이트 할 수 있다.
- `queryClient.setQueryData`는 쿼리의 캐시된 데이터를 즉시 업데이트하는 데 사용할 수 있는 `동기 함수`이다.

```tsx
const useAddSuperHeroData = () => {
  const queryClient = useQueryClient();
  return useMutation(addSuperHero, {
    onSuccess(data) {
      queryClient.setQueryData("super-heroes", (oldData: any) => {
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
