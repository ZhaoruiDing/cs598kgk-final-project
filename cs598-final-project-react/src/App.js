import React from 'react';
import QuestionList from './components/QuestionList';
import Header from './components/Header';
import Route from './components/Route';
import Profile from './components/Profile';

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
const App = () => {
    return (
        <div>
            <Header/>
            <Route path="/">
                <QuestionList questions={questions}/>
            </Route>
            <Route path="/profile">
            <Profile/>
            </Route>
        </div>
    )
};

export default App;