import LinearProgress, {LinearProgressProps} from "@material-ui/core/LinearProgress";
import {Box, Typography} from "@material-ui/core";
import React from "react";

export default (props: LinearProgressProps & { value: number }) => {
    return (
        <Box display="flex" alignItems="center">
            <Box width="90%" mr={1}>
                <LinearProgress variant="determinate" {...props} />
            </Box>
            <Box width={"10%"}>
                <Typography variant="body2" color="textSecondary">{`${Math.round(
                    props.value,
                )}%`}</Typography>
            </Box>
        </Box>
    );
}