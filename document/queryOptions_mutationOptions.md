# 💻 queryOptions & mutationOptions 주요 내용

- `queryOptions`와 `mutationOptions`는 쿼리/뮤테이션 옵션을 한곳에 모아 두고, 여러 곳에서 `타입 안전하게` 재사용하기 위한 헬퍼입니다.
- 런타임에서는 인자로 받은 객체를 `그대로 반환하는 항등 함수`이기 때문에 추가적인 런타임 비용이 없습니다. 즉, 온전히 `타입스크립트를 위한 헬퍼`라고 생각하면 됩니다.
- 지원 버전은 다음과 같습니다.
  - `queryOptions`, `infiniteQueryOptions`: `v5.0.0`부터
  - `mutationOptions`: `v5.82.0`부터

<br />

## 📃 목차

1. [queryOptions가 필요한 이유](#queryoptions가-필요한-이유)
2. [queryOptions 기본 사용법](#queryoptions-기본-사용법)
3. [queryOptions와 함께 쓰는 API](#queryoptions와-함께-쓰는-api)
4. [컴포넌트 단위 옵션 재정의](#컴포넌트-단위-옵션-재정의)
5. [타입이 붙은 queryKey(DataTag)](#타입이-붙은-querykeydatatag)
6. [initialData와 skipToken 오버로드](#initialdata와-skiptoken-오버로드)
7. [Query Key Factory 패턴](#query-key-factory-패턴)
8. [infiniteQueryOptions](#infinitequeryoptions)
9. [mutationOptions](#mutationoptions)
10. [mutationOptions 사용 시 주의할 점](#mutationoptions-사용-시-주의할-점)
11. [정리](#정리)

<br />

## queryOptions가 필요한 이유

- `useQuery`에 옵션을 인라인으로 작성하면 타입 추론이 자연스럽게 동작합니다. 하지만 여러 곳에서 재사용하려고 옵션을 별도 함수로 분리하는 순간, `queryKey`가 들고 있던 데이터 타입 정보가 사라집니다.

```ts
// ❌ 일반 객체로 분리한 경우
const groupOptions = (id: number) => ({
  queryKey: ["groups", id],
  queryFn: () => fetchGroups(id),
  staleTime: 5 * 1000,
});

// useQuery의 data는 추론되지만,
const { data } = useQuery(groupOptions(1));

// 명령형 API에서는 queryKey에 타입 정보가 없어 unknown이 됩니다.
const groups = queryClient.getQueryData(groupOptions(1).queryKey);
//    ^? unknown
```

- `queryOptions`로 감싸면 반환된 `queryKey`가 `queryFn의 반환 타입`을 함께 들고 다니기 때문에, 명령형 API에서도 제네릭을 매번 명시할 필요가 없습니다.

```ts
// ✅ queryOptions로 감싼 경우
const groups = queryClient.getQueryData(groupOptions(1).queryKey);
//    ^? Group[] | undefined
```

<br />

## queryOptions 기본 사용법

- `queryOptions`에는 `useQuery`에 넘길 수 있는 옵션을 그대로 넘길 수 있으며, `queryKey`는 `필수값`입니다.

```ts
import { queryOptions } from "@tanstack/react-query";

export const groupOptions = (id: number) =>
  queryOptions({
    queryKey: ["groups", id],
    queryFn: () => fetchGroups(id),
    staleTime: 5 * 1000,
    // ...options
  });
```

- 인자가 필요 없다면 함수로 감싸지 않고 상수로 선언해도 됩니다.

```ts
export const groupsOptions = queryOptions({
  queryKey: ["groups"],
  queryFn: fetchGroups,
});
```

<br />

## queryOptions와 함께 쓰는 API

- `queryOptions`가 반환한 객체는 쿼리 옵션을 받는 대부분의 훅과 `queryClient` 메서드에 그대로 넘길 수 있습니다.

```ts
// 훅
useQuery(groupOptions(1));
useSuspenseQuery(groupOptions(1));
useQueries({
  queries: [groupOptions(1), groupOptions(2)],
});

// queryClient 메서드
queryClient.prefetchQuery(groupOptions(1));
queryClient.fetchQuery(groupOptions(1));
queryClient.ensureQueryData(groupOptions(1));
```

- `queryKey`만 필요한 메서드에는 `.queryKey`를 꺼내서 넘겨줍니다.

```ts
queryClient.setQueryData(groupOptions(1).queryKey, newGroups);
queryClient.invalidateQueries({ queryKey: groupOptions(1).queryKey });
queryClient.cancelQueries({ queryKey: groupOptions(1).queryKey });
```

- 💡 이렇게 하면 `queryKey` 포맷을 여러 파일에 흩뿌리지 않아도 되므로, [쿼리 무효화](https://github.com/ssi02014/react-query-tutorial#쿼리-무효화)나 [캐시 데이터 즉시 업데이트](https://github.com/ssi02014/react-query-tutorial#캐시-데이터-즉시-업데이트)에서 자주 발생하는 `queryKey 포맷 불일치` 문제를 방지할 수 있습니다.

<br />

## 컴포넌트 단위 옵션 재정의

- 공통 옵션은 그대로 두고, 컴포넌트에서 필요한 옵션만 덮어쓸 수 있습니다. 대표적으로 컴포넌트마다 다른 `select` 함수를 붙이는 패턴이 있습니다.

```ts
const { data } = useQuery({
  ...groupOptions(1),
  select: (data) => data.map((group) => group.name),
});

/**
 * 타입 추론이 유지되므로 data는 select의 반환 타입이 됩니다.
 * data: string[] | undefined
 */
```

<br />

## 타입이 붙은 queryKey(DataTag)

- `queryOptions`가 반환하는 `queryKey`에는 `DataTag`라는 타입 정보가 함께 붙습니다. 덕분에 `queryClient`의 명령형 API에서 제네릭 없이도 타입이 추론됩니다.

```ts
// ✅ 제네릭을 명시하지 않아도 됩니다.
const groups = queryClient.getQueryData(groupsOptions.queryKey);
//    ^? Group[] | undefined

// ❌ 직접 배열을 넘기면 매번 제네릭을 명시해야 합니다.
const groups2 = queryClient.getQueryData<Group[]>(["groups"]);
```

- `setQueryData`의 `updater` 함수도 이전 데이터 타입을 추론합니다.

```ts
queryClient.setQueryData(groupsOptions.queryKey, (oldData) => {
  // oldData: Group[] | undefined
  return oldData ? [...oldData, newGroup] : oldData;
});
```

- 💡 단, `getQueriesData`는 서로 다른 타입의 쿼리 결과를 배열로 반환하기 때문에 타입 추론이 동작하지 않습니다. 이때는 제네릭을 직접 명시해야 합니다.

```ts
const entries = queryClient.getQueriesData<Group[]>({
  queryKey: groupsOptions.queryKey,
});
//    ^? Array<[QueryKey, Group[] | undefined]>
```

<br />

## initialData와 skipToken 오버로드

### 1. initialData

- `initialData`를 함께 넘기면 `data`가 `undefined`가 되지 않는 오버로드가 선택됩니다. 즉, 컴포넌트에서 `data`를 옵셔널 체이닝 없이 바로 사용할 수 있습니다.

```tsx
export const postsOptions = queryOptions({
  queryKey: ["posts"],
  queryFn: fetchPosts,
  initialData: [],
});

function Posts() {
  const { data, isError, error } = useQuery(postsOptions);

  return (
    <div>
      {isError ? <span>Error: {error.message}</span> : null}
      <ul>
        {/* data: Post[] (undefined가 아닙니다) */}
        {data.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}
```

<br />

### 2. skipToken

- 특정 조건에서만 쿼리를 실행해야 한다면 `queryFn`에 `skipToken`을 넘길 수 있습니다. `enabled: false`와 비슷하게 쿼리를 실행하지 않지만, `queryFn`의 인자가 `undefined`일 수 있는 상황을 타입 레벨에서 안전하게 처리할 수 있습니다.

```tsx
import { queryOptions, skipToken, useQuery } from "@tanstack/react-query";

export const postOptions = (postId: number | undefined) =>
  queryOptions({
    queryKey: ["post", postId],
    queryFn: postId != null ? () => fetchPost(postId) : skipToken,
  });

function Post({ postId }: { postId: number | undefined }) {
  const { data, isLoading, isError, error } = useQuery(postOptions(postId));

  if (postId == null) return "Select a post";
  if (isLoading) return "Loading...";
  if (isError) return <span>Error: {error.message}</span>;

  return <h1>{data?.title}</h1>;
}
```

<br />

## Query Key Factory 패턴

- `queryOptions`를 모아 두면 별도의 `query key factory` 라이브러리 없이도 도메인별 쿼리를 한곳에서 관리할 수 있습니다.

```ts
import { queryOptions } from "@tanstack/react-query";

export const postQueries = {
  all: () =>
    queryOptions({
      queryKey: ["posts"],
      queryFn: fetchPosts,
    }),
  detail: (id: number) =>
    queryOptions({
      queryKey: ["posts", id],
      queryFn: () => fetchPost(id),
      staleTime: 60 * 1000,
    }),
};
```

```ts
// 사용 예시
useQuery(postQueries.detail(1));
queryClient.prefetchQuery(postQueries.detail(2));

// ["posts"]를 포함하는 모든 쿼리가 무효화됩니다.
queryClient.invalidateQueries({ queryKey: postQueries.all().queryKey });
```

<br />

## infiniteQueryOptions

- 무한 쿼리에는 `infiniteQueryOptions`를 사용합니다. 사용법은 `queryOptions`와 동일하며, `initialPageParam`과 `getNextPageParam`을 함께 정의할 수 있습니다.

```ts
import { infiniteQueryOptions, useInfiniteQuery } from "@tanstack/react-query";

export const colorsOptions = () =>
  infiniteQueryOptions({
    queryKey: ["colors"],
    queryFn: ({ pageParam }) => fetchColors(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return allPages.length < 4 ? allPages.length + 1 : undefined;
    },
  });

const { data, fetchNextPage, hasNextPage } = useInfiniteQuery(colorsOptions());
```

<br />

## mutationOptions

- `v5.82.0`부터 뮤테이션에도 동일한 헬퍼인 `mutationOptions`가 추가됐습니다. `useMutation`에 넘길 수 있는 옵션을 그대로 넘길 수 있습니다.
- `queryOptions`와 달리 추가적인 타입 정보를 붙이지 않고 `받은 객체를 그대로 반환`합니다. 즉, 옵션 객체에 대한 타입 검사와 자동 완성을 받기 위한 헬퍼입니다.

### 1. mutationKey가 없는 형태

- `useMutationState`나 필터로 뮤테이션을 찾아 쓸 일이 없다면 `mutationKey`를 생략할 수 있습니다.

```tsx
import { mutationOptions, useMutation } from "@tanstack/react-query";

export const createPostOptions = mutationOptions({
  mutationFn: createPost,
});

function CreatePost() {
  const { mutate } = useMutation(createPostOptions);

  return <button onClick={() => mutate({ title: "Hello" })}>Create</button>;
}
```

<br />

### 2. mutationKey가 있는 형태

- `mutationKey`를 지정하면 나중에 `useMutationState`, `useIsMutating` 등으로 해당 뮤테이션의 상태를 조회할 수 있습니다.

```tsx
import { mutationOptions, useMutationState } from "@tanstack/react-query";

export const createPostOptions = mutationOptions({
  mutationKey: ["posts", "create"],
  mutationFn: createPost,
});

// 전역 "저장 중..." 인디케이터
function SavingIndicator() {
  const isCreatingPost =
    useMutationState({
      filters: {
        mutationKey: createPostOptions.mutationKey,
        status: "pending",
      },
    }).length > 0;

  return isCreatingPost ? <span>Saving…</span> : null;
}
```

- 옵션 객체 자체를 필터로 넘길 수도 있습니다.

```ts
useIsMutating(createPostOptions);
queryClient.isMutating(createPostOptions);
```

<br />

## mutationOptions 사용 시 주의할 점

- `mutationOptions`는 객체를 그대로 반환하기 때문에, 스프레드로 콜백을 덧붙이면 원본 콜백이 `덮어써집니다.`

```ts
export const createPostOptions = mutationOptions({
  mutationFn: createPost,
  onSuccess: () => console.log("A"),
});

useMutation({
  ...createPostOptions,
  onSuccess: () => console.log("B"), // ❌ "A"는 실행되지 않습니다.
});
```

- 원본 콜백을 함께 실행하고 싶다면 직접 호출해 줘야 합니다.

```ts
useMutation({
  ...createPostOptions,
  onSuccess: (data, variables, context) => {
    createPostOptions.onSuccess?.(data, variables, context);
    console.log("B");
  },
});
```

- 💡 더 권장되는 방법은 `공통 로직`과 `컴포넌트 전용 로직`을 분리하는 것입니다.
  - 쿼리 무효화처럼 항상 실행되어야 하는 로직은 `mutationOptions`(= useMutation)의 Callback에 둡니다.
  - 리다이렉션이나 토스트처럼 화면마다 다른 로직은 `mutate`의 Callback으로 넘깁니다.
  - 자세한 내용은 [useMutation callback과 mutate callback의 차이](https://github.com/ssi02014/react-query-tutorial#-usemutation-callback과-mutate-callback의-차이)를 참고해 주세요.

```ts
export const createPostOptions = mutationOptions({
  mutationFn: createPost,
  onSuccess: () => {
    // 공통 로직
    queryClient.invalidateQueries({ queryKey: postQueries.all().queryKey });
  },
});

const { mutate } = useMutation(createPostOptions);

mutate(newPost, {
  // 컴포넌트 전용 로직
  onSuccess: () => navigate("/posts"),
});
```

<br />

## 정리

|                     | queryOptions                                      | mutationOptions                        |
| ------------------- | ------------------------------------------------- | -------------------------------------- |
| 지원 버전           | `v5.0.0`                                          | `v5.82.0`                              |
| 필수 옵션           | `queryKey`                                        | 없음(오버로드에 따라 `mutationKey`)    |
| 반환 값             | 옵션 객체 + 타입이 붙은 `queryKey`(`DataTag`)     | 받은 옵션 객체 그대로                  |
| 주요 사용처         | `useQuery`, `useSuspenseQuery`, `useQueries`, `queryClient.*` | `useMutation`, `useMutationState`, `useIsMutating` |
| 런타임 동작         | 인자를 그대로 반환                                | 인자를 그대로 반환                     |

- 두 헬퍼 모두 `런타임 동작은 없고` 타입 추론과 옵션 재사용을 위해 존재합니다.
- 옵션을 별도 파일로 분리해 재사용하고 있다면 도입 비용이 거의 없으므로 적극적으로 사용하는 것을 권장합니다.

<br />

## 📃 참고 문서

- [queryOptions 공식 문서](https://tanstack.com/query/latest/docs/framework/react/reference/functions/queryOptions)
- [mutationOptions 공식 문서](https://tanstack.com/query/latest/docs/framework/react/reference/functions/mutationOptions)
- [Query Options 가이드](https://tanstack.com/query/latest/docs/framework/react/guides/query-options)
- [TypeScript: Typing Query Options](https://tanstack.com/query/latest/docs/framework/react/typescript#typing-query-options)
- [infiniteQueryOptions 공식 문서](https://tanstack.com/query/latest/docs/framework/react/reference/functions/infiniteQueryOptions)

<br />
