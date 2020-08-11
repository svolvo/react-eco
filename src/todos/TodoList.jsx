import React , { useEffect } from 'react';
import NewTodoForm from './NewTodoForm';
import TodoListItem from './TodoListItem';
import styled from 'styled-components';
import { 
    loadTodos,
    removeTodoRequest,
    markTodoCompletedRequest,
} from './thunks';
import { connect } from 'react-redux';
import { 
    getTodosLoading,
    getCompletedTodos,
    getIncompleteTodos,
} from './selectors';


const ListWrapper = styled.div`
    max-width: 700px;
    margin: auto;
`;


const TodoList = ({ completedTodos, incompleteTodos , isLoading , onRemovePressed , onCompletedPressed , startLoadingTodos}) => {
    useEffect(() => {
        startLoadingTodos();
    }, []);
    
    const loadingMessage = <div>Loading todos...</div>
    const content = (
        <ListWrapper>
            <NewTodoForm />
            <h3>Incomplete</h3>
            {incompleteTodos.map(todo => <TodoListItem
                todo={todo} 
                onRemovePressed={onRemovePressed} 
                onCompletedPressed={onCompletedPressed}/>)}
            <h3>Completed</h3>
            {completedTodos.map(todo => <TodoListItem
                todo={todo} 
                onRemovePressed={onRemovePressed} 
                onCompletedPressed={onCompletedPressed}/>)}
        </ListWrapper>
    );

    return isLoading ? loadingMessage : content;
};

const mapStateToProps = state => ({
    completedTodos: getCompletedTodos(state),
    incompleteTodos: getIncompleteTodos(state),
    isLoading: getTodosLoading(state),
});

const mapDispatchToProps = dispatch => ({ 
    onRemovePressed: id => dispatch(removeTodoRequest(id)),
    onCompletedPressed: id => dispatch(markTodoCompletedRequest(id)),
    startLoadingTodos: () => dispatch(loadTodos()),
 });

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);