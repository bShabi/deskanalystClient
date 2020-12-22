import React from 'react'
import {Paper, Card , Typography , makeStyles, Button} from '@material-ui/core'

const useStyle = makeStyles(theme => ({
    root: {
        backgroundColor: '#fdfdff'
    },
    PageHeader: {
        padding: theme.spacing(4),
        display: 'block-inline',
        marginBottom: theme.spacing(3),
        backgroundColor: '#fdfdff',
        paddingBlock: '10px',
        margin: '5px',
        borderLeft: '6px'
    }
}))


export default function PageHeader(props) {

    const classes = useStyle()
    const { title , icon } = props
    return (
        <Button className={classes.PageHeader} size="large" color="primary">
          <Paper elevation={0} square className={classes.root}>
            <div >
                <Card>
                    {icon}
                    <Typography paddingBlock="10px" variant="h6" component="span">
                    {title}
                    </Typography>
                </Card>
             </div>

        </Paper> 
        </Button>

 
   


    
    )
}
