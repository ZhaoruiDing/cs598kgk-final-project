import React, { useEffect, useState } from 'react'
import { Icon, Item, Image} from 'semantic-ui-react'
import axios from 'axios'

const BioOverview = ({userId}) => {
  const [userInfo, setUserInfo] = useState(null);
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

  return (
  <Item.Group>
    <Item>
      <Image className="ui tiny circular image" size='tiny' src='https://i.pravatar.cc/300?img=12' />
      <Item.Content>
        <Item.Header as='a'>{userInfo?userInfo.userName : null}</Item.Header>
        <Item.Meta>Description</Item.Meta>
        <Item.Description>
          {userInfo && `${userInfo.occupation} ${userInfo.expertField}`}
        </Item.Description>
        <Item.Extra>
        <Icon color='green' name='check' />
        </Item.Extra>
      </Item.Content>
    </Item>
  </Item.Group>
)}

export default BioOverview
