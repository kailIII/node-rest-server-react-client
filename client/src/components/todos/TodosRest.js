import TodosModel from './TodosModel'
import Todos from './Todos'

/**
 * Todos REST component
 * @type {Object}
 */
class TodosRest extends Todos {

    /**
     * Load records with or without auth_token
     * @param  {object} nextProps The next component props
     * @return {[type]}      [description]
     */
    loadData(auth_token) {
        TodosModel.auth_token = auth_token;
        TodosModel.findAll((todos) => {
            this.setState({ todos: todos });
        });
    }

    /**
     * Load data on component mount
     * @return {[type]}      [description]
     */
    componentDidMount() {
        this.loadData(this.props.auth_token);
    }

    /**
     * Load records on auth_token
     * @param  {object} nextProps The next component props
     * @return {[type]}      [description]
     */
    componentWillReceiveProps(nextProps) {
        this.loadData(nextProps.auth_token);
    }

    /**
     * Store record
     * @return {[type]} [description]
     */
    save(todo) {
        TodosModel.store(todo, (result) => {
            todo.id ? this.updateTodo(result) : this.addTodo(result);

            // Reset editing
            this.setState({editing: TodosModel.dispense()});
        })
    }

    /**
     * Delete record
     * @param  {object} todo The record to be deleted
     * @return {[type]}      [description]
     */
    del(todo, i) {
        TodosModel.remove(todo, () => {
            this.delLocal(todo, i);
        });
    }

    /**
     * Clear completed records
     * @return {[type]} [description]
     */
    clearCompleted() {
        var self = this;
        TodosModel.clearCompleted((todos) => {
            self.setState({todos: todos});
        });
    }
}

export default TodosRest;
