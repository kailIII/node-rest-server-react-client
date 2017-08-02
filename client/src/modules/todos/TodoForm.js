import React, { Component } from 'react';
import TodosModel from './TodosModel'
import TodoFormComponent from './components/TodoForm'

/**
 * Add todos component
 * @type {[type]}
 */
class TodoForm extends Component {

    /**
     * Initialize Component with passed properties
     * @param  {object} props The component properties
     * @return {[type]}       [description]
     */
    constructor(props) {
        super(props);

        // Component methods
        this.updateLocalTodo = this.updateLocalTodo.bind(this);
        this.saveTodo = this.saveTodo.bind(this);
        this.newTodo = this.newTodo.bind(this);
    }

    /**
     * Save current state of editing todo
     */
    updateLocalTodo(refs) {
        var todo = {
            id: parseInt(refs.id.value, 10),
            status: refs.status.value,
            text: refs.text.value
        };
        this.props.updateForm(todo);
    }

    /**
     * Send todo to save
     * @return {[type]} [description]
     */
    saveTodo() {
        this.props.save(this.props.editing);
    }

    /**
     * Reset form
     * @return {[type]} [description]
     */
    newTodo() {
        this.props.edit(TodosModel.dispense())
    }

    /**
     * Render component
     * @return {[type]} [description]
     */
    render() {
        return (
            <TodoFormComponent
                id={this.props.editing.id}
                status={this.props.editing.status}
                text={this.props.editing.text}
                save={this.saveTodo}
                reset={this.newTodo}
                update={this.updateLocalTodo}
            />
        );
    }
}

export default TodoForm;
