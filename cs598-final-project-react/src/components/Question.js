import React from 'react';
import userImg from "../images/user.png";

const Question = ({question}) => {
    const renderedQuestion = question.map(question => {
        let elements = [];
        let answerSort = question.answers;
        answerSort.sort(function (a, b) {
            // here we can set some useful sorting algorithms
            return b.upVote - a.upVote;
        });
        for(let i = 0; i < question.answers.length; i++){
            elements.push(
                <div className="ui segment container">
                    <div className="ui horizontal list">
                        <div className="item">
                            <img className="ui tiny circular image" src={userImg} alt=""/>
                            <div className="content">
                                <div className="ui header" style={{marginBottom: 10}}>
                                    {question.answers[i].user}
                                </div>
                                <div>
                                    {question.answers[i].userDescription}
                                </div>
                            </div>
                        </div>
                    </div>
                    <p style={{fontSize: 18, marginTop: 10}}>
                        {question.answers[i].content}
                    </p>
                    <div className="ui horizontal">
                        <a className="ui label">
                            <i className="thumbs up outline icon"> </i>
                            {question.answers[i].upVote}
                        </a>
                        <a className="ui label">
                            <i className="thumbs down outline icon"> </i>
                            {question.answers[i].downVote}
                        </a>
                        <a className="ui label">
                            <i className="exclamation triangle icon"> </i>
                            {question.answers[i].misinformation}
                        </a>
                    </div>
                </div>
            );
        }
            return (
                <div>
                    <div className="ui inverted vertical masthead center aligned segment container">
                        <div className="ui text container">
                            <h1 className="ui inverted header" style={{fontSize: 50}}>
                                {question.title}
                            </h1>
                            <p>
                                {question.description}
                            </p>
                        </div>
                    </div>
                    <div>
                        {elements}
                    </div>
                </div>
            )
        }
    );
    return <div>
        {renderedQuestion}
    </div>
}

export default Question;