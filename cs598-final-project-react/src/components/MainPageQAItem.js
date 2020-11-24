/* eslint-disable max-len */

import { React, useState } from 'react'
import { Container, Header, Icon, Item } from 'semantic-ui-react'
import BioOverview from './BioOverview'
const MainPageQAItem = () => {
    const [upvote, setUpvote] = useState(666);
    const [downvote, setDownvote] = useState(1);

    return (
    <Container>
    <BioOverview/>
    <Header as='h4'>Why Zhang Zhe is adored by so many people?</Header>
    <p>
        Because he can talk lively with Wallace. Wallace is higher than any of you. Over two hundred professors all said Yes!
    </p>
    <Item.Extra>
        <Icon color='green' name='triangle up' onClick={()=>{setUpvote(upvote+1)}}/>{upvote}
        <Icon color='red' name='triangle down' onClick={()=>{setDownvote(downvote+1)}}/>{downvote}
    </Item.Extra>
    </Container>);
};

export default MainPageQAItem