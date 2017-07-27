import React, { Component } from 'react';
import TodoListFilter from './TodoListFilter'

/**
 * List todos
 * @type {[type]}
 */
class TodoList extends Component {

    /**
     * Apply filter to todos list
     * @return {[type]} [description]
     */
    applyFilter() {
        var items = this.props.items;
        switch(this.props.filter) {
            case 'active':
                items = items.filter(todo => !todo.complete);
                break;
            case 'completed':
                items = items.filter(todo => todo.complete);
                break;
            case 'all':
            default:;
        }
        return items;
    }

    /**
     * Render component
     * @return {[type]} [description]
     */
    render() {
        var items = this.applyFilter();
        return (
            <div>
                <ul>
                    {items.map((todo) =>
                        (<li key={todo.id}>
                            <span className={todo.complete ? 'complete' : ''}>{todo.id} - {todo.text}</span>
                            <button onClick={this.props.toggle.bind(null, todo)}>done</button>
                            <button onClick={this.props.edit.bind(null, todo)}>edit</button>
                            <button onClick={this.props.del.bind(null, todo)}>del</button>
                        </li>
                        )
                    )}
                </ul>
                <TodoListFilter setFilter={this.props.setFilter}
                    filter={this.props.filter}
                    filters={this.props.filters}
                    clearCompleted={this.props.clearCompleted}
                />
            </div>
        );
    }
}

export default TodoList;
