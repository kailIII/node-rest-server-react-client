import React, { Component } from 'react';

class AddTodo extends Component {

    constructor(props) {
        super(props);

        // Component methods
        this.setEditingTodo = this.setEditingTodo.bind(this);
    }

    // Save current todo state
    setEditingTodo() {
        this.props.setEditingTodo({
            id: this.refs.id.value,
            text: this.refs.text.value
        })
    }

    // Render component
    render() {
        return (
            <form onSubmit={(e) => {e.preventDefault(); this.props.save();}}>
                <label>Add/Edit Todo</label>
                <input type="hidden" ref="id" value={this.props.current.id} />
                <input type="text" ref="text" value={this.props.current.text}
                    placeholder="Enter todo..."
                    onChange={this.setEditingTodo} />
                <button type="submit">Save</button>
                <a href="" onClick={(e) => {e.preventDefault(); this.props.create();}}>new</a>
            </form>
        );
    }
}

export default AddTodo;
