import React from 'react';
import { BrowserRouter as Router, Route, NavLink, Switch } from 'react-router-dom'

import './App.scss';
import { Month } from './components/Month/Month';
import { Details } from './components/Details/Details';
import { Navbar } from './components/Navbar/Navbar';
import { FirebaseState } from './context/firebase/FirebaseState';
import { TodayState } from './context/today/TodayState';

function App() {
  return (
    <div className="App">
      <FirebaseState>
        <TodayState>
          <Router>
            <Navbar/>
            <Switch>
              <Route path={'/'} exact component={Month} />
              <Route path={'/details'} component={Details} />
            </Switch>
          </Router>
        </TodayState>
      </FirebaseState>
    </div>
  );
}

export default App;
