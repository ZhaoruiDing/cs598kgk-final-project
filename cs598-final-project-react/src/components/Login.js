import React, { useState } from 'react'
import { Form, Grid, Header, Message, Segment } from 'semantic-ui-react'
import axios from 'axios'
import {useHistory} from 'react-router-dom'

const LoginForm = ({handleLogin}) => {
  const [userId, setuserId] = useState(null);
  const [password, setPassword] = useState(null);
  let history = useHistory();

  const handleuserIdChange = (e, {value}) => {
    console.log(value);
    setuserId(value)
  }
  const handlePasswordChange =(e, {value}) => {
    console.log(value);
    setPassword(value);
  }

  const checkPasswordMatch = async (userId, password) => {
    try {
      const {data} = await axios.get(`http://localhost:4000/users/${userId}`);
      console.log("check data", data);
      if (password !== data.password) {
        console.log("password", typeof(password), typeof(data.password));
        return false;
      }
    } catch (e) {
      alert("Error! Register First Or Check Your Network");
      return false;
    }
    return true;
  }
  const onSubmit = () => {
    console.log(userId, password);
    checkPasswordMatch(userId, password).then((passwordCorrect)=>{
      console.log("result", passwordCorrect)
      if (passwordCorrect) {
        handleLogin(userId);
        history.push('/');
      }
      else {
        alert('Your password does not match our record');
      }
    })
  }
  return (
  <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
    <Grid.Column style={{ maxWidth: 450 }}>
      <Header as='h2' color='teal' textAlign='center'>
         Log-in to your account
      </Header>
      <Form size='large' onSubmit={onSubmit}>
        <Segment stacked>
          <Form.Input fluid icon='user' iconPosition='left' placeholder='Your user ID' onChange={handleuserIdChange}/>
          <Form.Input
            fluid
            icon='lock'
            iconPosition='left'
            placeholder='Password'
            type='password'
            onChange={handlePasswordChange}
          />

          <Form.Button color='teal' fluid size='large' content='Login'/>
        </Segment>
      </Form>
      <Message>
        New to us? <a href='/signup'>Sign Up</a>
      </Message>
    </Grid.Column>
  </Grid>
)}

export default LoginForm