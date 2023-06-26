import classes from "./App.module.scss";
import { Container, Grid } from "@mui/material";

import LevelsList from "./components/LevelsList";
import DistrictsList from "./components/DistrictsList";
import Map from "./components/Map";

function App() {
  return (
    <Container classes={{ root: classes.App }}>
      <Grid container spacing={5} classes={{ root: classes.App__wrapGrid }}>
        <Grid item xs={3} classes={{ root: classes.App__wrapGrid_leftColumn }}>
          <LevelsList />
          <DistrictsList />
        </Grid>
        <Grid item xs={9}>
          <Map />
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
