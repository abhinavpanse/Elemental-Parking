import React from "react";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <AppBar position="relative">
      <Toolbar>
        <Typography variant="h6" color="inherit" noWrap>
          <Link to="/">Smart Parking</Link>
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
