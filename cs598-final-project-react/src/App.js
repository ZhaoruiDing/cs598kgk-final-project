import React from 'react';
import QuestionList from './components/QuestionList';
import Header from './components/Header';
import Route from './components/Route';
import User from './components/Profile';
import Question from "./components/Question";

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
        location: "Chicago",
        occupation: "professor",
        verified: false,
        expert: true,
        expertField: "Computer Science",
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
                icon: '/images/profile.jpg',
                content: "You should never leave Illinois! She is so nice that I will stay here for my rest of life!",
                upVote: 198,
                downVote: 10,
                misinformation: 3
            },
            {
                user: "Alice Gu",
                userDescription: "UIUC CS Student",
                icon: '/images/profile.jpg',
                content: "I won't leave Illinois since the rent is very cheap here",
                upVote: 529,
                downVote: 23,
                misinformation: 4
            },
            {
                user: "Haoren Chen",
                userDescription: "",
                icon: '/images/profile.jpg',
                content: "I will leave Illinois during the winter since it is toooooo cold here and I cannot bear to stay for 1 more second.",
                upVote: 30,
                downVote: 32,
                misinformation: 44
            },
            {
                user: "Anonymous",
                userDescription: "",
                icon: '/images/profile.jpg',
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
                    <QuestionList questions={questions}/>
            </Route>
            <Route path="/profile">
                    <User users={users}/>
            </Route>
            <Route path="/question">
                <Question question={question}/>
            </Route>
        </div>
    )
};

export default App;
