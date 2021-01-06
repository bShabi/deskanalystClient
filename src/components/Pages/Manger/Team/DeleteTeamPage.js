import React, { Component } from 'react'
import { withRouter } from "react-router";
import { ToastContainer, toast } from 'react-toastify';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import ManagerControl from '../ManagerControl'
import AddIcon from '@material-ui/icons/Add';
import axios from 'axios';


class _RemoveTeamsPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            teams: []
        }
        this.getAllTeams = this.getAllTeams.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.removeTeamFromDB = this.removeTeamFromDB.bind(this)
    }
    componentDidMount() {
        console.log("RemoveTeam")
        toast.configure()
        this.getAllTeams().then((result) => {
            this.setState({ teams: result.data })


        })

    }
    getAllTeams() {
        return axios.get('http://localhost:5000/teams/', {
        })
    }

    handleClick(Team) {
        this.removeTeamFromDB(Team._id).then((result) => {
            console.log(result)
            window.location.reload(false);

        })
        toast.success(`Teams ${Team.teamName} deleted`)

    }
    removeTeamFromDB(element) {
        return axios.delete('http://localhost:5000/teams/remove/' + element, {})
    }

    render() {
        const { teams } = this.state
        return (
            <>
                <ManagerControl />
                <ul style={{ display: "flex" }}>
                    <li > <AddIcon /></li>
                    <li > <AddIcon /></li>

                </ul>
                <GridList cols={4} cellHeight={90} >
                    {teams.map((team) => (
                        <GridListTile className="accounts" key={team._id}>
                            <GridListTileBar
                                title={team.teamName}
                                // subtitle={account.email}
                                actionIcon={
                                    <IconButton onClick={() => this.handleClick(team)} aria-label={`info about`} >
                                        <DeleteIcon />
                                    </IconButton>
                                }
                            />
                        </GridListTile>
                    ))}
                </GridList>

            </>
        );
    }
}
export const RemoveTeamsPage = withRouter(_RemoveTeamsPage)