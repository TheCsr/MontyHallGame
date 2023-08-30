import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Stack,
  Box,
} from "@mui/material";
import * as actionCreators from "../Redux/actions";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import GameResult from "./GameResult.js";
import ScoreBoard from "./ScoreBoard";
import Grid from "@mui/material/Unstable_Grid2";

function GameInput() {
  const [sumilation, setSimulation] = useState("");
  const [name, setName] = useState("");
  const [changedoor, setChangedoor] = useState(false);

  const receivedData = useSelector((state) => state.score);
  const data = receivedData && receivedData.data ? receivedData.data : {};

  const receivedD = useSelector((state) => state.gresult);

  useEffect(() => {
    actioncreaters.getResult();
  }, [data]);

  const dispatch = useDispatch();
  const actioncreaters = bindActionCreators(actionCreators, dispatch);

  const handleNumberOfSim = (e) => {
    setSimulation(e.target.value);
  };
  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleChangeDoor = () => {
    setChangedoor(!changedoor);
  };

  const handleSimulate = () => {
    actioncreaters.getResult();
    actioncreaters.getStatus();
    actioncreaters.getScore(sumilation, changedoor, name);
  };

  return (
    <div>
      <Box sx={{ width: "100%" }}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <ScoreBoard />
          </Grid>
          <Grid item xs={8}>
            <form autoComplete="off">
              <Stack direction="row" spacing={2}>
                <div>
                  <TextField
                    label="Name"
                    onChange={handleNameChange}
                    required
                    variant="outlined"
                    color="secondary"
                    type="text"
                    sx={{ mb: 3 }}
                    helperText={"Enter the name of the Player"}
                    value={name}
                  />
                </div>
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
                      inputProps: { min: 0 },
                    }}
                    helperText={"Enter a positive integer"}
                    value={sumilation}
                  />
                </div>
                <div
                  style={{
                    marginTop: "1%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <FormControlLabel
                    value="start"
                    control={
                      <Switch
                        color="primary"
                        checked={changedoor}
                        onChange={handleChangeDoor}
                      />
                    }
                    label="Change Door"
                    labelPlacement="start"
                  />
                </div>
                <div
                  style={{
                    marginTop: "1%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    type="button"
                    onClick={handleSimulate}
                  >
                    Simulate
                  </Button>
                </div>
              </Stack>
            </form>

            <GameResult score={data} />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default GameInput;
