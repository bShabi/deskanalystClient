
import React, { Component, Fragment } from 'react'
import { withRouter } from "react-router";
import FilterableTable from 'react-filterable-table';
import {
  DataGrid,
} from "@material-ui/data-grid";
import axios from 'axios'
import VisibilityIcon from '@material-ui/icons/Visibility';

class _TeamSqoud extends Component {
  constructor(props) {
    const user = JSON.parse(sessionStorage.getItem("loginUser"))
    if (!user) {
      this.props.history.push('/')
    }
    const teamId = user ? user.teamid : " "
    super(props)
    this.state = {
      teamID: teamId,
      playersBeforeSort: [],
      players: []
    }
    this.getPlayers = this.getPlayers.bind(this)
    this.setID = this.setID.bind(this)
  }

  componentDidMount() {
    const { teamID, players } = this.state
    const tempPlayer = [];
    const map = new Map();

    this.getPlayers(teamID).then((result) => {
      if (result) {
        for (const item of result.data) {
          if (!map.has(item.firstName)) {
            map.set(item.firstName, true);    // set any value to Map
            tempPlayer.push(item);
          }
          else {
            var playerIndex = tempPlayer.findIndex(x => x.firstName === item.firstName)
            tempPlayer[playerIndex].goals += item.goals
            console.log(tempPlayer[playerIndex]);
          }
        }

        this.setState({ players: tempPlayer })
      }
    }).catch((err) => {
      console.log(err)
    })
  }


  // usage example:
  // var a = ['a', 1, 'a', 2, '1'];

  getPlayers(teamID) {
    return axios.get('http://localhost:5000/players/findByTeamid/' + teamID)
  }
  setID(players) {
    players.forEach(player => (
      player.id = player._id
    ))
  }
  render() {
    const { players } = this.state
    this.setID(players)

    const columns = [
      { field: 'firstName', headerName: 'First Name', width: 150 },
      { field: 'lastName', headerName: 'Last Name', width: 200 },
      { field: 'position', headerName: 'Position', width: 180 },
      { field: 'goals', headerName: 'Goals', width: 130 },
      {
        field: 'action', headerName: 'Show Game', width: 150, renderCell: (params) => (

          <VisibilityIcon
            variant="contained"
            color="primary"
            size="small"
            style={{ marginLeft: 35 }}

          >


          </VisibilityIcon>
        )
      },
    ]

    console.log(players)
    return (
      <>
        <Fragment>
          <div style={{ height: 600, width: '100%' }}>
            <DataGrid id={Math.random()} rows={players} columns={columns}
            />
          </div>
        </Fragment>
      </>
    )
  }
}
export const TeamSqoud = withRouter(_TeamSqoud)
