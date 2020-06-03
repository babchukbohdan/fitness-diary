import React from 'react';
import { BrowserRouter as Router, Route, NavLink, Switch } from 'react-router-dom'

import './App.scss';
import { Month } from './components/Month/Month';
import { Details } from './components/Details/Details';
import { Navbar } from './components/Navbar/Navbar';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Switch>
          <Route path={'/'} exact component={Month} />
          <Route path={'/details'} component={Details} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
