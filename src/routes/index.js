import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Countries from "../views/Countries";
import SlotMachine from "../views/SlotMachine";
const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/countries">
          <Countries />
        </Route>
        <Route path="/slot-machine">
          <SlotMachine />
        </Route>
      </Switch>
    </Router>
  );
};

export default Routes;
