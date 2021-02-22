import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteTextDialog from "./DeleteTextDialog";
import ReadTextDialog from "./ReadTextDialog";
import moment from "moment";
import UpdateTextDialog from "./UpdateTextDialog";
import {TextData} from "../redux";


const useStyles = makeStyles((theme) => ({
    table: {},
    tableContainer: {
        marginTop: theme.spacing(1)
    }
}));

interface Props {
    data: TextData[],
    onDeleteText: (id: string) => void
    onUpdateText: (id: string, data: object) => void
}

export default function BasicTable(props: Props) {
    const classes = useStyles();
    return (
        <TableContainer component={Paper} className={classes.tableContainer}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="center">Author</TableCell>
                        <TableCell align="center">Length</TableCell>
                        <TableCell align="center">Created</TableCell>
                        <TableCell align="center">Updated</TableCell>
                        <TableCell align="center">Complexity</TableCell>
                        <TableCell align="center"/>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.data && props.data.map((row: TextData) => (
                        <TableRow key={row.name}>
                            <TableCell component="th" scope="row">
                                <ReadTextDialog data={row}/>
                            </TableCell>
                            <TableCell align="center">{row.author}</TableCell>
                            <TableCell align="center">{row.text_analysis.length}</TableCell>
                            <TableCell align="center">{moment.unix(row.created).format("DD-MM-YYYY HH:mm")}</TableCell>
                            <TableCell
                                align="center">{moment.unix(row.updated).utc().format("DD-MM-YYYY HH:mm")}</TableCell>
                            <TableCell align="center">{(100 - row.text_analysis.complexity).toFixed(2)}%</TableCell>
                            <TableCell align="center">
                                <UpdateTextDialog body={row} onUpdate={props.onUpdateText}/>
                                <DeleteTextDialog onDeleteText={() => props.onDeleteText(row.id)}/>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
