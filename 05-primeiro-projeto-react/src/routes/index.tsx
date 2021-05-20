import React from "react";
import { Switch, Route } from 'react-router-dom';

import Dashboard from "../pages/Dashboard";
import Repository from "../Repository";

const Routes: React.FC = () => (
    <Switch>
        <Route path="/" exact component={ Dashboard }/>
        <Route path="/users/:repository+" component={ Repository }/>
    </Switch>
);

export default Routes;