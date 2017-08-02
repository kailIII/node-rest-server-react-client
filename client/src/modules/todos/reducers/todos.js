
import TodosModel from '../TodosModel'

export default(state, action) => {
    var i;
    if (typeof state === 'undefined') {
        state = {
            editing: TodosModel.dispense(),
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

        case 'ADD_TODO':
            var todos = Object.assign([], state.todos);
            todos.push(action.todo);
            return {
                editing: action.todo,
                todos: todos,
                filter: state.filter
            }

        case 'UPDATE_FORM':
            return {
                editing: action.todo,
                todos: state.todos,
                filter: state.filter
            }

        case 'UPDATE_TODO':
            var todos = Object.assign([], state.todos);
            i = todos.findIndex(item => item.id === action.todo.id);
            todos[i] = action.todo;
            return {
                editing: state.editing,
                todos: todos,
                filter: state.filter
            }

        case 'DEL_TODO':

            let editing = Object.assign({}, state.editing),
                todos = Object.assign([], state.todos);
            todos.splice(action.i, 1);
            editing = state.editing && state.editing.id === action.todo.id ?
                TodosModel.dispense() : state.editing;
            return {
                editing: editing,
                todos: todos,
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
