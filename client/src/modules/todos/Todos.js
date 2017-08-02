import React, { Component } from 'react';
import TodosComponent from './components/Todos'
import * as todosActions from './actions/todos';
import { connect } from 'react-redux';
import TodosModel from './TodosModel'
//var model = new TodosModel();

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
        this.model = new TodosModel();
        this.toggle = this.toggle.bind(this);
        this.save = this.save.bind(this);
        this.del = this.del.bind(this);
        this.clearCompleted = this.clearCompleted.bind(this);
    }

    /**
     * Load records with or without auth_token
     * @param  {object} nextProps The next component props
     * @return {[type]}      [description]
     */
    loadData(auth_token) {

        /*
        this.model.auth_token = auth_token;
        this.model.findAll((todos) => {
            if (this.props.todos.length === 0) {
                this.props.load(todos);
            }
        });
        */
    }

    /**
     * Load data on component mount
     * @return {[type]}      [description]
     */
    componentDidMount() {
        this.props.fetch(this.props.auth_token);
        //this.loadData(this.props.auth_token);
    }

    /**
     * Load records on auth_token
     * @param  {object} nextProps The next component props
     * @return {[type]}      [description]
     */
    componentWillReceiveProps(nextProps) {
        console.log(this.props.auth_token, nextProps.auth_token)
        if (this.props.auth_token !== nextProps.auth_token) {
            this.props.fetch(nextProps.auth_token);
        }
        //this.loadData(nextProps.auth_token);
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
        this.save(newTodo);
    }

    /**
     * Store record
     * @return {[type]} [description]
     */
    save(todo) {
        this.model.store(todo, (result) => {
            todo.id ? this.updateTodo(result) : this.addTodo(result);
            this.props.edit(this.model.dispense());
        })
    }

    /**
     * Delete local record
     * @param  {object} todo The record to be locally removed
     * @return {[type]}      [description]
     */
    delLocal(todo, i) {
        let editing, todos = this.state.todos;
        todos.splice(i, 1);
        editing = this.state.editing && this.state.editing.id === todo.id ?
            this.model.dispense() : this.state.editing;
        this.props.edit(editing);
        this.props.load(todos);
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
            this.props.load(todos);
        });
    }

    /**
     * Insert local record
     * @param  {object} todo The record to be updated
     * @return {[type]}      [description]
     */
    addTodo(todo) {
        let todos = this.state.todos;
        todos.push(todo);
        this.props.load(todos);
    }

    /**
     * Update local record
     * @param  {object} todo The record to be updated
     * @return {[type]}      [description]
     */
    updateTodo(todo) {
        let i, todos = this.state.todos;
        i = todos.findIndex(item => item.id === todo.id);
        todos[i] = todo;
        this.props.load(todos);
    }

    /**
     * Render component
     * @return {[type]} [description]
     */
    render() {
        console.log(this.props.todos);
        var items = this.props.todos.filter(item => {
            return !(this.props.filter !== 'all' && item.status !== this.props.filter);
        });
        console.log(items);
        return (
            <TodosComponent
                editing={this.props.editing}
                save={this.save}
                items={items}
                edit={this.props.edit}
                del={this.del}
                toggle={this.toggle}
                clearCompleted={this.clearCompleted}
                filter={this.props.filter}
                setFilter={this.props.setFilter}
                filters={['all', 'active', 'completed']}
            />
        );
    }
}


function mapStateToProps(state, props) {
    //console.log('todos state', state);
    //console.log('todos props', props);
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
        load: (todos) => {
            dispatch(todosActions.load(todos));
        },
        setFilter: (name) => {
            dispatch(todosActions.filter(name));
        },
        fetch: (auth_token) => {
            dispatch(todosActions.fetch(auth_token));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Todos);
