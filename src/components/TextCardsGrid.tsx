import React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextCard from "./TextCard";
import {TextData} from "../redux";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            marginTop: theme.spacing(1)
        }
    }),
);

interface Props {
    texts: TextData[]
}

export default function TextCardsGrid(props: Props) {
    const classes = useStyles();

    return (
        <Grid container className={classes.root} spacing={2}>
            <Grid item xs={12}>
                <Grid container justify="center" spacing={2}>
                    {props.texts.map((data: TextData) => (
                        <Grid key={data.name} item>
                            <TextCard data={data}/>
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </Grid>
    );
}
