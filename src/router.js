import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./routes/Home";

const Router = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/:category" component={Home} />
                {/* <Route path="/search" component={Home} />
                <Route path="/users/:id" component={Home} /> */}
            </Switch>
        </BrowserRouter>
    );
};

export default Router;