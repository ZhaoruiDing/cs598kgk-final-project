import React, { useEffect, useState } from 'react'
import { Grid } from 'semantic-ui-react'

import MainPageQAItem from './MainPageQAItem'
import axios from 'axios'

const MainPage = () => {
  // const [questions, setQuestions] = useState([]);
  const [questionsWithFirstAnswer, setQuestionsWithFirstAnswer] = useState([]);
  const [renderedList, setRenderedList] = useState([]);

  useEffect(() => {
    //fetch the questions on page rendered
    const fetchQuestions = async () => {
      const {data} = await axios.get('http://localhost:4000/questions');
      return data;
    };

    //fetch the first answer under each question
    const fetchFirstAnswer = async (questionId) => {
      const {data} = await axios.get(`http://localhost:4000/questions/${questionId}/answers?_limit=1`);
      return data.length > 0 ? data[0] : null;
    };

    const fetchQuestionsWithFirstAnswer = async () => {
      let questionWithFirstAnswerList = [];
      const questions = await fetchQuestions();

      for (let i = 0; i < questions.length; i++) {
        //get first answer
        const questionId = questions[i].id;
        const firstAnswer = await fetchFirstAnswer(questionId);
  
        const userId = firstAnswer ? firstAnswer.userId : null;
  
        const questionWithFirstAnswer = {
          question: questions[i],
          firstAnswer: firstAnswer,
          userId
        }
        
        questionWithFirstAnswerList.push(questionWithFirstAnswer);
      }
      setQuestionsWithFirstAnswer(questionWithFirstAnswerList);
    }

   fetchQuestionsWithFirstAnswer();
  }, []);

  useEffect(()=> {
    console.log(questionsWithFirstAnswer);
    const listItems = questionsWithFirstAnswer.map((questionWithFirstAnswer) => {
      if (!questionWithFirstAnswer.firstAnswer) {
        console.log("it's null")
        return null;
      }
      const {id, title} = questionWithFirstAnswer.question;
      const content = questionWithFirstAnswer.firstAnswer ? questionWithFirstAnswer.firstAnswer.content : null;
      const userId = questionWithFirstAnswer.userId;
      return (
      <Grid.Row key={id}>
        <Grid.Column width={3}>
        </Grid.Column>
        <Grid.Column width={10}>
          <MainPageQAItem questionTitle={title} questionId={id} userId={userId} answerContent={content}/>
        </Grid.Column>
        <Grid.Column width={3}>
        </Grid.Column>
      </Grid.Row>
      );
    });

    setRenderedList(listItems);
  }, [questionsWithFirstAnswer]);
  
  useEffect(()=>{
    console.log(renderedList);
  }, [renderedList]);

  return (
  <Grid divided='vertically'>
   {renderedList}
  </Grid>
  );}

export default MainPage