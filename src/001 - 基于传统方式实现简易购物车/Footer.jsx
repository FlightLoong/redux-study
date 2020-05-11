import React from 'react'

export default class Header extends React.Component {
  render() {
    return (
      <div>
        <p>总价： {this.props.count} 元 </p>
      </div>
    )
  }
}
