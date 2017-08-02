
import TodosModel from '../TodosModel'

/**
 * Load todos into local store
 * @param  {Array} todos    The list of todos
 * @return {Object}         Action object
 */
export const load = (todos) => {
    return {
        type: 'LOAD_TODOS',
        todos
    };
}

/**
 * Edit todo
 * @param  {Object} todo The todo to be edited
 * @return {Object}      Action object
 */
export const edit = (todo) => {
    return {
        type: 'EDIT_TODO',
        todo
    };
}

/**
 * Update form
 * @param  {Object} todo The todo item in form
 * @return {Object}      The action object
 */
export const updateForm = (todo) => {
    return {
        type: 'UPDATE_FORM',
        todo
    };
}

/**
 * Toggle todo status
 * @param  {Object} todo The todo item to toggle
 * @return {Object}      Action object
 */
export const toggle = (todo) => {
    todo.status = todo.status === 'active' ? 'completed' : 'active'
    return save(todo);
}

/**
 * Set list filter
 * @param  {String} name    Name of the filter
 * @return {function}       Action object
 */
export const filter = (name) => {
    return {
        type: 'SET_FILTER',
        name
    };
}

/**
 * Save todo (async)
 * @param  {Object} todo    The todo item to be saved
 * @return {function}       Thunk middleware
 */
export const save = (todo) => {
    return (dispatch) => {
        TodosModel.store(todo, (result) => {
            dispatch(edit(TodosModel.dispense()))
            dispatch(fetch())
        });
    }
}

/**
 * Delete todo (asyn)
 * @param  {Object} todo The todo item to be deleted
 * @return {function}    Thunk middleware
 */
export const del = (todo) => {
    return (dispatch, getState) => {
        var editing, state = getState()
        TodosModel.remove(todo, (result) => {
            editing = state.todos.editing.id === todo.id ? TodosModel.dispense() : state.todos.editing
            dispatch(edit(editing))
            dispatch(fetch())
        });
    }
}

/**
 * Fetch todos from server (async)
 * @param  {[type]} auth_token Optional auth token
 * @return {function}          Thunk middleware
 */
export const fetch = (auth_token) => {
    return (dispatch) => {
        TodosModel.auth_token = typeof auth_token !== 'undefined' ?
            auth_token : TodosModel.auth_token;
        TodosModel.findAll((todos) => {
            dispatch({type: 'LOAD_TODOS', todos});
        });
    }
}

/**
 * Clear completed todos
 * @return {function}   Thunk middleware
 */
export const clearCompleted = () => {
    return (dispatch) => {
        TodosModel.clearCompleted((todos) => {
            dispatch({type: 'LOAD_TODOS', todos});
        });
    }
}
