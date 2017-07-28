import React, { Component } from 'react';
import TodoForm from './TodoForm'
import TodoList from './TodoList'
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

        // Initial data
        this.state = {
            editing: TodosModel.dispense(),
            todos: [],
            filter: 'all'
        }

        // Component methods
        this.edit = this.edit.bind(this);
        this.save = this.save.bind(this);
        this.del = this.del.bind(this);
        this.setFilter = this.setFilter.bind(this);
        this.clearCompleted = this.clearCompleted.bind(this);
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
     * Store record
     * @return {[type]} [description]
     */
    save(todo) {
        var result = Object.assign({}, todo);
        if (!result.id) {
            result.id = Math.floor(Math.random() * 1000000) + 1 ;
        }
        todo.id ? this.updateTodo(result) : this.addTodo(result);

        // Reset editing
        this.setState({editing: TodosModel.dispense()});
    }

    /**
     * Update todo as complete
     * @param  {object} todo The record to be marked as completed
     * @return {[type]}      [description]
     */
    toggle(todo) {
        TodosModel.store(todo);
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
                TodosModel.dispense() : this.state.editing,
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
     * Render component
     * @return {[type]} [description]
     */
    render() {
        return (
            <div className="todos">
                <TodoForm editing={this.state.editing}
                    save={this.save}
                />
                <TodoList items={this.state.todos}
                    editing={this.state.editing}
                    edit={this.edit}
                    del={this.del}
                    save={this.save}
                    toggle={this.toggle}
                    filter={this.state.filter}
                    setFilter={this.setFilter}
                    filters={['all', 'active', 'completed']}
                    clearCompleted={this.clearCompleted}
                />
            </div>
        );
    }
}

export default Todos;
