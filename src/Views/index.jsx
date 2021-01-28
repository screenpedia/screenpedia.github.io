import { Redirect, Route, Switch} from "react-router-dom";

import Home from './Home'
import Title from './Title'
import Search from './Search'
import GenreList from './Genre'
import GenreMedia from './Genre/Genre'

const MainRouter = () => {
    return (
        <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/search" component={() => <Search />} />
            <Route exact path={["/movie/:id", "/tv/:id"]}>
                <Switch>
                    <Route exact path="/:type/:id" component={() => <Title />} />
                </Switch>
            </Route>
            <Route path={["/genre/movie", "/genre/tv"]}>
                <Switch>
                    <Route exact path="/genre/:type" component={() => <GenreList />} />
                    <Route exact path="/genre/:type/:name" component={() => <GenreMedia />} />
                </Switch>
            </Route>
            <Redirect to={'/'} />
        </Switch>
    )
}

export default MainRouter;