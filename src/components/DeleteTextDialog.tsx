import React, {Fragment} from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton
} from '@material-ui/core';
import DeleteIcon from "@material-ui/icons/Delete";

interface Props {
    onDeleteText: () => void
}

export default function DeleteTextDialog(props: Props) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = () => {
        props.onDeleteText()
        handleClose()
    }

    return (
        <Fragment>
            <IconButton aria-label="delete" color="secondary" onClick={handleClickOpen}>
                <DeleteIcon/>
            </IconButton>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Confirm delete"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you wanna delete?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDelete} color="secondary">
                        Delete
                    </Button>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    );
}
