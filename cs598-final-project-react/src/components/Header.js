import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
  } from "react-router-dom";

import User from './Profile';
import MainPage from './MainPage';
import Question from "./Question";
import Login from "./Login";
import Signup from './Signup';


const Header = ({isLoggedIn, handleLogin, handleLogout}) => {
    return (
        <Router>
        <div className="ui secondary pointing menu">
            <Link className="item" to="/">
                Main Page
            </Link>
            {isLoggedIn?
                <Link className="item" to="/profile">
                Profile
                </Link> : null
            }
            {isLoggedIn?
            <Link className="item" to="/login" onClick={handleLogout}>
                Logout
            </Link> : 
            <Link className="item" to="/login">
                Login
            </Link>
        }
        </div>


            <Switch>
                <Route exact path="/">
                    <MainPage/>
                </Route>
                <Route path={`/profile/:id?`} component={User} />
                <Route path={`/question/:id`} component={Question} />
                <Route path="/login">
                    <Login handleLogin={handleLogin}/>
                </Route>
                <Route path="/signup">
                    <Signup/>
                </Route>
            </Switch>
        </Router>
    );
};

export default Header;
