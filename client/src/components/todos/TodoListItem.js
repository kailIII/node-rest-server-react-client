import React, { Component } from 'react';

/**
 * Todo list item component
 * @type {[type]}
 */
class TodoListItem extends Component {

    /**
     * Initialize Component with passed properties
     * @param  {object} props The component properties
     * @return {[type]}       [description]
     */
    constructor(props) {
        super(props);
        this.state = this.props;

        // Component methods
        this.toggle = this.toggle.bind(this);
        this.isFiltered = this.isFiltered.bind(this);
    }

    /**
     * On receive new props (on toggle status)
     * @param  {object} nextProps The next component props
     * @return {[type]}      [description]
     */
    componentWillReceiveProps(nextProps) {
        if (nextProps.status !== this.props.status) {
            this.setState({
                status: nextProps.status
            });
        }
    }

    /**
     * Update todo as complete
     * @return {[type]}      [description]
     */
    toggle() {
        var todo = {
            id: this.props.id,
            status: this.state.status === 'active' ? 'completed' : 'active',
            text: this.props.text
        };
        this.setState(todo);
        this.props.save(todo, false);
    }

    /**
     * Check whether item is filtered or not
     * @return {Boolean} [description]
     */
    isFiltered() {
        if (this.props.filter !== 'all' && this.state.status !== this.props.filter) {
            return true;
        }
    }

    /**
     * Render component
     * @return {[type]} [description]
     */
    render() {
        if (this.isFiltered()) return null;
        return (
            <li key={this.state.id}>
                <span className={this.state.status}>
                    {this.props.id} - {this.props.text}
                </span>
                <button onClick={this.toggle}>done</button>
                <button onClick={this.props.edit}>edit</button>
                <button onClick={this.props.del}>del</button>
            </li>
        );
    }
}

export default TodoListItem;
