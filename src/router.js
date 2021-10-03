import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import Header from './components/layout/Header';
import { isLoggedInState } from './recoil/authRecoil';
import Home from './routes/Home';
import Join from './routes/Join';
import Login from './routes/Login';
import Post from './routes/Post';
import Profile from './routes/Profile';

const Router = () => {
  const isLoggedIn = useRecoilValue(isLoggedInState);

  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route exact path="/join">
          {isLoggedIn ? <Redirect to="/" /> : <Join />}
        </Route>
        <Route path="/login">{isLoggedIn ? <Redirect to="/" /> : <Login />}</Route>
        <Route path="/post">{isLoggedIn ? <Post /> : <Login />}</Route>
        <Route path="/profile">{isLoggedIn ? <Profile /> : <Login />}</Route>
        <Route path="/:category" component={Home} />
        {/* <Route path="/search" component={Home} />
                <Route path="/users/:id" component={Home} /> */}
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
