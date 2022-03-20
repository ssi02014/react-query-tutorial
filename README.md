# 💻 React-query, Redux-Toolkit

## 📃 json-server

- json-server 실행

```
   yarn server-json
```

## 📃 React-Query 개요 및 기능

### 👀 개요

- React를 위한 강력하고 성능 좋은 데이터 동기화
  `전역 상태`를 건드리지 않고도 React 및 React Native 애플리케이션에서 데이터를 가져오고, 캐시하고, 업데이트할 수 있습니다.

<br />

### 👀 기능

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

- [useQuery 참고 사이트](https://react-query.tanstack.com/reference/useQuery)

  <br />

### 🤔 QueryClientProvider, QueryClient

- 리액트 쿼리를 사용하기 위해서는 `QueryClientProvider`를 최상단에서 감싸주어야 한다.
- App.js에 `QueryClientProvider`로 이하 컴포넌트를 감싸고 `queryClient`를 내려보내줌 ⇒ 이 context는 앱에서 비동기 요청을 알아서 처리하는 background 계층이 됨
- `QueryClientProvider`는 구성 요소를 사용하여 QueryClient를 연결하고 응용 프로그램에 제공
- `QueryClient`를 사용하여 캐시와 상호 작용할 수 있습니다.

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

### 🤔 useQuery

```jsx
// 기본 문법(1)
const { data, isLoading, ... } =  useQuery(queryKey, queryFn, {});

// 기번 문법(2)
const result = useQuery({
  queryKey,
  queryFn,
  enabled,
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
- useQuery는 첫 번째 인자인 `queryKey`를 기반으로 데이터 캐싱을 관리합니다. `문자열` 또는 `배열`로 지정할 수 있는데, 일반적으로는 위 예제 처럼 문자열로 지정할 수 있지만, 만약 쿼리가 변수에 의존하는 경우에는 아래 예제처럼 배열로 지정해 해당 변수를 추가해주어야 합니다.
- 1번과 2번 방식으로 많이 사용합니다. 두 가지 방식의 차이점을 잘 이해하고 사용합시다.

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

- 두 번째 인자인 queryFn는 promise를 반환하는 함수를 넣어주어야 합니다.
- 세 번째 인자인 options에 많이 쓰이는 옵션들을 밑에서 설명하였습니다.

<br />

### 🤔 useQuery Error Handle

- useQuery 주로 사용되는 3가지 return 값 중에서 isError와 error 프로퍼티로 에러처리를 할 수 있다.

```js
const getSuperHero = useCallback(() => {
  return axios.get("http://localhost:4000/superheroes1");
}, []);

const { isLoading, data, isError, error } = useQuery(
  "super-heroes",
  getSuperHero
);
```

<br />

### 🤔 React Query Devtools

- React Query는 전용 devtools를 제공한다.
- devtools를 사용하면 React Query의 모든 내부 동작을 시각화하는데 도움이 되며 문제가 발생하면 디버깅 시간을 절약할 수 있다.

```jsx
import { ReactQueryDevtools } from "react-query/devtools";

<AppContext.Provider value={user}>
  <QueryClientProvider client={queryClient}>
    // ...
    <ReactQueryDevtools />
  </QueryClientProvider>
</AppContext.Provider>;
```

1. initialIsOpen (Boolean)

   - `true`이면 개발 도구가 기본적으로 열려 있도록 설정할 수 있다.

2. panelProps (PropsObject)

   - 패널에 props을 추가할 수 있다. 예를 들어 className, style, onClick 등

3. closeButtonProps( PropsObject)

   - 닫기 버튼에 props를 추가할 수 있다.

4. toggleButtonProps (PropsObject)

   - 토글 버튼에 props를 추가할 수 있다.

5. position?: ("top-left" | "top-right" | "bottom-left" | "bottom-right")

   - 기본값: `bottom-left`
   - devtools 패널을 열고 닫기 위한 로고 위치

<br />

### 🤔 React Query 캐싱

- 캐시 라이플 사이클

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

### 🤔 isFetching, isLoading

- isFetching : 데이터가 fetch될 때 false에서 true가 된다. 캐싱 데이터가 있어서 백그라운드에서 fetch 되더라도 true이다.
- isLoading : 캐싱된 데이터가 없을때 fetch 과정 중에 true 즉, 캐싱 데이터가 있으면 false

<br />

### 🤔 staleTime, cacheTime (number | Infinity)

- stale은 용어 뜻대로 `썩은` 이라는 의미이다. 즉, 최신 상태가 아니라는 의미이다. fresh는 뜻 그대로 `신선한` 이라는 의미이다. 즉, 최신 상태라는 의미

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
   - 데이터가 `fresh -> stale` 상태로 변경되는데 걸리는 시간
   - `fresh` 상태일때는 쿼리 인스턴스가 새롭게 mount 되어도 네트워크 요청(fetch)이 일어나지 않는다.
   - 데이터가 한번 fetch 되고 나서 staleTime이 지나지 않았다면 unmount 후 mount 되어도 fetch가 일어나지 않는다.
   - staleTime의 기본값은 `0`
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

- refetchOnMount는 데이터가 `stale` 상태일 경우 마운트 시 마다 refetch를 실행하는 옵션이다.
- 기본값은 `true`인데 이게 베스트다.
- `'always'` 로 설정하면 마운트 시 마다 매번 refetch를 실행한다.
- `false`로 설정하면 최초 fetch 이후에는 refetch하지 않는다.

<br />

### 🤔 refetchOnWindowFocus (boolean | "always")

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

### 🤔 Polling(refetchInterval, refetchIntervalInBackground)

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

### 🤔 enabled와 refetch

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

### 🤔 onSuccess와 onError Callback

```jsx
const onSuccess = useCallback((data) => {
  console.log("Success", data);
}, []);

const onError = useCallback((err) => {
  console.log("Error", err);
}, []);

const { isLoading, isFetching, data, isError, error, refetch } = useQuery(
  "super-heroes",
  getSuperHero,
  {
    onSuccess,
    onError,
  }
);
```

- `onSuccess` 함수는 쿼리 요청이 성공적으로 진행되서 새 데이터를 가져오거나 캐시가 업데이트될 때마다 실행된다.
- `onError` 함수는 쿼리에 오류가 발생하고 오류가 전달되면 실행된다.

<br />

### 🤔 select로 데이터 변환

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

### 🤔 Parallel(병렬)

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

### 🤔 Dependent Queries(종속 쿼리)

- 종속 쿼리는 어떤 A라는 쿼리가 있는데 이 A쿼리를 실행하기 전에 사전에 완료되야 하는 B 쿼리가 있는데, 이러한 B쿼리에 의존하는 A쿼리를 종속 쿼리라고 한다.
- react-query에서는 쿼리를 실행할 준비가 되었다는 것을 알려주는 enabled 옵션을 통해 종속 쿼리를 쉽게 구현할 수 있다.

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

### 🤔 useQueryClient

- useQueryClient는 `QueryClient` 인스턴스를 반환한다.
- `QueryClient`는 캐시와 상호작용 한다.

```jsx
import { useQueryClient } from "react-query";

const queryClient = useQueryClient();
```

<br />

### 🤔 Initial Query Data

- 쿼리에 대한 초기 데이터가 필요하기 전에 캐시에 제공하는 방법이 있다. 아래 예제 참고
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
