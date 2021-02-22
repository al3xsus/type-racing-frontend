import {makeStyles} from "@material-ui/core/styles";
import ErrorOutlineSharpIcon from '@material-ui/icons/ErrorOutlineSharp';
import React from "react";
import {Box, Button, Typography} from "@material-ui/core";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {RouteComponentProps, withRouter} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        left: "50%",
        position: "absolute",
        textAlign: "center",
        top: "50%",
        transform: "translate(-50%, -50%)",
        maxWidth: "25%"
    },
    icon: {
        width: "85%",
        height: "85%"
    }
}));

function Page404(props: RouteComponentProps) {
    const classes = useStyles();
    return (
        <Box className={classes.root}>
            <ErrorOutlineSharpIcon color={"primary"} className={classes.icon}/>
            <Typography variant="h4" gutterBottom>
                Page Not Found
            </Typography>
            <Button
                variant="outlined"
                size="medium"
                color="primary"
                startIcon={<ArrowBackIcon/>}
                onClick={() => props.history.push("/")}
            >
                Back to main page
            </Button>
        </Box>
    )
}

export default withRouter(Page404);