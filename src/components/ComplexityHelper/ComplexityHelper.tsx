import React, {Fragment} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import HelpIcon from "@material-ui/icons/Help";
import {ReactComponent as ReactLogo} from "./math.svg";
import ComplexityHelperTable from "./ComplexityHelperTable";
import {Tooltip} from "@material-ui/core";

export default function ComplexityHelper() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Fragment>
            <Tooltip title={"Click to open info"}>
                <HelpIcon onClick={handleClickOpen} style={{cursor: "pointer"}}/>
            </Tooltip>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Flesch reading-ease test"}</DialogTitle>
                <DialogContent>
                    <ReactLogo style={{width: "99%"}}/>
                    <ComplexityHelperTable/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary" autoFocus>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    );
}
