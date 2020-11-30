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

const users = [
    {
        firstName: "Emily",
        lastName: "Black",
        city: "Chicago",
        country: "USA",
        occupation: "Professor",
        company: "University of Chicago",
        verified: false,
        expert: true,
        expertField: "Computer Science",
        upvotes: 223,
        bio:"A UChicago professor in computer science field. Welcome!",
    }
];

const Header = () => {
    return (
        <Router>
        <div className="ui secondary pointing menu">
            <Link className="item" to="/">
                Main Page
            </Link>

            <Link className="item" to="/profile">
                Profile
            </Link>

            <Link className="item" to="/question/323">
                Question Sample Page
            </Link>
            <Link className="item" to="/login">
                Login
            </Link>
        </div>


            <Switch>
                <Route exact path="/">
                    <MainPage/>
                </Route>
                <Route path="/profile">
                    <User users={users}/>
                </Route>
                <Route path={`/question/:id`}>
                    <Question />
                </Route>
                <Route path="/login">
                    <Login />
                </Route>
            </Switch>
        </Router>
    );
};

export default Header;
