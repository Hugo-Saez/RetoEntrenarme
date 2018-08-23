import React from 'react';
import {Component} from "react";
import api from '../apiService.js';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email:'',
            password:'',
            firstname:'',
            lastname:''
        }
    }
    handleChangeEmail = event => {
        this.setState({email: event.target.value});
    }
    handleChangePassword = event => {
        this.setState({password: event.target.value});
      }
    handleChangeFirstname = event => {
        this.setState({firstname: event.target.value});
    }
    handleChangeLastname = event => {
        this.setState({lastname: event.target.value});
    }
    handleSubmit = event => {
        event.preventDefault();
        api.register(this.state).then(() => {
            this.props.history.push('/login')
        }).catch(console.error);
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit.bind(this)}>
                <div className="container justify-content-center">
                    Email:
                    <input className="form-control" type="text" value={this.state.email} onChange={this.handleChangeEmail.bind(this)} />
                    Password:
                    <input className="form-control" type="password" value={this.state.password} onChange={this.handleChangePassword.bind(this)} />
                    Firstname:
                    <input className="form-control" type="text" value={this.state.firstname} onChange={this.handleChangeFirstname.bind(this)} />
                    Lastname:
                    <input className="form-control" type="text" value={this.state.lastname} onChange={this.handleChangeLastname.bind(this)} />
                    <input className="form-control button-submit" type="submit" value="Enviar" />
                </div>
            </form>
        );
    }
}

export default Register;