import React, { useEffect, useState } from 'react'
import { Icon, Item, Image} from 'semantic-ui-react'
import axios from 'axios';
import userImg from "../images/user.png";
import { useHistory } from 'react-router-dom';
import {
  Link
} from "react-router-dom";

const BioOverview = ({userId}) => {
  const [userInfo, setUserInfo] = useState(null);
  const history = useHistory();
  useEffect(()=>{
    const fetchUserInfo = async (userId) => {
      const {data} = await axios.get(`http://localhost:4000/users/${userId}`);
      console.log("check data", data)
      setUserInfo(data);
    }

    fetchUserInfo(userId);
  }, []);

  useEffect(()=>{
    console.log("checkstate",userInfo);
  }, [userInfo, userId]);

  let icon = [
      <Item.Extra>
        <Icon color='green' name='check' />
      </Item.Extra>
  ]

  return (
  <Item.Group>
    <Item>
      <Image className="ui tiny circular image" size='tiny' src={userInfo && userInfo.avatar?userInfo.avatar : userImg} />
      <Item.Content>
        <Link className="header" as='a' to={userInfo && `/profile/${userInfo.id}`}>
          {userInfo?userInfo.userName : null}
        </Link>
        <Item.Description>
          {userInfo && `${userInfo.occupation} ${userInfo.expertField? "," : ""} ${userInfo.expertField}`}
        </Item.Description>
        {userInfo && userInfo.verified ? icon : null}
      </Item.Content>
    </Item>
  </Item.Group>
)}




export default BioOverview
