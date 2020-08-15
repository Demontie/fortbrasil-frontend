import React from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import SignIn from './pages/SignIn';
import Home from './pages/Home';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={SignIn} />
        <Route path="/home" component={Home} />
        {/* <Route path="/SignUp" component={SignUp} /> */}
      </Switch>
    </BrowserRouter>
  );
}
