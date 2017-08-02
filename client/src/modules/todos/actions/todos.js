
import TodosModel from '../TodosModel'

export const load = (todos) => {
    return {
        type: 'LOAD_TODOS',
        todos
    };
}

export const edit = (todo) => {
    return {
        type: 'EDIT_TODO',
        todo
    };
}

export const save = (todo) => {
    return function action (dispatch) {
        return TodosModel.store(todo, (result) => {
            todo.id ?
                dispatch({ type: 'UPDATE_TODO', todo: result })
                : dispatch({ type: 'ADD_TODO', todo: result });
            dispatch({ type: 'EDIT_TODO', todo: TodosModel.dispense()});
            dispatch({ type: 'FETCH_TODOS' });
        });
    }
}

export const del = (todo, i) => {
    return function action (dispatch) {
        return TodosModel.remove(todo, (result) => {
            dispatch({ type: 'DEL_TODO', todo: todo, i: i });
        });
    }
}

export const updateForm = (todo) => {
    return {
        type: 'UPDATE_FORM',
        todo
    };
}

export const updateTodo = (todo) => {
    return {
        type: 'UPDATE_TODO',
        todo
    };
}

export const addTodo = (todo) => {
    return {
        type: 'ADD_TODO',
        todo
    };
}

export const filter = (name) => {
    return {
        type: 'SET_FILTER',
        name
    };
}

export const fetch = (auth_token) => {
    //console.log('fetch', auth_token);
    return function action (dispatch) {
        TodosModel.auth_token = typeof auth_token !== 'undefined' ?
            auth_token : TodosModel.auth_token;
        return TodosModel.findAll((todos) => {
            dispatch(load(todos));
        });
    }
}

export const clearCompleted = (todos) => {
    return function action (dispatch) {
        return TodosModel.clearCompleted((todos) => {
            dispatch(load(todos));
        });
    }
}
