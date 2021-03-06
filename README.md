# ๐ป React-query

## ๐ ๋ชฉ์ฐจ

1. [React-Query ๊ธฐ๋ฅ](#๊ธฐ๋ฅ)
2. [๊ธฐ๋ณธ ์ค์ (QueryClientProvider, QueryClient)](#react-query-๊ธฐ๋ณธ-์ค์ )
3. [React Query Devtools](#devtools)
4. [React Query ์บ์ฑ ๋ผ์ดํ ์ฌ์ดํด](#์บ์ฑ-๋ผ์ดํ-์ฌ์ดํด)
5. [useQuery](#usequery)
6. [useQuery ์ฃผ์ ๋ฆฌํด ๋ฐ์ดํฐ](#usequery-์ฃผ์-๋ฆฌํด-๋ฐ์ดํฐ)
7. [staleTime๊ณผ cacheTime](#staletime-cachetime)
8. [๋ง์ดํธ ๋  ๋๋ง๋ค ์ฌ์์ฒญํ๋ refetchOnMount](#refetchonmount)
9. [์๋์ฐ ํฌ์ปค์ฑ ๋  ๋ ์ฌ ์์ฒญํ๋ refetchOnWindowFocus](#refetchOnWindowFocus)
10. [Polling ๋ฐฉ์์ ๊ตฌํํ๊ธฐ ์ํ refetchInterval์ refetchIntervalInBackground)](#polling)
11. [์๋ ์คํ์ enabled์ ์๋์ผ๋ก ์ฟผ๋ฆฌ๋ฅผ ๋ค์ ์์ฒญํ๋ refetch](#enabled-refetch)
12. [์คํจ ์ฟผ๋ฆฌ์ ๋ํ ์ฌ ์์ฒญํ๋ retry](#retry)
13. [onSuccess, onError, onSettled Callback](#onsuccess-onerror-onsettled)
14. [select๋ฅผ ์ด์ฉํ ๋ฐ์ดํฐ ๋ณํ](#select)
15. [Paginated ๊ตฌํ์ ์ ์ฉํ keepPreviousData](#keeppreviousdata)
16. [์ฟผ๋ฆฌ๋ฅผ ๋ณ๋ ฌ(Parallel) ์์ฒญํ  ์ ์๋ useQueries](#parallel)
17. [์ข์ ์ฟผ๋ฆฌ(Dependent Queries)](#dependent-queries)
18. [QueryClient ์ธ์คํด์ค๋ฅผ ๋ฐํํ๋ useQueryClient](#usequeryclient)
19. [์ด๊ธฐ ๋ฐ์ดํฐ ์ค์ ํ  ์ ์๋ initialData](#initial-query-data)
20. [Infinite Queries](#infinite-queries)
21. [์๋ฒ์ Http CUD๊ด๋ จ ์์์ ์ํ useMutation๊ณผ mutate](#usemutation-mutate)
22. [์ฟผ๋ฆฌ ๋ฌดํจํ queryClient.invalidateQueries](#์ฟผ๋ฆฌ-๋ฌดํจํ)
23. [์บ์ ๋ฐ์ดํฐ ์ฆ์ ์๋ฐ์ดํธ๋ฅผ ์ํ queryClient.setQueryData](#์ฟผ๋ฆฌ-๋ฌดํจํ)
24. [์ฌ์ฉ์ ๊ฒฝํ(UX) ์ฌ๋ ค์ฃผ๋ Optimistic Updates(๋๊ด์  ์๋ฐ์ดํธ)](#optimistic-update)

<br />
<br />

## ๐ React-Query ๊ฐ์ ๋ฐ ๊ธฐ๋ฅ

### ๊ฐ์

- react-query๋ ๋ฆฌ์กํธ ์ ํ๋ฆฌ์ผ์ด์์์ `์๋ฒ ์ํ ๊ฐ์ ธ์ค๊ธฐ`, `์บ์ฑ`, `๋๊ธฐํ ๋ฐ ์๋ฐ์ดํธ`๋ฅผ ๋ณด๋ค ์ฝ๊ฒ ๋ค๋ฃฐ ์ ์๋๋ก ๋์์ฃผ๋ฉฐ ํด๋ผ์ด์ธํธ ์ํ์ ์๋ฒ ์ํ๋ฅผ ๋ชํํ ๊ตฌ๋ถํ๊ธฐ ์ํด์ ๋ง๋ค์ด์ง ๋ผ์ด๋ธ๋ฌ๋ฆฌ์ด๋ค.
- react-query์์ ๊ธฐ์กด ์ํ ๊ด๋ฆฌ ๋ผ์ด๋ธ๋ฌ๋ฆฌ`(redux, mobX)`๋ `ํด๋ผ์ด์ธํธ ์ํ ์์`์ ์ ํฉํ์ง๋ง `๋น๋๊ธฐ ๋๋ ์๋ฒ ์ํ ์์`์๋ ๊ทธ๋ค์ง ์ข์ง ์๋ค๊ณ  ๋งํ๊ณ  ์๋ค.
- ํด๋ผ์ด์ธํธ ์ํ(Client State) ์ ์๋ฒ ์ํ(Server State)๋ ์์ ํ ๋ค๋ฅด๋ฉฐ, ํด๋ผ์ด์ธํธ ์ํ๋ ์ปดํฌ๋ํธ์์ ๊ด๋ฆฌํ๋ ๊ฐ๊ฐ์ input ๊ฐ์ผ๋ก ์๋ฅผ ๋ค ์ ์๊ณ  ์๋ฒ ์ํ๋ database์ ์ ์ฅ๋์ด์๋ ๋ฐ์ดํฐ๋ก ์๋ฅผ ๋ค ์ ์๋ค.

<br />

### ๊ธฐ๋ฅ

1. ์๋

   - React Query์ ๋ฐ์ดํฐ๋ฅผ ๊ฐ์ ธ์ฌ ์์น์ ๋ฐ์ดํฐ๊ฐ ์ผ๋ง๋ ํ์ํ์ง ์๋ ค์ฃผ๋ฉด ๋๋จธ์ง๋ ์๋์ด๋ค. React Query๋ ๊ตฌ์ฑ์ด ํ์ ์๋ ์ฆ์ `์บ์ฑ`, `๋ฐฑ๊ทธ๋ผ์ด๋ ์๋ฐ์ดํธ` ๋ฐ ์ค๋๋ ๋ฐ์ดํฐ๋ฅผ ์ฒ๋ฆฌํฉ๋๋ค.

2. ์น์ํ๊ณ  ๊ฐ๋จํ๋ค.

   - `promise` ๋๋ `async/await`๋ก ์์ํ๋ ๋ฐฉ๋ฒ์ ์๊ณ  ์๋ค๋ฉด ์ด๋ฏธ React Query๋ฅผ ์ฌ์ฉํ๋ ๋ฐฉ๋ฒ์ ์๊ณ  ์๋ ๊ฒ์ด๋ค. ๊ด๋ฆฌํ  ์ ์ญ ์ํ, ๊ฐ์๊ธฐ, ์ ๊ทํ ์์คํ ๋๋ ์ดํดํด์ผ ํ  ๋ฌด๊ฑฐ์ด ๊ตฌ์ฑ์ด ์๋ค. ๋ฐ์ดํฐ๋ฅผ ํด๊ฒฐํ๋(๋๋ ์ค๋ฅ๋ฅผ ๋ฐ์์ํค๋) ํจ์๋ฅผ ์ ๋ฌํ๊ธฐ๋ง ํ๋ฉด๋๋ค.

3. ๊ฐ๋ ฅํ ๋๊ตฌ ๋ฐ ๊ตฌ์ฑ

   - React Query๋ ๋ชจ๋  ์ฌ์ฉ ์ฌ๋ก์ ๋ง๋ ๋ธ๋ธ์ ์ต์์ ์ฌ์ฉํ์ฌ ์ฟผ๋ฆฌ์ ๊ฐ ๊ด์ฐฐ์ ์ธ์คํด์ค๊น์ง ๊ตฌ์ฑํ  ์ ์๋ค. `์ ์ฉ devtools`, `๋ฌดํ ๋ก๋ฉ API` ๋ฐ `๋ฐ์ดํฐ ์๋ฐ์ดํธ`๋ฅผ ์ฝ๊ฒ ๋ง๋ค์ด์ฃผ๋ mutation ๋๊ตฌ๊ฐ ์๋ค.

4. ์ ์ ์ฝ๋. ๋ ์ ์ ์ฃ์ง ์ผ์ด์ค.
   - `๋ฆฌ๋์`, `์บ์ฑ ๋ก์ง`, `ํ์ด๋จธ`, `์ฌ์ฌ์ฉ ๋ก์ง`, `๋ณต์กํ ๋น๋๊ธฐ/๋๊ธฐ ์คํฌ๋ฆฝํ`์ ํ์ ํ๋ ์ฝ๋๋ณด๋ค ์ ์ ์์ ์ฝ๋๋ก ์์ฑํ  ์ ์๋ค.

<br />

## React-Query ๊ธฐ๋ณธ ์ค์ 

- [QueryClientProvider ๊ณต์ ์ฌ์ดํธ ์ฐธ๊ณ ](https://react-query.tanstack.com/reference/QueryClientProvider)
- [QueryClient ๊ณต์ ์ฌ์ดํธ ์ฐธ๊ณ ](https://react-query.tanstack.com/reference/QueryClient)

```jsx
// QueryClient ์์ 
import { QueryClient } from "react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
});
```

- QueryClient๋ฅผ ์ฌ์ฉํ์ฌ `์บ์`์ ์ํธ ์์ฉํ  ์ ์์ต๋๋ค.
- QueryClient์์ `๋ชจ๋  query` ๋๋ `mutation`์ ๊ธฐ๋ณธ ์ต์๋ค์ ์ถ๊ฐํ  ์ ์๋๋ฐ ์ข๋ฅ๊ฐ ์๋นํ๋ ์๋จ์ ๊ณต์ ์ฌ์ดํธ๋ฅผ ์ฐธ๊ณ ํ์.

```jsx
// QueryClientProvider + QueryClient
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function App() {
  return (
   <QueryClientProvider client={queryClient}>
      <div>๋ธ๋ผ๋ธ๋ผ</div>
   </QueryClientProvider>;
  );
}
```

- App ์ ์ฒด์์ ๋ฆฌ์กํธ ์ฟผ๋ฆฌ๋ฅผ ์ฌ์ฉํ๊ธฐ ์ํด์๋ `QueryClientProvider`๋ฅผ ์ต์๋จ์์ ๊ฐ์ธ์ฃผ๊ณ  `QueryClient`๋ฅผ Props๋ก ๋ฃ์ด์ค์ผ ํ๋ค.
- App.js์ QueryClientProvider๋ก ์ดํ ์ปดํฌ๋ํธ๋ฅผ ๊ฐ์ธ๊ณ  QueryClient๋ฅผ ๋ด๋ ค๋ณด๋ด์ค โ ์ด context๋ ์ฑ์์ ๋น๋๊ธฐ ์์ฒญ์ ์์์ ์ฒ๋ฆฌํ๋ `background` ๊ณ์ธต์ด๋๋ค.
- QueryClientProvider ์ปดํฌ๋ํธ๋ฅผ ์ฌ์ฉํ์ฌ App์ QueryClient๋ฅผ ์ฐ๊ฒฐํ๊ณ  ์ ๊ณตํ๋ค.

<br />

## Devtools

![แแณแแณแแตแซแแฃแบ 2022-04-07 แแฉแแฎ 11 53 32](https://user-images.githubusercontent.com/64779472/162228222-d1c7dd3e-ce62-484d-bfa0-8493f3e68cae.png)

- React Query๋ `์ ์ฉ devtools`๋ฅผ ์ ๊ณตํ๋ค.
- devtools๋ฅผ ์ฌ์ฉํ๋ฉด React Query์ ๋ชจ๋  ๋ด๋ถ ๋์์ `์๊ฐํ`ํ๋๋ฐ ๋์์ด ๋๋ฉฐ ๋ฌธ์ ๊ฐ ๋ฐ์ํ๋ฉด `๋๋ฒ๊น ์๊ฐ์ ์ ์ฝ`ํ  ์ ์๋ค.

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
  - `true`์ด๋ฉด ๊ฐ๋ฐ ๋๊ตฌ๊ฐ ๊ธฐ๋ณธ์ ์ผ๋ก ์ด๋ ค ์๋๋ก ์ค์ ํ  ์ ์๋ค.
- position?: ("top-left" | "top-right" | "bottom-left" | "bottom-right")
  - ๊ธฐ๋ณธ๊ฐ: `bottom-left`
  - devtools ํจ๋์ ์ด๊ณ  ๋ซ๊ธฐ ์ํ ๋ก๊ณ  ์์น
- ์ผ๋ฐ์ ์ผ๋ก initialIsOpen, position์ ์์ฃผ ์ฌ์ฉํ์ง๋ง, ์๋์ ๊ฐ์ ์ต์๋ค๋ ์กด์ฌํ๋ค.
- panelProps
  - ํจ๋์ `props`์ ์ถ๊ฐํ  ์ ์๋ค. ์๋ฅผ ๋ค์ด className, style, onClick ๋ฑ
- closeButtonProps
  - `๋ซ๊ธฐ ๋ฒํผ`์ props๋ฅผ ์ถ๊ฐํ  ์ ์๋ค.
- toggleButtonProps
  - `ํ ๊ธ ๋ฒํผ`์ props๋ฅผ ์ถ๊ฐํ  ์ ์๋ค.

<br />

## ์บ์ฑ ๋ผ์ดํ ์ฌ์ดํด

- React-Query ์บ์ ๋ผ์ดํ ์ฌ์ดํด

```
* Query Instances with and without cache data(์บ์ ๋ฐ์ดํฐ๊ฐ ์๊ฑฐ๋ ์๋ ์ฟผ๋ฆฌ ์ธ์คํด์ค)
* Background Refetching(๋ฐฑ๊ทธ๋ผ์ด๋ ๋ฆฌํจ์นญ)
* Inactive Queries(๋นํ์ฑ ์ฟผ๋ฆฌ)
* Garbage Collection(๊ฐ๋น์ง ์ปฌ๋ ์)
```

- cacheTime์ ๊ธฐ๋ณธ๊ฐ 5๋ถ, staleTime ๊ธฐ๋ณธ ๊ฐ 0๋ถ์ ๊ฐ์ 

1. `A`๋ผ๋ queryKey๋ฅผ ๊ฐ์ง A ์ฟผ๋ฆฌ ์ธ์คํด์ค๊ฐ `mount` ๋จ
2. ๋คํธ์ํฌ์์ ๋ฐ์ดํฐ fetch ํ๊ณ , ๋ถ๋ฌ์จ ๋ฐ์ดํฐ๋ A๋ผ๋ queryKey๋ก `์บ์ฑ`ํจ
3. ์ด ๋ฐ์ดํฐ๋ `fresh`์ํ์์ `staleTime(๊ธฐ๋ณธ๊ฐ 0)` ์ดํ `stale` ์ํ๋ก ๋ณ๊ฒฝ๋จ
4. A ์ฟผ๋ฆฌ ์ธ์คํด์ค๊ฐ `unmount` ๋จ
5. ์บ์๋ `cacheTime(๊ธฐ๋ณธ๊ฐ 5min)` ๋งํผ ์ ์ง๋๋ค๊ฐ `๊ฐ๋น์ง ์ฝ๋ ํฐ(GC)`๋ก ์์ง๋จ
6. ๋ง์ผ, cacheTime์ด ์ง๋๊ธฐ ์ ์ด๊ณ , A ์ฟผ๋ฆฌ ์ธ์คํด์ค freshํ ์ํ๋ผ๋ฉด ์๋กญ๊ฒ mount๋๋ฉด ์บ์ ๋ฐ์ดํฐ๋ฅผ ๋ณด์ฌ์ค๋ค.

<br />

## useQuery

### useQuery ๊ธฐ๋ณธ ๋ฌธ๋ฒ

- [useQuery ๊ณต์ ์ฌ์ดํธ ์ฐธ๊ณ ](https://react-query.tanstack.com/reference/useQuery)

```jsx
// ์ฌ์ฉ๋ฒ(1)
const { data, isLoading, ... } =  useQuery(queryKey, queryFn, {
  //์ต์๋ค ex) enabled, staleTime
});

// ์ฌ์ฉ๋ฒ(2)
const result = useQuery({
  queryKey,
  queryFn,
  //์ต์๋ค ex) enabled, staleTime
});
```

```jsx
// ์ค์  ์์ 
const getSuperHero = useCallback(() => {
  return axios.get("http://localhost:4000/superheroes");
}, []);

const { isLoading, data } = useQuery("super-heroes", getSuperHero);
```

- useQuery๋ ๊ธฐ๋ณธ์ ์ผ๋ก 3๊ฐ์ ์ธ์๋ฅผ ๋ฐ์ต๋๋ค. ์ฒซ ๋ฒ์งธ ์ธ์๊ฐ `queryKey(ํ์)`, ๋ ๋ฒ์งธ ์ธ์๊ฐ `queryFn(ํ์)`, ์ธ ๋ฒ์งธ ์ธ์๊ฐ `options`์๋๋ค.
- useQuery๋ ์ฒซ ๋ฒ์งธ ์ธ์์ธ `queryKey`๋ฅผ ๊ธฐ๋ฐ์ผ๋ก `๋ฐ์ดํฐ ์บ์ฑ`์ ๊ด๋ฆฌํฉ๋๋ค. `๋ฌธ์์ด` ๋๋ `๋ฐฐ์ด`๋ก ์ง์ ํ  ์ ์๋๋ฐ, ์ผ๋ฐ์ ์ผ๋ก๋ ์ ์์  ์ฒ๋ผ `๋ฌธ์์ด`๋ก ์ง์ ํ  ์ ์์ง๋ง, ๋ง์ฝ ์ฟผ๋ฆฌ๊ฐ ํน์  ๋ณ์์ ์์กดํ๋ ๊ฒฝ์ฐ์๋ ์๋ ์์ ์ฒ๋ผ `๋ฐฐ์ด`๋ก ์ง์ ํด ํด๋น ๋ณ์๋ฅผ ์ถ๊ฐํด์ฃผ์ด์ผ ํฉ๋๋ค.
- `์ฌ์ฉ๋ฒ (1)`๊ณผ `(2)`๋ฒ ๋๋ค ์ฌ์ฉ๋๋๋ฐ. ์ ๊ทผ ๋ฐฉ์์ ์ฐจ์ด์๋๋ค. ๋ ๊ฐ์ง ๋ฐฉ์ ๋ชจ๋ ์ ์ดํดํ๊ณ  ์ฌ์ฉํฉ์๋ค.

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

- useQuery์ ๋ ๋ฒ์งธ ์ธ์์ธ queryFn๋ `Promise`๋ฅผ ๋ฐํํ๋ ํจ์๋ฅผ ๋ฃ์ด์ฃผ์ด์ผ ํฉ๋๋ค.
- useQuery์ ์ธ ๋ฒ์งธ ์ธ์์ธ `options`์ ๋ง์ด ์ฐ์ด๋ ์ต์๋ค์ ๋ฐ์์ ์ค๋ชํ์์ต๋๋ค. ๊ทธ์ธ์๋ ์์ useQuery ์ฐธ๊ณ  ์ฌ์ดํธ๋ฅผ ํตํด ํ์ธํ๋ฉด๋๋ค.

<br />

- ์ฐธ๊ณ ๋ก ๋์ค์ queryClient๋ก ํน์  key์ ํด๋นํ๋ query์ ์ ๊ทผํ  ๋๋ ์ด๊ธฐ์ ์ค์ ํด๋ ํฌ๋งท์ ์ง์ผ์ค์ผ ์ ๋๋ก ๊ฐ์ ธ์ฌ ์ ์๋ค.
- ์๋ ์์ ๋ฅผ ์ฐธ๊ณ ํ๋ฉด useQuery์์ queryKey์ ํด๋นํ๋ ํฌ๋งท์ด ๋ฐฐ์ด`["super-hero", heroId]`์ด๋ค. ๊ทธ๋ ๋ค๋ฉด ๋ฐ์ useMutation์์ setQueryData๋ฅผ ์ด์ฉํ  ๋ ๋๊ฐ์ด `["super-hero", heroId]` ํฌ๋งท์ ๊ฐ์ ธ์ผํ๋ค.

<br />

```js
// ์
const useSuperHeroData = (heroId: string) => {
  return useQuery(["super-hero", heroId], () => fetchSuperHero(heroId));
};

const useAddSuperHeroData = () => {
  const queryClient = useQueryClient();
  return useMutation(addSuperHero, {
    onSuccess(data) {
      // ์ ๋๋ก ๋ชป๊ฐ์ ธ์ด! ํฌ๋งท์๋ง์! ["super-hero", heroId] ๋กํด์ผ๋
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

### useQuery ์ฃผ์ ๋ฆฌํด ๋ฐ์ดํฐ

```js
const { isLoading, isError, error, data, isFetching } = useQuery(
  ["colors", pageNum],
  () => fetchColors(pageNum)
);
```

- [react-query: useQuery ๊ณต์ ์ฌ์ดํธ](https://react-query.tanstack.com/reference/useQuery)
- status: ์ฟผ๋ฆฌ ์์ฒญ ํจ์์ ์ํ๋ฅผ ํํํ๋ status๋ 4๊ฐ์ง์ ๊ฐ์ด ์กด์ฌํ๋ค.(๋ฌธ์์ด ํํ)
  - idle: ์ฟผ๋ฆฌ ๋ฐ์ดํฐ๊ฐ ์๊ณ  ๋น์์ ๋, { enabled: false } ์ํ๋ก ์ฟผ๋ฆฌ๊ฐ ํธ์ถ๋๋ฉด ์ด ์ํ๋ก ์์๋๋ค.
  - loading: ๋ง ๊ทธ๋๋ก ๋ก๋ฉ์ค์ผ ๋ ์ํ
  - error: ์๋ฌ ๋ฐ์ํ์ ๋ ์ํ
  - success: ์์ฒญ ์ฑ๊ณตํ์ ๋ ์ํ
- data: ์ฟผ๋ฆฌ ํจ์๊ฐ ๋ฆฌํดํ Promise์์ `resolved`๋ ๋ฐ์ดํฐ
- isLoading: `์บ์ฑ๋ ๋ฐ์ดํฐ๊ฐ ์์๋!` fetch ๊ณผ์  ์ค์ true ์ฆ, ์บ์ฑ ๋ฐ์ดํฐ๊ฐ ์์ผ๋ฉด false
- isFetching: ๋ฐ์ดํฐ๊ฐ `fetch`๋  ๋ false์์ true๊ฐ ๋๋ค. ์บ์ฑ ๋ฐ์ดํฐ๊ฐ ์์ด์ ๋ฐฑ๊ทธ๋ผ์ด๋์์ fetch ๋๋๋ผ๋ true์ด๋ค.
- error: ์ฟผ๋ฆฌ ํจ์๊ฐ ์ค๋ฅ๊ฐ ๋ฐ์ํ ๊ฒฝ์ฐ์ ๋ํ ์ค๋ฅ ๊ฐ์ฒด
- isError: ์๋ฌ๊ฐ ๋ฐ์ํ ๊ฒฝ์ฐ `true`
- ๊ทธ์ธ ๋ฆฌํด ๋ฐ์ดํฐ๋ค์ ํ์ธํ๊ณ  ์ถ์ผ๋ฉด [๊ณต์ ์ฌ์ดํธ](https://react-query.tanstack.com/reference/useQuery) ์ฐธ๊ณ 

<br />

## useQuery ์ฃผ์ Options

- [useQuery ๊ณต์ ์ฌ์ดํธ ์ฐธ๊ณ ](https://react-query.tanstack.com/reference/useQuery)
- ์๋ ์์ ๋ค ์ ์ธํ๊ณ  ์ถ๊ฐ์ ์ธ ์ต์๋ค์ ์ ์ฌ์ดํธ ์ฐธ๊ณ 

### staleTime cacheTime

- stale์ ์ฉ์ด ๋ป๋๋ก `์ฉ์` ์ด๋ผ๋ ์๋ฏธ์ด๋ค. ์ฆ, ์ต์  ์ํ๊ฐ ์๋๋ผ๋ ์๋ฏธ์ด๋ค.
- fresh๋ ๋ป ๊ทธ๋๋ก `์ ์ ํ` ์ด๋ผ๋ ์๋ฏธ์ด๋ค. ์ฆ, ์ต์  ์ํ๋ผ๋ ์๋ฏธ์ด๋ค.

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

<br />

1. staleTime (number | Infinity)
   - staleTime์ ๋ฐ์ดํฐ๊ฐ `fresh์์ stale` ์ํ๋ก ๋ณ๊ฒฝ๋๋๋ฐ ๊ฑธ๋ฆฌ๋ ์๊ฐ, ๋ง์ฝ staleTime์ด 3000์ด๋ฉด fresh์ํ์์ 3์ด๋ค์ stale๋ก ๋ณํ
   - `fresh` ์ํ์ผ๋๋ ์ฟผ๋ฆฌ ์ธ์คํด์ค๊ฐ ์๋กญ๊ฒ mount ๋์ด๋ ๋คํธ์ํฌ ์์ฒญ(fetch)์ด ์ผ์ด๋์ง ์๋๋ค.
   - ๋ฐ์ดํฐ๊ฐ ํ๋ฒ fetch ๋๊ณ  ๋์ `staleTime`์ด ์ง๋์ง ์์๋ค๋ฉด(fresh์ํ) unmount ํ ๋ค์ mount ๋์ด๋ fetch๊ฐ ์ผ์ด๋์ง ์๋๋ค.
   - staleTime์ ๊ธฐ๋ณธ๊ฐ์ `0`์ด๊ธฐ ๋๋ฌธ์ ์ผ๋ฐ์ ์ผ๋ก fetch ํ์ ๋ฐ๋ก stale์ด ๋๋ค.
2. cacheTime (number | Infinity)
   - ๋ฐ์ดํฐ๊ฐ `inactive` ์ํ์ผ ๋ `์บ์ฑ๋ ์ํ๋ก` ๋จ์์๋ ์๊ฐ
   - ์ฟผ๋ฆฌ ์ธ์คํด์ค๊ฐ unmount ๋๋ฉด ๋ฐ์ดํฐ๋ `inactive ์ํ๋ก ๋ณ๊ฒฝ`๋๋ฉฐ, ์บ์๋ `cacheTime`๋งํผ ์ ์ง๋๋ค.
   - cacheTime์ด ์ง๋๋ฉด `๊ฐ๋น์ง ์ฝ๋ ํฐ`๋ก ์์ง๋๋ค.
   - cacheTime์ด ์ง๋๊ธฐ ์ ์ ์ฟผ๋ฆฌ ์ธ์คํด์ค๊ฐ ๋ค์ mount ๋๋ฉด, ๋ฐ์ดํฐ๋ฅผ fetchํ๋ ๋์ ์บ์ ๋ฐ์ดํฐ๋ฅผ ๋ณด์ฌ์ค๋ค.
   - cacheTime์ staleTime๊ณผ ๊ด๊ณ์์ด, ๋ฌด์กฐ๊ฑด inactive ๋ ์์ ์ ๊ธฐ์ค์ผ๋ก ์บ์ ๋ฐ์ดํฐ ์ญ์ ๋ฅผ ๊ฒฐ์ ํ๋ค.
   - cacheTime์ ๊ธฐ๋ณธ๊ฐ์ `5๋ถ`์ด๋ค.

- ์ฌ๊ธฐ์ ์ฃผ์ํ  ์ ์ staleTime๊ณผ cacheTime์ ๊ธฐ๋ณธ๊ฐ์ ๊ฐ๊ฐ `0๋ถ`๊ณผ `5๋ถ`์ด๋ค. ๋ฐ๋ผ์ staleTime์ ์ด๋ ํ ์ค์ ๋ ํ์ง ์์ผ๋ฉด ์บ์ฑ์ด ์ ํ๋์ง ์๋๋ค. ์๋ํ๋ฉด ํญ์ ์บ์ฑ๋์ด ์๋ ๋ฐ์ดํฐ๊ฐ `stale`ํ๋ค๊ณ  ์ฌ๊ธฐ๊ธฐ ๋๋ฌธ์ด๋ค.
- staleTime์ ๊ธธ๊ฒ ์ค์ ํ๋๋ผ๋ cacheTime์ด ์งง๋ค๋ฉด ์ด ๋ํ ์บ์ฑ์ด ์ํํ๊ฒ ์งํ๋์ง ์์ ๊ฒ์ด๋ค. ๊ฒฐ๊ตญ์๋ ๋๊ฐ์ ์ต์์ ์ ์ ํ๊ฒ ์ค์ ํด์ค์ผ ํ๋ค.

<br />

### refetchOnMount

```jsx
const { isLoading, isFetching, data, isError, error } = useQuery(
  "super-heroes",
  getSuperHero,
  {
    refetchOnMount: true,
  }
);
```

- refetchOnMount (boolean | "always")
- refetchOnMount๋ ๋ฐ์ดํฐ๊ฐ `stale` ์ํ์ผ ๊ฒฝ์ฐ mount ๋ง๋ค `refetch`๋ฅผ ์คํํ๋ ์ต์์ด๋ค. ๊ธฐ๋ณธ๊ฐ์ `true`์ด๋ค.
- `always` ๋ก ์ค์ ํ๋ฉด ๋ง์ดํธ ์ ๋ง๋ค ๋งค๋ฒ refetch๋ฅผ ์คํํ๋ค.
- `false`๋ก ์ค์ ํ๋ฉด ์ต์ด fetch ์ดํ์๋ refetchํ์ง ์๋๋ค.

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
- refetchOnWindowFocus๋ ๋ฐ์ดํฐ๊ฐ `stale` ์ํ์ผ ๊ฒฝ์ฐ `์๋์ฐ ํฌ์ปค์ฑ` ๋  ๋ ๋ง๋ค refetch๋ฅผ ์คํํ๋ ์ต์์ด๋ค. ๊ธฐ๋ณธ๊ฐ์ `true`์ด๋ค.
- ์๋ฅผ ๋ค์ด, ํฌ๋กฌ์์ ๋ค๋ฅธ ํญ์ ๋๋ ๋ค๊ฐ ๋ค์ ์๋ ๋ณด๋ ์ค์ธ ํญ์ ๋๋ ์ ๋๋ ์ด ๊ฒฝ์ฐ์ ํด๋นํ๋ค. ์ฌ์ง์ด F12๋ก ๊ฐ๋ฐ์ ๋๊ตฌ ์ฐฝ์ ์ผ์ ๋คํธ์ํฌ ํญ์ด๋ , ์ฝ์ ํญ์ด๋  ๊ฐ๋ฐ์ ๋๊ตฌ ์ฐฝ์์ ๋๋ค๊ฐ ํ์ด์ง ๋ด๋ถ๋ฅผ ๋ค์ ํด๋ฆญํ์ ๋๋ ์ด ๊ฒฝ์ฐ์ ํด๋นํ๋ค.
- `always` ๋ก ์ค์ ํ๋ฉด ํญ์ ์๋์ฐ ํฌ์ปค์ฑ ๋  ๋ ๋ง๋ค refetch๋ฅผ ์คํํ๋ค๋ ์๋ฏธ์ด๋ค.

<br />

### Polling

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

- ํด๋ง์ด๋? ๋ฆฌ์ผํ์ ์น์ ์ํ ๊ธฐ๋ฒ์ผ๋ก `์ผ์ ํ ์ฃผ๊ธฐ(ํน์ ํ ์๊ฐ)`๋ฅผ ๊ฐ์ง๊ณ  ์๋ฒ์ ์๋ต์ ์ฃผ๊ณ ๋ฐ๋ ๋ฐฉ์์ด ํด๋ง ๋ฐฉ์์ด๋ค.
- react-query์์๋ `refetchInterval`์ ์ด์ฉํด์ ๊ตฌํํ  ์ ์๋ค.
- `refetchIntervalInBackground` ์ผ๋ก๋ ํด๋ง์ ๊ตฌํํ  ์ ์๋๋ฐ `refetchInterval` ํญ/์ฐฝ์ด ๋ฐฑ๊ทธ๋ผ์ด๋์ ์๋ ๋์ ๊ณ์ ๋ค์ ๊ฐ์ ธ์ต๋๋ค.

<br />

### enabled refetch

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

- `enabled`๋ ์ฟผ๋ฆฌ๊ฐ ์๋์ผ๋ก ์คํ๋์ง ์๋๋ก ํ  ๋ ์ค์ ํ  ์ ์๋ค. `false`๋ฅผ ์ฃผ๋ฉด ์๋ ์คํ๋์ง ์๋๋ค. ๋ํ useQuery ๋ฆฌํด ๋ฐ์ดํฐ์ค status๊ฐ idle ์ํ๋ก ์์ํ๋ค.
- `refetch`๋ ์ฟผ๋ฆฌ๋ฅผ `์๋`์ผ๋ก ๋ค์ ์์ฒญํ๋ ๊ธฐ๋ฅ์ด๋ค. ์ฟผ๋ฆฌ ์ค๋ฅ๊ฐ ๋ฐ์ํ๋ฉด ์ค๋ฅ๋ง ๊ธฐ๋ก๋๋ค. ์ค๋ฅ๋ฅผ ๋ฐ์์ํค๋ ค๋ฉด `throwOnError`์์ฑ์ `true`๋กํด์ ์ ๋ฌํด์ผ ํ๋ค.
- ๋ณดํต ์๋์ผ๋ก ์ฟผ๋ฆฌ ์์ฒญ์ ํ์ง ์๊ณ  ๋ฒํผ ํด๋ฆญ์ด๋ ํน์  ์ด๋ฒคํธ๋ฅผ ํตํด ์์ฒญ์ ์๋ํ  ๋ ๊ฐ์ด ์ฌ์ฉํ๋ค.
- ๋ง์ฝ `enabled: false`๋ฅผ ์คฌ๋ค๋ฉด `queryClient`๊ฐ ์ฟผ๋ฆฌ๋ฅผ ๋ค์ ๊ฐ์ ธ์ค๋ ๋ฐฉ๋ฒ๋ค ์ค `invalidateQueries`์ `refetchQueries`๋ฅผ ๋ฌด์ํ๋ค.

<br />

### retry

```jsx
const result = useQuery(["todos", 1], fetchTodoListPage, {
  retry: 10, // ์ค๋ฅ๋ฅผ ํ์ํ๊ธฐ ์ ์ ์คํจํ ์์ฒญ์ 10๋ฒ ์ฌ์๋ํฉ๋๋ค.
});
```

- retry (boolean | number | (failureCount: number, error: TError) => boolean)
- retry๋ ์ฟผ๋ฆฌ๊ฐ `์คํจ`ํ๋ฉด useQuery๋ฅผ `ํน์  ํ์(๊ธฐ๋ณธ๊ฐ 3)`๋งํผ ์ฌ์์ฒญํ๋ ์ต์์ด๋ค.
- retry๊ฐ `false`์ธ ๊ฒฝ์ฐ ์คํจํ ์ฟผ๋ฆฌ๋ ๊ธฐ๋ณธ์ ์ผ๋ก ๋ค์ ์๋ํ์ง ์๋๋ค.
- `true`์ธ ๊ฒฝ์ฐ์๋ ์คํจํ ์ฟผ๋ฆฌ์ ๋ํด์ ๋ฌดํ ์ฌ์์ฒญ์ ์๋ํ๋ค.
- ๊ฐ์ผ๋ก `์ซ์`๋ฅผ ๋ฃ์ ๊ฒฝ์ฐ ์คํจํ ์ฟผ๋ฆฌ๊ฐ ํด๋น ์ซ์๋ฅผ ์ถฉ์กฑํ  ๋๊น์ง ์์ฒญ์ ์ฌ์๋ํ๋ค.

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
  "super-heroes",
  getSuperHero,
  {
    onSuccess,
    onError,
    onSettled,
  }
);
```

- `onSuccess` ํจ์๋ ์ฟผ๋ฆฌ ์์ฒญ์ด ์ฑ๊ณต์ ์ผ๋ก ์งํ๋์ ์ ๋ฐ์ดํฐ๋ฅผ ๊ฐ์ ธ์ค๊ฑฐ๋ ์บ์๊ฐ ์๋ฐ์ดํธ๋  ๋๋ง๋ค ์คํ๋๋ค.
- `onError` ํจ์๋ ์ฟผ๋ฆฌ์ ์ค๋ฅ๊ฐ ๋ฐ์ํ๊ณ  ์ค๋ฅ๊ฐ ์ ๋ฌ๋๋ฉด ์คํ๋๋ค.
- `onSettled` ํจ์๋ ์ฟผ๋ฆฌ ์์ฒญ์ด ์ฑ๊ณต, ์คํจ ๋ชจ๋ ์คํ๋๋ค.

<br />

### select

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

- `select` ์ต์์ ์ฌ์ฉํ์ฌ ์ฟผ๋ฆฌ ํจ์์์ ๋ฐํ๋ ๋ฐ์ดํฐ์ ์ผ๋ถ๋ฅผ ๋ณํํ๊ฑฐ๋ ์ ํํ  ์ ์๋ค.

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

- keepPreviousData๋ฅผ `true`๋ก ์ค์ ํ๋ฉด ์ฟผ๋ฆฌ ํค๊ฐ ๋ณ๊ฒฝ๋์ด์ ์๋ก์ด ๋ฐ์ดํฐ๋ฅผ ์์ฒญํ๋ ๋์์๋ `๋ง์ง๋ง data ๊ฐ์ ์ ์งํ๋ค.`
- keepPreviousData์ `ํ์ด์ง๋ค์ด์`๊ณผ ๊ฐ์ ๊ธฐ๋ฅ์ ๊ตฌํํ  ๋ ํธ๋ฆฌํ๋ค. ์บ์๋์ง ์์ ํ์ด์ง๋ฅผ ๊ฐ์ ธ์ฌ ๋ ๋ชฉ๋ก์ด `๊น๋นก๊น๋นก๊ฑฐ๋ฆฌ๋ ํ์์ ๋ฐฉ์ง`ํ  ์ ์๋ค.
- ๋ํ, `isPreviousData` ๊ฐ์ผ๋ก ํ์ฌ์ ์ฟผ๋ฆฌ ํค์ ํด๋นํ๋ ๊ฐ์ธ์ง ํ์ธํ  ์ ์๋ค.

<br />

### placeholderData

```js
function Todos() {
  const placeholderData = useMemo(() => generateFakeTodos(), []);
  const result = useQuery("todos", () => fetch("/todos"), { placeholderData });
}
```

- placeholderData๋ฅผ ์ฌ์ฉํ๋ฉด `mock ๋ฐ์ดํฐ` ์ค์ ๋ ๊ฐ๋ฅํ๋ค. ๋์  ์บ์ฑ์ด ์๋๋ค๋ ๋จ์ ์ด์๋ค.

<br />

## Parallel

```jsx
const { data: superHeroes } = useQuery("super-heroes", fetchSuperHeroes);
const { data: friends } = useQuery("friends", fetchFriends);
```

- ๋ช ๊ฐ์ง ์ํฉ์ ์ ์ธํ๋ฉด ์ฟผ๋ฆฌ ์ฌ๋ฌ๊ฐ๊ฐ ์ ์ธ๋์ด ์๋ ์ผ๋ฐ์ ์ธ ์ํฉ์ผ ๋ ์ฟผ๋ฆฌ ํจ์๋ค์ `๊ทธ๋ฅ ๋ณ๋ ฌ๋ก ์์ฒญ๋์ ์ฒ๋ฆฌ`๋๋ค.
- ์ด๋ฌํ ํน์ง์ ์ฟผ๋ฆฌ ์ฒ๋ฆฌ์ `๋์์ฑ`์ ๊ทน๋ํ ์ํจ๋ค.

```jsx
const queryResults = useQueries(
  heroIds.map((id) => ({
    queryKey: ["super-hero", id],
    queryFn: () => fetchSuperHero(id),
  }))
);
```

- ํ์ง๋ง, ์ฟผ๋ฆฌ ์ฌ๋ฌ๊ฐ๋ฅผ ๋์์ ์ํํด์ผ ํ๋๋ฐ, ๋ ๋๋ง์ด ๊ฑฐ๋ญ๋๋ ์ฌ์ด์ฌ์ด์ ๊ณ์ ์ฟผ๋ฆฌ๊ฐ ์ํ๋์ด์ผ ํ๋ค๋ฉด ์ฟผ๋ฆฌ๋ฅผ ์ํํ๋ ๋ก์ง์ด hook๋ฃฐ์ ์๋ฐฐ๋  ์๋ ์๋ค. ์ด๋ด ๋๋ `useQueries`๋ฅผ ์ฌ์ฉํ๋ค.

<br />

## Dependent Queries

- `์ข์ ์ฟผ๋ฆฌ`๋ ์ด๋ค A๋ผ๋ ์ฟผ๋ฆฌ๊ฐ ์๋๋ฐ ์ด A์ฟผ๋ฆฌ๋ฅผ ์คํํ๊ธฐ ์ ์ ์ฌ์ ์ ์๋ฃ๋์ผ ํ๋ B ์ฟผ๋ฆฌ๊ฐ ์๋๋ฐ, ์ด๋ฌํ B์ฟผ๋ฆฌ์ ์์กดํ๋ A์ฟผ๋ฆฌ๋ฅผ ์ข์ ์ฟผ๋ฆฌ๋ผ๊ณ  ํ๋ค.
- react-query์์๋ ์ฟผ๋ฆฌ๋ฅผ ์คํํ  ์ค๋น๊ฐ ๋์๋ค๋ ๊ฒ์ ์๋ ค์ฃผ๋ `enabled` ์ต์์ ํตํด ์ข์ ์ฟผ๋ฆฌ๋ฅผ ์ฝ๊ฒ ๊ตฌํํ  ์ ์๋ค.

```jsx
const DependantQueriesPage = ({ email }: Props) => {
  // ์ฌ์ ์ ์๋ฃ๋์ผํ  ์ฟผ๋ฆฌ
  const { data: user } = useQuery(['user', email], () =>
    fetchUserByEmail(email)
  );

  const channelId = user?.data.channelId;

  // user ์ฟผ๋ฆฌ์ ์ข์ ์ฟผ๋ฆฌ
  const { data } = useQuery(
    ['courses', channelId],
    () => fetchCoursesByChannelId(channelId),
    { enabled: !!channelId }
  );
```

<br />

## useQueryClient

- useQueryClient๋ `QueryClient` ์ธ์คํด์ค๋ฅผ ๋ฐํํ๋ค.
- `QueryClient`๋ ์บ์์ ์ํธ์์ฉ ํ๋ค.

```jsx
import { useQueryClient } from "react-query";

const queryClient = useQueryClient();
```

<br />

## Initial Query Data

- ์ฟผ๋ฆฌ์ ๋ํ `์ด๊ธฐ ๋ฐ์ดํฐ`๊ฐ ํ์ํ๊ธฐ ์ ์ ์บ์์ ์ ๊ณตํ๋ ๋ฐฉ๋ฒ์ด ์๋ค. ์๋ ์์  ์ฐธ๊ณ 
- initialData ์ต์์ ํตํด์ ์ฟผ๋ฆฌ๋ฅผ ๋ฏธ๋ฆฌ ์ฑ์ฐ๋๋ฐ ์ฌ์ฉํ  ์ ์์ผ๋ฉฐ, ์ด๊ธฐ ๋ก๋ ์ํ๋ ๊ฑด๋๋ ์ ์๋ค.

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

<br />

- ์ฐธ๊ณ ๋ก ์ ์์ ์์ `queryClient.getQueryData` ๋ฉ์๋๋ ๊ธฐ์กด ์ฟผ๋ฆฌ์ `์บ์๋ ๋ฐ์ดํฐ`๋ฅผ ๊ฐ์ ธ์ค๋๋ฐ ์ฌ์ฉํ  ์ ์๋ ๋๊ธฐ ํจ์์ด๋ค. ์ฟผ๋ฆฌ๊ฐ ์กด์ฌํ์ง ์์ผ๋ฉด `undefined`๋ฅผ ๋ฐํํ๋ค.

<br />

## Infinite Queries

- ๋ฌดํ ์ฟผ๋ฆฌ๋ ๋ฌดํ ์คํฌ๋กค์ด๋ load more ๊ฐ์ด ํน์  ์กฐ๊ฑด์์ ๋ฐ์ดํฐ๋ฅผ ์ถ๊ฐ์ ์ผ๋ก ๋ฐ์์ค๋ ๊ธฐ๋ฅ ๊ตฌํํ  ๋ ์ฌ์ฉํ๋ฉด ์ ์ฉํ๋ค.

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

- `useInfiniteQuery`๋ ๊ธฐ๋ณธ์ ์ผ๋ก useQuery์ ์ฌ์ฉ๋ฒ์ ๋น์ทํ์ง๋ง ์ฐจ์ด์ ์ด ์๋ค.
- useInfiniteQuery๋ ๋ฐํ๊ฐ์ผ๋ก isFetchingNextPage, isFetchingPreviousPage, fetchNextPage, fetchPreviousPage ๋ฑ์ด ์ถ๊ฐ์ ์ผ๋ก ์๋ค.
  - `fetchNextPage`๋ฅผ ํธ์ถํ๋ฉด ๋ค์ ํ์ด์ง๋ฅผ fetch ํ  ์ ์๋ค.
  - `fetchPreviousPage`๋ฅผ ํธ์ถํ๋ฉด ์ด์  ํ์ด์ง๋ฅผ fetch ํ  ์ ์๋ค.
  - `isFetchingNextPage`์ `fetchNextPage` ๋ฉ์๋๊ฐ ๋ค์ ํ์ด์ง๋ฅผ ๊ฐ์ ธ์ค๋ ๋์ true์ด๋ค. ์ฆ, ์ด๊ธฐ๊ฐ์ true์ด๊ณ , ๋ฐ์ดํฐ๋ฅผ ๊ฐ์ ธ์ค๋ฉด false๊ฐ ๋๋ค.
  - `isFetchingPreviousPage`์ `fetchPreviousPage` ๋ฉ์๋๊ฐ ์ด์  ํ์ด์ง๋ฅผ ๊ฐ์ ธ์ค๋ ๋์ true์ด๋ค. ์ฆ, ์ด๊ธฐ๊ฐ์ true์ด๊ณ , ๋ฐ์ดํฐ๋ฅผ ๊ฐ์ ธ์ค๋ฉด false๊ฐ ๋๋ค.
  - `hasNextPage`๋ ๊ฐ์ ธ์ฌ ์ ์๋ ๋ค์ ํ์ด์ง๊ฐ ์์ ๊ฒฝ์ฐ true์ด๋ค.

<b>์ต์</b>

- `pageParam`์ด๋ผ๋ ํ๋กํผํฐ๊ฐ ์กด์ฌํ๋ฉฐ queryFn์ ํ ๋นํด์ค์ผํ๋ค. ์ด๋ ๊ธฐ๋ณธ๊ฐ์ `1`๋ก ํด์ค์ผํ๋ค.
- ๊ทธ๋ฆฌ๊ณ  `getNextPageParam`์ ์ด์ฉํด์ ํ์ด์ง๋ฅผ ์ฆ๊ฐ์ํจ๋ค.
  - ์ด๋, getNextPageParam์ ์ฒซ ๋ฒ์งธ ์ธ์ `lastPage`๋ fetch ํด์จ ๊ฐ์ฅ ์ต๊ทผ์ ๊ฐ์ ธ์จ ํ์ด์ง ๋ชฉ๋ก์ด๋ค.
  - ๋ ๋ฒ์งธ ์ธ์ `allPages`๋ ํ์ฌ๊น์ง ๊ฐ์ ธ์จ ๋ชจ๋  ํ์ด์ง๋ค ๋ฐ์ดํฐ์ด๋ค.
- `getPreviousPageParam`๋ ์กด์ฌํ๋ฉฐ, `getNextPageParam`์ ๋ฐ๋์ ์์ฑ์ ๊ฐ๊ณ  ์๋ค.
- ๊ทธ๋ฆฌ๊ณ  ์์ฒญ์ด ์ฑ๊ณตํ๊ณ  ๋ฐํ๋๋ data๋ `pages`๋ผ๋ ํ๋กํผํฐ๋ฅผ ๊ฐ๊ณ ์์ผ๋ฉฐ, pages๋ `group`์ด๋ผ๋ ํ๋กํผํฐ๋ฅผ ๊ฐ๊ณ ์๋ค.

<br />

## useMutation mutate

- [useMutation ๊ณต์ ์ฌ์ดํธ](https://react-query.tanstack.com/reference/useMutation)
- react-query์์ ๊ธฐ๋ณธ์ ์ผ๋ก ์๋ฒ์์ ๋ฐ์ดํฐ๋ฅผ Get ํ  ๋๋ useQuery๋ฅผ ์ฌ์ฉํ๋ค.
- ๋ง์ฝ ์๋ฒ์ data๋ฅผ post, patch, put, delete์ ๊ฐ์ด ์์ ํ๊ณ ์ ํ๋ค๋ฉด ์ด๋๋ useMutation์ ์ด์ฉํ๋ค.
- ์์ฝํ์๋ฉด `R(read)๋ useQuery`, `CUD(Create, Update, Delete)๋ useMutation`์ ์ฌ์ฉํ๋ค.

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

- useMutation์ ๋ฐํ ๊ฐ์ธ mutation ๊ฐ์ฒด์ `mutate` ๋ฉ์๋๋ฅผ ์ด์ฉํด์ ์์ฒญ ํจ์๋ฅผ ํธ์ถํ  ์ ์๋ค.
- mutate๋ `onSuccess`, `onError` ๋ฉ์๋๋ฅผ ํตํด ์ฑ๊ณต ํ์ ์, ์คํจ ํ์ ์ response ๋ฐ์ดํฐ๋ฅผ ํธ๋ค๋งํ  ์ ์๋ค.
- `onMutate`๋ mutation ํจ์๊ฐ ์คํ๋๊ธฐ ์ ์ ์คํ๋๊ณ  mutation ํจ์๊ฐ ๋ฐ์ ๋์ผํ ๋ณ์๊ฐ ์ ๋ฌ๋๋ค.

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

- ๋ง์ฝ, useMutation์ ์ฌ์ฉํ  ๋ promise ํํ์ response๊ฐ ํ์ํ ๊ฒฝ์ฐ๋ผ๋ฉด `mutateAsync`๋ฅผ ์ฌ์ฉํด์ ์ป์ด์ฌ ์ ์๋ค.
- Redux์ ๊ฐ์ Request ์ฑ๊ณต ์ก์์ ๋ฏธ๋ค์จ์ด์์ ํ์ธํ์ฌ ์ถ๊ฐ ์ก์์ ์คํํ๋ ๊ฒ ๊ฐ์ ์์์ ํ  ๋๋, mutate๋ onSuccess, onError์ ๊ฐ์ ๋ฉ์๋๋ฅผ ๊ฐ์ด ์ฌ์ฉํด์ผ ๋๊ธฐ๋๋ฌธ์ `mutateAsync๊ฐ ๋ ๊ฐ๋์ฑ์ด ์ข๋ค`

<br />

## ์ฟผ๋ฆฌ ๋ฌดํจํ

- ์ด๊ฒ์ ๊ฐ๋์ ์ผ๋ก ํ๋ฉด์ ์ต์  ์ํ๋ก ์ ์งํ๋ ๊ฐ์ฅ ๊ฐ๋จํ ๋ฐฉ๋ฒ์ด๋ค..
- ์๋ฅผ ๋ค๋ฉด, ๊ฒ์ํ ๋ชฉ๋ก์์ ์ด๋ค ๊ฒ์๊ธ์ `์์ฑ(Post)`ํ๊ฑฐ๋ ๊ฒ์๊ธ์ `์ ๊ฑฐ(Delete)`ํ์ ๋ ํ๋ฉด์ ๋ณด์ฌ์ฃผ๋ ๊ฒ์ํ ๋ชฉ๋ก์ ์ค์๊ฐ ์ต์ ํ ํด์ผ๋  ๋๊ฐ ์๋ค.
- ํ์ง๋ง ์ด๋, `query Key`๊ฐ ๋ณํ์ง ์์ผ๋ฏ๋ก ์ด๋ด๋ ๊ฐ์  ๋ฆฌํ๋ ์ฌ๋ฅผ ์งํํด์ผ ํ๋๋ฐ ์ด๋, `queryClient`์ `invalidateQueries()` ๋ฉ์๋๋ฅผ ์ด์ฉํ๋ค.
- ์ฆ, query๊ฐ ์ค๋ ๋์๋ค๋ ๊ฒ์ ํ๋จํ๊ณ  ๋ค์ `refetch`๋ฅผ ํ  ๋ ์ฌ์ฉํ๋ค!

```tsx
import { useMutation, useQuery, useQueryClient } from "react-query";

const useAddSuperHeroData = () => {
  const queryClient = useQueryClient();
  return useMutation(addSuperHero, {
    onSuccess(data) {
      queryClient.invalidateQueries("super-heroes"); // ์ด key์ ํด๋น ํ๋ ์ฟผ๋ฆฌ๊ฐ ๋ฌดํจํ!
      console.log(data);
    },
    onError(err) {
      console.log(err);
    },
  });
};
```

- ๋ง์ฝ ๋ฌดํจํ ํ๋ ค๋ ํค๊ฐ ์ฌ๋ฌ๊ฐ๋ผ๋ฉด ์๋ ์์ ์ ๊ฐ์ด ๋ค์๊ณผ ๊ฐ์ด ๋ฐฐ์ด๋ก ๋ณด๋ด์ฃผ๋ฉด ๋๋ค.

```tsx
queryClient.invalidateQueries(["super-heroes", "posts", "comment"]);
```

- ์์ `enabled/refetch`์์๋ ์ธ๊ธํ์ง๋ง `enabled: false` ์ต์์ ์ฃผ๋ฉด`queryClient`๊ฐ ์ฟผ๋ฆฌ๋ฅผ ๋ค์ ๊ฐ์ ธ์ค๋ ๋ฐฉ๋ฒ๋ค ์ค `invalidateQueries`์ `refetchQueries`๋ฅผ ๋ฌด์ํ๋ค.
  - [Disabling/Pausing Queries](https://tanstack.com/query/v4/docs/guides/disabling-queries?from=reactQueryV3&original=https://react-query-v3.tanstack.com/guides/disabling-queries) ์ฐธ๊ณ 

<br />

## ์บ์ ๋ฐ์ดํฐ ์ฆ์ ์๋ฐ์ดํธ

- ๋ฐ๋ก ์์์ `queryClient.invalidateQueries`๋ฅผ ์ด์ฉํด ์บ์ ๋ฐ์ดํฐ๋ฅผ ์ต์ ํํ๋ ๋ฐฉ๋ฒ์ ์์๋ดค๋๋ฐ queryClient.setQueryData๋ฅผ ์ด์ฉํด์๋ ๋ฐ์ดํฐ๋ฅผ ์ฆ์ ์๋ฐ์ดํธ ํ  ์ ์๋ค.
- `queryClient.setQueryData`๋ ์ฟผ๋ฆฌ์ ์บ์๋ ๋ฐ์ดํฐ๋ฅผ ์ฆ์ ์๋ฐ์ดํธํ๋ ๋ฐ ์ฌ์ฉํ  ์ ์๋ `๋๊ธฐ ํจ์`์ด๋ค.

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

<br />

## Optimistic Update

- `Optimistic Update(๋๊ด์  ์๋ฐ์ดํธ)`๋ ์๋ฒ ์๋ฐ์ดํธ ์ UI์์๋ ์ด์ฐจํผ ์๋ฐ์ดํธ ํ  ๊ฒ์ด๋ผ๊ณ (๋๊ด์ ์ธ) ๊ฐ์ ํด์ `๋ฏธ๋ฆฌ UI๋ฅผ ์๋ฐ์ดํธ` ์์ผ์ฃผ๊ณ  ์๋ฒ๋ฅผ ํตํด ๊ฒ์ฆ์ ๋ฐ๊ณ  ์๋ฐ์ดํธ ๋๋ ๋กค๋ฐฑํ๋ ๋ฐฉ์์ด๋ค.
- ์๋ฅผ ๋ค์ด facebook์ ์ข์์ ๋ฒํผ์ด ์๋๋ฐ ์ด๊ฒ์ ์ ์ ๊ฐ ๋๋ฅธ๋ค๋ฉด ์ผ๋จ client ์ชฝ state๋ฅผ ๋จผ์  ์๋ฐ์ดํธํ๋ค. ๊ทธ๋ฆฌ๊ณ  ๋ง์ฝ์ ์คํจ ํ๋ค๋ฉด ์์  state๋ก ๋์๊ฐ๊ณ  ์ฑ๊ณตํ๋ฉด ํ์ํ ๋ฐ์ดํฐ๋ฅผ ๋ค์ fetchํด์ ์๋ฒ ๋ฐ์ดํฐ์ ํ์คํ ์ฐ๋์ ์งํํ๋ค.
- Optimistic Update๊ฐ ์ ๋ง ์ ์ฉํ  ๋๋ ์ธํฐ๋ท ์๋๊ฐ ๋๋ฆฌ๊ฑฐ๋ ์๋ฒ๊ฐ ๋๋ฆด ๋ ์ ์ ๊ฐ ํ ์ก์์ ๊ธฐ๋ค๋ฆด ํ์ ์์ด ๋ฐ๋ก ์๋ฐ์ดํธ ๋๋ ๊ฒ์ฒ๋ผ ๋ณด์ด๊ธฐ ๋๋ฌธ์ UX์ ์ผ๋ก ์ข๋ค.

```js
const useAddSuperHeroData = () => {
  const queryClient = useQueryClient();
  return useMutation(addSuperHero, {
    async onMutate(newHero) {
      // ๋๊ด์  ์๋ฐ์ดํธ๋ฅผ ๋ฎ์ด์ฐ์ง ์๊ธฐ ์ํด ์ฟผ๋ฆฌ๋ฅผ ์๋์ผ๋ก ์ญ์ ํ๋ค.
      await queryClient.cancelQueries("super-heroes");

      // ์ด์  ๊ฐ
      const previousHeroData = queryClient.getQueryData("super-heroes");

      // ์๋ก์ด ๊ฐ์ผ๋ก ๋๊ด์  ์๋ฐ์ดํธ ์งํ
      queryClient.setQueryData("super-heroes", (oldData: any) => {
        return {
          ...oldData,
          data: [
            ...oldData.data,
            { ...newHero, id: oldData?.data?.length + 1 },
          ],
        };
      });

      // ๊ฐ์ด ๋ค์ด์๋ context ๊ฐ์ฒด๋ฅผ ๋ฐํ
      return {
        previousHeroData,
      };
    },
    // mutation์ด ์คํจํ๋ฉด onMutate์์ ๋ฐํ๋ context๋ฅผ ์ฌ์ฉํ์ฌ ๋กค๋ฐฑ ์งํ
    onError(error, hero, context: any) {
      queryClient.setQueryData("super-heroes", context.previousHeroData);
    },
    // ์ค๋ฅ ๋๋ ์ฑ๊ณต ํ์๋ ํญ์ ๋ฆฌํ๋ ์ฌ
    onSettled() {
      queryClient.invalidateQueries("super-heroes");
    },
  });
};
```

- ์ฐธ๊ณ ๋ก ์ ์์ ์์ `cancelQueries`๋ ์ฟผ๋ฆฌ๋ฅผ `์๋์ผ๋ก ์ทจ์`์ํฌ ์ ์๋ค. ์ทจ์์ํฌ query์ queryKey๋ฅผ cancelQueries์ ์ธ์๋ก ๋ณด๋ด ์คํ์ํจ๋ค.
- ์๋ฅผ ๋ค์ด, ์์ฒญ์ ์๋ฃํ๋ ๋ฐ ์๊ฐ์ด ์ค๋ ๊ฑธ๋ฆฌ๋ ๊ฒฝ์ฐ, ์ฌ์ฉ์๊ฐ ์ทจ์ ๋ฒํผ์ ํด๋ฆญํ์ฌ ์์ฒญ์ ์ค์งํ๋ ๊ฒฝ์ฐ ์ด์ฉํ  ์ ์๋ค.

<br />
