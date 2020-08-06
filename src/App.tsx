import * as React from 'react';
import './App.css';
import { Switch, Route, Redirect, RouteProps } from 'react-router-dom';
import { Observer } from 'mobx-react';
import { useStore } from './store/StoreProvider';
import Login from './pages/Login';
import Registration from './pages/Registration';
import Map from './pages/Map/Map';
import Profile from './pages/Profile';

const PrivateRoute: React.FC<RouteProps> = (props) => {
  const { path, component } = props;
  const { isLoggedIn } = useStore();

  return (
    <Observer>
      {
        () => isLoggedIn ?
          <Route path={path} component={component} /> :
          <Redirect to='/login' />
      }
    </Observer>
  );
};

function App() {
  return (
    <Switch>
      <Route path='/login' component={Login} />
      <Route path='/registration' component={Registration} />
      <PrivateRoute path='/map' component={Map} />
      <PrivateRoute path='/profile' component={Profile} />
      <Route path='/'>
        <PrivateRoute path='/map' component={Map} />
      </Route>
      <Route path='*'>
        <h1>Page Not Found</h1>
      </Route>
    </Switch>
  );
}

export default App;
