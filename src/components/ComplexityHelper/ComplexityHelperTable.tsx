import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
    table: {
        // minWidth: 650,
    },
});

function createData(score: string, level: string, notes: string) {
    return {score, level, notes};
}

const rows = [
    createData('100.00–90.00', '5th grade', 'Very easy to read. Easily understood by an average 11-year-old student.'),
    createData('90.00–80.00', '6th grade', 'Easy to read. Conversational English for consumers.'),
    createData('80.00–70.00', '7th grade', 'Fairly easy to read.'),
    createData('70.00–60.00', '8th & 9th grade', 'Plain English. Easily understood by 13- to 15-year-old students.'),
    createData('60.00–50.00', '10th to 12th grade', 'Fairly difficult to read.'),
    createData('50.00–30.00', 'College', 'Difficult to read.'),
    createData('30.00–10.00', 'College graduate', 'Very difficult to read. Best understood by university graduates.'),
    createData('10.00–00.00', 'Professional', 'Extremely difficult to read. Best understood by university graduates.')
];

export default function ComplexityHelperTable() {
    const classes = useStyles();

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Score</TableCell>
                        <TableCell align="right">School level</TableCell>
                        <TableCell align="right">Notes</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.score}>
                            <TableCell component="th" scope="row">
                                {row.score}
                            </TableCell>
                            <TableCell align="right">{row.level}</TableCell>
                            <TableCell align="right">{row.notes}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}