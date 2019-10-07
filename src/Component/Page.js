import React from 'react'
import UserComment from './Comment'
import { Card, Form, Input, Avatar } from 'antd';

const { TextArea } = Input;

export default class Page extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      comments: []
    }
  }
  componentDidMount () {
    let contentLocalStorage = [
      localStorage.getItem(
        `userComment${parseInt(this.props.match.params.id)}`
      )
    ]
    let contentSplit = contentLocalStorage
    if (contentLocalStorage[0] !== null) {
      contentSplit = contentLocalStorage[0].split(',')
    }
    this.setState({
      comments: contentSplit
    })
  }
  handleKeyUp (e) {
    let { comments } = this.state
    let inputValue = e.target.value
    const user = this.props.location.state.user
    if (e.key === 'Enter' && inputValue.trim() !== '') {
      if (comments[0] == null) {
        comments = []
      }
      if (user !== undefined) {
        comments.push(inputValue.concat(` ${user.id} ${user.name}`))
      } else {
        comments.push(inputValue.concat(' -1'))
      }

      this.setState({
        comments: comments
      })
      localStorage.setItem(
        `userComment${parseInt(this.props.match.params.id)}`,
        comments
      )
      if (user !== undefined) {
        localStorage.setItem(`commentAvatar${parseInt(user.id)}`, user.avatar)
      }

      e.target.value = ''
    }
  }
  render () {
    const contents = this.props.location.state.section
    let user = this.props.location.state.user
    let { comments } = this.state

    return (
      <div className='Page'>
        <div className='container'>
          <Card title={contents.title}>
            <p>{contents.content}</p>
          </Card>
          {comments[0] === null ? (
            ''
          ) : (
            <div className='comment'>
              {comments.map((item, index) => (
                <UserComment
                  key={index}
                  text={item.split(' ')[0]}
                  commentID={item.split(' ')[1]}
                  name={item.split(' ')[2]}
                />
              ))}
            </div>
          )}

          <div className='inputComment'>
            <div className='userInfo_avatar'>
              {user === undefined ?<Avatar style={{ backgroundColor: '#87d068' }} icon="user" />:<Avatar src={user.avatar} alt='' />}
           
            </div>
            <Form.Item>
              <TextArea rows={3} onKeyUp={e => this.handleKeyUp(e)} placeholder="Leave your comment"/>
            </Form.Item>
       
          </div>
        </div>
      </div>
    )
  }
}
