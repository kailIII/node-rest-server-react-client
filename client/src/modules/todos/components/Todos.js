import React, { Component } from 'react';
import TodoForm from '../TodoForm'
import TodoListComponent from './TodoList'

/**
 * Todos component
 * @type {Object}
 */
class Todos extends Component {

    /**
     * Render component
     * @return {[type]} [description]
     */
    render() {
        return (
            <div className="todos">
                <TodoForm
                    editing={this.props.editing}
                    save={this.props.save}
                    edit={this.props.edit}
                    updateForm={this.props.updateForm}
                />
                <TodoListComponent
                    items={this.props.items}
                    edit={this.props.edit}
                    del={this.props.del}
                    toggle={this.props.toggle}
                    setFilter={this.props.setFilter}
                    filter={this.props.filter}
                    filters={this.props.filters}
                    clearCompleted={this.props.clearCompleted}
                />
            </div>
        );
    }
}

export default Todos;
