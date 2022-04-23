# React-Query

Server state를 잘 관리하기 위한 목적으로 만들어진 data-fetching 라이브러리, server state의 fetching, caching, synchronizing, updating 등의 기능을 지원한다. React는 기본적으로 UI라이브러리이므로 client state는 잘 다룰 수 있지만 비동기적인 server state를 잘 다루기 위한 방법은 마련되어 있지 않기 때문에 사용.

React Query 라이브러리를 통해 개선되는 사항들(from 공식문서)

- state 캐싱
- 같은 데이터에 대한 중복된 요청을 하나의 요청으로 만들기
- 최신의 server state를 인지하고, 유지 시키기
- state의 업데이트를 빠르게 반영하기
- 페이지네이션, lazy loading의 성능 최적화
- server state에 대한 가비지 콜렉션
- 변경 사항에 대해서만(structural sharing) 쿼리 결과 메모이제이션

### QueryClient
캐시와 상호작용하기위한 클래스, QueryClient인스턴스를 생성한 뒤 QueryClientPrivider에 옵션으로 주어야 useQuery등의 훅에서 캐싱을 사용할 수 있다.
```
const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      ...
    </QueryClientProvider>
  );
}
```

### useQuery/useQueries Hook
QueryKey, fetch함수, 옵션을 인자로 받는 훅. 쿼리 키를 기준으로 캐싱 등을 관리한다. 즉 다른 쿼리 키를 부여하면 각각 적절한 캐싱 옵션을 줄 수 있다.
useQuery훅에 비동기 요청을 서버로 보내는 함수를 인자로 전달하면 요청의 결과와 함께 유용한 state들이 포함된 객체를 받을 수 있다.

+ useQuery결과값 객체의 state예시
  + data : fetch의 결과 데이터
  + error : fetch함수 실패 시의 에러 객체
  + isLoading : 현재 데이터가 없고 fetch를 진행중이면 true를 반환하는 state
  + isError : 쿼리에 에러가 발생한 경우 true를 반환하는 state
  + isSuccess : 쿼리가 성공적으로 들어오고, data가 사용가능할 때 true를 반환하는 state
  + isFetching : 쿼리의 fetch가 진행 중이면 true를 반환하는 state(refetching 포함)

이런 state들을 활용하여 로딩상태나 에러메시지 등을 쉽게 구현할 수 있다.
```
function Todos() {
   const { isLoading, isError, data, error } = useQuery('todos', fetchTodoList)

   if (isLoading) {
     return <span>Loading...</span>
   }

   if (isError) {
     return <span>Error: {error.message}</span>
   }

   return (
     <ul>
       {data.map(todo => (
         <li key={todo.id}>{todo.title}</li>
       ))}
     </ul>
   )
 }
 ```
옵션에는 다양한 속성이 존재하며, 속성을 부여하여 캐싱되는 시간, refetch하는 간격, 요청을 재시도하는 간격(polling구현 용이) 등 다양한 요소를 변경할 수 있다.

useQueries는 여러 개의 쿼리를 fetch해야할 경우 useQuery를 묶어서 사용하는 개념. 반복되는 쿼리들을 parallel하게 실행하려면 이 훅을 사용하는 것이 권장됨
```
function App({ users }) {
   const userQueries = useQueries(
     users.map(user => {
       return {
         queryKey: ['user', user.id],
         queryFn: () => fetchUserById(user.id),
       }
     })
   )
 }
```

### Initial Query Data
특정 페이지 등에서 Initial data를 설정하여 loading state를 안보이도록 만들어 UX를 향상시키는 데 활용할 수 있다.
React Query의 초기 데이터 설정에는 크게 두 가지 방법이 존재
+ 선언형 방법 : useQuery의 옵션에 initialData를 설정하는 것으로 구현, 함수를 할당할 수 있고 queryClient를 활용하여 특정 쿼리key에 해당하는 데이터를 가공하여 사용할 수도 있다.
옵션을 통해 주기적으로 초기 데이터를 최신 상태로 유지할 수 있으며 마지막 업데이트 시간을 확인할 수 있다.
  ```
  // 기본적 방법
  function Todos() {
   const result = useQuery('todos', () => fetch('/todos'), {
     initialData: initialTodos,
     staleTime: 60 * 1000,
     initialDataUpdatedAt: initialTodosUpdatedTimestamp
   })
  }
  ```

+ 명령형 방법 : queryClient.prefetchQuery를 사용하여 prefetch하는 방법, queryClient.prefetchQuery를 사용하여 직접 데이터를 캐싱하는 방법
  ```
  // useQuery와 유사한 형식으로 prefetch가능,
  const prefetchTodos = async () => {
   // The results of this query will be cached like a normal query
   await queryClient.prefetchQuery('todos', fetchTodos)
  }
  ```
  다음과 같이 미리 준비된 데이터를 특정 쿼리키를 가지는 쿼리에 할당할 수도 있다.
  ```
  queryClient.setQueryData('todos', todos)
  ```

### useMutation
서버에 대한 조작작업(CUD)를 실행할 경우 사용할 수 있는 훅, 요청을 보내면서 발생하는 side-effect를 관리하기 용이하다. 아래와 같이 mutation을 정의하고 사용할 수 있다.
```
const itemMutation = useMutation(newItem => {
    return axios.post('http://localhost:4000/itemList', newItem)
})

// 내장된 mutate메서드를 호출하여 실제로 요청을 실행
const addItemHandler = () => {
    console.log(itemName, itemPrice)
    const newItem = { itemName, itemPrice }
    itemMutation.mutate(newItem)
  }
```
useQuery훅과 마찬가지로 요청이 진행중인지, 에러가 발생했는지 등의 여부를 isLoading, isError state등으로 간단하게 활용할 수 있다.
