import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { FirebaseState } from './context/firebase/FirebaseState';
import { TodayState } from './context/today/TodayState';
import { ThemeState } from './context/theme/ThemeState';

import { Month } from './components/Month/Month';
import { Details } from './components/Details/Details';
import { Navbar } from './components/Navbar/Navbar';
import { Info } from './components/Info/Info';
import { TodoList } from './components/TodoList/TodoList';
import { Progress } from './components/Progress/Progress';
import { Copyright } from './components/Copyright/Copyright';
import { Settings } from './components/Settings/Settings';
import { Theme } from './components/Theme/Theme';
import { Auth } from './components/Auth/Auth';
import { User } from './components/User/User';

import './App.scss';
import { AuthState } from './context/auth/AuthState';
import { PrivateRoute } from './components/PrivateRoute/PrivateRoute';

function App() {
  return (
    <div className="App">
      <AuthState>
        <FirebaseState>
          <TodayState>
            <ThemeState>
              <Router>
                <Theme>
                  <Switch>
                    <PrivateRoute path='/' exact component={Navbar} />
                    <Route path='/user' component={User} />
                    <Route path='/callendar' component={Month} />
                    <Route path='/details' component={Details} />
                    <Route path='/info/:year/:month/:id' component={Info} />
                    <Route path='/progress' component={Progress} />
                    <Route path='/settings' component={Settings} />
                    <Route path='/todo' component={TodoList} />
                    <Route path='/copyright' component={Copyright} />
                    <Route path='/auth' component={Auth} />
                  </Switch>
                </Theme>
              </Router>
            </ThemeState>
          </TodayState>
        </FirebaseState>
      </AuthState>
    </div>
  );
}

export default App;
