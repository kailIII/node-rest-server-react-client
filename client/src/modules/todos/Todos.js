import React, { Component } from 'react';
import TodosComponent from './components/Todos'
import * as todosActions from './actions/todos';
import { connect } from 'react-redux';

/**
 * Todos component
 * @type {Object}
 */
class Todos extends Component {

    /**
     * Initialize component with properties
     * @param  {object} props The properties passed to this component
     * @return {[type]}       [description]
     */
    constructor(props) {
        super(props);

        // Component methods
        this.toggle = this.toggle.bind(this);
    }

    /**
     * Load data on component mount
     * @return {[type]}      [description]
     */
    componentDidMount() {
        this.props.fetch(this.props.auth_token);
    }

    /**
     * Load records on auth_token
     * @param  {object} nextProps The next component props
     * @return {[type]}      [description]
     */
    componentWillReceiveProps(nextProps) {
        if (this.props.auth_token !== nextProps.auth_token) {
            this.props.fetch(nextProps.auth_token);
        }
    }

    /**
     * Update todo as complete
     * @return {[type]}      [description]
     */
    toggle(todo) {
        var newTodo = {
            id: todo.id,
            status: todo.status === 'active' ? 'completed' : 'active',
            text: todo.text
        };
        this.props.save(newTodo);
    }

    /**
     * Render component
     * @return {[type]} [description]
     */
    render() {
        var items = this.props.todos.filter(item => {
            return !(this.props.filter !== 'all' && item.status !== this.props.filter);
        });
        return (
            <TodosComponent
                editing={this.props.editing}
                addTodo={this.props.addTodo}
                save={this.props.save}
                updateTodo={this.props.updateTodo}
                updateForm={this.props.updateForm}
                items={items}
                edit={this.props.edit}
                del={this.props.del}
                toggle={this.toggle}
                clearCompleted={this.props.clearCompleted}
                filter={this.props.filter}
                setFilter={this.props.setFilter}
                filters={['all', 'active', 'completed']}
            />
        );
    }
}

// Redux mapping
function mapStateToProps(state, props) {
    return {
        editing: state.todos.editing,
        todos: state.todos.todos,
        filter: state.todos.filter
    };
}
function mapDispatchToProps(dispatch, props) {
    return {
        edit: (todo) => {
            dispatch(todosActions.edit(todo));
        },
        save: (todo) => {
            dispatch(todosActions.save(todo));
        },
        addTodo: (todo) => {
            dispatch(todosActions.addTodo(todo));
        },
        updateForm: (todo) => {
            dispatch(todosActions.updateForm(todo));
        },
        updateTodo: (todo) => {
            dispatch(todosActions.updateTodo(todo));
        },
        del: (todo, i) => {
            dispatch(todosActions.del(todo, i));
        },
        load: (todos) => {
            dispatch(todosActions.load(todos));
        },
        setFilter: (name) => {
            dispatch(todosActions.filter(name));
        },
        fetch: (auth_token) => {
            dispatch(todosActions.fetch(auth_token));
        },
        clearCompleted: () => {
            dispatch(todosActions.clearCompleted());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Todos);
