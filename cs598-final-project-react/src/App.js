import React from 'react';
import QuestionList from './components/QuestionList';
import Header from './components/Header';
import Route from './components/Route';
import User from './components/Profile';

const questions = [
    {
        title: "Is Illinois cold in winter?",
        description: "Gosh, I have stayed there for almost 5 yrs"
    },
    {
        title: "When can I leave Illinois?",
        description: "In winter",
    }
];

const users = [
    {
        firstName: "Emily",
        lastName: "Black",
        location: "Chicago",
        occupation: "professor",
        verified: false,
        expert: true,
        expertField: "Computer Science",
    }
];

const App = () => {
    return (
        <div>
            <Header/>
            <Route path="/">
                    <QuestionList questions={questions}/>
            </Route>
            <Route path="/profile">
                    <User users={users}/>
            </Route>
        </div>
    )
};

export default App;
