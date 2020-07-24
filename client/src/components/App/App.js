import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Launch from '../Launch/Launch';
import SmartWrapper from '../SmartWrapper/SmartWrapper';
import { Counter } from '../../features/counter/Counter';

import './App.scss';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/launch">
          <Launch />
        </Route>
        <Route path="/">
          <SmartWrapper />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
