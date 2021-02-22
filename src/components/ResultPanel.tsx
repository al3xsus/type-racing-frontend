import React, {Fragment} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis,} from 'recharts';
import {Actions, raceResults} from "../redux";
import {Avatar, Chip, List, ListItem, ListItemAvatar, ListItemText, Typography} from "@material-ui/core";
import {ArrowDownward, ArrowUpward} from "@material-ui/icons";
import {deepOrange, deepPurple} from '@material-ui/core/colors';
import TimerIcon from '@material-ui/icons/Timer';
import {useDispatch} from "react-redux";

interface Props {
    raceData: raceResults
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            width: "100%"
        },
        dynamicProgressElements: {
            marginLeft: theme.spacing(3)
        },
        statList: {
            display: 'flex',
            flexDirection: 'row',
            padding: 0
        },
        orange: {
            color: theme.palette.getContrastText(deepOrange[500]),
            backgroundColor: deepOrange[500],
        },
        purple: {
            color: theme.palette.getContrastText(deepPurple[500]),
            backgroundColor: deepPurple[500],
        }
    }),
);

export default (props: Props) => {
    const classes = useStyles();
    // const [state, setState] = React.useState({
    //     open: true
    // })
    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch({type: Actions.RESULT_DESELECTED})
        // setState(prevState => ({
        //     ...prevState,
        //     open: false
        // }))
    };

    return (
        <Fragment>
            <Dialog open={true}
                    onClose={handleClose}
                    aria-labelledby="form-dialog-title"
                    scroll={"paper"}
                    className={classes.container}
                    fullWidth={true}
                    maxWidth={'md'}
                    id={'result-dialog'}
            >
                <DialogTitle>Race result</DialogTitle>
                <DialogContent dividers={true}>
                    <Typography variant="h6" gutterBottom>
                        WPM stats
                    </Typography>
                    <List className={classes.statList}>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <ArrowDownward/>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Min" secondary={props.raceData.wpm.min.toFixed(3)}/>
                        </ListItem>
                        <ListItem>
                            <ListItemAvatar>
                                <ListItemAvatar>
                                    <Avatar>
                                        <ArrowUpward/>
                                    </Avatar>
                                </ListItemAvatar>
                            </ListItemAvatar>
                            <ListItemText primary="Max" secondary={props.raceData.wpm.max.toFixed(3)}/>
                        </ListItem>
                        <ListItem>
                            <ListItemAvatar>
                                <ListItemAvatar>
                                    <Avatar className={classes.orange}>avg</Avatar>
                                </ListItemAvatar>
                            </ListItemAvatar>
                            <ListItemText primary="Average" secondary={props.raceData.wpm.average.toFixed(3)}/>
                        </ListItem>
                        <ListItem>
                            <ListItemAvatar>
                                <ListItemAvatar>
                                    <Avatar className={classes.purple}>med</Avatar>
                                </ListItemAvatar>
                            </ListItemAvatar>
                            <ListItemText primary="Median" secondary={props.raceData.wpm.median.toFixed(3)}/>
                        </ListItem>
                        <ListItem>
                            <ListItemAvatar>
                                <ListItemAvatar>
                                    <Avatar>
                                        <TimerIcon/>
                                    </Avatar>
                                </ListItemAvatar>
                            </ListItemAvatar>
                            <ListItemText primary="Time" secondary={props.raceData.time}/>
                        </ListItem>
                    </List>
                    <Typography variant="h6" gutterBottom>
                        WPM history chart
                    </Typography>
                    <LineChart
                        width={900}
                        height={500}
                        data={props.raceData.wpm.story}
                    >
                        <CartesianGrid strokeDasharray="10 10"/>
                        <XAxis dataKey={"time"} name={"seconds"}/>
                        <YAxis dataKey={'wpm'}/>
                        <Tooltip cursor={{stroke: 'red', strokeWidth: 2}}/>
                        <Legend/>
                        <Line type="monotone" dataKey="wpm" stroke="#8884d8"/>
                    </LineChart>
                    <Typography variant="h6" gutterBottom>
                        Errors
                    </Typography>

                    {props.raceData.errors.length > 0 && props.raceData.errors.map((err, index) => <Chip
                        label={err.word} style={{margin: 5}} variant="outlined" color="secondary"
                        key={`err-${index}`}/>)}
                </DialogContent>
                <DialogActions>
                    <Button color="primary" onClick={handleClose}>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    );
}
