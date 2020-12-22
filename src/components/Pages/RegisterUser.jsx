import React from "react";
import loginImg from "../../login.svg";
import axios from 'axios' 

class Register extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: null,
      lastName: null,
      email: null,
      password: null,
      passwordConfirm: null,
      team: null,
      permission: null
    }
    this.changeValue = this.changeValue.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  changeValue(name,value) {
    this.setState({ [name] : value});
  }
  handleSubmit(e){
    document.getElementById("username").style.color = "red";
    console.log(this.state)
  }
  render() {

    return (
      <form>
      <div className="base-container">
        <div className="content">
          <div className="image">
          <img src={loginImg} style={{width: '25%', height: '25%'}} />
          </div>
          <div className="form">
            <div className="form-group">
              <label id="username">First Name</label>
              <input type="text" name="firstName" placeholder="First Name" onChange={(e) => this.changeValue(e.target.name,e.target.value)} />
            </div>
            <div className="form-group">
              <label htmlFor="username">Last Name</label>
              <input type="text" name="lastName" placeholder="Last name" onChange={(e) => this.changeValue(e.target.name,e.target.value)} />
            </div>
            <div className="form-group">
              <label>Team</label>
              <select id="teams" name="team" onChange={(e) => this.changeValue(e.target.name,e.target.value)}>
                <option value=""></option>
                <option value="saab">Saab 95</option>
                <option value="mercedes">Mercedes SLK</option>
                <option value="audi">Audi TT</option>
             </select>
            </div>
     
            <div className="form-group">
              <label>Email</label>
              <input type="text" name="email" placeholder="email" onChange={(e) => this.changeValue(e.target.name,e.target.value)}/>
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" name="password" placeholder="password" onChange={(e) => this.changeValue(e.target.name,e.target.value)}/>
            </div>
            <div className="form-group">
              <label>Confirm Password</label>
              <input type="password" name="passwordConfirm" placeholder="Confirm password" onChange={(e) => this.changeValue(e.target.name,e.target.value)}/>
            </div>
            <div className="form-group">
              <label>Permission</label>
              <select id="permission" name="permission" onChange={(e) => this.changeValue(e.target.name,e.target.value)}>
              <option value=""></option>

                <option value="Coach">Coach</option>
                <option value="Analyst">Analyst</option>
              </select>
            </div>
          </div>
        </div>
          <button type="button" onClick={this.handleSubmit}className="btn" >
            Register
          </button>
 
      </div>
      </form>

    );
  }

}

  export default Register