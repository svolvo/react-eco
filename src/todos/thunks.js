import { 
    loadTodosInProgress, 
    loadTodosSuccess, 
    loadTodosFailure,
    createTodo,
    removeTodo,
    markAsDone,
} from './actions';

export const loadTodos = () => async dispatch => {
    try {
        dispatch(loadTodosInProgress());
        const response = await fetch('http://localhost:8080/todos');
        const todos = await response.json();
    
        dispatch(loadTodosSuccess(todos));
    } catch (error) {
        dispatch(loadTodosFailure());
        dispatch(displayAlert(error));
    }
    
}

export const addTodoRequest = text => async dispatch => {
    try {
        const body = JSON.stringify({ text });
        const response = await fetch('http://localhost:8080/todos', {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body
        });
        const todo = await response.json();
        dispatch(createTodo(todo));   
    } catch (error) {
        dispatch(displayAlert(error));
    }
}

export const removeTodoRequest = id => async dispatch => {
    try {
        const response = await fetch(`http://localhost:8080/todos/${id}`, {
            method: 'delete',
        });
        const removedTodo = await response.json();
        dispatch(removeTodo(removedTodo));   
    } catch (error) {
        dispatch(displayAlert(error));
    }
}

export const markTodoCompletedRequest = id => async dispatch => {
    try {
        const response = await fetch(`http://localhost:8080/todos/${id}/completed`, {
            method: 'POST',
        });
        const completedTodo = await response.json();
        dispatch(markAsDone(completedTodo));   
    } catch (error) {
        dispatch(displayAlert(error));
    }
}

export const displayAlert = text => () => {
    alert(text);
};