import React, { Component } from 'react'
import { withRouter } from "react-router";
import ManagerControl from '../ManagerControl'
import axios from 'axios';
import { toast } from 'react-toastify';


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
    this.handleSubmit = this.handleSubmit.bind(this)
    this.registerTeamToDB = this.registerTeamToDB.bind(this)
  }
  changeValue(name, value) {
    this.setState({
      [name]: value,
    });
  }
  componentDidMount() {
    toast.configure()
    console.log("retrey")
    this.getAllAnalyst().then((result => {
      const myUsers = [];
      result.data.forEach((user) => {
        if (user.permission === "Analyst")
          myUsers.push({ key: user._id, value: ` ${user.firstName} ${user.lastName} (${user.email})` })

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

  handleSubmit() {
    this.registerTeamToDB().then((response) => {
      console.log(response)
      if (response.data != null) {
        toast.clearWaitingQueue()
        toast.success("Team registered to DB")
      }
      else {
        toast.warning("something worng")
      }

    })

  }

  registerTeamToDB() {
    return axios
      .post('http://localhost:5000/teams/add', {
        teamName: this.state.teamName,
        analyst: this.state.analyst
      })
  }
  render() {
    const analysts = this.state.allAnalyst
    return (
      <>
        <ManagerControl />

        <div className='form-group'>
          <label> Team Name </label>
          <input
            type='text'
            name='teamName'
            placeholder='Name'
            onChange={(e) =>
              this.changeValue(e.target.name, e.target.value)
            }
          />
        </div>
        {/* <div className='form-group'> */}
        {/* <label> Analyst </label>{' '} */}
        {/* <select
            id='analyst'
            name='analyst'
            onChange={(e) =>
              this.changeValue(e.target.name, e.target.value)
            }>
            <option disabled selected value>
              Please select a Analyst{' '}
            </option>{' '}
            {analysts.map((analyst, index) => (
              <option key={index} value={analyst.key}> {analyst.value} </option>
            ))}{' '}
          </select>{' '} */}
        {/* </div>{' '} */}
        <button onClick={this.handleSubmit} className="btn btn-primary">Register</button>
      </>
    )
  }
}
export const AddTeamPage = withRouter(_AddTeamPage)
