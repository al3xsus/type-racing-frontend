import React, {Fragment} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import {TextData} from "../redux";

interface Props {
    body: TextData
    onUpdate: (id: string, body: object) => void
}

const initialValues = {
    name: "",
    author: "",
    text: ""
}

export default function UpdateTextDialog(props: Props) {
    const [open, setOpen] = React.useState(false);
    const [values, setValues] = React.useState(initialValues)

    const setPropsValues = () => {
        setValues({
            name: props.body.name,
            author: props.body.author,
            text: props.body.text
        })
    }

    React.useEffect(() => {
        if (props.body) {
            setValues({
                name: props.body.name,
                author: props.body.author,
                text: props.body.text
            })
        }
    }, [props.body])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name;
        const value = event.target.value;
        setValues(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const onCancelClick = () => {
        setPropsValues()
        handleClose()
    }

    const onUpdateClick = () => {
        props.onUpdate(props.body.id, values)
        setPropsValues()
        handleClose()
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Fragment>
            <IconButton aria-label="edit" color="primary" size="medium" onClick={handleClickOpen}>
                <EditIcon/>
            </IconButton>
            <Dialog open={open} onClose={onCancelClick} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Edit text</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Edit text for type racing.
                    </DialogContentText>
                    <TextField
                        margin="dense"
                        fullWidth
                        error={values.name.length === 0}
                        variant="outlined"
                        required
                        id="name"
                        name={"name"}
                        label={values.name.length === 0 ? "Name required" : ""}
                        helperText={"Source of text"}
                        placeholder="Name"
                        onChange={handleChange}
                        value={values.name}
                    />
                    <TextField
                        margin="dense"
                        fullWidth
                        error={values.author.length === 0}
                        variant="outlined"
                        required
                        id="author"
                        name={"author"}
                        placeholder={"Author"}
                        label={values.author.length === 0 ? "Author required" : ""}
                        helperText="Author of text"
                        onChange={handleChange}
                        value={values.author}
                    />
                    <TextField
                        margin="dense"
                        fullWidth
                        error={values.text.length === 0}
                        required
                        id="text"
                        name={"text"}
                        label={values.text.length === 0 ? "Text required" : ""}
                        multiline
                        rows={4}
                        variant="outlined"
                        onChange={handleChange}
                        value={values.text}
                        helperText={"Text itself"}
                        placeholder={"Text"}
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="outlined"
                        onClick={onCancelClick}
                    >
                        Cancel
                    </Button>
                    <Button
                        color={"primary"}
                        variant="outlined"
                        disabled={values.text.length === 0 || values.author.length === 0 || values.name.length === 0}
                        onClick={onUpdateClick}
                    >
                        Update
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    );
}
