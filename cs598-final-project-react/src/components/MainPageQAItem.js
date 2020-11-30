/* eslint-disable max-len */

import { React } from 'react'
import { Container, Header } from 'semantic-ui-react'
import BioOverview from './BioOverview'
const MainPageQAItem = ({questionTitle, questionId, userId, answerContent}) => {

    return (
    <Container>
    <Header as='h2'>{questionTitle}</Header>
    {answerContent && <BioOverview userId={userId}/>}
    <p>
        {answerContent}
    </p>
    </Container>);
};

export default MainPageQAItem