import { TextField ,Grid, makeStyles} from '@material-ui/core'
import React,{useState,useEffect} from 'react'
import ManagerControl from '../ManagerControl'

const useStyle = makeStyles(theme => ({
    root: {
        '& .MuiGrid-root': {
            width: '80%',
            margin: theme.spacing(2)
        }
    }
}))
const initialValue = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassowrd: '',
    teamName: '',
}

export default function RemoveAccountPage() {

    const [ value , setValue] = useState(initialValue);
    const classes = useStyle() 
    return (
        <>
        <ManagerControl/>

        <form className={classes.root}>
            <Grid container>
                <Grid item xs={6}>
                    <TextField variant="outlined" label="First Name" value={value.firstName}></TextField>
                    <TextField variant="outlined" label="Last Name" value={value.lastName}></TextField>
                </Grid>
            </Grid>      
        </form>
        </>
    )
}
