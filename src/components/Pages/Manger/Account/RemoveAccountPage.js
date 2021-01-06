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


class _RemoveAccountPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            accounts: []
        }
        this.getAllAnalyst = this.getAllAnalyst.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.removeUserFromDB = this.removeUserFromDB.bind(this)
    }
    componentDidMount() {
        toast.configure()
        this.getAllAnalyst().then((result) => {
            this.setState({ accounts: result.data })


        })

    }
    getAllAnalyst() {
        return axios.get('http://localhost:5000/users/', {
        })
    }

    handleClick(account) {
        this.removeUserFromDB(account).then((result) => {
            console.log(result)
            window.location.reload(false);
            toast.success(`Account ${account.firstName} deleted`)

        })

    }
    removeUserFromDB(account) {
        console.log(account)

        return axios.post('http://localhost:5000/users/remove/', {
            userTeam: account.teamid,
            userID: account._id
        })
    }
    render() {
        const { accounts } = this.state
        return (
            <>
                <ManagerControl />
                <ul style={{ display: "flex" }}>
                    <li > <AddIcon /></li>
                    <li > <AddIcon /></li>

                </ul>
                <GridList cols={4} cellHeight={90} >
                    {accounts.map((account) => (
                        <GridListTile className="accounts" key={account._id}>
                            <GridListTileBar
                                title={`${account.firstName}  ${account.lastName}`}
                                subtitle={account.email}
                                actionIcon={
                                    <IconButton onClick={() => this.handleClick(account)} aria-label={`info about`} >
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
export const RemoveAccountPage = withRouter(_RemoveAccountPage)