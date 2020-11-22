import React from 'react';
import Question from './components/Question';

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
const temp = () => {
    return <Question questions={questions}/>;
};

export default temp;