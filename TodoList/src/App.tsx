import React from 'react';
import Styled from 'styled-components/native';

import { TodoListContextProvider } from '~/Context/TodoListContext';

import Todo from './Screens/Todo';

const Container = Styled.View`
  flex: 1;
  background-color: #EEE;
`;

const App = () => {
  return (
    <TodoListContextProvider> 
      {/* 최상위 컴포넌트를 Provider 컴포넌트로 감싼다 */}
      <Container>
        <Todo/>
      </Container>
    </TodoListContextProvider>
  );
};

export default App;