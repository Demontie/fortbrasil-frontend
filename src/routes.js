import React from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import Shops from './pages/Shops';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={SignIn} />
        <Route path="/home" component={Home} />
        <Route path="/shops" component={Shops} />
        <Route path="/signUp" exact component={SignUp} />
      </Switch>
    </BrowserRouter>
  );
}
