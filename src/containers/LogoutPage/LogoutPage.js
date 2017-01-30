import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import * as utils from 'lib/utils'
import * as actions from '../../actions'

class LogoutPage extends Component {
    constructor(props) {
        super(props)
    }
    
    componentDidMount() {
        this.props.logout()
    }

    render() {
        return (
            <div className="logoutPage">
                <h1>Come back soon!</h1>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loggedIn: state.loggedIn
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => {
            localStorage.removeItem('jwtToken')
            dispatch(actions.logout())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LogoutPage)


