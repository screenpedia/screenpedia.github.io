import { Redirect, Route, Switch, useHistory} from "react-router-dom";
import { useEffect } from "react";

import Home from './Home'
import Title from './Title'
import Person from './Person'
import Search from './Search'
import GenreList from './Genre'
import GenreMedia from './Genre/Genre'
import User from "./User";

const MainRouter = ({user}) => {
    const history = useHistory()
    
    useEffect(() => {
      if(!user && history.location.pathname === "/user") history.push('/')
    }, [history, user])

    return (
        <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/search" component={() => <Search />} />
            <Route exact path={["/movie/:id", "/tv/:id"]}>
                <Switch>
                    <Route exact path="/:type/:id" component={() => <Title />} />
                </Switch>
            </Route>
            <Route exact path={"/person/:id"}>
                <Switch>
                    <Route exact path="/:type/:id" component={() => <Person />} />
                </Switch>
            </Route>
            <Route path={["/genre/movie", "/genre/tv"]}>
                <Switch>
                    <Route exact path="/genre/:type" component={() => <GenreList />} />
                    <Route exact path="/genre/:type/:id" component={() => <GenreMedia />} />
                </Switch>
            </Route>
            {user && !user.loading && <Route exact path="/user" component={() => <User />} /> }
            <Redirect to={'/'} />
        </Switch>
    )
}

export default MainRouter;