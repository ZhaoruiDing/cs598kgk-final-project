import React from 'react';
import Header from './components/Header';
import Route from './components/Route';
import User from './components/Profile';
import MainPage from './components/MainPage';
import Question from "./components/Question";
import Login from "./components/Login";

const questions = [
    {
        title: "Is Illinois cold in winter?",
        description: "Gosh, I have stayed there for almost 5 yrs"
    },
    {
        title: "When can I leave Illinois?",
        description: "In winter",
    },
    {
        title: "Should I drop CS418?",
        description: "I think I will get 0 for this course",
    }
];

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

const question = [
    {
        title: "When should I leave Illinois?",
        description: "I don't want to stay in Illinois anymore during the winter",
        answers: [
            {
                user: "Eric Ding",
                userDescription: "UIUC CS Professor",
                icon: "https://i.pravatar.cc/300?img=30",
                content: "You should never leave Illinois! She is so nice that I will stay here for my rest of life!",
                upVote: 198,
                downVote: 10,
                misinformation: 3
            },
            {
                user: "Alice Gu",
                userDescription: "UIUC CS Student",
                icon: "https://i.pravatar.cc/300?img=10",
                content: "I won't leave Illinois since the rent is very cheap here",
                upVote: 529,
                downVote: 23,
                misinformation: 4
            },
            {
                user: "Haoren Chen",
                userDescription: "",
                icon: "",
                content: "I will leave Illinois during the winter since it is toooooo cold here and I cannot bear to stay for 1 more second.",
                upVote: 30,
                downVote: 32,
                misinformation: 44
            },
            {
                user: "Anonymous",
                userDescription: "",
                icon: "",
                content: "You will never be able to leave Illinois! Never!",
                upVote: 0,
                downVote: 189,
                misinformation: 233
            }
        ]
    }
];

const App = () => {
    return (
        <div>
            <Header/>
            <Route path="/">
                    <MainPage/>
            </Route>
            <Route path="/profile">
                    <User users={users}/>
            </Route>
            <Route path="/question">
                <Question />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
        </div>
    )
};

export default App;
