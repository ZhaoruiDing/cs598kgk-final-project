import React, {useState} from 'react';

const QuestionList = ({questions}) => {
    const [activeIndex, setActiveIndex] = useState(null);
    const renderedQuestions = questions.map((question, index) => {
        const active = index === activeIndex? 'active' : '';
        return <div key={question.title}>
            <div className={`title ${active}`} onClick = {()=>{setActiveIndex(index)}}>
            <i className="dropdown icon"> </i>
            {question.title}
            </div>

            <div className={`content ${active}`}>
                <p> {question.description} </p>
            </div>
        </div>
    });
    return <div className="ui styled accordion">
        {renderedQuestions}
    </div>
}

export default QuestionList;