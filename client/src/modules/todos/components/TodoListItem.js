import React, { Component } from 'react';

/**
 * Todo list item component
 * @type {[type]}
 */
class TodoListItem extends Component {

    /**
     * Render component
     * @return {[type]} [description]
     */
    render() {
        console.log('list item', this.props);
        return (
            <li key={this.props.id}>
                <span className={this.props.status}>
                    {this.props.id} - {this.props.text}
                </span>
                <button onClick={this.props.toggle}>done</button>
                <button onClick={this.props.edit}>edit</button>
                <button onClick={this.props.del}>del</button>
            </li>
        );
    }
}

export default TodoListItem;
