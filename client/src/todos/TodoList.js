import React, { Component } from 'react';
import TodoListFilter from './TodoListFilter'

class TodoList extends Component {

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

    render() {
        var items = this.applyFilter();
        return (
            <div>
                <ul>
                    {items.map((todo) =>
                        (<li key={todo.id}>
                            <span className={todo.complete ? 'complete' : ''}>{todo.id} - {todo.text}</span>
                            <button onClick={this.props.toggle.bind(null, todo.id)}>done</button>
                            <button onClick={this.props.edit.bind(null, todo.id)}>edit</button>
                            <button onClick={this.props.del.bind(null, todo.id)}>del</button>
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
