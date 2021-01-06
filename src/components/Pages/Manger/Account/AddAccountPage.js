import { TextField, Grid, makeStyles, Button } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import ManagerControl from '../ManagerControl';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const useStyle = makeStyles((theme) => ({
  root: {
    '& .MuiGrid-root': {
      width: '80%',
      margin: theme.spacing(2),
    },
  },
}));

class AddAccountPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: null,
      lastName: null,
      email: null,
      password: null,
      passwordConfirm: null,
      team: '',
      allTeam: [],
      permission: null,
    };
    this.changeValue = this.changeValue.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.registerUserToDB = this.registerUserToDB.bind(this);
    this.getAllTeams = this.getAllTeams.bind(this);
    this.getUserByEmail = this.getUserByEmail.bind(this);
  }
  componentDidMount() {
    this.getAllTeams();
    toast.configure();
  }
  getAllTeams() {
    axios.get('http://localhost:5000/teams/').then((result) => {
      const myTeam = [];
      result.data.forEach((team) => {
        myTeam.push({ key: team._id, value: team.teamName });
      });
      this.setState({
        allTeam: myTeam,
      });
    });
  }
  changeValue(name, value) {
    this.setState({
      [name]: value,
    });
  }
  handleSubmit(e) {
    var account = this.state;
    var arrData = [];
    Object.entries(account).map(([key, value]) => {
      arrData.push(value);
    });
    for (let value of Object.values(arrData)) {
      if (value == null || String(value).length === 0) {
        toast.error('Please inert a value ');
        return;
      }
    }
    if (this.state.password !== this.state.passwordConfirm) {
      toast.error('please make sure your password match');
      return;
    }
    //async 
    this.getUserByEmail().then((response) => {
      if (response.data === null) {
        this.registerUserToDB();
        toast.success("user save to DB successfly")
      } else {
        toast.warning("user already exist")
      }

    })

  }

  getUserByEmail() {
    return axios
      .get('http://localhost:5000/users/find/' + this.state.email, {
      })
  }

  registerUserToDB() {
    console.log(this.state)
    axios
      .post('http://localhost:5000/users/add', {

        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        password: this.state.password,
        team: this.state.team,
        permission: this.state.permission,

      })
      .then(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  render() {
    const classes = makeStyles((theme) => ({
      root: {
        '& .MuiTextField-root': {
          margin: theme.spacing(1),
          width: 200,
        },
      },
    }));
    const teams = this.state.allTeam;
    return (
      <>
        <ManagerControl />
        <form>
          <div className='base-container'>
            <div className='content'>
              <div className='image'> </div>{' '}
              <div className='form'>
                <div className='form-group'>
                  <label id='username'> First Name </label>{' '}
                  <input
                    type='text'
                    name='firstName'
                    placeholder='First Name'
                    onChange={(e) =>
                      this.changeValue(e.target.name, e.target.value)
                    }
                  />{' '}
                </div>{' '}
                <div className='form-group'>
                  <label htmlFor='username'> Last Name </label>{' '}
                  <input
                    type='text'
                    name='lastName'
                    placeholder='Last name'
                    onChange={(e) =>
                      this.changeValue(e.target.name, e.target.value)
                    }
                  />{' '}
                </div>{' '}
                <div className='form-group'>
                  <label> Team </label>{' '}
                  <select
                    id='team'
                    name='team'
                    onChange={(e) =>
                      this.changeValue(e.target.name, e.target.value)
                    }>
                    <option disabled selected value>
                      Please select a Team{' '}
                    </option>{' '}
                    {teams.map((team, index) => (
                      <option key={index} value={team.key}> {team.value} </option>
                    ))}{' '}
                  </select>{' '}
                </div>{' '}
                <div className='form-group'>
                  <label> Email </label>{' '}
                  <input
                    type='text'
                    name='email'
                    placeholder='email'
                    onChange={(e) =>
                      this.changeValue(e.target.name, e.target.value)
                    }
                  />{' '}
                </div>{' '}
                <div className='form-group'>
                  <label> Password </label>{' '}
                  <input
                    type='password'
                    name='password'
                    placeholder='password'
                    onChange={(e) =>
                      this.changeValue(e.target.name, e.target.value)
                    }
                  />{' '}
                </div>{' '}
                <div className='form-group'>
                  <label> Confirm Password </label>{' '}
                  <input
                    type='password'
                    name='passwordConfirm'
                    placeholder='Confirm password'
                    onChange={(e) =>
                      this.changeValue(e.target.name, e.target.value)
                    }
                  />{' '}
                </div>{' '}
                <div className='form-group'>
                  <label> Permission </label>{' '}
                  <select
                    id='permission'
                    name='permission'
                    onChange={(e) =>
                      this.changeValue(e.target.name, e.target.value)
                    }>
                    <option disabled selected value>
                      Please select a permission{' '}
                    </option>
                    <option value='Coach'> Coach </option>{' '}
                    <option value='Analyst'> Analyst </option>{' '}
                  </select>{' '}
                </div>{' '}
              </div>{' '}
            </div>{' '}
            <button type='button' onClick={this.handleSubmit} className='btn'>
              Register{' '}
            </button>{' '}
          </div>{' '}
        </form>{' '}
      </>
    );
  }
}

export default AddAccountPage;
