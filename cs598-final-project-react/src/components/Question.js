import React, {Component} from 'react';
import userImg from "../images/user.png";
import axios from "axios";
import {Icon, Image, Item} from "semantic-ui-react";
import BioOverview from "./BioOverview";

class Question extends Component {
    constructor() {
        super();
        this.state = {
            error: null,
            isLoaded: false,
            question: [],
            answers: [],
            users: [],
            clicked: []
        };
    }

    create_clicked(answers){
        let clicked_list = {};
        let curr_user_id = localStorage.getItem("userId");
        if(curr_user_id === null){
            for (let i = 0; i < answers.length ; i++){
                clicked_list[answers[i].id] = [false, false, false];
            }
        }else{
            for (let i = 0; i < answers.length ; i++){
                clicked_list[answers[i].id] = [false, false, false];
                if(curr_user_id in answers[i].voteUsers) {
                    let clicked_button = answers[i].voteUsers[curr_user_id];
                    clicked_list[answers[i].id][clicked_button - 1] = true;
                }
            }
        }

        return clicked_list;
    }

    componentDidMount() {
        let url = "http://localhost:4000/questions/" + this.props.match.params.id;
        axios.all([
            axios.get(url),
            axios.get(url + "/answers"),
            axios.get("http://localhost:4000/users/")
        ]).then(axios.spread((...responses) => {
            this.setState({
                isLoaded: true,
                question: responses[0].data,
                answers: responses[1].data.sort(function (a, b) {
                    // here we can set some useful sorting algorithms
                    return b.upVote - a.upVote;
                }),
                users: responses[2].data,
                clicked: this.create_clicked(responses[1].data)
            });
        })).catch(error => {
            this.setState({
                isLoaded: false,
                error
            });
        });
    }

    checkClick(click){
        return click;
    }

    handleClick (answer_id, answer_position, action_type) { // action_type: 1: upVote, 2: downVote, 3: misinformation
        if(localStorage.getItem("userId") === null){
            return;
        }
        let clicked = this.state.clicked;
        if (clicked[answer_id].some(this.checkClick)){
            return;
        }else{
            clicked[answer_id][action_type - 1] = true;
        }
        let answers = this.state.answers;
        let answer = answers[answer_position];
        if(action_type === 1){
            answer.upVote += 1
        }else if(action_type === 2){
            answer.downVote += 1
        }else {
            answer.misinformation += 1
        }
        answer.voteUsers[localStorage.getItem("userId")] = action_type;
        answers[answer_position] = answer;
        this.setState({
            answers: answers,
            clicked: clicked
        });
        axios.put(`http://localhost:4000/answers/${answer.id}`, answer);
    }

    render() {
        const { error, isLoaded, question, answers, users, clicked } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {

            let users_dict = {}
            for(let i = 0 ; i < users.length; i++){
                users_dict[users[i].id] = users[i];
            }
            let answers_div = [];
            for(let i = 0; i < answers.length; i++){
                console.log(clicked);
                let userId = answers[i].userId;
                let userInfo = users_dict[userId];
                let image = userImg;
                if(userInfo.avatar !== ""){
                    image = userInfo.avatar;
                }
                let warning = false;
                if(answers[i].misinformation > 20 || (answers[i].downVote > 50 && answers[i].downVote / answers[i].upVote > 0.3)){
                    warning = true;
                }
                let warning_message = (
                    <div className="ui ignored error message">
                        <i class="icon warning"></i>
                        Warning: This answer might contain misinformation!
                    </div>
                );
                let expert_message = (
                    <div className="ui ignored info message">
                        <i className="icon check"></i>
                        Trustworthy answer by verified {userInfo.expertField} Expert
                    </div>)
                let pop_expert_message = !warning && userInfo.verified && question.category.includes(userInfo.expertField);
                answers_div.push(
                    <div>
                        <div className="ui segment container">
                            <div className="ui horizontal list">
                                <div className="item">
                                    {<BioOverview userId={userId}/>}
                                </div>
                            </div>
                            {pop_expert_message && expert_message}
                            {warning && warning_message}

                            <p style={{fontSize: 18, marginTop: 10}}>
                                {answers[i].content.split("\n").map((i,key) => {
                                    return <p key={key}>{i}</p>;
                                })}
                            </p>
                            <div className="ui horizontal">
                                <a className={clicked[answers[i].id][0]? "ui blue label": "ui label" } onClick={this.handleClick.bind(this, answers[i].id, i, 1)}>
                                    <i className="thumbs up outline icon"> </i>
                                    {answers[i].upVote}
                                </a>
                                <a className={clicked[answers[i].id][1]? "ui yellow label": "ui label" } onClick={this.handleClick.bind(this, answers[i].id, i, 2)}>
                                    <i className="thumbs down outline icon"> </i>
                                    {answers[i].downVote}
                                </a>
                                <a className={clicked[answers[i].id][2]? "ui red label": "ui label" } onClick={this.handleClick.bind(this, answers[i].id, i, 3)}>
                                    <i className="exclamation triangle icon"> </i>
                                    {answers[i].misinformation}
                                </a>
                            </div>
                        </div>
                    </div>
                );
            }
            let answer_labels = (
                <div className="ui medium labels">
                    {question.category.map((i) => {
                        return <div className="ui label">
                            {i}
                        </div>;
                    })}
                </div>)
            return (
                <div>
                    <div className="ui inverted vertical masthead center aligned segment container">
                        <div className="ui text container">
                            <div>
                                {question.category.length > 0 && answer_labels}
                            </div>
                            <h1 className="ui inverted header" style={{fontSize: 50}}>
                                {question.title}
                            </h1>
                            <p>
                                {question.description}
                            </p>
                        </div>
                    </div>
                    {answers_div}
                </div>
            );
        }
    }
}

export default Question;