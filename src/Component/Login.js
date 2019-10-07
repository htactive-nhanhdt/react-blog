import React from 'react'

import axios from 'axios'
import { Form, Input, Button, Alert, Icon, Tooltip } from 'antd'

import { Redirect } from 'react-router-dom'
class Login extends React.Component {
  constructor () {
    super()
    this.state = {
      userId: 0,
      errors: [],
      users: []
    }
  }

  componentDidMount () {
    axios.get('http://localhost:3004/user').then(res => {
      const users = res.data
      this.setState({
        users: users
      })
    })
  }

  handleInputEvent (event) {
    event.preventDefault()
    const { users } = this.state
    const email = event.target[0].value
    const password = event.target[1].value
    const errors = []
    let listUser = [...users]

    switch (true) {
      case email.split('').length === 0:
        errors.push('Empty Email')
        if (password.split('').length === 0) {
          errors.push('Empty Password')
        }
        this.setState({
          errors: errors
        })
        break
      case password.split('').length === 0:
        errors.push('Empty Password')
        console.log('passwordempty')
        this.setState({
          errors: errors
        })
        break
      case listUser.find(user => user.email === email) !== undefined:
        const user = listUser.find(user => user.email === email) 
        if (user.password !== password) {
          errors.push('Wrong password')
          this.setState({
            errors: errors
           
          })
        } else {
          this.setState({
            errors: null,
            userId: user.id
          })
        }
        break
      case listUser.find(user => user.email === email) === undefined:
        errors.push('Wrong Email')
        this.setState({
          errors: errors
        })
        break
      default:
        break
    }
  }
  render () {
    const { errors, userId, users } = this.state;
    const user = users.find(item => item.id === userId)
    console.log(userId)
    if (errors === null) {
      return (
        <Redirect
          to={{
            pathname: '/',
            state: user
          }}
        />
      )
    } else {
      return (
        <div className='login'>
          <h2>Login</h2>
          {errors.length > 0
            ? errors.map((item, index) => (
              <Alert key={index} message={item} type='error' />
            ))
            : ''}
          <Form
            action=''
            onSubmit={e => this.handleInputEvent(e)}
            className='login-form'
          >
            <Form.Item label='Email' labelAlign='right'>
              <Input
                type='email'
                name='email'
                id='Email'
                placeholder='Email'
                prefix={
                  <Icon type='mail' style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                suffix={
                  <Tooltip title='email'>
                    <Icon
                      type='info-circle'
                      style={{ color: 'rgba(0,0,0,.45)' }}
                    />
                  </Tooltip>
                }
              />
            </Form.Item>
            <Form.Item label='Password'>
              <Input.Password
                name='password'
                id='Password'
                placeholder='Password'
              />
            </Form.Item>
            <Button type='primary' htmlType='submit' block>
              Submit
            </Button>
          </Form>
        </div>
      )
    }
  }
}
export default Login
