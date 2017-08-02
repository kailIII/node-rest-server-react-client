import React, { Component } from 'react';
import TodosComponent from './components/Todos'
import * as todosActions from './actions/todos';
import { connect } from 'react-redux';

/**
 * Todos component
 * @type {Object}
 */
class Todos extends Component {

    /**
     * Load data on component mount
     * @return {[type]}      [description]
     */
    componentDidMount() {
        this.props.fetch(this.props.auth_token);
    }

    /**
     * Load records on auth_token
     * @param  {object} nextProps The next component props
     * @return {[type]}      [description]
     */
    componentWillReceiveProps(nextProps) {
        if (this.props.auth_token !== nextProps.auth_token) {
            this.props.fetch(nextProps.auth_token);
        }
    }

    /**
     * Render component
     * @return {[type]} [description]
     */
    render() {
        var items = this.props.todos.filter(item => {
            return !(this.props.filter !== 'all' && item.status !== this.props.filter);
        });
        return (
            <TodosComponent
                items={items}
                editing={this.props.editing}
                save={this.props.save}
                updateForm={this.props.updateForm}
                edit={this.props.edit}
                del={this.props.del}
                toggle={this.props.toggle}
                clearCompleted={this.props.clearCompleted}
                filter={this.props.filter}
                setFilter={this.props.setFilter}
                filters={['all', 'active', 'completed']}
            />
        );
    }
}

// Redux mapping
function mapStateToProps(state, props) {
    return state.todos
}
function mapDispatchToProps(dispatch, props) {
    return {
        edit: (todo) => {
            dispatch(todosActions.edit(todo));
        },
        save: (todo) => {
            dispatch(todosActions.save(todo));
        },
        updateForm: (todo) => {
            dispatch(todosActions.updateForm(todo));
        },
        toggle: (todo) => {
            dispatch(todosActions.toggle(todo));
        },
        del: (todo) => {
            dispatch(todosActions.del(todo));
        },
        setFilter: (name) => {
            dispatch(todosActions.filter(name));
        },
        fetch: (auth_token) => {
            dispatch(todosActions.fetch(auth_token));
        },
        clearCompleted: () => {
            dispatch(todosActions.clearCompleted());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Todos);
