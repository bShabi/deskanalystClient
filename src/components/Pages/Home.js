
import React, { Component } from 'react'
import { withRouter } from "react-router";
import GameReport from '../Reports/GamesReports'

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
        <GameReport className="col-lg-3" />





      </div>
    )
  }
}

export const Home = withRouter(_Home)
