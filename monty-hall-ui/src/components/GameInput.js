import React, { useState } from "react";
import { TextField,  Button, Switch, FormControlLabel, Stack,  Box, } from "@mui/material";
import * as actionCreators from "../Redux/actions";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import GameResult from "./GameResult.js";


function GameInput() {
    const [sumilation, setSimulation] = useState("");
    const [changedoor, setChangedoor] = useState(false);

    const receivedData = useSelector((state) => state.score);
    const data = receivedData && receivedData.data ? receivedData.data : {};

    const dispatch = useDispatch();
    const actioncreaters = bindActionCreators(actionCreators, dispatch);

    const handleNumberOfSim = (e) => {
        setSimulation(e.target.value)
    }
    const handleChangeDoor = () => {
        setChangedoor(!changedoor)
    }


    const handleSimulate = () => {
        actioncreaters.getStatus();
        actioncreaters.getScore(sumilation, changedoor);

    }

    return (
        <div>
            <Box sx={{ width: '100%' }}>
                <form autoComplete="off" >
                    <Stack direction="row" spacing={2}>
                        <div>
                            <TextField
                                label="Number Of Simulation"
                                onChange={handleNumberOfSim}
                                required
                                variant="outlined"
                                color="secondary"
                                type="number"
                                sx={{ mb: 3 }}
                                InputProps={{
                                    inputProps: { min: 0 }
                                }}
                                helperText={"Enter a positive integer"}
                                value={sumilation}
                            />
                        </div>
                        <div style={{ marginTop: '1%', justifyContent: 'center', alignItems: 'center' }}>
                            <FormControlLabel
                                value="start"
                                control={<Switch color="primary" checked={changedoor} onChange={handleChangeDoor} />}
                                label="Change Door"
                                labelPlacement="start"
                            />
                        </div>
                        <div style={{ marginTop: '1%', justifyContent: 'center', alignItems: 'center' }}>
                            <Button variant="contained" color="primary" type="button" onClick={handleSimulate}>Simulate</Button>
                        </div>
                    </Stack>
                </form >
            </Box >
            <GameResult score={data} />
        </div>

    );
}

export default GameInput;