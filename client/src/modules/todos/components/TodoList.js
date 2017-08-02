import React, { Component } from 'react';
import TodoListFilterComponent from './TodoListFilter'
import TodoListItemComponent from './TodoListItem'

/**
 * List todos
 * @type {[type]}
 */
class TodoList extends Component {

    /**
     * Render component
     * @return {[type]} [description]
     */
    render() {
        console.log('list items', this.props.items);
        return (
            <div>
                <ul>
                    {this.props.items.map((todo, i) => (
                        <TodoListItemComponent
                            key={todo.id} {...todo}
                            toggle={this.props.toggle.bind(null, todo)}
                            edit={this.props.edit.bind(null, todo)}
                            del={this.props.del.bind(null, todo, i)}
                        />
                    ))}
                </ul>
                <TodoListFilterComponent
                    filter={this.props.filter}
                    filters={this.props.filters}
                    setFilter={this.props.setFilter}
                    clearCompleted={this.props.clearCompleted}
                />
            </div>
        );
    }
}

export default TodoList;
