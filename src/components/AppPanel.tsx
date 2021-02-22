import React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {isAuthorized, removeAuthData} from "../utils/AuxFns";
import {RouteComponentProps, withRouter} from "react-router-dom";
import CustomMenu from "./CustomMenu";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
    }),
);

const AppPanel = (props: RouteComponentProps) => {
    const classes = useStyles();

    const customHistoryPush = (pathname: string) => {
        props.history.push(pathname)
    }

    const logout = () => {
        removeAuthData();
        customHistoryPush("/login");
    }

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <CustomMenu pathname={props.location.pathname} customHistoryPush={customHistoryPush}/>
                    <Typography variant="h6" className={classes.title}>
                        Type Race
                    </Typography>
                    {isAuthorized() && <Button color="inherit" onClick={() => logout()}>Logout</Button>}
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default withRouter(AppPanel);