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
        {!isLoggedIn && (
          <>
            <Route exact path="/join" component={Join} />
            <Route path="/login" component={Login} />
          </>
        )}
        <Route path="/:category([^((login)|(join))])" component={Home} />
        <Redirect to="/" />
        {/* <Route path="/search" component={Home} />
                <Route path="/users/:id" component={Home} /> */}
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
