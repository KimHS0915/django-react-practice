import React from 'react';
import { Route } from 'react-router-dom';
import About from './About';
import Home from './Home';
import AccountsRoutes from './accounts';
import LoginRequiredRoute from 'utils/LoginRequiredRoute';
import PostNew from './PostNew';

function Root() {
    return (
        <>
            <LoginRequiredRoute exact path="/" component={Home} />
            <Route exact path="/about" component={About} />
            <LoginRequiredRoute exact path="/posts/new" component={PostNew} />
            <Route path="/accounts" component={AccountsRoutes} />
        </>
    );
}

export default Root;
