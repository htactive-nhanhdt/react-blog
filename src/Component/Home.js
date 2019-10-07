import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'

import { Layout, Menu, Button, Avatar, Popconfirm } from 'antd'

import Section from './Section'
const { Header, Content, Footer } = Layout

export default class Home extends React.Component {
  constructor () {
    super()
    this.state = {
      sections: [],
      redirectLogin: false
    }
  }

  componentDidMount () {
    axios.get('http://localhost:3004/sections').then(res => {
      const sections = res.data
      this.setState({
        sections: sections
      })
    })
  }

  handleDeleteSection (sectionID) {
    let { sections } = this.state
    this.setState({
      sections: sections.filter(item => item.id !== parseInt(sectionID))
    })
  }
  handleLog () {
    this.setState({
      redirectLogin: true
    })
  }

  render () {
    const { sections, redirectLogin } = this.state
    const user = this.props.location.state

    if (redirectLogin === true) {
      return <Redirect to='/login' />
    }
    return (
      <Layout className='home'>
        <Header
          style={{
            zIndex: 1,
            width: '100%',
            display: 'flex'
          }}
        >
          <div className='logo'>
            <h1>Nhân Blog</h1>
          </div>
          <Menu>
            <Menu.Item>
              <div className='userInfo_avatar'>
                {user !== undefined && (
                  <Avatar src={user.avatar} alt='' shape='circle' />
                )}
                {user === undefined && (
                  <Avatar style={{ backgroundColor: '#87d068' }} icon='user' />
                )}
              </div>
              {user !== undefined && (
                <div className='user-name'>
                  <p>{user.name}</p>
                </div>
              )}

              {user !== undefined && (
                <Button onClick={() => this.handleLog()}>Log out</Button>
              )}
              {user === undefined && (
                <Button onClick={() => this.handleLog()}>Log in</Button>
              )}
            </Menu.Item>
          </Menu>
        </Header>
        <Content>
          {sections.map((section, index) => (
            <div key={index} className='section-card'>
              <Section sections={section} />
              <Link
                to={{
                  pathname: `/${section.id}`,
                  state: { section, user }
                }}
                key={index}
              >
                <Button>More</Button>
              </Link>
              <Popconfirm
                placement='topLeft'
                title='Do you want delete this topic?'
                onConfirm={() => this.handleDeleteSection(section.id)}
                okText='Yes'
                cancelText='No'
              >
                <Button>Delete</Button>
              </Popconfirm>
            </div>
          ))}
        </Content>
        <Footer style={{textAlign:"center"}}>Nhan@copyright2019</Footer>
      </Layout>
    )
  }
}
