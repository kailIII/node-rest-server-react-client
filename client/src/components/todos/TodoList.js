import React, { Component } from 'react';
import TodoListFilter from './TodoListFilter'
import TodoListItem from './TodoListItem'

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
        return (
            <div>
                <ul>
                    {this.props.items.map((todo, i) => (
                        <TodoListItem key={todo.id} {...todo}
                            editing={this.props.editing}
                            filter={this.props.filter}
                            toggle={this.props.toggle.bind(null, todo)}
                            edit={this.props.edit.bind(null, todo)}
                            del={this.props.del.bind(null, todo, i)}
                            save={this.props.save}
                        />
                    ))}
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
