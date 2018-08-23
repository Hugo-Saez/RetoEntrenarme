import React from 'react';
import {Component} from "react";
import api from '../apiService.js';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username:'',
            password:''
        }
    }
    handleChangeEmail = event => {
        this.setState({username: event.target.value});
    }
    handleChangePassword = event => {
        this.setState({password: event.target.value});
    }
    handleSubmit = event => {
        event.preventDefault();
        api.login(this.state).then(() => {
            this.props.history.push('/metricas')
        }).catch(console.error);
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit.bind(this)}>
                <div className="container justify-content-center">
                    Email:
                    <input className="form-control" type="text" value={this.state.username} onChange={this.handleChangeEmail.bind(this)} />
                    Password:
                    <input className="form-control" type="password" value={this.state.password} onChange={this.handleChangePassword.bind(this)} />
                    <input className="form-control button-submit" type="submit" value="Login" />
                </div>
            </form>

        );
    }
}

export default Login;