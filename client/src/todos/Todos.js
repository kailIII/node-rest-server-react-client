import React, { Component } from 'react';
import axios from 'axios';
import AddTodo from './AddTodo'
import TodoList from './TodoList'

class Todos extends Component {

    constructor(props) {
        super(props);

        // Initial data
        this.defaultTodo = {id: '', text: '', complete: false};
        this.state = {
            editing: this.defaultTodo,
            todos: [],
            filter: 'all'
        }

        // Component methods
        this.create = this.create.bind(this);
        this.edit = this.edit.bind(this);
        this.save = this.save.bind(this);
        this.del = this.del.bind(this);
        this.toggle = this.toggle.bind(this);
        this.setFilter = this.setFilter.bind(this);
        this.clearCompleted = this.clearCompleted.bind(this);
        this.setEditingTodo = this.setEditingTodo.bind(this);
    }

    // Load data
    componentDidMount() {
        axios.get('http://localhost:8888/todos')
        .then(res => {
            if (res.status === 200) {
                this.setState({ todos: res.data });
            }
        });
      }

    // Edit new todo
    create() {
        this.setState({
            editing: this.defaultTodo
        });
    }

    // Edit existing todo
    edit(id) {
        let i = this.state.todos.findIndex(todo => id === todo.id);
        if (i !== -1) {
            this.setState({
                editing: this.state.todos[i]
            });
        }
    }

    // Save local
    saveLocal(todo) {
        let i, id = todo.id;
        let todos = this.state.todos;
        i = todos.findIndex(item => todo.id === item.id);
        if (i !== -1) {
            todos[i] = todo;
        } else {
            todos.push(todo);
        }
        this.setState({todos: todos});
        this.create();
    }

    // Save remote
    save() {
        var self = this;
        let todo = self.state.editing;
        axios.post('http://localhost:8888/todos', todo)
        .then(res => {
            if (res.status === 200) {
                self.saveLocal(res.data);
            }
        });
    }

    // Mark todo as complete
    toggle(id) {
        var self = this;
        let todos = this.state.todos;
        let i = todos.findIndex(todo => id === todo.id);
        if (i !== -1) {
            todos[i].complete = !(todos[i].complete);
            axios.post('http://localhost:8888/todos', todos[i])
            .then(res => {
                if (res.status === 200) {
                    self.saveLocal(res.data);
                    this.setState({
                        todos: todos
                    });
                }
            });
        }
    }

    // Delete todo
    del(id) {
        var self = this;
        let todos = this.state.todos;
        let i = todos.findIndex(todo => id === todo.id);
        if (i !== -1) {
            axios.delete('http://localhost:8888/todos/' + todos[i].id)
            .then(res => {
                if (res.status === 200) {
                    if (self.state.editing.id === todos[i].id) {
                        self.setState({
                            editing: self.defaultTodo
                        });
                    }
                    todos.splice(i, 1);
                    self.setState({todos: todos});
                }
            });
        }
    }

    // Filter list
    setFilter(type) {
        this.setState({
            filter: type
        })
    }

    // Clear completed
    clearCompleted() {
        let todos = this.state.todos;
        todos = todos.filter(todo => !todo.complete);
        this.setState({todos: todos});
    }

    // Save current todo state
    setEditingTodo(todo) {
        this.setState({
            editing: todo
        })
    }

    // Render todo app
    render() {
        return (
            <div className="todos">
                <AddTodo current={this.state.editing}
                    save={this.save}
                    create={this.create}
                    setEditingTodo={this.setEditingTodo}
                />
                <TodoList items={this.state.todos}
                    edit={this.edit}
                    del={this.del}
                    toggle={this.toggle}
                    filter={this.state.filter}
                    setFilter={this.setFilter}
                    filters={['all', 'active', 'completed']}
                    clearCompleted={this.clearCompleted}
                />
            </div>
        );
    }
}

export default Todos;
