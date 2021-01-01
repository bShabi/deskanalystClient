import React , { Fragment, useState }from 'react';
import { withRouter } from "react-router";
import {Button} from '@material-ui/core';
import {Dialog , DialogActions,DialogContent,DialogContentText,DialogTitle} from '@material-ui/core/';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import "../css/CreateMatch.css";
import FileReader from './FileReader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


class _CreateMatch extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      name: this.props.nameTeam,
      opponentTeam: null,
      gameDate: null,
      myTeamHalfScore: null,
      anotherHalfScore: null,
      myTeamFinalScore: null,
      anotherFinalScore: null,
      shotOnTargetHalfOne: null,
      shotOnTargetHalfTwo: null,
      shotOFFTargetHalfOne: null,
      shotOFFTargetHalfTwo: null,
      corrnerHalfOne: null,
      corrnerHalfTwo: null,
      offsidesHalfOne: null,
      offsidesHalfTwo: null,
      tackelsHalfOne:  null,
      tackelsHalfTwo: null,
      stealHalfOne: null,
      stealHalfTwo: null,
      lostPossessionHalfOne: null,
      lostPossessionHalfTwo: null,
      validData: false,
      dialogMsg: false
      
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.insertDeitals = this.insertDeitals.bind(this);
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this)

  }
  
  componentDidMount() {
    const user = JSON.parse(sessionStorage.getItem("loginUser"))
    if(!user) {
      this.props.history.push('/')
    }else {
      this.setState({name: user.teamName})
    console.log(this.state.name)
    }
    toast.configure()
    const newDate = new Date().toDateString();
    console.log(newDate)
    this.setState({gameDate: newDate })
  }

  insertDeitals(name,value) {
    this.setState({ [name] : value});

  }

   handleSubmit = (event) => {
    var gameData = this.state;
    var arrData = []
    Object.entries(gameData).map(([key, value]) => {
      arrData.push(value)
    })
    console.log(this.state.opponentTeam)
    let isValidData = true;
    for (let value of Object.values(arrData)) {
      if(value == null || String(value).length === 0)
      {
        isValidData =false;
        toast.error("Please inert a value ")
        return
      } 
    }
    if(isValidData)
      this.handleClickOpen()

  }
   handleClickOpen () {
    this.setState({dialogMsg:true})
  };

  handleClose () {
    this.setState({dialogMsg:false})

  };

  render() {
  const matchDictionary = {
    "Shot ON Target" : ["shotOnTargetHalfOne","shotOnTargetHalfTwo"],
    "Shot OFF Target": ["shotOFFTargetHalfOne","shotOFFTargetHalfTwo"],
    "Corrner": ["corrnerHalfOne","corrnerHalfTwo"],
    "Offside": ["offsidesHalfOne","offsidesHalfTwo"],
    "Tackels": ["tackelsHalfOne","tackelsHalfTwo"],
    "Steal": ["stealHalfOne","stealHalfTwo"],
    "Lost Possession": ["lostPossessionHalfOne","lostPossessionHalfTwo"]
  }

  return (
    <Fragment>
     <h1>Create Match 
       <DatePicker
       selected={this.state.gameDat}
       onChange={date => { 
         var currentDate = new Date(date).toDateString();
         console.log(currentDate)
         this.setState({gameDat: currentDate})
       }}
       dateFormat='dd/MM/yyyy'
       />
     </h1>
  <label >
  {/* Game information */}
  <table  style={{width: '100%'}}>
    <th></th>
      <th> {this.state.name}</th>
      <th> VS </th>
      <th> <input type="text"  name="opponentTeam" size="8" placeholder="Example:Macbi tel aviv" onChange={(e) => this.insertDeitals(e.target.name,e.target.value)}></input> </th>
    <tbody>
    <tr>
    <td></td>
      <td> <input type="number" name="myTeamHalfScore" min="0" max="10" onChange={(e) => this.insertDeitals(e.target.name,e.target.value)}></input></td>
      <td>Half Score</td>
       <td> <input type="number" name="anotherHalfScore" min="0" max="10" onChange={(e) => this.insertDeitals(e.target.name,e.target.value)}></input> </td>
    </tr>
    <tr>
    <td></td>
      <td> <input type="number"  name="myTeamFinalScore" min="0" max="10"  onChange={(e) => this.insertDeitals(e.target.name,e.target.value)}></input> </td>
      <td>Final Score</td>
      <td> <input type="number"  name="anotherFinalScore" min="0" max="10" onChange={(e) => this.insertDeitals(e.target.name,e.target.value)} ></input> </td>
    </tr>
    </tbody>
    </table>

      {/* Static Game */}
    <table style={{width:'100%'}} >
    

      <td></td>
      <td>Half 1</td>
      <td></td>
      <td>Half 2</td>
    <tbody>
    {Object.entries(matchDictionary)
      .map( ([key, value]) => 
    (
    <tr key={key}>
    <td></td>
      <td><input type="number"  name={value[0]} min="0" max="30" onChange={(e) => this.insertDeitals(e.target.name,e.target.value)}></input></td>
      <td>{key}</td>
      <td><input type="number"  name={value[1]} min="0" max="30" onChange={(e) => this.insertDeitals(e.target.name,e.target.value)}></input></td>
    </tr>
    ))}
    </tbody>

  </table>
  <button onClick={this.handleSubmit} className="btn btn-primary">Submit</button>

  </label>
  <Dialog
        open={this.state.dialogMsg}
        onClose={this.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Upload CSV From Game"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <FileReader gameInformation={this.state}/>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Cancel
          </Button>

        </DialogActions>
      </Dialog>
    </Fragment>
  );
  }
};
export const CreateMatch = withRouter(_CreateMatch);
