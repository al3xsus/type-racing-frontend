import React, {Fragment} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import {Fab} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';

interface Props {
    data?: object
    onUpdate?: (id: string, body: object) => void
    onCreate: (body: object) => void
}

const initialValues = {
    name: "",
    author: "",
    text: ""
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& > *': {
                margin: theme.spacing(1),
            },
        },
        extendedIcon: {
            marginRight: theme.spacing(1),
        },
        fabButton: {
            margin: theme.spacing(1)
        }
    }),
)

export default function CreateTextDialog(props: Props) {
    const [open, setOpen] = React.useState(false);
    const [values, setValues] = React.useState(initialValues)
    const classes = useStyles();

    React.useEffect(() => {
        console.log('Prop Received: ', props.data);
    }, [props.data])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name;
        const value = event.target.value;
        setValues(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const onCancel = () => {
        setValues(initialValues)
        handleClose()
    }

    const onCreate = () => {
        props.onCreate(values)
        setValues(initialValues)
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
            <Fab variant="extended" className={classes.fabButton} color={"primary"} onClick={handleClickOpen}>
                <AddIcon className={classes.extendedIcon}/>
                Add text
            </Fab>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add text</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Add text for type racing.
                    </DialogContentText>
                    <TextField
                        margin="dense"
                        fullWidth
                        error={values.name.length === 0}
                        variant="outlined"
                        id="name"
                        name={"name"}
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
                        id="author"
                        name={"author"}
                        placeholder={"Author"}
                        helperText="Author of text"
                        onChange={handleChange}
                        value={values.author}
                    />
                    <TextField
                        margin="dense"
                        fullWidth
                        error={values.text.length === 0}
                        id="text"
                        name={"text"}
                        multiline
                        rowsMax={10}
                        variant="outlined"
                        onChange={handleChange}
                        value={values.text}
                        helperText={values.text.length === 0 ? "Text itself" : values.text.length}
                        placeholder={"Text"}
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="outlined"
                        onClick={onCancel}
                    >
                        Cancel
                    </Button>
                    <Button
                        color={"primary"}
                        variant="outlined"
                        disabled={values.text.length === 0 || values.author.length === 0 || values.name.length === 0}
                        onClick={onCreate}
                    >
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    );
}
