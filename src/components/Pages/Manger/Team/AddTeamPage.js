import React, { Component } from 'react'
import { withRouter } from "react-router";
import ManagerControl from '../ManagerControl'
import axios from 'axios';


class _AddTeamPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      teamName: "",
      allAnalyst: [],
      analyst: ""
    }
    this.changeValue = this.changeValue.bind(this)
    this.getAllAnalyst = this.getAllAnalyst.bind(this)
    this.changeValue = this.changeValue.bind(this)
  }
  changeValue(name, value) {
    this.setState({
      [name]: value,
    });
  }
  componentDidMount() {
    this.getAllAnalyst().then((result => {
      const myUsers = [];
      result.data.forEach((user) => {
        if (user.permission === "Analyst")
          myUsers.push(` ${user.firstName} ${user.lastName} (${user.email})`)

      }
      );
      this.setState({
        allAnalyst: myUsers,
      });
    }))
  }


  getAllAnalyst() {
    return axios.get('http://localhost:5000/users/', {

    })
  }
  changeValue(name, value) {
    this.setState({
      [name]: value,
    });
  }
  render() {
    const analysts = this.state.allAnalyst
    return (
      <>
        <ManagerControl />

        <form>
          <div className='form-group'>
            <label> Team Name </label>
            <input
              type='text'
              name='teamName'
              placeholder='email'
              onChange={(e) =>
                this.changeValue(e.target.name, e.target.value)
              }
            />
          </div>
          <div className='form-group'>
            <label> Analyst </label>{' '}
            <select
              id='analyst'
              name='analyst'
              onChange={(e) =>
                this.changeValue(e.target.name, e.target.value)
              }>
              <option disabled selected value>
                Please select a Analyst{' '}
              </option>{' '}
              {analysts.map((analyst, index) => (
                <option key={index} value={analyst}> {analyst} </option>
              ))}{' '}
            </select>{' '}
          </div>{' '}
        </form>
      </>
    )
  }
}
export const AddTeamPage = withRouter(_AddTeamPage)
