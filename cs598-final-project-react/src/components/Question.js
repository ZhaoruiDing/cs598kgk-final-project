import React, {Component} from 'react';
import userImg from "../images/user.png";
import axios from "axios";

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
        axios.all([
            axios.get("http://localhost:4000/questions/323"),
            axios.get("http://localhost:4000/questions/323/answers"),
            axios.get("http://localhost:4000/users/")
        ]).then(axios.spread((...responses) => {
            this.setState({
                isLoaded: true,
                question: responses[0].data,
                answers: responses[1].data,
                users: responses[2].data
            });
        })).catch(error => {
            this.setState({
                isLoaded: false,
                error
            });
        });
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