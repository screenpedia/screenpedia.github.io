import { Redirect, Route, Switch} from "react-router-dom";

import Home from './Home'
import Title from './Title'
import Search from './Search'

const MainRouter = () => {
    return (
        <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/search" component={() => <Search />} />
            <Route exact path="/movie/:id">
                <Switch>
                    <Route path="/:type/:id" component={() => <Title />} />
                </Switch>
            </Route>
            <Route exact path="/tv/:id">
                <Switch>
                    <Route path="/:type/:id" component={() => <Title />} />
                </Switch>
            </Route>
            <Redirect to={'/'} />
        </Switch>
    )
}

export default MainRouter;