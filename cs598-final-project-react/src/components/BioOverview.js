import React, { useEffect, useState } from 'react'
import { Icon, Item, Image} from 'semantic-ui-react'
import axios from 'axios'

const BioOverview = ({userId} ) => {
  const [userInfo, setUserInfo] = useState(null);
  useEffect(()=>{
    const fetchUserInfo = async (userId) => {
      const {data} = await axios.get(`http://localhost:4000/users/${userId}`);
      console.log("check data", data)
      setUserInfo(data);
    }

    fetchUserInfo(userId);
  }, []);

  useState(()=>{
    console.log("checkstate",userInfo);
  }, [userInfo]);

  return (
  <Item.Group>
    <Item>
      <Image className="ui tiny circular image" size='tiny' src='https://i.pravatar.cc/300?img=12' />
      <Item.Content>
        <Item.Header as='a'>Zhang Zhe</Item.Header>
        <Item.Meta>Description</Item.Meta>
        <Item.Description>
          The elder, Honor Professor, Former Chairman
        </Item.Description>
        <Item.Extra>
        <Icon color='green' name='check' /> 121 Votes
        </Item.Extra>
      </Item.Content>
    </Item>
  </Item.Group>
)}

export default BioOverview
