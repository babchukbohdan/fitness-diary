import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { AuthState } from './context/auth/AuthState';
import { FirebaseState } from './context/firebase/FirebaseState';
import { TodayState } from './context/today/TodayState';
import { ThemeState } from './context/theme/ThemeState';

import { PrivateRoute } from './components/PrivateRoute/PrivateRoute';

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
import { NotificationState } from './context/Notification/NotificationState';

function App() {
  return (
    <div className="App">
      <NotificationState>
        <AuthState>
          <FirebaseState>
            <TodayState>
              <ThemeState>
                <Router>
                  <Theme>
                    <Navbar />
                    <Switch>
                      {/* <PrivateRoute path='/' exact component={} /> */}
                      <PrivateRoute path='/user' component={User} />
                      <PrivateRoute path='/callendar' component={Month} />
                      <PrivateRoute path='/details' component={Details} />
                      <PrivateRoute path='/info/:year/:month/:id' component={Info} />
                      <PrivateRoute path='/progress' component={Progress} />
                      <PrivateRoute path='/settings' component={Settings} />
                      <PrivateRoute path='/todo' component={TodoList} />
                      <PrivateRoute path='/copyright' component={Copyright} />
                      <Route path='/auth' component={Auth} />
                    </Switch>
                  </Theme>
                </Router>
              </ThemeState>
            </TodayState>
          </FirebaseState>
        </AuthState>
      </NotificationState>
    </div>
  );
}

export default App;
