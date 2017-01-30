import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import * as utils from 'lib/utils'
import LoginForm from 'components/LoginForm/LoginForm'
import * as actions from '../../actions'

class LoginPage extends Component {
    constructor(props) {
        super(props)
        let username
        let password
    }
    
    componentDidMount() {
        this.redirectCheck(this.props.loggedIn)
        this.username.focus()
    }

    componentWillReceiveProps(nextProps) {
        this.redirectCheck(nextProps.loggedIn)
    }

    handleSubmit(e) {
        e.preventDefault()

        if (!this.username.value.trim() || !this.password.value.trim()) {
            return
        }

        this.props.login({
            name: this.username.value,
            password: this.password.value
        })
    }

    redirectCheck(loggedIn) {
        if (loggedIn) {
            browserHistory.push('/')
        }
    }

    render() {
        return (
            <div className="login">
                <h1>Login</h1>
                <LoginForm 
                        usernameRef={ (input) => { this.username = input } } 
                        passwordRef={ (input) => { this.password = input } }
                        handleSubmit={ this.handleSubmit.bind(this) } />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        loggedIn: state.loggedIn
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        login: (loginDetails) => {
            dispatch(actions.login(loginDetails))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)


