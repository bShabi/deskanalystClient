
import React, { Fragment, Component } from 'react'
import { withRouter } from "react-router";
import axios from 'axios'
import FilterableTable from 'react-filterable-table';
import {
    DataGrid,
} from "@material-ui/data-grid";
import { Button } from '@material-ui/core';

import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core/';
import ShowSpecificGame from './ShowSpecificGame'

class _Match extends Component {
    constructor(props) {
        super(props)
        const user = JSON.parse(sessionStorage.getItem("loginUser"))
        const teamid = user ? user.teamid : ""
        if (!user) {
            this.props.history.push('/')
        }
        this.state = {
            games: [],
            teamID: teamid,
            dialogMsg: false,
            SelecetGameID: ""


        }
        this.getAllGames = this.getAllGames.bind(this)
        this.sumField = this.sumField.bind(this)
        this.handleClickOpen = this.handleClickOpen.bind(this)
        this.handleClose = this.handleClose.bind(this)
    }
    componentDidMount() {
        const { teamID, games } = this.state
        this.getAllGames(teamID).then((result) => {
            if (result.data)
                this.setState({ games: result.data })
        })
    }
    getAllGames(teamID) {
        return axios.get('http://localhost:5000/games/find/' + teamID)
    }
    sumField(games) {
        // console.log(games)
        games.forEach(game => {
            game.halfScore = `${game.myTeamHalfScore} - ${game.anotherHalfScore}`;
            game.finalScore = `${game.myTeamFinalScore} - ${game.anotherFinalScore}`
            game.id = game._id
        }
        )
    }
    handleClickOpen() {
        this.setState({ dialogMsg: true })
    };

    handleClose() {
        this.setState({ dialogMsg: false })

    };
    render() {
        const { games, SelecetGameID } = this.state
        this.sumField(games)

        const columns = [
            { field: 'gameDate', headerName: 'Date', width: 150 },
            { field: 'myTeamName', headerName: 'My Team', width: 200 },
            { field: 'opponentTeam', headerName: 'opponent Team', width: 180 },
            { field: 'halfScore', headerName: 'Half Score', width: 130 },
            { field: 'finalScore', headerName: 'Final Score', width: 130 },
        ]
        return (
            <>
                <Fragment>
                    <div style={{ height: 600, width: '100%' }}>
                        <DataGrid id={Math.random()} rows={games} columns={columns} onSelectionChange={(newSelection) => {
                            this.setState({ dialogMsg: true, SelecetGameID: newSelection.rowIds[0] })
                        }} />
                    </div>
                    <Dialog
                        fullScreen
                        open={this.state.dialogMsg}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">{"Game info"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                <ShowSpecificGame SelecetGameID={SelecetGameID} />
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose} color="primary">
                                Close
          </Button>

                        </DialogActions>
                    </Dialog>
                </Fragment>


            </>

        )
    }
}
export const Match = withRouter(_Match);


