import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useAppContext } from 'store';

function LoginRequireRoute({ component: Component, ...kwargs }) {
    const {
        store: { isAuthenticated }
    } = useAppContext();

    if (isAuthenticated) {

    }
    else {

    }

    return (
        <Route 
            {...kwargs} 
            render={props => {
                if (isAuthenticated) {
                    return (<Component {...props} />);
                } else {
                    return (
                        <Redirect 
                            to={{
                                pathname: "/accounts/login", 
                                state: { from: props.location }
                            }}
                        />
                    );
                }
            }}
       />
    );
}

export default LoginRequireRoute;