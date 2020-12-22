import React, { Component ,  Fragment } from 'react'
import SideMenu from './SideMenu'
import { makeStyles,CssBaseline , ThemeProvider, createMuiTheme} from '@material-ui/core'
import PageHeader from './PageHeader';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import AddIcon from '@material-ui/icons/Add';


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
    overrides: {
        MuiAppBar: {
            root: {
                transform: 'translateZ(0)'
            }
        }
    } 
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
            <SideMenu />
             <div className={classes.appMain}>
             <PageHeader
                title="User"
                icon={<AddIcon/>}
                />
            <PageHeader
                title="Team"
                icon={<AddIcon/>}
                />
            </div>
        </ThemeProvider>
   


    )
}
export default ManagerControl
