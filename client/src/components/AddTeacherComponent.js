import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import MadeWithLove from "./MadeWithLove.js";

import axios from "axios";

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

const AddTeacherComponent = (req, res) => {
  const [formData, setFormData] = useState({
    name: "",
    carnumber: "",
    teacherid: ""
  });

  const { name, carnumber, teacherid } = formData;

  const onChange = e =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  const onSubmit = async e => {
    e.preventDefault();
    const newUser = {
      name,
      carnumber,
      teacherid
    };
    try {
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      };

      const body = JSON.stringify(newUser);

      const res = await axios.post("/api/users", body, config);

      console.log(res.data);
    } catch (err) {
      console.error(err.response.data);
    }
  };

  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register a Teacher
        </Typography>
        <form onSubmit={e => onSubmit(e)} className={classes.form}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            value={name}
            name="name"
            onChange={e => onChange(e)}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            value={carnumber}
            fullWidth
            id="carnumber"
            onChange={e => onChange(e)}
            label="Car Number"
            name="carnumber"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            onChange={e => onChange(e)}
            name="teacherid"
            label="Teacher ID"
            value={teacherid}
            type="text"
            id="teacherid"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Create Teacher
          </Button>
        </form>
      </div>
      <Box mt={5}>
        <MadeWithLove />
      </Box>
    </Container>
  );
};

export default AddTeacherComponent;
