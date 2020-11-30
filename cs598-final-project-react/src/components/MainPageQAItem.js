/* eslint-disable max-len */
import { React, useCallback } from 'react'
import { Container, Header } from 'semantic-ui-react'
import BioOverview from './BioOverview'
import { useHistory } from "react-router-dom";

const MainPageQAItem = ({questionTitle, questionId, userId, answerContent}) => {
    let history = useHistory();
    const pathname = `/question/${questionId}`;
    console.log(typeof(userId), questionId, pathname);
    const onClickQuestionTitle = (questionId)=>{ history.push({pathname, state: {questionId}})};

    return (
    <Container>
    <Header as='h2' onClick={onClickQuestionTitle}>{questionTitle}</Header>
    {answerContent&&userId && <BioOverview userId={userId}/>}
    <p>
        {answerContent}
    </p>
    </Container>);
};

export default MainPageQAItem