import React, { Component } from 'react';
import AddTodo from './AddTodo'
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
        this.create = this.create.bind(this);
        this.edit = this.edit.bind(this);
        this.save = this.save.bind(this);
        this.del = this.del.bind(this);
        this.toggle = this.toggle.bind(this);
        this.setFilter = this.setFilter.bind(this);
        this.clearCompleted = this.clearCompleted.bind(this);
        this.setEditingTodo = this.setEditingTodo.bind(this);
    }

    /**
     * Load data when component is mounted
     * @return {[type]} [description]
     */
    componentDidMount() {
        var self = this;
        TodosModel.findAll((todos) => {
            self.setState({ todos: todos });
        })
      }

    /**
     * Set a new record in state
     * @return {[type]} [description]
     */
    create() {
        this.setState({
            editing: TodosModel.dispense()
        });
    }

    /**
     * Edit a record
     * @param  {object} todo The record to be edited
     * @return {[type]}      [description]
     */
    edit(todo) {
        let i = this.state.todos.findIndex(item => item.id === todo.id);
        this.setState({
            editing: i !== -1 ? this.state.todos[i] : this.state.editing
        });
    }

    /**
     * Update local record
     * @param  {object} todo The record to be updated
     * @return {[type]}      [description]
     */
    saveLocal(todo) {
        let i, todos = this.state.todos;
        todo.id = parseInt(todo.id, 10);
        i = todos.findIndex(item => todo.id === item.id);
        if (i !== -1) {
            todos[i] = todo;
        } else {
            todos.push(todo);
        }
        this.setState({todos: todos});
        this.create();
    }

    /**
     * Store record
     * @return {[type]} [description]
     */
    save() {
        var self = this;
        let todo = self.state.editing;
        TodosModel.store(todo, (todo) => {
            self.saveLocal(todo);
        })
    }

    /**
     * Update todo as complete
     * @param  {object} todo The record to be marked as completed
     * @return {[type]}      [description]
     */
    toggle(todo) {
        var self = this;
        todo.complete = !(todo.complete);
        TodosModel.store(todo, (todo) => {
            self.saveLocal(todo);
        });
    }

    /**
     * Delete local record
     * @param  {object} todo The record to be locally removed
     * @return {[type]}      [description]
     */
    delLocal(todo) {
        let todos = this.state.todos;
        let i = todos.findIndex(item => item.id === todo.id);
        todos.splice(i, 1);
        this.setState({
            editing: this.state.editing.id === todo.id ?
                this.defaultTodo : this.state.editing,
            todos: todos
        });
    }

    /**
     * Delete record
     * @param  {object} todo The record to be deleted
     * @return {[type]}      [description]
     */
    del(todo) {
        var self = this;
        TodosModel.remove(todo, () => {
            self.delLocal(todo)
        });
    }

    /**
     * Set current filter
     * @param {String} type The filter string
     */
    setFilter(type) {
        this.setState({
            filter: type
        })
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

    /**
     * Save editing todo
     * @param {[type]} todo [description]
     */
    setEditingTodo(todo) {
        this.setState({
            editing: todo
        })
    }

    /**
     * Render component
     * @return {[type]} [description]
     */
    render() {
        return (
            <div className="todos">
                <AddTodo current={this.state.editing}
                    save={this.save}
                    create={this.create}
                    setEditingTodo={this.setEditingTodo}
                />
                <TodoList items={this.state.todos}
                    edit={this.edit}
                    del={this.del}
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
