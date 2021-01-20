import React from 'react';
import loginImg from '../../login.svg';
import '../css/App.css';
import axios from 'axios';
import { withRouter } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';

class _LoginPage extends React.Component {
  constructor() {
    super();
    this.state = {
      redirect: false,
      email: '',
      password: '',
      nameTeam: '',
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  componentDidMount() {
    const user = JSON.parse(sessionStorage.getItem("loginUser"))
    if (user) {
      this.props.history.push('/Dashboard')
    } toast.configure();
  }

  onChange(name, value) {
    this.setState({
      [name]: value,
    });
  }
  onSubmit(e) {
    e.preventDefault()

    axios.post('http://localhost:5000/users/login', {
      email: this.state.email,
      password: this.state.password,
    })
      .then(
        (response) => {
          console.log(response);
          if (response.data === null) {
            toast.error('email or password is incorrect');
          } else {
            console.log(response.data);
            sessionStorage.setItem('loginUser', JSON.stringify(response.data));
            console.log(response.data.permission)
            this.setState({
              nameTeam: response.data.nameTeam,
            });
            this.props.history.push('/Dashboard');
            toast.success('success');
            window.location.reload(false);
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }

  render() {
    return (
      <form action='onSubmit'>
        <div className='base-container'>
          <div className='header'> </div>
          <div className='content'>
            <div className='image'>
              <img
                src={loginImg}
                style={{
                  width: '50%',
                  height: '50%',
                }}
              />
            </div>
            <div className='form'>
              <div className='form-group'>
                <label htmlFor='username'> Username </label>
                <input
                  type='text'
                  name='email'
                  placeholder='Email'
                  onChange={(e) => this.onChange(e.target.name, e.target.value)}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='password'> Password </label>
                <input
                  type='password'
                  name='password'
                  placeholder='Password'
                  onChange={(e) => this.onChange(e.target.name, e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className='footer'>
            <button onClick={this.onSubmit} type='button' className='btn'>
              Login
            </button>
          </div>
        </div>
      </form>
    );
  }
}

export function nameTeam() {
  return this.state.nameTeam
}
export const LoginPage = withRouter(_LoginPage);
