import React, { Component } from 'react';

/**
 * Add todos component
 * @type {[type]}
 */
class TodoForm extends Component {

    /**
     * Render component
     * @return {[type]} [description]
     */
    render() {
        return (
            <form onSubmit={(e) => {e.preventDefault(); this.props.save(); }}>
                <label>Add/Edit Todo</label>
                <input type="hidden" ref="id" value={this.props.id} />
                <input type="hidden" ref="status" value={this.props.status} />
                <input type="text" ref="text" value={this.props.text}
                    placeholder="Enter todo..."
                    onChange={this.props.update.bind(null, this.refs)} />
                <button type="submit">Save</button>
                <a href="" onClick={(e) => {e.preventDefault(); this.props.reset(); }}>new</a>
            </form>
        );
    }
}

export default TodoForm;
