import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import HeaderComponent from './Header'
import PageTodosComponent from './PageTodos'
import PageAuthComponent from './PageAuth'

/**
 * Other page example
 * @type {[type]}
 */
class App extends Component {

    /**
     * Render component
     * @return {[type]} [description]
     */
    render() {
        return (
            <div>
                <HeaderComponent
                    username={this.props.username}
                    logout={this.props.logout}
                />
                <Switch location={this.props.location}>
                    <Route exact path="/" render={(props) => (
                        <PageTodosComponent
                            auth_token={this.props.auth_token}
                        />
                    )} />
                    <Route path="/login" render={(props) => (
                        <PageAuthComponent
                            login={this.props.login}
                            logout={this.props.logout}
                            username={this.props.username}
                        />
                    )} />
                </Switch>
            </div>
        );
    }
}

export default App;
