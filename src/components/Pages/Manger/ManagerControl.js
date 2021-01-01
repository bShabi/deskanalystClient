import React, { Component ,  Fragment } from 'react'
import SideMenu from './SideMenu'
import { makeStyles,CssBaseline , ThemeProvider, createMuiTheme, Paper, Button} from '@material-ui/core'
import PageHeader from './PageHeader';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import AccountPage from './Account/AccountPage';
import TeamPage from './Team/TeamPage';




const theme = createMuiTheme( {
    palette: {
        primary:{
            main: '#333996',
            light: '#3c44b126'
        },
        secondary: {
            main: '#f83245',
            light: '#f8324526'
        },
        background: {
            default: '#fffff'
        },
    },
    shape: {
        borderRadius: '12px'
    },
})
const useStyles = makeStyles({
    appMain: {
        paddingLeft: '150px',
        width: '100%',
    }
})



function ManagerControl() {
    const classes = useStyles();
    

    return (
        <ThemeProvider theme={theme}>
             <div className={classes.appMain}>
             <PageHeader
                title="Account"
                page={<AccountPage/>}
                />
            <PageHeader
            title="Team"
            page={<TeamPage/>}/>
            </div>
        </ThemeProvider>
   


    )
}
export default ManagerControl

