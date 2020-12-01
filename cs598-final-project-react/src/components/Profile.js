import React, {Component} from 'react';
import "./style.css";
import "../font/css/all.css";
import profileImg from '../images/profile.jpg';
import {Container, Icon, Item} from "semantic-ui-react";
import axios from "axios";
import userImg from "../images/user.png";
import BioOverview from "./BioOverview";

// const User = ({users}) => {
//   const renderedUsers = users.map(user => {
//       return (
//           <Container>
//               <Item.Group>
//                   <Item>
//                       <div className="container">
//                           <div className="profile-header">
//                               <div className="profile-img">
//                                   <img src={profileImg} width="200" alt=""/>
//                               </div>
//                               <div className="profile-nav-info">
//                                   <h3 className="user-name">{user.firstName} {user.lastName}</h3>
//                                   <div className="location">
//                                       <p className="state">{user.city},</p>
//                                       <span className="country">{user.country}</span>
//                                   </div>
//                               </div>
//                               <div className="profile-option">
//                                   <div className="badge">
//                                       <i className="fa fa-certificate" aria-hidden="true"></i>
//                                   </div>
//                               </div>
//                           </div>
//                           <div className="main-bd">
//                               <div className="left-side">
//                                   <div className="profile-side">
//                                       <p className="location"><i className="fa fa-location-arrow"></i>{user.city}, {user.country}</p>
//                                       <p className="occupation"><i className="fa fa-id-card"></i>{user.occupation}</p>
//                                       <p className="company"><i className="fa fa-user-circle" aria-hidden="true"></i>{user.company}</p>
//                                       <p className="verified"><i className="fa fa-check" aria-hidden="true"></i>Verified User</p>
//                                       <p className="expert"><i className="fa fa-star" aria-hidden="true"></i>{user.expertField}</p>
//                                       <p className="upvote"><i className="fa fa-heart" aria-hidden="true"></i>{user.upvotes} Upvotes</p>
//                                       <div className="user-bio">
//                                           <h3>Bio</h3>
//                                           <p className="bio">{user.bio}</p>
//                                       </div>
//                                   </div>
//                               </div>
//                               <div className="user-right">
//                                   <div className="nav">
//                                       <ul>
//                                           <li onClick="tabs(0)" className="user-ques active">Questions</li>
//                                       </ul>
//                                   </div>
//                                   <div className="user-body">
//                                       <div className="user-questions tab">
//                                           <h1>Your Questions</h1>
//                                           <p>123.</p>
//                                       </div>
//                                   </div>
//                               </div>
//                           </div>
//                       </div>
//                   </Item>
//               </Item.Group>
//           </Container>
//       )
//   });
//
//   return (<div>
//       {renderedUsers}
//   </div>)
// }

class User extends Component {
    constructor() {
        super();
        this.state = {
            error: null,
            isLoaded: false,
            user: []
        };
    }

    componentDidMount() {
        let url = "http://localhost:4000/users/" + this.props.match.params.id;
        axios.all([
            axios.get(url),
        ]).then(axios.spread((...responses) => {
            this.setState({
                isLoaded: true,
                user: responses[0].data
            });
        })).catch(error => {
            this.setState({
                isLoaded: false,
                error
            });
        });
    }

    render() {
        const { error, isLoaded, user } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            console.log(user);
            return (
                <Container>
                  <Item.Group>
                      <Item>
                          <div className="container">
                              <div className="profile-header">
                                  <div className="profile-img">
                                      <img src={profileImg} width="200" alt=""/>
                                  </div>
                                  <div className="profile-nav-info">
                                      <h3 className="user-name">{user.firstName} {user.lastName}</h3>
                                      <div className="location">
                                          <p className="state">{user.city},</p>
                                          <span className="country">{user.country}</span>
                                      </div>
                                  </div>
                                  <div className="profile-option">
                                      <div className="badge">
                                          <i className="fa fa-certificate" aria-hidden="true"></i>
                                      </div>
                                  </div>
                              </div>
                              <div className="main-bd">
                                  <div className="left-side">
                                      <div className="profile-side">
                                          <p className="location"><i className="fa fa-location-arrow"></i>{user.city}, {user.country}</p>
                                          <p className="occupation"><i className="fa fa-id-card"></i>{user.occupation}</p>
                                          <p className="company"><i className="fa fa-user-circle" aria-hidden="true"></i>{user.company}</p>
                                          <p className="verified"><i className="fa fa-check" aria-hidden="true"></i>Verified User</p>
                                          <p className="expert"><i className="fa fa-star" aria-hidden="true"></i>{user.expertField}</p>
                                          <p className="upvote"><i className="fa fa-heart" aria-hidden="true"></i>{user.upvotes} Upvotes</p>
                                          <div className="user-bio">
                                              <h3>Bio</h3>
                                              <p className="bio">{user.bio}</p>
                                          </div>
                                      </div>
                                  </div>
                                  <div className="user-right">
                                      <div className="nav">
                                          <ul>
                                              <li onClick="tabs(0)" className="user-ques active">Questions</li>
                                          </ul>
                                      </div>
                                      <div className="user-body">
                                          <div className="user-questions tab">
                                              <h1>Your Questions</h1>
                                              <p>123.</p>
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
