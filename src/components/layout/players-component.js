import React, { Component } from "react";
import Papa from "papaparse";
import axios from "axios";
import { Link } from "react-router-dom";
import * as actionTypes from "../../store/actions";
import { connect } from "react-redux";

class Player extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      matches: [],
      teamName: "",
      players: []
    };

    this.updateData = this.updateData.bind(this);
    this.extractData = this.extractData.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeTeamName = this.onChangeTeamName.bind(this);
    // this.clickHandler = this.clickHandler.bind(this);
  }

  updateData(result) {
    const data = result.data;
    this.setState({ data: data });
  }

  extractData(selector) {
    let temp = [];
    let final = [];

    switch (selector) {
      case "firstname":
        this.state.data.map(item => {
          if (Array.isArray(item["__parsed_extra"])) {
            temp.push(item["__parsed_extra"][0]);
          }
        });
        final = temp.slice(5, temp.length - 1);
        break;

      case "lastname":
        this.state.data.map(item => {
          if (Array.isArray(item["__parsed_extra"])) {
            temp.push(item["__parsed_extra"][1]);
          }
        });
        final = temp.slice(5, temp.length - 1);
        break;

      case "totaltime":
        this.state.data.map(item => {
          if (Array.isArray(item["__parsed_extra"])) {
            temp.push(item["__parsed_extra"][2]);
          }
        });
        final = temp.slice(5, temp.length - 1);
        break;

      case "distance":
        this.state.data.map(item => {
          if (Array.isArray(item["__parsed_extra"])) {
            temp.push(item["__parsed_extra"][3]);
          }
        });
        final = temp.slice(5, temp.length - 1);
        break;

      case "sprint_distance":
        this.state.data.map(item => {
          if (Array.isArray(item["__parsed_extra"])) {
            temp.push(item["__parsed_extra"][4]);
          }
        });
        final = temp.slice(5, temp.length - 1);
        break;

      case "sprints":
        this.state.data.map(item => {
          if (Array.isArray(item["__parsed_extra"])) {
            temp.push(item["__parsed_extra"][5]);
          }
        });
        final = temp.slice(5, temp.length - 1);
        break;

      case "sprint_avg_id":
        this.state.data.map(item => {
          if (Array.isArray(item["__parsed_extra"])) {
            temp.push(item["__parsed_extra"][6]);
          }
        });
        final = temp.slice(5, temp.length - 1);
        break;

      default:
        console.log(selector);
    }
    return final;
  }
  onChangeTeamName(e) {
    this.setState({ teamName: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();

    let tempPlayersList = [];

    let firstName = this.extractData("firstname");
    let lastName = this.extractData("lastname");
    let totalTime = this.extractData("totaltime");
    let distance = this.extractData("distance");
    let sprintDistance = this.extractData("sprint_distance");
    let sprints = this.extractData("sprints");
    let sprintAvgID = this.extractData("sprint_avg_id");

    for (let i = 0; i < firstName.length; i++) {
      const player = {
        name: String(firstName[i]),
        lastname: String(lastName[i]),
        total_time: Number(totalTime[i]),
        total_distance: Number(distance[i]),
        sprint_distance: Number(sprintDistance[i]),
        total_sprint: Number(sprints[i]),
        sprint_avg: Number(sprintAvgID[i])
      };
      console.log(player);
      tempPlayersList.push(player);
    }
    console.log(tempPlayersList);
    this.props.onPlayersAdded(tempPlayersList, this.state.teamName);

    const team = {
      name: this.state.teamName,
      player: tempPlayersList
    };

    console.log(team);

    axios
      .post("http://localhost:5000/teams/add", team)
      .then(res => console.log(res.data));
  }

  render() {
    // console.log(this.props.name);
    if (this.props.name === "Choose File" || this.props.name === undefined) {
      var csvFilePath = require("../../uploads/training13Sep.csv");
    } else {
      try {
        var csvFilePath = require("../../uploads/" + this.props.name);
      } catch (error) {
        alert(
          "Can't load this file only CSV files alowed",
          (window.location = "/create")
        );
      }
    }
    Papa.parse(csvFilePath, {
      header: true,
      skipEmptyLines: true,
      download: true,
      complete: this.updateData
    });

    let firstName = this.extractData("firstname");
    let lastName = this.extractData("lastname");
    let totalTime = this.extractData("totaltime");
    let distance = this.extractData("distance");
    let sprintDistance = this.extractData("sprint_distance");
    let sprints = this.extractData("sprints");
    let sprintAvgID = this.extractData("sprint_avg_id");

    let index = 0;
    // console.log(lastName);
    return (
      <div>
        <h1>Match: {this.props.name}</h1>
        <table>
          <thead>
            <tr>
              <td>Player Name</td>
              <td>Last Name</td>
              <td>Total Time</td>
              <td>Distance (km)</td>
              <td>Sprint Distance</td>
              <td> Total Sprints</td>
              <td>Sprints Avg(MP/H).</td>
            </tr>
          </thead>
          <tbody>
            <td>
              {firstName.map(item => {
                return <tr key={index++}>{item}</tr>;
              })}
            </td>
            <td>
              {lastName.map(item => {
                return <tr key={index++}>{item}</tr>;
              })}
            </td>
            <td>
              {totalTime.map(item => {
                return <tr key={index++}>{item}</tr>;
              })}
            </td>
            <td>
              {distance.map(item => {
                return <tr key={index++}>{item}</tr>;
              })}
            </td>
            <td>
              {sprintDistance.map(item => {
                return <tr key={index++}>{item}</tr>;
              })}
            </td>
            <td>
              {sprints.map(item => {
                return <tr key={index++}>{item}</tr>;
              })}
            </td>
            <td>
              {sprintAvgID.map(item => {
                return <tr key={index++}>{item}</tr>;
              })}
            </td>
          </tbody>
        </table>
        <br />
        <from onSubmit={this.onSubmit}>
          <input type="submit" value="Submit To Match" />
        </from>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ply: state.players
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onPlayersAdded: (playersList, teamName) =>
      dispatch({
        type: actionTypes.ADD_TEAM,
        players: playersList,
        teamName: teamName
      })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Player);
