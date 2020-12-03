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

    create_clicked(answer_length){
        let clicked_list = [];
        for (let i = 0; i < answer_length ; i++){
            clicked_list.push([false, false, false]);
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
                clicked: this.create_clicked(responses[1].data.length)
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

    handleClick (answer_id, action_type) { // action_type: 1: upVote, 2: downVote, 3: misinformation
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
        let answer = answers[answer_id];
        if(action_type === 1){
            answer.upVote += 1
        }else if(action_type === 2){
            answer.downVote += 1
        }else {
            answer.misinformation += 1
        }
        answers[answer_id] = answer
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
                let pop_expert_message = !warning && userInfo.verified;
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
                                {answers[i].content}
                            </p>
                            <div className="ui horizontal">
                                <a className={clicked[i][0]? "ui blue label": "ui label" } onClick={this.handleClick.bind(this, i, 1)}>
                                    <i className="thumbs up outline icon"> </i>
                                    {answers[i].upVote}
                                </a>
                                <a className={clicked[i][1]? "ui yellow label": "ui label" } onClick={this.handleClick.bind(this, i, 2)}>
                                    <i className="thumbs down outline icon"> </i>
                                    {answers[i].downVote}
                                </a>
                                <a className={clicked[i][2]? "ui red label": "ui label" } onClick={this.handleClick.bind(this, i, 3)}>
                                    <i className="exclamation triangle icon"> </i>
                                    {answers[i].misinformation}
                                </a>
                            </div>
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
                    {answers_div}
                </div>
            );
        }
    }
}

export default Question;