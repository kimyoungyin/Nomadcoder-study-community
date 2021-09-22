import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { isLoggedInState } from './recoil/authRecoil';
import Home from './routes/Home';
import Join from './routes/Join';
import Login from './routes/Login';

const Router = () => {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route exact path="/join">
          {isLoggedIn ? <Redirect to="/" /> : <Join />}
        </Route>
        <Route path="/login">{isLoggedIn ? <Redirect to="/" /> : <Login />}</Route>

        <Route path="/:category" component={Home} />
        {/* <Route path="/search" component={Home} />
                <Route path="/users/:id" component={Home} /> */}
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
