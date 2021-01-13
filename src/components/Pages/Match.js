
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
import VisibilityIcon from '@material-ui/icons/Visibility';
import DeleteIcon from '@material-ui/icons/Delete';
import Slide from '@material-ui/core/Slide';
import { toast } from 'react-toastify';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
class _Match extends Component {
    constructor(props) {
        super(props)
        const user = JSON.parse(sessionStorage.getItem("loginUser"))
        const teamid = user ? user.teamid : ""
        const userPermision = user ? user.permission : ""

        if (!user) {
            this.props.history.push('/')
        }
        this.state = {
            games: [],
            teamID: teamid,
            showPlayerDialog: false,
            showDeleteDialog: false,
            selecetGameID: null,
            permission: userPermision


        }
        this.getAllGames = this.getAllGames.bind(this)
        this.deleteGame = this.deleteGame.bind(this)
        this.sumField = this.sumField.bind(this)
        this.handleClickOpen = this.handleClickOpen.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.handleOpenDeleteDialog = this.handleOpenDeleteDialog.bind(this)
        this.handleCloseDeleteDialog = this.handleCloseDeleteDialog.bind(this)

    }

    componentDidMount() {
        const { teamID, games } = this.state

        toast.configure()
        this.getAllGames(teamID).then((result) => {
            if (result.data)
                this.setState({ games: result.data })
        })

    }
    getAllGames(teamID) {
        return axios.get('http://localhost:5000/games/find/' + teamID)
    }
    deleteGame(gameID) {
        this.handleCloseDeleteDialog()
        axios.delete('http://localhost:5000/games/remove/' + gameID)
        axios.delete('http://localhost:5000/players/remove/' + gameID)


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
        this.setState({ showPlayerDialog: true })
    };

    handleClose() {
        this.setState({ showPlayerDialog: false })

    };
    handleOpenDeleteDialog() {
        this.setState({ showDeleteDialog: true })
    };

    handleCloseDeleteDialog() {
        this.setState({ showDeleteDialog: false })

    };
    render() {
        const { games, selecetGameID, permission } = this.state
        this.sumField(games)

        const columns = [
            { field: 'gameDate', headerName: 'Date', width: 150 },
            { field: 'myTeamName', headerName: 'My Team', width: 200 },
            { field: 'opponentTeam', headerName: 'opponent Team', width: 180 },
            { field: 'finalScore', headerName: 'Final Score', width: 130 },
            {
                field: 'action', headerName: 'Show Player', width: 150, renderCell: (params) => (

                    <VisibilityIcon
                        variant="contained"
                        color="primary"
                        size="small"
                        style={{ marginLeft: 30 }}
                        onClick={async () => {
                            var gameID = params.row.id
                            await this.setState({ selecetGameID: gameID })
                            console.log(this.state.selecetGameID)

                            this.setState({ showPlayerDialog: true })


                        }}
                    >


                    </VisibilityIcon>
                )
            },
            {
                field: 'delete', headerName: 'Delete', renderCell: (params) => (

                    <DeleteIcon
                        variant="contained"
                        color="second"
                        size="small"
                        style={{ marginLeft: 16 }}
                        onClick={() => {
                            if (permission === 'Coach')
                                toast.error("not allow!")
                            else {
                                this.setState({ showDeleteDialog: true, selecetGameID: params.row.id })
                            }
                        }}

                    >


                    </DeleteIcon>
                )
            }

        ]
        return (
            <>
                <Fragment>
                    <div style={{ height: 600, width: '100%' }}>
                        <DataGrid id={Math.random()} rows={games} columns={columns}
                        />
                    </div>
                    <Dialog
                        fullScreen
                        open={this.state.showPlayerDialog}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">{"Game iinfo"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                <ShowSpecificGame selecetGameID={selecetGameID} />
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose} color="primary">
                                Close
          </Button>

                        </DialogActions>
                    </Dialog>
                    {permission != 'coach' &&
                        <Dialog
                            open={this.state.showDeleteDialog}
                            TransitionComponent={Transition}
                            keepMounted
                            onClose={this.handleCloseDeleteDialog}
                            aria-labelledby="alert-dialog-slide-title"
                            aria-describedby="alert-dialog-slide-description"
                        >
                            <DialogTitle id="alert-dialog-slide-title">{"Delete Game "}</DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-slide-description">
                                    Are your sure Delete this game
          </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => this.deleteGame(selecetGameID)} color="primary">

                                    Agree
          </Button>
                                <Button onClick={this.handleCloseDeleteDialog} color="primary">
                                    Disagree
          </Button>
                            </DialogActions>
                        </Dialog>}
                </Fragment>


            </>

        )
    }
}
export const Match = withRouter(_Match);


