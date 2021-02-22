import React, {Fragment} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {Actions, FinalStats, TextData} from "../redux";
import {useDispatch} from "react-redux";
import {Typography} from "@material-ui/core";
import moment from "moment";
import LinearProgressBarWithLabel from "./LinearProgressBarWithLabel";

interface Props {
    data: TextData
    saveResult: (data: FinalStats) => void
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            width: "100%"
        },
        highlight: {
            backgroundColor: "yellow"
        },
        dynamicProgressElements: {
            marginLeft: theme.spacing(3)
        }
    }),
);

interface State {
    timeStart: string,
    timeEnd: string,
    open: boolean,
    text: string,
    wpm: number,
    wpmHistory: { [time: string]: number }[]
    progress: number,
    error: boolean,
    errorWords: { [word: string]: number[] }[]
}

const timeFormat: string = "HH:mm:ss:SSS"

export default function ReadTextDialog(props: Props) {
    const nullPoint = moment().format(timeFormat)
    const [state, setState] = React.useState<State>({
        timeStart: nullPoint,
        timeEnd: nullPoint,
        open: true,
        text: "",
        wpm: 0,
        wpmHistory: [],
        progress: 0,
        error: false,
        errorWords: []
    })
    const classes = useStyles();
    const dispatch = useDispatch();

    React.useEffect(() => {
        const timer = setTimeout(() => setState(prevState => ({
            ...prevState,
            timeEnd: moment().format(timeFormat)
        })), 1);
        return () => clearTimeout(timer);
    });

    const handleClose = () => {
        dispatch({type: Actions.TEXT_FOR_RACE_DESELECTED});
        setState(prevState => ({
            ...prevState,
            open: false
        }))
    };

    const findErrorWord = (i: number) => {
        const punctuationMarks = /^[.,:;!? ]/
        if (!!props.data.text[i].match(punctuationMarks)) {
            return
        }
        let flag = {
            leftEdgeFound: false,
            rightEdgeFound: false
        }
        let leftEdge = i
        let rightEdge = i
        while (!flag.leftEdgeFound || !flag.rightEdgeFound) {
            if (!flag.leftEdgeFound) {
                if (props.data.text[leftEdge].match(punctuationMarks) === null && leftEdge !== 0) {
                    leftEdge = leftEdge - 1
                } else {
                    flag.leftEdgeFound = true
                }
            }
            if (!flag.rightEdgeFound) {
                if (props.data.text[rightEdge].match(punctuationMarks) === null && rightEdge !== props.data.text.length - 1) {
                    rightEdge = rightEdge + 1
                } else {
                    flag.rightEdgeFound = true
                }
            }
        }
        let index = state.errorWords.findIndex(p => Object.keys(p)[0] === props.data.text.slice(leftEdge, rightEdge))
        const errorIndex = leftEdge !== 0 ? i - leftEdge - 1 : i - leftEdge
        if (index === -1) {
            setState(prevState => ({
                ...prevState,
                errorWords: [...prevState.errorWords, {[props.data.text.slice(leftEdge, rightEdge)]: [errorIndex]}]
            }))
        } else {
            const errorWords = [...state.errorWords]
            if (!Object.values(state.errorWords[index])[0].includes(errorIndex)) {
                errorWords[index] = {
                    [Object.keys(state.errorWords[index])[0]]: [...Object.values(state.errorWords[index])[0], errorIndex]
                }
                setState(prevState => ({
                    ...prevState,
                    errorWords: errorWords
                }))
            }
        }
    }

    const customCheck = (customText: string) => {
        let sourceText: any = document.getElementById("source-text");
        if (customText.length > 0) {
            if (props.data.text.slice(0, customText.length) === customText) {
                sourceText.innerHTML = "<span class='correct'>" +
                    props.data.text.slice(0, customText.length) + "</span>" + props.data.text.slice(customText.length)
                const words = customText.match(/(\w+)/g)
                if (words !== null) {
                    const duration = moment.duration(moment(state.timeEnd, timeFormat).diff(moment(state.timeStart, timeFormat)));
                    const wpm = (words.length / duration.asMinutes())
                    setState(prevState => ({
                        ...prevState,
                        wpm: wpm,
                        wpmHistory: [...prevState.wpmHistory, {[prevState.timeEnd]: wpm}],
                        progress: (customText.length * 100) / props.data.text.length,
                        error: false
                    }))
                }
                if (customText.length === props.data.text.length) {
                    const finalStats = {
                        text_id: props.data.id,
                        start: state.timeStart,
                        end: state.timeEnd,
                        wpmStats: state.wpmHistory,
                        errorsStats: state.errorWords
                    }
                    props.saveResult(finalStats)
                    handleClose()
                }
            } else {
                let control = {
                    startIndex: 0,
                    type: ""
                }
                let innerHTMLBuf = ""
                for (let i = 0; i < customText.length; i++) {
                    setState(prevState => ({
                        ...prevState,
                        error: true
                    }))
                    if (customText[i] === props.data.text[i]) {
                        if (control.type === "") {
                            control.type = "correct"
                        }
                        if (control.type === "error") {
                            innerHTMLBuf = innerHTMLBuf + "<span class='error'>" +
                                props.data.text.slice(control.startIndex, i) + "</span>"
                            control.startIndex = i
                            control.type = "correct"
                        }
                        if (control.type === "correct" && i === customText.length - 1) {
                            innerHTMLBuf = innerHTMLBuf + "<span class='correct'>" +
                                props.data.text.slice(control.startIndex, i + 1) + "</span>"
                        }
                    } else {
                        findErrorWord(i)
                        if (control.type === "") {
                            control.type = "error"
                        }
                        if (control.type === "correct") {
                            innerHTMLBuf = innerHTMLBuf + "<span class='correct'>" +
                                props.data.text.slice(control.startIndex, i) + "</span>"
                            control.startIndex = i
                            control.type = "error"
                        }
                        if (control.type === "error" && i === customText.length - 1) {
                            innerHTMLBuf = innerHTMLBuf + "<span class='error'>" +
                                props.data.text.slice(control.startIndex, i + 1) + "</span>"
                        }
                    }
                }
                sourceText.innerHTML = innerHTMLBuf + props.data.text.slice(customText.length)
            }
        } else {
            sourceText.innerHTML = props.data.text
        }
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let value = event.target.value;
        if (value.length > props.data.text.length) {
            value = value.slice(0, props.data.text.length)
        }
        setState(prevState => ({
            ...prevState,
            text: value
        }))
        customCheck(value)
    };

    const timeDiff = () => {
        return moment.utc(moment(state.timeEnd, timeFormat).diff(moment(state.timeStart, timeFormat))).format("mm[m]:ss[s]:SSS[ms]")
    }

    return (
        <Fragment>
            <Dialog open={state.open}
                    onClose={handleClose}
                    aria-labelledby="form-dialog-title"
                    scroll={"paper"}
                    className={classes.container}
                    disableBackdropClick={true}
                    disableEscapeKeyDown={true}
            >
                <DialogTitle id="form-dialog-title">{props.data.name} by {props.data.author}</DialogTitle>
                <LinearProgressBarWithLabel value={state.progress} className={classes.dynamicProgressElements}/>
                <Typography variant="subtitle2" display="block" gutterBottom
                            className={classes.dynamicProgressElements}>time: {
                    timeDiff()
                }</Typography>
                <Typography variant="subtitle2" display="block" gutterBottom
                            className={classes.dynamicProgressElements}>wpm: {state.wpm.toFixed(2)}</Typography>
                <DialogContent dividers={true}>
                    <DialogContentText id={"source-text"} className={'noselect'}>
                        {props.data.text}
                    </DialogContentText>
                    <TextField
                        error={state.error}
                        autoFocus={true}
                        margin="dense"
                        fullWidth
                        id="text"
                        name={"input-text"}
                        multiline
                        rowsMax={10}
                        variant="outlined"
                        onChange={handleChange}
                        onPaste={(e) => {
                            e.preventDefault();
                            return false
                        }}
                        value={state.text}
                        helperText={"Text itself"}
                        placeholder={"Text"}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    );
}
