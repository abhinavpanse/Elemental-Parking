import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import { Link } from "react-router-dom";

import ReactTabllist from "react-tabllist";
import MadeWithLove from "./MadeWithLove.js";
import StatusTable from "./StatusTable";

const property = {};

let data = [
  ["", "A", "B", "C"],
  ["1", "", "", ""],
  ["2", "", "", ""],
  ["3", "", "", ""],
  ["4", "", "", ""],
  ["5", "", "", ""],
  ["6", "", "", ""],
  ["7", "", "", ""],
  ["8", "", "", ""],
  ["9", "", "", ""]
];

const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: theme.spacing(2)
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6)
  },
  heroButtons: {
    marginTop: theme.spacing(4)
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8)
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  cardMedia: {
    paddingTop: "56.25%" // 16:9
  },
  cardContent: {
    flexGrow: 1
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6)
  }
}));

export default function Album() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              Smart Parking
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="textSecondary"
              paragraph
            >
              Smart Parking system for Medi-Caps University.
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Button variant="contained" color="primary">
                    Open the boom barrier
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="outlined" color="primary">
                    <Link to="/addTeacher">Register a Teacher</Link>
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          <Typography
            variant="h3"
            align="center"
            color="textSecondary"
            paragraph
          >
            Parking Slot Status
          </Typography>

          {/* <ReactTabllist className="demo" data={data} property={property} /> */}
          {/* <div>End ----</div> */}
          <StatusTable />
        </Container>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Medi-Caps University Project
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="textSecondary"
          component="p"
        >
          AI POWERED PARKING SLOT
        </Typography>
        <MadeWithLove />
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}
