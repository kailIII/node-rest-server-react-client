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
        this.model.auth_token = auth_token;
        this.model.findAll((todos) => {
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
        this.model.store(todo, (result) => {
            todo.id ? this.updateTodo(result) : this.addTodo(result);
            this.edit(this.model.dispense());
        })
    }

    /**
     * Delete record
     * @param  {object} todo The record to be deleted
     * @return {[type]}      [description]
     */
    del(todo, i) {
        this.model.remove(todo, () => {
            this.delLocal(todo, i);
        });
    }

    /**
     * Clear completed records
     * @return {[type]} [description]
     */
    clearCompleted() {
        this.model.clearCompleted((todos) => {
            this.setState({todos: todos});
        });
    }
}

export default TodosRest;
