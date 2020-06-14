import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { FirebaseState } from './context/firebase/FirebaseState';
import { TodayState } from './context/today/TodayState';

import { Month } from './components/Month/Month';
import { Details } from './components/Details/Details';
import { Navbar } from './components/Navbar/Navbar';
import { Info } from './components/Info/Info';
import { TodoList } from './components/TodoList/TodoList';

import './App.scss';

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
              <Route path='/info/:year/:month/:id' component={Info} />
              <Route path='/todo' component={TodoList} />
            </Switch>
          </Router>
        </TodayState>
      </FirebaseState>
    </div>
  );
}

export default App;
