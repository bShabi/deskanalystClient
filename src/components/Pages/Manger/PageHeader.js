import React from 'react'
import {Paper, Card , Typography , makeStyles, Button} from '@material-ui/core'


const useStyle = makeStyles(theme => ({
    root: {
        backgroundColor: '#fdfdff',
        display: 'inline-block',

    },
    PageHeader: {
        padding: theme.spacing(4),
        marginBottom: theme.spacing(3),
        // backgroundColor: '#fdfdff',
        // paddingBlock: '10px',
        // margin: '5px',
        // borderLeft: '6px'
    },

    pageTittle: {
        paddingLeft: theme.spacing(4)
    }
}))


export default function PageHeader(props) {

    const classes = useStyle()
    const { title , page } = props
    return (
        <Paper elevation={0} square className={classes.root}>
            <div className={classes.PageHeader}>
                <Card >
                    {page}
                </Card>
            </div>
        
         </Paper>
    )
}
