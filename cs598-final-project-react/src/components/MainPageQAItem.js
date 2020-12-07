/* eslint-disable max-len */
import { React, useCallback } from 'react'
import {Container, Header, Item} from 'semantic-ui-react'
import BioOverview from './BioOverview'
import { useHistory } from "react-router-dom";

const MainPageQAItem = ({questionTitle, questionId, userId, answerContent}) => {
    let history = useHistory();
    const pathname = `/question/${questionId}`;
    console.log(typeof(userId), questionId, pathname);
    const onClickQuestionTitle = ()=>{ history.push(pathname)};
    let splitAnswerContent = answerContent.split(" ");
    if(splitAnswerContent.length > 50){
        answerContent = splitAnswerContent.slice(0, 50).join(" ") + "...";
    }

    return (
    <Container>
    <Item.Header as='h2' onClick={onClickQuestionTitle} >
        {questionTitle}
    </Item.Header>
    {answerContent&&userId && <BioOverview userId={userId}/>}
    <p>
        {answerContent.split("\n").map((i,key) => {
            return <p key={key}>{i}</p>;
        })}
    </p>
    </Container>);
};

export default MainPageQAItem