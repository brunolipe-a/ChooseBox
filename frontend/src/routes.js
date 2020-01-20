import React from "react";
import {BrowserRouter, Switch, Route } from 'react-router-dom';

import Main from "./pages/Main";
import Box from "./pages/Box";

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path ="/" component={Main} />
            <Route path="/box/:id" component={Box} />
        </Switch>
    </BrowserRouter>
);

export default Routes;