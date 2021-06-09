# ReactNativeEx

## Chapter 4 - 카운터 앱(1) - Props와 State

- 컴포넌트 내부에서 사용하는 State를 선언하고 변경하기 위한 코드

```
  const [count, setCount] = useState<number>(0);
  // setState를 사용하는 이유는 State를 직접 변경하면서 발생할 수 있는 있는 오류를 줄이고,
  // 리액트의 가상돔을 활용하여 변경된 부분만 화면을 갱신하기 위해
```

## Chapter 6 - 할 일 리스트 앱 - Context와 AsyncStorage

- @types/index.d.ts 파일에 선언한 ITodoListContext interface를 이용해 context를 생성한다.

```
const TodoListContext = createContext<ITodoListContext>({
  todoList: [],
  addTodoList: (todo: string): void => {},
  removeTodoList: (index: number): void => {},
});
```

- Context Provider 컴포넌트에서 useState를 사용해 Context 데이터를 다룬다.

```
const [todoList, setTodoList] = useState<Array<string>>([]);
```

- useEffect()를 사용해 컴포넌트가 화면에 표시될 때 AsyncStorage를 참조해 이미 추가된 데이터가 있는지 확인하고 가져오는 initData()를 실행한다.

```
const initData = async () => {
  try {
    const list = await AsyncStorage.getItem('todoList');
    if(list !== null) {
      setTodoList(JSON.parse(list));
    }
  }
  catch(e) {
    console.log(e);
  }
};

useEffect(()=> {
  initData();
},[]);
```

- KeyboardAvoidingView와 Platform을 이용해 키보드에의해 화면이 가려지지 않도록 처리한다.

```
const Container = Styled.KeyboardAvoidingView`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  justify-content: flex-end;
`;
-------------------------------------------------------------------------
const TodoInput = ({hideTodoInput}: Props) => {
  return (
    <Container behavior={Platform.OS === 'ios' ? 'padding': undefined}>
      <Background onPress={()=> hideTodoInput}/>
      <TextInput hideTodoInput={hideTodoInput}/>
    </Container>
  );
};
```
