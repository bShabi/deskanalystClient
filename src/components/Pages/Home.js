
import React, { Component } from 'react'
import { withRouter } from "react-router";

class _Home extends Component {

  componentDidMount() {
    const user = JSON.parse(sessionStorage.getItem("loginUser"))
    if (!user) {
      this.props.history.push('/')
    }
  }
  render() {
    return (
      <div>

      </div>
    )
  }
}

export const Home = withRouter(_Home)
