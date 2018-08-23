import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../logo.png';
import '../App.css';

const Header = () => (
    <div className="App">
        <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <NavLink className="btn btn-link" activeClassName='is-active' to='/registro' exact>Registro</NavLink>
            <NavLink className="btn btn-link" activeClassName='is-active' to='/login' exact>Login</NavLink>
        </header>
    </div>
);

export default Header;