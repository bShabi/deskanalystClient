import React, { Component, Fragment } from 'react'
import SideMenu from './SideMenu'
import { makeStyles, CssBaseline, ThemeProvider, createMuiTheme, Paper } from '@material-ui/core'
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import PageHeader from './PageHeader';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import AccountPage from './Account/AccountPage';
import TeamPage from './Team/TeamPage';


class ManagerControl extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showPage: 'Accounts'
        }
    }
    render() {
        return (
            <>
                <section>
                    <ThemeProvider >
                        <div style={{ textAlign: 'center' }} >
                            <PageHeader
                                title="Account"
                                page={<AccountPage />}
                            />
                            <PageHeader
                                title="Team"
                                page={<TeamPage />} />
                        </div>
                    </ThemeProvider>
                </section>


            </>
        )
    }
}
/*
<section>
<Grid item style={{ textAlign: 'center' }}>
    <Tooltip title="Add" placement="top-start">
        <Button >Accounts</Button>
    </Tooltip>
    {/* <Tooltip title="Add" placement="top">
    <Button>top</Button>
</Tooltip> 
    <Tooltip title="Add" placement="top-end">
        <Button>Teams</Button>
    </Tooltip>
</Grid>
</section>
{this.state.showPage === 'Accounts' &&
<AccountPage />
}
{this.state.showPage === 'Teams' &&
<TeamPage />
}
*/
export default ManagerControl
