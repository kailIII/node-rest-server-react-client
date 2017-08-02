
import TodosModel from '../TodosModel'
var model = new TodosModel();

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

export const filter = (name) => {
    return {
        type: 'SET_FILTER',
        name
    };
}

export const fetch = (auth_token) => {
    console.log('fetch');
    return function action (dispatch) {
        dispatch({ type: 'FETCH_OFFERS' })
        model.auth_token = auth_token;
        return model.findAll((todos) => {
            dispatch(fetchTodosSuccess(todos));
        });
    }
}

export const fetchTodosSuccess = (todos) => {
    console.log('success', todos);
	return {
		type: 'FETCH_TODOS_SUCCESS',
		todos
	}
}

export const fetchTodosError = (error) => {
	return {
		type: 'FETCH_TODOS_FAILURE',
		todos: []
	}
}
