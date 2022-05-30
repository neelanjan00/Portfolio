import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const PublicRoute = ({ component: Component, authenticated, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props => authenticated === true
                ? <Redirect to='/admin' />
                : <Component {...props} />}
        />
    )
}

export default PublicRoute