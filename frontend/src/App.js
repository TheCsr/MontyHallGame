import './App.css';
import Header from "./components/Header.js";
import GameInput from './components/GameInput';
import { Grid, Paper, styled } from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(4),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function App() {
  return (
    <Grid container direction="column" alignItems="center" spacing={2}>
      <Grid item xs={16}>
        <Item>
          <Header />
        </Item>
      </Grid>
      <Grid item xs={16}>
        <Item>
          <GameInput />
        </Item>
      </Grid>
    </Grid>
  );
}

export default App;
