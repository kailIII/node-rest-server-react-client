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
        this.state = this.props.editing;

        // Dependencies
        this.model = new TodosModel();

        // Component methods
        this.updateLocalTodo = this.updateLocalTodo.bind(this);
        this.saveTodo = this.saveTodo.bind(this);
        this.newTodo = this.newTodo.bind(this);
    }

    /**
     * On receive new props (on edit)
     * @param  {object} nextProps The next component props
     * @return {[type]}      [description]
     */
    componentWillReceiveProps(nextProps) {
        this.setState(nextProps.editing);
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
        this.setState(todo);
    }

    /**
     * Send todo to save
     * @return {[type]} [description]
     */
    saveTodo() {
        var todo = {
            id: this.state.id,
            status: this.state.status,
            text: this.state.text
        };
        this.props.save(todo);
    }

    /**
     * Reset form
     * @return {[type]} [description]
     */
    newTodo() {
        this.setState(this.model.dispense());
    }

    /**
     * Render component
     * @return {[type]} [description]
     */
    render() {
        return (
            <TodoFormComponent
                id={this.state.id}
                status={this.state.status}
                text={this.state.text}
                save={this.saveTodo}
                reset={this.newTodo}
                update={this.updateLocalTodo}
            />
        );
    }
}

export default TodoForm;
