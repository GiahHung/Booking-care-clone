import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import './Login.scss';
import { FormattedMessage } from 'react-intl';
import { handleLoginAPI } from '../../services/userService';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: "",
            password: "",
            showPassword: false,
            errMessage: ''
        }
    }

    onchangeHandleUserName = (event)=>{
        this.setState({
            userName: event.target.value
        })
    }

    onchangeHandlePassword = (event)=>{
        this.setState({
            password: event.target.value
        })
    }

    handleLogin = async () =>{
        //console.log("All state ", this.state);
        this.setState({
            errMessage: ''
        })
        try {
            let data = await handleLoginAPI(this.state.userName, this.state.password);
            if (data) {
                if (data.error !== 0) {
                    this.setState({
                        errMessage: data.message,
                    });
                } else {
                    this.props.userLoginSuccess(data.user);
                    console.log("Login success");
                }
                console.log('Response data:', data);
            }
            console.log('aaaaaa', data)
        } catch (error) {
            if(error.response){
                if(error.response.data){
                    this.setState({
                        errMessage: error.response.data.message
                    })
                }
            }
            console.log(error.response)
        }
    }

    handleShowPassword = () =>{
        this.setState({
            showPassword: !this.state.showPassword
        })
    }

    render() {
        return (
            <div className='login-background'>
                <div className='login-container'>
                    <div className='login-content row'>
                        <div className='col-12 text-login'>Login</div>
                        <div className='col-12 form-group login-input'>
                            <label className='lbl-text'>UserName</label>
                            <input type='text' 
                                   className='form-control ipt-login' 
                                   placeholder='Enter Your User Name'
                                   value={this.state.userName}
                                   onChange={(event) => {this.onchangeHandleUserName(event)}}
                            />
                        </div>

                        <div className='col-12 form-group login-input'>
                            <label className='lbl-text'>Password</label>
                            <div className='custom-input-password'>
                                <input 
                                   type={this.state.showPassword ? 'text' : 'password'} 
                                   className='form-control ipt-login'  
                                   placeholder='Enter Your Password'
                                   value={this.state.password}
                                   onChange={(event) => {this.onchangeHandlePassword(event)}}
                                />
                                <span onClick={() =>{this.handleShowPassword()}}>
                                    <i class={this.state.showPassword ? "fas fa-eye" : "fas fa-eye-slash"}></i>
                                </span>
                            </div>
                        </div>

                        <div className='col-12 err'>
                            {this.state.errMessage}
                        </div>

                        <div className='col-12 '>
                            <button className='btn-login' onClick={() =>{this.handleLogin()}}>Log in</button>
                        </div>

                        <div className='col-12 spn-forgot'>
                            <span>Forgot your password?</span>
                        </div>

                        <div className='col-12 text-center spn-or-login'>
                            <span>Or Login With</span>
                        </div>

                        <div className='col-12 social-icon'>
                            <i className="fab fa-google-plus google"></i>
                            <i className="fab fa-facebook facebook"></i>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        userLoginFail: () => dispatch(actions.userLoginFail()),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
