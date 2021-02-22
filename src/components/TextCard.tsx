import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import GeoPattern from 'geopattern'
import {CardMedia} from "@material-ui/core";
import {Actions, globalState, store, TextData} from "../redux";
import {useDispatch} from "react-redux";

const useStyles = makeStyles({
    root: {
        width: 300,
    },
    image: {
        width: 300,
        height: 300
    }
});

interface Props {
    data: TextData
}

export default function TextCard(props: Props) {
    const classes = useStyles();
    const src = GeoPattern.generate(props.data.text).toDataUri()
    const dispatch = useDispatch();
    const reduxState: globalState = store.getState();
    const index = reduxState.results.findIndex(p => p.text_id === props.data.id)
    return (
        <Card className={classes.root}>
            <CardMedia component="img"
                       alt="Image automatically generated from text"
                       src={src}
                       className={classes.image}
                       title={props.data.name}/>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    {props.data.name}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                    {props.data.author}
                </Typography>
                <Typography variant="subtitle2" gutterBottom>
                    Length: {props.data.text_analysis.length}
                    <br/>
                    Complexity: {(100 - props.data.text_analysis.complexity).toFixed(2)}%
                </Typography>
            </CardContent>
            <CardActions>
                <Button
                    size="small"
                    onClick={() => dispatch({type: Actions.TEXT_FOR_RACE_SELECTED, payload: props.data})}
                >
                    Race!
                </Button>
                {index > -1 && <Button
                  style={{
                      marginLeft: "auto"
                  }}
                  size="small"
                  onClick={() => dispatch({type: Actions.RESULT_SELECTED, payload: reduxState.results[index]})}
                >
                  Results
                </Button>}
            </CardActions>
        </Card>
    );
}
