import React from 'react';
import "./style.css";
import "../font/css/all.css";
import profileImg from '../images/profile.jpg';

const User = ({users}) => {
  const renderedUsers = users.map(user => {
      // const badgeActive = user.verified && user.expert? 'active' : '';

      return (<div class="container">
          <div class="profile-header">
              <div class="profile-img">
                  <img src={profileImg} width="200" alt=""/>
              </div>
              <div class="profile-nav-info">
                  <h3 class="user-name">{user.firstName} {user.lastName}</h3>
                  <div class="location">
                      <p class="state">{user.city},</p>
                      <span class="country">{user.country}</span>
                  </div>
              </div>
              <div class="profile-option">
                  <div class="badge">
                      <i class="fa fa-certificate" aria-hidden="true"></i>
                  </div>
              </div>
          </div>
          <div class="main-bd">
              <div class="left-side">
                  <div class="profile-side">
                      <p class="location"><i class="fa fa-location-arrow"></i>{user.city}, {user.country}</p>
                      <p class="occupation"><i class="fa fa-id-card"></i>{user.occupation}</p>
                      <p class="company"><i class="fa fa-user-circle" aria-hidden="true"></i>{user.company}</p>
                      <p class="verified"><i class="fa fa-check" aria-hidden="true"></i>Verified User</p>
                      <p class="expert"><i class="fa fa-star" aria-hidden="true"></i>{user.expertField}</p>
                      <p class="upvote"><i class="fa fa-heart" aria-hidden="true"></i>{user.upvotes} Upvotes</p>
                      <div class="user-bio">
                         <h3>Bio</h3>
                          <p class="bio">{user.bio}</p>
                      </div>
                  </div>
              </div>
              <div class="user-right">
                  <div class="nav">
                      <ul>
                          <li onclick="tabs(0)" class="user-ques active">Questions</li>
                      </ul>
                  </div>
                  <div class="user-body">
                      <div class="user-questions tab">
                          <h1>Your Questions</h1>
                          <p>123.</p>
                      </div>
                  </div>
              </div>
          </div>
      </div>)
  });

  return (<div className="xxx">
      {renderedUsers}
  </div>)
}

export default User;
