# 💻 ErrorBoundary 주요 내용

## ErrorBoundary

- 리액트에서 ErrorBoundary는 `하위 구성 요소 트리`의 임의의 위치에서 `JavaScript 에러`를 감지하는 컴포넌트이며, 충돌한 컴포넌트 대신 `Fallback UI`를 표시하기 위해 선언적으로 작성할 수 있습니다.
- UI의 일부분에 존재하는 자바스크립트 에러가 전체 애플리케이션을 중단시키지 않기 위해 ErrorBoundary를 사용합니다.
- 에러 바운더리는 렌더링 중, `라이프사이클 메서드 및 하위 컴포넌트 트리의 어디에서든 에러를 탐지합니다.`
- 하지만, `초기 렌더링`, `이벤트 핸들러 내부 오류`나 `비동기 코드`에서 오류를 감지하지 않습니다. 오류 경계는 트리에서 아래 구성 요소의 오류만 감지하고, 오류 경계 자체의 오류는 감지하지 않습니다.

### 선언형이란?

- 프로그래밍 언어에서 선언형은 `결과물에만 집중하고 복잡한 과정을 추상화하는 것을 말합니다.`
- 선언형 반대의 개념으로 명령형이 있으며, 명령형은 결과물보다는 그 과정이 중요합니다.
- 명령형의 경우 한 줄씩 읽어 나가면서 다음에 어떤 일이 발생할지 `추측`해야 합니다. 반면, 선언형의 경우 자세한 방법을 모르더라도 코드만 보고도 `어떤 일이 발생할지 예측이 가능합니다.`

```jsx
// 명령형
function double(arr) {
  let results = [];
  for (let i = 0; i < arr.length; i++) {
    results.push(arr[i] * 2);
  }
  return results;
}
```

```js
// 선언형
function double(arr) {
  return arr.map((item) => item * 2);
}
```

```jsx
// 리액트
<QueryErrorBoundary
  fallback={
    <DefaultFallback onResetAction={() => location.replace("/start")} />
  }
>
  {/* ... */}
</QueryErrorBoundary>
```

- 리액트 코드를 보고 우리는 에러가 발생하면 DefaultFallback을 보여주는구나 바로 이해할 수 있습니다.
- QueryErrorBoundary가 내부에서 어떤 로직이 동작하는지 우리는 신경 쓰지 않아도 됩니다. 이처럼 `내부 복잡성을 추상화`하는 것이 바로 선언형입니다.

<br />

### ErrorBoundary 기본 예제

```jsx
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // 다음 렌더링에서 폴백 UI가 보이도록 상태를 업데이트합니다.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // 에러 리포팅 서비스에 에러를 기록할 수도 있습니다.
    logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // 폴백 UI를 커스텀하여 렌더링할 수 있습니다.
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}
```

- 위에 코드는 리액트 공식 문서에서 제공해 주는 기본 ErrorBoundary 코드입니다.
- 생명주기 메서드인 `getDerivedStateFromError()`와 `ComponentDidCatch()`중 하나(혹은 둘 다)를 정의하면 에러 경계가 됩니다.
  - 에러 발생한 뒤에 폴백 UI 렌더링을 하려면 `static getDerivedStateFromError`를 사용합니다.
    - 해당 생명주기 메서드는 `하위의 자손 컴포넌트`에서 오류가 발생했을 때 호출됩니다. 이 메서드는 매개변수로 오류를 전달받고, `갱신된 state 값을 반드시 반환`해야 합니다.
  - 에러 정보를 기록하려면 `componentDidCatch`를 사용합니다.
    - 생명주기 메서드는 자손 컴포넌트에서 오류가 발생했을 때 호출되며, 2개의 매개변수를 전달받습니다.
    - error - 발생한 오류, info - 어떤 컴포넌트가 오류를 발생시켰는지에 대한 정보를 포함한 componentStack 키를 갖고 있는 객체
- 에러 바운더리는 <b><code>트리 내에서 하위에 존재하는 컴포넌트의 에러만을 포착</code></b>합니다
- 에러 경계의 각 위젯을 에러 경계로 감싸서 애플리케이션의 나머지 부분이 충돌하지 않도록 보호할 수도 있습니다.

<br />
