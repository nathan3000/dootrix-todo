import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import './Header.css'

const Header = ({ loggedIn }) => (
    <header className="app-header">
        <div className="app-header__container">
            <div className="app-header__buttons pull-right">
                { loggedIn
                    ?  <button className="button app-header__button"><Link to="/logout">Logout</Link></button>
                    :  <button className="button app-header__button"><Link to="/login">Login</Link></button>   
                }               
            </div>
        </div>
    </header>
)

const mapStateToProps = (state) => {
    return {
        loggedIn: state.loggedIn
    }
}

export default connect(mapStateToProps)(Header)