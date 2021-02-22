import React, {Fragment} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {InputAdornment} from "@material-ui/core";
import moment from "moment";
import HelpIcon from '@material-ui/icons/Help';
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import ComplexityHelper from "./ComplexityHelper/ComplexityHelper";
import Tooltip from '@material-ui/core/Tooltip';
import {TextData} from "../redux";

interface Props {
    data: TextData
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& .MuiTextField-root': {
                marginRight: theme.spacing(1),
                width: '25ch',
            },
        },
    }),
);

export default function ReadTextDialog(props: Props) {
    const [open, setOpen] = React.useState(false);
    const classes = useStyles();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const tooltipTitle = "Amount of unique letters in text. An indirect sign of complexity."

    return (
        <Fragment>
            <Button onClick={handleClickOpen} style={{cursor: "pointer"}}>{props.data.name}</Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" scroll={"paper"}>
                <DialogTitle id="form-dialog-title">{props.data.name}</DialogTitle>
                <DialogContent dividers={true} className={classes.root}>
                    <DialogContentText>
                        "{props.data.text}"
                    </DialogContentText>
                    <TextField
                        margin="dense"
                        variant="outlined"
                        id="author"
                        name={"author"}
                        label={"Author"}
                        value={props.data.author}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                    <TextField
                        margin="dense"
                        variant="outlined"
                        id="created"
                        name={"created"}
                        label={"Created"}
                        value={moment.unix(props.data.created).utc().format("DD-MM-YYYY HH:mm")}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                    <TextField
                        margin="dense"
                        variant="outlined"
                        id="updated"
                        name={"updated"}
                        label={"Updated"}
                        value={moment.unix(props.data.updated).utc().format("DD-MM-YYYY HH:mm")}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                    <TextField
                        margin="dense"
                        variant="outlined"
                        id="length"
                        name={"length"}
                        label={"Length"}
                        value={props.data.text_analysis.length}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                    <TextField
                        margin="dense"
                        variant="outlined"
                        id="sentences_amount"
                        name={"sentences_amount"}
                        label={"Sentences"}
                        value={props.data.text_analysis.sentences_amount}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                    <TextField
                        margin="dense"
                        variant="outlined"
                        id="words_amount"
                        name={"words_amount"}
                        label={"Words"}
                        value={props.data.text_analysis.words_amount}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                    <TextField
                        margin="dense"
                        variant="outlined"
                        id="alphabet"
                        name={"alphabet"}
                        label={"Alphabet"}
                        value={props.data.text_analysis.alphabet}
                        InputProps={{
                            readOnly: true,
                            endAdornment: (
                                <InputAdornment position={"end"}>
                                    <Tooltip title={tooltipTitle}><HelpIcon style={{cursor: "pointer"}}/></Tooltip>
                                </InputAdornment>
                            )
                        }}
                    />
                    <TextField
                        margin="dense"
                        variant="outlined"
                        id="complexity"
                        name={"complexity"}
                        label={"Raw Complexity"}
                        value={props.data.text_analysis.complexity.toFixed(4)}
                        InputProps={{
                            readOnly: true,
                            endAdornment: (
                                <InputAdornment position={"end"}>
                                    <ComplexityHelper/>
                                </InputAdornment>
                            )
                        }}
                    />

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    );
}
