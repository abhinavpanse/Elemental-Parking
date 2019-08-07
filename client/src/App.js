import React, { Fragment } from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Landing from "./components/Landing";
import NavBar from "./components/NavBar";
import AddTeacherComponent from "./components/AddTeacherComponent";

function App() {
  return (
    <Router>
      <Fragment>
        <NavBar />

        <section className="container">
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/addTeacher" component={AddTeacherComponent} />
          </Switch>
        </section>
      </Fragment>
    </Router>
  );
}

export default App;
