import React from 'react'
import { Comment, Icon, Tooltip, Avatar } from 'antd'
import moment from 'moment'

export default class UserComment extends React.Component {
  constructor () {
    super()
    this.state = {
      likes: 0,
      dislikes: 0,
      action: null
    }
  }
  like = () => {
    this.setState({
      likes: 1,
      dislikes: 0,
      action: 'liked'
    })
  }

  dislike = () => {
    this.setState({
      likes: 0,
      dislikes: 1,
      action: 'disliked'
    })
  }

  render () {
    const { text, commentID, name } = this.props
    const { likes, dislikes, action } = this.state
    console.log(name)
    const avatarUrl = localStorage.getItem(
      `commentAvatar${parseInt(commentID)}`
    )
    const actions = [
      <span key='comment-basic-like'>
        <Tooltip title='Like'>
          <Icon
            type='like'
            theme={action === 'liked' ? 'filled' : 'outlined'}
            onClick={this.like}
          />
        </Tooltip>
        <span style={{ paddingLeft: 8, cursor: 'auto' }}>{likes}</span>
      </span>,
      <span key=' key="comment-basic-dislike"'>
        <Tooltip title='Dislike'>
          <Icon
            type='dislike'
            theme={action === 'disliked' ? 'filled' : 'outlined'}
            onClick={this.dislike}
          />
        </Tooltip>
        <span style={{ paddingLeft: 8, cursor: 'auto' }}>{dislikes}</span>
      </span>     
    ]
    return (
      <div className='userComment'>
        <Comment
          actions={actions}
          author={
            commentID === '-1' ? <span className='userInfo_name'>Guess</span>:
            <span className='userInfo_name'>{name}</span>
          }
          avatar={commentID === '-1' ?<Avatar style={{ backgroundColor: '#87d068' }} icon="user" />:<Avatar src={avatarUrl} alt='' shape="circle" />}
          content={<p>{text}</p>}
          datetime={
            <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
              <span>{moment().fromNow()}</span>
            </Tooltip>
          }
        />
      </div>
    )
  }
}
