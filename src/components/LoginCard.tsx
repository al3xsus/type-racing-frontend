import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Button from '@material-ui/core/Button';
import {TextField} from "@material-ui/core";
import {LockOpen} from "@material-ui/icons";
import {authParams} from "../redux";

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
    },
    inputs: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    buttonContainer: {
        justifyContent: 'center'
    }
}));

const initialValues = {
    login: "",
    password: ""
}

interface Props {
    authorize: (params: authParams) => void
}

export default function LoginCard(props: Props) {
    const classes = useStyles();
    const [values, setValues] = React.useState(initialValues)

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name;
        const value = event.target.value;
        setValues(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleConfirm = () => {
        props.authorize(values)
    }

    const onKeyDownHandler = (e: any) => {
        if (e.keyCode === 13) {
            if (values.password && values.login) {
                props.authorize(values)
            }
        }
    };

    return (
        <Card className={classes.root} onKeyDown={onKeyDownHandler}>
            <LockOutlinedIcon color={"primary"} className={classes.icon}/>
            <CardContent>
                <form className={classes.inputs} noValidate autoComplete="off">
                    <TextField
                        id="login"
                        label="Login"
                        required={true}
                        name={"login"}
                        value={values.login}
                        onChange={handleChange}
                    />
                    <TextField
                        id="password"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        required={true}
                        name={"password"}
                        value={values.password}
                        onChange={handleChange}
                    />
                </form>
            </CardContent>
            <CardActions className={classes.buttonContainer}>
                <Button
                    color="primary"
                    variant="contained"
                    startIcon={<LockOpen/>}
                    onClick={handleConfirm}
                    disabled={!(values.password && values.login)}
                >
                    Login
                </Button>
            </CardActions>
        </Card>
    );
}
