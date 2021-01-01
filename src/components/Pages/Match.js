
import React, { Component } from 'react'
import { withRouter } from "react-router";

class _Match extends Component {
    componentDidMount() {
        const user = JSON.parse(sessionStorage.getItem("loginUser"))
        if(!user) {
          this.props.history.push('/')
        }
    }
    render() {
        return (
            <div>
                hello
            </div>
        )
    }
}
export const Match = withRouter(_Match);


