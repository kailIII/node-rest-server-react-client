import React, { Component } from 'react';
import TodosComponent from './components/Todos'
import TodosModel from './TodosModel'

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

        // Dependencies
        this.model = new TodosModel();

        // Initial data
        this.state = {
            editing: this.model.dispense(),
            todos: [],
            filter: 'all'
        }

        // Component methods
        this.toggle = this.toggle.bind(this);
        this.edit = this.edit.bind(this);
        this.save = this.save.bind(this);
        this.del = this.del.bind(this);
        this.setFilter = this.setFilter.bind(this);
        this.clearCompleted = this.clearCompleted.bind(this);
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
     * Edit a record
     * @param  {object} todo The record to be edited
     * @return {[type]}      [description]
     */
    edit(todo) {
        this.setState({
            editing: todo
        });
    }

    /**
     * Store record
     * @return {[type]} [description]
     */
    save(todo) {
        var result = Object.assign({}, todo);
        if (!result.id) {
            result.id = this.model.generateId();
        }
        todo.id ? this.updateTodo(result) : this.addTodo(result);
        this.edit(this.model.dispense());
    }

    /**
     * Delete local record
     * @param  {object} todo The record to be locally removed
     * @return {[type]}      [description]
     */
    delLocal(todo, i) {
        let todos = this.state.todos;
        todos.splice(i, 1);
        this.setState({
            editing: this.state.editing && this.state.editing.id === todo.id ?
                this.model.dispense() : this.state.editing,
            todos: todos
        });
    }

    /**
     * Delete record
     * @param  {object} todo The record to be deleted
     * @return {[type]}      [description]
     */
    del(todo, i) {
        this.delLocal(todo, i);
    }

    /**
     * Set current filter
     * @param {String} type The filter string
     */
    setFilter(type) {
        this.setState({
            filter: type
        });
    }

    /**
     * Clear completed records
     * @return {[type]} [description]
     */
    clearCompleted() {
        var todos = this.state.todos.filter(item => item.status !== 'completed');
        this.setState({todos: todos});
    }

    /**
     * Insert local record
     * @param  {object} todo The record to be updated
     * @return {[type]}      [description]
     */
    addTodo(todo) {
        let todos = this.state.todos;
        todos.push(todo);
        this.setState({todos: todos});
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
        this.setState({todos: todos});
    }

    /**
     * Render component
     * @return {[type]} [description]
     */
    render() {
        var items = this.state.todos.filter(item => {
            return !(this.state.filter !== 'all' && item.status !== this.state.filter);
        });
        return (
            <TodosComponent
                editing={this.state.editing}
                save={this.save}
                items={items}
                edit={this.edit}
                del={this.del}
                toggle={this.toggle}
                clearCompleted={this.clearCompleted}
                filter={this.state.filter}
                setFilter={this.setFilter}
                filters={['all', 'active', 'completed']}
            />
        );
    }
}

export default Todos;
