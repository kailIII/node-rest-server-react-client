
import TodosModel from '../TodosModel'
const model = new TodosModel();

export default(state, action) => {

    if (typeof state === 'undefined') {
        state = {
            editing: model.dispense(),
            todos: [],
            filter: 'all'
        }
    }

    switch (action.type) {

        case 'LOAD_TODOS':
            return {
                editing: state.editing,
                todos: action.todos,
                filter: state.filter
            }

        case 'EDIT_TODO':
            return {
                editing: action.todo,
                todos: state.todos,
                filter: state.filter
            }

        case 'SET_FILTER':
            return {
                filter: action.name,
                editing: state.editing,
                todos: state.todos
            }

        case 'FETCH_TODOS_SUCCESS':
            return {
                editing: state.editing,
                todos: action.todos,
                filter: state.filter
            }

        default:
            return state;
    }
};
