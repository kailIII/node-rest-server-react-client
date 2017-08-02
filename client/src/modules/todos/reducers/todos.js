
import TodosModel from '../TodosModel'

export default (state, action) => {

    /**
     * Initialise todos state
     */
    if (typeof state === 'undefined') {
        state = {
            editing: TodosModel.dispense(),
            todos: [],
            filter: 'all'
        }
    }

    /**
     * Resolve actions
     */
    switch (action.type) {

        // Load todos
        case 'LOAD_TODOS':
            return {
                editing: state.editing,
                todos: action.todos,
                filter: state.filter
            }

        // Edit todo
        case 'EDIT_TODO':
            return {
                editing: action.todo,
                todos: state.todos,
                filter: state.filter
            }

        // Update todo form
        case 'UPDATE_FORM':
            return {
                editing: action.todo,
                todos: state.todos,
                filter: state.filter
            }

        // Set listing filter
        case 'SET_FILTER':
            return {
                filter: action.name,
                editing: state.editing,
                todos: state.todos
            }

        // Default state
        default:
            return state;
    }
};
