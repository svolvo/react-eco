import React from 'react';
import styled from 'styled-components';
import { hot } from 'react-hot-loader';
import TodoList from './todos/TodoList';

const AppContainer = styled.div`
    margin: 1rem;
    font-family: Arial, Helevetica, sans-serif;
    color: #222222;
`;

const App = () => (
    <AppContainer>
        <TodoList />
    </AppContainer>
);

export default hot(module)(App);