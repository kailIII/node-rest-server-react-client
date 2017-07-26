import React, { Component } from 'react';

class TodoListFilter extends Component {

    render() {
        return (
            <div>
                {this.props.filters.map((filter, i) => (
                    <button key={i} onClick={this.props.setFilter.bind(null, filter)}
                        disabled={this.props.filter === filter}
                        >{filter}</button>
                ))}
                {' '}
                <button onClick={this.props.clearCompleted}
                    >clear completed</button>
            </div>
        );
    }
}

export default TodoListFilter;
