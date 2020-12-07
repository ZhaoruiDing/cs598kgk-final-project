import React, { useState } from 'react'
import { Form, Grid, Header, Message, Segment } from 'semantic-ui-react'
import axios from 'axios'
import {useHistory} from 'react-router-dom'

const LoginForm = ({handleLogin}) => {
  // const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [userEmail,setUserEmail] = useState("");
  let history = useHistory();

  const handleUserEmailChange = (e, {value}) => {
    console.log(value);
    setUserEmail(value)
  }
  const handlePasswordChange =(e, {value}) => {
    console.log(value);
    setPassword(value);
  }

  const checkPasswordMatch = async (userEmail, password) => {
    try {
      const {data} = await axios.get(`http://localhost:4000/users?email=${userEmail}`);
      console.log("check data", data);
      const user = data.length > 0? data[0] : null;
      if (password !== user.password) {
        console.log("password", typeof(password), typeof(user.password));
        return "";
      }
      else {
        console.log("I am here to set userId");
        return user.id;
      }
    } catch (e) {
      alert("Error! Register First Or Check Your Network");
      return "";
    }
  }
  const onSubmit = () => {
    checkPasswordMatch(userEmail, password).then((userId)=>{
      if (userId) {
        console.log("password is correct and userId is", userId);
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
          <Form.Input fluid icon='mail' iconPosition='left' placeholder='Your Email' onChange={handleUserEmailChange}/>
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