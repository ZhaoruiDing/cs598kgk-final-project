import React, {Component} from 'react';
import "./style.css";
import "../font/css/all.css";
import {Container, Icon, Item} from "semantic-ui-react";
import axios from "axios";
import userImg from "../images/user.png";
import {
    Link
} from "react-router-dom";

class User extends Component {
    constructor() {
        super();
        this.state = {
            error: null,
            isLoaded: false,
            user: null,
            questions: null
        };
    }

    componentDidMount() {
        // var url;
        console.log(this.props.match.params.id);
        const id = this.props.match.params.id ? this.props.match.params.id : localStorage.getItem('userId');
        const url = `http://localhost:4000/users/${id}`;
        axios.all([
            axios.get(url),
            axios.get(url + "/questions"),
        ]).then(axios.spread((...responses) => {
            this.setState({
                isLoaded: true,
                user: responses[0].data,
                questions: responses[1].data
            });
        })).catch(error => {
            this.setState({
                isLoaded: false,
                error
            });
        });
    }

    render() {
        const { error, isLoaded, user, questions } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            console.log(user);
            console.log(questions);
            let myquestions = [];
            for( let i = 0 ; i < questions.length; i++){
                myquestions.push(
                    <div className="ui container segment" >
                        <Link className="ui header h1" style={{fontSize: 50}} to={`/question/${questions[i].id}`}>
                            {questions[i].title}
                        </Link>
                        <div>
                            {questions[i].description}
                        </div>
                    </div>
                );
            }
            let expert_message = (
                <div className="ui ignored info message">
                    <i className="icon check"></i>
                    Trustworthy answer by verified {user.expertField} Expert
                </div>)
            return (
                <Container>
                  <Item.Group>
                      <Item>
                          <div className="container">
                              <div className="profile-header">
                                  <div className="profile-img">
                                      <img src={user.avatar ? user.avatar : userImg} width="200" alt=""/>
                                  </div>
                                  <div className="profile-nav-info">
                                      <h3 className="user-name">{user.userName}</h3>
                                      <div className="location">
                                          <p className="state">{user.location}</p>
                                      </div>
                                      {user.verified && expert_message}
                                  </div>
                                  {user.verified &&
                                  <div className="profile-option">
                                      <div className="badge">
                                          <i className="fa fa-certificate" aria-hidden="true"></i>
                                      </div>
                                  </div>}
                              </div>
                              <div className="main-bd">
                                  <div className="left-side">
                                      <div className="profile-side">
                                          <p className="location"><i className="fa fa-location-arrow"></i>{user.location}</p>
                                          <p className="email"><i className="fa fa-envelope"></i>{user.email}</p>
                                          <p className="occupation"><i className="fa fa-id-card"></i>{user.occupation}</p>
                                          { user.verified && <p className="verified"><i className="fa fa-check" aria-hidden="true"></i>Verified User</p>}
                                          <p className="expert"><i className="fa fa-star" aria-hidden="true"></i>{user.expertField}</p>
                                          <p className="upvote"><i className="fa fa-heart" aria-hidden="true"></i>{user.upvoteNumber} Upvotes</p>
                                      </div>
                                  </div>
                                  <div className="user-right">
                                      <div className="nav">
                                          <ul>
                                              <li onClick="tabs(0)" className="user-ques active">Questions</li>
                                          </ul>
                                      </div>
                                      <div className="user-body">
                                          <div className="user-questions tab segment">
                                              {myquestions}
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </Item>
                  </Item.Group>
                </Container>
            );
        }
    }
}

export default User;
