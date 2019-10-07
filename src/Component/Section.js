import React from 'react'
import { Card } from 'antd'

class Section extends React.Component {
  
  render () {
    const { sections } = this.props    
    
    return (
      <Card      
      title={sections.title} 
      hoverable 
      cover={<img alt="example" src="phil.jpg" />}
      >      
        <p>{sections.content}</p>
      </Card>
    )
  }
}
export default Section
