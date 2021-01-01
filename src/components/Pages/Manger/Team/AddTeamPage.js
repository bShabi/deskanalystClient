import React, { Component } from 'react'
import { withRouter } from "react-router";

 class _AddTeamPage extends Component {
     constructor(props) {
         super(props)
         this.state = {
            teamName: ""
         }
         this.changeValue = this.changeValue.bind(this)
     }

     changeValue(name, value) {
        this.setState({
          [name]: value,
        });
      }
    render() {
        return (
            <>
            <form>
            <div className='form-group'>
                  <label> Email </label>
                  <input
                    type='text'
                    name='teamName'
                    placeholder='email'
                    onChange={(e) =>
                      this.changeValue(e.target.name, e.target.value)
                    }
                  />
                </div>
            </form>
            </>
        )
    }
}
export const AddTeamPage = withRouter(_AddTeamPage)
