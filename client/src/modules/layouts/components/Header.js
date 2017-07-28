import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../../assets/css/Header.css';

/**
 * Other page example
 * @type {[type]}
 */
class Header extends Component {

    /**
     * Render component
     * @return {[type]} [description]
     */
    render() {
        return (
            <header>
                <nav>
                    <ul className="menu">
                        <li><Link to="/">Home</Link></li>
                        { this.props.username ?
                            (<li>{this.props.username}<button onClick={this.props.logout}>Logout</button></li>)
                            : (<li><Link to="/login">Login</Link></li>)
                        }
                    </ul>
                </nav>
            </header>
        );
    }
}

export default Header;
