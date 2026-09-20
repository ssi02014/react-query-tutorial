# 💻 Inside React Query

- 해당 문서는 [tkdodo - inside-react-query](https://tkdodo.eu/blog/inside-react-query) 포스팅을 번역하고, 좀 더 이해에 필요한 내용을 추가한 문서입니다.

<br />

## Intro

- React Query는 리렌더링해야 하는 시점을 어떻게 알 수 있을까요? 또 어떻게 중복 요청을 제거하고, 어떻게 프레임워크에 구애받지 않을 수 있을까요?
- 위 질문들에 답하려면 React Query의 내부를 들여다보고, useQuery를 호출할 때 실제로 어떤 일이 일어나는지 분석해봐야 합니다.

<br />

## QueryClient

<img width="900" alt="스크린샷 2024-02-27 오전 1 41 04" src="https://github.com/ssi02014/react-query-tutorial/assets/64779472/8c0fe216-f27c-4c33-b4e4-1334ddacc294">

<br />

- 모든 것은 `QueryClient`에서 시작됩니다.
- QueryClient는 애플리케이션이 시작될 때 인스턴스를 생성하고, `QueryClientProvider`를 통해 애플리케이션 어디에서나 사용할 수 있도록 해주는 클래스입니다.

```tsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// ⬇️ this creates the client
const queryClient = new QueryClient();

function App() {
  return (
    // ⬇️ this distributes the client
    <QueryClientProvider client={queryClient}>
      <RestOfYourApp />
    </QueryClientProvider>
  );
}
```

<br />

- QueryClientProvider는 `React Context`를 사용하여 애플리케이션 전체에 QueryClient를 전달합니다.
- `new QueryClient()`로 생성한 인스턴스는 `안정적인 값`이며 한 번만 생성되므로, React Context로 전달하기에 적절합니다.
  - Context가 앱을 다시 리렌더링시키는 것이 아니라, 단지 useQueryClient를 통해 queryClient에 대한 `액세스 권한만 부여`합니다.
  - 다만 queryClient 인스턴스가 실수로 자주 다시 생성되지 않도록 주의해야 합니다.

<br />

## A vessel that holds the cache (캐시를 담는 그릇)

- 잘 알려져 있지 않을 수도 있지만, QueryClient 자체는 실제로 많은 일을 하지 않습니다.
- QueryClient는 `new QueryClient()`를 호출할 때 함께 생성되는 `QueryCache`와 `MutationCache`를 담는 컨테이너입니다. 또한 모든 `query`와 `mutation`에 적용할 몇 가지 기본값을 보유하고 있으며, cache(캐시)를 다루기 위한 편리한 방법을 제공합니다.
- 대부분의 상황에서는 `cache와 직접 상호 작용하지 않고 QueryClient를 통해 cache에 액세스합니다.`

<br />

## QueryCache

- QueryClient는 우리가 cache를 다룰 수 있게 해줍니다. 그렇다면 cache(QueryCache)란 무엇일까요?

<img width="900" alt="스크린샷 2024-02-27 오전 1 53 07" src="https://github.com/ssi02014/react-query-tutorial/assets/64779472/a4c6838f-afd8-4847-a195-19963b445180">

- 간단히 말해 QueryCache는 `in-memory` 객체입니다. key는 `안정적으로 직렬화된 queryKey`(queryKeyHash라고 합니다)이고, value는 `Query 클래스의 인스턴스`입니다.
- React Query는 기본적으로 데이터를 `in-memory`에만 저장하고, 다른 곳에는 저장하지 않습니다. 이 점을 이해하는 것이 굉장히 중요합니다.

<br />

<img width="900" alt="스크린샷 2024-02-27 오전 2 05 50" src="https://github.com/ssi02014/react-query-tutorial/assets/64779472/7a231716-2c80-4be4-aecc-f547fb255268">

> 해석: 좀 더 구체적으로 말씀드리겠습니다. 캐시는 인메모리에 존재하며, 해당 탭의 JavaScript 컨텍스트가 살아있는 동안에만 유지됩니다. 새로고침, 하드 내비게이션(pushState나 replaceState 히스토리 API를 사용하지 않는 이동), 탭을 닫거나 새로 여는 경우에는 캐시가 유지되지 않습니다.

- https://github.com/TanStack/query/issues/1677#issuecomment-766137011
- cache를 좀 더 자세히 이해하기 위해 위 이슈에서 React Query의 창시자 `tannerlinsley`가 언급한 내용을 확인해봅시다.
- `tannerlinsley`는 React Query의 cache가 in-memory 객체이며, 브라우저 탭의 `JavaScript Context(자바스크립트 실행 환경) 생명 주기 내에서만 존재`한다고 언급합니다.
- 즉, React Query 캐시는 브라우저 탭 간에 공유되지 않으며, 브라우저를 새로고침하면 사라집니다. 로컬 스토리지와 같은 외부 저장소에 캐시를 쓰고 싶다면 [persisters](https://tanstack.com/query/latest/docs/framework/react/plugins/persistQueryClient)를 살펴보는 게 좋습니다.

<br />

### in-memory?

- 위에서 말하는 in-memory는 `브라우저 메모리`를 의미합니다. 최신 브라우저는 대체로 탭을 별도의 프로세스로 관리하며, 각 탭은 독립된 메모리 공간을 할당받습니다.
- 이는 각 브라우저 탭이 자신만의 독립된 JavaScript 실행 환경을 가진다는 것을 의미합니다.
  - 이러한 특징 때문에 한 탭에서 생성된 변수, 객체 등은 다른 탭과 공유되지 않습니다.

<br />

## Query

<img width="900" alt="스크린샷 2024-02-27 오전 2 28 43" src="https://github.com/ssi02014/react-query-tutorial/assets/64779472/499b4aed-73a3-4eeb-9de9-225d8b9a6992">

- QueryCache에는 Query들이 있으며, 대부분의 로직은 이 Query에서 실행됩니다.
- Query는 `데이터, 상태 필드, 마지막 fetching이 발생한 시점과 같은 meta 정보 등 query에 대한 모든 정보`를 담고 있을 뿐만 아니라, query 함수를 `실행`하고 `재시도`, `취소`, `중복 제거` 로직까지 포함합니다.
- Query에는 내부 상태 머신이 있어서 불가능한 상태에 빠지지 않도록 합니다.
  - 예를 들어, 이미 fetching이 진행 중인 상태에서 query 함수가 다시 트리거되면 해당 요청의 중복을 제거할 수 있습니다.
  - query가 취소되면 이전 상태로 돌아갑니다.
- 핵심 포인트는 **query가 누가 자신의 데이터에 관심이 있는지 파악할 수 있고, 해당 관찰자(Observer)들에게 모든 변경 사항을 알릴 수 있다는 점입니다.**

<br />

## QueryObserver

<img width="900" alt="스크린샷 2024-02-27 오전 2 43 35" src="https://github.com/ssi02014/react-query-tutorial/assets/64779472/099af439-67d6-48e7-a14b-9de5b3ee3150">

- Observer는 query와 query를 사용하려는 컴포넌트 사이에서 `접착제 역할`을 합니다.
- Observer는 `useQuery를 호출할 때 생성`되며, `항상 정확히 하나의 query를 구독합니다.`
  - 이러한 특징 때문에 우리는 useQuery에 queryKey를 전달해야 합니다.
- Observer는 조금 더 많은 작업을 수행하며, 대부분의 최적화가 이루어지는 곳입니다.
- Observer는 컴포넌트가 현재 사용 중인 `query의 속성`을 알고 있으므로, 관련 없는 변경 사항은 알릴 필요가 없습니다.
  - 예를 들어, 컴포넌트가 `data 필드`만 사용한다면 background refetch로 `isFetching`이 변경되더라도 해당 컴포넌트와는 관련 없는 속성이므로 굳이 리렌더링할 필요가 없습니다.
- 더 나아가 각 Observer는 `select` 옵션을 가질 수 있으며, 여기에서 data 필드의 어떤 부분에 관심이 있는지 결정할 수 있습니다.
  - 관련된 내용을 [tkdodo - #2: React Query Data Transformations](https://tkdodo.eu/blog/react-query-data-transformations#3-using-the-select-option) 에서 참고하실 수 있습니다.
- staleTime 또는 interval fetching과 같은 대부분의 타이머도 `Observer Level`에서 동작합니다.

<br />

## Active and inactive Queries (활성 및 비활성 쿼리)

- Observer가 없는 query를 inactive(비활성) query라고 합니다.
- inactive query는 여전히 캐시에 남아 있지만, 어떤 컴포넌트에서도 사용되지 않습니다.
- 이러한 inactive query는 React Query Devtools에서 회색으로 표시되며, 왼쪽의 숫자는 해당 query를 구독하고 있는 Observer의 수를 나타냅니다.

<img width="269" alt="스크린샷 2024-02-27 오전 2 58 00" src="https://github.com/ssi02014/react-query-tutorial/assets/64779472/fc672a68-deca-4409-8973-82a759c11f75">

<br />

## The Complete Picture of React Query Architecture (리액트 쿼리 아키텍처 전체 그림)

<img width="900" alt="스크린샷 2024-02-27 오전 2 59 50" src="https://github.com/ssi02014/react-query-tutorial/assets/64779472/2a3c898e-c4fe-4c11-bba1-df121431e488">

- 위 그림을 종합해보면 대부분의 로직이 프레임워크에 구애받지 않는 `Query Core` 안에 있다는 것을 알 수 있습니다.
  - `QueryClient`, `QueryCache`, `Query`, `QueryObserver`가 모두 Query Core에 속합니다.
- 따라서 새로운 프레임워크용 `Adapter(어댑터)`를 만드는 것이 매우 간단합니다.
  - 기본적으로 Observer를 만들고, Observer를 구독하고, Observer가 알림을 받으면 컴포넌트를 다시 렌더링하는 방법만 있으면 됩니다.
  - [react](https://github.com/TanStack/query/blob/9d9aea5fb12eb89dec54c619845b3d226b53cf2b/packages/react-query/src/useBaseQuery.ts#L33-L115)와 [solid](https://github.com/TanStack/query/blob/9579dd893656d0a4a7ac0207a204d4b3735c329d/packages/solid-query/src/createBaseQuery.ts#L33-L131)용 useQuery Adapter에는 각각 약 100줄의 코드만 있습니다.

<br />

### Adapter(어댑터)?

- Adapter는 서로 다른 두 시스템이나 장치, 소프트웨어 컴포넌트 사이에서 호환성을 제공하거나 통신을 가능하게 해주는 장치 또는 프로그램을 의미합니다.

<br />

## From a component perspective (컴포넌트 관점에서)

<img width="900" alt="스크린샷 2024-02-27 오전 3 13 58" src="https://github.com/ssi02014/react-query-tutorial/assets/64779472/bee9050d-0581-4e0a-bf15-945c3e6504b0">

- 마지막으로 컴포넌트부터 시작하여 다른 각도에서 흐름을 살펴봅시다.
  - 컴포넌트가 마운트되면 `useQuery`를 호출하여 `Observer`를 생성합니다.
  - 생성된 `Observer`는 `QueryCache`에 있는 `Query`를 구독합니다.
  - 이 구독은 `Query`가 아직 존재하지 않으면 `Query 생성`을, 데이터가 오래된 것으로 간주되면 `background refetch`를 트리거할 수 있습니다.
  - fetching이 시작되면 `Query`의 상태가 변경되기 때문에 `Observer`에게 이에 대한 정보가 전달됩니다.
  - 그러면 `Observer`는 몇 가지 최적화를 수행하고, 필요하다고 판단되면 컴포넌트에 업데이트를 알려 새로운 상태를 렌더링하게 합니다.
  - `Query` 실행이 끝나면 `Observer`에게 이 사실을 다시 알립니다.
- 위 내용은 가능한 여러 흐름 중 하나에 불과하다는 점에 유의해야 합니다.
- 가장 이상적인 경우는 컴포넌트가 마운트될 때 데이터가 이미 cache에 있는 것입니다.
  - [tkdodo - #17: Seeding the Query Cache](https://tkdodo.eu/blog/seeding-the-query-cache) 해당 포스팅에서 관련 내용을 확인할 수 있습니다.
- **모든 흐름에서 공통적인 점은 대부분의 로직이 React(또는 Vue, Solid) 외부에서 발생하고, 상태 시스템의 모든 업데이트는 Observer에게 전달되며, Observer가 컴포넌트에도 알려야 하는지 여부를 결정한다는 것입니다.**

<br />
