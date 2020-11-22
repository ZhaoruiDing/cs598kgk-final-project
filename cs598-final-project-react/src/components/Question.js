import React from 'react';

const Question = ({questions}) => {
    const renderedQuestions = questions.map(question => {
        return <div key={question.title}>
            <div className='title active'>
            <i className="dropdown icon"> </i>
            {question.title}
            </div>

            <div className="content active">
                <p> {question.description} </p>
            </div>
        </div>
    });
    return <div className="ui styled accordion">
        {renderedQuestions}
    </div>
}

export default Question;