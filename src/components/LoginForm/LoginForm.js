import React from 'react'
import './LoginForm.css'

const LoginForm = ({ handleSubmit, usernameRef, passwordRef }) => (
    <form className="login-form" onSubmit={ handleSubmit }>
        <div className="login-form__field">
            <label htmlFor="username">Username</label>
            <input className="input" id="username" name="username" type="text" 
                   placeholder="Username" ref={ usernameRef } />
        </div>
        <div className="login-form__field">
            <label htmlFor="password">Password</label>
            <input className="input" id="password" name="password" type="password" 
                   placeholder="Password" ref={ passwordRef } />
        </div>
        <input className="button" type="submit" value="Login" />
    </form>
)

export default LoginForm