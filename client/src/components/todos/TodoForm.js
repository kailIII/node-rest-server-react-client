import React, { Component } from 'react';
import TodosModel from './TodosModel'

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

        // Component methods
        this.updateLocalTodo = this.updateLocalTodo.bind(this);
        this.saveTodo = this.saveTodo.bind(this);
        this.newTodo = this.newTodo.bind(this);
    }

    /**
     * On receive new props (on edit todo)
     * @param  {object} nextProps The next component props
     * @return {[type]}      [description]
     */
    componentWillReceiveProps(nextProps) {
        if (nextProps.editing && nextProps.editing.id !== this.props.id) {
            this.setState(nextProps.editing);
        }
    }

    /**
     * Save current state of editing todo
     */
    updateLocalTodo() {
        var todo = {
            id: parseInt(this.refs.id.value, 10),
            status: this.refs.status.value,
            text: this.refs.text.value
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
        this.setState(TodosModel.dispense());
    }

    /**
     * Render component
     * @return {[type]} [description]
     */
    render() {
        return (
            <form onSubmit={(e) => {e.preventDefault(); this.saveTodo();}}>
                <label>Add/Edit Todo</label>
                <input type="hidden" ref="id" value={this.state.id} />
                <input type="hidden" ref="status" value={this.state.status} />
                <input type="text" ref="text" value={this.state.text}
                    placeholder="Enter todo..."
                    onChange={this.updateLocalTodo} />
                <button type="submit">Save</button>
                <a href="" onClick={(e) => {e.preventDefault(); this.newTodo();}}>new</a>
            </form>
        );
    }
}

export default TodoForm;
