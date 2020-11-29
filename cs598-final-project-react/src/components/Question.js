import React, {Component} from 'react';
import userImg from "../images/user.png";
import axios from "axios";

// const Question = ({question}) => {
//     const renderedQuestion = question.map(question => {
//         let elements = [];
//         let answerSort = question.answers;
//         answerSort.sort(function (a, b) {
//             // here we can set some useful sorting algorithms
//             return b.upVote - a.upVote;
//         });
//         for(let i = 0; i < question.answers.length; i++){
//             let image = userImg;
//             if(question.answers[i].icon !== ""){
//                 image = question.answers[i].icon;
//             }
//             elements.push(
//                 <div className="ui segment container">
//                     <div className="ui horizontal list">
//                         <div className="item">
//                             <img className="ui tiny circular image" src={image} alt=""/>
//                             <div className="content">
//                                 <div className="ui header" style={{marginBottom: 10}}>
//                                     {question.answers[i].user}
//                                 </div>
//                                 <div>
//                                     {question.answers[i].userDescription}
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                     <p style={{fontSize: 18, marginTop: 10}}>
//                         {question.answers[i].content}
//                     </p>
//                     <div className="ui horizontal">
//                         <a className="ui label">
//                             <i className="thumbs up outline icon"> </i>
//                             {question.answers[i].upVote}
//                         </a>
//                         <a className="ui label">
//                             <i className="thumbs down outline icon"> </i>
//                             {question.answers[i].downVote}
//                         </a>
//                         <a className="ui label">
//                             <i className="exclamation triangle icon"> </i>
//                             {question.answers[i].misinformation}
//                         </a>
//                     </div>
//                 </div>
//             );
//         }
//             return (
//                 <div>
//                     <div className="ui inverted vertical masthead center aligned segment container">
//                         <div className="ui text container">
//                             <h1 className="ui inverted header" style={{fontSize: 50}}>
//                                 {question.title}
//                             </h1>
//                             <p>
//                                 {question.description}
//                             </p>
//                         </div>
//                     </div>
//                     <div>
//                         {elements}
//                     </div>
//                 </div>
//             )
//         }
//     );
//     return <div>
//         {renderedQuestion}
//     </div>
// }

class Question extends Component {
    constructor() {
        super();
        this.state = {
            error: null,
            isLoaded: false,
            question: [],
            answers: [],
            users: []
        };
    }

    componentDidMount() {
        Promise.all([
            fetch("http://localhost:2000/questions/323"),
            fetch("http://localhost:2000/questions/323/answers"),
            fetch("http://localhost:2000/users/")
        ]).then(([res1, res2, res3]) => {
            return Promise.all([res1.json(), res2.json(), res3.json()])
        })
            .then(([res1, res2, res3]) => {
                this.setState({
                        isLoaded: true,
                        question: res1,
                        answers: res2,
                        users: res3
                });
            },
            (error) => {
                this.setState({
                    isLoaded: false,
                    error
                });
            })
    }

    render() {
        const { error, isLoaded, question, answers, users } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            console.log(question);
            console.log(answers);
            console.log(users);
            let users_dict = {}
            for(let i = 0 ; i < users.length; i++){
                users_dict[users[i].id] = users[i];
            }
            console.log(users_dict);
            answers.sort(function (a, b) {
                // here we can set some useful sorting algorithms
                return b.upVote - a.upVote;
            });
            let answers_div = [];
            for(let i = 0; i < answers.length; i++){
                let userId = answers[i].userId;
                let userInfo = users_dict[userId];
                console.log(userInfo);
                let image = userImg;
                if(userInfo.avatar !== ""){
                    image = userInfo.avatar;
                }
                answers_div.push(
                    <div className="ui segment container">
                        <div className="ui horizontal list">
                            <div className="item">
                                <img className="ui tiny circular image" src={image} alt=""/>
                                <div className="content">
                                    <div className="ui header" style={{marginBottom: 10}}>
                                        {userInfo.userName}
                                    </div>
                                    <div>
                                        {userInfo.occupation}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p style={{fontSize: 18, marginTop: 10}}>
                            {answers[i].content}
                        </p>
                        <div className="ui horizontal">
                            <a className="ui label">
                                <i className="thumbs up outline icon"> </i>
                                {answers[i].upVote}
                            </a>
                            <a className="ui label">
                                <i className="thumbs down outline icon"> </i>
                                {answers[i].downVote}
                            </a>
                            <a className="ui label">
                                <i className="exclamation triangle icon"> </i>
                                {answers[i].misinformation}
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
                        {answers_div}
                    </div>
                </div>
            );
        }
    }
}

export default Question;