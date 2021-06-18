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

## Chapter 7 - 위치 정보와 API 사용법

- fetch 함수와 API를 이용해 위치 정보를 가져온다

```
Geolocation.getCurrentPosition(
  position => {
    const { latitude, longitude } = position.coords;
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${API_KEY}&units=metric`
    )
    .then(response => response.json())
    .then(json => {
      setWeatherInfo({
        temperature: json.main.temp,
        weather: json.weather[0].main,
        isLoading: true,
      });
     })
    .catch(error => {
      setWeatherInfo({
        isLoading: true,
      });
      showError('날씨 정보를 가져오는데 실패하였습니다.');
    });
  },
)
```

## Chapter 8 - 영화소개 앱 - 네비게이션과 앱 리소스

- Stack Navigator를 사용하기 위해 객체를 생성한다.

```
const Stack = createStackNavigator();
```

- 네이게이터 안에 들어갈 스크린을 정의해준다.

```
const LoginNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          title: 'MOVIEAPP',
          headerTransparent: true,
          headerTintColor: '#E70915',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
    </Stack.Navigator>
  );
};
```

- ContextAPI를 이용해 사용자 정보(로그인 정보)가 있는 확인한다.
- 사용자 정보가 있을경우(->로그인이 돼있는 경우) MovieHome으로 이동한다. 그렇지 않을 경우, Login으로 이동한다.
- 네비게이터를 네비게이션 컨테이너로 감싸서 내보낸다.

```
const {isLoading, userInfo} = useContext<IUserContext>(UserContext);

return (
  <NavigationContainer>
    {userInfo ? <MovieNavigator/> : <LoginNavigator/>}
  </NavigationContainer>
);
```

- useLayoutEffect()의 경우 렌더링 후 업데이트 되기 전 동기적으로 실행된다. 반면, useEffect()는 렌더링 되고 화면이 그려진 후 비동기적으로 실행된다. => 실행시점의 차이

- 로그인이 자동으로 이뤄진 경우 useEffect() 함수를 이용해 splash 이미지를 종료해준다.

```
useLayoutEffect(() => {
  navigation.setOptions({
    headerRight: () => (
      <StyleButton
        onPress={() => {
          logout();
        }}>
        <Icon source={require('~/Assets/Images/ic_logout.png')} />
      </StyleButton>
    ),
  });
}, []);

useEffect(() => {
  SplashScreen.hide();
}, []);
```

- 하위 컴포넌트에 함수를 넘겨줄 때, navigate() 함수와 선택한 영화의 id값을 이용하여 화면을 전환해준다.

```
<BigCatalogList
  url="https://yts.lt/api/v2/list_movies.json?sort_by=like_count&order_by=desc&limit=5"
  onPress={(id: number) => {
    navigation.navigate('MovieDetail', {
      id,
    });
  }}
/>
```

- useEffect()와 fetch()를 이용해 영화정보를 가져온 뒤, 유효한 정보일 경우 setData()를 이용해 state를 변경해준다.

```
useEffect(() => {
  fetch(url).then((response) => response.json()).then((json) => {
    console.log(json);
    setData(json.data.movies);
  }).catch((error) => {
    console.log(error);
  });
},[]);
```
