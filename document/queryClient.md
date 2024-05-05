# 💻 QueryClient 주요 내용

## QueryClient

- react-query에서 QueryClient의 인스턴스를 사용하여 캐시와 상호작용 할 수 있으며, 기본적인 사용법은 다음과 같다.

```js
// v4
import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
});

// v3
import { QueryClient } from "react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
});
```

### Option

- queryCache?: QueryCache
  - `Optional`
  - 해당 queryClient 연결된 query 캐시 입니다.
  - 잘 안쓰이지는 않음
- mutationCache?: MutationCache
  - `Optional`
  - 해당 queryClient와 연결된 mutation cache입니다.
  - 잘 안쓰이지는 않음
- logger?: Logger
  - `v4`
  - Optional
  - 해당 queryClient의 디버깅 정보, 경고 및 오류를 기록하는 데 사용하는 로거입니다. 설정하지 않으면 console기본 로거입니다.
- defaultOptions?: DefaultOptions
  - Optional
  - 모든 query 및 mutation에 대한 기본값을 정의합니다.
  - 자주 쓰임 ⭐️

<br />

## 자주 쓰이는 QueryClient 옵션

### 📃 목차

1. [queryClient.useQueryClient](#useQueryClient)
2. [queryClient.getQueryData](#getQueryData)
3. [queryClient.getQueriesData](#getQueriesData)
4. [queryClient.setQueryData](#setQueryData)
5. [queryClient.setQueriesData](#setQueriesData)
6. [queryClient.invalidateQueries](#invalidateQueries)
7. [queryClient.refetchQueries](#refetchQueries)
8. [queryClient.cancelQueries](#cancelQueries)
9. [queryClient.removeQueries](#removeQueries)
10. [queryClient.resetQueries](#resetQueries)
11. [queryClient.clear](#clear)

<br />

## 🙏 참고로 v3 형태를 v4에서 대부분 지원합니다 🙏

<br />

### useQueryClient

- 일반적으로 QueryClient의 옵션들을 이용할 때는 현재 QueryClient의 인스턴스를 반환하는 `useQueryClient Hook`을 사용합니다.

```js
// v3
import { useQueryClient } from "react-query";

const queryClient = useQueryClient();

// v4
import { useQueryClient } from "@tanstack/react-query";

const queryClient = useQueryClient({ context });
// context?: React.Context<QueryClient | undefined>
// 사용자 정의 React Query Context를 사용할 때 해당 옵션 사용함
```

<br />

### getQueryData

- queryClient.getQueryData는 `기존 쿼리의 캐시된 데이터를 가져오는 데 사용할 수 있는 동기 함수`입니다. 쿼리가 존재하지 않으면 `undefined`를 반환합니다.

```js
// v3
const data = queryClient.getQueryData(queryKey);

// v4
const data = queryClient.getQueryData({ queryKey });
```

```js
// 실제 예제
const queryData = queryClient.getQueryData(["super-heroes"]);
```

```ts
// type
getQueryData<TQueryFnData = unknown>(queryKey: QueryKey, filters?: QueryFilters): TQueryFnData | undefined;
```

<br />

### getQueriesData

- queryClient.getQueriesData는 `여러 쿼리의 데이터를 가져오는데 사용할 수 있는 동기 함수` 입니다. 전달된 `queryKey` 또는 `filters`와 일치하는 쿼리만 반환합니다. 일치하는 쿼리가 없으면 `빈 배열`이 반환됩니다.
- [Query filters](https://tanstack.com/query/v4/docs/framework/react/guides/filters#query-filters)

```js
// v3/v4
const data = queryClient.getQueriesData(queryKey | filters);
```

- **v4에서는 v3 형태도 지원합니다**

```ts
// type
getQueriesData<TQueryFnData = unknown>(queryKey: QueryKey): [QueryKey, TQueryFnData | undefined][];
getQueriesData<TQueryFnData = unknown>(filters: QueryFilters): [QueryKey, TQueryFnData | undefined][];
```

<br />

### setQueryData

- queryClient.setQueryData는 `캐싱된 쿼리 데이터를 즉시 업데이트하는데 사용할 수 있는 동기 함수`입니다.
- invalidateQueries와 더불어 캐시 데이터를 최신화할 때 많이 사용한다.

```js
// v3/v4
queryClient.setQueryData(["super-hero"], (oldData) => {
  return {
    ...oldData,
    data: [...oldData.data, data.data],
  };
});
```

- **v4에서는 v3 형태도 지원합니다**

```ts
// type
setQueryData<TQueryFnData>(queryKey: QueryKey, updater: Updater<TQueryFnData | undefined, TQueryFnData | undefined>, options?: SetDataOptions): TQueryFnData | undefined;
```

<br />

### setQueriesData

- queryClient.setQueriesData는 `필터 기능을 사용하거나 쿼리 키를 부분적으로 일치시켜 여러 쿼리의 캐시된 데이터를 즉시 업데이트하는데 사용할 수 있는 동기 함수`이다.
- 전달된 queryKey 또는 filters와 일치하는 쿼리만 업데이트되며, 새 캐시 항목이 생성되지 않는다.

```js
// v3/v4
queryClient.setQueriesData(["super-hero"], (oldData) => {
  return {
    ...oldData,
    data: [...oldData.data, data.data],
  };
});
```

- **v4에서는 v3 형태도 지원합니다**

```ts
setQueriesData<TQueryFnData>(queryKey: QueryKey, updater: Updater<TQueryFnData | undefined, TQueryFnData | undefined>, options?: SetDataOptions): [QueryKey, TQueryFnData | undefined][];
setQueriesData<TQueryFnData>(filters: QueryFilters, updater: Updater<TQueryFnData | undefined, TQueryFnData | undefined>, options?: SetDataOptions): [QueryKey, TQueryFnData | undefined][];
```

<br />

### invalidateQueries

- queryClient.invalidateQueries는 setQueryData와 더불어 `캐시 데이터를 최신화`할 때 많이 사용하는 함수이다. ([쿼리 무효화 예제](https://github.com/ssi02014/react-query-tutorial#%EC%BF%BC%EB%A6%AC-%EB%AC%B4%ED%9A%A8%ED%99%94)) 단일 또는 여러 쿼리를 무효화하고, 다시 가져오는데 많이 사용한다.
- 기본적으로 일치하는 모든 쿼리는 즉시 유효하지 않은 것으로 표시되고, 활성 쿼리는 백드라운드에서 다시 가져온다.
- 만약, 활성 쿼리를 다시 가져오는 것을 원하지 않으면 v3에서는 `refetchActive: false`, v4에서는 `refetchType: 'none'`를 사용할 수 있다.
- 반대로 비 활성화 쿼리를 다시 가져오기를 원한다면 v3에서는 `refetchInactive: true`, v4에서는 `refetchType: 'all'`을 사용할 수 있다.
- 참고로 query 옵션으로 `enabled: false` 옵션을 주면 queryClient가 쿼리를 다시 가져오는 방법들 중 `invalidateQueries`와 `refetchQueries`를 무시한다.

```js
// v3
await queryClient.invalidateQueries(
  ["super-heroes"],
  {
    exact,
    refetchActive: true,
    refetchInactive: false,
  },
  { throwOnError, cancelRefetch }
);

// v4
await queryClient.invalidateQueries(
  {
    queryKey: ["super-heroes"],
    exact,
    refetchType: "active",
  },
  { throwOnError, cancelRefetch }
);

// exact옵션을 줬기 때문에 쿼리 키와 정확히 일치하는 쿼리만을 무효화하고 다시 가져온다.
```

- 추가적으로 invalidateQueries가 무효화하는 `쿼리 범위`는 기본적으로`상위 -> 하위`로 전파된다. 이게 무슨 말이냐면 아래와 같이 `['super-heros']` 쿼리를 무효화 하게 되면 아래 하위 쿼리들도 모두 초기화된다.

```js
queryClient.invalidateQueries({
  queryKey: ["super-heroes"],
});

["super-heros"],
["super-heros", 'superman'],
["super-heros", { id: 1} ],
```

- 위와 같이 `['super-heros']` 쿼리를 무효화 하게 되면 아래 하위 쿼리들도 모두 초기화된다.
- 하지만 `해당 key만` 무효화 시키려면 첫 번째 예제 코드에서도 언급했듯이 `exact` 옵션을 주면 된다.

<br />

- **v4에서는 v3 형태도 지원합니다**

```ts
// type
invalidateQueries<TPageData = unknown>(filters?: InvalidateQueryFilters<TPageData>, options?: InvalidateOptions): Promise<void>;
invalidateQueries<TPageData = unknown>(queryKey?: QueryKey, filters?: InvalidateQueryFilters<TPageData>, options?: InvalidateOptions): Promise<void>;
```

<br />

### refetchQueries

- queryClient.refetchQueries는 `특정 조건에 따라 쿼리를 다시 가져오는 데 사용하는 함수`이다.
- 참고로 query 옵션으로 `enabled: false` 옵션을 주면 queryClient가 쿼리를 다시 가져오는 방법들 중 `invalidateQueries`와 `refetchQueries`를 무시한다.

```js
// v3
// 모든 쿼리를 다시 가져온다
await queryClient.refetchQueries();

// 모든 stale 상태의 쿼리를 다시 가져온다.
await queryClient.refetchQueries({ stale: true });

// 쿼리 키와 부분적으로 일치하는 모든 활성 쿼리를 다시 가져온다.
await queryClient.refetchQueries(["super-heroes"], { active: true });

// exact 옵션을 줬기 때문에 쿼리 키와 정확히 일치하는 모든 활성 쿼리를 다시 가져온다.
await queryClient.refetchQueries(["super-heroes", 1], {
  active: true,
  exact: true,
});
```

```js
// v4
// 모든 쿼리를 다시 가져온다
await queryClient.refetchQueries();

// 모든 stale 상태의 쿼리를 다시 가져온다.
await queryClient.refetchQueries({ stale: true });

// 쿼리 키와 부분적으로 일치하는 모든 활성 쿼리를 다시 가져온다.
await queryClient.refetchQueries({
  queryKey: ["super-heroes"],
  type: "active",
});

// exact 옵션을 줬기 때문에 쿼리 키와 정확히 일치하는 모든 활성 쿼리를 다시 가져온다.
await queryClient.refetchQueries({
  queryKey: ["super-heroes", 1],
  type: "active",
  exact: true,
});

await queryClient.refetchQueries(
  {
    queryKey: ["super-heroes", 1],
    type: "active",
    exact: true,
  },
  { throwOnError, cancelRefetch }
);
```

- **v4에서는 v3형태로 지원합니다.**

```tsx
// type
refetchQueries<TPageData = unknown>(filters?: RefetchQueryFilters<TPageData>, options?: RefetchOptions): Promise<void>;
refetchQueries<TPageData = unknown>(queryKey?: QueryKey, filters?: RefetchQueryFilters<TPageData>, options?: RefetchOptions): Promise<void>;
```

<br />

### cancelQueries

- queryClient.cancelQueries는 `나가고 있는 액세스 가능한 쿼리를 수동적으로 취소시킬 수 있는 함수`이다.
- 해당 함수는 나가고 있는 쿼리를 수동으로 삭제할 수 있기 때문에 `낙관적 업데이트`를 할 때 수행할 때 많이 사용된다. ([낙관적 업데이트 참고](https://github.com/ssi02014/react-query-tutorial#optimistic-update))

```js
// v3
await queryClient.cancelQueries(["super-heroes"], { exact: true });

// v4
await queryClient.cancelQueries({ queryKey: ["super-heroes"], exact: true });
```

- **v4에서는 v3형태도 지원합니다.**

```ts
// type
cancelQueries(filters?: QueryFilters, options?: CancelOptions): Promise<void>;
cancelQueries(queryKey?: QueryKey, filters?: QueryFilters, options?: CancelOptions): Promise<void>;
```

<br />

### removeQueries

- queryClient.removeQueries는 액세스 가능한 캐시 쿼리를 제거할 때 사용하는 함수이다.

```js
// v3
queryClient.removeQueries(["super-heroes"], { exact: true });

// v4
queryClient.removeQueries({ queryKey: ["super-heroes"], exact: true });
```

- **v4에서는 v3형태도 지원합니다.**

```ts
removeQueries(filters?: QueryFilters): void;
removeQueries(queryKey?: QueryKey, filters?: QueryFilters): void;
```

<br />

### resetQueries

- queryClient.resetQueries는 `액세스 가능한 캐시 쿼리를 초기 상태로 재설정하는데 사용하는 함수`이다.
- 해당 함수는 clear와는 달리 모든 구독자를 제거하지 않고 구독자들에게 알린다. 또한 invalidateQueries와는 달리 쿼리를 미리 로드된 상태로 재설정한다.
- 만약, 쿼리 옵션으로 `initialData`가 있는 경우 쿼리의 데이터가 해당 데이터로 재설정된다.

```js
// v3
queryClient.resetQueries(["super-heroes"], { exact: true });

// v4
queryClient.resetQueries({ queryKey: ["super-heroes"], exact: true });
```

- **v4에서는 v3형태도 지원합니다.**

```ts
// type
resetQueries<TPageData = unknown>(filters?: ResetQueryFilters<TPageData>, options?: ResetOptions): Promise<void>;
resetQueries<TPageData = unknown>(queryKey?: QueryKey, filters?: ResetQueryFilters<TPageData>, options?: ResetOptions): Promise<void>;
```

<br />

### clear

- queryClient.clear는 연결된 모든 캐시를 제거한다.

```js
queryClient.clear();
```
