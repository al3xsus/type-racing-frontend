import {Checkbox, Container, Divider, FormControlLabel, FormGroup, Typography} from "@material-ui/core";
import Logo from "../assets/logo.png";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    image: {
        width: "85%",
        height: "85%"
    },
    text: {
        width: '100%',
        textAlign: "center"
    }
}));

export default () => {
    const classes = useStyles();
    return <Container>
        <div className={classes.text}>
            <Typography variant="h3" gutterBottom>
                Welcome to Type Race App
            </Typography>
            <Divider/>
            <Typography variant="h6" gutterBottom>
                What is this?
            </Typography>
            <Typography variant="body1" gutterBottom>
                This is web application for practicing typing in a fun way. You select text for race, typing it and
                receive results and statistics of your typing skill(s).
            </Typography>
            <Divider/>
            <Typography variant="h6" gutterBottom>
                Status of features?
            </Typography>
            <FormGroup style={{marginLeft: 300}}>
                <FormControlLabel
                    control={
                        <Checkbox checked={true} color={"primary"}/>
                    }
                    label="Basic BE skeleton"
                />
                <FormControlLabel
                    control={
                        <Checkbox checked={true} color={"primary"}/>
                    }
                    label="Basic FE skeleton"
                />
                <FormControlLabel
                    control={
                        <Checkbox checked={true} color={"primary"}/>
                    }
                    label="CRUD for texts for BE"
                />
                <FormControlLabel
                    control={
                        <Checkbox checked={true} color={"primary"}/>
                    }
                    label="CRUD for texts for FE"
                />
                <FormControlLabel
                    control={
                        <Checkbox checked={true} color={"primary"}/>
                    }
                    label="Race feature for FE"
                />
                <FormControlLabel
                    control={
                        <Checkbox checked={true} color={"primary"}/>
                    }
                    label="Race feature for BE"
                />
                <FormControlLabel
                    control={
                        <Checkbox indeterminate={true}/>
                    }
                    label="Hall of fame"
                />
                <FormControlLabel
                    control={
                        <Checkbox indeterminate={true}/>
                    }
                    label="Testing"
                />
                <FormControlLabel
                    control={
                        <Checkbox checked={false}/>
                    }
                    label="Better rating system"
                />
                <FormControlLabel
                    control={
                        <Checkbox checked={false}/>
                    }
                    label="Gamefication"
                />
                <FormControlLabel
                    control={
                        <Checkbox checked={false}/>
                    }
                    label="General improvements"
                />
            </FormGroup>
            <Divider/>
            <img src={Logo} alt="Logo"/>
            <Typography variant="subtitle1" gutterBottom>
                Icons made by <a href="https://www.flaticon.com/authors/freepik"
                                 title="Freepik">Freepik</a> from <a
                href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>
            </Typography>
        </div>
    </Container>
}