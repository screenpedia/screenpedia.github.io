import { Redirect, Route, Switch, useHistory} from "react-router-dom";

// import Context from '../context'

import Home from './Home'
import Title from './Title'
import Search from './Search'
import GenreList from './Genre'
import GenreMedia from './Genre/Genre'
import { useEffect } from "react";
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