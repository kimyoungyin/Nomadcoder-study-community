import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { useRecoilState } from "recoil";
import Header from "./components/layout/Header";
import { authState, isLoggedInState } from "./recoil/authRecoil";
import Home from "./routes/Home";
import Join from "./routes/Join";
import Login from "./routes/Login";
import Post from "./routes/Post";
import Profile from "./routes/Profile";

const Router = () => {
    const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);
    const [user, setUser] = useRecoilState(authState);
    const logoutHandler = () => {
        setIsLoggedIn(false);
        setUser(null);
    };

    const photoUrlChangeHandler = (url) => {
        setUser((prev) => ({
            ...prev,
            photoURL: url,
        }));
    };

    return (
        <BrowserRouter>
            <Header
                user={user}
                onLogout={logoutHandler}
                isLoggedIn={isLoggedIn}
            />
            <Switch>
                <Route path="/" exact component={Home} />
                <Route exact path="/join">
                    {isLoggedIn ? <Redirect to="/" /> : <Join />}
                </Route>
                <Route path="/login">
                    {isLoggedIn ? <Redirect to="/" /> : <Login />}
                </Route>
                <Route path="/post">{isLoggedIn ? <Post /> : <Login />}</Route>
                <Route path="/profile">
                    {isLoggedIn ? (
                        <Profile
                            onChangeUserPhotoUrl={photoUrlChangeHandler}
                            user={user}
                        />
                    ) : (
                        <Login />
                    )}
                </Route>
                <Route path="/:category" component={Home} />
                {/* <Route path="/search" component={Home} />
                <Route path="/users/:id" component={Home} /> */}
            </Switch>
        </BrowserRouter>
    );
};

export default Router;
