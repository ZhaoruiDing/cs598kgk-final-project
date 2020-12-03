import React, { useState } from 'react'
import { Form, Grid, Header, Message, Segment } from 'semantic-ui-react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

const LoginForm = ({ handleLogin }) => {
  const [userId, setUserId] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [userIdTouched, setUserIdTouched] = useState(false)
  const [usernameTouched, setUsernameTouched] = useState(false)
  const [passwordTouched, setPasswordTouched] = useState(false)
  const [occupation, setOccupation] = useState('')
  const [location, setLocation] = useState('')
  const [expertField, setExpertField] = useState('')
  const [registerSuccess, setRegisterSuccess] = useState(false)
  const [registerFailed, setRegisterFailed] = useState(false)
  let history = useHistory()

  const handleUserIdChange = (e, { value }) => {
    setUserIdTouched(true)
    setUserId(value)
  }
  const handleUserNameChange = (e, { value }) => {
    setUsernameTouched(true)
    setUsername(value)
  }
  const handlePasswordChange = (e, { value }) => {
    setPasswordTouched(true)
    setPassword(value)
  }
  const handleOccupationChange = (e, { value }) => {
    console.log(value)
    setOccupation(value)
  }
  const handleExpertFieldChange = (e, { value }) => {
    console.log(value)
    setExpertField(value)
  }
  const handleLocationChange = (e, { value }) => {
    console.log(value)
    setLocation(value)
  }

  const onSubmit = () => {
    axios
      .post(`http://localhost:4000/users`, {
        id: userId,
        userName: username,
        location: location,
        verified: false,
        expertField: expertField,
        avatar: "",
        upvoteNumber: 0,
        password: password
      })
      .then(_ => {
        setRegisterSuccess(true)
        setRegisterFailed(false)
        setUserId('')
        setUsername('')
        setPassword('')
        setUserIdTouched(false)
        setUsernameTouched(false)
        setPasswordTouched(false)
        setOccupation('')
        setExpertField('')
        setLocation('')
      })
      .catch(e => {
        console.log(e, 'hahahahahaha')
        setRegisterFailed(true)
      })
    console.log(userId, password)
  }
  return (
    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' color='teal' textAlign='center'>
          Sign-up your account
        </Header>
        <Form
          size='large'
          onSubmit={onSubmit}
          success={registerSuccess}
          error={registerFailed}
        >
          <Segment stacked>
            <Form.Input
              fluid
              icon='id badge'
              iconPosition='left'
              placeholder='user ID(required)'
              value={userId}
              onChange={handleUserIdChange}
              error={
                userIdTouched && !userId
                  ? {
                    content: 'user ID is required',
                    pointing: 'above'
                  }
                  : false
              }
            />
            <Form.Input
              fluid
              icon='user'
              iconPosition='left'
              placeholder='username(required)'
              value={username}
              onChange={handleUserNameChange}
              error={
                usernameTouched && !username
                  ? {
                    content: 'username is required'
                  }
                  : false
              }
            />
            <Form.Input
              fluid
              icon='lock'
              iconPosition='left'
              placeholder='Password(required)'
              type='password'
              value={password}
              onChange={handlePasswordChange}
              error={
                passwordTouched && !password
                  ? {
                    content: 'password is required'
                  }
                  : false
              }
            />
            <Form.Input
              fluid
              icon='briefcase'
              iconPosition='left'
              placeholder='Occupation'
              value={occupation}
              onChange={handleOccupationChange}
            />
            <Form.Input
              fluid
              icon='lightbulb'
              iconPosition='left'
              placeholder='ExpertField'
              value={expertField}
              onChange={handleExpertFieldChange}
            />
            <Form.Input
              fluid
              icon='location arrow'
              iconPosition='left'
              placeholder='Location'
              value={location}
              onChange={handleLocationChange}
            />

            <Form.Button
              color='teal'
              fluid
              size='large'
              content='Sign Up'
              disabled={!userId || !username || !password}
            />

            {registerSuccess && (
              <Message
                success={registerSuccess}
                header='Form Completed'
                content="You're all set"
              />
            )}

            {registerFailed && (
              <Message
                error={registerFailed}
                header='Register Failed'
                content='Please try again! This user ID has already been taken!'
              />
            )}
          </Segment>
        </Form>
      </Grid.Column>
    </Grid>
  )
}

export default LoginForm
